<template>
  <div class="app">
    <WheelOfFortune :spinTrigger="spinCounter" desiredResult="WIN" />
    <button class="spin-button" @click="triggerSpin">SPIN</button>
    {{ spinCounter }}
  </div>
</template>

<script setup>
import WheelOfFortune from "./components/WheelOfFortune.vue";
import { ref } from "vue";

const spinCounter = ref(0);

const triggerSpin = () => {
  spinCounter.value++; // Change the prop to trigger a spin
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #333;
}

.spin-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #fca311;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.spin-button:hover {
  background-color: #e59200;
}
</style>
