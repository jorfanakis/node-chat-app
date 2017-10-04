const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };

};

const generateLocationMessage = (from, lat, log) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${log}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
