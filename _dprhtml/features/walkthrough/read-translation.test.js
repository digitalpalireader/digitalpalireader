import "./init";

import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { readTranslationWalkthrough } from "./read-translation";

class MockNavigationTabViewModel {
  constructor() {
    this.set = jest.fn();
  }
}

beforeEach(() => {
  window.__navigationTabViewModel = new MockNavigationTabViewModel();
  $("body").html(`
    <div id="navigationTab" />
    <div id="nav-set-div">
      <select aria-label="Set" id="nav-set">
        <option value="k" />
      </select>
    </div>
    <div id="nav-book-div">
      <select aria-label="Book" id="nav-book">
        <option value="2" />
      </select>
    </div>
    <div id="nav-vagga-div">
      <select aria-label="Vagga" id="nav-vagga">
        <option value="1" />
      </select>
    </div>
    <p id="para1" />
    <button id="nav-vagga-button">Open Vagga</button>
    <button id="context-menu-handle">Open Context Menu</button>
    <button title="Ch.2 Heedfulness by Thanissaro Bhikkhu" />
  `);
});

test("opens navigation tab when the walkthrough is started", () => {
  const onNavigationTabClick = jest.fn();
  $("#navigationTab").on("click", onNavigationTabClick);

  readTranslationWalkthrough.start();

  expect(onNavigationTabClick).toHaveBeenCalledTimes(1);
});

test("selects the dīgha nikaya when the walkthrough is started", () => {
  readTranslationWalkthrough.start();

  expect(__navigationTabViewModel.set).toHaveBeenCalledWith("d");
  expect(__navigationTabViewModel.set).toHaveBeenCalledTimes(1);
});

test("steps through the entire walkthrough", () => {
  readTranslationWalkthrough.start();

  expect(screen.getByRole("dialog")).toHaveTextContent(
    /this is the navigation tab/i
  );

  userEvent.click(screen.getByRole("button", { name: /ok/i }));

  expect(screen.getByRole("dialog")).toHaveTextContent(/choose khuddaka/i);

  userEvent.selectOptions(screen.getByRole("combobox", { name: /set/i }), "k");

  expect(screen.getByRole("dialog")).toHaveTextContent(/choose dh.p/i);

  userEvent.selectOptions(screen.getByRole("combobox", { name: /book/i }), "2");

  expect(screen.getByRole("dialog")).toHaveTextContent(/choose appamādavaggo/i);

  userEvent.selectOptions(
    screen.getByRole("combobox", { name: /vagga/i }),
    "1"
  );

  expect(screen.getByRole("dialog")).toHaveTextContent(
    /click this arrow to display the appamādavaggo/i
  );

  userEvent.click(screen.getByRole("button", { name: /open vagga/i }));

  expect(screen.getByRole("dialog")).toHaveTextContent(
    /this is the context menu/i
  );

  userEvent.click(screen.getByRole("button", { name: /open context menu/i }));

  expect(screen.getByRole("dialog")).toHaveTextContent(
    /open a side-by-side english translation/i
  );

  userEvent.click(
    screen.getByRole("button", { name: /heedfulness by thanissaro bhikkhu/i })
  );

  expect(screen.getByRole("dialog")).toHaveTextContent(
    /you may now read and compare the pāli text/i
  );

  userEvent.click(screen.getByRole("button", { name: /end walkthrough/i }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
