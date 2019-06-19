import cn from "classnames";
import Head from "next/head";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import { IStoreState } from "../../../reducers/root.reducers";
import * as selectors from "../../../selectors/root.selectors";

interface IProps extends InjectedIntlProps {
  className?: string;
  isLoading: boolean;
}

class Page extends React.Component<IProps> {
  public render() {
    const { children, className, isLoading } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <article className={cn("Page", className, { isLoading })}>
        <Head>
          <meta
            property="og:site_name"
            content={formatMessage({ id: "BRAND_NAME" })}
          />
        </Head>

        <main className="Page--body container" role="main">
          {isLoading ? null : children}
        </main>
      </article>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({
  isLoading: selectors.isAppLoading(state)
});

const PageWrapped = injectIntl(connect(mapStateToProps)(Page));

export default PageWrapped;
