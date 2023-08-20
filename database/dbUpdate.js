const MongoClient = require("mongodb").MongoClient;

const { execSync } = require('child_process')

const client = new MongoClient(
  ""
);


client.connect(async (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Database connection established");

  const db = client.db("klenty_auth_test_14");
  const collection = db.collection("clusterdetails");

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

  const isHeroku = true
  let targetURL = isHeroku ? "https://klenty-test-14.herokuapp.com" : "https://test-4.kl-infra.com"

  const filter = { _id: {$in: res} };
  const update = {
    $set: {
      "info.web.target.blue.write": targetURL,
    },
  };

  collection.updateMany(filter, update, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("[result]", result);
      const command = `heroku restart -a klenty-auth-test-14`;
      execSync(command)
      console.log("Document updated successfully && restart auth-server");
    }

    client.close();
  });
});
