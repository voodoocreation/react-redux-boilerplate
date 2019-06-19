import { NextContext } from "next";
import * as React from "react";
import { InjectedIntlProps } from "react-intl";

import injectIntlIntoPage from "../../../helpers/injectIntlIntoPage";

import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

interface IResError extends Error {
  statusCode: number;
}

interface IProps extends InjectedIntlProps {
  err: IResError;
  message?: string;
  statusCode: number;
}

class ErrorRoute extends React.Component<IProps> {
  public static getInitialProps(context: NextContext) {
    const res = context.res;
    const err = context.err as IResError;
    const statusCode = res ? res.statusCode : err.statusCode;
    const message = err && err.message ? err.message : undefined;

    return { message, statusCode };
  }

  public render() {
    return (
      <ErrorPage message={this.props.message} status={this.props.statusCode} />
    );
  }
}

const ErrorRouteWrapped = injectIntlIntoPage(ErrorRoute);

export default ErrorRouteWrapped;
