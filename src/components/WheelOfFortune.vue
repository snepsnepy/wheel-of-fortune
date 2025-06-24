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
import { ref, watch } from "vue";

const props = defineProps({
  spinTrigger: Number,
  desiredResult: String,
});

const labels = [
  "TRY_AGAIN",
  "TRY_AGAIN",
  "WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "SUPER_WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "WIN",
];

const angle = 360 / labels.length;
const totalRotation = ref(0);
const fullSpins = 5; // Number of dummy spinns
const alignmentOffset = 2 * angle;

// Get center angle of each wheel slice based on index
const getSliceCenterAngle = (index) => {
  return index * angle + angle / 2 - alignmentOffset;
};

// Get indexes of the elements based on the desiredResult prop
const getTargetSliceIndex = (desiredLabel) => {
  const matchingIndexes = labels
    .map((label, index) => ({ label, index }))
    .filter((item) => item.label === desiredLabel)
    .map((item) => item.index);

  const randomIndex = Math.floor(Math.random() * matchingIndexes.length);

  if (matchingIndexes.length === 0) return null;

  return matchingIndexes[randomIndex];
};

// Watch
watch(
  () => props.spinTrigger,
  () => {
    const currentRotation = totalRotation.value;
    const targetIndex = getTargetSliceIndex(props.desiredResult);
    const sliceCenterAngle = getSliceCenterAngle(targetIndex);

    const normalizedRotation = currentRotation % 360;

    const rotationNeeded =
      fullSpins * 360 + (360 - sliceCenterAngle) - normalizedRotation;

    totalRotation.value += rotationNeeded;
  }
);

const getColorForLabel = (label) => {
  switch (label) {
    case "SUPER_WIN":
      return "#ff0000";
    case "WIN":
      return "#00b300";
    case "TRY_AGAIN":
      return "#fca311";
    default:
      return "#cccccc";
  }
};
</script>

<style scoped>
.wheel-container {
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wheel-container .wheel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 5px #333, 0 0 0 15px #fff, 0 0 0 18px #111;
  transition: transform 3s ease-in-out;
}

.wheel-container .wheel .prize {
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
}

/* Rotate text for each wheel slice */
.wheel-container .wheel .prize span {
  position: relative;
  transform: rotate(45deg);
  font-size: 1.2rem;
  font-weight: 500;
}

.pointer {
  position: absolute;
  top: 10px; /* little down from very top */
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 30px solid #ff0000; /* red pointer */
  z-index: 10; /* above wheel */
  user-select: none;
}
</style>
