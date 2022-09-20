

//input event 
function inputValue(input, message, user) {
  input.keydown(e => {
    if (e.keyCode == 13) {
      let inputValue = input.val();
      user.text(inputValue);
      input.removeClass('active');
      message.addClass('active');
    }
  });
};
// top scroll
function topScolling(topBtn) {
  topBtn.click(() => {
    $('html,body').animate({ scrollTop: 0 }, 500);
  });
};
// mouse event
function mouseMoving(el) {
  el.mousemove(e => {
    $('.cursor').css('top', e.clientY + 100);
    $('.cursor').css('left', e.clientX);
  });
};
// TweenMax
function circleAnimation(el, circle) {
  el.click(e => {
    let tl = new TimelineLite;
    tl.to(circle, 1.5, {
      rotation: 180,
      x: e.clientX,
      y: e.clientY + 100,
      width: 50,
      height: 50,
      ease: Back.easeOut.config(1)
    }).to(circle, 2, {
      rotation: 360,
      width: 300,
      height: 300,
      ease: Back.easeOut.config(1.7),
    });
  });
};


$(document).ready(function () {
  // aos적용
  AOS.init();
  // event function
  inputValue($('.name-input'), $('.message'), $('.user-name'));
  topScolling($('.top'));
  mouseMoving($('#mouseStart'));
  circleAnimation($('#mouseStart'), '.circle-click')
});

