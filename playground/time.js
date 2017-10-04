const moment = require('moment');

/*
const d = new Date();

console.log(d.getMonth());
*/

const d = moment();
d.add(1, 'year');
// Jan 1st 1970 00:00:00
console.log(d.format('MMM Do YYYY HH:mm:ss'));

// HH:MM AM
const createdAt = 1234567890;
const date = moment(createdAt);
console.log(d.format('h:mm a'));
