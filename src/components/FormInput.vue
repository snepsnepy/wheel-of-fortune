<template>
  <div class="input-container">
    <label :for="id"> {{ label }} *</label>
    <input
      :id="id"
      v-model="modelValue"
      type="text"
      class="form-input"
      :class="{ 'has-error': error }"
    />
    <p v-if="error" class="input-error-message">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  error: String,
  id: String,
});

const modelValue = defineModel("modelValue");
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: column;

  input {
    height: 30px;
    width: 300px;
    border-radius: 8px;
    padding-left: 8px;
  }

  .input-error-message {
    color: red;
    font-size: 12px;
  }
}
</style>
