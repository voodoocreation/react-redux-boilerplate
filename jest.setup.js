import util from "util";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MockDate from "mockdate";

Enzyme.configure({ adapter: new Adapter() });

MockDate.set("2018-01-01T00:00:00", 0);

global.dataLayer = [];
global.google = {
  maps: {
    Geocoder: jest.fn(() => ({
      geocode: jest.fn((_, callback) =>
        callback(
          [
            {
              geometry: {
                location: { lat: () => 51.54057, lng: () => -0.14334 }
              }
            }
          ],
          "OK"
        )
      )
    })),
    GeocoderStatus: {
      OK: "OK",
      REQUEST_DENIED: "REQUEST_DENIED"
    },
    Map: jest.fn(() => ({
      setCenter: jest.fn(),
      setOptions: jest.fn(),
      setZoom: jest.fn()
    })),
    Marker: jest.fn(() => ({
      setMap: jest.fn(),
      setPosition: jest.fn()
    }))
  }
};
global.location.assign = jest.fn();
global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.scrollTo = jest.fn();

global.findMockCall = (mockFn, ...args) =>
  mockFn.mock.calls.find(call =>
    args.reduce((acc, curr, index) => acc && call[index] === curr, true)
  );
global.mockElement = (width = 0, height = 0, top = 0, left = 0) => ({
  getBoundingClientRect: () => ({
    bottom: top + height,
    left,
    right: left + width,
    top
  })
});

/* eslint-disable no-console */
// nobody cares about warnings so lets make them errors
// keep a reference to the original console methods
const consoleWarn = console.warn;
const consoleError = console.error;

function logToError(...rest) {
  const error = util.format.apply(this, rest);

  throw new Error(error);
}

jasmine.getEnv().beforeEach(() => {
  // make calls to console.warn and console.error throw an error
  console.warn = logToError;
  console.error = logToError;
});

jasmine.getEnv().afterEach(() => {
  // return console.warn and console.error to default behaviour
  console.warn = consoleWarn;
  console.error = consoleError;
});

// In Node v7 and below, unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on("unhandledRejection", reason => {
    throw reason;
  });

  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
