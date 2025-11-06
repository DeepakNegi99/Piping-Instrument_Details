import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import Busboy from 'busboy';
import { env } from '../../src/env';
import axios from 'axios';

async function parseMultipart(req: HttpRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const bb = Busboy({ headers: req.headers as any });
    let fileBuffer: Buffer = Buffer.alloc(0);
    bb.on('file', (_name, stream) => {
      stream.on('data', (d: Buffer) => (fileBuffer = Buffer.concat([fileBuffer, d])));
    });
    bb.on('finish', () => resolve(fileBuffer));
    bb.on('error', reject);
    (req as any).pipe(bb);
  });
}

async function handler(req: HttpRequest): Promise<HttpResponseInit> {
  try {
    const hasMultipart = (req.headers.get('content-type') || '').includes('multipart');
    if (!hasMultipart) {
      return { status: 400, jsonBody: { error: 'multipart/form-data required' } };
    }

    const buffer = await parseMultipart(req);
    if (!buffer.length) return { status: 400, jsonBody: { error: 'No file' } };

    if (env.AI_SERVICE_ENDPOINT && env.AI_SERVICE_KEY) {
      const result = await axios.post(env.AI_SERVICE_ENDPOINT, buffer, {
        headers: {
          'Ocp-Apim-Subscription-Key': env.AI_SERVICE_KEY,
          'Content-Type': 'application/octet-stream'
        }
      });
      return { status: 200, jsonBody: result.data, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
    }

    // Fallback mock result
    return { status: 200, jsonBody: { damageLikelihood: 'unknown', notes: 'AI service not configured' }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  } catch (err) {
    return { status: 500, jsonBody: { error: 'Internal server error' }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  }
}

app.http('ai-detect', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'api/ai-detect',
  handler
});
