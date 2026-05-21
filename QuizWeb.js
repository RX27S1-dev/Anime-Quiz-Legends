let score = 0;

let currentQuestion = 0;

let timer = 10;

let timerInterval;

let streak = 0;

let xp = 0;

let level = 1;

/* ELEMENTS */

let xpBar = document.getElementById("xpBar");

let levelText = document.getElementById("levelText");

let scoreText = document.getElementById("score");

let questionText = document.getElementById("questionText");

let answerButtons = document.querySelectorAll(".answerBtn");

let progressText = document.getElementById("progress");

let timerText = document.getElementById("timer");

let highScoreText = document.getElementById("highScore");

let streakText = document.getElementById("streak");

let startScreen = document.getElementById("startScreen");

let quizBox = document.getElementById("quizBox");

let categorySelect = document.getElementById("categorySelect");

let difficultySelect = document.getElementById("difficultySelect");

let usernameInput =
document.getElementById("usernameInput");

let playerName =
document.getElementById("playerName");   

/* MUSIC */

let music = document.getElementById("bgMusic");

let musicBtn = document.getElementById("musicBtn");

/* HIGH SCORE */

let highScore = localStorage.getItem("animeHighScore") || 0;

highScoreText.innerText = "High Score: " + highScore;

/* QUESTIONS */

let allQuestions = [

    {
        category: "naruto",
        question: "Who was the 2nd Hokage?",
        answers: ["Naruto", "Hashirama", "Tobirama"],
        correct: "Tobirama"
    },

    {
        category: "naruto",
        question: "Which tailed beast was inside Naruto?",
        answers: ["Kurama", "Shukaku", "Gyuki"],
        correct: "Kurama"
    },

    {
        category: "dbz",
        question: "What is Goku's Saiyan name?",
        answers: ["Kakarot", "Raditz", "Vegeta"],
        correct: "Kakarot"
    },

    {
        category: "dbz",
        question: "Who trained Goku first?",
        answers: ["Roshi", "Jiren", "Vegeta"],
        correct: "Roshi"
    },

    {
        category: "onepiece",
        question: "Who gave Luffy the Straw Hat?",
        answers: ["Shanks", "Kaido", "Zoro"],
        correct: "Shanks"
    },

    {
        category: "jjk",
        question: "Who is Gojo's best friend?",
        answers: ["Geto", "Yuji", "Sukuna"],
        correct: "Geto"
    },

    {

        category: "jjk",
        question: "Who is the main character of Jujutsu Kaisen?",
        answers: ["Gojo","Sukuna","Yuji"],
        correct: "Yuji"

    },


];

let questions = [];

/* START BUTTON */

document.getElementById("startBtn").onclick = function () {

    let username = usernameInput.value;

if(username.trim() === ""){

    username = "Anime Player";

}

playerName.innerText =
"👤 " + username;

localStorage.setItem(
    "animeUsername",
    username
);

    startScreen.style.display = "none";

    quizBox.style.display = "block";

    let selectedCategory = categorySelect.value;

    if (selectedCategory === "all") {

        questions = [...allQuestions];

    } else {

        questions = allQuestions.filter(q =>
            q.category === selectedCategory
        );

    }

    questions.sort(() => Math.random() - 0.5);

    loadQuestion();

};

/* LOAD QUESTION */

function loadQuestion() {

    clearInterval(timerInterval);

    let difficulty = difficultySelect.value;

    if (difficulty === "easy") {

        timer = 15;

    } else if (difficulty === "normal") {

        timer = 10;

    } else {

        timer = 5;

    }

    timerText.innerText = "Time: " + timer;

    startTimer();

    let q = questions[currentQuestion];

    /* FADE EFFECT */

    quizBox.style.opacity = "0";

    setTimeout(() => {

        quizBox.style.opacity = "1";

    }, 300);

    /* IMAGE */

       

    /* PROGRESS */

    progressText.innerText =
        "Question " +
        (currentQuestion + 1) +
        " / " +
        questions.length;

    /* QUESTION */

    questionText.innerText = q.question;

    /* RANDOM ANSWERS */

    let shuffledAnswers = [...q.answers];

    shuffledAnswers.sort(() => Math.random() - 0.5);

    answerButtons.forEach((button, index) => {

        button.style.display = "inline-block";

        button.innerText = shuffledAnswers[index];

        button.disabled = false;

        button.style.backgroundColor = "#5fa97a";

        button.onclick = function () {

            clearInterval(timerInterval);

            if (button.innerText === q.correct) {

                score++;

                xp += 20;

                updateXP();

                streak++;

                scoreText.innerText = "Score: " + score;

            } else {

                streak = 0;

            }

            streakText.innerText =
                "🔥 Streak: " + streak;

            answerButtons.forEach(btn => {

                btn.disabled = true;

                if (btn.innerText === q.correct) {

                    btn.style.backgroundColor = "green";

                } else {

                    btn.style.backgroundColor = "red";

                }

            });

            setTimeout(nextQuestion, 1200);

        };

    });

}

/* TIMER */

function startTimer() {

    timerInterval = setInterval(() => {

        timer--;

        timerText.innerText = "Time: " + timer;

        if (timer <= 0) {

            clearInterval(timerInterval);

            streak = 0;

            streakText.innerText =
                "🔥 Streak: " + streak;

            nextQuestion();

        }

    }, 1000);

}

/* NEXT QUESTION */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        endQuiz();

    }

}

/* END QUIZ */

function endQuiz() {

    questionText.innerText =
        "🏆 Final Score: " +
        score +
        "/" +
        questions.length;

    answerButtons.forEach(button => {

        button.style.display = "none";

    });

    /* HIGH SCORE */

    if (score > highScore) {

        localStorage.setItem("animeHighScore", score);

        highScoreText.innerText =
            "High Score: " + score;

    }

    /* RANK */

    let rank = "";

    if (score === questions.length) {

        rank = "🔥 Anime God";

    } else if (score >= 4) {

        rank = "😎 Otaku";

    } else if (score >= 2) {

        rank = "📺 Weeb";

    } else {

        rank = "💀 Beginner";

    }

    setTimeout(() => {

        alert("Rank: " + rank);

    }, 500);

}

/* REFRESH BUTTON */

document.getElementById("refreshBtn").onclick = function () {

    location.reload();

};

/* MUSIC BUTTON */

musicBtn.onclick = function () {

    if (music.paused) {

        music.play();

        musicBtn.innerText = "⏸ Pause Music";

    } else {

        music.pause();

        musicBtn.innerText = "▶ Play Music";

    }

};

/*xp bar*/

function updateXP() {

    let xpPercent = xp % 100;

    xpBar.style.width = xpPercent + "%";

    level = Math.floor(xp / 100) + 1;

    let title = "";

    if(level <= 2){

        title = "Beginner";

    } else if(level <= 4){

        title = "Weeb";

    } else if(level <= 6){

        title = "Otaku";

    } else {

        title = "Anime God 🔥";

    }

    levelText.innerText =
    "Level " + level + " " + title;

}

let savedUsername =
localStorage.getItem("animeUsername");

if(savedUsername){

    usernameInput.value = savedUsername;

}