import * as React from "react";
import { connect } from "react-redux";

import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

import * as selectors from "../../../selectors/root.selectors";

interface IProps {
  error?: IError;
}

class ConnectedErrorPage extends React.Component<IProps> {
  public render() {
    return <ErrorPage {...this.props.error} />;
  }
}

const mapStateToProps = (state: any) => ({
  error: selectors.getPageError(state)
});

export default connect<IProps>(mapStateToProps)(ConnectedErrorPage);
