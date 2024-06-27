import { defineStore } from "pinia";
import { useCargoStore } from "./cargo";
import { reactive } from "vue";
import { LevelGameData } from "../components/game/gameData";
import { usePlayerStore } from "./player";
import { useMapStore } from "./map";
import { useTargetStore } from "./target";

interface Game {
  isGameCompleted: boolean;
}

export const useGameStore = defineStore("game", () => {
  const game = reactive<Game>({
    isGameCompleted: false,
  });

  function detectionGameCompleted() {
    const { cargos } = useCargoStore();
    // console.log(cargos, "cargos");
    game.isGameCompleted = cargos.every((c) => c.onTarget);
  }

  function setupGame(levelGameData: LevelGameData) {
    const { player } = usePlayerStore();
    player.x = levelGameData.player.x;
    player.y = levelGameData.player.y;

    const { setupMap } = useMapStore();
    setupMap(levelGameData.map);

    const { addCargo, createCargo } = useCargoStore();

    levelGameData.cargos.forEach((c) => {
      addCargo(createCargo({ x: c.x, y: c.y }));
    });

    const { addTarget, createTarget } = useTargetStore();

    levelGameData.targets.forEach((c) => {
      addTarget(createTarget({ x: c.x, y: c.y }));
    });
  }

  return {
    game,
    detectionGameCompleted,
    setupGame,
  };
});
