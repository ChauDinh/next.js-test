import Link from "next/link";
import fs from "fs";

const Home = ({ slugs }) => (
  <div className="container">
    {slugs.map((slug) => {
      return (
        <div key={slug}>
          <Link href={"/" + slug}>
            <a>{"/" + slug}</a>
          </Link>
        </div>
      );
    })}
  </div>
);

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");
  return {
    props: {
      slugs: files.map((filename) => filename.replace(".mdx", "")),
    },
  };
};

export default Home;
