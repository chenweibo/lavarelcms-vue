<template>
  <div>
    <a-upload
      :custom-request="uploadImage"
      :remove="remove"
      :file-list="defaultFileList"
    >
      <a-button> <a-icon type="upload" /> 文件上传 </a-button>
    </a-upload>
  </div>
</template>
<script>
import { fileUpload } from '@/api/upload.js'

export default {
  name: 'FileUpload',
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
      imgUrl: process.env.VUE_APP_BASE_IMG,
      defaultFileList: this.fileList
    }
  },
  created() {

  },
  methods: {
    uploadImage(file, event) {
      const formData = new FormData()
      formData.append('file', file.file)

      fileUpload(formData).then(Response => {
        // 防止和原数据冲突改为负数

        this.defaultFileList.push({ uid: -(this.fileList.length + 1),
          name: Response.origin_name,
          status: 'done',
          path: '/storage/' + Response.path,
          url: this.imgUrl + '/storage/' + Response.path })
      }).catch(() => {

      })
      file.status = 'done'
    },

    remove(file) {
      // const url = file.url

      const filteredItems = this.defaultFileList.filter(item => item !== file)
      this.$emit('update:fileList', filteredItems)
      this.defaultFileList = filteredItems
      // console.log(url)
    }
  }

}
</script>

