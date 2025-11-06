import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import Busboy from 'busboy';
import { env } from '../../src/env';

async function parseMultipart(req: HttpRequest): Promise<{ filename: string; buffer: Buffer } | null> {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: req.headers as any });
    let buffer: Buffer = Buffer.alloc(0);
    let filename = '';
    bb.on('file', (_name, stream, info) => {
      filename = (info && (info as any).filename) || 'upload.bin';
      stream.on('data', (d: Buffer) => (buffer = Buffer.concat([buffer, d])));
    });
    bb.on('finish', () => resolve(buffer.length ? { filename, buffer } : null));
    bb.on('error', reject);
    (req as any).pipe(bb);
  });
}

async function handler(req: HttpRequest): Promise<HttpResponseInit> {
  const result = await parseMultipart(req);
  if (!result) return { status: 400, jsonBody: { error: 'No file' }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  // TODO: store in blob storage
  return { status: 200, jsonBody: { ok: true, filename: result.filename, size: result.buffer.length }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
}

app.http('upload', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'api/upload',
  handler
});
