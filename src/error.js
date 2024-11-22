// 导入store，用于管理状态
import store from './store';

// 导出一个默认的Vue插件对象
export default {
  // 插件安装方法
  install: (app) => {
    // 设置全局错误处理器
    app.config.errorHandler = (err, vm, info) => {
      // 只在开发环境下处理错误
      if (process.env.NODE_ENV === 'development') {
        // 将错误信息提交到store，以便在状态管理中记录错误日志
        store.commit('ADD_LOGS', {
          type: 'error',
          message: err.message,
          stack: err.stack,
          info,
        });
        // 控制台分组输出错误信息，便于开发者在控制台中查看详细信息
        console.group('>>>>>> 错误信息 >>>>>>');
        console.log(info);
        console.groupEnd();
        // 控制台分组输出Vue实例信息
        console.group('>>>>>> Vue 实例 >>>>>>');
        console.log(vm);
        console.groupEnd();
        // 控制台分组输出错误对象
        console.group('>>>>>> Error >>>>>>');
        console.log(err);
        console.groupEnd();
      }
    };
  },
};
