$(document).ready(function () {
  // aos적용
  AOS.init();

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

  $(window).scroll(function () {
    let scrollTop = $(document).scrollTop();
    let start = $('#section-bg').offset().top;
    if (scrollTop == start) {
      $('#section-bg').css('background-color', '#00acc1')
    } else if (scrollTop < start) {
      $('#section-bg').css('background-color', '#fff')
    }
  });
});