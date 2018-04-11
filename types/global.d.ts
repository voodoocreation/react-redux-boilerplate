declare module "*.json";
declare module "*.png";

declare module "lodash.merge";
declare module "redux-saga-tester";

type TInputEvent = React.FormEvent<HTMLInputElement>;

// tslint:disable-next-line
interface Window {
  __NEXT_DATA__: {
    props: any;
  };
  __NEXT_REDUX_STORE__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => any;
  ga: any;
  Promise: any;
}

interface IStorePorts {
  analytics: (name: string, payload: {}, args?: {}) => any;
  api: {
    [index: string]: any;
  };
}
