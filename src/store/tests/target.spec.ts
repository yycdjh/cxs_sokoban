import { test, describe, expect, beforeEach } from "vitest";
import { useTargetStore } from "../target";
import { createPinia, setActivePinia } from "pinia";

describe("target", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  test("should clear all target", () => {
    const { createTarget, addTarget, targets, clearTarget } = useTargetStore();

    addTarget(createTarget({ x: 0, y: 0 }));
    addTarget(createTarget({ x: 1, y: 1 }));

    clearTarget();

    expect(targets.length).toBe(0);
  });
});
