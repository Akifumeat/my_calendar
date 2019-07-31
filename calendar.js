const weeks = ['日', '月', '火', '水', '木', '金', '土']
const time_to_date = 86400000       // 24[h]*60[min]*60[sec]*1000[milisec]
let calendarHtml = '' // HTMLを組み立てる変数

function make_calendar(start, end)
{
  let diff_start_and_end = (end - start)/ time_to_date +1;  //差の日数
  let day_iterator = start;

  calendarHtml += '<table>'

  calendarHtml += '<tr>'
  calendarHtml += '<td></td>'
  for (let i=0; i<diff_start_and_end; i++) {
      calendarHtml += '<td>' + (day_iterator.getMonth()+1) + '/' + day_iterator.getDate() +'\n'+ '('+ weeks[day_iterator.getDay()] + ')' + '</td>'
      day_iterator.setDate(day_iterator.getDate() + 1)
  }
  calendarHtml += '</tr>'

  for (let i=2; i<=8; i++) {
    calendarHtml += '<tr>'
    calendarHtml += '<td>' + i + '</td>'
    for (let j=0; j<diff_start_and_end; j++) {
      calendarHtml += '<td></td>'
    }
    calendarHtml += '</tr>'
  }

  calendarHtml += '</table>'
}

let startDate = new Date(2019, 7-1, 14);
let startDay = startDate.getDay();
let endDate = new Date(2019, 8-1, 31);
let endDay = endDate.getDay();
let diff_start_and_end = (endDate - startDate)/ time_to_date +1;  //差の日数

let meanDate = new Date(2019, 7-1, 14);
meanDate.setDate(meanDate.getDate()+diff_start_and_end/2);

make_calendar(startDate, meanDate);
make_calendar(meanDate, endDate);

//calendarHtml += '<h1>' + year  + '/' + month + '</h1>'



document.querySelector('#calendar').innerHTML = calendarHtml
