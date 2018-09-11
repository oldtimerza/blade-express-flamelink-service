var firebase = require("firebase");
var flamelink = require("flamelink");
var bodyParser = require("body-parser");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blade-express.firebaseio.com",
  storageBucket: "blade-express.appspot.com"
};

const firebaseApp = admin.initializeApp(config);

const flameLinkApp = flamelink({ firebaseApp, isAdminApp: true });

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.post("/", (req, res) => {
  try {
    const body = req.body;
    flameLinkApp.content
      .set("visaSummary", body.title, body)
      .then(() => console.log("Setting the entry succeeded"));
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
