'use strict'

const DPR_Swipe_Gesture = (function () {

  var startX = null;
  var startY = null;
  var minSwipeX = 40; //swipe must have 40px min on the X axis
  var swipeRatioThreshold = 1.2; //movement on X should be at least this times more than on Y

  window.DPR_Mediator.on(
    'DPR_Swipe_Gesture:touchstart', 
    (sectionElementId) => {
      document
        .getElementById(sectionElementId)
        .addEventListener('touchstart', DPR_Gesture.touchStart, true)
    },
  )

    window.DPR_Mediator.on(
      'DPR_Swipe_Gesture:touchend', 
      (sectionElementId, sectionPosition) => {
        document
          .getElementById(sectionElementId)
          .addEventListener('touchend', DPR_Gesture.touchEndFactory(sectionPosition), true)
      },
    )
  
    const touchStart = function (event) {
    if (event.touches.length === 1) {
      //just one finger touched
      startX = event.touches.item(0).clientX;
      startY = event.touches.item(0).clientY;
    } else {
      //a second finger hit the screen, abort the touch
      startX = null;
      startY = null;
    }
  }

  const touchEndFactory = function (sectionPosition) {
    return function touchEnd(event) {
      if (startX || startY) {
        //the only finger that hit the screen left it
        var endX = event.changedTouches.item(0).clientX;
        var endY = event.changedTouches.item(0).clientY;

        let swipeXDiff = endX - startX;
        let swipeYDiff = endY - startY;
        let horizontalToVerticalRatio = Math.abs(swipeXDiff / swipeYDiff);
        if (horizontalToVerticalRatio > swipeRatioThreshold) {
          if (endX > startX + minSwipeX) {
            //left -> right swipe
            event.dpr_gesture = 'swipe_right';
          }
          if (endX < startX - minSwipeX) {
            //right -> left swipe
            event.dpr_gesture = 'swipe_left';
          }
          processGesture(event, sectionPosition);
          //reset
          startX = null;
          startY = null;
        }
      }
    }
  }

  function processGesture(e, sectionPosition) {

    if (!sectionPosition) {
      // In the primary pane or global
      runMatchingCommand(e);
    } else {
      // In a secondary pane
      switch (e.dpr_gesture) {
        case 'swipe_left':
          DPR_Chrome.goNextInSecondaryPane(sectionPosition);
          break;
        case 'swipe_right':
          DPR_Chrome.goPreviousInSecondaryPane(sectionPosition);
          break;
      }
    }
  }

  function runMatchingCommand(e) {
    const cmd = Object.entries(window.DPR_Globals.DprViewModel.commands).find(([_, x]) => x().matchGesture(e));
    if (cmd && !cmd[1]().notImplemented && cmd[1]().canExecute && cmd[1]().visible) {
      cmd[1]().execute(e);
      event.preventDefault();
      return;
    }
  }

  return {
    touchStart,
    touchEndFactory,
  };

})();

window.DPR_Gesture = DPR_Swipe_Gesture
