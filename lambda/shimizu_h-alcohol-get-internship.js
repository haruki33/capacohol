const {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");
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

  // 今回は簡易的な実装だが、一般的にはAuthorizationHeaderの値は、Authorization: <type> <credentials>のような形式になります。
  // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Authorization#%E6%A7%8B%E6%96%87
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証されていません。HeaderにTokenを指定してください",
    });

    return response;
  }

  const userId = event.queryStringParameters?.userId; //見たいユーザのuserId
  const d = event.queryStringParameters?.date; // 検索したい日

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
    //キー、インデックスによる検索の定義
    KeyConditionExpression: "userId = :uid",
    FilterExpression: "#d = :datestr",
    ExpressionAttributeNames: {
      "#d": "date",
    },
    //検索値のプレースホルダの定義
    ExpressionAttributeValues: marshall({
      ":uid": userId,
      ":datestr": d,
    }),
  };

  const command = new QueryCommand(param);
  try {
    const records = (await client.send(command))?.Items;
    if (records.length === 0) {
      throw new Error("飲酒履歴がありません");
    }
    const unmarshallrecords = records.map((item) => unmarshall(item));
    response.body = JSON.stringify({ records: unmarshallrecords });
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

//------------------------------------------------------
//   const { hasValidQs, param } = createParam(event.queryStringParameters);

//   const queryCommnad = new QueryCommand(param);
//   // const scanCommand = new ScanCommand(param);
//   try {
//     const alcohols = hasValidQs
//       ? (await client.send(queryCommnad)).Items
//       : (await client.send(scanCommand)).Items;

//     if (alcohols.length == 0) {
//       response.body = JSON.stringify({ alcohols: [] });
//     } else {
//       const unmarshalledAlcohols = alcohols.map((item) => unmarshall(item));
//       unmarshalledAlcohols.sort((a, b) => b.timestamp - a.timestamp);
//       response.body = JSON.stringify({ alcohol: unmarshalledAlcohols });
//     }
//   } catch (e) {
//     response.statusCode = 500;
//     response.body = JSON.stringify({
//       message: "予期せぬエラーが発生しました。",
//       errorDetail: e.toString(),
//     });
//   }

//   return response;
// };

// // qsの内容に応じて、Paramを作成する。
// const createParam = (qs) => {
//   // Query操作には、パーティションキーは必須であり、他は任意となる。
//   // そのためuserIdさえあれば、有効となる。
//   const hasValidQs = qs?.userId; //userIdがあれば格納
//   if (!hasValidQs) {
//     return {
//       hasValidQs,
//       param: {
//         // ↓プロパティ名と変数名が同一の場合は、値の指定を省略できる。
//         TableName, // TableName: TableNameと同じ意味
//         Limit: 100,
//       },
//     };
//   }

//   const { userId, start, end, affilicationId } = qs; //userIdがあればそれぞれに格納

//   const queryParam = {
//     TableName, // TableName: TableNameと同じ意味
//     Limit: 100,

//     // 一つのキーに複数の条件をつけることはできないため、BETWEEN演算を利用する
//     KeyConditionExpression: "userId = :uid and #ts BETWEEN :start AND :end",
//     // timestampは予約後であるため、プレースホルダ経由じゃないと指定できない。dense
//     ExpressionAttributeNames: {
//       "#ts": "timestamp",
//     },
//     ExpressionAttributeValues: {
//       ":uid": userId,
//       // startが無効な場合は、0以上という条件にすることで、実質フィルタリング無効化
//       ":start": Number.isNaN(parseInt(start)) ? 0 : parseInt(start),
//       // endが無効な場合は、現在時刻以下という条件にすることで、実質フィルタリング無効化
//       ":end": Number.isNaN(parseInt(end)) ? Date.now() : parseInt(end),
//     },
//   };

//   // affilicationIdが存在する場合は別途該当のプロパティを追加する。
//   if (affilicationId) {
//     queryParam.FilterExpression = "affilicationId = :affilicationId";
//     queryParam.ExpressionAttributeValues[":affilicationId"] = affilicationId;
//   }

//   queryParam.ExpressionAttributeValues = marshall(
//     queryParam.ExpressionAttributeValues
//   );

//   return {
//     hasValidQs,
//     param: queryParam,
//   };
