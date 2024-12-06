<template>
  <div class="table-container">
    <avue-crud
      ref="crudRef"
      :data="data"
      :option="option"
      v-model:page="page"
      v-model:search="search"
      :table-loading="loadings"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="refreshChange"
      @search-change="searchChange"
      @search-reset="resetChange"
      @selection-change="selectionChange"
      @on-load="onLoad"
    >
      <template #menu-left>
        <searchReport
          :selectionList="selectionList"
          @getSearch="getSearch"
          :provinceList="provinceList"
          :monitorParamList="monitorParamList"
        />
      </template>
      <template #menu-right>
        <el-button type="primary" plain @click="getAdd"
          ><el-icon><Plus /></el-icon> 新增
        </el-button>
        <el-button type="primary" plain @click="getDeleteSelection"> 批量删除 </el-button>
      </template>
      <template #menu="scope">
        <el-button text type="primary" @click.stop="getEdit(scope.row)">
          <el-icon><Edit /></el-icon>
          <span>编辑</span>
        </el-button>
        <el-button text type="primary" @click.stop="getDelete(scope.row)">
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import searchReport from '../search-form.vue'; // NOSONAR
import {
  getProvinceList,
  getMonitorParamList2,
  getBusinessParamList,
  businessParamSave,
  businessParamUpdate,
  networkParamDelete,
  checkMonitorId
} from '@/api/business/threshold.js';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
// 导入通用CRUD混入
import { useMixins } from '@/mixins/data.js';
// _this, store, option, data, search, loadings, conf, selectionList, selectionChange
const { _this, option, data, search, loadings, conf, selectionList, selectionChange } = useMixins();
// 定义分页信息变量，包括每页大小、当前页码和总条数
let page = ref({ pageSize: 10, currentPage: 1, total: 10, background: false });
const crudRef = ref(null);
const provinceList = ref([]); // 省份下拉框
const monitorParamList = ref([]); // 业务-监控参数下拉框
onMounted(async () => {
  const [provinceRes, monitorParamRes] = await Promise.all([
    getProvinceList(),
    getMonitorParamList2(),
  ]);
  provinceList.value = provinceRes.data.data;
  monitorParamList.value = monitorParamRes.data.data;
});

option.value = {
  ...conf.value,
  align: 'center',
  dialogWidth: 600,
  column: [
    {
      label: '监控ID',
      prop: 'monitorId',
      span: 12,
      rules: [{ required: true, message: '请输入监控ID', trigger: 'blur' }],
      blur: ({ value, colunm }) => {
        checkMonitorId(value);
        console.log('监控ID', value);
      },
    },
    {
      label: '监控省份',
      prop: 'province',
      span: 12,
      type: 'select',
      dicData: provinceList,
      rules: [{ required: true, message: '请选择监控省份', trigger: 'blur' }],
    },
    {
      label: '监控参数',
      prop: 'monitorParam',
      span: 12,
      type: 'select',
      dicData: monitorParamList,
      rules: [{ required: true, message: '请选择监控参数', trigger: 'blur' }],
    },
    {
      label: '阈值设置',
      prop: 'monitorThreshold',
      span: 12,
      rules: [{ required: true, message: '请输入阈值设置', trigger: 'blur' }],
    },
    {
      label: '状态',
      prop: 'status',
      span: 24,
      type: 'switch',
      dicData: [
        { label: '', value: 0 },
        { label: '', value: 1 },
      ],
      value: 1,
    },
    { label: '说明', prop: 'note', span: 24, type: 'textarea' , rules: [{ required: true, message: '请输入说明', trigger: 'blur' }],},
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
  getBusinessParamList(search.value, { current: pages.currentPage, size: pages.pageSize })
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
  businessParamSave(row)
    .then(() => {
      done();
      refreshChange();
      crudRef.value.closeDialog();
    })
    .catch(() => {
      loading();
    });
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
      refreshChange();
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
const rowUpdate = (row, index, done, loading) => {
  businessParamUpdate(row)
    .then(() => {
      done();
      refreshChange();
      crudRef.value.closeDialog();
    })
    .catch(() => {
      loading();
    });
};
// 定义一个函数，用于删除行数据
const getDelete = row => {
  _this
    .$confirm('确定将选择数据删除?', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      return checkMonitorId([row.id]);
    })
    .then(() => {
      refreshChange();
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