const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
  return "Your notes..."
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title === title)
  
  if (duplicateNotes.length === 0) {
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

const removeNote = function (title) {
  const notes = loadNotes()
  const filteredNotes = notes.filter(note => note.title !== title)

  if (filteredNotes.length === notes.length) {
    console.log(chalk.red.inverse('No notes with that title to remove!'))
  } else {
    console.log(chalk.green.inverse('Removed note with the title: ' + title))
    saveNotes(filteredNotes)
  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    return JSON.parse(dataBuffer)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote
}