<template>
  <div class="upload-container">

    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <MoreImgUpload :file-list.sync="fileList" />
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import MoreImgUpload from '@/components/Upload/moreImgUpload'
export default {
  name: 'EditorSlideUpload',
  components: {
    MoreImgUpload
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,

      fileList: []
    }
  },
  methods: {

    handleSubmit() {
      this.$emit('successCBK', this.fileList)
      this.fileList = []
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
