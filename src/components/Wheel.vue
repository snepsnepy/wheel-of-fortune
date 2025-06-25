<template>
  <section class="wheel-container">
    <div class="pointer"></div>

    <div class="wheel" :style="{ transform: `rotate(${totalRotation}deg)` }">
      <div
        class="prize"
        v-for="(label, index) in labels"
        :key="index"
        :style="{
          '--i': index,
          '--angle': angle + 'deg',
          backgroundColor: getColorForLabel(label),
        }"
      >
        <span>{{ label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const labels = [
  "TRY AGAIN",
  "TRY AGAIN",
  "WIN",
  "TRY AGAIN",
  "TRY AGAIN",
  "SUPER WIN",
  "TRY AGAIN",
  "TRY AGAIN",
  "WIN",
  "TRY AGAIN",
  "TRY AGAIN",
  "WIN",
];

const angle = 360 / labels.length;
const totalRotation = ref(0);
const fullSpins = 5; // Number of dummy spinns
const alignmentOffset = 2 * angle;

const emit = defineEmits(["spin-complete"]);

// Get color for each slice depending on the type of winning
const getColorForLabel = (label) => {
  switch (label) {
    case "SUPER WIN":
      return "#FFB22C";
    case "WIN":
      return "#0065F8";
    case "TRY AGAIN":
      return "#98A1BC";
    default:
      return "#cccccc";
  }
};

// Get center angle of each wheel slice based on index
const getSliceCenterAngle = (index) => {
  return index * angle + angle / 2 - alignmentOffset;
};

const spinTheWheel = (index) => {
  const currentRotation = totalRotation.value;
  const normalizedRotation = currentRotation % 360;

  const sliceCenterAngle = getSliceCenterAngle(index);
  const fullRotation = fullSpins * 360;
  const rotationToTarget = 360 - sliceCenterAngle - normalizedRotation;

  totalRotation.value += fullRotation + rotationToTarget;

  setTimeout(() => {
    const result = labels[index];
    emit("spin-complete", result);
  }, 3000);
};

defineExpose({ spinTheWheel });
</script>

<style scoped lang="scss">
.wheel-container {
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  .wheel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 5px #333, 0 0 0 15px #e9dfc3, 0 0 0 18px #111;
    transition: transform 3s ease-in-out;

    .prize {
      position: absolute;
      width: 50%;
      height: 50%;
      transform-origin: bottom right;
      transform: rotate(calc(var(--angle) * var(--i)));
      clip-path: polygon(0 0, 42% 0, 100% 100%, 0 40%);
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;

      span {
        position: relative;
        transform: rotate(45deg);
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }

  .pointer {
    position: absolute;
    top: -10px; /* position from the top */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 30px solid #e9dfc3; /* pointer color */
    z-index: 10; /* position above the wheel */
    user-select: none;
  }
}
</style>
