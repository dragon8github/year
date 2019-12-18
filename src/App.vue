<template>
  <div id="app">
    <router-view class='view'></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  beforeMount () {
  	
  },
}
</script>

<style>
#app {
	width: 100%;
	height: 100%;
}

.view {
	width: 100%;
	height: 100%;
}
</style>
