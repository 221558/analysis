<template>
  <basic-container>
    <avue-crud
      ref="crudRef"
      :data="data"
      v-model="form"
      :option="option"
      v-model:page="page"
      v-model:search="search"
      :table-loading="loadings"
      @row-del="rowDel"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="refreshChange"
      @search-change="searchChange"
      @search-reset="resetChange"
      @selection-change="selectionChange"
      @on-load="onLoad"
      :before-open="beforeOpen"
      :before-close="beforeClose"
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
        <el-button type="primary" plain @click="getAdd">
          <el-icon><Plus /></el-icon>
          <span>新增</span>
        </el-button>
        <el-button type="primary" plain @click="getDel">批量删除 </el-button>
      </template>
      <!-- <template #menu="scope"> </template> -->
    </avue-crud>
  </basic-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import searchReport from './components/search.vue'; // NOSONAR
import { getUserList, getAddUser, getUpdataUser, getDelUser, getUserId } from '@/api/system/user';
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
const form = ref({ roleId: '', province: '' });

const validateNumber = (rule, value, callback) => {
  // 如果密码为空
  if (value === '') {
    // 调用回调函数，传入错误信息提示用户输入密码
    callback(new Error('请输入用户ID'));
    // 再次调用回调函数，不传入错误信息，表示验证完成
    callback();
    // 如果密码不符合验证规则
  } else if (!validatePositiveInteger(value)) {
    // 调用回调函数，传入错误信息提示密码格式不正确
    callback(new Error('请输入数字！'));
    // 如果密码符合验证规则
  } else {
    // 调用回调函数，不传入错误信息，表示验证完成
    callback();
  }
};

