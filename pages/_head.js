import React from "react";
import Head from "next/head";

export const HeadComp = ({ teamName }) => {
  return (
    <Head>
      <title>Llamify</title>
      <link rel="icon" type="image/icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&amp;display=swap"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" media="screen, projection" href="/reset.css" />
      <link rel="stylesheet" media="screen, projection" href="/shared.css?1" />
    </Head>
  );
};
HeadComp.displayName = "HeadComp";

export default HeadComp;
