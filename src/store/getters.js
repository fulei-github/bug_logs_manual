/*
 * @Description: getters
 * @Autor: fulei
 * @Date: 2022-06-16 11:36:58
 * @LastEditors: fulei
 * @LastEditTime: 2022-07-13 23:01:30
 */
const getters = {
  user: (state) => state.user.user,
  token: state => state.user.token
}
export default getters
