<template>
  <div class="table-container">
    <Steps />
    <avue-crud ref="crudRef" :data="data" :option="option" @on-load="onLoad"> </avue-crud>
  </div>
</template>

<script setup>
import Steps from './steps.vue';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getUploadRecords, getDownloadFile } from '@/api/data-query/original-report';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const crudRef = ref(null);

option.value = {
  ...conf.value,
  align: 'center',
  dialogWidth: 600,
  menu: false,
  selection: false,
  column: [
    { label: '监控ID', prop: 'sheetIndex' },
    { label: '监控省份', prop: 'sheetName' },
    { label: '监控参数', prop: 'fileTime' },
    { label: '阈值设置', prop: 'explain' },
    { label: '实际值', prop: 'status' },
    { label: '预警月份', prop: 'month' },
  ],
};
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

// 刷新
const refreshChange = () => {
  onLoad(page.value);
};

// 搜索
const searchChange = () => {
  page.value.currentPage = 1;
  onLoad(page.value);
};

// 搜索清空
const resetChange = () => {
  // 将搜索条件重置为空对象
  search.value = {};
  // 重新加载数据
  onLoad(page.value);
};
// 查询

const onLoad = pages => {
  loadings.value = true;
  getUploadRecords({ current: pages.currentPage, size: pages.pageSize, ...search.value })
    .then(res => {
      const datContent = res.data.data;
      data.value = datContent.records;
      page.value.total = datContent.total;
      loadings.value = false;
    })
    .catch(() => {
      loadings.value = false;
    });
};
// 定义一个函数，用于获取搜索表单
const getSearch = form => {
  // 打印搜索表单
  search.value = form;
  onLoad(page.value);
};
const getAdd = () => {
  crudRef.value.rowAdd();
};
// 定义一个函数，用于新增数据
const rowSave = (row, done, loading) => {
  // add(row)
  //   .then(() => {
  //     done();
  //     refreshChange();
  //     crudRef.value.closeDialog();
  //   })
  //   .catch(() => {
  //     loading();
  //   });
};
// 定义一个函数，用于批量数据
const getDeleteSelection = () => {
  if (selectionList.value.length === 0) {
    return ElMessage.warning('请选择至少一条数据');
  }
  _this
    .$confirm('确定将选择数据删除?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      return remove(selectionList.value.map(item => item.id));
    })
    .then(() => {
      _this.onLoad(_this.page);
      _this.$message({
        type: 'success',
        message: '操作成功!',
      });
    });
};
// 定义一个函数，用于编辑行数据
const getEdit = row => {
  crudRef.value.rowEdit(row);
};
// 定义一个函数，用于更新行数据
const rowUpdate = (row, index, done, loading) => {};
// 定义一个函数，用于删除行数据
const getDelete = row => {
  _this
    .$confirm('确定将选择数据删除?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      return remove(row.id);
    })
    .then(() => {
      _this.onLoad(_this.page);
      _this.$message({
        type: 'success',
        message: '操作成功!',
      });
    });
};
</script>

<style lang="scss" scoped>
.table-container {
  // 设置背景颜色为白色
  background-color: #fff;
  // 设置内边距为15px
  padding: 20px 15px 15px 15px;
  // 设置左下角圆角半径为5px
  border-bottom-left-radius: 5px;
  // 设置右下角圆角半径为5px
  border-bottom-right-radius: 5px;
}
</style>
