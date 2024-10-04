import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import type { Blog } from "@/models/blog";

interface Props {
  featuredBlog: Blog;
}

const FeaturedBlog = ({ featuredBlog }: Props) => {
  const { t } = useTranslation("blog");

  const { locale } = useRouter();

  const title = featuredBlog.attributes.title;
  const summary = featuredBlog.attributes.summary;
  const minutesRead = featuredBlog.attributes.minutesRead;
  const imgSrc =
    featuredBlog.attributes.image.data.attributes.formats.large.url;

  const date = new Date(featuredBlog.attributes.publishedAt ?? "");
  const day = format(date, "d");
  const monthName = format(date, "MMMM");
  const year = format(date, "yyyy");

  return (
    <Link
      className="rounded-sm bg-offWhite"
      href={{ pathname: `/blog/${featuredBlog.id}` }}
      locale={locale}
    >
      <div className="p-4 flex sm:flex-row flex-col gap-2">
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h2
              className="
        font-semibold
        text-transparent
        bg-clip-text
        bg-gradient-to-t
        from-[#0ba360]
        to-[#3cba92]
        cursor-pointer"
            >
              {title}
            </h2>
            <p
              className="text-xl    text-transparent
        bg-clip-text
        bg-gradient-to-t
        from-[#0ba360]
        to-[#3cba92]"
            >
              {summary}
            </p>
          </div>
          <div>
            <div className="flex justify-between gap-2">
              <p
                className="font-semibold    text-transparent
        bg-clip-text
        bg-gradient-to-t
        from-[#0ba360]
        to-[#3cba92] uppercase"
              >
                {t("minutes_read", { count: minutesRead })}
              </p>
              <p
                className="underline    text-transparent
        bg-clip-text
        bg-gradient-to-t
        from-[#0ba360]
        to-[#3cba92]"
              >
                • {`${monthName} ${day}, ${year}`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="relative w-full h-96">
            <Image
              alt="img"
              className="
             rounded-md"
              objectFit="cover"
              fill={true}
              src={imgSrc}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedBlog;
