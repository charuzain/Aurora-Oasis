const myDate = new Date()
console.log(myDate) //2024-12-13T15:07:02.376Z
console.log(myDate.toISOString());
//2024-12-13T15:07:02.376Z
console.log(myDate.toJSON())//2024-12-13T15:07:02.376Z

console.log(myDate.toString());//Fri Dec 13 2024 10:07:02 GMT-0500 (Eastern Standard Time)

console.log(myDate.toDateString());//Fri Dec 13 2024
console.log(myDate.toUTCString());//Fri, 13 Dec 2024 15:07:02 GMT



console.log(myDate.toLocaleDateString());//12/13/2024
console.log(myDate.toLocaleString());//12/13/2024, 10:07:02 AM

console.log(myDate.toTimeString());//10:07:02 GMT-0500 (Eastern Standard Time)

// ====================================================================================================================================
const myCreatedDate = new Date(2024, 11, 23)
console.log(myCreatedDate)//2024-12-23T05:00:00.000Z

console.log(myCreatedDate.toDateString())

const myCreatedDateWithTime = new Date(2024, 11, 23, 12, 23, 12);
console.log(myCreatedDateWithTime) //2024-12-23T17:23:12.000Z
console.log(myCreatedDateWithTime.toLocaleString()) //12/23/2024, 12:23:12 PM

console.log(myCreatedDate.getDate()) //23
console.log("===")
// ====================================================================================================================================
const dateWithFormat = new Date('2024-12-11') //yy-mm--dd we can also mm-dd-yy
console.log(dateWithFormat)//2024-12-11T00:00:00.000Z
//new Date('2024-12-11') interprets '2024-12-11' as a date in UTC by default.
//This is the ISO 8601 string representation of the date in UTC (Z stands for Zulu Time, which is UTC).

console.log(dateWithFormat.toLocaleString())//12/10/2024, 7:00:00 PM
//toLocaleString() converts the date to your local time zone.If your system is in GMT-5 (Eastern Standard Time), the date is 5 hours behind UTC.
// 2024-12-11T00:00:00Z (UTC) becomes 2024-12-10T19:00:00 in EST.


console.log(dateWithFormat.toString());//Tue Dec 10 2024 19:00:00 GMT-0500 (Eastern Standard Time).

// toString() also converts the date to the local time zone.It shows the formatted date string with time zone information.

console.log(dateWithFormat.getTime()) //1733875200000 timestamp
console.log(dateWithFormat.getMonth()) //11
// ====================================================================================================================================

const myTimeStamp = Date.now()
console.log(myTimeStamp)//1734103874483 its in millisecond



console.log("====")
// const todayDate = new Date()
// console.log(todayDate)//2024-12-13T16:47:31.175Z
// console.log(todayDate.getDate()); //13

// console.log(todayDate.getDate() - 7) // 6

// console.log(todayDate.getDate() - 29) // -16


const todayDate = new Date()
console.log(todayDate) //2024-12-13T16:52:19.601Z
console.log(todayDate.getDate()) // 13
console.log(todayDate.setDate(todayDate.getDate() - 7));
console.log(todayDate.toISOString()) //2024-12-06T16:56:34.130Z
console.log(new Date(todayDate))//2024-12-06T16:57:05.998Z

