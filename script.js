// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();


//Events 
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionHtml = '';
        for(let i in q.options) {
            optionHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
      
    }else {
        finishQuiz();
    }

}


function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));
    
    if(questions[currentQuestion].answer == clickOption) {
        correctAnswers++;
    }
    currentQuestion++;
    showQuestion();
}


function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {  
        document.querySelector('.scoreArea img').src = 'images/emoji-cry.png';
        document.querySelector('.scoreText1').innerHTML = 'Sinto muito';
        document.querySelector('.scorePct').style.color = '#871508';
    }else if(points > 30 && points < 70) {
        document.querySelector('.scoreArea img').src = 'images/emoji-happy.png';
        document.querySelector('.scoreText1').innerHTML = 'Legal!';
        document.querySelector('.scorePct').style.color = '#857405';
    }else if(points >= 70) {
        document.querySelector('.scoreArea img').src = 'images/emoji-glasses.png';
        document.querySelector('.scoreText1').innerHTML = 'Perfeito!';
        document.querySelector('.scorePct').style.color = 'green';
        
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `De ${questions.length} questões você acertou ${correctAnswers}.`;

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.progress--bar').style.width = '100%';
}


function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;

    showQuestion();
}