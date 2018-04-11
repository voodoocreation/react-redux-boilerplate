interface IRootReducers {
  example: IExampleReducers;
}

interface IExampleReducers {
  apiData: {};
  localData: {
    inputValue: string;
  };
}
