import * as React from "react";
import { InjectedIntl } from "react-intl";

import injectIntl from "../../../helpers/injectIntl";
import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

interface IProps {
  err: {};
  intl: InjectedIntl;
  statusCode: number | string;
}

class ErrorRoute extends React.Component<IProps> {
  public static getInitialProps({ ctx }: any) {
    const res = ctx.res;
    const err = ctx.err as Error & { statusCode: string };
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return { statusCode };
  }

  public render() {
    return <ErrorPage status={this.props.statusCode} />;
  }
}

export default injectIntl(ErrorRoute);
