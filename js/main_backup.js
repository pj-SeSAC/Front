window.onload = function () { 
    // isExist();
    buildCalendar(); 
}    // 웹 페이지가 로드되면 buildCalendar 실행
// localStorage.setItem("temp", "temp");
console.log();


const set = new Set(); // 중복값 제거 -> 조회가 빠름
let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

//일기 데이터 유무 받는 함수
function isExist(){
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/diaries/', // 서버 주소가 필요함.
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            $.each(result, function (i, entry) {
                set.add(entry.date); // 서버로부터 받은 날짜를 set에 추가
            });
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
}

// 달력 생성: 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣습니다.
function buildCalendar() {
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) { //1215 이 아래부터 수정해보자
        let newDIV = document.createElement("p"); // 먼저 newDIV 생성
        let checkDate = nowMonth.getFullYear() + "-" + leftPad(nowMonth.getMonth() + 1) + "-" + leftPad(nowDay.getDate());

        if (set.has(checkDate)) {
            newDIV.classList.add("existDiary"); // 일기가 있는 경우 클래스 추가
        }
        // console.log(nowDay);
        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

        
        //해당 날짜에 일기가 있다면클래스 추가 -> 해당 클래스 css 먹이기

        // if(arr[nowDay-1] == 1) {
        //     //일기 있음-> newDIV 클레스 추가 (existDiary)
        // newDIV.classList.add("existDiary");
        // }
        // else{
        //     //일기 없음
        // }
        
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }
        // 날짜별 스타일 설정 및 클릭 이벤트 핸들러 추가
        if (nowDay < today) {
            newDIV.className = "pastDay";  // 지난 날짜 스타일
            newDIV.onclick = function () { choiceDate(this); } // 과거 날짜에도 클릭 이벤트 추가

        } else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";    // 오늘 날짜 스타일
            newDIV.onclick = function () { choiceDate(this); } // 오늘 날짜에 클릭 이벤트 추가
        }

        ///////////////////////////확인해야하는 부분//////////////////////////////////////////////
        // let check = document.getElementById("calYear").innerText + "-" +document.getElementById("calMonth").innerText + "-"+ nowDay.getDate();
        // let newDIV = document.createElement("p");
        // if(set.has(check)){
        //     document.querySelector('.pastDay').id = 'existDiary';
        // }
    }
}

// 날짜 선택
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }
    newDIV.classList.add("choiceDay");  // 선택된 날짜에 "choiceDay" class 추가
    // var dayStr = document.getElementById("calYear").innerText+ document.getElementById("calMonth").innerText+newDIV.innerText;
    // // console.log(dayStr)
    // window.location.href = `diary_See.html?${dayStr}`; // 이동 후 로컬스토리지에서 일기 테이터 꺼내서 바인딩
    var dayStr = document.getElementById("calYear").innerText + "-" +
                           document.getElementById("calMonth").innerText + "-" +
                           newDIV.innerText;

                           
    window.location.href = `diary_See.html?date=${dayStr}`; // 날짜를 쿼리 파라미터로 전달
    updateDateDisplay(newDIV.innerText); // 날짜 업데이트
}

//여기가 
// function updateDateDisplay(day) { //gpt에서 알려준 날짜 표시
//     let year = document.getElementById("calYear").innerText;
//     let month = document.getElementById("calMonth").innerText;
//     let formattedDate = `${year}년 ${month}월 ${day}일`;
//     document.querySelector(".date").innerText = formattedDate;
// }

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}

// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}


