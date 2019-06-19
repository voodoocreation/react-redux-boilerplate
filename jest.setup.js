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
