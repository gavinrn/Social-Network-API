const mongodb = require('mongodb').MongoClient;
const express = require('express');

const app = express();
const port = 3001;

const connectionString = 'mongodb://localhost:27017/socialDB';

let db;

const data = [
    { person: 'John', age: 25 },
    { person: 'Jane', age: 22 },
    { person: 'Susan', age: 21 },
    { person: 'Peter', age: 29 },
    { person: 'Ken', age: 30 },
    { person: 'Kim', age: 27 },
    { person: 'Mike', age: 26 },
    { person: 'Tom', age: 28 },
    { person: 'Mary', age: 24 },
]

mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to database');
        db = client.db();
        db.collection('people').deleteMany({});
        db.collection('people').insertMany(data, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Data inserted');
            }
        });
    }
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });

}
);

app.use(express.json());

app.get('/read', (req, res) => {
    db.collection('letterList')
      // find() returns all documents. Equivalent to `Select *` in SQL.
      .find()
      // sort() sorts in ascending or descending order
      .sort({ letter: 1 })
      // skips first returned document
      .skip(1)
      // limits returns to 10
      .limit(10)
      .toArray((err, results) => {
        // Handles error or results
        if (err) throw err;
        res.send(results);
      });
  });