// JavaScript: 클릭된 폴더의 날짜를 저장하고 analysis.html로 이동
function openAnalysis(date) {
    localStorage.setItem('selectedDate', date);
    window.location.href = 'analysis.html';
}

// AWS 설정 로드 함수
async function loadAwsConfig() {
    const response = await fetch('/data/cloud8-user2_accessKeys.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const values = lines[1].split(',');

    const config = {};
    headers.forEach((header, index) => {
        config[header.trim()] = values[index].trim();
    });

    return {
        bucketName: config['AWS_S3_BUCKET'],
        region: config['AWS_REGION']
    };
}

// 날짜 문자열을 'YYYY', 'YYYY_MM', 'YYYY_MM_W' 형식으로 변환하는 함수
function formatDateString(dateString) {
    // 년, 월, 주 단위로 분할
    const parts = dateString.split(/\s+/); // 공백을 기준으로 문자열 분할
    let formattedDate = '';

    // '년'으로 끝나는 부분 처리
    if (parts[0].endsWith('년')) {
        formattedDate = parts[0].replace('년', ''); // '년' 제거

        // '월'이 있는 경우 처리
        if (parts.length > 1 && parts[1].endsWith('월')) {
            formattedDate += '_' + parts[1].replace('월', '').padStart(2, '0'); // '월' 제거 및 2자리로 패딩

            // '주'가 있는 경우 처리
            if (parts.length > 2 && parts[2].includes('주')) {
                formattedDate += '_' + parts[2].replace(/주/, ''); // '주' 제거
            }
        }
    }

    return formattedDate;
}

document.addEventListener('DOMContentLoaded', async function () {
    const awsConfig = await loadAwsConfig(); // AWS 설정 로드
    const date = localStorage.getItem('selectedDate'); // 로컬 스토리지에서 날짜 가져오기
    const formattedDate = formatDateString(date); // 날짜 형식 변환
    var selectedTab = localStorage.getItem('selectedTab');
            if (selectedTab) {
                var tab = document.querySelector(`#${selectedTab}-tab`);
                if (tab) {
                    tab.click(); // 해당 탭 클릭 시뮬레이션
                }
            }

    // 초기 이미지 설정 (기본 감정 분석 이미지)
    const imageUrl = generateS3ImageUrl(awsConfig.bucketName, awsConfig.region, 'PC', formattedDate);
    var imgElement = document.querySelector('.image-container img');
            if (imgElement) {
                imgElement.src = imageUrl; // 이미지 소스 업데이트

    var tabButtons = document.querySelectorAll('.nav-item .nav-link');
    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', async function() { 

            var date = localStorage.getItem('selectedDate'); // 로컬 스토리지에서 날짜 가져오기
            var formattedDate = formatDateString(date); // 날짜 형식 변환
            var analysisType = this.getAttribute('data-type'); // 버튼의 data-type 속성 값
            console.log("버튼의 data-type 속성 값");
            if (analysisType === 'emotion') {
                imagePrefix = 'PC';
                var imageUrl = generateS3ImageUrl(awsConfig.bucketName, awsConfig.region, imagePrefix, formattedDate); // S3 이미지 URL 생성
                var imgElement = document.querySelector('#year-tab-pane > div.image-container > img');
                if (imgElement) {
                    imgElement.src = imageUrl; // 이미지 소스 업데이트
                }
            } else if (analysisType === 'behavior') {
                imagePrefix = 'BC';
                var imageUrl = generateS3ImageUrl(awsConfig.bucketName, awsConfig.region, imagePrefix, formattedDate); // S3 이미지 URL 생성
                var imgElement = document.querySelector('#month-tab-pane > div.image-container > img');
                if (imgElement) {
                    imgElement.src = imageUrl; // 이미지 소스 업데이트
                }
            }

            // var imagePrefix = analysisType === 'emotion' ? 'PC' : 'BC'; // 이미지 접두사 결정
            // console.log("BC PC 결정")
            // var imageUrl = generateS3ImageUrl(awsConfig.bucketName, awsConfig.region, imagePrefix, formattedDate); // S3 이미지 URL 생성
            // console.log("url 가져오기")
            // var imgElement = document.querySelector('.image-container img');
            // console.log("imgElement에 할당 ")
            // if (imgElement) {
            //     imgElement.src = imageUrl; // 이미지 소스 업데이트
            // }
            // console.log("이미지 띄우기")
        });
    });
}});



function generateS3ImageUrl(bucketName, region, prefix, dateString) {
    return `https://${bucketName}.s3.${region}.amazonaws.com/s3_analysis/${prefix}${dateString}.png`;
}




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
