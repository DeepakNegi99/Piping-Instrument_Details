import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { prisma } from '../../src/prisma';
import { logger } from '../../src/logger';
import { env } from '../../src/env';

async function handler(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    if (req.method === 'GET') {
      const items = await prisma.request.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
      return { status: 200, jsonBody: items, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
    }

    if (req.method === 'POST') {
      const body = await req.json() as any;
      const created = await prisma.request.create({
        data: {
          serialNumber: body.serialNumber,
          facility: body.facility,
          site: body.site,
          description: body.description,
          status: 'NEW'
        }
      });
      return { status: 201, jsonBody: created, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
    }

    return { status: 405, jsonBody: { error: 'Method not allowed' }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  } catch (err) {
    logger.error('requests handler error', { err });
    return { status: 500, jsonBody: { error: 'Internal server error' }, headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGINS } };
  }
}

app.http('requests', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'api/requests',
  handler
});
