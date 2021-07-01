const DPR_keypress = (e) => {
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey || e.metaKey) {
    return;
  }

  const cmd = Object.entries(window.DPR_Globals.DprViewModel.commands).find(([_, x]) => x().matchKey(e));
  if (cmd && !cmd[1]().notImplemented && cmd[1]().canExecute && cmd[1]().visible) {
    cmd[1]().execute(e);
    event.preventDefault();
    return;
  }
}

document.onkeypress = DPR_keypress;
