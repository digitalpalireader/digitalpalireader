"use strict";

const initializePaliFeature = () => {
  const url = new URL(window.location);
  const subfeat = url.searchParams.get("subfeat");
  console.log(subfeat);
  let resourceLinks = {
    PCRS: "../digitalpalireader/content/etc/grammar/compound.htm",
    PTCS: "features/pali/grammar/cheat1.html",
    PGPL: '../digitalpalireader/content/etc/grammar/GMD/index.html',
    abbrvPED: "../digitalpalireader/content/etc/grammar/ped-abbv.htm",
    abbrvCPED: "../digitalpalireader/content/etc/grammar/cped-abbv.htm",
    //quiz: "./features/pali/quiz/quiz.html",
  };
  let link = resourceLinks[subfeat];
  console.log(link);
  link ? $("#paliContent").attr('src',link) : openNewSidebar();
  };

const initializePaliSidebarTab = () => {
  console.log("Sidebar Initialized");
};
