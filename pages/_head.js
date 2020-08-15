import React from "react";
import Head from "next/head";

export const HeadComp = (props) => {
  return (
    <Head>
      <title>Llamify</title>
      <link rel="icon" type="image/icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&amp;display=swap"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" media="screen, projection" href="/reset.css" />
      <link rel="stylesheet" media="screen, projection" href="/index.css" />
    </Head>
  );
};
HeadComp.displayName = "HeadComp";

export default HeadComp;
