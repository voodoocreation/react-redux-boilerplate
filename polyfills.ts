import "isomorphic-fetch";

/* eslint-disable global-require */

// @ts-ignore
if (!Object.hasOwnProperty.call(Intl, "PluralRules")) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/dist/locale-data/en");
}

if (!Object.hasOwnProperty.call(Intl, "RelativeTimeFormat")) {
  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/en");
}

/* eslint-enable global-require */
