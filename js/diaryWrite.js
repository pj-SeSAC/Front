
// 작성 버튼 눌렀을 떄
$('#final-save').click(write);

function write() {
    //백에서 필요한 객체 (파라미터들)
    let diary = {
        "diary_id":1,
        "user_id":1,
        "content": $(".diaryEntry").val(),   //바뀔 수 있는 부분
        "created_at":new Date(),
        "summary":"test",
        "diary_date":"20230109"
    };
   console.log($(".diaryEntry").val());
    //전송
    $.ajax({
        type: 'POST',       //바뀔 수 있는 부분
        url: `http://127.0.0.1:8000/diaries/`, // 백주소//바뀔 수 있는 부분
        dataType: 'json', // 프론트가 받을 데이터 형식
        contentType: 'application/json', // 백으로 보낼 데이터 형식
        data: JSON.stringify(diary), //백으로 보낼 데이터
        success: function (result) {
            console.log(result)
            result.diary_id
            // localStorage.setItem("diary-info", JSON.stringify(result));
            // window.location.href('')
            var str =""
            str += `<div class="header-space">
            <div class="header-content">
              <span class="date">${result.datetoem}</span>
            </div>
  
          </div>
        </div>
  
        <div class="image-container">
          <img src="../png/diary_ex.jpeg" alt="Diary Entry">
        </div>
  
        <div class="text-container">
          <div class="text-box">
            두근두근 하루일을 잊고, 하루하루를 보내고 있어요...
          </div>
        </div>
      </div>`

            $("#").append()

        },
        error: function (result, status, error) {
            console.log(error)
        }
    })
}