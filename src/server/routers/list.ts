/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

/**
 * Default selector for List.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultListSelect = Prisma.validator<Prisma.ListSelect>()({
  id: true,
  name: true,
  items: true,
});

export const listRouter = createRouter()
  // read
  .query('all', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.list.findMany({
        select: defaultListSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const list = await prisma.list.findUnique({
        where: { id },
        select: defaultListSelect,
      });
      if (!list) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No list with id '${id}'`,
        });
      }
      return list;
    },
  });
