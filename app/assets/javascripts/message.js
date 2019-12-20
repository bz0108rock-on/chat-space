$(function(){
  
  function buildHTML(message){
    image = (message.image) ? `<img class="message-text__image" src=${message.image}>` : "";

    var html = `<div class='message' data-message-id="${message.id}">
                  <div class='message__upper-info'>
                    <div class='message__upper-info__talker'>
                      ${message.user_name}
                    </div>
                    <div class='message__upper-info__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='message__lower-info'>
                    <p class='message__lower-info__text'>
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset()
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });

  var reloadMessages = function(){
    last_message_id = $('.message:last').attr('data-message-id');
    $.ajax({
      url: 'api/messages#index {:format=>"json"}',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(messages) {
      alert('自動更新に失敗しました');
      console.log('error');
    })
  }
  setInterval(reloadMessages, 3000);
});