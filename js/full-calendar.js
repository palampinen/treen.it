var daysInMonth = function(month,year) {
    return new Date(year, month, 0).getDate();
}

var isWeekEnd = function isWeekEnd(d,m,y) {
	var candidate = new Date(y, m, d).getDay();
	return ( candidate == 0 || candidate == 6)
}

// fills the month table with numbers
function getMonthCalendar(monthName,monthIndex,year)
{
	
  var today= new Date(year,monthIndex,1),	 // 0 to month
	  start_day,
	  day=1
	  month_length = daysInMonth(monthIndex+1,year),
	  monthObj = {},
	  tmpArray = [],
	  text = '';

	  
  // Monday first, Sunday last
  (today.getDay() == 0) ? start_day = 7 : start_day = today.getDay();

  
  monthObj.title 	  = monthName + ' ' + year;
  monthObj.monthIndex = monthIndex+1;
  monthObj.year		  = year;
  monthObj.headings   = [ 'Ma','Ti','Ke','To','Pe','La','Su'];

  
  
  for (var i=1;i<start_day;i++){
		tmpArray.push( {
			text:'',
			link:false,
			weekend: false
		})
  }
  // fill the first week of days
  for (var i=start_day;i<8;i++){
		tmpArray.push( {
			text:day,
			link:false,
			weekend: isWeekEnd(day,monthIndex,year)
		})
		
        day++
  }
  monthObj.weeks = []
  monthObj.weeks.push(tmpArray)

  
  // fill the remaining weeks
  while (day <= month_length) {
	 tmpArray = [];
     for (var i=1;i<=7;i++){
		(day > month_length ) ? text = '' : text = day;
		tmpArray.push( {
			text:text,
			link:false,
			weekend: isWeekEnd(day,monthIndex,year)
		});
		
		day++
     }
	 monthObj.weeks.push(tmpArray)
  }

  return monthObj
}
// end hiding -->



/*
var kesakuu = getMonthCalendar("Kesä",5,2014)
console.log(kesakuu);
*/