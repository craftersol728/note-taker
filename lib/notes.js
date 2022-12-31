const fs = require("fs");

const path = require("path");

function noteCreateNewNote (body, noteTakerArray) {
    const note = body;
    noteTakerArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        },null 2)
    )
    return note;
}

