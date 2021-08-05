<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  created() {
    localStorage.getItem('userMsg') && this.$store.replaceState(JSON.parse(localStorage.getItem('userMsg')));
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('userMsg', JSON.stringify(this.$store.state))
    })
    console.log(localStorage.getItem('userMsg'))
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }

  }}
</script>
