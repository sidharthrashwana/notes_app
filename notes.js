const fs = require('fs');
const chalk = require('chalk');

console.log("Notes");

const getNotes = ()=>{
    return ("your notes");
}

const addNotes=(title ,body)=>{
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })
    if (duplicateNotes.length==0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('new note added!'));
    }
    else{
        console.log(chalk.red.inverse(`Title: "${title}" is already taken.`))
    }
}
const removeNotes=(title)=>{
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note){
            return note.title != title
    })
    if(notes.length > duplicateNotes.length){
        saveNotes(duplicateNotes)//save the returned array after removing the notes
        console.log(chalk.green.inverse('note is removed!'))
    }
    else{
        console.log(chalk.red.inverse('Title is not present.'))
    }
}

const listNotes = ()=>{
    const notes = loadNotes()
    if(notes.length!==0){
        for(var key in notes){
            console.log(chalk.green.inverse('Title: '+notes[key]['title']+' Body: '+notes[key]['body']));
        }
    }
    else{
        console.log(chalk.red.inverse("no item is present to read"));
    }
}

const readNotes = (title)=>{
    const notes = loadNotes()
    const readNote = notes.filter(function(note){
        return note.title === title;
    })
    if(readNote.length!=0){
        console.log(chalk.green.inverse("Body : "+readNote[0]['body']))
    }
    else{
        console.log(chalk.red.inverse("No item found with title : " + `${title}`))
    }
}



const saveNotes=function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(err){
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes:removeNotes,
    listNotes: listNotes,
    readNotes:readNotes
};