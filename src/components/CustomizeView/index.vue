<template>
  <div>
    <el-form-item v-for="(item,k) in extra" :key="k" :label="item.title">

      <el-input v-if="item.type==='input'" v-model="item.value" :placeholder="'请输入'+item.title" />

      <el-input
        v-if="item.type==='textarea'"
        v-model="item.value"
        type="textarea"
        :rows="2"
        :placeholder="'请输入'+item.title"
      />
      <tinymce v-if="item.type==='editor'" v-model="item.value" :height="300" />

      <MoreImgUpload v-if="item.type==='imgMoreUpload'" :file-list.sync="item.value" />

      <el-date-picker
        v-if="item.type==='time'"
        v-model="item.value"
        type="date"
        placeholder="选择日期"
      />

      <imgUpload v-if="item.type==='OneImgupload'" :img.sync="item.value" />
      <fileUpload v-if="item.type==='fileUpload'" :file-list.sync="item.value" />
      <el-switch
        v-if="item.type==='switch'"
        v-model="item.value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </el-form-item>
  </div>
</template>

<script>
import MoreImgUpload from '@/components/Upload/moreImgUpload'
import Tinymce from '@/components/Tinymce'
import imgUpload from '@/components/Upload/imgUpload'
import fileUpload from '@/components/Upload/fileUpload'

export default {
  name: 'CustomizeView',
  components: {
    MoreImgUpload,
    Tinymce,
    imgUpload,
    fileUpload
  },
  props: {
    extra: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  created() {

  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
