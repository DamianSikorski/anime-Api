const img = document.querySelector(".anime-img");
const GenerateRandomAnimeBtn = document.querySelector(
  ".generate-random-anime "
);
let randomName;
const animeInfo = document.querySelector(".anime-name");
const genrateRandomFactBtn = document.querySelector(".generate-random-fact");
const randomFactInfo = document.querySelector(".random-fact");
const factHeader = document.querySelector(".fact-about");

const genrateRandomName = () => {
  randomName = ~~(Math.random() * 11).toFixed();
  if (randomName == 3) {
    randomName == 4;
  }
};

mainApi = "https://anime-facts-rest-api.herokuapp.com/api/v1";

let animeName;
let animeImg;
let URL;

async function getAnimeList() {
  try {
    const res = await fetch(mainApi);
    const data = await res.json();
    genrateRandomName();
    //beacuse this API has wrong values in array in this place whcich is causing app to crash //
    data.data.splice(3, 1);
    console.log(data);
    animeName = data.data[randomName].anime_name;
    animeImg = data.data[randomName].anime_img;
    animeInfo.textContent = animeName;
    URL = `https://anime-facts-rest-api.herokuapp.com/api/v1/${animeName}`;
    setImg();
  } catch {
    (err) => {
      console.log(err);
    };
  }
}

const setImg = () => {
  img.setAttribute("src", animeImg);
  img.setAttribute("alt", animeName);
};

getAnimeList();

let randomFactNumber;

const randomFact = (length) => {
  randomFactNumber = ~~(Math.random() * length).toFixed();
};

async function getFact() {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    randomFact(data.data.length - 1);
    console.log(data);
    randomFactInfo.textContent = data.data[randomFactNumber].fact;
    factHeader.textContent = `Fact about: ${animeName}`;
  } catch {
    (err) => {
      console.log(err);
    };
  }
}

GenerateRandomAnimeBtn.addEventListener("click", getAnimeList);
genrateRandomFactBtn.addEventListener("click", getFact);
