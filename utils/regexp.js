/**
 * 用户名正则（数字、字母、下划线的3~20字符）
 */
function userNameReg() {
  return /^[\d|\w|_]{3,20}$/;
}
/**
 * 密码正则（6~50字符）
 */
function pwdReg() {
  return /^.{6,50}$/;
}
module.exports = {
  userNameReg: userNameReg,
  pwdReg: pwdReg
}
