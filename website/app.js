/* Global Variables */
let key = 'us&appid=fc0b4b1be4519f6a93062ae29e065822';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const results = [];


const getData = async (baseURL, zip, key) => {
  const res = await fetch(baseURL+zip+key)

  try {
    const data = await res.json();
    const newData = {
      temp: Math.ceil((data.main.temp - 273.15) * 9/5 + 32), 
      date: newDate,
      main: data.weather['0'].main,
      icon: `http://openweathermap.org/img/wn/${data.weather['0'].icon}.png`,
      feeling: 'happy'
    }
     return postData('/', newData);
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

function performAction(e){

// const getZip =  document.getElementById('zip').value;
const getZip = `${document.getElementById('zip').value},`;
getData(baseURL, getZip, key, newDate);
document.getElementById('zip').value = '';

}



// send data to server
const postData = async (url = '', data = {}) => {
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header     
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch( error) {
    console.log("error", error);
    }
}

postData('/', getData);

document.getElementById('generate').addEventListener('click', performAction);
