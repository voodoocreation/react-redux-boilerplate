import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';

import en from 'react-intl/locale-data/en';

addLocaleData([...en]);

export default (Page) => {
  const IntlPage = injectIntl(Page);

  class PageWithIntl extends Component {
    static async getInitialProps(context) {
      let props;

      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      const { req } = context;
      const { locale, intlMessages } = req || window.__NEXT_DATA__.props;

      const now = Date.now();

      return { ...props, locale, intlMessages, now };
    }

    render() {
      const { locale, intlMessages, now, ...props } = this.props;

      return (
        <IntlProvider locale={locale} messages={intlMessages} initialNow={now}>
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  }

  PageWithIntl.propTypes = {
    locale: PropTypes.string.isRequired,
    intlMessages: PropTypes.shape({}).isRequired,
    now: PropTypes.number.isRequired,
  };

  return PageWithIntl;
};
