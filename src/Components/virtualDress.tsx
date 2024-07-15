import { RefObject, useRef, useState } from 'react'
import { Navbar } from './navbar'
import { uploadImage } from '../API/apiHandler'
import styles from './sectionStyles.module.css'

export function VirtualDress() {
    const [path, setPath] = useState('')
    const [output, setOutput] = useState("http://localhost:8080/image/output.jpg")
    const choiceRef:RefObject<HTMLSelectElement> = useRef(null)

    const onChange = (event: any) => {
        setOutput("http://localhost:8080/image/CRLogo.png")
        setPath(URL.createObjectURL(event.target.files[0]))

        const data = new FormData()
        console.log(event.target.files[0])
        data.append('file', event.target.files[0])
        data.append('fileName', event.target.value)
        data.append('dressType', choiceRef.current!.value)
        for (const element of data.entries()) {
            console.log(element)
        }
        console.log("Generating")
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
                    <select name="select" ref={choiceRef} id="">
                        <option value="Raincoat">Yello raincoat</option>
                        <option value="Frock">Pink frock</option>
                        <option value="Hoodie">Blue hoodie</option>
                    </select>
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