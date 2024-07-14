import { useEffect, useState } from "react"
import { getUsers } from "../API/apiHandler"

import styles from './chatStyles.module.css'

import img from '../assets/avatar.png'
import { Navbar } from "./navbar"

export function ChatList() {
    const [users, setUsers]: any = useState([])
    const [re, setRe] = useState('')

    useEffect(()=>{
        getUsers().then((result)=>{
            
            console.log("res: ", result)
            setUsers(result)
        })
        
    }, [])

    return (
        <div>
            <Navbar />

            <h1 className={styles.heading}>Fashion Speaks</h1>
            {users.map((val:any)=>{
                return <ChatCard title={val.Name} msg={'Hi'} />    
            })}
        </div>
    )
}

export function ChatCard({title, msg}: {title: string, msg: string}) {
    return (
        <div className={styles.chat}>
            <img src={img} alt="" className={styles.profileImg} />
            <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.msg}>{msg}</p>
            </div>
        </div>
    )
}