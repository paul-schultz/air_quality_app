const city = "Philadelphia";
const state = "PA";
const key = 'f581b6c00e9e9ea66342d37f80690449d8713c56';

axios.get(`https://api.waqi.info/feed/${city}/?token=${key}`).then((result) => {  
  var aqi = JSON.stringify(result.data.data.aqi);
  var cig = (Math.round((aqi / 22) * 100) / 100).toFixed(2);

  if (aqi === undefined) {
    console.log(
      `I'm sorry, I don't have AQI data for ${city}, ${state}. Try a larger city nearby.`
    );
    
  } else if (cig == 1) {
    console.log(`The AQI in ${city}, ${state} is ${aqi}. That's the equivalent of smoking one cigarette.`);
    
  } else {
    console.log(
      `The AQI in ${city}, ${state} is ${aqi}. That's the equivalent of smoking ${cig} cigarettes.`
    );
    
  }
});
