const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");
const selectedOption = document.getElementById("text-options");

//set values

let options = "Quotes";
let quotes = true;
let timer;
let charIndex = 0;
let misTake = 0;
let isTyping = false;

selectedOption.addEventListener("change", (event) => {
  options = event.target.value;
  changePara();
  reset();
});

let quotesPara = [
  "The only limit to our realization of tomorrow is our doubts of today",
  "The future belongs to those who believe in the beauty of their dreams",
  "Do not watch the clock. Do what it does. Keep going",
  "Keep your face always toward the sunshine and shadows will fall behind you",
  "The best way to predict the future is to invent it",
];

let paragraphs = quotesPara;
let longParagraph = [
  "In the heart of the bustling city, there was a small, quaint bookstore that had stood the test of time. It was a place where the scent of old books mingled with the aroma of freshly brewed coffee, creating an atmosphere that was both nostalgic and inviting. The shelves were lined with volumes of all shapes and sizes, each one holding a story waiting to be discovered. The owner, an elderly gentleman with a passion for literature, had dedicated his life to curating a collection that spanned genres and generations. He believed that every book had the power to transport its reader to another world, and he took great pride in helping his customers find the perfect escape.",
  "As the sun set over the horizon, casting a golden glow across the landscape, the village came alive with the sounds of evening. Children played in the streets, their laughter echoing through the air, while the adults gathered in the town square to share stories and news of the day. The smell of home-cooked meals wafted from open windows, and the soft hum of conversation filled the air. It was a place where everyone knew each other, and a sense of community and belonging was woven into the fabric of daily life. In this village, time seemed to slow down, allowing its inhabitants to savor the simple pleasures of life.",
  "Deep in the forest, where the trees stood tall and the underbrush was thick, there was a hidden clearing that few had ever seen. It was a place of tranquility and beauty, where the sunlight filtered through the leaves, casting dappled shadows on the ground. Wildflowers bloomed in a riot of colors, and a gentle stream meandered through the clearing, its waters sparkling in the light. The air was filled with the sounds of nature, from the chirping of birds to the rustle of leaves in the breeze. It was a sanctuary, a place where one could escape the hustle and bustle of the outside world and find peace in the embrace of nature.",
  "In a time long past, in a kingdom far away, there was a castle that stood atop a hill, overlooking the land below. It was a grand and imposing structure, with towering walls and turrets that reached towards the sky. The castle was home to a wise and benevolent king, who ruled with fairness and compassion. Under his reign, the kingdom prospered, and its people lived in harmony. The castle was a place of great activity, with courtiers and servants bustling about, and the sounds of music and laughter filling the halls. It was a place where dreams were born and adventures began, and where the stories of old came to life.",
  "On the edge of the vast desert, where the sands stretched as far as the eye could see, there was an oasis that offered respite to weary travelers. It was a place of lush greenery and cool, clear water, a stark contrast to the harsh, arid landscape that surrounded it. Palm trees swayed gently in the breeze, and the air was filled with the scent of blooming flowers. The oasis was a haven, a place where one could rest and rejuvenate before continuing their journey. It was a reminder that even in the most inhospitable of environments, there could be pockets of beauty and life.",
];
function changePara() {
  if (options == "Paragraph") {
    paragraphs = longParagraph;
  } else {
    paragraphs = quotesPara;
  }
}

function getTime() {
  return options === "Quotes" ? 20 : 300;
}

let maxTime = getTime();
let timeLeft = maxTime;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  const chars = paragraphs[ranIndex]
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");
  typingText.innerHTML = chars;
  typingText.querySelector("span").classList.add("active");
  document.addEventListener("keydown", () => input.focus());

  timeLeft = getTime();
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
        ? (charIndex - misTake) / 5 / ((maxTime - timeLeft) / 60)
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
  maxTime = getTime();
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
