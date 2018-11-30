import { display } from "display";
import * as date from "./date.js"
import * as battery from "./battery.js"
import * as time from "./time.js"
import * as hr from "./hr.js"
import * as activity from "./activity.js"

export function applyState() {
  if (display.on) {
    applyHRState();
    applyProgressState();
  } else {
    applyStopState();
  }
}

export  function applyStopState() {
    hr.hrm.stop();
    hr.hideHr();  
    clearInterval(activity.fastProgressInterval); 
}
export function applyHRState() {
     hr.hrm.start();
    if (activity.isFastProgress) {
      activity.initFastProgressInterval()
    } else {
      clearInterval(activity.fastProgressInterval);
    }

    if (!hr.hrmRate) {
      hr.hideHr()
    } else if(!hr.isHeartbeatAnimation) {
      hr.stopHrAnimation();
    }
}

export function applyProgressState() {
    activity.drawAllProgress();

}
