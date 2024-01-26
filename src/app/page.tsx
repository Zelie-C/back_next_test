'use client'
import styles from '*.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("api/pilotes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)

      setData(data.pilotes)
    })
  }, [])

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Pilotes</h1>
      <div className={styles.grid}>
        {data.map((pilote: {id: string, name: string,}) => (
          <a
            key={pilote.id}
          >
            <h3>{pilote.name}</h3>
          </a>
        ))}
      </div>
    </main>
  )
}
