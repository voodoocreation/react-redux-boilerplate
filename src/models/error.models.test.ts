import { error } from "./root.models";

describe("[models] Error", () => {
  it("creates a valid object with defaults", () => {
    expect(error()).toEqual({
      message: "An error has occurred",
      status: 500,
    });
  });

  it("creates a valid object when all properties are defined", () => {
    const options = {
      message: "Not found",
      status: 404,
    };

    expect(error(options)).toEqual(options);
  });
});
