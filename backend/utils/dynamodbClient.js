// utils/dynamodbClient.js
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'us-west-2' }); // or from process.env
const docClient = DynamoDBDocumentClient.from(client);

module.exports = { docClient };
