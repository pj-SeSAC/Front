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
    let image_url = $("image_url").val();

    // 일기 객체 생성
    let diary = {
        "diary_id": 12345678, // 임시 일기 ID
        "user_id": userId,
        "content": content,
        "created_at": created_at,
        "summary": summary,
        "diary_date": diaryDate,
        "image_url" : image_url

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

// // 받아온 일기 데이터를 표시하는 함수
// function displayDiary(diaryData) {
//         document.querySelector('.text-box').innerText = diaryData.diary.content;
//        $(".image-container").append(`<img src=${'image_url.val()'} alt="Diary Entry">`);
// }
function displayDiary(diaryData) {
    // 텍스트 내용을 설정
    document.querySelector('.text-box').innerText = diaryData.diary.content;

    // 이미지 컨테이너 선택
    let imageContainer = document.querySelector('.image-container');
    
    // 기존에 이미지 태그가 있다면 제거
    imageContainer.innerHTML = '';

    // 새로운 이미지 태그 생성 및 설정
    let img = document.createElement('img');
    img.src = diaryData.diary.image_url; // diaryData 객체에서 이미지 URL 가져오기
    img.alt = 'Diary Entry';

    // 이미지 컨테이너에 이미지 태그 추가
    imageContainer.appendChild(img);
}