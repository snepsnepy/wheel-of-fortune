<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  color: white;
  align-items: center;
  min-height: 100vh;
  background-color: #0e2148;
}
</style>
