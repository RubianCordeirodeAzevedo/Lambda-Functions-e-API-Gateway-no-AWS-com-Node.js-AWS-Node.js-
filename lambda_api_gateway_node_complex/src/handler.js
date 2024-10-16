'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { validateUrl, generateJwt, verifyJwt } = require('./auth');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Lambda function to create a shortened URL
module.exports.createShortUrl = async (event) => {
  const body = JSON.parse(event.body);
  const originalUrl = body.url;

  // Validate the URL
  if (!validateUrl(originalUrl)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid URL format' }),
    };
  }

  // Generate a short ID for the URL
  const shortId = uuid.v4().slice(0, 6);
  const shortUrl = `${event.headers.Host}/${shortId}`;

  // Store the URL in DynamoDB
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: shortId,
      originalUrl: originalUrl,
      shortUrl: shortUrl,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ originalUrl, shortUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving URL', error }),
    };
  }
};

// Lambda function to retrieve the original URL
module.exports.getOriginalUrl = async (event) => {
  const shortId = event.pathParameters.id;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: shortId },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return {
        statusCode: 301,
        headers: {
          Location: result.Item.originalUrl,
        },
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'URL not found' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving URL', error }),
    };
  }
};
