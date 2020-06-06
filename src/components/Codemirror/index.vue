<template>
  <div>
    <codemirror ref="myCmGenerate" v-model="code" :options="editorOption" />

  </div>
</template>

<script>

import { codemirror } from 'vue-codemirror'
import './setting.js'
export default {
  name: 'Codemirror',
  components: {
    codemirror
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],

        // mode: 'text/x-php',
        // mode: 'application/x-httpd-php',
        mode: 'application/x-httpd-php-open',
        // mode: { name: 'php', startOpen: true },
        lineWrapping: true,
        theme: 'monokai',
        lint: true,
        keyMap: 'sublime',
        extraKeys: { 'Tab': 'autocomplete' }
      }

    }
  },
  created() {},
  mounted() {},
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

</style>
