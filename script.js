function typeText(el, text, speed, done){
    let i = 0;
    el.textContent = "";
    const iv = setInterval(() => {
      el.textContent += text[i];
      i++;
      if(i >= text.length){
        clearInterval(iv);
        if(done) done();
      }
    }, speed);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const l1 = document.getElementById('typeLine1');
    const l2 = document.getElementById('typeLine2');
    typeText(l1, "albert simel — developer based in nairobi, kenya", 22, () => {
      setTimeout(() => {
        typeText(l2, "ready to ship · open to freelance & contract work", 20);
      }, 250);
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));