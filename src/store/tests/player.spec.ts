import { test, expect, describe, beforeEach } from "vitest";
import { usePlayerStore } from "../player";
import { createPinia, setActivePinia } from "pinia";
import { useMapStore } from "../map";

describe("player", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("normal move", () => {
    beforeEach(() => {
      const { setupMap } = useMapStore();
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]);
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

  describe("collision wall", () => {
    beforeEach(() => {
      const { setupMap } = useMapStore();
      setupMap([
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ]);
    });
    test("should not move to left when collision a wall", () => {
      const { movePlayerToLeft, player } = usePlayerStore();

      player.x = 1;
      player.y = 1;

      movePlayerToLeft();

      expect(player.x).toBe(1);
    });

    test("should not move to right when collision a wall", () => {
      const { movePlayerToRight, player } = usePlayerStore();

      player.x = 3;
      player.y = 1;

      movePlayerToRight();

      expect(player.x).toBe(3);
    });

    test("should not move to up when collision a wall", () => {
      const { movePlayerToUp, player } = usePlayerStore();

      player.x = 1;
      player.y = 1;

      movePlayerToUp();

      expect(player.y).toBe(1);
    });

    test("should not move to down when collision a wall", () => {
      const { movePlayerToDown, player } = usePlayerStore();

      player.x = 1;
      player.y = 3;

      movePlayerToDown();

      expect(player.y).toBe(3);
    });
  });
});
