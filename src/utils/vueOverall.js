module.exports = {
  filters: {
    date: function (value) {
      if (value) {
        let date = ''
        if (typeof data == 'string') {
          date = new Date(value.replace(/-/g, '/'))
        } else {
          date = new Date(value)
        }
        // let date = new Date(data.replace(/-/g,'/'))
        let year = date.getYear()
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        year = year - 100
        if (year >= 1 && year <= 9) {
          year = '0' + year
        }
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        return `${year}-${month}-${strDate}`
      } else {
        return ''
      }
    }
  }
}
