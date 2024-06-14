import { createPinia, setActivePinia } from "pinia";
import { test, expect, describe, beforeEach } from "vitest";
import { usePlayerStore } from "../../../store/player";
import { useMove } from "../player";
import { useMapStore } from "../../../store/map";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("player", () => {
  beforeEach(() => {
    const { setupMap } = useMapStore();
    setupMap([
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ]);
  });
  test("should", () => {
    const { player } = usePlayerStore();
    player.x = 1;
    player.y = 1;

    useMove();

    window.dispatchEvent(new KeyboardEvent("keyup", { code: "ArrowLeft" }));

    expect(player.x).toBe(0);
  });
});
