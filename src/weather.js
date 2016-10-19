$(document).ready(function() {
  // if user allows geolocation data to be used
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day = date + ' ' + month;
    return day;
  };

  var currentTemp,
    currentMin,
    currentMax,
    currentCondition,
    currentHumidity,
    dayOne,
    dayOneIcon,
    dayTwo,
    dayTwoIcon,
    dayThree,
    dayThreeIcon,
    dayFour,
    dayFourIcon,
    dayFive,
    dayFiveIcon,
    cityName,
    icon;
  // main info function ------------------------------------------
  function populateMainInfo() {
    $('#mainIcon').html("<img height='12%' width='12%' src='http://openweathermap.org/img/w/" + icon + ".png'</img>");
    $('#cityName').html(JSON.stringify(cityName).replace(/[^A-Za-z0-9]/g, ' '));
    $('#temp').html(JSON.stringify(Math.round(currentTemp))).append('&deg;F');
    $('#celsius').click(function() {
      $('#temp').html(JSON.stringify(Math.round((((currentTemp - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('#temp').html(JSON.stringify(Math.round(currentTemp))).append('&deg;F');
    });
    $('#low').html(JSON.stringify(Math.round(currentMin))).append('&deg;F');
    $('#celsius').click(function() {
      $('#low').html(JSON.stringify(Math.round((((currentMin - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('#low').html(JSON.stringify(Math.round(currentMin))).append('&deg;F');
    });
    $('#high').html(JSON.stringify(Math.round(currentMax))).append('&deg;F');
    $('#celsius').click(function() {
      $('#high').html(JSON.stringify(Math.round((((currentMax - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('#high').html(JSON.stringify(Math.round(currentMax))).append('&deg;F');
    });
    $('#condition').html(JSON.stringify(currentCondition).replace(/[^A-Za-z0-9]/g, ' '));
    $('#humidity').html(JSON.stringify(currentHumidity)).append('% humidity');
    $('.loadingMsg').addClass('hidden');
    $('#header, #main, #forecastContainer, #showFiveDay, footer').removeClass('hidden');
  }

  // five day info function ---------------------------------------
  function populateFiveDay() {
    $('.five-day-one').html(JSON.stringify(Math.round(dayOne.main.temp))).append('&deg;F');
    $('#celsius').click(function() {
      $('.five-day-one').html(JSON.stringify(Math.round((((dayOne.main.temp - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('.five-day-one').html(JSON.stringify(Math.round(dayOne.main.temp))).append('&deg;F');
    });
    $('.dayOne').html(JSON.stringify(timeConverter(dayOne.dt)).replace(/[^A-Za-z0-9]/g, ' '));
    $('.dayOneIcon').html(("<img src='http://openweathermap.org/img/w/" + dayOneIcon + ".png'</img>"));
    $('.five-day-two').html(JSON.stringify(Math.round(dayTwo.main.temp))).append('&deg;F');
    $('#celsius').click(function() {
      $('.five-day-two').html(JSON.stringify(Math.round((((dayTwo.main.temp - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('.five-day-two').html(JSON.stringify(Math.round(dayTwo.main.temp))).append('&deg;F');
    });
    $('.dayTwo').html(JSON.stringify(timeConverter(dayTwo.dt)).replace(/[^A-Za-z0-9]/g, ' '));
    $('.dayTwoIcon').html(("<img src='http://openweathermap.org/img/w/" + dayTwoIcon + ".png'</img>"));
    $('.five-day-three').html(JSON.stringify(Math.round(dayThree.main.temp))).append('&deg;F');
    $('#celsius').click(function() {
      $('.five-day-three').html(JSON.stringify(Math.round((((dayThree.main.temp - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('.five-day-three').html(JSON.stringify(Math.round(dayThree.main.temp))).append('&deg;F');
    });
    $('.dayThree').html(JSON.stringify(timeConverter(dayThree.dt)).replace(/[^A-Za-z0-9]/g, ' '));
    $('.dayThreeIcon').html(("<img src='http://openweathermap.org/img/w/" + dayThreeIcon + ".png'</img>"));
    $('.five-day-four').html(JSON.stringify(Math.round(dayFour.main.temp))).append('&deg;F');
    $('#celsius').click(function() {
      $('.five-day-four').html(JSON.stringify(Math.round((((dayFour.main.temp - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('.five-day-four').html(JSON.stringify(Math.round(dayFour.main.temp))).append('&deg;F');
    });
    $('.dayFour').html(JSON.stringify(timeConverter(dayFour.dt)).replace(/[^A-Za-z0-9]/g, ' '));
    $('.dayFourIcon').html(("<img src='http://openweathermap.org/img/w/" + dayFourIcon + ".png'</img>"));
    $('.five-day-five').html(JSON.stringify(Math.round(dayFive.main.temp))).append('&deg;F');
    $('#celsius').click(function() {
      $('.five-day-five').html(JSON.stringify(Math.round((((dayFive.main.temp - 32) * 5) / 9)))).append('&deg;C');
    });
    $('#fahrenheit').click(function() {
      $('.five-day-five').html(JSON.stringify(Math.round(dayFive.main.temp))).append('&deg;F');
    });
    $('.dayFive').html(JSON.stringify(timeConverter(dayFive.dt)).replace(/[^A-Za-z0-9]/g, ' '));
    $('.dayFiveIcon').html(("<img src='http://openweathermap.org/img/w/" + dayFiveIcon + ".png'</img>"));
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?';
      //var crossOriginAddon = 'https://crossorigin.me/';
      var forecastUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast?';
      var lon = '&lon=' + position.coords.longitude;
      var lat = '&lat=' + position.coords.latitude;
      var units = '&units=imperial';
      var apiKey = '&APPID=34dd8ef89cc4a71e5ca4695bef3da4e2';
      var currentLocationWeather = currentUrl + lat + lon + apiKey;
      var currentLocationForecast = forecastUrl + lat + lon + apiKey;

      // current location function for current weather and 5 day forecast
      function yourLocationWeather() {
        // call for current location current weather
        $.getJSON(currentUrl + lat + lon + units + apiKey, function(json) {
            currentTemp = json.main.temp;
            currentMin = json.main.temp_min;
            currentMax = json.main.temp_max;
            currentCondition = json.weather[0].description;
            currentHumidity = json.main.humidity;
            cityName = json.name;
            icon = json.weather[0].icon;
            populateMainInfo();

            // call for 5 day forecast for current location
            $.getJSON(forecastUrl + lat + lon + units + apiKey, function(json) {
              dayOne = json.list[0];
              dayOneIcon = dayOne.weather[0].icon;
              dayTwo = json.list[8];
              dayTwoIcon = dayTwo.weather[0].icon;
              dayThree = json.list[16];
              dayThreeIcon = dayThree.weather[0].icon;
              dayFour = json.list[24];
              dayFourIcon = dayFour.weather[0].icon;
              dayFive = json.list[32];
              dayFiveIcon = dayFive.weather[0].icon;
              populateFiveDay();
            });
          })
          // call for current location 5 day forecast
      };

      // call for current locatition weather and forecast
      yourLocationWeather();

      // function for city specific current weather and 5 day forecast
      function citySpecificWeather() {
        var currentUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?';
        var forecastUrl = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast?';
        var units = '&units=imperial';
        var apiKey = '&APPID=34dd8ef89cc4a71e5ca4695bef3da4e2';
        var city = 'q=' + $('#city').val();
        $.getJSON(currentUrl + city + units + apiKey, function(json) {
            currentTemp = json.main.temp;
            currentMin = json.main.temp_min;
            currentMax = json.main.temp_max;
            currentCondition = json.weather[0].description;
            currentHumidity = json.main.humidity;
            cityName = json.name;
            icon = json.weather[0].icon;
            populateMainInfo();
            $.getJSON(forecastUrl + city + units + apiKey, function(json) {
              dayOne = json.list[0];
              dayOne
              dayTwo = json.list[8];
              dayThree = json.list[16];
              dayFour = json.list[24];
              dayFive = json.list[32];
              populateFiveDay();
            });
          })
          // call for city specific 5 day forecast 
      };


      $('#city').keydown(function(e) {
        if (e.keyCode === 13) { // If Enter key pressed
          citySpecificWeather();
        }
      });

      // on submit event for retrieving the city specific weather and forecast
      $('#citySearch').on('click', function(e) {
        e.preventDefault();
        // call to retrieve city specifif weather and forecast
        citySpecificWeather();
      })
    });
  }
  else {
    $('.loadingMsg').addClass('hidden');
    $('#header, #main, #forecastContainer, #showFiveDay, footer').removeClass('hidden');
    function citySpecificWeather() {
      var currentUrl = 'http://api.openweathermap.org/data/2.5/weather?';
      var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
      var units = '&units=imperial';
      var apiKey = '&APPID=34dd8ef89cc4a71e5ca4695bef3da4e2';
      var city = 'q=' + $('#city').val();
      $.getJSON(currentUrl + city + units + apiKey, function(json) {
        currentTemp = json.main.temp;
        currentMin = json.main.temp_min;
        currentMax = json.main.temp_max;
        currentCondition = json.weather[0].description;
        currentHumidity = json.main.humidity;
        populateMainInfo();
      });

      // call for city specific 5 day forecast 
      $.getJSON(forecastUrl + city + units + apiKey, function(json) {
        dayOne = json.list[0];
        dayTwo = json.list[8];
        dayThree = json.list[16];
        dayFour = json.list[24];
        dayFive = json.list[32];
        populateFiveDay();
      });
    };
    $('#citySearch').on('submit', function(e) {
      e.preventDefault();
      citySpecificWeather();
    })
  }
  
  $('#showFiveDay').click(function() {
    $('#header, #main, #forecastContainer, #showFiveDay, footer').addClass('hidden');
    $('#forecastContainerFullPage').removeClass('hidden');
  })
  $('#back').click(function() {
    $('#header, #main, #forecastContainer, #showFiveDay, footer').removeClass('hidden');
    $('#forecastContainerFullPage').addClass('hidden');
  })
});