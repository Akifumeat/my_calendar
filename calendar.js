const weeks = ['日', '月', '火', '水', '木', '金', '土']
const time_to_date = 86400000       // 24[h]*60[min]*60[sec]*1000[milisec]
let calendarHtml = '' // HTMLを組み立てる変数

// // 講師のデータを保存する
// var teacher = {
//     is_open: true,          // 教室が休講か
//     is_attend: true,       // 出勤できるか
//     capacity: 2,            // あと何人配置できるか
//     student_name: [null, null],
//     student_id: [0, 0]

function init_teacher() {
    this.is_open = true;
    this.is_attend = false;
    this.capacity = 2;
    this.student_name = null;
    this.student_id = 0;
}

function display_teacher() {
    console.log("is_open: "+this.is_open+"\n"+
                "is_attend: "+this.is_attend+"\n"+
                "capacity: "+this.capacity+"\n"+
                "student_name: "+this.student_id+"\n"+
                "student_id: "+this.student_id+"\n")
}

function teacher_plan(is_open, is_attend, capacity, student_name, student_id, td) {
    this.is_open = is_open;             // 教室が休講か
    this.is_attend = is_attend;         // 出勤可能か
    this.capacity = capacity;           // 空き
    this.student_name = student_name;   // 生徒指名
    this.student_id = student_id;       // 生徒番号
    this.td = td;                       // カレンダー内容
    this.init_teacher = init_teacher;
    this.display_teacher = display_teacher;
}

// なんかうまくいかん
function make_dict(start, end, dict) {
    let day_iterator = new Date(start.getTime());
    while (day_iterator.getTime() != end.getTime()) {
        var teacher = new teacher_plan()
        teacher.init_teacher();
        var date = day_iterator.getTime();
        dict.date = teacher;
        day_iterator.setDate(day_iterator.getDate() + 1);
    }
    for (var key in dict) {
        let i=0
        console.log("key: "+key+(i++));
    }

}

// 日付の行はループで使うだけでいい
// コマの行はクラスからデータを持ってくるみたいなのにしたい
let tdd = $('<td>');
function make_calendar(start, end)
{
    let diff_start_and_end = (end-start)/ time_to_date +1;
    let day_iterator = new Date(start.getTime());

    let table = $('<table>');
    let tr = $('<tr>');
    tr.append($('<td>'));     // 一番左上のコマ数のところ
    for (let i=0; i<diff_start_and_end; i++) {
        let td = $('<td>').text((day_iterator.getMonth()+1)
                                +'/'+day_iterator.getDate()+'\n'+
                                '(' + weeks[day_iterator.getDay()]+')');
        tr.append(td.css({width: "80"}));
        day_iterator.setDate(day_iterator.getDate() + 1);
    }
    table.append(tr);
    for (let i=2; i<=8; i++) {
        tr = $('<tr>');
        tr.append($('<td>').text(i).css({height: "80"}).attr("rowspan", "2"));


        // コマの作成
        for (let j=0; j<diff_start_and_end; j++) {
            tr.append($('<td>').text("").css({"font-size": "9pt", "height": "40"}));
        }
        table.append(tr);
        tr = $('<tr>');
        for (let j=0; j<diff_start_and_end; j++) {
            tr.append($('<td>').text("").css({"font-size": "9pt", "height": "40"}));
        }
        table.append(tr);
    }

    $('#calendar').append(table);
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

    let dict = {};
    make_dict(startDate, endDate, dict);

    while (tmpDate_end < endDate) {
        make_calendar(tmpDate_start, tmpDate_end);
        tmpDate_start.setDate(tmpDate_start.getDate()+14);
        tmpDate_end.setDate(tmpDate_end.getDate()+14);
    }
    make_calendar(tmpDate_start, endDate);

    var shimizu = new teacher_plan();
    shimizu.init_teacher();
    shimizu.display_teacher();
    console.log(shimizu.is_attend);
    // $('#calendar').html(calendarHtml);
}

$(function(){show_calendar();});
