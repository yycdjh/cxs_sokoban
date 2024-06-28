import { test, describe, expect, beforeEach } from "vitest";
import { useCargoStore } from "../cargo";
import { useTargetStore } from "../target";
import { createPinia, setActivePinia } from "pinia";
import { useGameStore } from "../game";
import { useMapStore } from "../map";
import { usePlayerStore } from "../player";
import {
  GameData,
  LevelGameData,
  levelGameData,
} from "../../components/game/gameData";

const firstLevelGameData: LevelGameData = {
  player: {
    x: 1,
    y: 1,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
  ],
};
const secondLevelGameData: LevelGameData = {
  player: {
    x: 1,
    y: 2,
  },
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
  ],
  targets: [
    {
      x: 4,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
  ],
};

const gameData: GameData = [firstLevelGameData, secondLevelGameData];
describe("game", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const { setupMap } = useMapStore();
    setupMap([
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ]);
  });
  test("should game completed", () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore();
    const cargo = createCargo({ x: 2, y: 1 });
    addCargo(cargo);

    const { addTarget, createTarget } = useTargetStore();
    addTarget(createTarget({ x: 3, y: 1 }));

    moveCargo(cargo, 1, 0);

    const { detectionGameCompleted, game } = useGameStore();
    detectionGameCompleted();

    expect(game.isGameCompleted).toBe(true);
  });
  test("should game not completed", () => {
    const { addCargo, createCargo, moveCargo } = useCargoStore();
    const cargo = createCargo({ x: 2, y: 1 });
    addCargo(cargo);

    const { addTarget, createTarget } = useTargetStore();
    addTarget(createTarget({ x: 3, y: 1 }));

    moveCargo(cargo, 1, 0);
    moveCargo(cargo, 1, 0);

    const { detectionGameCompleted, game } = useGameStore();
    detectionGameCompleted();

    expect(game.isGameCompleted).toBe(false);
  });

  test("should setup game", () => {
    const { setupGame } = useGameStore();

    setupGame(gameData);

    expectSetupLevelGameData(firstLevelGameData);
  });

  test("should to next level", () => {
    const { setupGame, game, toNextLevel } = useGameStore();
    setupGame(gameData);

    toNextLevel();
    expect(game.level).toBe(2);
    expectSetupLevelGameData(secondLevelGameData);
  });

  test("should be reset game completed when to next level", () => {
    const { setupGame, game, toNextLevel } = useGameStore();
    setupGame(gameData);
    game.isGameCompleted = true;
    toNextLevel();
    expect(game.isGameCompleted).toBe(false);
  });
});

function expectSetupLevelGameData(levelGameData: LevelGameData) {
  const { player } = usePlayerStore();
  const { map } = useMapStore();
  const { cargos } = useCargoStore();
  const { targets } = useTargetStore();
  expect(player.x).toBe(levelGameData.player.x);
  expect(player.y).toBe(levelGameData.player.y);
  expect(map).toEqual(levelGameData.map);
  expect(cargos.length).toBe(levelGameData.cargos.length);
  expect(targets.length).toBe(levelGameData.targets.length);
}
