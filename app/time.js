import document from "document";
import * as util from "../common/utils";
import { preferences } from "user-settings";
import { batteryLine } from "./battery";

export let root = document.getElementById('root')
export const screenHeight = root.height //250 - Ionic, 300 - Versa
export const screenWidth = root.width

export let timeProgress = document.getElementById("time-progress")
export let timeEl = document.getElementById("time");
export let secEl = document.getElementById("second");
export let amPmEl = document.getElementById("am-pm");
export let isAmPm = true;
export function setIsAmPm(val) { isAmPm = val}

//Time Draw - START
export function drawTime(now) {

  var hours = setHours(now);
  
  
  // hours = util.zeroPad(hours);
  let mins = util.zeroPad(now.getMinutes());
  let secs = util.zeroPad(now.getSeconds());
  timeEl.text = `${hours}:${mins}`;
  secEl.text = `${secs}`;

  drawTimeProgress(now);
}

export function setHours(now) {
  var hours = now.getHours();
  
  var amPm = "";
  if (preferences.clockDisplay === "12h" || isAmPm) {
    // 12h format    
    if (isAmPm) {
      if (hours < 12) {
        amPm = " AM";
      } else {
        amPm = " PM";
      }
    }
     
    amPmEl.x = screenWidth;
    amPmEl.style.display= 'inline';
    amPmEl.text = amPm;
    setDeviceTypeAmPmPosition();
    hours = hours % 12 || 12;
  } else {
    // 24h format
    timeEl.x = screenWidth-5;
    setSecDeviceTypePosition();
    amPmEl.style.display= 'none';
    hours = util.zeroPad(hours);
  }
  
  return hours
}

export function setSecDeviceTypePosition() {
   if (screenHeight === 300) {
       secEl.y = 205;
   } else {
       secEl.y = 185;
   }
}

export function setDeviceTypeAmPmPosition() {  
  if (screenHeight === 300) {
     amPmEl.y = screenHeight-18;
     amPmEl.x = screenWidth -5;
     secEl.y = 205;
  } else {
    timeEl.x = screenWidth-40;
    amPmEl.x = screenWidth;
    secEl.y = 215;
  }
  
}

export let timeLine = document.getElementById("time-line");

export function drawTimeProgress(now) {

  let progressWidth = timeProgress.getElementsByClassName("time-bg")[0].getBBox().width;
  // let level = battery.chargeLevel;
  let seconds = now.getHours() * 60 * 60;
  seconds += now.getMinutes() * 60;
  seconds += now.getSeconds()
  let timePercentage = Math.floor((seconds / 86400) * 100);
  let lineWidth = Math.floor(progressWidth*(timePercentage/100));
  timeProgress.getElementsByClassName("time-progress")[0].width = lineWidth
}

//Time Draw - END