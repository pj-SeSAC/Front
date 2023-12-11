// const { pic, content, date } = JSON.parse(localStorage.getItem("diary-info"));
// localStorage.remove("user-info");
//페이지 로드 되자마자 데이터 가져오는 걸로 해결

dayStr = location.href.split('?')[1];
window.onload($.ajax({
    type: 'GET',
    url: `http://localhost:8080/articles/${dayStr}`,
    dataType: 'json',
    contentType: 'application/json',
    success: function (result) {
      console.log(result)
      $(".date").append(result.date);
    },
    error: function (result, status, error) {
      console.log(error)
    }
}))

var str = '';
str += `<div class="frame-a">
<!-- 버튼 -->
<img src="png/x.png" alt="Close">

<!-- 빈 공간 -->
<div class="empty-space">
  <div class="text-content">
    <span class="date">${date}</span>
  </div>       

</div>
</div>
<div class="image-container">
<img src="${pic}" alt="Diary Entry"> 
</div>

<div class="text-container">
<div class="text-box">
  ${content}
</div>
</div>`

$("#diary-content").append(str);


