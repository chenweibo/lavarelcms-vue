<template>
  <div class="app-container">
    <a-button type="primary" ghost size="small" icon="plus" style="margin-bottom:10px" @click="showModal" />
    <el-row v-for="(item,index) in listTemp" :key="index" :gutter="32">
      <el-col v-for="(cell,i) in item" :key="i" :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <a-tag color="pink">
              序号{{ cell.id }}
            </a-tag>
            <span>{{ cell.title }}</span>

            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除幻灯片组吗"
              @onConfirm="remove(cell)"
            >
              <el-button slot="reference" style="float: right; padding: 3px 0 ;color:#eb2f96" type="text">移除</el-button>
            </el-popconfirm>

          </div>
          <bannerView :id="cell.id" :img-list.sync="cell.banners" />
        </el-card>
      </el-col>

    </el-row>

    <a-modal
      title="创建幻灯片组"
      :visible="visible"
      :confirm-loading="confirmLoading"
      ok-text="创建"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model ref="ruleForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="标题" prop="title">
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="描述" prop="description">
          <a-input v-model="form.description" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

  </div>
</template>

<script>
import { getBannerList, deleteBanner, store } from '@/api/banner.js'
import bannerView from './components/banner'
export default {
  name: 'Banner',
  components: { bannerView },
  props: {},
  data() {
    return {
      list: [],
      visible: false,
      confirmLoading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        title: '',
        description: '',
        banners: []
      },
      rules: {
        title: [{ required: true, message: '标题不为空', trigger: 'change' }],
        description: [{ required: true, message: '标题不为空', trigger: 'change' }]
      }
    }
  },
  computed: {
    listTemp: function() {
      let index = 0
      const count = 3
      const arrTemp = []
      const experts = this.list
      for (let i = 0; i < experts.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(experts[i])
      }
      return arrTemp
    }
  },
  created() {
    this.fetchList()
  },
  mounted() {},
  methods: {
    fetchList() {
      getBannerList().then(Response => {
        const { data } = Response
        this.list = data
      })
    },
    remove(row) {
      deleteBanner(row.id).then(Response => {
        this.fetchList()
      })
    },
    showModal() {
      this.resetForm()
      this.visible = true
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.confirmLoading = true
          store(this.form).then(Response => {
            this.confirmLoading = false
            this.visible = false
            this.fetchList()
          }).catch(() => {
            this.confirmLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    resetForm() {
      this.form.title = ''
      this.form.description = ''
    }

  }
}
</script>

<style lang="scss" scoped>
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
