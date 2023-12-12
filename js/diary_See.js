document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(window.location.search);
    var date = params.get('date'); // URL에서 'date' 파라미터 추출
    if (date) {
        document.querySelector('.date').innerText = date; // 날짜 표시
        fetchDiary(date); // 해당 날짜의 일기 데이터 가져오기
    }
});

// 서버로부터 해당 날짜의 일기 데이터를 가져오는 함수
function fetchDiary(date) {

    // 사용자의 입력과 현재 날짜를 변수로 받기
    let userId = 1; // 예시 사용자 ID
    let content = $(".diaryEntry").val(); // 사용자가 입력한 일기 내용
    let created_at = new Date(); // 현재 날짜 및 시간
    let summary = "일기 요약"; // 사용자가 입력한 일기 요약 또는 자동 생성된 요약
    let diaryDate =date; // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환

    // 일기 객체 생성
    let diary = {
        "diary_id": 12345678, // 임시 일기 ID
        "user_id": userId,
        "content": content,
        "created_at": created_at,
        "summary": summary,
        "diary_date": diaryDate
    };

    $.ajax({
        type: 'GET',
        url: `http://127.0.0.1:8000/diaries/${diaryDate}`, // 일기 데이터를 가져오는 API 엔드포인트
        dataType: 'json',
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            displayDiary(result);
        },
        error: function(result, status, error) {
            console.log(error);
        }
    });
}

// 받아온 일기 데이터를 표시하는 함수
function displayDiary(diaryData) {
    if (diaryData && diaryData.content) {
        document.querySelector('.text-box').innerText = diaryData.content;
    //    $(".image-container").append(diaryData.)
    } else {
        document.querySelector('.text-box').innerText = '일기 내용이 없습니다.';
    }
}