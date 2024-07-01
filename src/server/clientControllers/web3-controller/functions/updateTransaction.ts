import { prisma } from '~/server/prisma';

export async function updateTransaction(payload: any) {
  try {
    const transactionData = await prisma.transaction.findFirst({
      where: {
        transaction_hash: payload?.transaction_hash,
      },
    });
    if (transactionData) {
      await prisma.transaction.update({
        where: {
          transaction_hash: payload?.transaction_hash,
        },
        data: {
          status: payload?.status,
        },
      });
      console.log('UPDATED --------------');
      return { success: true };
    }
  } catch (err) {
    // Throw an error if transaction execution fails
    throw new Error('Failed executing transaction');
  }
}
