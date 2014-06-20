
// fill the month table with column headings
function day_title(day_name){
     document.write("<TD ALIGN=center WIDTH=35>"+day_name+"</TD>")
}
// fills the month table with numbers
function fill_table(month,month_length)
{
  day=1
  // begin the new month table
  document.write("<TABLE BORDER=1 CELLSPACING=0 CELLPADDING=%0><TR>")
  document.write("<TD COLSPAN=7 ALIGN=center><B>"+month+"   "+year+"</B><TR>")
  // column headings
  day_title("Su")
  day_title("Ma")
  day_title("Ti")
  day_title("Ke")
  day_title("To")
  day_title("Pe")
  day_title("La")
  // pad cells before first day of month
  document.write("</TR><TR>")
  

  
  for (var i=1;i<start_day;i++){
        document.write("<TD>")
  }
  // fill the first week of days
  for (var i=start_day;i<8;i++){
        document.write("<TD ALIGN=center>"+day+"</TD>")
        day++
  }
  document.write("<TR>")
  // fill the remaining weeks
  while (day <= month_length) {
     for (var i=1;i<=7 && day<=month_length;i++){
         document.write("<TD ALIGN=center>"+day+"</TD>")
         day++
     }
     document.write("</TR><TR>")
     // the first day of the next month
     start_day=i
  }
  document.write("</TR></TABLE><BR>")
}
// end hiding -->



// CHANGE the below variable to the CURRENT YEAR
year=2014

// first day of the week of the new year
today= new Date("January 1, "+year)
start_day = today.getDay() + 1  // starts with 0
fill_table("Tammi",31)
fill_table("Helmi",29)
fill_table("Maalis",31)
fill_table("Huhti",30)
fill_table("Touko",31)
fill_table("Kesä",30)
fill_table("Heinä",31)
fill_table("Elo",31)
fill_table("Syys",30)
fill_table("Loka",31)
fill_table("Marras",30)
fill_table("Joulu",31)