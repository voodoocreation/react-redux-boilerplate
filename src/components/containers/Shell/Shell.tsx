import cn from "classnames";
import Head from "next/head";
import * as React from "react";
import { InjectedIntl, injectIntl } from "react-intl";

interface IProps {
  className?: string;
  intl: InjectedIntl;
}

class Shell extends React.Component<IProps> {
  public componentWillMount() {
    if (
      typeof document !== "undefined" &&
      !document.documentElement.classList.contains("isClientRendered")
    ) {
      document.documentElement.classList.add("isClientRendered");
    }
  }

  public render() {
    const { children, className } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <article className={cn("Page", className)}>
        <Head>
          <meta
            property="og:site_name"
            content={formatMessage({ id: "BRAND_NAME" })}
          />
        </Head>

        <main className="Page-body container" role="main">
          {children}
        </main>
      </article>
    );
  }
}

export default injectIntl<any>(Shell);
