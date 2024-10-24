const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const TableName = "alcoholRecord";
const client = new DynamoDBClient({ region: "ap-northeast-1" });

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  // Tokenの有無を確認
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証されていません．headersにトークンを指定して下さい",
    });
    return response;
  } // 変数の格納

  const body = event.body ? JSON.parse(event.body) : null;
  const {
    userId,
    affilicationId,
    date,
    alcoholContent,
    alcoholQuantity,
    alcoholNum,
    currentIntoxicationLevel,
  } = body;
  const timestamp = Date.now();
  const month = date.substr(5, 2);

  const param = {
    // ↓プロパティ名と変数名が同一の場合は、値の指定を省略できる。
    TableName, // TableName: TableNameと同じ意味
    Item: marshall({
      userId, // userId: userIdと同じ意味
      affilicationId,
      date, // 飲酒日時
      month,
      alcoholContent,
      alcoholQuantity,
      alcoholNum,
      currentIntoxicationLevel,
      timestamp, // 登録したタイムスタンプ
    }),
  };

  const command = new PutItemCommand(param);

  try {
    await client.send(command);
    response.statusCode = 201;
    response.body = JSON.stringify({
      userId,
      affilicationId,
      date,
      month,
      alcoholContent,
      alcoholQuantity,
      alcoholNum,
      currentIntoxicationLevel,
      timestamp,
    });
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }
  return response;
};
