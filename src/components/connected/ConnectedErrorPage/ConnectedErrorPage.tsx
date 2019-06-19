import * as React from "react";
import { connect } from "react-redux";

import { IError } from "../../../models/error.models";
import { IStoreState } from "../../../reducers/root.reducers";
import * as selectors from "../../../selectors/root.selectors";

import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

interface IProps {
  error: IError | undefined;
}

class ConnectedErrorPage extends React.Component<IProps> {
  public render() {
    return <ErrorPage {...this.props.error} />;
  }
}

const mapStateToProps = (state: IStoreState) => ({
  error: selectors.getAppError(state)
});

const ConnectedErrorPageWrapped = connect(mapStateToProps)(ConnectedErrorPage);

export default ConnectedErrorPageWrapped;
