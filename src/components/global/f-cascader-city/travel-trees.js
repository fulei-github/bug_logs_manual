/**
 * 遍历深林(广度优先)
 * @param {*} trees
 * @param {*} callback
 */
export function travelTrees(trees, callback) {
  // 浅拷贝
  const queue = trees.slice(0)
  // console.log("queue", queue)

  for (let i = 0; i < queue.length; i++) {
    const node = queue[i]
    callback(node)

    if (node.children && node.children.length) {
      queue.push(...node.children)
    }
  }
}
