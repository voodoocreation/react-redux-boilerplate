declare module "*.json";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";

declare module "jest-mock-axios";
declare module "react-relative-time";

// tslint:disable-next-line
interface Window {
  __NEXT_DATA__: {
    initialProps: any;
    props: any;
    page: string;
  };
  __NEXT_REDUX_STORE__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (...args: any[]) => any;
  dataLayer: Array<{}>;
  features: string[];
  google: {
    maps: any;
    [index: string]: any;
  };
  isServer?: boolean;
  Promise: any;
}

type TCurriedReturn<T> = T extends (...args: any[]) => infer R ? R : any;
