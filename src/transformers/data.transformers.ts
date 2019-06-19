export const arrayToAssoc = (
  array: Array<{}>,
  key: string,
  failSilently = true
) =>
  array.reduce(
    (
      acc: { [index: string]: {} },
      curr: { [index: string]: any },
      index: number
    ) => {
      if (curr[key] !== undefined) {
        acc[curr[key]] = curr;
      } else if (!failSilently) {
        throw new Error(`Key '${key}' not found at index ${index}`);
      }
      return acc;
    },
    {}
  );

export const assocToArray: (object: any) => any = object =>
  Object.keys(object).reduce((acc: Array<{}>, curr: string) => {
    acc.push(object[curr]);
    return acc;
  }, []);

export const tryParseJson = (json: any) => {
  let result;

  try {
    let value = json;

    if (json.message) {
      value = json.message;
    }

    result = JSON.parse(value);
  } catch (error) {
    result = json;
  }

  return result;
};

export const createSlugFromString = (str: string) =>
  str
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/gm, "and")
    .replace(/\s/gm, "-")
    .replace(/[^\w_-]/gm, "");

export const absoluteUrl = (path: string) => {
  if (process.env.NODE_ENV !== "production") {
    const port =
      process.env.PORT !== "undefined"
        ? process.env.PORT
        : window.location.port;

    return `http://localhost:${port}${path}`;
  }

  return `http://example.com${path}`;
};
