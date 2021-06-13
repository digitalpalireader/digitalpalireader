"use strict";

const readTranslationWalkthrough = (() => {
  const walkthrough = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: { enabled: true },
      popperOptions: {
        modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
      },
    },
    keyboardNavigation: false,
    useModalOverlay: true,
  });

  walkthrough.addStep({
    attachTo: { element: "#navigationTab", on: "auto" },
    buttons: [
      {
        action() {
          walkthrough.next();
        },
        text: "OK",
      },
    ],
    text: `
      This is the navigation tab.
      Here you will be able to go to any text in the Pāli canon or commentaries.
    `,
  });

  const onNikayaChange = (event) => {
    if (event.target.value === "k") {
      walkthrough.next();
    }
  };
  walkthrough.addStep({
    attachTo: { element: "#nav-set-div", on: "auto" },
    text: `
      This is the hierarchy navigation. These are the sets of the canon.
      Choose Khuddaka.
    `,
    when: {
      show() {
        $("#nav-set").on("change", onNikayaChange);
      },
      cleanup() {
        $("#nav-set").off("change", onNikayaChange);
      },
    },
  });

  const onBookChange = (event) => {
    if (event.target.value === "2") {
      walkthrough.next();
    }
  };
  walkthrough.addStep({
    attachTo: { element: "#nav-book-div", on: "auto" },
    text: `
      These are the books of the Khuddaka Nikaya.
      Choose Dh.P., which stands for Dhammapada.
    `,
    when: {
      show() {
        $("#nav-book").on("change", onBookChange);
      },
      cleanup() {
        $("#nav-book").off("change", onBookChange);
      },
    },
  });

  const onVaggaChange = (event) => {
    if (event.target.value === "1") {
      walkthrough.next();
    }
  };
  walkthrough.addStep({
    attachTo: { element: "#nav-vagga", on: "auto" },
    text: `
      This is the hierarchy for the Dhammapada.
      Choose appamādavaggo.
    `,
    when: {
      show() {
        $("#nav-vagga").on("change", onVaggaChange);
      },
      cleanup() {
        $("#nav-vagga").off("change", onVaggaChange);
      },
    },
  });

  walkthrough.addStep({
    advanceOn: { event: "click", selector: "#nav-vagga-button" },
    attachTo: { element: "#nav-vagga-button", on: "auto" },
    text: `
      Click this arrow to display the appamādavaggo.
    `,
  });

  walkthrough.addStep({
    advanceOn: { event: "click", selector: "#context-menu-handle" },
    attachTo: { element: "#context-menu-handle", on: "auto" },
    text: `
      This is the context menu. Click this arrow to open it.
    `,
  });

  walkthrough.addStep({
    advanceOn: {
      event: "click",
      selector: 'button[title^="Ch.2 Heedfulness by Thanissaro Bhikkhu"]',
    },
    attachTo: {
      element: 'button[title^="Ch.2 Heedfulness by Thanissaro Bhikkhu"]',
      on: "auto",
    },
    text: `
      Click this icon to open a side-by-side English translation of this text.
    `,
    when: {
      show() {
        $("#context-menu").addClass("visible");
      },
      cleanup() {
        $("#context-menu").removeClass("visible");
      },
    },
  });

  // Shepherd only allows highlighting of a single element at a time.
  // Since the paragraphs in the Pāli text are sibling elements, an
  // intermediate container must be created to highlight multiple
  // paragraphs at once.
  const verseContainer = $("<div>", { id: "read-translation-verse" });
  walkthrough.addStep({
    attachTo: { element: "#read-translation-verse", on: "auto" },
    buttons: [
      {
        action() {
          walkthrough.next();
        },
        text: "End Walkthrough",
      },
    ],
    text: `
      <div class="dhamma-talks-translation">
        <p>Heedfulness:</p>
        <p class="v4">the path to the Deathless.</p>
        <p>Heedlessness:</p>
        <p class="v4">the path to death.</p>
        <p>The heedful do not die.</p>
        <p>The heedless are as if</p>
        <p class="v2">already dead.</p>
      </div>
      You may now read and compare the Pāli text to the English translation on the right.
    `,
    when: {
      "before-show"() {
        verseContainer.insertAfter("#para1");
      },
      show() {
        $("#para2,#para3").appendTo(verseContainer);
      },
      cleanup() {
        $("#para2,#para3").insertAfter(verseContainer);
      },
    },
  });

  walkthrough.on("start", () => {
    $("#navigationTab").click();
    __navigationTabViewModel.set("d");
  });

  return walkthrough;
})();
