$(document).on('turbolinks:load', function() { 

  var index_list = $("#user-search-result");
  var add_list = $("#member-add-result");

  function appendProduct(user) {
    var html = 
                `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.user_name}</p>
                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</div>
                 </div>`
      index_list.append(html);                 
   }

   function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
      index_list.append(html);
  }

  function appendChatmenber(data1,data2) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${data1}'>
                  <p class='chat-group-user__name'>${data2}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
      add_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      index_list.empty();
      if (users.length !== 0) {
        if(input !== ""){
        users.forEach(function(user){
          appendProduct(user);
       });
      }
      }
      else {
        appendErrMsgToHTML("一致するユーザーがみつかりません。");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function() {
    $(this).parent().remove();
    var data1 = $(this).data('user-id');
    var data2 = $(this).data('user-name');
    appendChatmenber(data1,data2);
  })
  $(document).on("click",".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn",function() {
    $(this).parent().remove();
  })
});