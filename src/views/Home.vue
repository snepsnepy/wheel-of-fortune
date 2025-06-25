<template>
  <section class="container">
    <h1>Registration Form</h1>
    <form @submit.prevent="submitForm" class="form">
      <FormInput
        label="Name"
        v-model:modelValue="user.name"
        :error="errors.name"
        id="name"
      />

      <FormInput
        label="Surname"
        v-model:modelValue="user.surname"
        :error="errors.surname"
        id="surname"
      />

      <FormInput
        label="Email"
        v-model:modelValue="user.email"
        :error="errors.email"
        id="email"
      />

      <button class="button" type="submit">Submit</button>
    </form>
  </section>
</template>
<script setup>
import { useSystemStore } from "../stores/systemStore";
import FormInput from "../components/FormInput.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const store = useSystemStore();
const router = useRouter();
const INITIAL_BALANCE = 50;

const user = reactive({
  name: "",
  surname: "",
  email: "",
});

const errors = reactive({
  name: "",
  surname: "",
  email: "",
});

function validateEmail(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

function isFormValid() {
  errors.name = user.name ? "" : "Name is required.";
  errors.surname = user.surname ? "" : "Surname is required.";
  errors.email = validateEmail(user.email)
    ? ""
    : "Please enter a valid email address.";

  return !errors.name && !errors.surname && !errors.email;
}

function submitForm() {
  if (isFormValid()) {
    store.updateUserData(user);
    store.initializeBalance(INITIAL_BALANCE);
    router.push({ path: "/game" });
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button {
  background-color: #ea4c89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button:hover {
  background-color: #f082ac;
}

.button:disabled {
  pointer-events: none;
  background-color: #ea4c89;
  opacity: 70%;
}
</style>
