<template>
  <div>
    <div class="fix-nav">
      <el-row type="flex" justify="end">
        <el-col :span="1" :xs="5">  <customize :extra.sync="temp.sets" /></el-col>
        <el-col :span="1" :xs="5"><el-button size="mini" type="success" @click="save">保存</el-button></el-col>
      </el-row>
    </div>
    <div class="app-container">

      <el-form ref="form" label-width="100px">
        <CustomizeView :extra.sync="temp.sets" />
      </el-form>

    </div>
  </div>

</template>

<script>
import { getSite, saveSite } from '@/api/site.js'
import customize from '@/components/Customize'
import CustomizeView from '@/components/CustomizeView'
export default {
  name: 'Site',
  components: {
    customize,
    CustomizeView
  },
  props: {},
  data() {
    return {
      loading: true,
      temp: {
        id: undefined,
        sets: [],
        title: undefined
      }

    }
  },
  created() {
    this.fetchSite()
  },
  mounted() {},
  methods: {

    fetchSite() {
      getSite().then(Response => {
        this.temp.id = Response.id
        this.temp.title = Response.title
        this.temp.type = Response.type
        this.temp.sets = Response.sets
      })
    },
    save() {
      saveSite(this.temp).then(Response => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-nav{
  background: #d0d0d0;
    z-index: 10;
    height: 50px;
    width: 100%;

    line-height: 50px;
    padding-right: 20px;
}

</style>
