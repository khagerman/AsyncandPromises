baseURL = "https://deckofcardsapi.com/api";
async function getCard() {
  data = await axios.get(`${baseURL}/deck/new/draw/?count=1`);
  for (card of data.data.cards) {
    console.log(`${card.value} of ${card.suit}`);
  }
}

async function getTwoCards() {
  let card1 = await axios.get(`${baseURL}/deck/new/draw/?count=2`);
  let i = 0;
  for (card of card1.data.cards) {
    i++;
    console.log(
      `The ${i === 1 ? "first" : "second"} card is ${card.value} of ${
        card.suit
      }`
    );
  }
}
let deck = 52;
let deckID = null;

async function shuffle() {
  let shuffle = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/"
  );
  deckID = shuffle.data.deck_id;
  $("#draw").show();
}

$("#draw").on("click", async function () {
  try {
    let res = await axios.get(`${baseURL}/deck/${deckID}/draw/?count=1`);

    $("#card").empty();
    $("#card").append(`<img src="${res.data.cards[0].image}">`);

    deck--;
    $("#cardCounter").text(deck);

    if (deck === 1) {
      $("#draw").remove();
    }
  } catch (e) {
    console.log(e);
  }
});
getCard();
getTwoCards();
shuffle();
