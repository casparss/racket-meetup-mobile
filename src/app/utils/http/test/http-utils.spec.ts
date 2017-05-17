import { HttpUtils } from '../http-utils';

describe("HttpUtils", () => {

  it("urlParams()", () => {
    let urlParams = {
      one: "one",
      two: "two",
      three: "three"
    };

    let paramsObject = HttpUtils.urlParams(urlParams);

    expect(paramsObject.get("one")).toBe("one");
    expect(paramsObject.get("two")).toBe("two");
    expect(paramsObject.get("three")).toBe("three");
  });

});
