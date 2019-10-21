$(document).on('turbolinks:load', function(){

  function buildHTML(message){

    image = (message.image.url) ? `<img src="${message.image.url}" class="lower-message__image">`: '';

  var html = `<div class="message" data-message-id="${message.id}"> 
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-meesage">
          <p class="lower-message__content">
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
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    $('.form__submit').removeAttr('data-disable-with')
  })

 //自動更新
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: "api/messages",//ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        type: 'get',      //ルーティングで設定した通りhttpメソッドをgetに指定
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
        
        //メッセージが入ったHTMLを取得
        insertHTML = buildHTML(message);

        //メッセージを追加
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
        });
    }
  };
  setInterval(reloadMessages, 5000);
});
