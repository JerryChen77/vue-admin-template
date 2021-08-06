<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎光临 ：{{user.loginName}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Site',
  data() {
    return {
      user: {
        loginName: ''
      }
    }
  },
  mounted() {
    this.user.loginName = this.$store.getters.user.userName
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
