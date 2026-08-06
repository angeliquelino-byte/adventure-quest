let balloonPopCount = 0;

function launchConfetti() {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.innerText = '🎉';
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = Math.random() * -100 + 'px';
    confetti.style.fontSize = (10 + Math.random() * 24) + 'px';
    confetti.style.opacity = 0.9;
    document.body.appendChild(confetti);

    // animate falling
    const endY = window.innerHeight + 100;
    const duration = 2000 + Math.random() * 1200;
    confetti.animate([
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${endY}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: duration, easing: 'linear' });

    // Remove confetti after animation
    setTimeout(() => confetti.remove(), duration + 50);
  }
}

function checkAnswer(inputId, correctAnswer, nextPage) {
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(inputId + '-feedback');
  const userAnswer = input.value.trim();

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback.textContent = '✅ Correct!';
    feedback.classList.remove('error');
    feedback.classList.add('success');
    launchConfetti();
    setTimeout(() => {
      if (nextPage) window.location.href = nextPage;
    }, 900);
  } else {
    feedback.textContent = '❌ Wrong, try again!';
    feedback.classList.remove('success');
    feedback.classList.add('error');
    // subtle shake
    input.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(0)' }
    ], { duration: 260 });
  }
}

function chooseOption(questionId, chosenValue, nextPage) {
  // questionId is only used for feedback element id mapping
  const feedback = document.getElementById(questionId + '-feedback');
  // Determine correct choice by the text included in the onclick call (we expect the correct option to be the one matching the string used in the call)
  // For safety, embed the correct answers in a map
  const correctMap = {
    dq1: 'Slow down and prepare to stop',
    dq2: 'SFTP',
    dq3: 'Queue'
  };

  const correct = correctMap[questionId];
  if (chosenValue === correct) {
    feedback.textContent = '✅ Correct! Proceeding...';
    feedback.classList.remove('error');
    feedback.classList.add('success');
    launchConfetti();
    setTimeout(() => { if (nextPage) window.location.href = nextPage; }, 900);
  } else {
    feedback.textContent = '❌ Wrong answer, try again!';
    feedback.classList.remove('success');
    feedback.classList.add('error');
  }
}

function popBalloon(balloon, message) {
  // play pop effect
  balloon.style.transform = 'scale(0.2)';
  balloon.style.opacity = '0';
  setTimeout(() => balloon.style.display = 'none', 250);

  // append message
  const area = document.getElementById('balloon-messages');
  const el = document.createElement('div');
  el.className = 'popup-msg';
  el.innerText = message;
  area.appendChild(el);

  balloonPopCount++;
  launchConfetti();

  // Once both balloons popped, reveal gallery
  if (balloonPopCount >= 2) {
    setTimeout(() => {
      const gallery = document.getElementById('gallery');
      if (gallery) gallery.classList.remove('hidden');
      // scroll to gallery
      gallery.scrollIntoView({ behavior: 'smooth' });
      // small extra confetti
      launchConfetti();
    }, 700);
  }
}
