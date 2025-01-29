const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set values

let timer;
let charIndex = 0;
let misTake = 0;
let isTyping = false;

// Calculate time based on text length (approximately 1 minute per 250 characters)
function calculateTime(text) {
  const baseCharsPerMinute = 250;
  return Math.max(30, Math.ceil((text.length / baseCharsPerMinute) * 60));
}

let maxTime = 60; // Default value, will be updated when text loads
let timeLeft = maxTime;

//handle user input

function loadParagraph() {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog and runs through the meadow",
    "Learning to type quickly and accurately is an essential skill in today's digital world",
    "Practice makes perfect when it comes to improving your typing speed and accuracy",
    "Focus on maintaining good posture and finger positioning while typing",
    "Regular typing practice can help you become more efficient in your daily tasks",
    "A diverse vocabulary enhances both written and spoken communication skills",
    "Success is not final, failure is not fatal; it is the courage to continue that counts",
    "Technology continues to evolve and shape the way we interact with the world",
    "Efficient time management is crucial for achieving your personal and professional goals",
    "Innovation drives progress and opens new possibilities for human advancement",
    "Creativity flourishes in an environment that encourages exploration and experimentation.",
    "Knowledge is power, and continuous learning leads to personal growth",
    "Persistence and determination are key factors in overcoming challenges",
    "Clear communication helps build strong relationships and mutual understanding.",
    "Quality work requires attention to detail and dedication to excellence",
    "Adaptability is essential in today's rapidly changing business environment",
    "Critical thinking skills enable better decision-making and problem-solving",
    "Collaboration and teamwork can lead to remarkable achievements",
    "Setting clear goals helps maintain focus and track progress effectively",
    "Professional development requires ongoing commitment to learning new skills",
    "Digital literacy is becoming increasingly important in modern society",
    "Effective leadership involves inspiring and empowering others to succeed",
    "Time spent practicing is never wasted when developing new abilities",
    "Organization and planning contribute to increased productivity",
    "Success often comes to those who are willing to put in the extra effort",
    "Building good habits takes time but yields long-term benefits",
    "Networking opens doors to new opportunities and collaborations",
    "Innovation often emerges from challenging conventional wisdom",
    "Continuous improvement leads to mastery in any field of endeavor",
    "Effective communication is the foundation of successful relationships",
    "Learning from mistakes is essential for personal and professional growth",
  ];
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  for (let char of paragraphs[ranIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());

  timeLeft = calculateTime(typingText.innerText);
  typingText.addEventListener("click", () => input.focus());
}

loadParagraph();

function initTyping() {
  try {
    const char = typingText.querySelectorAll("span");

    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
      if (char[charIndex].innerText === typedChar) {
        if (!isTyping) {
          timer = setInterval(initTime, 1000);
          isTyping = true;
        }

        char[charIndex].classList.add("correct");
      } else {
        char[charIndex].classList.add("incorrect");
        misTake++;
      }
      charIndex++;
      if (charIndex < char.length) {
        char[charIndex].classList.add("active");
      }
      mistakes.innerText = misTake;
      cpm.innerText = charIndex - misTake;
    } else {
      clearInterval(timer);
      isTyping = false;
      input.value = "";
    }
  } catch (error) {
    console.log(error);
    clearInterval(timer);
  }
}

input.addEventListener("input", initTyping);

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    wpm.innerText = Math.round(
      timeLeft < maxTime
        ? ((charIndex - misTake) / 5 / (maxTime - timeLeft)) * 60
        : 0
    );
  } else {
    clearInterval(timer);
    isTyping = false;
  }
}

btn.addEventListener("click", reset);

function reset() {
  loadParagraph();
  clearInterval(timer);
  maxTime = 60;
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value = "";
  charIndex = 0;
  misTake = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;
}
