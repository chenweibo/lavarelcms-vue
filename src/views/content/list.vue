<template>
  <div class="app-container">
    <a-row type="flex" justify="space-between">
      <a-col>
        <a-button-group>
          <router-link to="/content/create">
            <a-button> 添加</a-button>
          </router-link>
        </a-button-group>
      </a-col>
      <a-col>
        <a-input-search placeholder="搜索" :default-value="$route.query.title" style="width: 200px" @search="onSearch" />
      </a-col>
    </a-row>
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="id"
        width="150"
      />
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="sort"
        label="排序"
        width="150"
      />
      <el-table-column
        label="分类"
      >
        <template slot-scope="scope">
          <a-tag :color="scope.row.menu?'cyan':'red'">
            {{ scope.row.menu ? scope.row.menu.title :"类目不存在" }}
          </a-tag>

        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>

            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>

            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >

              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>

          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="meta.current_page"
        :total="meta.total"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { getList, deleteContent } from '@/api/content.js'
export default {
  name: 'Content',
  props: {},
  data() {
    return {
      loading: false,
      meta: {},
      data: []
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchList'
  },
  created() {
    this.fetchList()
  },
  mounted() {},
  methods: {

    fetchList() {
      const page = this.$route.query.page
      const title = this.$route.query.title
      this.loading = true
      getList({ page: page, title: title }).then(Response => {
        const { data, meta } = Response
        this.data = data
        this.meta = meta
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    pageChange(page) {
      this.$router.push({ name: 'Content', query: { page: page }})
    },
    onSearch(value) {
      this.$router.push({ name: 'Content', query: { page: this.meta.current_page, title: value }})
    },
    handleEdit(index, row) {
      this.$router.push({ name: 'EditContent', params: { id: row.id }})
    },
    handleDelete(index, row) {
      deleteContent(row.id).then(Response => {
        this.fetchList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
