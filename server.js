const express=require('express')
const fs=require('fs')
const path=require('path')
const {notes}=require('./db/db.json')

const PORT = process.env.PORT || 3001

const app=express()

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(express.static('public'))

function createNote(body,notesArr){
    const note=body
    notesArr.push(note)
    fs.writeFileSync(
        path.join(__dirname,'./db/db.json'),
        JSON.stringify({notes:notesArr},null,2)
    )
    return body
}

//HTML Routes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
})
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/notes.html'))
})



//API Routes
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.post('/api/notes',(req,res)=>{
    req.body.id=notes.length.toString()
    const note=createNote(req.body,notes) 
    res.json(note) 
})

app.listen(PORT,()=>{
    console.log(`now listening on port 3001!`)
})