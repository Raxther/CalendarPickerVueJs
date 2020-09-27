<template>
  <div id="app">
    <h1 class="header">DatePicker</h1>
    <DatePicker />
  </div>
</template>

<script>
import DatePicker from "./components/DatePicker.vue";

export default {
  name: "App",
  components: {
    DatePicker
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  text-align: center;
}
</style>
