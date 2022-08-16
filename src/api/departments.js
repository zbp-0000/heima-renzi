import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'GET'

  })
}

// 新增部门
export function addDepartments() {
  return request({
    url: '/company/department',
    method: 'GET'

  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data

  })
}

// 删除部门
export function delDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

// 编辑部门
export function getDepartmentById(id) {
  return request({
    url: '/company/department/' + id,
    method: 'GET'
  })
}

// 编辑部门
export function updateDepartment(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}

