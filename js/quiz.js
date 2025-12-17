const start_btn = document.querySelector('.start_btn');
const info_box = document.querySelector('.info_box');
const exit_quiz = document.querySelector('.exit_quiz');
const continue_btn = document.querySelector('#continue_btn');
const quiz_box = document.querySelector('.quiz_box');
const que_text = document.querySelector('.que_text');
const option_list = document.querySelector('.option_list');
const next_btn = document.querySelector('.next_btn');
const timer_sec = document.querySelector('.timer_sec');
const time_line = document.querySelector('.time_line');
const total_que = document.querySelector('.total_que');

let currentQuestion = 0;
let timeTick = 10;
let timerLineA = 0;
let timerLineAnime;
let ticker;

/* ---------------- START QUIZ ---------------- */

start_btn.addEventListener('click', () => {
    info_box.classList.add('activeInfo');
});

exit_quiz.addEventListener('click', () => {
    info_box.classList.remove('activeInfo');
});

continue_btn.addEventListener('click', () => {
    info_box.classList.remove('activeInfo');
    quiz_box.classList.add('activeQuiz');
    currentQuestion = 0;
    loadQuestion(currentQuestion);
});

/* ---------------- LOAD QUESTION ---------------- */

function loadQuestion(index) {
    reset();

    que_text.textContent = questions[index].question;
    option_list.innerHTML = '';

    questions[index].options.forEach(option => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerHTML = `<span>${option}</span>`;
        div.addEventListener('click', optionClicked);
        option_list.appendChild(div);
    });

    next_btn.style.display = "none";
    total_que.textContent = `${index + 1} / ${questions.length} questions`;
}

/* ---------------- NEXT BUTTON ---------------- */

next_btn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    } else {
        alert("Quiz finished ✅");
        clearInterval(ticker);
        clearInterval(timerLineAnime);
    }
});

/* ---------------- OPTION CLICK ---------------- */

function optionClicked() {
    next_btn.style.display = "inline";
    clearInterval(ticker);
    clearInterval(timerLineAnime);
    disableOptions();
}

/* ---------------- TIMER ---------------- */

function timer() {
    timer_sec.textContent = timeTick;

    if (timeTick > 0) {
        timeTick--;
    } else {
        clearInterval(ticker);
        disableOptions();
        next_btn.style.display = "inline";
    }
}

/* ---------------- TIMER LINE ---------------- */

function timerLineFill() {
    time_line.style.width = timerLineA + 'px';
    if (timerLineA < 548) {
        timerLineA += 5.3;
    }
}

/* ---------------- RESET TIMER ---------------- */

function reset() {
    clearInterval(ticker);
    clearInterval(timerLineAnime);

    timeTick = 10;
    timerLineA = 0;
    timer_sec.textContent = timeTick;

    ticker = setInterval(timer, 1000);
    timerLineAnime = setInterval(timerLineFill, 100);
}

/* ---------------- DISABLE OPTIONS ---------------- */

function disableOptions() {
    const options = option_list.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = "none";
    });
}
