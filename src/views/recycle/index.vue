<template>
  <div class="app-container">
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
        prop="deleted_at"
        label="删除时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRestore(scope.$index, scope.row)"
          >恢复</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="current_page"
        :total="total"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { getlist, restore } from '@/api/recycle.js'
export default {
  name: 'Recycle',
  props: {},
  data() {
    return {
      list: [],
      current_page: undefined,
      total: undefined,
      last_page: undefined
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      getlist().then(Response => {
        const { data, current_page, total, last_page } = Response
        this.list = data
        this.current_page = current_page
        this.total = total
        this.last_page = last_page
      })
    },
    pageChange(page) {
      this.getList({ page: page })
    },
    handleRestore(index, row) {
      restore(row.id).then(Response => {
        this.$message({
          message: '恢复成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
