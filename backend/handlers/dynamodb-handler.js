const { docClient } = require('../utils/dynamodbClient');
const { buildResponse } = require('../utils/response');
const {
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
  PutCommand,
  BatchWriteCommand,
} = require('@aws-sdk/lib-dynamodb');

const TABLE_NAME = 'j.prospects'; // update as needed or move to env vars
const { v4: uuidv4 } = require('uuid');

module.exports.createItem = async (event) => {
  const data = JSON.parse(event.body);

  const item = {
    id: uuidv4(),
    ...data,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  });

  await docClient.send(command);

  return buildResponse(200, item);
};

module.exports.getItem = async (event) => {
  const { id } = event.pathParameters;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    return buildResponse(200, result.Item);
  } catch (err) {
    console.error('getItem error:', err);
    return buildResponse(500, { message: 'Failed to get item' });
  }
};

module.exports.updateItem = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  try {
    const updateExp = Object.keys(data)
      .map((k, i) => `#key${i} = :val${i}`)
      .join(', ');
    const expAttrNames = Object.keys(data).reduce(
      (acc, k, i) => ({ ...acc, [`#key${i}`]: k }),
      {}
    );
    const expAttrValues = Object.values(data).reduce(
      (acc, v, i) => ({ ...acc, [`:val${i}`]: v }),
      {}
    );

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `SET ${updateExp}`,
        ExpressionAttributeNames: expAttrNames,
        ExpressionAttributeValues: expAttrValues,
      })
    );

    return buildResponse(200, { id, ...data });
  } catch (err) {
    console.error('updateItem error:', err);
    return buildResponse(500, { message: 'Failed to update item' });
  }
};

module.exports.deleteItem = async (event) => {
  const { id } = event.pathParameters;

  try {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    return buildResponse(204, null);
  } catch (err) {
    console.error('deleteItem error:', err);
    return buildResponse(500, { message: 'Failed to delete item' });
  }
};

module.exports.listItems = async (event) => {
  try {
    console.log('Full event:', JSON.stringify(event, null, 2));

    const userId = `USER#${event.requestContext.authorizer.claims.sub}`;
    console.log('Listing items for userId:', userId);

    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :userId AND begins_with(SK, :companyId)',
        ExpressionAttributeValues: {
          ':userId': userId,
          ':companyId': 'COMPANY#',
        },
      })
    );

    // TODO - transform result.Items remove SK and PK
    const transformedItems = result.Items.map(({ PK, SK, ...rest }) => {
      return {
        companyId: SK.split('#')[1],
        ...rest,
      };
    });

    return buildResponse(200, transformedItems);
  } catch (err) {
    console.error('listItems error:', err);
    return buildResponse(500, { message: 'Failed to list items' });
  }
};

//* List out all APIs needed below
//! Companies CRUD APIs
//* dev complete
module.exports.listCompanies = async (event) => {
  try {
    console.log('Full event:', JSON.stringify(event, null, 2));

    const userId = `USER#${event.requestContext.authorizer.claims.sub}`;
    console.log('Listing items for userId:', userId);

    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :userId AND begins_with(SK, :companyId)',
        ExpressionAttributeValues: {
          ':userId': userId,
          ':companyId': 'COMPANY#',
        },
      })
    );

    // TODO - transform result.Items remove SK and PK
    const transformedItems = result.Items.map(({ PK, SK, ...rest }) => {
      return {
        companyId: SK.split('#')[1],
        ...rest,
      };
    });

    return buildResponse(200, transformedItems);
  } catch (err) {
    console.error('listItems error:', err);
    return buildResponse(500, { message: 'Failed to list items' });
  }
};

module.exports.createCompany = async (event) => {
  const data = JSON.parse(event.body);
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;
  const companyId = `COMPANY#${uuidv4()}`;

  const item = {
    PK: userId,
    SK: companyId,
    prospectCount: 0, // initial value, but can be updated later
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  });

  await docClient.send(command);

  return buildResponse(200, { companyId: companyId.split('#')[1], ...data });
};

