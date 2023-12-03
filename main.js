let start = document.querySelector(".karta");
start.addEventListener("click", pokreni);



let brojeviSlika = []; // Niz za čuvanje indeksa slika
let otvoreneSlike = []; //niz za pracenje otvorenih slika
let nizUklonjenih = []; //niz za pracenje broja uklonjenih slika

for (let i = 0; i < 5; i++) {
  brojeviSlika.push(i);
  brojeviSlika.push(i);
}
function pokreni() {
  let ispis = document.getElementById("ispis");
  let brojac = 0;
  promesajNiz(brojeviSlika); //mesa niz indexa
  let tajmerSlika = setInterval(function () {
    let brSlike = brojeviSlika[brojac]; //koristi index iz niza
    ispis.innerHTML += `<div class="card" id="${brSlike}">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">
        <img src="/images/${brSlike}.png"  alt="photo${brSlike}">
        </div>
      </div>`;
    brojac++;
    if (brojac == 10) {
      clearInterval(tajmerSlika);
      rotiraj();
    }
  }, 500);
}
let tajmer;
function rotiraj() {
  var cards = document.querySelectorAll('.card'); // Finds all elements with class .card
  cards.forEach(function (card, index) {
    card.addEventListener('click', function () {
      if (!card.classList.contains('uklonjena') && (otvoreneSlike.length < 2 || otvoreneSlike.includes(index))) {
        if (otvoreneSlike.length < 2 || otvoreneSlike.includes(index)) {
          card.classList.toggle('is-flipped'); //Adds or removes class for rotation
          if (otvoreneSlike.includes(index)) {
            otvoreneSlike.splice(otvoreneSlike.indexOf(index), 1);
          } else {
            otvoreneSlike.push(index); //adds picture in array of open pictures
          }
          //ih if 2 pictures are open, it closes
          if (otvoreneSlike.length == 2) {
            setTimeout(function () {
              if (cards[otvoreneSlike[0]].id === cards[otvoreneSlike[1]].id) {//compares 2 pictures
                cards[otvoreneSlike[0]].style.display = "none";
                cards[otvoreneSlike[1]].style.display = "none";
                otvoreneSlike = []; //empties array of open pictures
              } else {
                cards[otvoreneSlike[0]].classList.remove("is-flipped");
                cards[otvoreneSlike[1]].classList.remove("is-flipped");
                otvoreneSlike = [];
              }
              if (cards[otvoreneSlike[0]].id === cards[otvoreneSlike[1]].id) {
                cards[otvoreneSlike[0]].classList.add('uklonjena');
                cards[otvoreneSlike[1]].classList.add('uklonjena');
              }
            }, 2000); //closes pics after 2s
          }
        }
      }
      if (document.querySelectorAll('.card:not(.uklonjena)').length === 0) {
        let poruka = document.getElementById('ispis');
        poruka.innerHTML = 'You are winn.';
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