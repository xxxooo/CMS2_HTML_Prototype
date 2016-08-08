$(function(){

  var menu_node = $('#menu-sheet');
  var _X = 0,
      _Y = 0,
      dX = 0,
      dY = 0;

  $('#menu-on, #menu-off, #list-sheet-cover').click(function(){
    toggleMenu();
  });

  // 將來串接連結用
  $('.menu-term').click(function(){
    toggleMenu();
  });

  // menu_node.on('mousedown', touchStart);
  menu_node.on('touchstart', touchStart);


  function toggleMenu(){
    menu_node.toggleClass('off');
    $('#list-sheet-cover').toggleClass('cover-off');
  }

  function touchStart(e){
    // e.preventDefault();
    if (e.touches.length == 1) {
      menu_node.css({
        WebkitTransition : 'none',
        transition       : 'none'
      });
      // setXY(e, false);
      setXY(e.targetTouches[0], false);
      // menu_node.on('mousemove', touchMoving);
      // $(document).on('mouseup', touchEnd);
      menu_node.on('touchmove', touchMoving);
      $(document).on('touchend touchcancel', touchEnd);
    }
  }

  function touchMoving(e){
    // setXY(e, true);
    setXY(e.targetTouches[0], true);
    if (4*dX*dX > dY*dY) {
      e.preventDefault();
    }
    if (dX*dX > 4*dY*dY) {
      menu_node.css("left", function(){
        leftPos = $(this).offset().left + dX;
        return leftPos > 0 ? 0 : leftPos;
      });
    }
  }

  function touchEnd(){
    // menu_node.off('mousemove', touchMoving);
    // $(document).off('mouseup', touchEnd);
    menu_node.off('touchmove', touchMoving);
    $(document).off('touchend touchcancel', touchEnd);
    menu_node.removeAttr('style');

    if (dX < -11 && dX*dX > 4*dY*dY) {
      t = 4 / -dX;
      menu_node.css({
        WebkitTransition : 'all '+t+'s ease-out',
        transition       : 'all '+t+'s ease-out'
      });
      setTimeout(function(){
        menu_node.removeAttr('style');
      }, 1000*t);
      toggleMenu();
    }
    else if (-2.2 * menu_node.offset().left > menu_node.outerWidth()) {
      toggleMenu();
    }
  }

  function setXY (e , delta) {
		if (delta) {
			dX = e.pageX - _X;
			dY = e.pageY - _Y;
		} else {
      dX = 0;
      dY = 0;
    }
		_X = e.pageX;
		_Y = e.pageY;
	}

})
