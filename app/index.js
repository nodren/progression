
import document from "document";
import { display } from "display";
import clock from "clock";

import * as device from "./device.js"
import * as date from "./date.js"
import * as battery from "./battery.js"
import * as time from "./time.js"
import * as hr from "./hr.js"
import * as activity from "./activity.js"
import * as settings from "./settings.js"
import * as state from "./state.js"
import * as weather from "./weather.js"

clock.granularity = "seconds";
settings.loadSettings();
display.onchange = state.applyState;
device.deviceSetup();
clock.ontick = (evt) => {
  weather.getWeather(evt.date, settings.temperatureUnit);
  time.drawTime(evt.date);
  date.drawDate(evt.date, settings.language, settings.dateFormat);
  activity.drawAllProgress();
  battery.drawBat();
}