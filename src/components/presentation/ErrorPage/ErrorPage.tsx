import Head from "next/head";
import * as React from "react";
import { InjectedIntl, injectIntl } from "react-intl";

interface IProps {
  intl: InjectedIntl;
  message?: string;
  status: number;
}

class ErrorPage extends React.Component<IProps> {
  public static defaultProps = {
    status: 500
  };

  public render() {
    const { formatMessage } = this.props.intl;

    return (
      <React.Fragment>
        <Head>
          <title>
            {`${this.getTitle()} · ${formatMessage({
              id: "BRAND_NAME"
            })}`}
          </title>
        </Head>

        <h1>{this.getTitle()}</h1>

        <p>{this.getMessage()}</p>
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

export default injectIntl<any>(ErrorPage);
