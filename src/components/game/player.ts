import { useGameStore } from "../../store/game";
import { usePlayerStore } from "../../store/player";

export function useMove() {
  const {
    movePlayerToLeft,
    movePlayerToRight,
    movePlayerToUp,
    movePlayerToDown,
  } = usePlayerStore();

  const { detectionGameCompleted } = useGameStore();

  window.addEventListener("keyup", (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowLeft":
        movePlayerToLeft();
        break;
      case "ArrowRight":
        movePlayerToRight();
        break;
      case "ArrowUp":
        movePlayerToUp();
        break;
      case "ArrowDown":
        movePlayerToDown();
        break;
      default:
        break;
    }
    detectionGameCompleted();
  });
}
