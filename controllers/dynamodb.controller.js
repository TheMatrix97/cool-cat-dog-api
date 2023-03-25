'use strict';
const { v4: uuidv4 } = require('uuid');
const AWSXRay = require('aws-xray-sdk');
const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const docClient = AWSXRay.captureAWSv3Client(new DynamoDBClient({ region: "us-east-1" }));

class DynamoDBController {
    constructor(){
        this.tableName = "animals";
    }

    async storeAnimal(animalType, url){ //passes a animal to be stored into dynamoDB
        const params = {
            TableName: this.tableName,
            Item: {
                id: {S: uuidv4()},
                animal: {S: animalType},
                image: {S: url},
                timestamp: {N: Date.now().toString()}
            }
        }
        const command = new PutItemCommand(params);
        try {
            const response = await docClient.send(command);
            console.log(response)
        }catch (error) {
            console.log(error);
        }
    }

    async scanAllAnimals(){
        const params = {
            TableName: this.tableName
        }
        const command = new ScanCommand(params);
        try {
            const response = await docClient.send(command);
            const items = response.Items.map((item) => {
                return unmarshall(item);
            })
            return items;
        }catch (error) {
            console.log(error);
        }
    }
}

module.exports = {DynamoDBController};