<template>
  <section class="wheel-container">
    <div class="wheel">
      <div class="prize" v-for="(label, index) in labels">
        <span>{{ label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const labels = [
  "TRY_AGAIN",
  "WIN",
  "TRY_AGAIN",
  "SUPER_WIN",
  "WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "WIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
  "TRY_AGAIN",
];
</script>

<style scoped>
.wheel-container {
  position: relative;
}
</style>
