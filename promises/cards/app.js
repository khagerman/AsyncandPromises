baseURL = "https://deckofcardsapi.com/api";

axios.get(`${baseURL}/deck/new/draw/?count=1`).then((data) => {
  for (card of data.data.cards) {
    console.log(`${card.value} of ${card.suit}`);
  }
});

axios
  .get(`${baseURL}/deck/new/draw/?count=1`)
  .then((d1) => {
    for (card of d1.data.cards) {
      console.log(`The first card is ${card.value} of ${card.suit}`);
    }
    return axios.get(`${baseURL}/deck/${d1.data.deck_id}/draw/`);
  })
  .then((d2) => {
    for (card of d2.data.cards) {
      console.log(`The second card is ${card.value} of ${card.suit}`);
    }
  });

let deck = 52;
let deckID = null;

axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/").then((res) => {
  console.log(res);
  deckID = res.data.deck_id;
  console.log(deckID);
  $("#draw").show();
});

$("#draw").on("click", function () {
  axios.get(`${baseURL}/deck/${deckID}/draw/?count=1`).then((c) => {
    console.log(c.data);
    $("#card").empty();
    $("#card").append(`<img src="${c.data.cards[0].image}">`);

    deck--;
    $("#cardCounter").text(deck);
  });

  if (deck === 1) {
    $("#draw").remove();
  }
});
