import request from '@/axios';
export const rootCauseList = businessWarnRemindId => {
  return request({
    url: '/analysis-system/root-cause/list',
    method: 'get',
    params: {
      businessWarnRemindId,
    },
  });
};
