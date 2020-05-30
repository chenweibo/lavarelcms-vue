<template>
  <div>

    <div class="fix-nav">
      <el-row type="flex" justify="end">
        <el-col :span="1" :xs="5">  <customize :extra.sync="form.extra" /></el-col>
        <el-col :span="1" :xs="5"><el-button size="mini" type="success" @click="save">保存</el-button></el-col>
      </el-row>
    </div>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="栏目名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入栏目名称" />
        </el-form-item>
        <el-form-item label="所属栏目">
          <SelectTree
            :props="props"
            :options="treeList"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="是否隐藏">
          <el-tooltip class="item" effect="dark" content="打开为隐藏栏目" placement="right">
            <el-switch
              v-model="form.hide"
            />
          </el-tooltip>

        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="排序" />
        </el-form-item>
        <el-form-item label="重定向">
          <el-input v-model="form.redirect" style="width:500px" placeholder="重定向地址" />
          <a-tag>
            <a-icon type="exclamation-circle" />  如果重定向内部地址则不需要带"http//"，需要以"/"开头。
          </a-tag>
        </el-form-item>
        <el-form-item label="推荐">
          <el-switch
            v-model="form.recommend"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>

        <el-form-item label="url" prop="url">
          <el-input v-model="form.url" placeholder="请输入url" />

        </el-form-item>
        <el-form-item v-if="form.type == 2" prop="viewListCheck" label="列表视图">
          <el-select v-model="form.view.pageList" placeholder="请选择">
            <el-option
              v-for="item in view"
              :key="item"
              :value="item"
              :label="item"
            />
          </el-select> <a-tag v-if="!checkViewList" color="orange">
            <a-icon type="exclamation-circle" />  视图不存在，可能造成程序不显示
          </a-tag>
        </el-form-item>

        <el-form-item v-if="form.type == 2" label="分页">
          <el-input v-model="form.perPage" placeholder="请输入分页数量" />

          <a-tag color="orange">
            <a-icon type="exclamation-circle" />  为 0 则部不分页，反之为分页 每页多少条。
          </a-tag>
        </el-form-item>

        <el-form-item label="内容视图" prop="view">
          <el-select v-model="form.view.pageView" placeholder="请选择">
            <el-option
              v-for="item in view"
              :key="item"
              :value="item"
              :label="item"
            />
          </el-select> <a-tag v-if="!checkPageView" color="orange">
            <a-icon type="exclamation-circle" />  视图不存在，可能造成程序不显示
          </a-tag>
        </el-form-item>
        <el-form-item v-if="form.type == 1" label="主要内容">
          <tinymce v-model="form.pageInfo" :height="300" />

        </el-form-item>
        <CustomizeView :extra.sync="form.extra" />

      </el-form>
    </div>
    <a-back-top />

  </div>
</template>
<script>

import SelectTree from '@/components/TreeSelect'
import { create, store, show, updateMenu } from '@/api/menu'
import { type } from '@/utils/index.js'
import customize from '@/components/Customize'
import CustomizeView from '@/components/CustomizeView'
import Tinymce from '@/components/Tinymce'

import _ from 'lodash'
const defaultForm = {
  id: undefined,
  title: '',
  parentId: 0,
  path: 0,
  url: '',
  perPage: 0,
  redirect: '',
  recommend: false,
  pageInfo: ``,
  view: {
    pageList: '',
    pageView: ''
  },
  type: undefined,
  sort: 99,
  extra: []
}

export default {
  name: 'MenuDetail',
  components: {
    SelectTree,
    customize,
    CustomizeView,
    Tinymce
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var viewCheck = (rule, value, callback) => {
      if (this.form.type === '2') {
        if (!this.form.view.pageList) {
          return callback(new Error('列表视图不能为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      form: Object.assign({}, defaultForm),
      tempRoute: {},
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: -1, // 初始ID（可选）
      props: { // 配置项（必选）
        value: 'id',
        label: 'title',
        children: 'children'
        // disabled:true
      },
      treeList: [
      ],
      typeList: type,
      typeValue: 0,
      viewList: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url', trigger: 'blur' }
        ],
        view: [
          { required: true, message: '选择视图', trigger: 'blur' }
        ],

        viewListCheck: [
          { validator: viewCheck, trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    view() {
      return this.viewList.filter(item => item !== '.' && item !== '..')
    },
    checkViewList() {
      return !!this.viewList.includes(this.form.view.pageList)
    },
    checkPageView() {
      return !!this.viewList.includes(this.form.view.pageView)
    }
  },
  watch: {
    form: {
      handler(new_value, old_value) {
        if (new_value.type !== '2') {
          new_value.view.pageList = ''
        }
      },
      deep: true
    }
  },
  created() {
    const id = this.$route.params.id ? this.$route.params.id : ''
    if (!this.isEdit) {
      this.getTree()
    } else {
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {},
  methods: {
    fetchData(id) {
      show(id).then(response => {
        const { view, menuTree, content, component } = response
        this.form = content
        this.viewList = view
        this.treeList = this.appendTopMenu(menuTree)
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
      // console.log(arr)
      // const diff = _.differenceBy(arr, component, 'label')
      // console.log(_.pull(arr, diff[0]))
      this.form.extra = arr
      // console.log(_.differenceBy(arr, component, 'label'))        // this.form.extra = _.pull(arr, diff[0]        this.form.extr=  =arr
    },
    setTagsViewTitle() {
      const title = '栏目编辑'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.form.title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    appendTopMenu(data) {
      const cloneData = JSON.parse(JSON.stringify(data))
      const top = { id: -1, parentId: 0, title: '顶级栏目', sort: 99 }
      cloneData.unshift(top)
      return cloneData
    },
    setPageTitle() {
      const title = '栏目编辑'
      document.title = `${title} - ${this.form.title}`
    },
    getValue(value) {
      this.form.parentId = value
    },
    getTree() {
      create().then(Response => {
        this.treeList = this.appendTopMenu(Response.menu)
        this.viewList = Response.view
        this.form.extra = Response.component
      })
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            const id = this.$route.params.id ? this.$route.params.id : ''
            updateMenu(id, this.form).then(Response => {
              this.$router.back(-1)
              this.$store.dispatch('tagsView/delVisitedView', this.$route)
            })
          } else {
            if (this.form.type === '2') {
              this.form.pageInfo = ''
            }
            store(this.form).then(Response => {
              this.$router.back(-1)
            })
          }
        } else {
          console.log('error validate!!')
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