//TODO - getCompany details
module.exports.getCompany = async (event) => {};

module.exports.updateCompany = async (event) => {
  // use updateCommand
  const { companyId } = event.pathParameters;
  const data = JSON.parse(event.body);
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;

  try {
    const updateExp = Object.keys(data)
      .map((k, i) => `#key${i} = :val${i}`)
      .join(', ');
    const expAttrNames = Object.keys(data).reduce(
      (acc, k, i) => ({ ...acc, [`#key${i}`]: k }),
      {}
    );
    const expAttrValues = Object.values(data).reduce(
      (acc, v, i) => ({ ...acc, [`:val${i}`]: v }),
      {}
    );

    console.log('payload', {
      TableName: TABLE_NAME,
      Key: { PK: userId, SK: `COMPANY#${companyId}` },
      UpdateExpression: `SET ${updateExp}, updatedAt = :updatedAt`,
      ExpressionAttributeNames: expAttrNames,
      ExpressionAttributeValues: {
        ...expAttrValues,
        ':updatedAt': new Date().toISOString(),
      },
    });

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { PK: userId, SK: `COMPANY#${companyId}` },
        UpdateExpression: `SET ${updateExp}, updatedAt = :updatedAt`,
        ExpressionAttributeNames: expAttrNames,
        ExpressionAttributeValues: {
          ...expAttrValues,
          ':updatedAt': new Date().toISOString(),
        },
      })
    );

    return buildResponse(200, { companyId, ...data });
  } catch (err) {
    console.error('updateCompany error:', err);
    return buildResponse(500, { message: 'Failed to update company' });
  }
};

//* dev complete
module.exports.deleteCompany = async (event) => {
  const { companyId } = event.pathParameters;
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;

  const companyPK = `COMPANY#${companyId}`;
  const userCompanySK = `COMPANY#${companyId}`;

  try {
    // Step 1: Query all items under COMPANY#<companyId>
    const queryResult = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': companyPK,
        },
      })
    );

    const itemsToDelete = queryResult.Items || [];

    // Step 2: Add the reference to user's company list to delete
    itemsToDelete.push({
      PK: userId,
      SK: userCompanySK,
    });

    // Step 3: Batch delete (max 25 items per batch)
    const deleteBatches = [];

    for (let i = 0; i < itemsToDelete.length; i += 25) {
      const batch = itemsToDelete.slice(i, i + 25).map((item) => ({
        DeleteRequest: {
          Key: {
            PK: item.PK,
            SK: item.SK,
          },
        },
      }));

      deleteBatches.push(
        docClient.send(
          new BatchWriteCommand({
            RequestItems: {
              [TABLE_NAME]: batch,
            },
          })
        )
      );
    }

    // Step 4: Await all batches
    await Promise.all(deleteBatches);

    return buildResponse(204, null);
  } catch (err) {
    console.error('deleteCompany error:', err);
    return buildResponse(500, { message: 'Failed to delete company' });
  }
};

//! Prospects CRUD APIs
module.exports.listCompanyProspects = async (event) => {
  const { companyId } = event.pathParameters;
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;

  try {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression:
          'PK = :companyPK AND begins_with(SK, :prospectId)',
        ExpressionAttributeValues: {
          ':companyPK': `COMPANY#${companyId}`,
          ':prospectId': 'PROSPECT#',
        },
      })
    );

    // Transform result.Items to remove SK and PK
    const transformedItems = result.Items.map(({ PK, SK, ...rest }) => {
      return {
        prospectId: SK.split('#')[1],
        ...rest,
      };
    });

    return buildResponse(200, transformedItems);
  } catch (err) {
    console.error('listCompanyProspects error:', err);
    return buildResponse(500, { message: 'Failed to list prospects' });
  }
};

