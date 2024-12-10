# Aurora Oasis
 Aurora Oasis is a small, cozy boutique hotel with beautiful wooden cabins. To make managing the hotel easier, this app has been created as a custom solution for the staff. It helps with handling bookings, checking cabin availability, and managing guest check-ins.

This app is designed to make daily hotel operations simple and smooth for the staff. Currently, it’s an internal tool used only within the hotel. However, in the future, it will grow to include a customer-facing website(Using NExtJs) where guests can book their cabins online. The website will connect to the same backend system, making everything work together seamlessly.


npm i react-icons
npm install react-hot-toast



4 ways of creating date

1)const now = new Date()
2) parse date from date string
 new Date('string)
 3) parse date = new Date('December 24,2025') // own string , not reliable , use it if string is created by javascript
 Z -> UTC - cordinated universal time ,time without any timezone and daylight saving in Lindon

 Moths in javascript are 0 based


 4) passed in date constructor millisecond since jaa 1 , 1970(timestamp)
 days * hours * min * sec * 1000millisecond
Date are special type of object , we can use these method to get componenet of the date
const future = new Date(2036,10,19,15,23)
future.getFUllYEar
getYear // never use it
future.getMonth() -> 0 based
future.getDate() // day
future.getDay() // day of the week 0 is sunday
future.getHours()
future.getMinutes()
future.getSeconds()
future.getISOString()
future.getTIme() // timestamp


current timestamp
Date.now()

set version of above method
future.setFullYear(2040)