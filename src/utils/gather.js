// 修改时间格式
export function intersection(arr1, arr2, key) {
  // let arr1 = []
  // let arr2 = []
  // 交集
  let intersection = []
  for (let i = 0, len = arr1.length; i < len; i++) {
    for (let j = 0, length = arr2.length; j < length; j++) {
      if (arr1[i][key] === arr2[j][key]) {
        intersection.push(arr1[i])
      }
    }
  }
  // console.log('交集', intersection)
  return (intersection)
}

export function union(arr1, arr2, key) {
  let union = [...arr1, ...arr2]
  for (let i = 0, len = arr1.length; i < len; i++) {
    for (let j = 0, length = arr2.length; j < length; j++) {
      if (arr1[i][key] === arr2[j][key]) {
        union.splice(union.findIndex(item => item[key] === arr1[i][key]), 1)
      }
    }
  }
  // console.log('并集', union)
  return (union)
}

export function complement(arr1, arr2, key) {
  // 补集
  let complement = [...arr1, ...arr2]
  for (let i = 0, len = arr1.length; i < len; i++) {
    for (let j = 0, length = arr2.length; j < length; j++) {
      if (arr1[i][key] === arr2[j][key]) {
        complement.splice(complement.findIndex(item => item[key] === arr1[i][key]), 1)
        complement.splice(complement.findIndex(item => item[key] === arr2[j][key]), 1)
      }
    }
  }
  // console.log('补集', complement)
  return (complement)
}

export function diff(arr1, arr2, key) {
  // 差集
  let diff = [...arr1]
  for (let i = 0, len = arr1.length; i < len; i++) {
    let flag = false
    for (let j = 0, length = arr2.length; j < length; j++) {
      if (arr1[i][key] === arr2[j][key]) {
        flag = true
      }
    }
    if (flag) {
      diff.splice(diff.findIndex(item => item[key] === arr1[i][key]), 1)
    }
  }
  // console.log('差集', diff)
  return (diff)
}