module.exports.createCompanyProspect = async (event) => {
  const { companyId } = event.pathParameters;
  const data = JSON.parse(event.body);
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;
  const prospectId = `PROSPECT#${uuidv4()}`;

  const item = {
    PK: `COMPANY#${companyId}`,
    SK: prospectId,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  });

  const updateCompanyProspectPutCountCommand = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { PK: userId, SK: `COMPANY#${companyId}` },
    UpdateExpression:
      'SET prospectCount = if_not_exists(prospectCount, :zero) + :inc',
    ExpressionAttributeValues: {
      ':inc': 1,
      ':zero': 0,
    },
  });

  await Promise.all([
    docClient.send(command),
    docClient.send(updateCompanyProspectPutCountCommand),
  ]);

  return buildResponse(200, { prospectId: prospectId.split('#')[1], ...data });
};

module.exports.getCompanyProspect = async (event) => {};

module.exports.updateCompanyProspect = async (event) => {
  const { companyId, prospectId } = event.pathParameters;

  console.log('companyId:', companyId);
  console.log('prospectId:', prospectId);

  const data = JSON.parse(event.body);
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;

  try {
    const updateExp = Object.keys(data)
      .map((k, i) => `#key${i} = :val${i}`)
      .join(', ');
    const expAttrNames = Object.keys(data).reduce(
      (acc, k, i) => ({ ...acc, [`#key${i}`]: k }),
      {}
    );
    const expAttrValues = Object.values(data).reduce(
      (acc, v, i) => ({ ...acc, [`:val${i}`]: v }),
      {}
    );

    console.log('payload', {
      TableName: TABLE_NAME,
      Key: { PK: `COMPANY#${companyId}`, SK: `PROSPECT#${prospectId}` },
      UpdateExpression: `SET ${updateExp}, updatedAt = :updatedAt`,
      ExpressionAttributeNames: expAttrNames,
      ExpressionAttributeValues: {
        ...expAttrValues,
        ':updatedAt': new Date().toISOString(),
      },
    });

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { PK: `COMPANY#${companyId}`, SK: `PROSPECT#${prospectId}` },
        UpdateExpression: `SET ${updateExp}, updatedAt = :updatedAt`,
        ExpressionAttributeNames: expAttrNames,
        ExpressionAttributeValues: {
          ...expAttrValues,
          ':updatedAt': new Date().toISOString(),
        },
      })
    );

    return buildResponse(200, { prospectId, ...data });
  } catch (err) {
    console.error('updateCompanyProspect error:', err);
    return buildResponse(500, { message: 'Failed to update prospect' });
  }
};

module.exports.deleteCompanyProspect = async (event) => {
  const { companyId, prospectId } = event.pathParameters;
  const userId = `USER#${event.requestContext.authorizer.claims.sub}`;

  try {
    const updateCompanyProspectDecrementCountCommand = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: userId, SK: `COMPANY#${companyId}` },
      UpdateExpression:
        'SET prospectCount = if_not_exists(prospectCount, :zero) - :dec',
      ExpressionAttributeValues: {
        ':dec': 1,
        ':zero': 0,
      },
      ConditionExpression: 'prospectCount > :zero', // prevent negative counts
    });

    await Promise.all([
      docClient.send(updateCompanyProspectDecrementCountCommand),
      docClient.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { PK: `COMPANY#${companyId}`, SK: `PROSPECT#${prospectId}` },
        })
      ),
    ]);

    // await docClient.send(
    //   new DeleteCommand({
    //     TableName: TABLE_NAME,
    //     Key: { PK: `COMPANY#${companyId}`, SK: `PROSPECT#${prospectId}` },
    //   })
    // );

    return buildResponse(204, null);
  } catch (err) {
    console.error('deleteCompanyProspect error:', err);
    return buildResponse(500, { message: 'Failed to delete prospect' });
  }
};

module.exports.getCompanyKpis = async (event) => {
  // get total prospects count, new this week, how many are in progress, and rejected
};
