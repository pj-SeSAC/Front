// 작성 버튼 눌렀을 떄
$('.ButtonSend').click(ChatSend);

function ChatSend() {
    let chatbotSub = {
        "message": $('.ChatInput').val()
    };
    if (chatbotSub.message) {
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/submit',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(chatbotSub),
            success: function (result) {
                console.log(result)
                $('.chat-container').append('<div class="message-given">' + chatbotSub.message + '</div>');
                $('.chat-container').append('<div class="message-received">' + result.response + '</div>');
                $('.ChatInput').val('');
            },
            error: function (xhr, status, error) {
                console.error("Error: " + error);
                console.error("Status: " + status);
                console.error("Response: " + xhr.responseText);
            }
        });
    }
};

