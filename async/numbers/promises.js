let luckyNumPromises = [];
let favoriteNum = 3;
baseURL = "http://numbersapi.com";

// 1.
async function luckyNumFact() {
  let data = await axios.get(`${baseURL}/${favoriteNum}?json`);
  console.log(data.data.text);
}
// 2.
async function manyNumFacts() {
  let data = await axios.get(`${baseURL}/1,60,93,78?json`);

  for (num of Object.values(data.data)) {
    $("#factBox").append(`<li>${num}</li>`);
  }
}
// 3.
async function manyLuckyNumFacts() {
  for (let i = 1; i < 5; i++) {
    luckyNumPromises.push(await axios.get(`${baseURL}/${favoriteNum}?json`));
  }

  luckyNumPromises.forEach((i) =>
    $("#lucky").append(`<li>${i.data.text}</li>`)
  );
}
luckyNumFact();
manyNumFacts();
manyLuckyNumFacts();
