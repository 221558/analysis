<template>
  <basic-container class="entry-container" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- 表单 -->
    <avue-form ref="formRef" :option="option" v-model="formData"></avue-form>
    <!-- 上传组件 -->
    <el-upload
      class="upload-demo"
      drag
      :disabled="disabled"
      :show-file-list="false"
      :action="action"
      accept=".xls,.xlsx"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      @click="handleRowClick"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        <em><img class="upload-img" src="/img/data/upload-button.png" alt="上传文档" />上传文档</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          点击上传Excel文档 或 拖拽Excel文档至此， 支持格式：.xls .xlsx
        </div>
      </template>
    </el-upload>
    <!-- 标题 -->
    <basic-title style="margin-top: 40px" :title="title" />
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
        <!-- 下载按钮 -->
        <el-button
          type="primary"
          text
          :size="size"
          icon="el-icon-download"
          @click="rowDownload(row, index)"
        >
          下载
        </el-button>
        <!-- 删除按钮 -->
        <el-button
          type="danger"
          text
          :size="size"
          icon="el-icon-delete"
          @click="rowDel(row, index)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script setup>
// 导入BasicTitle组件
import BasicTitle from '@/components/basic-title/main.vue';
// 导入ref函数
import { ref } from 'vue';
// 导入dataDownload、deleteUploadRecord、getFileTypeList、getUploadRecords函数
import { dataDownload, deleteUploadRecord, getFileTypeList, getUploadRecords } from '@/api/entry';
// 导入ElMessage组件
import { ElMessage } from 'element-plus';
// 导入getToken函数
import { getToken } from '@/utils/auth';
// 导入baseUrl
import { baseUrl } from '@/config/env';

// 定义option变量，初始值为空对象
const option = ref({});
// 定义optionTable变量，初始值为空对象
const optionTable = ref({});
// 定义tableData变量，初始值为空数组
const tableData = ref([]);
// 定义formData变量，初始值为空对象
const formData = ref({});
// 定义loading变量，初始值为true
const loading = ref(true);
// 定义action变量，初始值为空字符串
const action = ref('');
// 定义fullscreenLoading变量，初始值为false
const fullscreenLoading = ref(false);
// 定义title变量，初始值为'历史录入记录'
const title = ref('历史录入记录');
// 定义disabled变量，初始值为true
const disabled = ref(true);
// 表单配置
option.value = {
  // 标签宽度
  labelWidth: '72',
  // 标签位置
  labelPosition: 'left',
  // 提交按钮
  submitBtn: false,
  // 清空按钮
  emptyBtn: false,
  // 栅格间隔
  gutter: 20,
  // 列配置
  column: [
    {
      // 标签
      label: '选择月份',
      // 属性
      prop: 'fileTime',
      // 类型
      type: 'month',
      // 占用栅格数
      span: 4,
      // 值格式
      valueFormat: 'YYYY-MM',
      // 提示信息
      placeholder: '请选择 月份',
      // 禁用日期
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
    },
    { label: '数据类型', prop: 'filetype', type: 'select', dicData: [], span: 4, row: true },
  ],
};

// 获取搜索条件数据
const getFormFiles = () => {
  getFileTypeList()
    .then(res => {
      option.value.column[1].dicData = res.data.data;
    })
    .catch(err => {
      console.log(err);
    });
};
getFormFiles();

// 表格分页信息
const page = ref({ background: false, total: 0, currentPage: 1, pageSize: 10 });

// 表格配置
optionTable.value = {
  // 是否显示编辑按钮
  editBtn: false,
  // 是否显示删除按钮
  delBtn: false,
  // 是否显示表头
  header: false,
  // 是否显示边框
  border: true,
  // 表格内容居中对齐
  align: 'center',
  // 表格列配置
  column: [
    { label: '上传日期', prop: 'createTime' },
    { label: '文件名', prop: 'fileName' },
  ],
};
// 监听formData.value.fileTime和formData.value.filetype的变化
watchEffect(() => {
  // 如果formData.value.fileTime和formData.value.filetype都有值，则disabled.value为false，否则为true
  if (formData.value.fileTime && formData.value.filetype) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
});

