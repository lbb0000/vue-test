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
