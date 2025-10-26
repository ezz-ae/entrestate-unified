// Next.js Route: POST /api/pdf
// Body: { uid: string, html: string, filename?: string }
// Returns: { pdfUrl: string, assetId: string }
import { NextResponse } from 'next/server'
import { db, storage } from '@/server/firebase-admin'

export const dynamic = 'force-dynamic'

async function renderPdf(html: string): Promise<Buffer> {
  // Use puppeteer-core with @sparticuz/chromium to run in serverless
  const chromium = await import('@sparticuz/chromium')
  const puppeteer = await import('puppeteer-core')

  const executablePath = await chromium.executablePath()

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: true
  } as any)

  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf({ format: 'A4', printBackground: true })
  await browser.close()
  return pdf
}

export async function POST(req: Request) {
  try {
    const { uid, html, filename } = await req.json() as { uid: string, html: string, filename?: string }
    if (!uid || !html) return NextResponse.json({ error: 'uid and html required' }, { status: 400 })

    const pdfBuf = await renderPdf(html)
    const assetId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
    const fname = `${filename || 'report'}.pdf`

    const bucket = storage.bucket()
    const destPath = `users/${uid}/assets/${assetId}/${fname}`
    const file = bucket.file(destPath)
    await file.save(pdfBuf, { contentType: 'application/pdf', resumable: false, public: false, metadata: { cacheControl: 'private, max-age=0' } })

    // (Optional) record asset
    await db.collection('users').doc(uid).collection('assets').doc(assetId).set({
      assetId,
      type: 'pdf',
      storagePath: destPath,
      createdAt: Date.now(),
      filename: fname
    })

    // Signed URL for download (expires in 24h)
    const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 24*60*60*1000 })

    return NextResponse.json({ pdfUrl: url, assetId })
  } catch (e:any) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
