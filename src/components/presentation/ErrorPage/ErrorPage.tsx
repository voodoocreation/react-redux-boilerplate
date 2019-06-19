import Head from "next/head";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

interface IProps extends InjectedIntlProps {
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
      <React.Fragment>
        <Head>
          <title>{pageTitle}</title>
          <meta content={pageDescription} name="description" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
        </Head>

        <article className="ErrorPage">
          <h1>{this.getTitle()}</h1>

          <div className="ErrorPage--content container">
            <p>{this.getMessage()}</p>
          </div>
        </article>
      </React.Fragment>
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
        return message ? message : formatMessage({ id: "ERROR_MESSAGE" });

      case 404:
        return formatMessage({ id: "ERROR_404_MESSAGE" });
    }
  }
}

const ErrorPageWrapped = injectIntl(ErrorPage);

export default ErrorPageWrapped;
