<template>
  <section class="container">
    <header class="header">
      <h1>Welcome, {{ getUserName }}</h1>
      <p class="balance">Your balance: {{ store.availableBalance }}</p>

      <p v-if="canSpin" class="winning-message">{{ winningMessage }}</p>
      <p v-else-if="!canSpin && !isSpinning" class="error-message">
        Insufficient funds!
      </p>
    </header>

    <Wheel ref="wheelRef" @spin-complete="handlePrizeResult" />

    <button
      class="button"
      @click="triggerSpin"
      :disabled="!canSpin || isSpinning"
    >
      SPIN THE WHEEL
    </button>
  </section>
</template>

<script setup>
import Wheel from "../components/Wheel.vue";
import axios from "axios";
import { useSystemStore } from "../stores/systemStore";
import { ref, computed } from "vue";

const store = useSystemStore();
const wheelRef = ref(null);
const winningMessage = ref("");
const isSpinning = ref(false);

const SUPER_WIN = 50;
const WIN = 20;

const clearWinningMessage = () => {
  winningMessage.value = "";
};

const getUserName = computed(() => {
  return `${store.user.name} ${store.user.surname}`;
});

const canSpin = computed(() => store.availableBalance >= store.SPIN_COST);

const getSpinResultFromServer = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/spin");
    return response.data.index;
  } catch (error) {
    console.error("Error fetching spin result:", error);
    throw error;
  }
};

const triggerSpin = async () => {
  if (!canSpin.value || isSpinning.value) return;
  isSpinning.value = true;

  setTimeout(() => {
    isSpinning.value = false;
  }, 3500);

  try {
    const index = await getSpinResultFromServer();
    store.deductSpinCost();
    clearWinningMessage();
    wheelRef.value?.spinTheWheel(index);
  } catch (error) {
    console.error("Failed to get random index:", error);
  }
};

const handlePrizeResult = (result) => {
  switch (result) {
    case "SUPER WIN":
      store.addToBalance(SUPER_WIN);
      winningMessage.value = "SUPER WIN! You won $50!";
      break;
    case "WIN":
      store.addToBalance(WIN);
      winningMessage.value = "WIN! You won $20!";
      break;
    case "TRY AGAIN":
      winningMessage.value = "Try again!";
      break;
    default:
      winningMessage.value = "Error occured.";
  }
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as *;

.container {
  @include container;

  .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 12px;
    min-height: 100px;

    .balance {
      font-size: 20px;
      line-height: 20px;
      font-weight: 500;
    }

    .winning-message {
      @include message-style(yellow);
    }

    .error-message {
      @include message-style(red);
    }
  }

  .button {
    @include button;
  }
}
</style>
