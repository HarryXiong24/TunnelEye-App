export default function (type: string) {
  // 获取时间
  let now = new Date()
  // 获取个数据
  let hour  = now.getHours()       // 0~23
  let minute = now.getMinutes()    // 0~59
  let second = now.getSeconds()    // 0~59
  let year = now.getFullYear()     
  let month = now.getMonth() + 1   // 0~11
  let day = now.getDate()          // 1~31
  let week = now.getDay()          // 0~6 周日~周六

  let weekName = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
  
  // 24小时制
  let time = '' + hour
  time  = time + (minute < 10 ? ':0' : ":") + minute
  time  = time + (second < 10 ? ':0' : ":") + second


  let date = `${year}.${month}.${day}`
  let today = `${weekName[week]}`
  time = `${time}`
  let all = `${year}.${month}.${day} ${weekName[week]} ${time}`
  
  if (type === 'date') {
    return date
  } else if (type === 'day') {
    return today
  } else if (type === 'time') {
    return time
  } else if (type === 'all') {
    return all
  } else {
    return all
  }
}