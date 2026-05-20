let score = 0;

let scoreText = document.getElementById("score");

let questionText = document.getElementById("questionText");

let answerButtons = document.querySelectorAll(".answerBtn");

/* QUESTIONS */

let questions = [

    {
        question: "Who was the 2nd Hokage?",
        answers: [
            "Naruto Uzumaki",
            "Hashirama Senju",
            "Tobirama Senju"
        ],
        correct: "Tobirama Senju"
    },

    {
        question: "Who was Goku's first training partner?",
        answers: [
            "Krillin",
            "Vegeta",
            "Jiren"
        ],
        correct: "Krillin"
    },

    {
        question: "Who gave the Straw Hat to Luffy?",
        answers: [
            "Shanks",
            "Kaido",
            "Zoro"
        ],
        correct: "Shanks"
    },

    {
        question: "Who was Gojo's best friend?",
        answers: [
            "Sukuna",
            "Yuji Itadori",
            "Suguru Geto"
        ],
        correct: "Suguru Geto"
    },

    {

        question: "Who is the main character of Jujustsu Kaisen?",
        answers: [
            "Ryomen Sukuna",
            "Saturo Gojo",
            "Yuji Itadori"
        ],
        correct: "Yuji Itadori"

    }

];

/* RANDOMIZE */

questions.sort(() => Math.random() - 0.5);

let currentQuestion = 0;

/* LOAD QUESTION */

function loadQuestion() {

    let q = questions[currentQuestion];

    questionText.innerText = q.question;

    answerButtons.forEach((button, index) => {

        button.innerText = q.answers[index];

        button.disabled = false;

        button.style.backgroundColor = "#5fa97a";

        button.onclick = function () {

            if (button.innerText === q.correct) {

                score++;

                scoreText.innerText = "Score: " + score;

            }

            answerButtons.forEach(btn => {

                btn.disabled = true;

                if (btn.innerText === q.correct) {

                    btn.style.backgroundColor = "green";

                } else {

                    btn.style.backgroundColor = "red";

                }

            });

            setTimeout(() => {

                currentQuestion++;

                if (currentQuestion < questions.length) {

                    loadQuestion();

                } else {

                    endQuiz();

                }

            }, 1000);

        };

    });

}

/* END QUIZ */

function endQuiz() {

    questionText.innerText =
    "🏆 Quiz Finished! Final Score: " +
    score + "/" + questions.length;

    answerButtons.forEach(button => {

        button.style.display = "none";

    });

}

/* START */

loadQuestion();

/* REFRESH */

document.getElementById("refreshBtn").onclick = function () {

    location.reload();

};

/* MUSIC */

let music = document.getElementById("bgMusic");

let musicBtn = document.getElementById("musicBtn");

musicBtn.onclick = function () {

    if (music.paused) {

        music.play();

        musicBtn.innerText = "⏸ Pause Music";

    } else {

        music.pause();

        musicBtn.innerText = "▶ Play Music";

    }

};