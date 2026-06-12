import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const db = new PrismaClient()

async function main() {
  const email = "jeetshahajwa@gmail.com"
  const password = "changeme123" // change after first login

  const existing = await db.adminUser.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin user already exists.")
    return
  }

  const hashed = await bcrypt.hash(password, 12)
  await db.adminUser.create({ data: { email, password: hashed } })
  console.log(`Admin created: ${email} / ${password}`)
  console.log("Change your password after first login!")
}

main().finally(() => db.$disconnect())
