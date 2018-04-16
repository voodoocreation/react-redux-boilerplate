import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage, InjectedIntl } from "react-intl";
import { bindActionCreators, Dispatch } from "redux";
import { ActionCreator, EmptyActionCreator } from "typescript-fsa";

import connectIntl from "../src/helpers/connectIntl";
import withRedux from "../src/helpers/withRedux";
import initStore from "../src/store/root.store";

import * as actions from "../src/actions/root.actions";
import * as selectors from "../src/selectors/root.selectors";

interface IProps {
  apiData: {};
  fetchApiData: EmptyActionCreator;
  intl: InjectedIntl;
  localData: {
    inputValue: string;
  };
  setLocalData: ActionCreator<{}>;
}

interface IState {
  inputValue: string;
}

class Index extends React.Component<IProps, IState> {
  public static defaultProps = {
    apiData: {},
    localData: {}
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      inputValue: props.localData.inputValue
    };
  }

  public render() {
    return (
      <article>
        <Head>
          <title>{this.props.intl.formatMessage({ id: "INDEX_TITLE" })}</title>
          <meta
            content={this.props.intl.formatMessage({ id: "INDEX_DESCRIPTION" })}
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
          <section className="col-sm-6">
            <h2>
              <FormattedMessage id="API_DATA" />
            </h2>
            <pre>{JSON.stringify(this.props.apiData, null, "  ")}</pre>

            <button
              className="btn btn-primary"
              onClick={this.onAPIDataButtonClick}
            >
              <FormattedMessage id="FETCH_API_DATA" />
            </button>
          </section>

          <section className="col-sm-6">
            <h2>
              <FormattedMessage id="LOCAL_DATA" />
            </h2>
            <pre>{JSON.stringify(this.props.localData, null, "  ")}</pre>

            <div className="input-group">
              <input
                className="form-control"
                value={this.state.inputValue}
                onChange={this.onInputChange}
                type="text"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary"
                  onClick={this.onLocalDataButtonClick}
                >
                  <FormattedMessage id="UPDATE_LOCAL_DATA" />
                </button>
              </span>
            </div>
          </section>
        </div>
      </article>
    );
  }

  private onInputChange = (event: TInputEvent) => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  private onAPIDataButtonClick = () => {
    this.props.fetchApiData();
  };

  private onLocalDataButtonClick = () => {
    this.props.setLocalData({ inputValue: this.state.inputValue });
  };
}

const mapStateToProps = (state: any) => ({
  apiData: selectors.getApiData(state),
  localData: selectors.getLocalData(state)
});

const mapDispatchToProps = <T1 extends {}>(dispatch: Dispatch<T1>) =>
  bindActionCreators(
    {
      fetchApiData: actions.fetchApiData.started,
      setLocalData: actions.setLocalData
    },
    dispatch
  );

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  connectIntl(Index)
);
