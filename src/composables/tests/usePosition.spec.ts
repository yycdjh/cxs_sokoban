import { test, describe, expect } from "vitest";
import { Position, usePosition } from "../usePosition";
import { reactive } from "vue";

describe("usePosition", () => {
  test("should return position", () => {
    const prop: Position = {
      x: 1,
      y: 1,
    };

    const { position } = usePosition(prop);

    expect(position.value).toEqual({
      left: "32px",
      top: "32px",
    });
  });

  test("should update position when reactive data changed", () => {
    const prop: Position = {
      x: 1,
      y: 1,
    };

    const { position } = usePosition(prop);

    prop.x = 2;
    expect(position.value).toEqual({
      left: "64px",
      top: "32px",
    });
  });
});
