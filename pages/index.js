import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import { FormattedMessage, intlShape } from 'react-intl';

import connectIntl from '../src/helpers/connectIntl';
import store from '../src/store/root.store';
import * as actions from '../src/actions/root.actions';
import * as selectors from '../src/selectors/root.selectors';

class Index extends Component {
  constructor() {
    super();

    this.input = null;
    this.state = {
      inputValue: 0,
    };
  }

  onAPIDataButtonClick = () => {
    this.props.fetchApiData.request();
  };

  onLocalDataButtonClick = () => {
    this.props.setLocalData({ inputValue: this.input.value });
  };

  render() {
    return (
      <article>
        <Head>
          <title>{this.props.intl.formatMessage({ id: 'INDEX_TITLE' })}</title>
          <meta
            name="description"
            content={this.props.intl.formatMessage({ id: 'INDEX_DESCRIPTION' })}
          />
        </Head>

        <h1><FormattedMessage id="INDEX_TITLE" /></h1>
        <p><FormattedMessage id="INDEX_DESCRIPTION" /></p>

        <div className="row">
          <section className="col-sm-6">
            <h2><FormattedMessage id="API_DATA" /></h2>
            <pre>{JSON.stringify(this.props.apiData, null, '  ')}</pre>

            <button className="btn btn-primary" onClick={this.onAPIDataButtonClick}>
              <FormattedMessage id="FETCH_API_DATA" />
            </button>
          </section>

          <section className="col-sm-6">
            <h2><FormattedMessage id="LOCAL_DATA" /></h2>
            <pre>{JSON.stringify(this.props.localData, null, '  ')}</pre>

            <div className="input-group">
              <input
                className="form-control"
                type="text"
                defaultValue={this.props.localData.inputValue}
                ref={(el) => { this.input = el; }}
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" onClick={this.onLocalDataButtonClick}>
                  <FormattedMessage id="UPDATE_LOCAL_DATA" />
                </button>
              </span>
            </div>
          </section>
        </div>
      </article>
    );
  }
}

Index.propTypes = {
  intl: intlShape.isRequired,
  apiData: PropTypes.shape({}),
  localData: PropTypes.shape({
    inputValue: PropTypes.string,
  }),
  fetchApiData: PropTypes.shape({
    request: PropTypes.func.isRequired,
  }).isRequired,
  setLocalData: PropTypes.func.isRequired,
};

Index.defaultProps = {
  apiData: {},
  localData: {},
};

const mapStateToProps = state => Object.assign({}, {
  apiData: selectors.getApiData(state),
  localData: selectors.getLocalData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchApiData: bindActionCreators(actions.fetchApiData, dispatch),
  setLocalData: bindActionCreators(actions.setLocalData, dispatch),
});

export default withRedux(store, mapStateToProps, mapDispatchToProps)(connectIntl(Index));
