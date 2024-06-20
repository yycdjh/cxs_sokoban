import { defineStore } from "pinia";
import { reactive } from "vue";
import { Position } from "../composables/usePosition";
import { useMapStore } from "./map";

interface Target {
  x: number;
  y: number;
}

export const useTargetStore = defineStore("target", () => {
  const targets: Target[] = reactive([]);

  function createTarget({ x, y }: { x: number; y: number }): Target {
    return {
      x,
      y,
    };
  }
  function addTarget(target: Target) {
    targets.push(target);
  }

  function findTarget(position: Position) {
    return targets.find((c) => {
      return c.x === position.x && c.y === position.y;
    });
  }

  function moveTarget(target: Target, dx: number, dy: number) {
    const { isWall } = useMapStore();
    const position = {
      x: target.x + dx,
      y: target.y + dy,
    };

    if (isWall(position)) return false;
    if (findTarget(position)) return false;

    target.x += dx;
    target.y += dy;

    return true;
  }
  return {
    targets,
    addTarget,
    createTarget,
    findTarget,
    moveTarget,
  };
});
