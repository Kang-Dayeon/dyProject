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
  $('.top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });

  $('#mouseStart').mousemove(function (e) {
    $('.cursor').css('top', e.clientY);
    $('.cursor').css('left', e.clientX);
  });

  $('#mouseStart').click(function (e) {
    gsap.fromTo('.circle-click', 3, {
      rotation: 0,
      x: e.clientX,
      y: e.clientY,
      width: 10,
      height: 10,
      borderRadius: 0,
      ease: Back.easeOut.config(1),
    },
      {
        rotation: 360,
        x: e.clientX,
        y: e.clientY,
        width: 400,
        height: 400,
        ease: Back.easeOut.config(1),
        borderRadius: 50,
      });
  });
});
