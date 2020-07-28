<template>
  <div>
    <div class="fix-nav">
      <el-row type="flex" justify="end">
        <el-col :span="1" :xs="5">  <customize :extra.sync="form.extra" /></el-col>
        <el-col :span="1" :xs="5"><el-button size="mini" type="success" @click="save">保存</el-button></el-col>
      </el-row>
    </div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入栏目名称" />
        </el-form-item>
        <el-form-item label="所属">
          <SelectTree
            :props="props"
            :options="treeList"
            :value="valueId"
            :accordion="isAccordion"
            @getValue="getValue($event)"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="排序" />
        </el-form-item>
        <el-form-item label="推荐">
          <el-switch
            v-model="form.recommend"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="重定向">
          <el-input v-model="form.redirect" style="width:500px" placeholder="重定向地址" />
          <a-tag>
            <a-icon type="exclamation-circle" />  如果重定向内部地址则不需要带"http//"，需要以"/"开头。
          </a-tag>
        </el-form-item>
        <el-form-item label="自定义日期">
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <el-form-item label="内容">
          <tinymce v-model="form.detail" :height="300" />
        </el-form-item>
        <CustomizeView :extra.sync="form.extra" />
      </el-form>

    </div>
    <a-back-top />
  </div>

</template>
<script>
import customize from '@/components/Customize'
import CustomizeView from '@/components/CustomizeView'

import { create, getContent, store, update } from '@/api/content.js'
import SelectTree from '@/components/TreeSelect'
import Tinymce from '@/components/Tinymce'
import _ from 'lodash'

const defaultForm = {
  id: undefined,
  title: '',
  menus_id: 1,
  type: undefined,
  sort: 99,
  recommend: false,
  redirect: '',
  thumbnail: '',
  detail: ``,
  page_views: 0,
  time: '',
  status: true,
  // 初始化一些基本组件
  extra: []
}
export default {
  name: 'ContentDetail',
  components: {
    customize,
    SelectTree,
    Tinymce,
    CustomizeView
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      tempRoute: {},
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: { // 配置项（必选）
        value: 'id',
        label: 'title',
        children: 'children'
        // disabled:true
      },
      treeList: [
      ],
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (!this.isEdit) {
      this.createData()
    } else {
      const id = this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    // 处理  this.$router.go(-1) 但是没有上一页 则跳转列表页
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/content/index' })
        return false
      } else {
        this.$router.go(-1)
      }
      // 上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
      // 如果上面都执行了 页面都跳走了，这个也就不用管了
      setTimeout(() => {
        this.$router.push({ path: '/content/index' })
      }, 500)
    },
    createData() {
      create().then(Response => {
        const { menu, component } = Response
        this.treeList = menu
        this.form.extra = component
      })
    },

    fetchData(id) {
      getContent(id).then(Response => {
        const { content, menu, component } = Response
        this.form = content
        this.valueId = this.form.menus_id
        this.treeList = menu
        // just for test
        this.handleComponent(content.extra, component)

        // set tagsview title
        this.setTagsViewTitle()
        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    handleComponent(extra, component) {
      const other = _.concat(extra, component)
      const arr = _.uniqBy(other, 'label')
      // const diff = _.differenceBy(arr, component, 'label')
      // console.log(_.pull(arr, diff[0]))
      // console.log(_.differenceBy(arr, component, 'label'))
      this.form.extra = arr
    },
    setTagsViewTitle() {
      const title = '内容编辑'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.form.title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '内容编辑'
      document.title = `${title} - ${this.form.title}`
    },
    getValue(value) {
      const parentId = value[0]
      const node = value[1]

      this.form.menus_id = parentId
      this.form.path = node.path + '-' + parentId
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            update(this.form.id, this.form).then(Response => {
              this.$store.dispatch('tagsView/delVisitedView', this.$route)
              this.$router.go(-1)
            })
          } else {
            store(this.form).then(Response => {
              this.$router.go(-1)
              this.$store.dispatch('tagsView/delVisitedView', this.$route)
            })
          }
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
@import "~@/styles/mixin.scss";
.fix-nav{
  background: #d0d0d0;
    z-index: 10;
    height: 50px;
    width: 100%;

    line-height: 50px;
    padding-right: 20px;
}

</style>

