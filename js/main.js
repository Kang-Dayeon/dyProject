const input = $('.name-input');
const messageBox = $('.message');
const userName = $('.user-name');

$('.name-input').keydown(function (e) {
  if (e.keyCode == 13) {
    let inputValue = input.val();
    userName.text(inputValue);
    input.removeClass('active');
    messageBox.addClass('active');
  }
});