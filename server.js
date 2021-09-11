
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

const myNotes = require('./db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(myNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(dirname, 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'index.html'));
});

app.post('/api/notes', (req, res) => {
    const note = newNote(req.body, myNotes);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, myNotes);
    res.json(true);
});

function newNote(body, notesArray) {
    const note = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(note);
    fs.writeFileSync(
        path.join(dirname, 'db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

app.listen(PORT, () => {
    console.log(`Server now live on ${PORT}!`);
});