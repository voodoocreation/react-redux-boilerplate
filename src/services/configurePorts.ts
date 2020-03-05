import { configureApi, configureMockApi, TApi, TMockApi } from "./configureApi";
import { configureHttpClient } from "./configureHttpClient";
import { configureLocalStorage } from "./configureLocalStorage";

export interface IPorts {
  api: TApi;
  dataLayer: any[];
  features: string[];
}

export interface IPortsConfig {
  dataLayer?: any[];
  features?: string[];
}

export interface ITestPorts {
  api: TMockApi;
  dataLayer: any[];
  features: string[];
}

export interface ITestPortsParam {
  api?: Partial<TMockApi>;
  dataLayer?: any[];
  features?: string[];
}

export const configurePorts = (config: IPortsConfig = {}): IPorts => {
  const dataLayer: any[] = config.dataLayer || [];
  dataLayer.push = dataLayer.push.bind(dataLayer);

  const api = configureApi(configureHttpClient(), configureLocalStorage());

  return {
    api,
    dataLayer,
    features: config.features || []
  };
};

export const configureTestPorts = (ports: ITestPortsParam = {}): ITestPorts => {
  const dataLayer: any[] = ports.dataLayer ? ports.dataLayer : [];
  const api: TMockApi = { ...configureMockApi(), ...(ports.api as any) };

  return {
    api,
    dataLayer,
    features: ports.features || []
  };
};
