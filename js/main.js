$(document).ready(function () {
  // aos적용
  AOS.init();
  //input event 
  $('.name-input').keydown(function (e) {
    const input = $('.name-input');
    const messageBox = $('.message');
    const userName = $('.user-name');
    if (e.keyCode == 13) {
      let inputValue = input.val();
      userName.text(inputValue);
      input.removeClass('active');
      messageBox.addClass('active');
    }
  });
  // top button
  $('.top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });
  // mouse event
  $('#mouseStart').mousemove(function (e) {
    $('.cursor').css('top', e.clientY);
    $('.cursor').css('left', e.clientX);
  });
  // TweenMax
  $('#mouseStart').click(function (e) {
    let tl = new TimelineLite;
    tl.to('.circle-click', 1.5, {
      rotation: 180,
      x: e.clientX,
      y: e.clientY,
      width: 50,
      height: 50,
      ease: Back.easeOut.config(1)
    }).to('.circle-click', 2, {
      rotation: 360,
      width: 400,
      height: 400,
      ease: Back.easeOut.config(1.7),
    });
  });
});
