import { configureMockApi, TApi, TMockApi } from "./configureApi";

export interface IPorts {
  api: TApi;
  dataLayer: any[];
  features: string[];
}

type TPortsParam = Partial<IPorts> & {
  api: TApi;
};

export const configurePorts = (ports: TPortsParam): IPorts => {
  const dataLayer: any[] = ports.dataLayer || [];
  dataLayer.push = dataLayer.push.bind(dataLayer);

  return {
    api: ports.api,
    dataLayer,
    features: ports.features || []
  };
};

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

export const configureTestPorts = (ports: ITestPortsParam): ITestPorts => {
  const dataLayer: any[] = ports.dataLayer ? ports.dataLayer : [];
  const api: TMockApi = { ...configureMockApi(), ...(ports.api as any) };

  return {
    api,
    dataLayer,
    features: ports.features || []
  };
};
