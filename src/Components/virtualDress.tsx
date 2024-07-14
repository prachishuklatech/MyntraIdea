import { useState } from 'react'
import { Navbar } from './navbar'
import { uploadImage } from '../API/apiHandler'
import styles from './sectionStyles.module.css'

export function VirtualDress() {
    const [path, setPath] = useState('')
    const [output, setOutput] = useState("http://localhost:8080/image/output.jpg")

    const onChange = (event: any) => {
        setOutput("http://localhost:8080/image/CRLogo.png")
        setPath(URL.createObjectURL(event.target.files[0]))

        const data = new FormData()
        console.log(event.target.files[0])
        data.append('file', event.target.files[0])
        data.append('fileName', event.target.value)
        for (const element of data.entries()) {
            console.log(element)
        }
        uploadImage(data)
        .then((data)=>{
            setOutput(data)
        })
    }

    return (
        <>
        <Navbar />
        <div className={styles.box}>
            <div className={styles.section}>
                <form action="">
                    <input type="file"  onChange={(e:any)=>onChange(e)} name="" id="" />
                    {/* <input type="submit" value="Submit" /> */}
                </form>
                <img className={styles.bg} src={path} alt="" />
            </div>
            <div className={styles.section}>
                <img src={output} alt="Generated Image will Appear Here" />
            </div>
        </div>
        </>
    )
}