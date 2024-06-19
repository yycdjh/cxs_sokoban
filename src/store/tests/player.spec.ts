import { test, expect, describe, beforeEach } from "vitest";
import { usePlayerStore } from "../player";
import { createPinia, setActivePinia } from "pinia";
import { useMapStore } from "../map";
import { useCaogoStore } from "../cargo";

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

  describe("push a cargo", () => {
    beforeEach(() => {
      const map = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ];
      const { setupMap } = useMapStore();
      setupMap(map);
    });
    test("should push a cargo to  left", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 2, y: 1 });
      addCargo(cargo);

      const { player, movePlayerToLeft } = usePlayerStore();
      player.x = 3;
      player.y = 1;

      movePlayerToLeft();

      expect(player.x).toBe(2);
      expect(cargo.x).toBe(1);
    });
    test("should push a cargo to  right", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 2, y: 1 });
      addCargo(cargo);

      const { player, movePlayerToRight } = usePlayerStore();
      player.x = 1;
      player.y = 1;

      movePlayerToRight();

      expect(player.x).toBe(2);
      expect(cargo.x).toBe(3);
    });
    test("should push a cargo to  up", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 1, y: 2 });
      addCargo(cargo);

      const { player, movePlayerToUp } = usePlayerStore();
      player.x = 1;
      player.y = 3;

      movePlayerToUp();

      expect(player.y).toBe(2);
      expect(cargo.y).toBe(1);
    });
    test("should push a cargo to  dowm", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 1, y: 2 });
      addCargo(cargo);

      const { player, movePlayerToDown } = usePlayerStore();
      player.x = 1;
      player.y = 1;

      movePlayerToDown();

      expect(player.y).toBe(2);
      expect(cargo.y).toBe(3);
    });
  });

  describe("should not push cargo when the cargo hits wall", () => {
    beforeEach(() => {
      const { setupMap } = useMapStore();
      const map = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ];
      setupMap(map);
    });
    test("player push cargo hits left wall", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 1, y: 1 });
      addCargo(cargo);

      const { player, movePlayerToLeft } = usePlayerStore();
      player.x = 2;
      player.y = 1;

      movePlayerToLeft();

      expect(player.x).toBe(2);
      expect(cargo.x).toBe(1);
    });

    test("player push cargo hits right wall", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 3, y: 1 });
      addCargo(cargo);

      const { player, movePlayerToRight } = usePlayerStore();
      player.x = 2;
      player.y = 1;

      movePlayerToRight();

      expect(player.x).toBe(2);
      expect(cargo.x).toBe(3);
    });
    test("player push cargo hits up wall", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 1, y: 1 });
      addCargo(cargo);

      const { player, movePlayerToUp } = usePlayerStore();
      player.x = 1;
      player.y = 2;

      movePlayerToUp();

      expect(player.y).toBe(2);
      expect(cargo.y).toBe(1);
    });
    test("player push cargo hits down wall", () => {
      const { createCargo, addCargo } = useCaogoStore();
      const cargo = createCargo({ x: 1, y: 3 });
      addCargo(cargo);

      const { player, movePlayerToDown } = usePlayerStore();
      player.x = 1;
      player.y = 2;

      movePlayerToDown();

      expect(player.y).toBe(2);
      expect(cargo.y).toBe(3);
    });
  });
});
