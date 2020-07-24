// 时间段转化
export function duration(data) {
  if (data) {
    data = data*1
    let returnDate = ''
    if (data<30) {
      returnDate = (data*1).toFixed(1)+'天'
    }else if (data>=30&&data<360) {
      returnDate = (data/30).toFixed(1)+'月'
    }else if (data>=360) {
      returnDate = (data/360).toFixed(1)+'年'
    }
    return (returnDate)
  } else {
    return ('')
  }
}
