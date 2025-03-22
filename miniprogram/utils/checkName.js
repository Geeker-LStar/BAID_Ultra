export function checkName () {
    if (wx.getStorageSync('userId') != '') {
        const db = wx.cloud.database();
        db.collection('names').doc(wx.getStorageSync('userId')).get({
            success: (res) => {
                console.log(res);
            },
            fail: (err) => {
                console.error(err);
                // 云端没有_id为userId的值
                db.collection('names').add({
                    data: {
                        _id: wx.getStorageSync('userId'), // 使用userId作为数据的id
                        name: wx.getStorageSync('name'),
                        nameDisplayed: wx.getStorageSync('name').length <= 5? wx.getStorageSync('name'): `${wx.getStorageSync('name').slice(0, 4)}...`,
                    },
                    success: (res) => {
                        console.log(res);
                        console.warn('检测到云端存储的昵称信息缺失，已重置昵称！');
                    },
                    fail: (err) => {
                        console.error(err);
                    },
                })
            },
        });
    };
};