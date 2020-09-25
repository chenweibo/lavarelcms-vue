<template>
  <div class="box">
    <el-button size="mini" style="margin-right:12px" type="warning" @click="dialog = true">
      字段设置
    </el-button>
    <el-dialog
      title="字段管理"
      :visible.sync="dialog"
      width="60%"
    >
      <a-alert
        message="提示"
        description="此自定义标签,适用于局部,如文章添加一个特性需每次创建都要自定义字段，如需全局渲染请到全局字段管理添加全局参数"
        type="warning"
        show-icon
      />
      <el-button type="primary" size="mini" @click="create">创建</el-button>
      <el-dialog
        width="30%"
        title="创建"
        :visible.sync="innerVisible"
        append-to-body
      >

        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="名称" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>

          <el-form-item label="标签" prop="label">
            <el-input v-model="form.label" />
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in customizeArray"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">保存</el-button>

          </el-form-item>
        </el-form>

      </el-dialog>

      <el-table
        :data="extra"
        style="width: 100%"
        height="500"
      >
        <el-table-column
          prop="title"
          label="名称"
        />
        <el-table-column
          prop="label"
          label="标签"
        />

        <el-table-column
          prop="type"
          label="类型"
        >
          <template slot-scope="scope">
            <el-tag disable-transitions type="primary">{{ customizeList[scope.row.type] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteHandleClick(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
import { customizeList, customizeArray } from '@/utils/index.js'
export default {
  name: 'Customize',
  components: {

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
    return {
      dialog: false,
      innerVisible: false,
      customizeList: customizeList,
      customizeArray: customizeArray,
      form: { title: '', type: 'input', value: undefined, label: '', size: {}, range: 'local' },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {

    deleteHandleClick(index, row) {
      this.extra.splice(index, 1)
    },
    create() {
      this.restFrom()
      this.innerVisible = true
    },
    restFrom() {
      this.form = { title: '', type: 'input', value: undefined, label: '', size: {}}
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const arr = ['fileMore', 'fileUpload', 'imgMoreUpload']
          if (arr.includes(this.form.type)) {
            this.form.value = []
          }
          if (this.form.type === 'switch') {
            this.form.value = false
          }
          this.extra.push(this.form)
          this.restFrom()
          this.innerVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.box{
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 50px;
      margin-top: 12.5px;
      margin-right: 10px;
}
</style>
