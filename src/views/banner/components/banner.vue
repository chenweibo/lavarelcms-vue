<template>
  <div>
    <el-carousel :interval="5000" :autoplay="false" arrow="always">
      <el-carousel-item v-for="(item,k) in list.length?imgList : 1" :key="k">
        <div class="box">
          <div class="btn-container">
            <a-button type="danger" shape="circle" ghost icon="plus" style="display:block; margin-bottom:5px" @click="showModal" />
            <a-button type="danger" shape="circle" ghost icon="edit" style="display:block;margin-bottom:5px" @click="edit(item)" />

            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗"
              @onConfirm="remove(item)"
            >
              <a-button slot="reference" type="danger" shape="circle" ghost icon="close" style="display:block;" />
            </el-popconfirm>
          </div>
          <el-image
            style="width: 100%; height: 300px"
            :src="item.url"
            fit="fill"
          >
            <div slot="error" class="image-slot">
              <i style="" class="el-icon-picture-outline" />
            </div>
          </el-image>
        </div>

      </el-carousel-item>
    </el-carousel>

    <a-modal
      title="添加幻灯片"
      :visible="visible"
      :confirm-loading="confirmLoading"
      ok-text="保存"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model ref="ruleForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标题" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="附加文字1">
          <a-input v-model="form.txt1" />
        </a-form-model-item>
        <a-form-model-item label="附加文字2">
          <a-input v-model="form.txt2" />
        </a-form-model-item>
        <a-form-model-item label="附加文字3">
          <a-input v-model="form.txt3" />
        </a-form-model-item>
        <a-form-model-item label="主要图片">
          <imgUpload :img.sync="form.url" />
        </a-form-model-item>
        <a-form-model-item label="附加图片">
          <imgUpload :img.sync="form.otherurl" />
        </a-form-model-item>
        <a-form-model-item label="链接">
          <a-input v-model="form.link" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

  </div>
</template>
<script>
import imgUpload from '@/components/Upload/imgUpload'
import { update } from '@/api/banner.js'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'BannerView',
  components: { imgUpload },
  props: {
    imgList: {
      type: Array,
      default: () => { [] }
    },
    id: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      visible: false,
      list: this.imgList,
      confirmLoading: false,
      form: {
        id: undefined,
        title: '',
        txt1: '',
        txt2: '',
        txt3: '',
        url: '',
        otherurl: '',
        link: ''
      },
      isEdit: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        title: [{ required: true, message: '标题不为空', trigger: 'change' }]
      }
    }
  },
  watch: {
    list: function(newValue, oldValue) {
      this.$emit('update:imgList', newValue)
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            // 拷贝数组提交数组，接口成功后压入原始数据，提升用户体验
            const temp = JSON.parse(JSON.stringify(this.list))
            // 生成一个uid
            this.form.id = uuidv4()
            temp.push(this.form)
            this.confirmLoading = true

            update(this.id, { banners: temp }).then(Response => {
              this.confirmLoading = false
              this.visible = false
              this.list.push(this.form)
              this.resetForm()
            }).catch(() => {
              this.confirmLoading = false
            })
          } else {
            this.confirmLoading = true
            const index = this.list.findIndex(d => d.id === this.form.id)

            this.$set(this.list, index, this.form)

            update(this.id, { banners: this.list }).then(Response => {
              this.confirmLoading = false
              this.visible = false
              this.resetForm()
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        } else {
          console.log('error sumbit')
          return false
        }
      })
    },

    edit(data) {
      this.form = {
        id: data.id,
        title: data.title,
        txt1: data.txt1,
        txt2: data.txt2,
        txt3: data.txt3,
        url: data.url,
        otherurl: data.otherurl,
        link: data.link
      }

      this.isEdit = true
      this.visible = true
    },
    remove(row) {
      // 拷贝数组并移除指定元素
      const temp = this.imgList.filter(item => {
        return item.id !== row.id
      })

      update(this.id, { banners: temp }).then(Response => {
        this.list = temp
      }).catch(() => {

      })

    //  console.log(temp)
    },

    handleCancel(e) {
      this.resetForm()

      this.visible = false
    },
    resetForm() {
      this.isEdit = false
      this.form = {
        id: undefined,
        title: '',
        txt1: '',
        txt2: '',
        txt3: '',
        url: '',
        otherurl: '',
        link: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .box{
      position: relative;
  }
  .btn-container{
      position: absolute;
      right: 10px;

      top: 10px;
      z-index: 100;
  }
  .el-icon-picture-outline{
   display: block;
    font-size: 68px;
    margin: 0 auto;
    line-height: 300px;
    text-align: center;
    color: #eb2f96;
  }
</style>

