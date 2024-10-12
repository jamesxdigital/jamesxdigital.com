function typeSkills() {
    const SKILLS = ["CREATIVE", "TECHNOLOGY"];
    
    const COLORS = ["#f26a79", "#18a5b7", "#f7e88a"];
    const DEFAULT_DELAY = 10;
    const MAX_TRAILING_CHARACTERS = 2;
    const DEFAULT_TIMEOUT = 120;
  
    const SKILL_STATE = {
      text: "",
      currentSkillIndex: 0,
      skillP: 0,
      direction: "forward",
      delay: DEFAULT_DELAY,
      currentCharacterIndex: 1,
    };
  
    const skillTextContainer = document.getElementById("para1");
  
    // Get random color for characters
    function getRandomArrayEntry(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
    // Get a random ASCII character
    function getRandomCharacter() {
      return String.fromCharCode(Math.floor(Math.random() * (126 - 33) + 33));
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
      const skill = SKILLS[SKILL_STATE.currentSkillIndex];
  
      if (SKILL_STATE.currentCharacterIndex > 0) {
        SKILL_STATE.currentCharacterIndex--;
      }
  
      if (SKILL_STATE.currentCharacterIndex === 0) {
        SKILL_STATE.currentCharacterIndex = 1;
  
        if (SKILL_STATE.direction === "forward") {
          // Typing forward
          if (SKILL_STATE.skillP < skill.length) {
            SKILL_STATE.text += skill[SKILL_STATE.skillP];
            SKILL_STATE.skillP++;
          } else {
            if (SKILL_STATE.delay > 0) {
              SKILL_STATE.delay--;
            } else {
              SKILL_STATE.direction = "backward";
              SKILL_STATE.delay = DEFAULT_DELAY;
            }
          }
        } else if (SKILL_STATE.direction === "backward") {
          // Deleting backward
          if (SKILL_STATE.skillP > 0) {
            SKILL_STATE.text = SKILL_STATE.text.slice(0, -1);
            SKILL_STATE.skillP--;
          } else {
            SKILL_STATE.currentSkillIndex =
              SKILL_STATE.currentSkillIndex === SKILLS.length - 1
                ? 0
                : SKILL_STATE.currentSkillIndex + 1;
            SKILL_STATE.direction = "forward";
          }
        }
      }
  
      // Update the text content in para1
      skillTextContainer.textContent = SKILL_STATE.text;
  
      // Add trailing random colored characters
      const numberOfTrailingChars = Math.min(
        MAX_TRAILING_CHARACTERS,
        skill.length - SKILL_STATE.skillP
      );
  
      skillTextContainer.appendChild(getRandomColoredString(numberOfTrailingChars));
  
      // Call the function recursively to update the text
      setTimeout(drawNextCharacter, DEFAULT_TIMEOUT);
    }
  
    drawNextCharacter();
  }
  
  // Initialize when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    typeSkills();
  });