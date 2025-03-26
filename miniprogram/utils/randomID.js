export function randomID () {
    let randomID = '';
    // 时间部分
    randomID = `${randomID}${Date.now()}-`;
    // 随机数部分
    randomID = `${randomID}${Math.round(Math.random()*10**11)}`;
    return randomID;
};