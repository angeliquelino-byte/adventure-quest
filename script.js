// script.js — quiz flow for easy and difficult rounds

const easyQuestions = [
  {q: "What's his favorite language?", a: "javascript"},
  {q: "What city does he work in?", a: "manila"},
  {q: "How many years old is he?", a: "31"}
];

const difficultQuestions = [
  {q: "Which OS does he prefer?", choices: ["Windows","macOS","Linux","FreeBSD"], correct:2},
  {q: "Which editor does he use most?", choices: ["Sublime","Vim","VS Code","Atom"], correct:2},
  {q: "Choose his favorite cloud provider:", choices: ["AWS","GCP","Azure","DigitalOcean"], correct:0}
];

let state = {round:null,index:0};

const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const finished = document.getElementById('finished');
const claim = document.getElementById('claim');

document.getElementById('start-easy').addEventListener('click',()=>start('easy'));
document.getElementById('start-difficult').addEventListener('click',()=>start('difficult'));
claim.addEventListener('click',()=>location.href='balloon.html');

function start(round){
  state.round = round; state.index = 0;
  intro.classList.add('hidden');
  finished.classList.add('hidden');
  quiz.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion(){
  quiz.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'quiz-question card';

  if(state.round === 'easy'){
    const data = easyQuestions[state.index];
    container.innerHTML = `
      <div class="q-title">Easy — Question ${state.index+1} of ${easyQuestions.length}</div>
      <div class="small">${escapeHtml(data.q)}</div>
      <div class="input-row">
        <input id="answer" type="text" placeholder="Type your answer" autocomplete="off">
        <button id="submit" class="btn">Submit</button>
      </div>
      <div id="feedback" aria-live="polite"></div>
    `;
    quiz.appendChild(container);
    const input = document.getElementById('answer');
    const submit = document.getElementById('submit');
    const feedback = document.getElementById('feedback');
    input.focus();
    submit.addEventListener('click',()=>checkEasy(data,input.value,feedback,container));
    input.addEventListener('keydown',e=>{if(e.key==='Enter') submit.click()});
  } else {
    const data = difficultQuestions[state.index];
    container.innerHTML = `
      <div class="q-title">Difficult — Question ${state.index+1} of ${difficultQuestions.length}</div>
      <div class="small">${escapeHtml(data.q)}</div>
      <div class="choice-list" id="choices"></div>
      <div id="feedback" aria-live="polite"></div>
    `;
    quiz.appendChild(container);
    const choices = document.getElementById('choices');
    data.choices.forEach((c,i)=>{
      const el = document.createElement('button');
      el.className = 'choice'; el.textContent = c;
      el.addEventListener('click',()=>checkDifficult(i, data, el, container));
      choices.appendChild(el);
    });
  }
}

function checkEasy(data, val, feedback, container){
  const normalized = (val||'').trim().toLowerCase();
  if(!normalized) {showError(feedback,'Please type an answer.');shake(container);return}
  if(normalized === data.a.toLowerCase()){
    showSuccess(feedback,'Correct! Proceeding...');
    setTimeout(()=>{nextOrFinish()},700);
  } else {
    showError(feedback,'Wrong answer — try again.');shake(container);
  }
}

function checkDifficult(choiceIndex, data, el, container){
  const feedback = container.querySelector('#feedback');
  if(choiceIndex === data.correct){
    showSuccess(feedback,'Correct choice!');
    el.style.background = 'linear-gradient(90deg,var(--accent),var(--accent-2))';
    el.style.color = '#051124';
    setTimeout(()=>{nextOrFinish()},700);
  } else {
    showError(feedback,'That one is incorrect. Try again.');
    el.classList.add('shake');
    setTimeout(()=>el.classList.remove('shake'),500);
  }
}

function nextOrFinish(){
  const max = state.round === 'easy' ? easyQuestions.length : difficultQuestions.length;
  state.index += 1;
  if(state.index >= max){
    quiz.classList.add('hidden');
    finished.classList.remove('hidden');
  } else {
    renderQuestion();
  }
}

function showError(el, msg){
  el.innerHTML = `<div class="error">${escapeHtml(msg)}</div>`;
}
function showSuccess(el, msg){
  el.innerHTML = `<div class="success">${escapeHtml(msg)}</div>`;
}
function shake(el){
  el.classList.add('shake');
  setTimeout(()=>el.classList.remove('shake'),450);
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,ch=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[ch]||ch));}

// Small accessibility note: focus management could be improved for screen readers; this is intentionally lightweight.
