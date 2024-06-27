import { defineStore } from "pinia";
import { reactive } from "vue";
import { useMapStore } from "./map";
import { useCargoStore } from "./cargo";

export const usePlayerStore = defineStore("player", () => {
  const { isWall } = useMapStore();
  const player = reactive({
    x: 0,
    y: 0,
  });

  function _move(dx: number, dy: number) {
    const nextPosition = {
      x: player.x + dx,
      y: player.y + dy,
    };
    if (isWall(nextPosition)) return;

    const { findCargo, moveCargo } = useCargoStore();
    const cargo = findCargo(nextPosition);

    if (cargo) {
      // const position = {
      //   x: cargo.x + dx,
      //   y: cargo.y + dy,
      // };
      // if (isWall(position)) return;
      // if (findCargo(position)) return;

      // cargo.x += dx;
      // cargo.y += dy;
      const isMoveCargo = moveCargo(cargo, dx, dy);
      if (!isMoveCargo) return;
    }

    player.x += dx;
    player.y += dy;
  }

  function movePlayerToLeft() {
    // if (isWall({ x: player.x - 1, y: player.y })) {
    //   return;
    // }
    // player.x -= 1;
    _move(-1, 0);
  }

  function movePlayerToRight() {
    // if (isWall({ x: player.x + 1, y: player.y })) {
    //   return;
    // }
    // player.x += 1;
    _move(1, 0);
  }

  function movePlayerToUp() {
    // if (isWall({ x: player.x, y: player.y - 1 })) {
    //   return;
    // }
    // player.y -= 1;
    _move(0, -1);
  }

  function movePlayerToDown() {
    // if (isWall({ x: player.x, y: player.y + 1 })) {
    //   return;
    // }
    // player.y += 1;
    _move(0, 1);
  }
  return {
    player,
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown,
  };
});
