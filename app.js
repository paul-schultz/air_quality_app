function apiCall() {
  // DOM elements
  let forecastHeader = document.querySelector("#forecast-header");
  let aqiDisplay = document.querySelector("#aqi-display");
  let cityDisplay = document.querySelector("#city-display");
  let cigDisplay = document.querySelector("#cig-display");
  let aplDisplay = document.querySelector("#apl-display");
  let healthDisplay = document.querySelector("#health-display");
  let bgFillOne = document.querySelector("#bg-fill-1");
  let bgFillTwo = document.querySelector("#bg-fill-2");
  let bgFillThree = document.querySelector("#bg-fill-3");
  let body = document.querySelector("#body");
  let cloudFill = document.getElementsByClassName("cloud-fill");
  let foreCard = document.getElementsByClassName("fore-card");
  let foreDay = document.getElementsByClassName("fore-day");
  let output = document.querySelector('#output')

  // Input
  var input = document.querySelector("#city-name").value;
  let inputSplit = input.split(",");
  let city = inputSplit[0];
  let state = inputSplit[1];
  const key = "f581b6c00e9e9ea66342d37f80690449d8713c56";

  axios
    .get(`https://api.waqi.info/feed/${city}/?token=${key}`)
    .then((result) => {
      output.classList.add('output-visible')

      const aqiValue = result.data.data.aqi;
      var cig = (Math.round((aqiValue / 22) * 100) / 100).toFixed(2);

      forecastHeader.textContent = "Forecast:";
      cityDisplay.textContent = `${input}`;
      aqiDisplay.textContent = `AQI: ${aqiValue}`;
      cigDisplay.textContent = `A day's worth of exposure to air with an AQI of ${aqiValue} is the equivalent of smoking ${cig} cigarettes.`;

      for (var i = 0, j = 2; i <= foreCard.length - 1; i++, j++) {
        // aqi forecast value
        var aqiForecast = result.data.data.forecast.daily.pm25[j].avg;
        // date values
        var date = result.data.data.forecast.daily.pm25[j].day;
        var dateSplit = date.split("-");
        var month = dateSplit[1];
        var day = dateSplit[2];

        foreDay[i].textContent = `${month}/${day}`;

        foreCard[i].textContent = `${aqiForecast}`;
        if (0 <= aqiForecast && aqiForecast <= 50) {
          foreCard[i].style.backgroundColor = "#066613";
          foreCard[i].style.color = "#fff";
        } else if (51 <= aqiForecast && aqiForecast <= 100) {
          foreCard[i].style.backgroundColor = "#FFEE00";
          foreCard[i].style.color = "black";
        } else if (101 <= aqiForecast && aqiForecast <= 150) {
          foreCard[i].style.backgroundColor = "#FF8800";
          foreCard[i].style.color = "#fff";
        } else if (151 <= aqiForecast && aqiForecast <= 200) {
          foreCard[i].style.backgroundColor = "#CC0A1A";
          foreCard[i].style.color = "#fff";
        }
      }

      if (0 <= aqiValue && aqiValue <= 50) {
        aplDisplay.textContent = "Good";
        aqiDisplay.style.backgroundColor = "#066613";
        aqiDisplay.style.color = "#fff";
        healthDisplay.textContent =
          "Air quality is considered satisfactory, and air pollution poses little or no risk";
        bgFillOne.classList.remove(...bgFillOne.classList);
        bgFillTwo.classList.remove(...bgFillTwo.classList);
        bgFillThree.classList.remove(...bgFillThree.classList);
        bgFillOne.classList.add("bg1-fill-green");
        bgFillTwo.classList.add("bg2-fill-green");
        bgFillThree.classList.add("bg3-fill-green");
        body.classList.remove(...body.classList);
        body.classList.add("sky-blue");
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#fff";
        }
      } else if (51 <= aqiValue && aqiValue <= 100) {
        aplDisplay.textContent = "Moderate";
        aqiDisplay.style.backgroundColor = "#FFEE00";
        aqiDisplay.style.color = "black";
        healthDisplay.textContent =
          "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
        bgFillOne.classList.remove(...bgFillOne.classList);
        bgFillTwo.classList.remove(...bgFillTwo.classList);
        bgFillThree.classList.remove(...bgFillThree.classList);
        bgFillOne.classList.add("bg1-fill-yellow");
        bgFillTwo.classList.add("bg2-fill-yellow");
        bgFillThree.classList.add("bg3-fill-yellow");
        body.classList.remove(...body.classList);
        body.classList.add("sky-blue");
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#B9B9B9";
        }
      } else if (101 <= aqiValue && aqiValue <= 150) {
        aplDisplay.textContent = "Unhealthy for Sensitive Groups";
        aqiDisplay.style.backgroundColor = "#FF8800";
        healthDisplay.textContent =
          "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
        bgFillOne.classList.remove(...bgFillOne.classList);
        bgFillTwo.classList.remove(...bgFillTwo.classList);
        bgFillThree.classList.remove(...bgFillThree.classList);
        bgFillOne.classList.add("bg1-fill-orange");
        bgFillTwo.classList.add("bg2-fill-orange");
        bgFillThree.classList.add("bg3-fill-orange");
        body.classList.remove(...body.classList);
        body.classList.add("sky-orange");
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#747474";
        }
      } else if (151 <= aqiValue && aqiValue <= 200) {
        aplDisplay.textContent = "Unhealthy";
        aqiDisplay.style.backgroundColor = "#CC0A1A";
        aqiDisplay.style.color = "#fff";
        healthDisplay.textContent =
          "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects";
        bgFillOne.classList.remove(...bgFillOne.classList);
        bgFillTwo.classList.remove(...bgFillTwo.classList);
        bgFillThree.classList.remove(...bgFillThree.classList);
        bgFillOne.classList.add("bg1-fill-red");
        bgFillTwo.classList.add("bg2-fill-red");
        bgFillThree.classList.add("bg3-fill-red");
        body.classList.remove(...body.classList);
        body.classList.add("sky-red");
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#747474";
        }
      }
    });
}

document.querySelector("#location-form").addEventListener("submit", (e) => {
  apiCall();
  e.preventDefault();
});
