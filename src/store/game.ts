import { defineStore } from "pinia";
import { useCargoStore } from "./cargo";
import { reactive } from "vue";
import { GameData, gameData } from "../components/game/gameData";
import { usePlayerStore } from "./player";
import { useMapStore } from "./map";
import { useTargetStore } from "./target";

interface Game {
  isGameCompleted: boolean;
  level: number;
}

export const useGameStore = defineStore("game", () => {
  const game = reactive<Game>({
    isGameCompleted: false,
    level: 1,
  });

  let _gameData: GameData;

  function detectionGameCompleted() {
    const { cargos } = useCargoStore();
    // console.log(cargos, "cargos");
    game.isGameCompleted = cargos.every((c) => c.onTarget);
  }

  function setupGame(gameData: GameData) {
    _gameData = gameData;
    setupLevel();
  }

  function toNextLevel() {
    game.level += 1;
    game.isGameCompleted = false;
    setupLevel();
  }

  function setupLevel() {
    const levelGameData = _gameData[game.level - 1];
    const { player } = usePlayerStore();
    player.x = levelGameData.player.x;
    player.y = levelGameData.player.y;

    const { setupMap } = useMapStore();
    setupMap(levelGameData.map);

    const { addCargo, createCargo, clearCargo } = useCargoStore();

    clearCargo();
    levelGameData.cargos.forEach((c) => {
      addCargo(createCargo({ x: c.x, y: c.y }));
    });

    const { addTarget, createTarget, clearTarget } = useTargetStore();

    clearTarget();
    levelGameData.targets.forEach((c) => {
      addTarget(createTarget({ x: c.x, y: c.y }));
    });
  }

  return {
    game,
    detectionGameCompleted,
    setupGame,
    setupLevel,
    toNextLevel,
  };
});
