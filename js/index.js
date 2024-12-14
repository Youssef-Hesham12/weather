
var searchInput = document.getElementById('search');
var getall={};
document.addEventListener("DOMContentLoaded", async function () {
    
    const defaultLocation = "Cairo";
    await fetchWeatherData(defaultLocation);
});
async function fetchWeatherData(query) {
    try {
        const getdata = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9b1df94a6f91458594b222226241012&q=${query}&days=7`);
        const data = await getdata.json();
        
        const dateobj = new Date();
        getall = data;

        cartona1data(getall.current, getall.location.name);
        cartona2data(getall.forecast.forecastday[1]);
        cartona3data(getall.forecast.forecastday[2]);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
searchInput.addEventListener("keyup",async(event)=>{
    const query=event.target.value;
    await fetchWeatherData(query);
});
function formatDateAndDay(inputDate) {
    
    const dateObj = new Date(inputDate);


    if (isNaN(dateObj)) {
        console.error("Invalid date format");
        return;
    }

    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dateObj.getDay()];

   
    const options = { day: "numeric", month: "long" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return { dayName, formattedDate };
}
function cartona1data(data,data2){
   
    var { dayName, formattedDate } = formatDateAndDay(data.last_updated.split(" ")[0])
    var cartona1=`<div class="forecast-header" id="today">
    <div class="day">${dayName}</div>
    <div class=" date">${formattedDate}</div>
    </div> 
    <div class="forecast-content" id="current">
    <div class="location">${data2}</div>
    <div class="degree">
        <div class="num">${data.temp_c}<sup>o</sup>C</div>
      
        <div class="forecast-icon">
            <img class="w-100" src="${data.condition.icon}" alt="" >
        </div>	
    
    </div>
    <div class="custom">${data.condition.text}</div>
    <span><img src="/Images/icon-umberella.png" alt=""> ${data.cloud}%</span>
<span><img src="/Images/icon-wind.png" alt=""> ${data.wind_kph}Km/h</span>
<span><img src="/Images/icon-compass.png" alt=""> ${data.wind_dir}</span>
    </div>  	`;
    document.getElementById('todayinfo').innerHTML = cartona1;
}
function cartona2data(data){
    
    var { dayName, formattedDate } = formatDateAndDay(data.date)
   
var cartona2=` 
    <div class="forecast-header">
        <div class="day">${dayName}</div>
    </div> 
    <div class="forecast-content">
        <div class="forecast-icon">
            <img src="${data.day.condition.icon}" alt="" width="48">
        </div>
        <div class="degree">${data.day.maxtemp_c}<sup>o</sup>C</div>
        <small>${data.day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${data.day.condition.text}</div>
    </div>
                   	`;
                    document.getElementById('tod2').innerHTML = cartona2;

                }

function cartona3data(data){
    
    var { dayName, formattedDate } = formatDateAndDay(data.date)
   
var cartona3=` 
    <div class="forecast-header">
        <div class="day">${dayName}</div>
    </div> 
    <div class="forecast-content">
        <div class="forecast-icon">
            <img src="${data.day.condition.icon}" alt="" width="48">
        </div>
        <div class="degree">${data.day.maxtemp_c}<sup>o</sup>C</div>
        <small>${data.day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${data.day.condition.text}</div>
    </div>
                   	`;
                    document.getElementById('tod3').innerHTML = cartona3;

                }



