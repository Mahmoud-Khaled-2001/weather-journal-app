/* Global Variables */
//form inputs
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const submit = document.getElementById("generate");
//holder
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");
const contentHolder = document.getElementById("content");
// Personal API Key for OpenWeatherMap API

const weatherJournalUrl =
  "https://api.openweathermap.org/data/2.5/weather?zip=";
const id = "&APPID=4568819ea4461253d7008759296973cd";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
let isValid = false;
zipInput.oninput = () => {
  isValid = zipInput.value.trim().length !== 0;
};

submit.addEventListener("click", onSubmitHandler);

/* Function called by event listener */
function onSubmitHandler(event) {
  event.preventDefault();
  //get data from user
  if (isValid) {
    const zipCode = zipInput.value;
    const feeling = document.getElementById("feelings").value;
    getDataWeatherHandler(weatherJournalUrl, id, zipCode).then((data) => {
      //post data to server
      sendDataToServer("/send-data", {
        temp: data.main.temp,
        date: newDate,
        content: feeling,
      }).then(() => {
        //ubdate content
        updateHolder();
      });
    });
    zipInput.value = "";
    feelingsInput.value = "";
  } else {
    // console.log("enter");
  }
}

/* Function to GET Web API Data*/
async function getDataWeatherHandler(url, api, zip) {
  console.log(url + zip + api);
  const result = await fetch(url + zip + api);
  try {
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

/* Function to POST data */
async function sendDataToServer(url, data) {
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temp: data.temp,
        date: data.date,
        content: data.content,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}
/* Function to GET Project Data */
async function updateHolder() {
  const result = await fetch("/all");
  try {
    // console.log(result);
    const { temp, date, content } = await result.json();
    // console.log(temp);
    // console.log(date);
    // console.log(content);
    tempHolder.innerHTML = temp;
    dateHolder.innerHTML = date;
    contentHolder.innerHTML = content;
    document.querySelector(".entry").classList.add("show")
  } catch (error) {
    console.log(error);
  }
}
