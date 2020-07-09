import request from '@/util/request'
import qs from 'qs'
export function getList (data) {
  const query = qs.stringify(data)
  return request({
    url: `/doc/list?${query}`,
    method: `get`
  })
}
