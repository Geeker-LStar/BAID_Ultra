exports.main = async (event, context) => {
  console.log("test - DEBUG"); // DEBUG 级别日志
  console.warn("test - WARN"); // WARN 级别日志
  console.error("test - ERROR"); // ERROR 级别日志

  const wxContext = cloud.getWXContext();
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};