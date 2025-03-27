import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

export async function getOpengraphData(): Promise<{
  src: string
  font: Buffer<ArrayBufferLike>
}> {
  // Logo loading
  const logoData = await readFile(
    join(process.cwd(), 'public/images/other/opengraph.png')
  )
  // Font loading
  const commissionerSemiBold = await readFile(
    join(process.cwd(), 'assets/Commissioner-SemiBold.ttf')
  )
  const imgSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return {
    src: imgSrc,
    font: commissionerSemiBold
  }
}
