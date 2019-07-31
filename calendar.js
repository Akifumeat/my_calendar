const weeks = ['日', '月', '火', '水', '木', '金', '土']
const time_to_date = 86400000       // 24[h]*60[min]*60[sec]*1000[milisec]
let calendarHtml = '' // HTMLを組み立てる変数

function make_calendar(start, end)
{
    let diff_start_and_end = (end - start)/ time_to_date +1;  //差の日数
    let day_iterator = new Date(start.getTime());

    calendarHtml += '<table>';

    calendarHtml += '<tr>';
    calendarHtml += '<td></td>';
    for (let i=0; i<diff_start_and_end; i++) {
        calendarHtml += '<td width="80">' + (day_iterator.getMonth()+1) + '/' + day_iterator.getDate() +'\n'+ '('+ weeks[day_iterator.getDay()] + ')' + '</td>';
        day_iterator.setDate(day_iterator.getDate() + 1);
    }
    calendarHtml += '</tr>';

    for (let i=2; i<=8; i++) {
        calendarHtml += '<tr>';
            calendarHtml += '<td height="50" rowspan="2">' + i + '</td>';

            // 大量の空欄の作成
            for (let j=0; j<diff_start_and_end; j++) {
              calendarHtml += '<td></td>';
            }
        calendarHtml += '</tr>';

        calendarHtml += '<tr>';
            for (let j=0; j<diff_start_and_end; j++) {
              calendarHtml += '<td></td>';
            }
        calendarHtml += '</tr>';
    }

  calendarHtml += '</table>';
}

function show_calendar()
{
    let startDate = new Date(2019, 7-1, 14);
    let startDay = startDate.getDay();
    let endDate = new Date(2019, 8-1, 31);
    let endDay = endDate.getDay();
    let diff_start_and_end = (endDate - startDate)/ time_to_date +1;  //差の日数

    let tmpDate_start = new Date(2019, 7-1, 14);
    let tmpDate_end = new Date(2019, 7-1, 14);
    tmpDate_end.setDate(tmpDate_end.getDate()+13);

    while (tmpDate_end < endDate) {
        make_calendar(tmpDate_start, tmpDate_end);
        tmpDate_start.setDate(tmpDate_start.getDate()+14);
        tmpDate_end.setDate(tmpDate_end.getDate()+14);
    }
    make_calendar(tmpDate_start, endDate);

    document.querySelector('#calendar').innerHTML = calendarHtml;
}


show_calendar();
