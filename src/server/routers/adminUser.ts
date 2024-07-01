import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

import { prisma } from '~/server/prisma';
import { hashPass, isSamePass } from '~/utils/hash';
import { serialize } from 'cookie';
import { signJWT, verifyJWT } from '~/utils/jwt';

export const adminUserRouter = router({
  // me: publicProcedure.query(async ({ ctx }) => {
  //   const token = ctx?.req?.cookies['ticketing-admin-token'];
  //   console.log({ token });
  //   let userData;
  //   if (token) {
  //     userData = await verifyJWT(token);
  //   } else {
  //     throw new TRPCError({
  //       code: 'NOT_FOUND',
  //       message: 'Token not found!',
  //     });
  //   }
  //   const user = await prisma.adminUser.findUnique({
  //     where: { id: userData.id },
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //       role_id: true,
  //     },
  //   });
  //   if (!user)
  //     throw new TRPCError({
  //       code: 'NOT_FOUND',
  //       message: 'User not found!',
  //     });
  //   return user;
  // }),
});
