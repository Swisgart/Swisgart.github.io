
const input = document.querySelector('.input')
const container = document.querySelector('.container')
const clock = document.querySelector('.clock')
const dateToday = document.querySelector('.date-block')
let DATE = new Date()
let currentMounth = DATE.toLocaleString('en', { month: 'long' }).toLowerCase()
let season = ''


function getSeason (mounth) {
  
  if(mounth === 'december' || mounth === 'january' || mounth === 'february') {
    season = 'winter'
  } else if (mounth === 'march' || mounth === 'april' || mounth === 'may') {
    season = 'spring'
  } else if (mounth === 'june' || mounth === 'july' || mounth === 'august') {
    season = 'summer'
  } else if (mounth === 'september' || mounth === 'october' || mounth === 'november') {
    season = 'autumn'
  }


  
  return season  = season
}

getSeason(currentMounth)

navigator.geolocation.getCurrentPosition(function(position) {
  const { latitude, longitude } = position.coords
  renderCardLocation(latitude, longitude)
})

function renderCardLocation (lat, lon) {
  lat = lat.toFixed(2)
  lon = lon.toFixed(2)

  let link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3b48499f6bce2380ba62fff6014c547c&units=metric`
  fetch(link).then((resp) => resp.json())
  .then(function (data) {
    console.log(data);
    let temterature = Math.round(data.main.temp)
    document.querySelector('.city').textContent = data.name
    document.querySelector('.temperature').textContent = `${temterature}°C`
  })

}



input.addEventListener('keydown', function (key) {

  if (key.keyCode === 13) {
    console.log(input.value);
    
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value.trim()}&appid=3b48499f6bce2380ba62fff6014c547c&units=metric`
    let datas = {
    }

    fetch(url).then((resp) => resp.json())
      .then(function (data) {
        let temterature = Math.round(data.main.temp)
        let date = new Date()
        let mounth = date.toLocaleString('en', { month: 'long' })
        let dayOFWeek = date.toLocaleString('en-US', { weekday: 'long' });
        let isItRain = data.weather[0].main
        console.log(data);
        document.querySelector('.city').textContent = data.name.toUpperCase()
        document.querySelector('.temperature').textContent = `${temterature}°C`
        // document.querySelector('.date').textContent = `${date.getDate()} ${mounth} ${date.getFullYear()}`
        // document.querySelector('.rain').textContent = `${isItRain}`
        // document.querySelector('.day').textContent = `${dayOFWeek} ${date.getHours()}:${date.getMinutes()}`

        if(season === 'summer') {
          // clock.style.fontFamily = 'sans serif'
          if (isItRain === 'Rain') {
            container.style.backgroundImage = 'url(./images/summer/rain.jpg)'
            document.querySelector('.rain').textContent = `Дождь`
            
          } else if (isItRain === 'Clouds') {
            container.style.backgroundImage = 'url(./images/summer/clouds.jpg)'
            document.querySelector('.rain').textContent = `Облачно`
          } else if (isItRain === 'Clear') {
            document.querySelector('.rain').textContent = `Ясно`
            container.style.backgroundImage = 'url(./images/summer/clear.jpg)'
          }

          console.log(url);
        }

      })
      
      input.value = ''
  }
})

function getTime() {
  setInterval(function () {
    clock.textContent = new Date().toLocaleTimeString()
    dateToday.textContent = new Date().toLocaleDateString()
  }, 1000)
}
getTime()


