// 작성 버튼 눌렀을 떄
$('.ButtonSend').click(ChatSend);

$('.ChatInput').keypress(function(e) {
    if (e.which == 13) {
        ChatSend();
        e.preventDefault();
    }
});

function ChatSend() {
    let chatbotSub = {
        "message": $('.ChatInput').val()
    };
    if (chatbotSub.message.trim() !== '') { // 메시지가 비어있지 않은 경우에만 처리
        $('.chat-container').append('<div class="message-given">' + chatbotSub.message + '</div>');
        $('.ChatInput').val('');
        scrollToBottom();
    }

    function scrollToBottom() {
    var chatContainer = $('.chat-container');
    chatContainer.scrollTop(chatContainer.prop("scrollHeight"));
}

    if (chatbotSub.message) {
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/submit',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(chatbotSub),
            success: function (result) {
                console.log(chatbotSub.message)
                console.log(result)
                $('.chat-container').append('<div class="message-received">' + result.response + '</div>');
                scrollToBottom();
            },
            error: function (xhr, status, error) {
                console.error("Error: " + error);
                console.error("Status: " + status);
                console.error("Response: " + xhr.responseText);
            }
        });
    }

};

$(document).ready(function() {
    // chat-container에 이벤트 위임을 설정합니다.
    $('.chat-container').on('click', '.choice-box', function() {
        let buttonText = $(this).text();
        let responseText = "";

        if (buttonText === "ABOUT ME") {
            responseText = "여기에 'ABOUT ME'에 대한 응답 텍스트를 입력하세요.";
        } else if (buttonText === "HOW TO") {
            responseText = "여기에 'HOW TO'에 대한 응답 텍스트를 입력하세요.";
        } else if (buttonText === "REMEMBER") {
            responseText = "여기에 'REMEMBER'에 대한 응답 텍스트를 입력하세요.";
        }

        // 응답과 추가 메시지를 추가합니다.
        $('.chat-container').append('<div class="message-received">' + responseText + '</div>');
        $('.chat-container').append('<div class="message-received">궁금하신 사항이 있으면 말해주세요.</div>');
        

        displayChoiceButtons();

        scrollToBottom();
        // 버튼을 다시 표시합니다.
        
        
        
    });
});

function displayChoiceButtons() {
    let choiceButtonsHtml = '<div class="choice-message">' +
                                '<div class="choice-box">ABOUT ME</div>' +
                                '<div class="choice-box">HOW TO</div>' +
                                '<div class="choice-box">REMEMBER</div>' +
                            '</div><br>';
    $('.chat-container').append(choiceButtonsHtml);
}

function scrollToBottom() {
    var chatContainer = $('.chat-container');
    chatContainer.scrollTop(chatContainer.prop("scrollHeight"));
}

// // 채팅창 form(박스), submit 이벤트 감지를 위해 변수 선언
// let chatForm = document.querySelector('.chatbot');

// // 준비 함수, 약간의 시간을 두어 scroll 함수를 호출하기
// function prepareScroll() {
//   window.setTimeout(scrollUl, 50);
// }

// // scroll 함수
// function scrollUl() {
//   // 채팅창 form 안의 ul 요소, (ul 요소 안에 채팅 내용들이 li 요소로 입력된다.)
//   let chatUl = document.querySelector('.chat_ul');
//   chatUl.scrollTop = chatUl.scrollHeight; // 스크롤의 위치를 최하단으로
// }

// // submit 이벤트 감지
// chatForm.addEventListener('submit', prepareScroll);
