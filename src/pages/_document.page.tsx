import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="ja" dir="ltr">
        <Head>
          {/* アプリ全体に反映させたいデフォルトの設定を記述 例) Google Fonts の読み込み */}
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600&family=Sawarabi+Mincho&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
