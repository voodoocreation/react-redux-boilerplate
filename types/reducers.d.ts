interface IRootReducers {
  example: IExampleReducers;
  page: IPageReducers;
}

interface IExampleReducers {
  apiData: {};
  localData: {
    inputValue: string;
  };
}

interface IPageReducers {
  error?: IError;
  isLoading: boolean;
  transitioningTo?: string;
}
