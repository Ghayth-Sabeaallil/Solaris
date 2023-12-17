/**
 * @author Ghayth Sabeaallil
 * @subject FronEnd23
 * @description This js file is to get data as json using api and set the data on a html page using DOM.
 * Note: All planets open on a new tab when you click on them, and to close the tab click on the planet on the side.
 * Note: Each planet has his own url with his name, so it allows you to open many tabs (many planets) and see many planets at the sametime and compare between them.
 * @date 01/11/2023
 */
const planetName = document.getElementById("title"); // Name of the planet
const planetLatinName = document.getElementById("sub-title"); // Sub name of the planet
const planetInfo = document.getElementById("info-box"); // Information about the planet
const planetPerimeter = document.getElementById("perimeter-num"); // Perimeter of the planet
const planetDes = document.getElementById("des-num"); // Destination to the sun
const planetMaxTmp = document.getElementById("max-tmp-num"); // Max temperature
const planetMinTmp = document.getElementById("min-tmp-num"); // Min temperature
const planetMoons = document.getElementById("moon-name"); // Moons
const sun1 = document.getElementById("sun1"); // the samllest sun
const sun2 = document.getElementById("sun2"); // middle sun
const sun3 = document.getElementById("sun3"); // last sun

// Get the color of the planet
let colors = [
  { name: "Solen", color: "#FFD029" },
  { name: "Merkurius", color: "#888888" },
  { name: "Venus", color: "#E7CDCD" },
  { name: "Jorden", color: "#428ED5" },
  { name: "Mars", color: "#EF5F5F" },
  { name: "Jupiter", color: "#E29468" },
  { name: "Saturnus", color: "#C7AA72" },
  { name: "Uranus", color: "#C9D4F1" },
  { name: "Neptunus", color: "#7A91A7" },
];

// Base api URL
let apiUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

/* get the name of planet from the url */
function NameOfPlanet() {
  let url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (let i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  return data.planet;
}

/* function to get the key */
const fetchKey = async () => {
  try {
    document.title = NameOfPlanet(); // set planet name to tab title
    let resp = await fetch(`${apiUrl}/keys`, {
      method: "POST",
    });
    const data = await resp.json();
    return data.key;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/* function to get all data (fetchData) using api-key */
const fetchData = async () => {
  try {
    document.title = NameOfPlanet();
    let resp = await fetch(`${apiUrl}/bodies`, {
      method: "GET",
      headers: {
        "x-zocom": await fetchKey(),
      },
    });
    const data = await resp.json();
    data.bodies.forEach((element) => {
      console.log(element);
      if (element.name == NameOfPlanet()) {
        setData(element);
      }
    });
    colors.forEach((element) => {
      if (element.name == NameOfPlanet()) {
        setColor(element.color);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

/* function to set the color of planet */
function setColor(color) {
  sun1.style.fill = color;
  sun2.style.fill = color;
  sun3.style.fill = color;
}

/* function to set the info of planet using DOM */
function setData(element) {
  planetName.innerHTML = element.name;
  planetLatinName.innerHTML = element.latinName;
  planetInfo.innerHTML = element.desc;
  planetPerimeter.innerHTML = element.circumference + " km";
  planetDes.innerHTML = element.distance + " km";
  planetMaxTmp.innerHTML = element.temp.day;
  planetMinTmp.innerHTML = element.temp.night;
  planetMoons.innerHTML = element.moons.join(", ");
}

/* function to close the tab */
function closeWindow() {
  window.close();
}

// call the function to get the data
fetchData();
// call the function to set the color
setColor();
