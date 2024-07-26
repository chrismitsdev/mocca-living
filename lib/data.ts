import {sql} from '@vercel/postgres'

async function fetchAdmins() {
  try {
    const data = await sql<Admin>`SELECT * FROM admins`
    return data.rows
  } catch(error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

export {
  fetchAdmins
}