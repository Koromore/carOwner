// 修改时间格式
export function dateDiff(date1, date2) {
  var type1 = typeof date1, type2 = typeof date2;     
		if(type1 == 'string')     
			date1 = stringToTime(date1);     
		else if(date1.getTime)     
			date1 = date1.getTime();     
		if(type2 == 'string')     
			date2 = stringToTime(date2);     
		else if(date2.getTime)     
			date2 = date2.getTime(); 
		return (date2 - date1) / 1000 / 60 / 60 / 24;//除1000是毫秒，不加是秒 
}

