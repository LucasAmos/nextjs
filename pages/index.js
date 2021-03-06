import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ allPostsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next Appy</title>
        <meta name="description" content="Generated by create next appy" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://lucasamos.dev/static/ad1dd43a1f5b7b097de944e9a5f84494/2a4de/terraform.png"
        />
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 md:p-0">
        {allPostsData.map((post, index) => {
          return (
            <div
              key={index}
              className="p-5 border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <Link key={index} href={`articles/${post.slug}`} passHref>
                <div>
                  <h2> {post.title}</h2>
                  <p>{post.description}</p>
                  <Image
                    className="bob-image"
                    src={post.thumbnailUrl}
                    alt="Vercel Logo"
                    width={600}
                    height={314}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get file names under /posts
  const postsDirectory = path.join(process.cwd(), "pages/articles");
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      fullPath,
      slug,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  return {
    props: {
      allPostsData,
    },
  };
}
