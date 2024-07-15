import express from 'express'
import multer from 'multer'
import cors from 'cors'
import path from 'path'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) 

import { getUsers } from './db.js'
import { readFileSync, rename, writeFileSync } from 'fs'
import { generateFromtext, generateImage } from './filter.js'

const upload = multer({dest: 'uploads/'})
const app = express()


app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use('/api/getUsers', (req, res) => {
    console.log("okok")
    getUsers().then((users)=>{
        res.json(users)
    })
    // res.json([{'Name': 'vehdat'}])
})

app.use("/api/uploadImage", upload.single('file'), (req, res)=>{
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `uploads/${req.file.originalname}`);
    rename(tempPath, targetPath, err=>{console.log(err)})
    console.log(req.file)

    const file = readFileSync(targetPath, 'base64')
    console.log(req.body.dressType)
    generateImage(file, res, req.body.dressType)
    // generateFromtext(res)
    // console.log(file)
    // res.end()
})


app.listen(8080, "localhost", ()=>console.log("Server started at port: 8080"))