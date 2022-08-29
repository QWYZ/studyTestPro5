/**
 * @Description: 保存一些常用的正则表达式
 * @author yeship
 * @date 2021/8/17 14:51
 */

// 只能由数字和英文字母混合组成,长度 minLength - maxLength 位！
export const isNumbersAndLetters = (minLength, maxLength) => {
  return '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{' + minLength + ',' + maxLength + '}$'
}

// 只能由汉字组成,长度 minLength - maxLength 位！
export const isChineseCharacter = (minLength, maxLength) => {
  return '^[\u4e00-\u9fa5]{' + minLength + ',' + maxLength + '}$'
}

// 是否为手机号码,长度 11 位！
export const isPhoneNumber = () => {
  return '^1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$'
}

 // 不允许输入emoji表情
export const isNoEmoji = () => {
  return '^((?!(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])).)+$'
}

 /**禁止输入表情 */
 export const NoEmojiRegexp = /^((?!(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])).)+$/

 /**只能输入汉字 */
 export const onlyZhRegexp = /^[\u4e00-\u9fa5]+$/

 /**输入6~12的英文+数字不区分先后顺序 */
 export const validUserNameRegexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/

 /**手机号码校验 */
 export const phoneRegexp = /^1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/

 /** 关键字校验(字母+'-') */
 export const keyPerms = /^[A-Za-z\-]+$/

/**只能输入数字、汉字、英文(指定长度范围的) */
export const onlyNumZhEn = (minLength, maxLength) => {
  let validString = '^[a-zA-Z0-9_\u4e00-\u9fa5]{' + minLength + ',' + maxLength + '}$';
  return new RegExp(validString)
}

/**只能输入汉字(指定长度范围的) */
export const onlyZh = (minLength, maxLength) => {
  let validString = '^[\u4e00-\u9fa5]{' + minLength + ',' + maxLength + '}$'
  return new RegExp(validString)
}
