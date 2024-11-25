<template>
  <basic-container class="entry-container">
    <avue-form ref="formRef" :option="option" v-model="formData"></avue-form>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
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
    >
      <template #menu="{ row, index, size }">
        <el-button
          type="primary"
          text
          :size="size"
          icon="el-icon-download"
          @click="rowDel(row, index)">下载</el-button>
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
import { ref, getCurrentInstance, onMounted } from 'vue'

const option = ref({})
const optionTable = ref({})
const tableData = ref([])
const formData = ref({})
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
      prop: 'month1',
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
      prop: 'select1',
      type: 'select',
      dicData: [
        { label: '信通院报表数据', value: '0' },
        { label: '信通院原始数据', value: '1' },
        { label: '5k指标数据', value: '2' },
      ],
      span: 4,
      row: true,
    },
    /* {
      labelWidth: '0',
      prop: 'imgUrl',
      type: 'upload',
      span: 24,
      dragFile: true,
      multiple: false,
      action: '#',
      fileText: '上传文档',
      fileType: 'xls,xlsx',
      tip: '点击上传Excel文档 或 拖拽Excel文档至此， 支持格式： .xls   .xlsx',
    }, */
  ]
}

// 表格分页信息
const page = ref({
  background: false,
  total: 0
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
      prop: 'month1'
    },
    {
      label: '文件名',
      prop: 'imgUrl'
    },
  ]
}


onMounted(() => {
  getTableData()
})

// 获取表格数据
function getTableData() {
  tableData.value = [
    {
      id: 1,
      month1: '2021-01',
      select1: '0',
      imgUrl: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    },
    {
      id: 2,
      month1: '2021-02',
      select1: '1',
      imgUrl: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    },
    {
      id: 3,
      month1: '2021-03',
      select1: '2',
      imgUrl: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    },
  ]
  page.value.total = tableData.value.length
}

// 删除行
function rowDel(row, index, done) {
  console.log(row)
  done(row)
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
}
</style>
