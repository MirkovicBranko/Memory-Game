let start = document.querySelector(".karta");
start.addEventListener("click",pokreni);

// let stopTimer = document.querySelector("#stopTimer");
// stopTimer.addEventListener("click", zaustaviTajmer);

let brojeviSlika = []; // Niz za čuvanje indeksa slika
let otvoreneSlike = []; //niz za pracenje otvorenih slika
let nizUklonjenih = []; //niz za pracenje broja uklonjenih slika

for (let i = 0; i < 5; i++) {
    brojeviSlika.push(i);
    brojeviSlika.push(i);
}
function pokreni(){
    let ispis = document.getElementById("ispis");
    let brojac = 0;
    promesajNiz(brojeviSlika); //mesa niz indexa
    let tajmerSlika = setInterval(function(){
      let brSlike = brojeviSlika[brojac]; //koristi index iz niza
        ispis.innerHTML += `<div class="card" id="${brSlike}">
        <div class="card__face card__face--front"></div>
        <div class="card__face card__face--back">
        <img src="/images/${brSlike}.png"  alt="photo${brSlike}">
        </div>
      </div>`;
       brojac++;
       if(brojac == 10){
        clearInterval(tajmerSlika);
       rotiraj();
       }
    }, 500);  
    
    // let vreme = 0; 
    // let timerElement = document.getElementById('timer'); 
    // let tajmer = setInterval(function() {
    // vreme++; // Povecava vreme 
    // timerElement.textContent = vreme; // Ažurira tekst
    //   }, 1000); 
      // if(brSlike == 0){
      //   clearInterval(tajmer);
      // }
    }
    let tajmer;
    function rotiraj() {
      var cards = document.querySelectorAll('.card'); // Pronalazi sve elemente sa klasom .card
      // let vreme = 0; 
      // let timerElement = document.getElementById('timer'); 
      //  tajmer = setInterval(function() {
      //  vreme++; // Povecava vreme 
      //   timerElement.textContent = vreme; // Ažurira tekst
      //     }, 1000); 
      cards.forEach(function(card, index) {
          card.addEventListener('click', function() {
            if (!card.classList.contains('uklonjena') && (otvoreneSlike.length < 2 || otvoreneSlike.includes(index))) {
              // Ako se dve slike podudaraju, postavite klasu "uklonjena" na kartice
              if(otvoreneSlike.length < 2 || otvoreneSlike.includes(index)){
                card.classList.toggle('is-flipped'); // Dodaje ili uklanja klasu za rotaciju
              if(otvoreneSlike.includes(index)){
                otvoreneSlike.splice(otvoreneSlike.indexOf(index), 1);
              }else {
                otvoreneSlike.push(index); //dodaje sliku u niz otvorenih slika
              }
            //ako su otvorene dve slike zatvori ih
              if(otvoreneSlike.length == 2){
                setTimeout(function(){
                  // console.log(cards[otvoreneSlike[0]])
                  if(cards[otvoreneSlike[0]].id === cards[otvoreneSlike[1]].id){//uporedjuje dve slike
                    cards[otvoreneSlike[0]].style.display = "none";
                    cards[otvoreneSlike[1]].style.display = "none";
                  //   cards[otvoreneSlike[0]].classList.add('uklonjena');
                  // cards[otvoreneSlike[1]].classList.add('uklonjena');
                    otvoreneSlike = []; //isprazni niz otvorenih slika
                  } else {
                  cards[otvoreneSlike[0]].classList.remove("is-flipped");
                  cards[otvoreneSlike[1]].classList.remove("is-flipped");
                  otvoreneSlike = [];
                } 
                if(cards[otvoreneSlike[0]].id === cards[otvoreneSlike[1]].id){
                  cards[otvoreneSlike[0]].classList.add('uklonjena');
                  cards[otvoreneSlike[1]].classList.add('uklonjena');
                }
                },2000); //posle 2s zatvara slike
              }
          }
            }
            // if(card.classList.contains('uklonjena') && nizUklonjenih.length == 10){
            //   console.log('Sve karte su uklonjene. Zaustavljam tajmer.');
            //   clearInterval(tajmer);
            // }
            if(document.querySelectorAll('.card:not(.uklonjena)').length === 0){
              let poruka = document.getElementById('ispis');
              poruka.innerHTML = 'You are winn.';
            }
          });
      });
    
     
      // if (document.querySelectorAll('.card:not(.uklonjena)').length === 0) {
      //   // Nema više vidljivih karata, zaustavi tajmer
      //   console.log('Sve karte su uklonjene. Zaustavljam tajmer.');
      //   clearInterval(tajmer);
      // }
    }

function promesajNiz(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// function pokreniTimer(){
// let vreme = 0; 
// let timerElement = document.getElementById('timer'); 
// let tajmer = setInterval(function() {
//     vreme++; // Povecava vreme 
//     timerElement.textContent = vreme; // Ažurira vreme
// }, 1000); 
// }

// function zaustaviTajmer() {
//   clearInterval(tajmer);
// }

// Provera broja preostalih karata
// if (document.querySelectorAll('.card:not(.uklonjena)').length === 0) {
  // Nema više vidljivih karata, zaustavi tajmer
//   console.log('Sve karte su uklonjene. Zaustavljam tajmer.');
//   clearInterval(tajmer);
// }


//1. fja rotiraj rotira kartu i prikazuje random odabranu sliku i fiksira je za tu poziciju
//2. fja uporedi uporedjuje dve otvorene slike (njihov alt), ako su iste ostaju otvorene,
//ako su razlicite poziva se prvi deo f-je rotiraj koji zatvara obe slike
//3. kada su sve karte otkrivene izlazi tabela sa uspehom