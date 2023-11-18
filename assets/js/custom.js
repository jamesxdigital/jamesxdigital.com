"use strict";
/*------------------------------------------------*/
// GLOBAL FUNCTIONS / CONSTANTS
/*------------------------------------------------*/
function isElementInViewport(element) {
  const bounds = element.getBoundingClientRect();
  return (
    bounds.top >= 0 &&
    bounds.left >= 0 &&
    bounds.bottom <= window.innerHeight &&
    bounds.right <= window.innerWidth
  );
}

function getRandomArrayEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomCharacter() {
  return String.fromCharCode(Math.random() * (127 - 33) + 33);
}

function typeSkills() {
  function getRandomColoredString(numberOfCharacters) {
    const fragment = document.createDocumentFragment();
    for (var i = 0; i < numberOfCharacters; i++) {
      const span = document.createElement("span");
      span.textContent = getRandomCharacter();
      span.style.color = getRandomArrayEntry(COLORS);
      fragment.appendChild(span);
    }
    return fragment;
  }

  const SKILLS = ["Creative", "Technologist"];
  const COLORS = ["#f26a79", "#18a5b7", "#f7e88a"];
  const DEFAULT_DELAY = 3;
  const MAX_TRAILING_CHARACTERS = 10;
  const DEFAULT_TIMEOUT = 120;
  const SKILL_STATE = {
    text: " ",
    prefixP: -MAX_TRAILING_CHARACTERS,
    currentSkillIndex: 0,
    skillP: 0,
    direction: "forward",
    delay: DEFAULT_DELAY,
    currentCharacterIndex: 1,
  };
  const skillTextContainer = document.getElementById("para1");

  function drawNextCharacter() {
    const skill = SKILLS[SKILL_STATE.currentSkillIndex];

    if (SKILL_STATE.currentCharacterIndex > 0)
      SKILL_STATE.currentCharacterIndex--;

    if (SKILL_STATE.currentCharacterIndex === 0) {
      SKILL_STATE.currentCharacterIndex = 1;

      if (SKILL_STATE.direction === "forward") {
        if (SKILL_STATE.skillP < skill.length) {
          SKILL_STATE.text += skill[SKILL_STATE.skillP];
          SKILL_STATE.skillP++;
        } else {
          if (SKILL_STATE.delay > 0) SKILL_STATE.delay--;
          else {
            SKILL_STATE.direction = "backward";
            SKILL_STATE.delay = DEFAULT_DELAY;
          }
        }
      } else if (SKILL_STATE.skillP > 0) {
        SKILL_STATE.text = SKILL_STATE.text.slice(0, -1);
        SKILL_STATE.skillP--;
      } else {
        SKILL_STATE.currentSkillIndex =
          SKILL_STATE.currentSkillIndex == SKILLS.length - 1
            ? 0
            : SKILL_STATE.currentSkillIndex + 1;
        SKILL_STATE.direction = "forward";
      }
    }

    skillTextContainer.textContent = SKILL_STATE.text;
    const numberOfTrailingChars = Math.min(
      MAX_TRAILING_CHARACTERS,
      skill.length - SKILL_STATE.skillP
    );
    skillTextContainer.appendChild(
      getRandomColoredString(numberOfTrailingChars)
    );
    setTimeout(drawNextCharacter, DEFAULT_TIMEOUT);
  }
  drawNextCharacter();
}

/*------------------------------------------------*/
// THINGS THAT NEED TO HAPPEN ON PAGE-LOAD
/*------------------------------------------------*/
window.addEventListener("DOMContentLoaded", function () {
  const $window = $(window);

  // Start header skills typing
  typeSkills();

  // Timeline show more button click event
  const list = $(".listTimeline li");
  const numToShow = 3;
  const button = $("#next");
  const fade = $(".fade");
  const numInList = list.length;
  list.hide();
  if (numInList > numToShow) {
    button.show();
  }
  list.slice(0, numToShow).show();

  button.on("click", () => {
    const showing = list.filter(":visible").length;
    list.slice(showing - 1, showing + numToShow).fadeIn();
    const nowShowing = list.filter(":visible").length;
    if (nowShowing >= numInList) {
      button.hide();
      fade.hide();
    }
  });

  // Responsive videos
  $(".post").fitVids();

  // Iframe switcher
  var switcher$ = $(".switcher"), // select element
    switchTarget$ = $(".switch-target"); // iframe

  switcher$.on("change", switchIframeSrc); // event binding

  // our functiono to switch the iframe src
  function switchIframeSrc() {
    // set the 'src' attribute of the iframe
    // to the value of the selected option
    switchTarget$.attr("src", switcher$.val());
  }

  // call the method on load
  switchIframeSrc();
});
