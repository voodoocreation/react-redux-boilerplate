import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import injectIntlIntoPage from "../../../helpers/injectIntlIntoPage";

import * as actions from "../../../actions/root.actions";
import { IStoreState } from "../../../reducers/root.reducers";
import * as selectors from "../../../selectors/root.selectors";

interface IStoreProps {
  apiData: {};
  currentRoute?: string;
  localData: {
    inputValue: string;
  };
}

interface IDispatchProps {
  fetchApiData: typeof actions.fetchApiData.started;
  setLocalData: typeof actions.setLocalData;
}

interface IProps extends IStoreProps, IDispatchProps {
  intl: InjectedIntl;
}

class IndexRoute extends React.Component<IProps> {
  public static defaultProps = {
    apiData: {},
    localData: {
      inputValue: ""
    }
  };

  public render() {
    const { apiData, currentRoute, localData } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <article>
        <Head>
          <title>{formatMessage({ id: "INDEX_TITLE" })}</title>
          <meta
            content={formatMessage({ id: "INDEX_DESCRIPTION" })}
            name="description"
          />
        </Head>

        <h1>
          <Link href="/">
            <a>
              <FormattedMessage id="INDEX_TITLE" />
            </a>
          </Link>
        </h1>
        <p>
          <FormattedMessage id="INDEX_DESCRIPTION" />
        </p>

        <div className="row">
          <section className="col-sm-12">
            <h2>
              <FormattedMessage id="CURRENT_ROUTE" />
            </h2>
            <pre>{currentRoute}</pre>
          </section>

          <section className="Index--apiData col-sm-6">
            <h2>
              <FormattedMessage id="API_DATA" />
            </h2>
            <pre>{JSON.stringify(apiData, null, "  ")}</pre>

            <button
              className="Index--apiData--fetchButton btn btn-primary"
              onClick={this.onFetchApiDataClick}
            >
              <FormattedMessage id="FETCH_API_DATA" />
            </button>
          </section>

          <section className="Index--localData col-sm-6">
            <h2>
              <FormattedMessage id="LOCAL_DATA" />
            </h2>
            <pre>{JSON.stringify(localData, null, "  ")}</pre>

            <div className="input-group">
              <input
                className="form-control"
                value={localData.inputValue}
                onChange={this.onInputChange}
                type="text"
              />
            </div>
          </section>
        </div>
      </article>
    );
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setLocalData({
      inputValue: event.target.value
    });
  };

  private onFetchApiDataClick = () => {
    this.props.fetchApiData();
  };
}

const mapState = (state: IStoreState) => ({
  apiData: selectors.getApiData(state),
  currentRoute: selectors.getCurrentRoute(state),
  localData: selectors.getLocalData(state)
});

const mapDispatch = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchApiData: actions.fetchApiData.started,
      setLocalData: actions.setLocalData
    },
    dispatch
  );

export default injectIntlIntoPage(
  connect(
    mapState,
    mapDispatch
  )(IndexRoute)
);
