<template>
  <div class="dashboard-container" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {

  },
  data() {
    return {
      fileList: [

      ],
      img: '',
      content:
      ``
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {

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
