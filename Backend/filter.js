import fs, { readFileSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import path from 'path';

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) 

export function generateImage(file, res, type){
    var prompt = ''
    switch (type) {
        case 'Frock':
            prompt = 'Give the character in image a pink frock'
            break;
        case 'Hoodie':
            prompt = 'Give the character in image a blue hoodie'
        case 'Raincoat':
            prompt = 'Give the character in image a yellow raincoat'
        default:
            prompt = 'Give the character in image a blue hoodie'
            break;
    }
    console.log("Prompt: ", prompt)
    const url = 'https://api.getimg.ai/v1/stable-diffusion-xl/image-to-image';
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer '+process.env.AI_API_KEY,
    },
    body: JSON.stringify({
        image: file,
        prompt: 'give the character in image a yellow raincoat with black buttons',
    })
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        writeFileSync(path.join(__dirname, 'uploads/output.jpg'), json.image, 'base64')
        res.json(`data:image/jpg;base64,${json.image}`)
    })
    .catch(err => console.error('error:' + err));
}

export function generateFromtext(res){
    const url = 'https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image';
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json', authorization: 'Bearer '+process.env.AI_API_KEY,},
        body: JSON.stringify({
            prompt: 'A cute space cat',
            width: 256,
            height: 256
        })
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        writeFileSync(path.join(__dirname, 'uploads/output.jpg'), json.image, 'base64')
        res.json(`data:image/jpg;base64,${json.image}`)
    })
    .catch(err => console.error('error:' + err));
}