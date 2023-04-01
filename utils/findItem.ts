export const findItem = (arr, id) => {
  let res = null
  const iterate = (arr, id) => {
    for (let item of arr) {
      if (item.id === id) {
        res = item
      } else {
        if (item.children.length > 0) {
          iterate(item.children, id)
        }
      }
    }
  }
  iterate(arr, id)
  return res
}