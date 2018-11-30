import document from "document";

export function deviceSetup() {
  let root = document.getElementById('root');
  const screenHeight = root.height //250 - Ionic, 300 - Versa
  const screenWidth = root.width
  if (screenHeight === 300) {
    console.log("Versa");
    var versaTime = document.getElementById('time');
    versaTime.y = 260;
    versaTime.style.fontSize = 72;
    var versaSec = document.getElementById('second');
    versaSec.y = 200;
    versaSec.style.fontSize = 38;
    
    
  } else { 
    console.log("ionic");
    
  }
}