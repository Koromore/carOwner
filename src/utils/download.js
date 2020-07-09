// 下载
export function download(row) {
  if (row) {
    // console.log(row)
    let localPath = row.localPath
    let a = document.createElement('a')
    a.download = `${row.fileName}.${row.suffix}`
    a.setAttribute('href', '/ocarplay/' + localPath)
    a.click()
    // return (`${year}-${month}-${strDate}`)
  } else {
    return ('')
  }
}