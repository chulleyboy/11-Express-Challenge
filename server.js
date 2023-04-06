const express = require('express');
const path = require('path');
let db = require('./db/db.json')
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const root = {root:path.join(__dirname, "./public")}

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile('notes.html', root
  );
});

// get notes from database
app.get('/api/notes', (req, res) => {
	res.json(db);
  });

// post notes to database
app.post('/api/notes', (req, res) => {
	const newNote = req.body;
	newNote.id = Date.now().toString();
	db.push(newNote);
	res.json(newNote);
	fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
		if (err) {
			console.error(err);
		}
	})
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