const validatePass = (rule, value, callback) => {
  // 如果密码为空
  if (value === '') {
    // 调用回调函数，传入错误信息提示用户输入密码
    callback(new Error('请输入登陆密码'));
    // 再次调用回调函数，不传入错误信息，表示验证完成
    callback();
    // 如果密码不符合验证规则
  } else if (!passwordValidate(value)) {
    // 调用回调函数，传入错误信息提示密码格式不正确
    callback(
      new Error(
        '密码包含：大写、小写英文字母、数字、英文特殊符号，任意3种组合以上，长度在8-20之间！'
      )
    );
    // 如果密码符合验证规则
  } else {
    // 调用回调函数，不传入错误信息，表示验证完成
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  // 如果输入值为空
  if (value === '') {
    // 调用回调函数，传入错误对象，提示用户请再次输入密码
    callback(new Error('请再次输入密码'));
    // 如果输入值不等于表单中的密码值
  } else if (value !== form.value.password) {
    // 调用回调函数，传入错误对象，提示用户两次输入密码不一致
    callback(new Error('两次输入密码不一致!'));
    // 其他情况
  } else {
    // 调用回调函数，无参数，表示验证通过
    callback();
  }
};

const crudRef = ref(null);
option.value = {
  // 将conf.value中的属性展开
  ...conf.value,
  editBtn: true, // 修改按钮
  delBtn: true, // 删除按钮
  dialogWidth: 800, // 弹窗宽度
  // 设置表格内容的对齐方式为居中
  align: 'center',
  column: [
    // 表格编号
    {
      label: '用户ID',
      prop: 'userId',
      rules: [{ required: true, validator: validateNumber, trigger: 'blur' }],
    },
    {
      label: '用户名',
      prop: 'account',
      autocomplete: 'new-password',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    },
    {
      label: '登陆密码',
      prop: 'password',
      type: 'password',
      autocomplete: 'new-password',
      hide: true,
      editDisplay: false,
      viewDisplay: false,
      rules: [{ required: true, validator: validatePass, trigger: 'change' }],
    },
    {
      label: '确认密码',
      prop: 'password2',
      autocomplete: 'new-password',
      hide: true,
      type: 'password',
      editDisplay: false,
      viewDisplay: false,
      rules: [{ required: true, validator: validatePass2, trigger: 'change' }],
    },
    {
      label: '用户权限',
      prop: 'roleId',
      type: 'select',
      dicData: [],
      props: { label: 'title', value: 'id' },
      rules: [{ required: true, message: '请选择用户权限', trigger: 'blur' }],
    },
    {
      label: '省份',
      prop: 'province',
      type: 'select',
      dicUrl: '/analysis-system/business-warn/province-list',
      props: { label: 'label', value: 'value' },

      rules: [{ required: true, message: '请选择省份', trigger: 'blur' }],
    },
    {
      label: '状态',
      prop: 'status',
      type: 'switch',
      dicData: [{ value: 0 }, { value: 1 }],
      value: 1,
    },

    { label: '备注', prop: 'note', span: 24, type: 'textarea', minRows: 3 },
  ].map(item => {
    return { ...item, overHidden: true };
  }),
};

watch(
  // 监听form对象的变化
  form,
  // 当form对象发生变化时，执行以下函数
  () => {
    const column = _this.findObject(option.value.column, 'province');
    // 如果form对象的roleId属性等于'1123598816738675202'
    if (form.value.roleId == '1123598816738675203') {
      // 在option对象的column属性中查找province属性，并将其addDisplay和editDisplay属性设置为true
      column.addDisplay = true;
      column.editDisplay = true;
    } else {
      // 否则，在option对象的column属性中查找province属性，并将其addDisplay和editDisplay属性设置为false
      column.addDisplay = false;
      column.editDisplay = false;
      // 同时将form对象的province属性设置为空字符串
      form.value.province = '';
    }
    if (form.value.userId) {
      getUserId({ userId: form.value.userId }).then(res => {});
    }
  },
  // 深度监听，即监听对象内部属性的变化
  { deep: true }
);

//

watchEffect(() => {
  console.log(form.value.userId);
});

// 在打开弹窗之前执行的操作
const beforeOpen = (done, type, loading) => {
  // 如果type为add或edit
  if (['add', 'edit'].includes(type)) {
    // 如果form.value.roleId不等于'1123598816738675201'
    if (form.value.roleId !== '1123598816738675201') {
      // 在option.value.column中查找roleId为form.value.roleId的列
      const column = _this.findObject(option.value.column, 'roleId');
      // 过滤掉title为'超级管理员'的项
      column.dicData = column.dicData.filter(item => item.title != '超级管理员');
    }
  }
  // 执行done函数
  done();
};
// 在关闭弹窗之前执行的操作
const beforeClose = (done, type) => {
  // 重新加载page.value
  onLoad(page.value);
  // 执行done函数
  done();
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
const getAdd = () => {
  // 调用crudRef.value.rowAdd()方法
  crudRef.value.rowAdd();
};

// 定义一个rowSave函数，用于保存行数据
const rowSave = (row, done, loading) => {
  // 调用add函数，将row数据保存到数据库
  getAddUser(row).then(
    // 保存成功后，调用done函数，刷新页面，并弹出操作成功的提示信息
    () => {
      done();
      onLoad(page.value);
      ElMessage.success('操作成功');
    },
    // 保存失败后，打印错误信息，并调用loading函数
    error => {
      window.console.log(error);
      loading();
    }
  );
};

// 定义一个rowUpdate函数，用于更新行数据
const rowUpdate = (row, index, done, loading) => {
  // 将row.deptId、row.roleId、row.postId转换为字符串
  // 调用update函数更新数据
  getUpdataUser(row).then(
    // 更新成功
    () => {
      // 执行done函数
      done();
      // 重新加载数据
      onLoad(page.value);
      // 弹出操作成功的提示信息
      ElMessage.success('操作成功');
    },
    // 更新失败
    error => {
      // 打印错误信息
      window.console.log(error);
      // 执行loading函数
      loading();
    }
  );
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
</script>