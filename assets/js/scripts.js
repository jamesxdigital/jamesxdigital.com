function typeSkills(element) {
  const SKILLS = ["GITAL"];
  
  const COLORS = ["#f26a79", "#18a5b7", "#f7e88a"];
  const DEFAULT_DELAY = 30;
  const MAX_TRAILING_CHARACTERS = 2;
  const DEFAULT_TIMEOUT = 100;

  let skillState = {
    text: "",
    currentSkillIndex: 0,
    skillP: 0,
    direction: "forward",
    delay: DEFAULT_DELAY,
    currentCharacterIndex: 1,
  };

  // Get random color for characters
  function getRandomArrayEntry(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomCharacter() {
    return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
  }

  // Create trailing colored characters
  function getRandomColoredString(numberOfCharacters) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfCharacters; i++) {
      const span = document.createElement("span");
      span.textContent = getRandomCharacter();
      span.style.color = getRandomArrayEntry(COLORS);
      fragment.appendChild(span);
    }
    return fragment;
  }

  function drawNextCharacter() {
    const skill = SKILLS[skillState.currentSkillIndex];

    if (skillState.currentCharacterIndex > 0) {
      skillState.currentCharacterIndex--;
    }

    if (skillState.currentCharacterIndex === 0) {
      skillState.currentCharacterIndex = 1;

      if (skillState.direction === "forward") {
        // Typing forward
        if (skillState.skillP < skill.length) {
          skillState.text += skill[skillState.skillP];
          skillState.skillP++;
        } else {
          if (skillState.delay > 0) {
            skillState.delay--;
          } else {
            skillState.direction = "backward";
            skillState.delay = DEFAULT_DELAY;
          }
        }
      } else if (skillState.direction === "backward") {
        // Deleting backward
        if (skillState.skillP > 0) {
          skillState.text = skillState.text.slice(0, -1);
          skillState.skillP--;
        } else {
          skillState.currentSkillIndex =
            skillState.currentSkillIndex === SKILLS.length - 1
              ? 0
              : skillState.currentSkillIndex + 1;
          skillState.direction = "forward";
        }
      }
    }

    // Clear the element before updating
    element.innerHTML = skillState.text;

    // Add trailing random colored characters
    const numberOfTrailingChars = Math.min(
      MAX_TRAILING_CHARACTERS,
      skill.length - skillState.skillP
    );

    element.appendChild(getRandomColoredString(numberOfTrailingChars));

    // Call the function recursively to update the text
    setTimeout(drawNextCharacter, DEFAULT_TIMEOUT);
  }

  drawNextCharacter();
}

document.addEventListener('DOMContentLoaded', function () {
  const skillTextContainers = document.getElementsByClassName("glitch-text");
  for (let i = 0; i < skillTextContainers.length; i++) {
      typeSkills(skillTextContainers[i]);
  }
});