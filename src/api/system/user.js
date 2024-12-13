import request from '@/axios';

export const getUserList = (params, data) => {
  return request({
    url: '/blade-system/user/page',
    method: 'post',
    params,
    data,
  });
};
export const getAddUser = data => {
  return request({
    url: '/blade-system/user/save',
    method: 'post',
    data,
  });
};

export const getUpdataUser = data => {
  return request({
    url: '/blade-system/user/update',
    method: 'post',
    data,
  });
};

export const getDelUser = params => {
  return request({
    url: '/blade-system/user/remove',
    method: 'post',
    params,
  });
};
