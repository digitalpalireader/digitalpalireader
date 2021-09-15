'use strict'

const DPR_Swipe_Gesture = (function () {

  let startX = null;
  let startY = null;
  let startTime = null;
  //swipe must have 40px min on the X axis
  const minSwipeX = 40;
  //movement on X should be at least this times more than on Y
  const swipeRatioThreshold = 0.6;
  // typical swipe speeds vary between 0.1 and 0.6
  const speedThreshold = 0.19;
  // acceptable variation around thresholds ( accept lower speed + high ratio or vice-versa )
  const allowedSkew = 0.4;

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
      startTime = new Date().getTime();

    } else {
      //a second finger hit the screen, abort the touch
      startX = null;
      startY = null;
      startTime = null;
    }
  }

  const touchEndFactory = function (sectionPosition) {
    return function touchEnd(event) {
      if (startX || startY) {
        //the only finger that hit the screen left it
        const endX = event.changedTouches.item(0).clientX;
        const endY = event.changedTouches.item(0).clientY;
        const endTime = new Date().getTime();

        const swipeXDiff = endX - startX;
        const swipeYDiff = endY - startY;
        const timeDiff = endTime - startTime;
        const distance = Math.sqrt(endX * endX + endY * endY) / window.innerWidth * 100;
        const speed = distance / timeDiff;
        // the ratio is logarithmic in order to adjust for the exponential curve of the ratio (this facilitates applying the skew factor)
        const horizontalToVerticalRatio = Math.log2(Math.abs(swipeXDiff / swipeYDiff));

        if (matchesSwipeCriteria(horizontalToVerticalRatio, speed)) {
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

  const matchesSwipeCriteria = (horizontalToVerticalRatio, speed) => {
    const validSpeedSkew = horizontalToVerticalRatio > (1 - allowedSkew) * swipeRatioThreshold && speed > (1 + allowedSkew) * speedThreshold;
    const validRatioSkew = horizontalToVerticalRatio > (1 + allowedSkew) * swipeRatioThreshold && speed > (1 - allowedSkew) * speedThreshold;
    const validNoSkew = horizontalToVerticalRatio > swipeRatioThreshold && speed > speedThreshold;

    return validNoSkew || validRatioSkew || validSpeedSkew;
  }

  const processGesture = (e, sectionPosition) => {

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

  const runMatchingCommand = (e) => {
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
