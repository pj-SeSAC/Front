// JavaScript: 클릭된 폴더의 날짜를 저장하고 analysis.html로 이동
function openAnalysis(date) {
    localStorage.setItem('selectedDate', date);
    window.location.href = 'analysis.html';
}

document.addEventListener('DOMContentLoaded', function () {
    var tabButtons = document.querySelectorAll('.nav .nav-link');
    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var newImage = this.getAttribute('data-image');
            var imgElement = document.getElementById('tabImage');
            if (imgElement && newImage) {
                imgElement.src = newImage;
            }
        });
    });
});


// 해당 폴더(2023년) 누르면 해당 폴더가 header-space에 나오게하면 되겠다



// function updateDateDisplay(day) { //gpt에서 알려준 날짜 표시
//     let year = document.getElementById("calYear").innerText;
//     let month = document.getElementById("calMonth").innerText;
//     let formattedDate = `${year}년 ${month}월 ${day}일`;
//     document.querySelector(".date").innerText = formattedDate;
// }

// 날짜 형식을 'YYYY-MM-DD'로 변환하는 함수
// function formatDate(date) {
//     let year = date.getFullYear();
//     let month = String(date.getMonth() + 1).padStart(2, '0');
//     let day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }


// function appendDiaryContent(result) {
//     let str = `
//         <div class="header-space">
//             <div class="header-content">
//                 <span class="date">${formatDate(new Date(result.created_at))}</span>
//             </div>
//         </div>
//     `;
//     // 결과를 적절한 요소에 추가 (예: '#diary-container' 요소에 추가)
//     $('#diary-container').append(str);
// }
