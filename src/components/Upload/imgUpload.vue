<template>
  <div>
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :custom-request="uploadImage"
      :remove="remove"
    >
      <img v-if="imageUrl" width="200" :src="imageUrl" alt="avatar">

      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">
          点击上传
        </div>
      </div>
    </a-upload>
    <div v-if="imageUrl" style="display:block; width:80px; cursor: pointer; " @click="remove"> <a-icon type="delete" class="deleteBtn" />
      清空</div>

  </div>
</template>
<script>
import { imgUpload } from '@/api/upload.js'

export default {
  name: 'OneUpload',
  props: {
    img: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      loading: false,
      imageUrl: this.img,
      path: process.env.VUE_APP_BASE_IMG
    }
  },
  watch: {
    img: function(val) {
      this.imageUrl = val
    }

  },
  methods: {
    uploadImage(file) {
      this.loading = true
      const formData = new FormData()
      formData.append('file', file.file)

      imgUpload(formData).then(Response => {
        this.imageUrl = this.path + '/storage/' + Response.path

        this.$emit('update:img', this.path + '/storage/' + Response.path)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    remove() {
      this.imageUrl = ''
      this.$emit('update:img', '')
    }
  }
}
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 104px;
  height: 104px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.deleteBtn{
    margin-left: 10px;

}
</style>

