import { test, expect, describe, beforeEach } from "vitest";
import { usePlayerStore } from "../player";
import { createPinia, setActivePinia } from "pinia";

describe("player", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should move to left", () => {
    const { movePlayerToLeft, player } = usePlayerStore();
    player.x = 1;
    player.y = 1;

    movePlayerToLeft();
    expect(player.x).toBe(0);
  });

  test("should move to right", () => {
    const { movePlayerToRight, player } = usePlayerStore();
    player.x = 1;
    player.y = 1;

    movePlayerToRight();
    expect(player.x).toBe(2);
  });

  test("should move to up", () => {
    const { movePlayerToUp, player } = usePlayerStore();
    player.x = 1;
    player.y = 1;

    movePlayerToUp();
    expect(player.y).toBe(0);
  });

  test("should move to down", () => {
    const { movePlayerToDown, player } = usePlayerStore();

    player.x = 1;
    player.y = 1;

    movePlayerToDown();
    expect(player.y).toBe(2);
  });
});
