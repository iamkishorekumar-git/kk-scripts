const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(
  process.env.DB_URI
);


client.connect(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Database connection established");

  const db = client.db("dbName");
  const collection = db.collection("collectionName");

  async function findIds() {
    const doc_id = [];
    const docs = await collection.find({}, { _id: 1 }).toArray();
  
    for (const doc of docs) {
      doc_id.push(doc._id);
    }
    return doc_id
  }
  
  const res = await findIds();

  console.log("[Ids]",res)

  const isGoogle = true
  let targetURL = isGoogle ? "https://www.google.com" : "https://www.github.com.com"

  const filter = { _id: {$in: res} };
  const update = {
    $set: {
      "info": targetURL,
    },
  };

  collection.updateMany(filter, update, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("[result]", result);
    }

    client.close();
  });
});
