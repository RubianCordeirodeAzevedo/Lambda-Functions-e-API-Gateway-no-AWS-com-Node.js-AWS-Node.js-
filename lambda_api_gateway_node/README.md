# AWS Lambda + API Gateway with Node.js

This project implements a simple URL shortener using AWS Lambda, API Gateway, and DynamoDB (optional). The project uses the Serverless Framework to deploy the infrastructure.

## Features

- **Lambda Function**: A simple Node.js function to shorten URLs.
- **API Gateway**: A REST API endpoint that triggers the Lambda function.
- **DynamoDB Integration**: (Optional) A DynamoDB table to store shortened URLs.

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
   After deployment, you will receive a URL for the API Gateway. You can use this URL to send POST requests to the Lambda function:
   ```bash
   curl -X POST https://your-api-url/shorturl -d '{"url": "https://example.com"}'
   ```

4. **Monitor the service**:
   You can use AWS CloudWatch to monitor logs and performance metrics for the Lambda function.

### Requirements
- Node.js
- AWS account with appropriate permissions
- Serverless Framework
