const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require("firebase-admin");
const serviceAccount = require("./ssdf-76ab6-firebase-adminsdk-q3zrk-8a07d2d405.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set CORS to allow requests from any origin
app.use(cors({ origin: '*' }));

// Define the endpoint to receive customer review data
app.post('/api/customer-review', (req, res) => {
  const data = req.body;

  // Save the data to a Firebase database collection
  db.collection('customer-reviews').add(data)
    .then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
      res.status(200).send('Review submitted successfully!');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      res.status(500).send('Error adding document!');
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
