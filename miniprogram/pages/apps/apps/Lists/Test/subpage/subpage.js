Page({
    data: {
        value1: '',
        value2: '',
        value3: '',
        value4: '输入框已禁用',
        value5: '',
        value6: '',
        value7: '',
        switch : false
    },
    onChange(event){
        const detail = event.detail;
        this.setData({
            'switch1' : detail.value
        })
        
    }
});