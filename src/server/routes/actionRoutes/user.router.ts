import getUserWallet from '~/server/clientControllers/user/generate-wallet';
import userTransferToken from '~/server/clientControllers/user/transfer-token';
import { getUserData } from '~/utils/helper';

export default async function userRoutes(req: any, res: any) {
  const userData = await getUserData(req, res);
  console.log('USERDATA : ', userData);
  if (!userData) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { method, query } = req;

  const extendedAction = `${method}-${query.routes.join('/')}`;

  switch (extendedAction) {
    case 'POST-user/generate-wallet':
      return getUserWallet(req, res);
    case 'POST-user/transfer-token':
      return userTransferToken(req, res);
    default:
      return res.status(405).send({ message: 'This request is not allowed' });
  }
}
