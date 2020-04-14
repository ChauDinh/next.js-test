import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";

const Post = ({ htmlString, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </>
  );
};

// create different paths that we need
export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

// fetch the data
export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", slug + ".mdx"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);

  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      title: parsedMarkdown.data.title,
    },
  };
};

export default Post;
