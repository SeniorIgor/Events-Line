import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";

class Document extends NextDocument {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
