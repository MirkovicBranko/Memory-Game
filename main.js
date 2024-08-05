let start = document.querySelector(".karta");
start.addEventListener("click", pokreni);

let brojeviSlika = [];
let otvoreneSlike = [];
let nizUklonjenih = [];

for (let i = 0; i < 5; i++) {
  brojeviSlika.push(i);
  brojeviSlika.push(i);
}

function pokreni() {
  let ispis = document.getElementById("ispis");
  ispis.innerHTML = ''; // Resetuje ispis pre nove igre
  let brojac = 0;
  promesajNiz(brojeviSlika);
  let tajmerSlika = setInterval(function () {
    let brSlike = brojeviSlika[brojac];
    ispis.innerHTML += `<div class="card" id="${brSlike}">
            <div class="card__face card__face--front"></div>
            <div class="card__face card__face--back">
                <img src="/images/${brSlike}.png" alt="photo${brSlike}">
            </div>
        </div>`;
    brojac++;
    if (brojac == 10) {
      clearInterval(tajmerSlika);
      rotiraj();
    }
  }, 500);
}

function rotiraj() {
  var cards = document.querySelectorAll('.card');

  cards.forEach(function (card, index) {
    card.addEventListener('click', function () {
      if (!card.classList.contains('uklonjena') && (otvoreneSlike.length < 2 || otvoreneSlike.includes(index))) {
        if (otvoreneSlike.length < 2 || otvoreneSlike.includes(index)) {
          card.classList.toggle('is-flipped');
          if (otvoreneSlike.includes(index)) {
            otvoreneSlike.splice(otvoreneSlike.indexOf(index), 1);
          } else {
            otvoreneSlike.push(index);
          }

          if (otvoreneSlike.length == 2) {
            setTimeout(function () {
              if (cards[otvoreneSlike[0]].id === cards[otvoreneSlike[1]].id) {
                cards[otvoreneSlike[0]].style.display = "none";
                cards[otvoreneSlike[1]].style.display = "none";
                cards[otvoreneSlike[0]].classList.add('uklonjena');
                cards[otvoreneSlike[1]].classList.add('uklonjena');
                otvoreneSlike = [];
              } else {
                cards[otvoreneSlike[0]].classList.remove("is-flipped");
                cards[otvoreneSlike[1]].classList.remove("is-flipped");
                otvoreneSlike = [];
              }

              if (document.querySelectorAll('.card:not(.uklonjena)').length === 0) {
                let poruka = document.querySelector('.won-message');
                poruka.style.display = 'block'; // Prikazuje poruku o pobedi
                document.getElementById('restartContainer').style.display = 'block'; // Prikazuje dugme za restart
              }
            }, 2000);
          }
        }
      }
    });
  });
}

function promesajNiz(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Restart logika
document.getElementById("restartGame").addEventListener("click", function () {
  location.reload(); // Osvježava stranicu za novi početak igre
});
