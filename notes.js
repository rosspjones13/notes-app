const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return "Your notes..."
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)
  
  if (!duplicateNotes) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const filteredNotes = notes.filter(note => note.title !== title)

  if (filteredNotes.length === notes.length) {
    console.log(chalk.red.inverse('No notes with that title to remove!'))
  } else {
    console.log(chalk.green.inverse('Removed note with the title: ' + title))
    saveNotes(filteredNotes)
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    return JSON.parse(dataBuffer)
  } catch (e) {
    return []
  }
}

const listNotes = () => {
  const notes = loadNotes()

  if (notes.length !== 0) {
    console.log(chalk.blue.inverse('Listing all notes:'))
    notes.forEach(note => {
      console.log('\nTitle: ' + note.title + '\nBody: ' + note.body)
    })
  } else {
    console.log(chalk.red.inverse('No notes to list!'))
  }
}

const readNote = title => {
  const notes = loadNotes()
  const foundNote = notes.find(note => note.title === title)

  if (foundNote) {
    console.log(chalk.yellow.inverse(foundNote.title) + '\n' + foundNote.body)
  } else {
    console.log(chalk.red.inverse('No note with the title ' + title + ' found!'))
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
}