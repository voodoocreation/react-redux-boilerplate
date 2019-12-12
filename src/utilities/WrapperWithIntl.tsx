import * as React from "react";
import { IntlConfig } from "react-intl";
import { WrapperWithIntl as BaseWrapper } from "react-test-wrapper";

import messages from "../locales/en-NZ";

export default class WrapperWithIntl<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends BaseWrapper<C, P> {
  protected intlProviderProps: Partial<IntlConfig> = {
    messages
  };
}
