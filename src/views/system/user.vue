<template>
  <basic-container>
    <avue-crud
      ref="crudRef"
      :data="data"
      :option="option"
      v-model:page="page"
      v-model:search="search"
      :table-loading="loadings"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="refreshChange"
      @search-change="searchChange"
      @search-reset="resetChange"
      @selection-change="selectionChange"
      @on-load="onLoad"
    >
      <template #menu-left>
        <searchReport @getSearch="getSearch" />
      </template>

      <template #status="scope">
        <el-tag :type="scope.row.status == 1 ? 'success' : 'warning'">
          {{ scope.row.status == 1 ? '启用' : '停用' }}
        </el-tag>
      </template>
      <template #menu-right>
        <el-button type="primary" plain @click="getDialog('add', '')">
          <el-icon><Plus /></el-icon>
          <span>新增</span>
        </el-button>
        <el-button type="primary" plain @click="getDel">批量删除 </el-button>
      </template>
      <template #menu="scope">
        <el-button text type="primary" @click.stop="getDialog('edit', scope.row)">
          <el-icon><Edit /></el-icon>
          <span>编 辑</span>
        </el-button>
        <el-button text type="primary" @click.stop="rowDel(scope.row)">
          <el-icon><Delete /></el-icon>
          <span>删 除</span>
        </el-button>
      </template>
    </avue-crud>

    <dialogPase ref="dialogRef" v-if="show" @display="getDisplay" />
  </basic-container>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import searchReport from './components/search.vue'; // NOSONAR
import dialogPase from './components/dialog.vue'; // NOSONAR
import { getUserList, getDelUser } from '@/api/system/user';
import { getRoleTree } from '@/api/system/role';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
import func from '@/utils/func';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
import { passwordValidate, validatePositiveInteger } from '@/utils/validate';
// 定义分页信息变量，包括每页大小、当前页码和总条数
const page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const ids = computed(() => {
  return selectionList.value.map(item => String(item.id)).join(',');
});
const dialogRef = ref(null);
const show = ref(false);

const crudRef = ref(null);
option.value = {
  // 将conf.value中的属性展开
  ...conf.value,
  dialogWidth: 800, // 弹窗宽度
  // 设置表格内容的对齐方式为居中
  align: 'center',
  column: [
    // 表格编号
    { label: '用户ID', prop: 'userId' },
    { label: '用户名', prop: 'account' },
    {
      label: '用户权限',
      prop: 'roleId',
      type: 'select',
      dicData: [],
      props: { label: 'title', value: 'id' },
    },
    {
      label: '省份',
      prop: 'province',
      type: 'select',
      dicUrl: '/analysis-system/business-warn/province-list',
      props: { label: 'label', value: 'value' },
    },
    { label: '状态', prop: 'status' },
    { label: '备注', prop: 'note', span: 24, type: 'textarea', minRows: 3 },
  ].map(item => {
    return { ...item, overHidden: true };
  }),
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
  getUserList({ current: pages.currentPage, size: pages.pageSize }, search.value)
    .then(res => {
      const datContent = res.data.data;
      data.value = datContent.records;
      page.value.total = datContent.total;
      loadings.value = false;
      getRoleTree().then(res => {
        const column = _this.findObject(option.value.column, 'roleId');
        column.dicData = res.data.data;
      });
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
// 新增弹窗 调用crudRef.value.rowAdd()方法
const getDialog = (type, row) => {
  show.value = true;
  nextTick(() => {
    // 调用子组件方法
    dialogRef.value.openDialog(type, JSON.parse(JSON.stringify(row)));
  });
};

// 定义一个函数getDel，用于删除选择的数据
const getDel = () => {
  // 如果选择的数据列表为空，则提示用户选择至少一条数据
  if (selectionList.value.length === 0) {
    return ElMessage.warning('请选择至少一条数据');
  }
  // 弹出一个确认框，询问用户是否确定删除选择的数据
  ElMessageBox.confirm('确定将选择数据删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    // 如果用户点击了确定按钮，则执行以下操作
    .then(() => {
      return getDelUser({ ids: ids.value });
    })
    // 删除成功后，重新加载数据，并提示用户操作成功
    .then(() => {
      onLoad(page.value);
      ElMessage.success('操作成功');
      selectionList.value = [];
    });
};
// 定义一个删除行的函数
const rowDel = row => {
  // 弹出确认框，询问是否确定删除选择的数据
  ElMessageBox.confirm('确定将选择数据删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    // 如果用户点击了确定按钮
    .then(() => {
      // 调用删除函数，传入行的id
      return getDelUser({ ids: row.id });
    })
    // 删除成功后
    .then(() => {
      // 重新加载数据
      onLoad(page.value);
      // 弹出操作成功的提示
      ElMessage.success('操作成功');
    });
};

/**
 * @description: 组件方法
 * @param {Object} val 子组件值
 */
const getDisplay = val => {
  // 隐藏组件
  show.value = false;
  // 刷新列表
  if (val) return onLoad(page.value);
};
</script>