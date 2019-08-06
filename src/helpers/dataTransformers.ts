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

export const createSlugFromString = (str: string) =>
  str
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/gm, "and")
    .replace(/\s/gm, "-")
    .replace(/[^\w_-]/gm, "");

export const lengthToDuration = (length: string) => {
  const segments = length.split(":");

  switch (segments.length) {
    case 1:
      return `PT${parseInt(segments[0], 10)}S`;

    case 2:
      return `PT${parseInt(segments[0], 10)}M${parseInt(segments[1], 10)}S`;

    case 3:
      return `PT${parseInt(segments[0], 10)}H${parseInt(
        segments[1],
        10
      )}M${parseInt(segments[2], 10)}S`;

    default:
      throw new Error(`Invalid time format: ${length}`);
  }
};

export const absoluteUrl = (path: string) =>
  process.env.NODE_ENV !== "production"
    ? `http://localhost:${
        process.env.PORT !== "undefined"
          ? process.env.PORT
          : window.location.port
      }${path}`
    : `https://${
        process.env.DOMAIN !== "undefined"
          ? process.env.DOMAIN
          : window.location.host
      }${path}`;

export const extractDomain = (url: string) => url.split("/")[2];

export const toTitleCase = (str: string, delimiter = " ") =>
  str
    .split(delimiter)
    .map((word: string) =>
      word
        .split("")
        .map((letter: string, index: number) =>
          index < 1 ? letter.toUpperCase() : letter
        )
        .join("")
    )
    .join(" ");
