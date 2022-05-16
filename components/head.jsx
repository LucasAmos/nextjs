import Head from "next/head";
import jest from "../public/jest.png";

export default function head() {
  return (
    <Head>
      <title>Create Next Appy</title>
      <meta name="description" content="Generated by create next appy" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:image" content={jest} />
    </Head>
  );
}
