import type { ParsedUrlQuery } from "querystring";

import format from "date-fns/format";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Markdown from "react-markdown";

import Container from "@/components/Container";
import Wrapper from "@/components/Wrapper";
import type { Blog } from "@/models/blog";
import { fetchDataFromApi } from "@/utils/api";

interface Props {
  blog: { data: Blog[] };
}

const BlogDetails: NextPage<Props> = ({ blog }: Props) => {
  const { t } = useTranslation("blog");

  const date = new Date(blog.data[0].attributes.publishedAt ?? "");

  const day = format(date, "d");
  const monthName = format(date, "MMMM");
  const year = format(date, "yyyy");

  const content = blog.data[0].attributes.content;
  const minutesRead = blog.data[0].attributes.minutesRead;
  const title = blog.data[0].attributes.title;

  const imageUrl =
    blog.data[0].attributes.image.data.attributes.formats.large?.url;

  return (
    <Container>
      <Wrapper className="py-12">
        <div className="flex flex-col pb-4">
          <p className="text-offWhite mb-12 text-[20px] font-semibold capitalize">
            {t("minutes_read", { count: minutesRead })}
          </p>
          <h1 className="font-semibold">{title}</h1>
          <p className="mb-4">• {`${monthName} ${day}, ${year}`}</p>
          <div className="relative aspect-[16/9] max-h-[500px]">
            <Image
              alt="img"
              className="rounded-sm"
              objectFit="contain"
              fill={true}
              src={imageUrl}
            />
          </div>
        </div>

        {/* <div style={{
          whiteSpace: 'normal',
          wordBreak: 'break-word'
        }} dangerouslySetInnerHTML={{ __html: content }}></div> */}
        <Markdown className="prose p-4 text-[18px] text-offWhite">
          {String(content) ?? "No content"}
        </Markdown>
      </Wrapper>
    </Container>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  const { id } = ctx.params as Params;

  if (!locale) return { props: {} };

  const blog = await fetchDataFromApi(
    `/api/blogs?populate=*&filters[id][$eq]=${id}&locale=${locale}`,
  );

  return {
    props: {
      blog,
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

export default BlogDetails;
