const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//Create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{//options in command
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note Descriptions',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(){
        var title = yargs.argv.title;
        var body = yargs.argv.body;
        console.log(`Title: `+title);
        console.log(`Description: `+body);
        notes.addNotes(title,body);
    }
})
//Create remove command
yargs.command({
    command:'remove',
    describe:'Remove a new note',
    handler: function(){
        var title = yargs.argv.title;
        var body = yargs.argv.body;
        console.log(`Removing note : title : ${title}`);
        notes.removeNotes(title);
    }
})
//Create list command
yargs.command({
    command:'list',
    describe:'Listing out all notes',
    handler: function(){
        console.log('List all notes');
        notes.listNotes();
    }
})
//Create read command
yargs.command({
    command:'read',
    describe:'Reading all notes',
    builder:{//options in command
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(){
        var title = yargs.argv.title;
        console.log('Read note with title: ' + title);
        notes.readNotes(title);
    }
})

yargs.parse();
