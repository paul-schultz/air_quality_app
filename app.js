function apiCall() {
  // DOM elements
  let aqiDisplay = document.querySelector('#aqi-display');
  let cityDisplay = document.querySelector('#city-display');
  let cigDisplay = document.querySelector('#cig-display');
  let aplDisplay = document.querySelector('#apl-display');
  let healthDisplay = document.querySelector('#health-display');
  let bgFillOne = document.querySelector('#bg-fill-1');
  let bgFillTwo = document.querySelector('#bg-fill-2');
  let bgFillThree = document.querySelector('#bg-fill-3');
  let body = document.querySelector('#body');
  let cloudFill = document.getElementsByClassName('cloud-fill');
  
  // Input
  var input = document.querySelector('#city-name').value;
  let inputSplit = input.split(",")
  let city = inputSplit[0]
  let state = inputSplit[1]
  const key = "f581b6c00e9e9ea66342d37f80690449d8713c56";

  axios.get(`https://api.waqi.info/feed/${city}/?token=${key}`).then((result) => {
      const aqiValue = result.data.data.aqi;
      var cig = (Math.round((aqiValue / 22) * 100) / 100).toFixed(2);
      
      cityDisplay.textContent = `${input}`;
      aqiDisplay.textContent = `AQI: ${aqiValue}`;
      cigDisplay.textContent = `A day's worth of exposure to air with an AQI ${aqiValue} is the equivalent of smoking ${cig} cigarettes.`;
      
      if ( 0 <= aqiValue && aqiValue <= 50 ) {
        aplDisplay.textContent = "Good";
        aqiDisplay.style.backgroundColor = "#066613";
        aqiDisplay.style.color = "#fff";
        healthDisplay.textContent = "Air quality is considered satisfactory, and air pollution poses little or no risk";
        bgFillOne.style.fill = "#066613";
        bgFillTwo.style.fill = "#0B7D1A";
        bgFillThree.style.fill = "#09DE25";
        body.style.backgroundColor = "#2CBDBB"
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#fff";
        }
      } else if ( 51 <= aqiValue && aqiValue <= 100 ) {
        aplDisplay.textContent = "Moderate";
        aqiDisplay.style.backgroundColor = "#FFEE00";
        aqiDisplay.style.color = "black";
        healthDisplay.textContent = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
        bgFillOne.style.fill = "#FFEE00";
        bgFillTwo.style.fill = "#DBD032";
        bgFillThree.style.fill = "#F0E659";
        body.style.backgroundColor = "#2CBDBB"
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#B9B9B9";
        }
      } else if ( 101 <= aqiValue && aqiValue <= 150 ) {
        aplDisplay.textContent = "Unhealthy for Sensitive Groups";
        aqiDisplay.style.backgroundColor = "#FF8800";
        healthDisplay.textContent = "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
        bgFillOne.style.fill = "#FF8800";
        bgFillTwo.style.fill = "#FF9B29";
        bgFillThree.style.fill = "#DEA059";
        body.style.backgroundColor = "#AD722F"
        for (var i = 0; i <= cloudFill.length - 1; i++) {
          cloudFill[i].style.fill = "#747474";
        }
      } else if ( 151 <= aqiValue && aqiValue <= 200 ) {
        aplDisplay.textContent = "Unhealthy";
        aqiDisplay.style.backgroundColor = "#CC0A1A";
        healthDisplay.textContent = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects";
        bgFillOne.style.fill = "#CC0A1A";
        bgFillTwo.style.fill = "#8A1A23";
        bgFillThree.style.fill = "#8A1A23";
        body.style.backgroundColor = "#DD724E"
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
