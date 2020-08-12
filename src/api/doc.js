import request from '@/util/request'
import qs from 'qs'
export function getList (data) {
  const query = qs.stringify(data)
  return request({
    url: `/doc/list?${query}`,
    method: `get`
  })
}
// 修改数据
export function delDoc (data) {
  return request({
    url: `/doc/delData/${data.id}`,
    method: 'delete'
  })
}
// 添加
export function addDoc (data) {
  return request({
    url: '/doc/add',
    method: 'post',
    data: data
  })
}
// 根据ID获取文案管理内容
export function getDataForId (id) {
  return request({
    url: `/doc/getDataForId?id=${id}`,
    method: 'get'
  })
}
// 上传示意图
export function uploadImg (data) {
  return request({
    url: '/doc/uploadImg',
    method: 'post',
    data: data
  })
}
// 修改数据
export function modifData (data) {
  return request({
    url: `/doc/modifData`,
    method: 'post',
    data: data
  })
}
