import { test, describe, expect, beforeEach } from "vitest";
import { useCaogoStore } from "../cargo";
import { setActivePinia, createPinia } from "pinia";

describe("cargo", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("should add a cargo", () => {
    const { addCargo, createCargo, cargos } = useCaogoStore();

    addCargo(createCargo({ x: 2, y: 1 }));

    expect(cargos.length).toBe(1);
  });
});
