/* Global Variables */
const key = "us&appid=fc0b4b1be4519f6a93062ae29e065822";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getData = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// send data to server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const requestData = async () => {
    const response = await fetch('/data');
    return response.json();
  }
  
function performAction(e) {
  const getZip = `${document.getElementById("zip").value},`;
  const getFeelings = document.getElementById("feelings").value;

  getData(baseURL, getZip, key)
  .then(res => {
    const newData = {
      temp: Math.ceil((res.main.temp - 273.15) * 9/5 + 32) + '°F', 
      date: newDate,
      main: res.weather['0'].main,
      icon: `http://openweathermap.org/img/wn/${res.weather['0'].icon}.png`,
      feeling: getFeelings
    }
    return newData
  })
  .then(res => {
    postData('/', res)
  })
  .then(createJournalEntry)
  resetTextValue('zip');
  resetTextValue('feelings');
}

const resetTextValue = (id) => {
  document.getElementById(`${id}`).value = "";
};


const createJournalEntry = async () => {

  const userEntry = await fetchData('/data');
  console.log(userEntry[userEntry.length - 1].feeling)

  const entriesTitle = document.querySelector(".title");
  const entriesContainer = document.createElement("div");
  const entriesImageContainer = document.createElement("div");
  const entriesImg = document.createElement("img");
  const entriesDataContainer = document.createElement("div");
  const entriesDataDate = document.createElement("p");
  const entriesDataTemp = document.createElement("p");
  const entriesDataFeeling = document.createElement("p");

  entriesContainer.setAttribute("class", "entries-container");
  entriesImageContainer.setAttribute("class", "entries-icon-container");
  entriesImg.setAttribute("class", "entries-icon");
  entriesImg.setAttribute("src", userEntry[userEntry.length - 1].icon);
  entriesDataContainer.setAttribute("class", "entries-data-container");
  entriesDataDate.setAttribute("class", "entries-data-date");
  entriesDataTemp.setAttribute("class", "entries-data-temp");
  entriesDataFeeling.setAttribute("class", "entries-data-feeling");

  entriesDataDate.innerHTML = userEntry[userEntry.length - 1].date;
  entriesDataTemp.innerHTML = userEntry[userEntry.length - 1].temp;
  entriesDataFeeling.innerHTML = userEntry[userEntry.length - 1].feeling;

  entriesDataContainer.insertAdjacentElement("afterbegin", entriesDataFeeling);
  entriesDataContainer.insertAdjacentElement("afterbegin", entriesDataTemp);
  entriesDataContainer.insertAdjacentElement("afterbegin", entriesDataDate);
  entriesImageContainer.insertAdjacentElement("afterbegin", entriesImg);

  entriesContainer.insertAdjacentElement("afterbegin", entriesDataContainer);
  entriesContainer.insertAdjacentElement("afterbegin", entriesImageContainer);

  entriesTitle.insertAdjacentElement("afterend", entriesContainer);
};



const fetchData = async (url) => {

  try {
      const request = await fetch(url);
      const data = await request.json()
      console.log(request);
      if (!request.ok) {
          console.log('an error has occured');
      } return data;
  }
  catch (error) {
      console.log("error", error);
  }
}

document.getElementById("app_entry--submit").addEventListener("click", performAction);
