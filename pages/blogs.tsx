import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { memo } from "react";

import BlogsSection from "@/components/blog/BlogsSection";
import FeaturedBlog from "@/components/blog/FeaturedBlog";
import Container from "@/components/Container";
import PageEmpty from "@/components/PageEmpty";
import Wrapper from "@/components/Wrapper";
import type { Blog } from "@/models/blog";
import { fetchDataFromApi } from "@/utils/api";

interface Props {
  blogs: { data: Blog[] };
  featuredBlogs: { data: Blog[] };
  allBlogs: { data: Blog[] };
}

// eslint-disable-next-line no-empty-pattern
const BlogPage: NextPage<Props> = ({
  blogs,
  featuredBlogs,
  allBlogs,
}: Props) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const hasFeaturedBlogs = featuredBlogs?.data.length > 0;
  const hasBlogs = allBlogs?.data.length > 0;

  return (
    <Container>
      <Wrapper className="p-4 h-full my-14 flex flex-col gap-24">
        {locale !== "it" && hasBlogs ? (
          <>
            {hasFeaturedBlogs && (
              <FeaturedBlog featuredBlog={featuredBlogs.data[0]} />
            )}
            <BlogsSection blogs={blogs.data} />
          </>
        ) : (
          <PageEmpty
            title={t("empty", { ns: "blog" })}
            description={t("empty_description", { ns: "blog" })}
            icon="blog"
          />
        )}
      </Wrapper>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  if (!locale) return { props: {} };

  if (locale === "it")
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "footer",
          "nav",
          "buttons",
          "banner",
          "blog",
        ])),
      },
    };

  const blogs = await fetchDataFromApi(
    `/api/blogs?populate=*&filters[isFeatured][$eq]=false&[sort]=updatedAt:asc&&locale=${locale}`,
  );

  const featuredBlogs = await fetchDataFromApi(
    `/api/blogs?populate=*&filters[isFeatured][$eq]=true&locale=${locale}`,
  );

  const allBlogs = await fetchDataFromApi(
    `/api/blogs?populate=*&locale=${locale}`,
  );

  return {
    props: {
      allBlogs,
      featuredBlogs,
      blogs,
      ...(await serverSideTranslations(locale, [
        "footer",
        "nav",
        "buttons",
        "banner",
        "blog",
      ])),
    },
  };
};

export default memo(BlogPage);
