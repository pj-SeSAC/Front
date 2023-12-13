window.onload = function(){
    if(  localStorage.getItem('tempDiary')){
        console.log("있음");
        $(".diaryEntry").append(localStorage.getItem('tempDiary'));
    }else{
        console.log("없음");
    }
}
// 작성 버튼 눌렀을 때
$('#final-save-check').click(write);
$('#temporary-save').click(saveTemp);
function saveTemp(){
    localStorage.setItem('tempDiary', $('.diaryEntry').val());
}
function write() {
    // 사용자의 입력과 현재 날짜를 변수로 받기
    let userId = 1; // 예시 사용자 ID
    let content = $(".diaryEntry").val(); // 사용자가 입력한 일기 내용
    let created_at = new Date(); // 현재 날짜 및 시간
    let summary = "일기 요약"; // 사용자가 입력한 일기 요약 또는 자동 생성된 요약
    let diaryDate = formatDate(created_at); // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환

    // 일기 객체 생성
    let diary = {
        "diary_id": 12345678, // 임시 일기 ID
        "user_id": userId,
        "content": content,
        "created_at": created_at,
        "summary": summary,
        "diary_date": diaryDate
    };

    // 전송
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/diaries/', // 서버 주소
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            localStorage.removeItem('tempDiary');
            appendDiaryContent(result);
            window.location.href="main.html";
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
}

// 날짜 형식을 'YYYY-MM-DD'로 변환하는 함수
function formatDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

//
// document.addEventListener('DOMContentLoaded', function() {
//     var finalSaveCheck = document.getElementById("final-save-check");
//     if (finalSaveCheck) {
//         finalSaveCheck.onclick = function () {
//             location.href = "main.html"; 
//         };
//     }
// });

// document.getElementById("final-save-check").onclick = function () {
//     location.href = "main.html"; 
// };

// var chatContainer = document.querySelector('.diaryEntry');
// chatContainer.scrollTop = chatContainer.scrollHeight;


// 아래 코드를 챗봇 스크롤이 되게끔 이식해보기
var chatContainer = document.querySelector('.diaryEntry');
if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}