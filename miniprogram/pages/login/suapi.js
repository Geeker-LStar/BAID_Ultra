wx.request({
  url: 'http://123.56.160.48:520/auth/litianxing123',
  method: 'POST',
  header: {
    'X-SU-Partner': 'ba5d5a7a1d7fbfcff0cc3e5318421f279dd5f72d0075cd2f93b42ef4e5dbe498',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: {
    password: 'test'
  },
  success(res) {
    console.log(res.data)
  }
})