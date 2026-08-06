function popBalloon(balloon, message) {
  // Hide the balloon
  balloon.style.display = 'none';

  // Show popup message or image
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = message;
  document.body.appendChild(popup);

  // Launch confetti
  launchConfetti();
}

function launchConfetti() {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.innerText = '🎉';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(confetti);

    // Remove confetti after 2 seconds
    setTimeout(() => confetti.remove(), 2000);
  }
}
