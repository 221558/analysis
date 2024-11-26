<template>
  <basic-container class="entry-container" v-loading.fullscreen.lock="fullscreenLoading">
    <avue-form ref="formRef" :option="option" v-model="formData"></avue-form>
    <el-upload
      class="upload-demo"
      drag
      :show-file-list="false"
      :action="action"
      accept=".xls,.xlsx"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        <em><img class="upload-img" src="/img/data/upload-button.png" alt="上传文档" />上传文档</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          点击上传Excel文档 或 拖拽Excel文档至此， 支持格式： .xls   .xlsx
        </div>
      </template>
    </el-upload>
    <basic-title style="margin-top: 40px;" :title="title" />
    <!-- 表格信息 -->
    <avue-crud
      ref="crudRef"
      v-model="formData"
      :option="optionTable"
      :data="tableData"
      v-model:page="page"
      :table-loading="loading"
      @size-change="sizeChange"
      @current-change="currentChange"
      @on-load="onLoad"
    >
      <template #menu="{ row, index, size }">
        <el-button
          type="primary"
          text
          :size="size"
          icon="el-icon-download"
          @click="rowDownload(row, index)">下载</el-button>
        <el-button
          type="danger"
          text
          :size="size"
          icon="el-icon-delete"
          @click="rowDel(row, index)">删除</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script setup>
import BasicTitle from '@/components/basic-title/main.vue'
import { ref } from 'vue'
import { dataDownload, deleteUploadRecord, getFileTypeList, getUploadRecords } from '@/api/entry'
import { ElMessage } from 'element-plus'

const option = ref({})
const optionTable = ref({})
const tableData = ref([])
const formData = ref({})
const loading = ref(true)
const action = ref('')
const fullscreenLoading = ref(false)
const title = ref('历史录入记录')
// 表单配置
option.value = {
  labelWidth: '72',
  labelPosition: 'left',
  submitBtn: false,
  emptyBtn: false,
  gutter: 20,
  column: [
    {
      label: '选择月份',
      prop: 'fileTime',
      type: "month",
      span: 4,
      valueFormat: 'YYYY-MM',
      placeholder: '请选择 月份',
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
    },
    {
      label: '上传数据',
      prop: 'filetype',
      type: 'select',
      dicData: [],
      span: 4,
      row: true,
    },
  ]
}

// 获取搜索条件数据
const getFormFiles = () => {
  getFileTypeList().then(res => {
    option.value.column[1].dicData = res.data.data
  }).catch(err => {
    console.log(err)
  })
}
getFormFiles()

// 表格分页信息
const page = ref({
  background: false,
  total: 0,
  currentPage: 1,
  pageSize: 10,
})

// 表格配置
optionTable.value = {
  editBtn: false,
  delBtn: false,
  header: false,
  border: true,
  align: 'center',
  column: [
    {
      label: '上传日期',
      prop: 'createTime'
    },
    {
      label: '文件名',
      prop: 'fileName'
    },
  ]
}

// 每页多少条
const sizeChange = val => {
  // 将当前页码重置为1
  page.value.currentPage = 1
  // 将每页显示条数设置为val
  page.value.pageSize = val
}

// 当前页数
const currentChange = val => {
  // 将当前页码设置为val
  page.value.currentPage = val
}

// 获取表格数据
function onLoad(pages) {
  loading.value = true
  getUploadRecords({
    current: pages.currentPage,
    size: pages.pageSize
  }).then(res => {
    const datContent = res.data.data;
    tableData.value = datContent.records;
    page.value.total = datContent.total;
    loading.value = false
  }).catch(err => {
    console.log(err)
    loading.value = false
  })
}

// 上传文件
function beforeUpload(file) {
  const flag = Boolean(formData.value.fileTime && formData.value.filetype)
  if (!flag) {
    ElMessage.warning('请先选择条件')
    return false
  }
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1)

  const whiteList = ["xls", "xlsx"]

  if (whiteList.indexOf(fileSuffix) === -1) {
    ElMessage.error('上传文件只能是xls、xlsx格式')
    return false
  }
  const { VITE_APP_BASE_URL, MODE } = import.meta.env
  console.log(import.meta.env)
  // 定义api前缀
  let apiPrefix = '/upload'
  if (MODE !== 'development') {
    apiPrefix = VITE_APP_BASE_URL
  }
  action.value = `${apiPrefix}/analysis-system/data-file/upload?fileTime=${formData.value.fileTime}&filetype=${formData.value.filetype}`
  fullscreenLoading.value = true
  return true
}

// 上传成功
function handleSuccess(res, file, fileList) {
  console.log(res, file, fileList)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
    return
  }
  ElMessage.success('上传成功')
  // 刷新表格数据
  onLoad(page.value)
  fullscreenLoading.value = false
}

// 上传失败
function handleError(err, file, fileList) {
  console.log(err)
  fullscreenLoading.value = false
  ElMessage.error('上传失败')
}

// 下载文件
function rowDownload(row, index) {
  console.log(row)
  dataDownload({ recordId: row.id }).then(res => {
    // 创建下载链接
    const url = window.URL.createObjectURL(res.data)
    const link = document.createElement('a')
    link.href = url
    // 设置文件名
    link.setAttribute('download', row.fileName)
    // 将锚点添加到文档
    document.body.appendChild(link)
    // 模拟点击
    link.click()
    // 下载后移除锚点
    document.body.removeChild(link)
    // 释放内存
    window.URL.revokeObjectURL(url)
    link.style.display = 'none'
    ElMessage.success('正在下载中...')
  }).catch(err => {
    console.log(err)
  })
}

// 删除行
function rowDel(row, index, done) {
  console.log(row)
  deleteUploadRecord({ recordId: row.id }).then(res => {
    ElMessage.success('删除成功')
    // 刷新表格数据 并 关闭弹窗
    onLoad(page.value)
    // done(row)
  }).catch(err => {
    console.log(err)
  })
}

// 表单提交
function handleSubmit(form) {
  console.log(form.value)
}
</script>

<style lang="scss" scoped>
:deep.entry-container {
  .el-upload__tip {
    position: relative;
    width: 460px;
    color: rgba(165, 165, 165, 1);
    font-size: 16px;
    font-family: SourceHanSansSC-regular;
    margin: -44px auto 0;
  }

  .el-upload-dragger {
    .el-icon {
      width: 164px;
      height: 116px;
      background: url('/img/data/upload.png') no-repeat center/100% 100%;
      svg {
        display: none;
      }
    }

    .el-upload__text {
      .upload-img {
        width: 26px;
        height: 26px;
        vertical-align: middle;
        margin-right: 10px;
      }
      width: 200px;
      height: 44px;
      line-height: 44px;
      margin: 0 auto 10px;
      background-color: rgba(0, 104, 255, 1);
      border-radius: 6px;

      em {
        font-size: 16px;
        color: #fff !important;
        // margin-left: 20px;
      }
    }
  }

  .el-upload-list__item {
    &:first-child {
      margin-top: 30px;
    }
  }
}
</style>
