export const findItem = (arr:any[], id:string):any => {
  let res = null
  const iterate = (arr:any[], id:string) => {
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