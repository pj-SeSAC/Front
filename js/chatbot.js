// 작성 버튼 눌렀을 떄
$('.ButtonSend').click(ChatSend);

function ChatSend() {
    let chatbotSub = {
        "message": $('.ChatInput').val()
    };
    $('.chat-container').append('<div class="message-given">' + chatbotSub.message + '</div>');
    $('.ChatInput').val('');

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
