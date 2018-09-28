import cn from "classnames";
import Head from "next/head";
import * as React from "react";
import { InjectedIntl, injectIntl } from "react-intl";
import { connect } from "react-redux";

import { isServer } from "../../../helpers/dom";
import * as selectors from "../../../selectors/root.selectors";

interface IStoreProps {
  isLoading: boolean;
}

interface IProps extends IStoreProps {
  className?: string;
  intl: InjectedIntl;
}

class Shell extends React.Component<IProps> {
  public componentWillMount() {
    if (!isServer()) {
      const html = document.documentElement as HTMLHtmlElement;
      html.classList.add("isClientRendered");
    }
  }

  public render() {
    const { children, className, isLoading } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <article className={cn("Page", { isLoading }, className)}>
        <Head>
          <meta
            property="og:site_name"
            content={formatMessage({ id: "BRAND_NAME" })}
          />
        </Head>

        <main className="Page-body container" role="main">
          {children}
        </main>
      </article>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoading: selectors.getPageIsLoading(state)
});

export default injectIntl<any>(connect<IStoreProps>(mapStateToProps)(Shell));
