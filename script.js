
const translations = {
  en: {
    siteSubtitle: "Converts Kazakh Cyrillic text into Latin script (Johanson-based)",
    mainTitle: "Turkological Transcription",
    mainSubtitle: "Johanson-based Latin transcription",
    labelInput: "Kazakh (Cyrillic)",
    placeholder: "Example: Қазақстан Республикасы",
    convertBtn: "Transliterate",
    labelOutput: "Kazakh (Latin)",
    footerText: "© 2026 Dilnaz Alzhanova. All rights reserved.",
    feedbackText: "Send your feedback here:"
  },

  kz: {
    siteSubtitle: "Қазақ тіліндегі кирилл жазуын латын графикасына көшіреді (Йохансон жүйесі)",
    mainTitle: "Түркологиялық транскрипция",
    mainSubtitle: "Йохансон негізіндегі латын транскрипциясы",
    labelInput: "Қазақша (кирилл)",
    placeholder: "Мысалы: Қазақстан Республикасы",
    convertBtn: "Транслитерациялау",
    labelOutput: "Қазақша (латын)",
    footerText: "© 2026 Дильназ Алжанова. Барлық құқықтар қорғалған.",
    feedbackText: "Пікіріңізді осы жерге қалдырыңыз:"
  },

  ru: {
    siteSubtitle: "Преобразует казахский текст с кириллицы на латиницу (система Йохансона)",
    mainTitle: "Тюркологическая транскрипция",
    mainSubtitle: "Латинская транскрипция по системе Йохансона",
    labelInput: "Казахский (кириллица)",
    placeholder: "Например: Қазақстан Республикасы",
    convertBtn: "Транслитерировать",
    labelOutput: "Казахский (латиница)",
    footerText: "© 2026 Дильназ Альжанова. Все права защищены.",
    feedbackText: "Оставьте свой отзыв здесь:"
  }
};

function setLang(lang) {
  document.getElementById("siteSubtitle").textContent = translations[lang].siteSubtitle;
  document.getElementById("mainTitle").textContent = translations[lang].mainTitle;
  document.getElementById("mainSubtitle").textContent = translations[lang].mainSubtitle;
  document.getElementById("labelInput").textContent = translations[lang].labelInput;
  document.getElementById("inputText").placeholder = translations[lang].placeholder;
  document.getElementById("convertBtn").textContent = translations[lang].convertBtn;
  document.getElementById("labelOutput").textContent = translations[lang].labelOutput;
  document.getElementById("footerText").textContent = translations[lang].footerText;
  document.getElementById("feedbackText").textContent = translations[lang].feedbackText;
}

// default language
setLang("en");


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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("convertBtn").addEventListener("click", () => {
        const input = document.getElementById("inputText").value;
        document.getElementById("outputText").value = transliterate(input);
    });
});



// Dark mode toggle
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggleBtn.textContent = "☀️ Light mode";
    } else {
        themeToggleBtn.textContent = "🌙 Dark mode";
    }
});


const inputText = document.getElementById("inputText");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

inputText.addEventListener("input", () => {
  const text = inputText.value;

  // Words
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  wordCount.textContent = "Words: " + (text.trim() ? words.length : 0);

  // Characters
  charCount.textContent = "Characters: " + text.length;

  // Characters without spaces
  charNoSpaceCount.textContent =
    "No spaces: " + text.replace(/\s/g, "").length;
});
