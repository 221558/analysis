<template>
  <el-dialog
    v-model="dialogVisible"
    :title="typeVal == 'add' ? '新增' : '编辑'"
    width="800"
    class="user-dialog"
    :before-close="getClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="rules" label-width="100" ref="ruleFormRef" v-loading="loading">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="用户ID：" prop="userId">
            <el-input
              v-model="form.userId"
              placeholder="请输入用户ID"
              clearable
              @change="getUserIdData"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名：" prop="account">
            <el-input
              v-model="form.account"
              autocomplete="new-password"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="typeVal == 'add'">
          <el-form-item label="登陆密码：" prop="password">
            <el-input
              v-model="form.password"
              autocomplete="new-password"
              type="password"
              show-password
              placeholder="请输入密码"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="typeVal == 'add'">
          <el-form-item label="确认密码：" prop="password2">
            <el-input
              v-model="form.password2"
              type="password"
              autocomplete="new-password"
              show-password
              placeholder="请输入密码"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户权限：" prop="roleId">
            <el-select v-model="form.roleId" clearable placeholder="请选择" @change="changeRole">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.roleId == '1123598816738675203'">
          <el-form-item label="省份：" prop="province">
            <el-select v-model="form.province" clearable placeholder="请选择">
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态：" prop="status">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input v-model="form.note" type="textarea" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="typeVal == 'add'" :disabled="loading" type="primary" @click="addUser">
          <el-icon><CirclePlus /></el-icon>
          <span>保 存</span>
        </el-button>
        <el-button v-else :disabled="loading" type="primary" @click="updataUser">
          <el-icon><CircleCheck /></el-icon>
          <span>修 改</span>
        </el-button>

        <el-button :disabled="loading" @click="getClose(false)">
          <el-icon><CircleClose /></el-icon>
          <span>取 消</span>
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup >
import { passwordValidate, validatePositiveInteger } from '@/utils/validate';
import { ElMessage } from 'element-plus';
import { getAddUser, getUpdataUser, getUserId, getProvinceList } from '@/api/system/user';
import { getRoleTree } from '@/api/system/role';
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
// 加载状态
const loading = ref(false);
const ruleFormRef = ref(null);
const dialogVisible = ref(false);
const form = ref({
  userId: '',
  account: '',
  password: '',
  password2: '',
  status: 0,
  roleId: '',
  province: '',
  note: '',
});
const options = ref([]);
const roleList = ref([]);
const provinceList = ref([]);
const typeVal = ref('add');

// $emit 方法
const emit = defineEmits(['display']);

const openDialog = (type, row) => {
  typeVal.value = type;
  dialogVisible.value = true;
  if (type == 'edit') {
    form.value = row;
    getData(form.value);
  } else {
    getData();
  }
};

// 表单验证规则
const rules = ref({
  userId: [{ required: true, validator: validateNumber, trigger: 'change' }],
  account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
  password2: [{ required: true, validator: validatePass2, trigger: 'change' }],
  roleId: [{ required: true, message: '请选择用户权限', trigger: 'change' }],
  province: [{ required: true, message: '请选择省份', trigger: 'change' }],
});

const addUser = () => {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true;
      getAddUser(form.value).then(
        // 保存成功后，调用done函数，刷新页面，并弹出操作成功的提示信息
        () => {
          ElMessage.success('操作成功');
          getClose(true);
          loading.value = false;
        },
        // 保存失败后，打印错误信息，并调用loading函数
        error => {
          window.console.log(error);
          loading.value = false;
        }
      );
    } else {
      ElMessage.error('验证失败!');
    }
  });
};
const updataUser = () => {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true;
      // 调用update函数更新数据
      getUpdataUser(form.value).then(
        // 更新成功
        () => {
          // 弹出操作成功的提示信息
          getClose(true);
          ElMessage.success('操作成功');
          loading.value = false;
        },
        // 更新失败
        error => {
          // 打印错误信息
          window.console.log(error);
          loading.value = false;
        }
      );
    } else {
      ElMessage.error('验证失败!');
    }
  });
};

const changeRole = () => {
  form.value.province = '';
};

// 根据传入的行数据，获取用户ID数据
const getUserIdData = row => {
  // 调用getUserId方法，传入用户ID
  getUserId({ userId: form.value.userId }).then(res => {
    // 如果返回的数据中没有data字段，则提示用户ID已存在
    if (!res.data.data) {
      ElMessage.warning('用户ID已存在，请重新输入');
    }
  });
};

const getData = formVal => {
  getRoleTree().then(res => {
    roleList.value =
      formVal?.roleId == '1123598816738675201'
        ? res.data.data
        : res.data.data.filter(item => item.id != '1123598816738675201');
  });
  getProvinceList().then(res => {
    provinceList.value = res.data.data;
  });
};

/**
 * @description: 关闭弹窗
 */
const getClose = val => {
  // 关闭对话框
  dialogVisible.value = false;
  // 触发display事件，并传递参数val
  emit('display', val);
};

defineExpose({ openDialog });
</script>

<style lang="scss">
.user-dialog {
  padding: 0px;
  .el-dialog__header {
    padding: 16px !important;
    border-bottom: 1px solid #f0f0f0 !important;
  }
  .el-dialog__headerbtn {
    height: 57px;
  }
  .el-dialog__body {
    padding: 20px 25px;
  }
  .el-dialog__footer {
    padding: 10px 16px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>