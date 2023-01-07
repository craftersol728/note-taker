const PORT = process.env.PORT || 3069;
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


//created new note function that addes a new note and stores the array into an object
function addNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;
//write file sync https://www.geeksforgeeks.org/node-js-fs-writefilesync-method/
    notesArray.push(newNote);
    fs.writeFileSync(
        //The path.join() method joins the specified path segments into one path.
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    //returns the final and updated note
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = addNewNote(req.body, allNotes);
    res.json(newNote);
});
//delete note function
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}
//the delete note function is called 
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});
//console logs the port  it is on to the terminal in this case 3069
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});