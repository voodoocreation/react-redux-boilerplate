import Head from "next/head";
import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";

interface IProps extends WrappedComponentProps {
  message?: string;
  status?: number;
}

class ErrorPage extends React.Component<IProps> {
  public static defaultProps = {
    status: 500
  };

  public render() {
    const { formatMessage } = this.props.intl;

    const pageTitle = `${this.getTitle()} · ${formatMessage({
      id: "BRAND_NAME"
    })}`;
    const pageDescription = this.getMessage();

    return (
      <>
        <Head>
          <title>{pageTitle}</title>
          <meta content={pageDescription} name="description" />
          <meta content={pageTitle} property="og:title" />
          <meta content={pageDescription} property="og:description" />
        </Head>

        <article className="ErrorPage">
          <h1>{this.getTitle()}</h1>

          <div className="ErrorPage--content container">
            <p>{this.getMessage()}</p>
          </div>
        </article>
      </>
    );
  }

  private getTitle() {
    const { status } = this.props;
    const { formatMessage } = this.props.intl;

    switch (status) {
      default:
        return formatMessage({ id: "ERROR_TITLE" });

      case 404:
        return formatMessage({ id: "ERROR_404_TITLE" });
    }
  }

  private getMessage() {
    const { message, status } = this.props;
    const { formatMessage } = this.props.intl;

    switch (status) {
      default:
        return message || formatMessage({ id: "ERROR_MESSAGE" });

      case 404:
        return formatMessage({ id: "ERROR_404_MESSAGE" });
    }
  }
}

export default injectIntl(ErrorPage);
