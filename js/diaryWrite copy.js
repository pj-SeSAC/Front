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

async function write() {
    // 일기 데이터 준비
    // 사용자의 입력과 현재 날짜를 변수로 받기
    let userId = 12345678; // 예시 사용자 ID
    let content = $(".diaryEntry").val(); // 사용자가 입력한 일기 내용
    let created_at = new Date(); // 현재 날짜 및 시간
    // let summary = $(".diaryEntry").val(); // 사용자가 입력한 일기 요약 또는 자동 생성된 요약
    let diaryDate = formatDate(created_at); // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
    // let image_url = "default_value"; //임시설정
    let behavior_keyword = "default_value";
    let emotion_keyword = "default_value";
    // let diary_id = 12345678;

    
    

    let diary = {
        // 일기 데이터 세팅
        // "diary_id": diary_id, // 임시 일기 ID    
        "user_id": userId,
        "content": content,
        "created_at": created_at,
        // "summary": summary,
        "diary_date": diaryDate,
        // "image_url": image_url,
        "behavior_keyword": behavior_keyword,
        "emotion_keyword": emotion_keyword
    };

    try {
        // 일기 저장
        await sendDiary(diary);

        // 벡터 DB 저장 //잠시 비활성화
        // await sendVectorDB(diary);

        // // 요약 생성
        // await createSummary(diary);

        // // 행동 키워드 추출
        // await extractBehaviorKeyword(diary);

        // // 감정 키워드 추출
        // await extractEmotionKeyword(diary);

        // // 달리 이미지 추출
        // await extractDalle(diary);

        // 성공 시 처리 (예: 메인 페이지로 리디렉션)
        // window.location.href = "main.html";
    } catch (error) {
        // 오류 시 처리 (예: 오류 메시지 표시)
        console.error("An error occurred:", error);
    }
    try {
        // 일기 저장
        // await sendDiary(diary);

        // 벡터 DB 저장 //잠시 비활성화
        // await sendVectorDB(diary);

        // 요약 생성
        await createSummary(diary);

        // 행동 키워드 추출
        await extractBehaviorKeyword(diary);

        // 감정 키워드 추출
        await extractEmotionKeyword(diary);
            
        // 달리 이미지 추출
        // await extractDalle(diary);

        // 성공 시 처리 (예: 메인 페이지로 리디렉션)
        //window.location.href = "main.html";
    } catch (error) {
        // 오류 시 처리 (예: 오류 메시지 표시)
        console.error("An error occurred:", error);
    }
}


// AJAX 요청을 위한 각 기능별 함수
function sendDiary(diary) {
    return $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/diaries/', // 서버 주소
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            localStorage.removeItem('tempDiary');
            window.location.href="main.html";
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
}

function sendVectorDB(diary) {
    return $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/vectorDB/', // 서버 주소
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            localStorage.removeItem('tempDiary');
            window.location.href="main.html";
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
    // Vector DB 저장을 위한 AJAX 요청 구현
}

function createSummary(diary) {
    return $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/diaries/summary/12345678', // 서버 주소
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            localStorage.removeItem('tempDiary');
            window.location.href="main.html";
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
    // 요약 생성을 위한 AJAX 요청 구현
}

function extractBehaviorKeyword(diary) {
    return $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/diaries/behavior_keyword/', // 서버 주소
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            localStorage.removeItem('tempDiary');
            window.location.href="main.html";
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
    // 행동 키워드 추출을 위한 AJAX 요청 구현
}

function extractEmotionKeyword(diary) {
    return $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/diaries/emotion_keyword', // 서버 주소
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(diary),
        success: function (result) {
            // 성공 시 처리
            console.log(result);
            localStorage.removeItem('tempDiary');
            window.location.href="main.html";
        },
        error: function (result, status, error) {
            // 오류 시 처리
            console.log(error);
        }
    });
    // 감정 키워드 추출을 위한 AJAX 요청 구현
}

// function extractDalle(diary) {
//     return $.ajax({
//         type: 'POST',
//         url: 'http://127.0.0.1:8000/dalle-image/12345678', // 서버 주소
//         dataType: 'json',
//         contentType: 'application/json',
//         data: JSON.stringify(diary),
        
//         success: function (result) {
//             console.log(data)
//             // 성공 시 처리
//             console.log(result);
//             localStorage.removeItem('tempDiary');
//             // window.location.href="main.html";
//         },
//         error: function (result, status, error) {
//             // 오류 시 처리
//             console.log(error);
//         }
//     });
//     // 감정 키워드 추출을 위한 AJAX 요청 구현
// }


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