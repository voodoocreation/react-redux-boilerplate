import * as React from "react";
import { WrappedComponentProps } from "react-intl";

import injectIntlIntoPage from "../../../helpers/injectIntlIntoPage";
import { IPageContext } from "../../connected/App/App";
import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

interface IProps extends WrappedComponentProps {
  err: {};
  message?: string;
  statusCode: number;
}

class ErrorRoute extends React.Component<IProps> {
  public static getInitialProps = (context: IPageContext) => {
    const { res } = context;
    const { err } = context;

    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    const message = err && err.message ? err.message : undefined;

    return { message, statusCode };
  };

  public render() {
    return (
      <ErrorPage message={this.props.message} status={this.props.statusCode} />
    );
  }
}

export default injectIntlIntoPage(ErrorRoute);
