import { IContext } from "next";
import * as React from "react";

interface IProps {
  statusCode: string | number;
}

export default class Error extends React.Component<IProps> {
  public static getInitialProps({ res, err }: IContext) {
    const statusCode = res
      ? res.statusCode
      : err
        ? err.statusCode
        : null;
    return { statusCode }
  }

  public render() {
    return (
      <p>
        {
          this.props.statusCode
            ? `A ${this.props.statusCode} error occurred on the server`
            : "An error occurred on the client"
        }
      </p>
    )
  }
}
