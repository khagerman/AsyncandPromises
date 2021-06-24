let luckyNumPromises = [];
let favoriteNum = 3;
baseURL = "http://numbersapi.com";

// 1.
axios.get(`${baseURL}/${favoriteNum}?json`).then((data) => console.log(data));

// 2.
axios.get(`${baseURL}/1,60,93,78?json`).then((data) => {
  for (num of Object.values(data.data)) {
    $("#factBox").append(`<li>${num}</li>`);
  }
});
// 3.
for (let i = 1; i < 5; i++) {
  luckyNumPromises.push(axios.get(`${baseURL}/${favoriteNum}?json`));
}

Promise.all(luckyNumPromises).then((item) => {
  item.forEach((i) => $("#lucky").append(`<li>${i.data.text}</li>`));
});
