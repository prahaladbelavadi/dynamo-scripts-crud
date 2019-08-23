var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:8000'
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "Movies",
    KeySchema: [
        {
            AttributeName: 'year', KeyType: "HASH" // Primary key
        },
        {
            AttributeName: 'title', KeyType: 'RANGE' //sort key
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'year', AttributeType: "N" // Attribute type : "N" is to declare type NUmber
        },
        {
            AttributeName: 'title', AttributeType: 'S' // Attribute type : "S" is to declare type string
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data){
    if(err){
        console.error("Unable to create table. Error JSON", JSON.stringify(err, null,2))
    }else{
        console.log("created Table. Table desc jSON:", JSON.stringify(data, null,2));
    }
});