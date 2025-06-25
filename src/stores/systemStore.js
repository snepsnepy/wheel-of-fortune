import { defineStore } from "pinia";
import { ref } from "vue";

export const useSystemStore = defineStore("systemStore", () => {
  const SPIN_COST = 10;
  const INITIAL_BALANCE = 50;

  const user = ref();
  const availableBalance = ref(0);

  const updateUserData = (userData) => {
    user.value = userData;
  };

  const initializeBalance = () => {
    availableBalance.value = INITIAL_BALANCE;
  };

  const deductSpinCost = () => {
    availableBalance.value -= SPIN_COST;
  };

  const addToBalance = (value) => {
    availableBalance.value += value;
  };

  return {
    user,
    availableBalance,
    updateUserData,
    initializeBalance,
    deductSpinCost,
    addToBalance,
    SPIN_COST,
  };
});
