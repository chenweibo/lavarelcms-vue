<template>
  <div>
    <svg-icon icon-class="clear" @click="clear" />
  </div>
</template>

<script>
import { clearCache } from '@/api/tools'
export default {
  name: 'ClearCache',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    clear() {
      this.$confirm('是否清除缓存,并且切换到debug模式。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearCache().then(response => {
          this.$message({
            type: 'success',
            message: '清除成功!'
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
