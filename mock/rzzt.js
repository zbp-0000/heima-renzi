const Mock = require('mockjs')
// Mock.mock('http://localhost:9528/dev-api/sys/profile', 'POST', function() {
Mock.mock(/\/dev-api\/sys\/profile/, 'post', function() {
  return {
    success: true,
    code: 10000,
    data: {
      userId: '604f764971f93f3ac8f365c2',
      mobile: '13800000002',
      username: '管理员',
      roles: {
        menus: [
          'settings',
          'permissions',
          'approvals',
          'attendances',
          'departments',
          'employees',
          'salarys',
          'social_securitys'
        ],
        points: [
          'aa',
          'add-dept',
          'hahah ',
          'hahah ',
          'abab',
          'add-social',
          'remove'
        ],
        apis: []
      },
      companyId: '1',
      company: '传智播客'
    },
    message: '获取资料成功'
  }
})
