import postgres from 'postgres'

type User = {
  id: number
  name: string
  email: string
}

const sql = postgres(process.env.DATABASE_URL as string, {ssl: true})

export async function createUser(name: string, email: string) {
  try {
    const response = await sql<User[]>`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `

    if (response.length > 0) {
      const {name, email} = response[0]
      console.log('User successfully created!', {name, email})
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    throw error
  }
}

// import postgres from 'postgres'

// type User = {
//   id: number
//   name: string
//   email: string
// }

// export async function createUser(name: string, email: string) {
//   const databaseUrl = process.env.DATABASE_URL

//   if (!databaseUrl) {
//     throw new Error('DATABASE_URL is not set')
//   }

//   const sql = postgres(databaseUrl, {ssl: true})

//   try {
//     const response = await sql<User[]>`
//       INSERT INTO users (name, email)
//       VALUES (${name}, ${email})
//       RETURNING *
//     `

//     if (response.length > 0) {
//       const {name, email} = response[0]
//       console.log('User successfully created!', {name, email})
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message)
//     } else {
//       console.error(error)
//     }
//     throw error
//   } finally {
//     await sql.end()
//   }
// }
