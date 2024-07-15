import { useEffect, useRef, useState } from "react"
import { getUsers } from "../API/apiHandler"

import styles from './chatStyles.module.css'

import img from '../assets/avatar.png'
import { Navbar } from "./navbar"

export function ChatList() {
    const [popup, setPopup] = useState(false)
    const [users, setUsers]: any = useState([])
    const [name, setName] = useState('')

    useEffect(()=>{
        getUsers().then((result)=>{
            
            console.log("res: ", result)
            setUsers(result)
        })
        
    }, [])

    return (
        <div>
            <Navbar />
            {popup && <Popup name={name} set={setPopup} />}
            <h1 className={styles.heading}>Fashion Speaks</h1>
            {users.map((val:any)=>{
                return <ChatCard name={setName} set={setPopup} title={val.Name} msg={'Hi'} />    
            })}
        </div>
    )
}

export function ChatCard({title, msg, set, name}: {title: string, msg: string, name:Function, set:Function}) {
    const onChatClick = () => {
        name(title)
        set(true)
    }

    return (
        <div onClick={onChatClick} className={styles.chat}>
            <img src={img} alt="" className={styles.profileImg} />
            <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.msg}>{msg}</p>
            </div>
        </div>
    )
}

function Popup({name, set}:{name: string, set:Function}){
    const [value, setValue] = useState('')
    const [chats, setChats] = useState([{user: 'l', msg: 'Hi'}])

    const chatsRef:any = useRef(null)

    const close = () =>{
        set(false)
    }
    document.onkeydown = (e) => {
        if (e.code == "Enter" && document.activeElement?.tagName == 'INPUT' && value !== ''){
            const temp = [...chats, {user: 'r', msg: value}]
            setChats(temp)
            setValue('')
            setTimeout(() => {
                chatsRef.current!.scrollTop = chatsRef.current!.scrollHeight
            }, 10);
        }
    }

    return (
        <div className={styles.popup}>
            <div className={styles.window}>
                <h2 className={styles.heading+' '+styles.name}>{name}</h2>
                <div ref={chatsRef} className={styles.chatslist}>
                    {chats.map(val=><p className={`${styles.chatbubble} ${val.user == 'r' ? styles.right:''}`}>{val.msg}</p>)}
                </div>
                <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="text here..." />
                <button onClick={close} className={styles.close}>X</button>
            </div>
        </div>
    )
}