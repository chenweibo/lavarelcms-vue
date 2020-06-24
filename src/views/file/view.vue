<template>
  <div>

    <a-alert message="非专业人员切勿修改文件，以免造成网站崩溃及其各种问题。" banner />

    <div class="app-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="getlist">根路径</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(v,k) in filePath " :key="k" @click.native="to(k,v)">{{ v }}</el-breadcrumb-item>

      </el-breadcrumb>
      <a-button type="primary" style="margin:20px 0;">上传</a-button>
      <el-table
        :data="list"
        style="width: 100%"
        @row-dblclick="go"
      >
        <el-table-column
          prop="name"
          label="文件名"
        >
          <template slot-scope="scope">
            <i :class="scope.row.mime === 'directory'?'el-icon-folder-opened':'el-icon-document'">&nbsp;{{ scope.row.name }}</i>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button v-show="scope.row.mime !== 'directory'" type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small">重命名</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <a-modal
        title="编辑"
        :visible="visible"
        width="70%"
        height="80%"
        cancel-text="取消"
        ok-text="确定"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <codemirror ref="myCmGenerate" v-model="code" :options="editorOption" />
      </a-modal>
    </div>
  </div>
</template>
<script>
import { getViewList, getFileInfo, getFileListByPath } from '@/api/file.js'

import { codemirror } from 'vue-codemirror'
import './setting.js'

export default {
  name: 'FileView',
  components: {
    codemirror
  },
  data() {
    return {
      list: [],
      path: undefined,
      visible: false,
      confirmLoading: false,
      code: ``,
      tempFileName: undefined,
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],

        mode: 'text/x-php',
        // mode: 'application/x-httpd-php',
        // mode: 'application/x-httpd-php-open',
        // mode: { name: 'php', startOpen: true },
        lineWrapping: true,
        theme: 'monokai',
        lint: true,
        keyMap: 'sublime',
        extraKeys: { 'Tab': 'autocomplete' }
      }

    }
  },
  computed: {

    filePath() {
      if (this.path) {
        return this.path.split('/')
      }
      return []
    }
    // 计算属性的 getter
  },
  created() {
    this.getlist()
  },
  mounted() {

  },
  methods: {
    getlist() {
      getViewList().then(Response => {
        this.list = Response.list
        this.path = Response.path
      })
    },
    async handleClick(row) {
      this.tempFileName = row

      const path = `${this.path}/${row.name}`
      console.log(path)

      await getFileInfo({ path: path }).then(Response => {
        this.visible = true
        console.log(Response.data)

        this.code = Response.data
      })
    },
    getListByPath(path) {
      getFileListByPath(path).then(Response => {
        this.list = Response.list
        this.path = Response.path
      })
    },
    go(row, event, column) {
      if (row.mime === 'directory') {
        this.getListByPath(this.path + '/' + row.name)
      }
    },
    to(k, v) {
      const arr = this.filePath.slice(0, k)
      arr.push(v)
      this.getListByPath(arr.join('/'))
    },
    handleOk(e) {

    },
    handleCancel(e) {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.el-breadcrumb__item{
  cursor: pointer;
}
</style>

