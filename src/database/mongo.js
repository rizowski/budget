const { MongoClient } = require('mongodb');
const shortId = require('shortid');

const dbName = 'budget';
let connection;
let db;

async function execOn(collection, func) {
  connection =
    connection ||
    (await MongoClient.connect(
      'mongodb://localhost:27017',
      {
        useNewUrlParser: true,
      }
    ));
  db = db || connection.db(dbName);

  return func(db.collection(collection));
}

function onCollection(colName) {
  return {
    async create(doc) {
      doc._id = doc.id || shortId.generate();
      delete doc.id;

      await execOn(colName, c => c.insertOne(doc));

      const { _id, ...rest } = doc;

      return { id: _id, ...rest };
    },
    async update(query, doc) {
      const options = { returnOriginal: false };
      const updateQuery = { $set: doc };
      const {
        value: { _id, ...rest },
      } = await execOn(colName, c => c.findOneAndUpdate(query, updateQuery, options));

      return { id: _id, ...rest };
    },
    delete() {
      throw new Error('not Implemented');
    },
    async search(query) {
      const result = await execOn(colName, c => c.find(query));
      const items = await result.toArray();

      console.log(`Found ${colName}:`, items.length);

      return items.map(thing => {
        thing.id = thing._id;

        delete thing._id;

        return thing;
      });
    },
    get(query) {
      return execOn(colName, c => c.findOne(query));
    },
  };
}

module.exports = {
  execOn,
  onCollection,
};
