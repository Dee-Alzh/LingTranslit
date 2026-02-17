// ============================
// GLOBAL VARIABLES
// ============================
const inputText = document.getElementById("inputText");
const wordCountEl = document.getElementById("wordCount");
const webAppURL = "https://script.google.com/macros/s/AKfycby75Ow5nN0ocO3kW2F96RWVkX183Vu8Chg-P61L0zTjvasEH45EOz7nFqihVoq4Tof-/exec";

// ============================
// TRANSLITERATION MAP
// ============================
const map = {
  "А":"A","а":"a","Ә":"Ä","ә":"ä","Б":"B","б":"b","В":"V","в":"v",
  "Г":"G","г":"g","Ғ":"Ğ","ғ":"γ","Д":"D","д":"d","Е":"E","е":"e",
  "Ж":"Ž","ж":"ž","З":"Z","з":"z","И":"Ị","и":"ị","Й":"Y","й":"y",
  "К":"K","к":"k","Қ":"Q","қ":"q","Л":"L","л":"l","М":"M","м":"m",
  "Н":"N","н":"n","Ң":"Ŋ","ң":"ŋ","О":"O","о":"o","Ө":"Ö","ө":"ö",
  "П":"P","п":"p","Р":"R","р":"r","С":"S","с":"s","Т":"T","т":"t",
  "У":"U","у":"u","Ұ":"U","ұ":"u","Ү":"Ü","ү":"ü","Ф":"F","ф":"f",
  "Х":"Χ","х":"χ","Һ":"H","һ":"h","Ц":"C","ц":"c","Ч":"Č","ч":"č",
  "Ш":"Š","ш":"š","Щ":"Sh","щ":"sh","Ы":"Ï","ы":"ï","І":"I","і":"i",
  "Э":"E","э":"e","Ю":"Yu","ю":"yu","Я":"Ya","я":"ya","Ь":"'","ь":"'"
};

function transliterate(text) {
  return text.split("").map(c => map[c] ?? c).join("");
}

// ============================
// COUNT WORDS
// ============================
function countWords(text) {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

// Fetch total words from Google Sheet
async function fetchTotal() {
  try {
    const response = await fetch(webAppURL);
    const data = await response.json();
    wordCountEl.textContent = `Transliterated word count: ${data.total}`;
  } catch (err) {
    console.error("Error fetching total:", err);
  }
}

// Send new words to Google Sheet
async function addToGlobalCount(words) {
  try {
    const response = await fetch(`${webAppURL}?count=${words}`, { method: "POST" });
    const data = await response.json();
    wordCountEl.textContent = `Transliterated word count: ${data.total}`;
  } catch (err) {
    console.error("Error updating total:", err);
  }
}

// ============================
// INITIALIZE
// ============================
fetchTotal();

// Transliterate button click
document.getElementById("convertBtn").addEventListener("click", () => {
  const input = inputText.value;

  // Transliterate
  document.getElementById("outputText").value = transliterate(input);

  // Count words and update global counter
  const words = countWords(input);
  if (words > 0) addToGlobalCount(words);
});

// ============================
// DARK MODE
// ============================
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light mode"
      : "🌙 Dark mode";
});
