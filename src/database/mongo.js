const { MongoClient } = require('mongodb');
const shortId = require('shortid');

const dbName = 'budget';
let connection;
let db;

async function execOn(collection, func) {
  connection =
    connection ||
    (await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    }));
  db = db || connection.db(dbName);

  return func(db.collection(collection));
}

function onCollection(colName) {
  return {
    create(doc) {
      doc._id = doc.id ? doc.id : shortId.generate();

      delete doc.id;

      return execOn(colName, c => c.insertOne(doc));
    },
    update(query, doc) {
      return execOn(colName, c => c.findAndModify(query, doc));
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
