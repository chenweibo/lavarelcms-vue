<template>
  <div>
    <a-alert message="非专业人员切勿修改文件，以免造成网站崩溃及其各种问题。" banner />
    <div class="app-container">
      <a-button type="primary" icon="cloud-upload" style="margin-bottom:20px" />
      <el-table
        :data="filelist"
        style="width: 100%"
      >
        <el-table-column

          label="文件名"
        >
          <template slot-scope="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
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
import { getViewList, getFileInfo } from '@/api/file.js'

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
    // 计算属性的 getter
    filelist: function() {
      // `this` 指向 vm 实例
      return this.list.filter(v => { return v !== '.' && v !== '..' })
    }
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
      await getFileInfo({ path: `${this.path}/${row}` }).then(Response => {
        this.visible = true
        this.code = Response
      })
    },
    handleOk(e) {
      // this.ModalText = 'The modal will be closed after two seconds'
      // this.confirmLoading = true
      // console.log(this.code)
      console.log(e)

      // setTimeout(() => {
      //   this.visible = false
      //   this.confirmLoading = false
      // }, 2000)
    },
    handleCancel(e) {
      this.visible = false
    }
  }
}
</script>

