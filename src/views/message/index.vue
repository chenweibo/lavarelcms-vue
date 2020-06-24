<template>
  <div class="app-container">
    <a-button-group>
      <a-button type="primary" style="margin:10px 0" @click="allRead">
        一键已读
      </a-button>
      <a-button @click="destroyAll">
        一键删除
      </a-button>
    </a-button-group>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="telephone"
        label="联系方式"
      />
      <el-table-column
        label="状态"
        width="180"
      >
        <template slot-scope="scope">
          <a-tag :color="scope.row.isRead ? 'cyan':'purple'">
            {{ scope.row.isRead ? "已读":"未读" }}
          </a-tag>

        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="时间"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>

          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗"
            @onConfirm="remove(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="current_page"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <a-modal v-model="visible" :footer="null" width="70%" title="详情">
      <a-descriptions title="主要内容" bordered>
        <a-descriptions-item label="标题">
          {{ message.title }}
        </a-descriptions-item>
        <a-descriptions-item label="联系方式">
          {{ message.telephone }}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {{ message.email }}
        </a-descriptions-item>
        <a-descriptions-item label="地址">
          {{ message.address }}
        </a-descriptions-item>

        <a-descriptions-item label="详情内容">
          {{ message.detail }}
          <br>

        </a-descriptions-item>
        <a-descriptions-item v-for="(v,k) in message.extra" :key="k" :label="v.label">
          {{ v.value }}
        </a-descriptions-item>

      </a-descriptions>

    </a-modal>

  </div>
</template>

<script>
const defaultMessage = {
  address: '',
  created_at: '',
  detail: '',
  email: '',
  extra: [],
  id: undefined,
  isRead: false,
  telephone: '',
  title: '',
  updated_at: ''
}
import { getlist, deleteMessage, read, allRead, allDelete } from '@/api/message.js'
export default {
  name: 'Message',
  props: {},
  data() {
    return {
      current_page: null,
      per_page: null,
      total: null,
      last_page: null,
      list: [],
      visible: false,
      message: defaultMessage

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
      getlist({ page: page }).then(Response => {
        this.current_page = Response.current_page
        this.per_page = Response.per_page
        this.total = Response.total
        this.last_page = Response.last_page
        this.list = Response.data
      })
    },
    handleClick(row) {
      this.visible = true
      this.message = row
      read(row.id, row).then(() => {
        row.isRead = true
      }).catch(() => {})
    },

    remove(row) {
      deleteMessage(row.id).then(() => {
        this.fetchList()
      }).catch(() => {})
    },
    handleCurrentChange(page) {
      this.$router.push({ name: 'Message', query: { page: page }})
    },
    destroyAll() {
      allDelete().then(Response => {
        this.fetchList()
      })
    },
    allRead() {
      allRead().then(Response => {
        this.fetchList()
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 3 * 1000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
