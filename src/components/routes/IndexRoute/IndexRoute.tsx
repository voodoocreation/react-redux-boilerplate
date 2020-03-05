import Head from "next/head";
import * as React from "react";
import { FormattedMessage, WrappedComponentProps } from "react-intl";
import { connect } from "react-redux";

import * as actions from "../../../actions/root.actions";
import injectIntlIntoPage from "../../../helpers/injectIntlIntoPage";
import { TStoreState } from "../../../reducers/root.reducers";
import * as selectors from "../../../selectors/root.selectors";
import Link from "../../presentation/Link/Link";

interface IProps extends WrappedComponentProps {
  apiData: {};
  currentRoute?: string;
  fetchApiData: typeof actions.fetchApiData.started;
  localData: {
    inputValue: string;
  };
  setLocalData: typeof actions.setLocalData;
}

class IndexRoute extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
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
            <FormattedMessage id="INDEX_TITLE" />
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
              type="button"
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
                type="text"
                value={localData.inputValue}
                onChange={this.onInputChange}
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
    this.props.fetchApiData({});
  };
}

const mapState = (state: TStoreState) => ({
  apiData: selectors.getApiData(state),
  currentRoute: selectors.getCurrentRoute(state),
  localData: selectors.getLocalData(state)
});

const mapActions = {
  fetchApiData: actions.fetchApiData.started,
  setLocalData: actions.setLocalData
};

export default injectIntlIntoPage(connect(mapState, mapActions)(IndexRoute));
