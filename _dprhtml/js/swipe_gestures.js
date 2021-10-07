'use strict'

const DPR_Swipe_Gesture = (function () {

  let startX = null;
  let startY = null;
  let startTime = null;
  let backgroundProp = ""
  //swipe must have 40px min on the X axis
  const minSwipeX = $(window).width() / 10 || 40;
  //movement on X should be at least this times more than on Y
  const swipeRatioThreshold = 1.2;
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
    'DPR_Swipe_Gesture:touchmove', 
    (sectionElementId) => {
      document
        .getElementById(sectionElementId)
        .addEventListener('touchmove', DPR_Gesture.touchMoveFactory(sectionElementId), true)
    },
  )

    window.DPR_Mediator.on(
      'DPR_Swipe_Gesture:touchend', 
      (sectionElementId, sectionPosition) => {
        document
          .getElementById(sectionElementId)
          .addEventListener('touchend', DPR_Gesture.touchEndFactory(sectionElementId, sectionPosition), true)
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

  const touchMoveFactory = (id) =>  {
    return (event) => {
      const tempX =  event.changedTouches.item(0).clientX;
      const tempY = event.changedTouches.item(0).clientY;
      const swipeXDiff = tempX - startX;
      const swipeYDiff = tempY - startY;
      let section = document.getElementById(id);

      applyMoveEffects(section, swipeXDiff);
    }
    
  }

  const touchEndFactory = (sectionElementId, sectionPosition) => {
    return (event) => {
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
        let section = document.getElementById(sectionElementId);
        resetSectionLook(section);

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

  const applyMoveEffects = (section, swipeXDiff, swipeYDiff) => {
    if (Math.abs(swipeXDiff) > minSwipeX && Math.abs(swipeXDiff) < 2 * minSwipeX) {
      section.style.left = swipeXDiff + "px";
      section.style.top = swipeYDiff  + "px";
      section.style.position = "relative";
      section.style.zIndex = "9999999";
      section.classList.add("paperback");
      backgroundProp = section.style.background;
      section.style.background = "";
    }
    
  }

  const resetSectionLook = (section) => {
    section.style.left = "";
    section.style.top = "";
    section.style.position = "";
    section.style.zIndex = "";
    section.classList.remove("paperback");
    section.style.background = backgroundProp;
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
    touchMoveFactory,
  };

})();

window.DPR_Gesture = DPR_Swipe_Gesture
