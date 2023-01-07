const PORT = process.env.PORT || 3001;
//creates server on port 3001
const fs = require('fs');
const path = require('path');

const express = require('express');
//npm install express install to download express
const app = express();
// gets database from the db.json file
const allNotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified. 
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});
// __dirname is hte absolute oath of the directory containing the current file
//index.html for index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//notes . html for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function addNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

