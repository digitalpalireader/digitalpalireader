var startX = null;
var startY = null;
var minSwipeX = 40; //swipe must have 40px min over X
var swipeRatioThreshold = 2; //movement on X should be at least 2 times on Y

  // Add Touch Listener
  document.addEventListener('touchstart', touchStart, true);
  document.addEventListener('touchend', touchEnd, true);



  function touchStart(event){
    if(event.touches.length === 1){
       //just one finger touched
       startX = event.touches.item(0).clientX;
       startY = event.touches.item(0).clientY;
     }else{
       //a second finger hit the screen, abort the touch
       startX = null;
       startY = null;
    }
  }

  function touchEnd(event){
    if(startX || startY){
      //the only finger that hit the screen left it
      var endX = event.changedTouches.item(0).clientX;
      var endY = event.changedTouches.item(0).clientY;

      let swipeXDiff = endX - startX;
      let swipeYDiff = endY - startY;
      let horizontalToVerticalRatio = Math.abs(swipeXDiff/swipeYDiff);
      if (horizontalToVerticalRatio > swipeRatioThreshold) {
        if(endX > startX + minSwipeX){
          //right -> left swipe
          event.gesture = 'swipe_left';
         }
         if(endX < startX - minSwipeX ){
          //left -> right swipe
          event.gesture = 'swipe_right';
         }
         //reset
         DPR_gesture(event);
         startX = null;
         startY = null;
      }
    }
  }

  function DPR_gesture(e) {

    const cmd = Object.entries(__dprViewModel.commands).find(([_, x]) => x().matchGesture(e));
    if (cmd && !cmd[1]().notImplemented && cmd[1]().canExecute && cmd[1]().visible) {
      cmd[1]().execute(e);
      event.preventDefault();
      return;
    }
  }

