<template>
  <div class="absolute" :style="position">
    <img :src="keeperImg" alt="" />
  </div>
</template>

<script setup lang="ts">
import keeperImg from "../../assets/keeper.png";
import { usePosition } from "../../composables/usePosition";
import { usePlayerStore } from "../../store/player";
import { useMove } from "./player";

useMove();
const { player } = usePlayerStore();
const { position } = usePosition(player);
</script>

<style scoped></style>
