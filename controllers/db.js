const MongoClient = require("mongodb").MongoClient;
const config = require('config');
const url = config.get('mongoUri');

const mongoClient = new MongoClient(url, { maxPoolSize: 10 });

getCollection = async (collectionName) => {
  await mongoClient.connect();
  const db = mongoClient.db(`bugtracker`);
  return db.collection(collectionName);
}

exports.UserGet = async (data) => {
  try {
    const collection = await getCollection(`users`);
    return await collection.findOne(data);
  } catch (err) {
    console.log(err);
  }
};

exports.ProdGet = async (data) => {
  try {
    const collection = await getCollection(`product`);
    return await collection.findOne(data);
  } catch (err) {
    console.log(err);
  }
};

exports.UserSet = async (find, set) => {
  try {
    const collection = await getCollection(`users`);
    return await collection.updateOne(find, set);
  } catch (err) {
    console.log(err);
  }
};

exports.ProdSet = async (find, set) => {
  try {
    const collection = await getCollection(`product`);
    return await collection.updateOne(find, set);
  } catch (err) {
    console.log(err);
  }
};

exports.UserInsert = async (insert) => {
  try {
    const collection = await getCollection(`users`);
    return await collection.insertOne(insert);
  } catch (err) {
    console.log(err);
  }
};