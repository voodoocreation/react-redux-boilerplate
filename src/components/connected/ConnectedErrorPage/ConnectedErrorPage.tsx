import * as React from "react";
import { connect } from "react-redux";

import { IError } from "../../../models/error.models";
import { TStoreState } from "../../../reducers/root.reducers";
import * as selectors from "../../../selectors/root.selectors";
import ErrorPage from "../../presentation/ErrorPage/ErrorPage";

interface IProps {
  error: IError | undefined;
}

const ConnectedErrorPage: React.FC<IProps> = ({ error }) => (
  <ErrorPage {...error} />
);

const mapState = (state: TStoreState) => ({
  error: selectors.getAppError(state),
});

export default connect(mapState)(ConnectedErrorPage);
