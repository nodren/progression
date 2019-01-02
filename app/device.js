import document from "document";

export function deviceSetup() {
  let root = document.getElementById('root');
  const screenHeight = root.height //250 - Ionic, 300 - Versa
  const screenWidth = root.width
  if (screenHeight === 300) {
    console.log("Versa");
    var day = document.getElementById('day');
    day.y = 55;
    var date = document.getElementById('date');
    date.y = 85;

    var versaTime = document.getElementById('time');
    versaTime.y = 290;
    versaTime.x = 258;
    versaTime.style.fontSize = 60;
    var versaSec = document.getElementById('second');
    versaSec.y = 310;
    versaSec.x = 289;
    var ampm = document.getElementById('am-pm')
    ampm.x = 279
    ampm.y = 270

    var batteryIcon = document.getElementById('battery-icon');
    batteryIcon.x = 250;
    var batteryLine = document.getElementById('battery-line');
    batteryLine.x = 253;

    var weather = document.getElementById('weather');
    weather.style.transform = 'translate(100%-105,105)';
    
  } else { 
    console.log("ionic");
    
  }
}