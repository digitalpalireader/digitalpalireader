import userEvent from "@testing-library/user-event";

import { DprViewModel } from "./dprviewmodel";

import "./keyboard_shortcuts";

const resetSettings = jest.fn();

const MockOtherDialogsViewModel = jest.fn().mockReturnValue({
  resetSettings,
});

beforeEach(() => {
  window.navigationFeatureName = "";
  window.__dprViewModel = new DprViewModel();
  window.__otherDialogsViewModel = new MockOtherDialogsViewModel();
});

describe("DPR_keypress", () => {
  test("capital R (but not lowercase r) resets settings", () => {
    userEvent.keyboard("r");

    expect(resetSettings).not.toHaveBeenCalled();

    userEvent.keyboard("R");

    expect(resetSettings).toHaveBeenCalledTimes(1);
  });
});
