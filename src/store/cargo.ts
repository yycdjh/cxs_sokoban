import { defineStore } from "pinia";
import { reactive } from "vue";
import { Position } from "../composables/usePosition";

interface Cargo {
  x: number;
  y: number;
}

export const useCaogoStore = defineStore("cargo", () => {
  const cargos: Cargo[] = reactive([]);

  function createCargo({ x, y }: { x: number; y: number }): Cargo {
    return {
      x,
      y,
    };
  }
  function addCargo(cargo: Cargo) {
    cargos.push(cargo);
  }

  function findCargo(position: Position) {
    return cargos.find((c) => {
      return c.x === position.x && c.y === position.y;
    });
  }
  return {
    cargos,
    addCargo,
    createCargo,
    findCargo,
  };
});
