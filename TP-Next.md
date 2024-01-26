# Next JS

## Pourquoi on voit ça maintenant ?

Avec les bases en API (express surtout) et en React, on peut commencer à voir comment faire une application web avec Next JS.
On a parlé des API Monolithique, Microservice et Headless CMS. On va voir comment utiliser des serverless functions.
Vous verrez sûrement ce sujet une nouvelle fois dans l'année.

## Qu'est ce que Next JS ?

C'est le symfony ou le laravel du monde React. C'est un framework qui permet de faire des applications web avec React, avec un back-end en serverless functions et un front-end en React, avec un système de routing, de gestion de données, de gestion de l'authentification, etc...

## Comment ça marche ?

Nous allons utiliser trois choses :
- Une base de données PostgreSQL hébergéé et gratuite et l'utiliser avec Prisma
- Un back-end en serverless functions
- Un front-end en React

## Setup Next JS

Pour commencer, on va créer un projet Next JS avec le CLI de Next JS.

```bash
npx create-next-app
```

Attention, il vous faut Node JS en version récente (18.19.0)

## Créer une base Neon

https://neon.tech
=> Créer une base de données et récupérer la "connection string"

## Installer Prisma

```bash
npm install prisma -D
npx prisma init
```

## Créer un model Prisma

Dans le fichier schema.prisma, ajouter un model Product

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Pilote {
  id            Int @id @default(autoincrement())
  name          String @db.VarChar(255)
  age           Int
}
```

Puis synchroniser la base de données avec le model

```bash
npx prisma db push
```

Et générer le client Prisma

```bash
npx prisma generate
```

## Créer une serverless function qui permet de renvoyer la liste des données de la table Pilotes

Dans le dossier pages, créez un dossier api  
Dans le dossier pages/api, créer un fichier pilotes.ts

```ts
import { PrismaClient, Pilote } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  req: NextRequest
) {
    const pilotes = await prisma.pilote.findMany()
    return NextResponse.json({ pilotes })
}

export async function POST(
  req: NextRequest
) {
    const newPilote = await prisma.pilote.create({
        data: {
            name: "test",
            age: 18
        }
    })
    
    return NextResponse.json({ newPilote })
}
```

## Créer un pilote en appelant la serverless function

Dans un fichier requests.http, ajouter le code suivant

```http
POST http://localhost:3000/api/pilotes
```

## Affichage de la liste des pilotes

Créer un fichier src/app/page.tsx

```tsx
'use client';
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/pilotes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setData(data.pilotes)
      });
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Pilotes</h1>
      <div className={styles.grid}>
        {data.map((pilote: {id: string, name: string}) => (
          <a
            key={pilote.id}
          >
            <h3>{pilote.name}</h3>
          </a>
        ))}
      </div>      
    </main>
  );
}
```

## Mise en prod sur Vercel

Installer le site sur Vercel

## Amusez vous avec Next JS ^^

Pas de consignes supplémentaires, juste amusez vous avec Next JS et demandez moi si vous avez des questions, ou pas d'idées ^^

1) Uiliser les requests pour ajouter des pilotes
2) Créer une page qui permet d'ajouter des pilotes avec un formulaire
3) Créer les méthodes CRUD pour les pilotes