import cn from "classnames";
import Head from "next/head";
import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { connect } from "react-redux";

import { TStoreState } from "../../../reducers/root.reducers";
import * as selectors from "../../../selectors/root.selectors";

import "./Page.scss";

interface IProps extends WrappedComponentProps {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
}

const Page: React.FC<IProps> = ({ children, className, intl, isLoading }) => (
  <article className={cn("Page", className, { isLoading })}>
    <Head>
      <meta
        content={intl.formatMessage({ id: "BRAND_NAME" })}
        property="og:site_name"
      />
    </Head>

    <main className="Page--body" role="main">
      {isLoading ? null : children}
    </main>
  </article>
);

const mapState = (state: TStoreState) => ({
  isLoading: selectors.isAppLoading(state),
});

export default injectIntl(connect(mapState)(Page));
