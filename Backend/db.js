import mongoose from 'mongoose'

const userSchema = {
    Name: String
}

const userModel = mongoose.model('users', userSchema)
const con = mongoose.connect('mongodb://localhost:27017', {dbName: 'myntra'}).then((con)=>{
    console.log("Connection succesfull")
})

export async function getUsers() {
    const users = await userModel.find({})
    return users;
}
