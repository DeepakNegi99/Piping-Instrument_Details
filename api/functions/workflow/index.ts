import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { prisma } from '../../src/prisma';
import { logger } from '../../src/logger';
import { env } from '../../src/env';

async function handler(req: HttpRequest): Promise<HttpResponseInit> {
  try {
    const body = await req.json();
    const { requestId, action, comment } = body as { requestId: string; action: string; comment?: string };

    // Store comment (stub)
    if (comment) {
      await prisma.requestComment.create({ data: { requestId, comment } });
    }

    // Update status (stub)
    if (action === 'APPROVE') {
      await prisma.request.update({ where: { id: requestId }, data: { status: 'APPROVED' } });
    } else if (action === 'REJECT') {
      await prisma.request.update({ where: { id: requestId }, data: { status: 'REJECTED' } });
    }

    return { status: 200, jsonBody: { ok: true }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  } catch (err) {
    logger.error('workflow handler error', { err });
    return { status: 500, jsonBody: { error: 'Internal server error' }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  }
}

app.http('workflow', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'api/workflow',
  handler
});
