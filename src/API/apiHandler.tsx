const URL = 'http://localhost:8080/'

function url(path:string){
    return URL+path;
}

export async function getUsers() {
    console.log(url('api/getUsers'))
    const result = await fetch(url('api/getUsers'), {
        mode: 'cors',
        headers: { 'content-types': 'application/json'}
    })

    console.log("DA: ", result)
    const data = await result.json()
    return data;
}

export async function uploadImage(image:any){
    const respone = await fetch(url('api/uploadImage'), {
        mode: 'cors',
        method: 'post',
        body: image
    })
    const data = await respone.json()
    return data
}