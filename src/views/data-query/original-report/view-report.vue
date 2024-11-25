<template>
  <basic-container>
    <el-button text @click="getReturn">
      <el-icon><ArrowLeftBold /></el-icon>
      <span>返回</span>
    </el-button>
    <div class="view-report">
      <div class="title">[{{ objcet.sheetIndex }}] : {{ objcet.sheetName }}</div>
      <div class="annotation">
        <!-- 上传时间(2024-02-03) 所属月份({{ objcet.fileTime }}) 阅读信息(23) -->
        <span> 所属月份({{ objcet.fileTime }})</span>
        <el-button
          style="float: right; margin-top: -8px"
          type="primary"
          plain
          size="small"
          @click="getDownload"
        >
          下载
        </el-button>
      </div>
      <div class="sheet-main">
        <div class="sheet-content">
          <vue-office-excel
            :src="excel"
            style="height: calc(100vh - 220px)"
            @rendered="renderedHandler"
            @error="errorHandler"
          />
        </div>
      </div>
      <el-button class="handle-button bottom" type="primary" text @click="getDownload">
        <el-icon><Download /></el-icon>
        <span>下载</span>
      </el-button>
    </div>
  </basic-container>
</template>

<script setup>
//引入VueOfficeExcel组件
import VueOfficeExcel from '@vue-office/excel';
//引入相关样式
import '@vue-office/excel/lib/index.css';
import { getViewDetails } from '@/api/data-query/original-report';
// 引入mixin
import { useMixins } from '@/mixins/data.js';
// 导入getToken方法，用于获取token
import { getToken } from 'utils/auth';
import { onMounted } from 'vue';
const { _this } = useMixins();
// 获取路由参数
const objcet = _this.$route.query;
const excel = ref(null);

onMounted(() => {
  // 获取文件信息
  getViewDetails({ recordIds: objcet.id }).then(res => {
    console.log(res.data);
    const blob = new Blob([res.data], { type: res.headers['content-type'] });
    excel.value = URL.createObjectURL(blob);
  });
});
// 返回按钮点击事件
/* eslint-disable no-unused-vars */
const getReturn = () => {
  _this.$router.push({ path: '/data-query/original-report/index' });
};

// 下载按钮点击事件
/* eslint-disable no-unused-vars */
const getDownload = () => {
  const url = `/api/analysis-system/data-table/upload-records/download?blade-auth=${getToken()}&recordIds=${
    objcet.id
  }`;
  window.open(url, '_self');
};

const renderedHandler = () => {
  console.log('渲染完成');
};
const errorHandler = () => {
  console.log('渲染失败');
};
</script>

<style lang="scss" scoped>
.view-report {
  // 设置高度为视口高度减去180px
  height: calc(100vh - 180px);
  // 设置定位为相对定位
  position: relative;

  // 标题样式
  .title {
    // 设置字体大小为28px
    font-size: 28px;
    // 设置文本居中对齐
    text-align: center;
  }
  // 注释样式
  .annotation {
    // 设置字体大小为14px
    font-size: 14px;
    // 设置文本居中对齐
    text-align: center;
    // 设置行高为21px
    line-height: 21px;
    // 设置颜色为rgba(187, 187, 187, 1)
    color: rgba(187, 187, 187, 1);
  }
}
</style>