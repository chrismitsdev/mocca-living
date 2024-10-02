import postgres from 'postgres'

type User = {
  id: number
  created_at: string
  name: string
  email: string
}

export async function createUser(name: string, email: string) {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set')
  }

  const sql = postgres(databaseUrl, {ssl: true})

  try {
    const response = await sql<User[]>`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `

    if (response.length > 0) {
      console.log(`✅ User ${response[0].name} successfully created!`)
    } else {
      console.log('❌ There was an error in creating the user')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    throw error
  } finally {
    await sql.end()
  }
}
