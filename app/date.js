import document from "document"; 
import * as weekday from "../common/weekday"
import * as util from "../common/utils";
//Date - START

export let dayEl = document.getElementById("day");
export let dateEl = document.getElementById("date"); 
//Date - END

export function drawDate(now, language, format) {
  let day = now.getDate();
  let monthIndex = now.getMonth() + 1;
  let year = now.getYear() % 100;
  
  
  let dayName = weekday.getWeekdayName(language, now.getDay());

  var dateText;

  switch (format) {
    case 'uk':
      dateText= day + "." + monthIndex+ "." + year;
      break;
    case 'world':
      dateText = year + "." + monthIndex + "." + day;
      break;
    default:
    case 'us':
      dateText= monthIndex + "." + day+ "." + year;
      break;
  }
  

  dayEl.text = dayName;
  dateEl.text =  dateText;
}