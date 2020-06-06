<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :custom-request="uploadImage"
      :remove="remove"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          多图上传
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage">
    </a-modal>
  </div>
</template>
<script>
import { imgUpload } from '@/api/upload.js'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'MoreImgUpload',
  props: {
    fileList: {
      type: Array,
      default: function() {
        return []
      }
    }

  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      imgUrl: process.env.VUE_APP_BASE_IMG

    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    uploadImage(file) {
      const formData = new FormData()
      formData.append('file', file.file)

      imgUpload(formData).then(Response => {
        // 防止和原数据冲突改为负数
        this.fileList.push({ uid: -(this.fileList.length + 1),
          name: Response.origin_name,
          status: 'done',
          path: Response.path,
          url: this.imgUrl + '/storage/' + Response.path })
      })
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
      // console.log(file)
    },
    remove(file) {
      // const url = file.url

      const filteredItems = this.fileList.filter(item => item !== file)
      this.$emit('update:fileList', filteredItems)
      this.fileList = filteredItems
      // console.log(url)
    }
    // handleChange({ fileList, event, file }) {
    //   this.fileList = fileList
    //   console.log(fileList)
    // }
  }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
