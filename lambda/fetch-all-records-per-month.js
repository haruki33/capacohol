const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "alcoholRecord";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証されていません。HeaderにTokenを指定してください",
    });

    return response;
  }

  const userId = event.queryStringParameters?.userId; //見たいユーザのuserId
  const month = event.queryStringParameters?.month; // 検索したい日

  if (!userId) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message:
        "無効なリクエストです．クエリストリングに必須パラメータをセットして下さい．",
    });

    return response;
  }

  const param = {
    TableName,
    KeyConditionExpression: "userId = :uid",
    FilterExpression: "#m = :monthStr",
    ExpressionAttributeNames: {
      "#m": "month",
    },
    ExpressionAttributeValues: marshall({
      ":uid": userId,
      ":monthStr": month,
    }),
  };

  const command = new QueryCommand(param);
  try {
    const records = (await client.send(command))?.Items;
    if (records.length === 0) {
      throw new Error("飲酒履歴がありません");
    }
    const unmarshallrecords = records.map((item) => unmarshall(item));
    response.body = JSON.stringify(unmarshallrecords);
  } catch (e) {
    if (e.message == "飲酒履歴がありません") {
      response.statusCode = 204;
      response.body = JSON.stringify({ message: e.message });
    } else {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました。",
        errorDetail: e.toString(),
      });
    }
  }
  return response;
};
