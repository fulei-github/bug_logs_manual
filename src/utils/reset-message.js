/*
 * @Description: 重置消息弹框重复问题
 * @Date: 2022-06-10 19:27:29
 * @Version: 0.1
 * @Autor: fulei
 * @LastEditors: fulei
 * @LastEditTime: 2022-06-10 22:22:23
 */

//resetMessage.js
/**重置message，防止重复点击重复弹出message弹框 */
import {
  Message
} from "element-ui"
let messageInstance = null
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message(options)
}
  ;["error", "success", "info", "warning"].forEach(type => {
    resetMessage[type] = options => {
      if (typeof options === "string") {
        options = {
          message: options
        }
      }
      options.type = type
      return resetMessage(options)
    }
  })
export const message = resetMessage