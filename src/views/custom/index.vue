<template>
  <div>
    <a-alert message="全局组件" type="warning" show-icon />
    <div class="app-container">
      <el-button @click="create">创建</el-button>

      <el-dialog
        width="30%"
        title="创建"
        :visible.sync="innerVisible"
        append-to-body
      >

        <el-form ref="form" :model="detail" :rules="rules" label-width="80px">
          <el-form-item label="名称" prop="title">
            <el-input v-model="detail.title" />
          </el-form-item>

          <el-form-item label="标签" prop="label">
            <el-input v-model="detail.label" />
          </el-form-item>
          <el-form-item label="所属">
            <el-select v-model="belong" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="detail.type" placeholder="请选择">
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
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="名称"
          width="180"
        />
        <el-table-column
          label="类型"
        >
          <template slot-scope="scope">
            {{ customizeList[scope.row.detail.type] }}

          </template>
        </el-table-column>
        <el-table-column
          label="标签"
        >
          <template slot-scope="scope">
            {{ scope.row.detail.label }}
          </template>
        </el-table-column>

        <el-table-column
          label="所属"
        >
          <template slot-scope="scope">
            {{ typeLabel(scope.row.belong) }}

          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                type="danger"
              >删除</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import { customizeList, customizeArray } from '@/utils/index.js'
import { getList, store, deleteComponent } from '@/api/custom.js'
import _ from 'lodash'
const defaultForm = {
  id: undefined,
  title: '',
  notes: '',
  belong: '',
  sort: 99,
  detail: {}
}
export default {
  name: 'Custom',
  props: {},
  data() {
    return {
      form: defaultForm,
      innerVisible: false,
      detail: { title: '', type: 'input', value: undefined, label: '', size: {}},
      list: [],
      customizeList: customizeList,
      customizeArray: customizeArray,
      options: [{
        value: '0',
        label: '栏目'
      }, {
        value: '1',
        label: '列表'
      }, {
        value: '2',
        label: '幻灯片'
      }
      ],
      belong: '0',
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
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      getList().then(Response => {
        const { data } = Response
        this.list = data
      })
    },
    create() {
      this.restFrom()
      this.innerVisible = true
    },
    typeLabel(data) {
      return _.filter(this.options, function(o) { return o.value === data })[0]['label']
    },
    handleDelete(index, row) {
      deleteComponent(row.id).then(Response => {
        this.getList()
      })
      console.log(index, row)
    },
    restFrom() {
      this.detail = { title: '', type: 'input', value: undefined, range: 'global', label: '', size: {}}
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const arr = ['fileMore', 'fileUpload']
          if (arr.includes(this.detail.type)) {
            this.detail.value = []
          } else {
            this.detail.value = null
          }
          store({
            title: this.detail.title,
            notes: this.detail.title,
            belong: this.belong,
            sort: 99,
            detail: this.detail
          }).then(Response => {
            this.getList()
            this.restFrom()
            this.innerVisible = false
          })
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

</style>
