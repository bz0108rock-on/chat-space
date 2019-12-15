$(function(){
  function buildHTML(message){
    image = (message.image) ? `<img class="message-text__image" src=${message.image}>` : "";

    var html = `<div class='message'>
                  <div class='message__upper-info'>
                    <div class='message__upper-info__talker'>
                      ${message.name}
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
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset()
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
  })
});