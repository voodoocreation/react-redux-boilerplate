import * as React from "react";
import { InjectedIntl } from "react-intl";

import injectIntlIntoPage from "../../../helpers/injectIntlIntoPage";
import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

interface IProps {
  err: {};
  intl: InjectedIntl;
  message?: string;
  statusCode: number | string;
}

class ErrorRoute extends React.Component<IProps> {
  public static getInitialProps({ ctx }: any) {
    const res = ctx.res;
    const err = ctx.err as Error & { statusCode: string };
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

export default injectIntlIntoPage(ErrorRoute);
