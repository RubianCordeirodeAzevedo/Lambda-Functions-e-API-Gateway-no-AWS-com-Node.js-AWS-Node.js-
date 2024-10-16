'use strict';

module.exports.shortUrl = async (event) => {
  const body = JSON.parse(event.body);
  const originalUrl = body.url;

  // Simulating URL shortening logic
  const shortUrl = originalUrl.split('').reverse().join(''); // Dummy logic

  return {
    statusCode: 200,
    body: JSON.stringify({
      originalUrl: originalUrl,
      shortUrl: shortUrl,
    }),
  };
};
