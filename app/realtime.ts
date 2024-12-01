import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export function setupRealtimeMiddleware() {
  // Middleware for User model changes
  prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
    const result = await next(params);
    if (params.model === 'User') {
      console.log('User data changed:', result);
    }
    return result as Prisma.JsonValue;
  });

  // Generic middleware for all model changes
  prisma.$use(async (params: Prisma.MiddlewareParams, next) => {
    const result = await next(params);
    if (params.model && typeof params.model === 'string') {
      console.log(`${params.model} data changed:`, result);
    }
    return result as Prisma.JsonValue;
  });

  console.log('Realtime middleware setup complete');
}

// Initialize the middleware
setupRealtimeMiddleware();