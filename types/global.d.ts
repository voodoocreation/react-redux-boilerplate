declare module "*.json";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";

declare module "jest-mock-axios";
declare module "lodash.merge";
declare module "next-redux-saga";
declare module "react-relative-time";
declare module "redux-saga-tester";

type TInputEvent = React.FormEvent<HTMLInputElement>;

// tslint:disable-next-line
interface Window {
  __NEXT_DATA__: {
    initialProps?: any;
    props?: any;
    page?: string;
  };
  __NEXT_REDUX_STORE__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (...args: any[]) => any;
  dataLayer: Array<{}>;
  google: {
    maps: any;
    [index: string]: any;
  };
  isServer?: boolean;
  Promise: any;
}

type TPromiseExecutor = (
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) => void;

interface IStorePorts {
  dataLayer: Array<{}>;
  api: {
    [index: string]: any;
  };
  maps: {
    [index: string]: any;
  };
}

interface IError {
  message: string;
  status: number;
}
