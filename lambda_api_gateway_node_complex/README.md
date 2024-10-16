# AWS Lambda + API Gateway + DynamoDB with Node.js

This project implements a more complex URL shortener using AWS Lambda, API Gateway, and DynamoDB, with optional JWT authentication.

## Features

- **Lambda Function**: Node.js functions to shorten URLs, store in DynamoDB, and retrieve them.
- **API Gateway**: A REST API with endpoints to create and fetch URLs.
- **DynamoDB**: A DynamoDB table to store the URL mappings.
- **JWT Authentication**: Optional JWT token generation and validation.

### Setup Instructions

1. **Install the Serverless Framework**:
   ```bash
   npm install -g serverless
   ```

2. **Deploy the service**:
   In the project directory, run:
   ```bash
   serverless deploy
   ```

3. **Test the API**:
   After deployment, you will receive a URL for the API Gateway. You can use this URL to send POST and GET requests to the Lambda function:
   ```bash
   # Create a short URL
   curl -X POST https://your-api-url/shorturl -d '{"url": "https://example.com"}'

   # Retrieve the original URL
   curl https://your-api-url/shorturl/{shortId}
   ```

4. **Monitor the service**:
   Use AWS CloudWatch to monitor logs and performance metrics for the Lambda functions.

## Requirements
- Node.js
- AWS account with appropriate permissions
- Serverless Framework
