export function timeformat(data, type) {
  if (data) {
    let date = ''
    if (typeof (data) == 'string') {
      date = new Date(data.replace(/-/g, '/'))
    } else {
      date = new Date(data)
    }
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (type.indexOf("MM") == 0) {
      if (month >= 1 && month <= 9) {
        month = "0" + month
      }
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    if (hours >= 0 && hours <= 9) {
      hours = '0' + hours
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = '0' + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = '0' + seconds
    }
    // yyyy/MM/dd/hh/mm/ss
    type = type.replace(/yyyy/g, year)
    type = type.replace(/MM/g, month)
    type = type.replace(/M/g, month)
    type = type.replace(/dd/g, strDate)
    type = type.replace(/hh/g, hours)
    type = type.replace(/mm/g, minutes)
    type = type.replace(/ss/g, seconds)
    // console.log()
    // type.replace(/需要替换的字符串/g,"新字符串")
    return (type)
  } else {
    return ('')
  }

}