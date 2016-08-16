$(function(){
  
  var menu_node = $('.menu-sheet');
  var _X = 0,
      _Y = 0,
      dX = 0,
      dY = 0;

  // 開關左側主選單
  $('.menu-on, .menu-off, .list-sheet-cover').click( toggleMenu );

  // 主選單按鈕動作
  $('.menu-term').click( clickMenu );

  // 點選進入文章預覽
  $('.ts-thumb, .ts-preview').click( onViewMode );

  // 離開文章預覽模式
  $('.off-view-mode').click( offViewMode );

  // view-sheet 右上更多功能小選單
  $('#more-action').click( toggleMoreAction );

  // 關閉更多功能小選單
  $('.view-sheet > .view-content').click( offMoreAction );

  // 觸控動作開始囉
  referMenuTouch();
  $(window).resize( referMenuTouch );



  function toggleMenu(){
    menu_node.toggleClass('off');
    $('.list-sheet-cover').toggleClass('cover-off');
  }

  function clickMenu(){
    toggleMenu();
    offViewMode();
  }

  function onViewMode(){
    $('#app-body').addClass('view-mode');
    $('.teaser').removeClass('on-view');
    $(this).parent().addClass('on-view');

    setTimeout(function(){
      $('#app-body').addClass('view-show');
    }, 500);
  }

  function offViewMode(){
    $('#app-body').removeClass('view-mode view-show');
    $('.teaser').removeClass('on-view');
  }

  function toggleMoreAction(){
    $('#more-action > ul').toggleClass('show');
  }

  function offMoreAction(e){
    $('#more-action > ul').removeClass('show');
  }

  function referMenuTouch() {
    menu_node.off('touchstart', touchStart);

    if ( $('.list-sheet').width() == $(window).width() ) {
      menu_node.on('touchstart', touchStart);
    }
  }

  function touchStart(e){
    // e.preventDefault();
    if (e.touches.length == 1) {
      menu_node.css({
        WebkitTransition : 'none',
        transition       : 'none'
      });
      setXY(e.targetTouches[0], false);

      menu_node.on('touchmove', touchMoving);
      $(document).on('touchend touchcancel', touchEnd);
    }
  }

  function touchMoving(e){
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
