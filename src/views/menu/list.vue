<template>
  <div>
    <a-alert
      message="提示"
      description="单篇类型在直接栏目里面添加内容，列表形式在内容管理处添加。"
      type="warning"
      show-icon
    />
    <div class="app-container">

      <div class="filter-container">
        <router-link to="/menu/create">
          <el-button class="filter-item" size="small" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
            创建栏目
          </el-button>
        </router-link>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"

        :default-expand-all="true"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >

        <el-table-column
          prop="title"
          label="名称"
          sortable
          width="180"
        />
        <el-table-column
          prop="sort"
          label="排序"

          width="180"
        />
        <el-table-column
          prop="id"
          label="编号"
          sortable
          width="180"
        />

        <el-table-column
          prop="type"
          label="类型"
          sortable
          width="180"
        >

          <template slot-scope="scope">
            <el-tag disable-transitions :type="scope.row.type == 0 ? 'primary' : 'warning'">{{ type[scope.row.type].label }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="hide"
          label="状态"
          sortable
          width="180"
        >
          <template slot-scope="scope">
            <el-tag disable-transitions :type="scope.row.hide ? 'danger' : 'success'">{{ scope.row.hide ? "隐藏":"显示" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{ name: 'EditMenu', params: { id: scope.row.id }}">
              <el-button
                size="mini"
              >编辑</el-button>
            </router-link>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
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
import { getlist, deleteMenu } from '@/api/menu'
import { type } from '@/utils/index.js'
export default {
  name: 'Menu',
  props: {},
  data() {
    return {
      loading: false,
      tableData: [],
      type: type
    }
  },
  computed: {

  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.loading = true
      getlist().then(Response => {
        const { data } = Response

        this.tableData = data
        this.loading = false
      })
    },
    handleDelete(row) {
      const id = row.id
      if (id) {
        deleteMenu(id).then(Response => {
          this.getList()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
