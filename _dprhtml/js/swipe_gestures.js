function touchStart(event){
  if(event.touches.length === 1){
     //just one finger touched
     start = event.touches.item(0).clientX;
   }else{
     //a second finger hit the screen, abort the touch
     start = null;
  }
}

function touchEnd(event){
  var offset = 50;//at least 50px are a swipe
  if(start){
    //the only finger that hit the screen left it
    var end = event.changedTouches.item(0).clientX;

    if(end > start + offset){
     //a left -> right swipe
     event.gesture = 'swipe_right';
     console.log("swiped right");
    }
    if(end < start - offset ){
     //a right -> left swipe
     event.gesture = 'swipe_left';
     console.log("swiped left");
    }
    //reset
    DPR_gesture(event);
    start = null;
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

var start = null;
console.log("adding swipe gestures");

  // Add Touch Listener
  document.addEventListener('touchstart', touchStart, true);
  document.addEventListener('touchend', touchEnd, true);

