<template>
  <div id="app">
    <ul id="wrap">
      <li
        class="box"
        v-for="num in nums"
        v-text="num"
        v-getclass="num"
        v-getposition="$index"
        track-by="$index"
      ></li>
    </ul>
    <div class="mask" v-show="show===1" @click="show=0" transition="show">
      <div>{{msg}}</div>
    </div>
    <button @click="reset">重置</button>
  </div>
</template>

<script>
import app from "./app.js";
export default app;
</script>

<style>
@import url(./main.css);
</style>