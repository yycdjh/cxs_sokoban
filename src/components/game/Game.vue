<template>
  <div>
    <Map></Map>
    <template v-for="target in targets">
      <Target :x="target.x" :y="target.y"></Target>
    </template>
    <Player></Player>
    <template v-for="cargo in cargos">
      <Cargo :cargo="cargo"></Cargo>
    </template>
    <div v-if="game.isGameCompleted" class="bg-red-500">
      <button>下一关</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "./Map.vue";
import Player from "./Player.vue";
import Cargo from "./Cargo.vue";
import Target from "./Target.vue";

import { useCargoStore } from "../../store/cargo";
import { useTargetStore } from "../../store/target";
import { useGameStore } from "../../store/game";
import { levelGameData } from "./gameData";

const { game, setupGame } = useGameStore();
const { targets } = useTargetStore();
const { cargos } = useCargoStore();

setupGame(levelGameData);
</script>

<style scoped></style>
