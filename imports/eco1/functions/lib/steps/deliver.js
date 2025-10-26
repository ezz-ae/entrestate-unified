export async function deliver(ctx, payload) {
    // If source == 'wa', call your Next route /api/wa/send with pdfUrl/media
    // For now, just echo what would be delivered.
    return { delivered: ctx.source, payload };
}
