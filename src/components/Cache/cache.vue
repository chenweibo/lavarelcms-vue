<template>
  <div>
    <svg-icon icon-class="cache" @click="cache" />
  </div>
</template>

<script>
import { Cache } from '@/api/tools'
export default {
  name: 'Cache',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    cache() {
      this.$confirm('一键缓存配置文件，以及路由文件，加快站点访问速度。如修改文件或者配置则需清除缓存。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cache().then(response => {
          this.$message({
            type: 'success',
            message: '缓存成功!'
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