// 每页多少条
const sizeChange = val => {
  // 将当前页码重置为1
  page.value.currentPage = 1;
  // 将每页显示条数设置为val
  page.value.pageSize = val;
};

// 当前页数
const currentChange = val => {
  // 将当前页码设置为val
  page.value.currentPage = val;
};

// 获取表格数据
// 加载函数，接收参数pages
function onLoad(pages) {
  // 设置loading状态为true
  loading.value = true;
  // 调用getUploadRecords函数，传入参数current和size
  getUploadRecords({
    current: pages.currentPage,
    size: pages.pageSize,
  })
    // 请求成功时执行
    .then(res => {
      // 获取返回的数据
      const datContent = res.data.data;
      // 将数据赋值给tableData
      tableData.value = datContent.records;
      // 将总页数赋值给page
      page.value.total = datContent.total;
      // 设置loading状态为false
      loading.value = false;
    })
    // 请求失败时执行
    .catch(err => {
      // 打印错误信息
      console.log(err);
      // 设置loading状态为false
      loading.value = false;
    });
}

// 上传文件
function beforeUpload(file) {
  const flag = Boolean(formData.value.fileTime && formData.value.filetype);
  if (!flag) {
    ElMessage.warning('请先选择条件');
    return false;
  }
  const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1);

  const whiteList = ['xls', 'xlsx'];

  if (whiteList.indexOf(fileSuffix) === -1) {
    ElMessage.error('上传文件只能是xls、xlsx格式');
    return false;
  }
  const { VITE_APP_BASE_URL, MODE } = import.meta.env;
  console.log(import.meta.env);
  // 定义api前缀
  let apiPrefix = '/api';
  if (MODE !== 'development') {
    apiPrefix = VITE_APP_BASE_URL;
  }
  action.value = `${baseUrl}/analysis-system/data-file/upload?blade-auth=bearer ${getToken()}&fileTime=${
    formData.value.fileTime
  }&filetype=${formData.value.filetype}`;
  fullscreenLoading.value = true;
  return true;
}

// 上传成功
function handleSuccess(res, file, fileList) {
  fullscreenLoading.value = false;
  if (res.code !== 200) {
    // 如果返回码不是200，则提示错误信息
    ElMessage.error(res.msg);
    return;
  }
  // 提示上传成功
  ElMessage.success('上传成功');
  // 刷新表格数据
  onLoad(page.value);
}

// 上传失败
function handleError(err, file, fileList) {
  console.log(err);
  fullscreenLoading.value = false;
  // 提示上传失败
  ElMessage.error('上传失败');
}

// 下载文件
function rowDownload(row, index) {
  console.log(row);
  dataDownload({ recordId: row.id })
    .then(res => {
      // 创建下载链接
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      link.href = url;
      // 设置文件名
      link.setAttribute('download', row.fileName);
      // 将锚点添加到文档
      document.body.appendChild(link);
      // 模拟点击
      link.click();
      // 下载后移除锚点
      document.body.removeChild(link);
      // 释放内存
      window.URL.revokeObjectURL(url);
      link.style.display = 'none';
      ElMessage.success('正在下载中...');
    })
    .catch(err => {
      console.log(err);
    });
}

// 删除行数据
function rowDel(row, index, done) {
  // 打印当前行数据
  console.log(row);
  // 调用删除上传记录的接口，传入当前行的id
  deleteUploadRecord({ recordId: row.id })
    .then(res => {
      // 删除成功后，弹出成功提示
      ElMessage.success('删除成功');
      // 刷新表格数据 并 关闭弹窗
      onLoad(page.value);
      // done(row)
    })
    .catch(err => {
      // 打印错误信息
      console.log(err);
    });
}

// 点击行时触发的事件
function handleRowClick() {
  // 如果formData.value.fileTime或formData.value.filetype为空，则弹出警告信息
  if (!formData.value.fileTime || !formData.value.filetype) {
    ElMessage.warning('请选择月份与数据类型');
  }
}
</script>

<style lang="scss" scoped>
:deep.entry-container {
  .el-upload__tip {
    position: relative;
    width: 100%;
    color: rgba(165, 165, 165, 1);
    text-align: center;
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
  .el-upload.is-disabled .el-upload-dragger {
    background: #fff !important;
  }
}
</style>
