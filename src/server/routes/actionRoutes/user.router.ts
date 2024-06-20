import { getUserWallet } from '~/server/clientControllers/user/generate-wallet';

export default async function userRoutes(req: any, res: any) {
  const { method, query } = req;

  const extendedAction = `${method}-${query.routes.join('/')}`;

  switch (extendedAction) {
    case 'POST-user/generate-wallet':
      return getUserWallet(req, res);

    default:
      return res.status(405).send({ message: 'This request is not allowed' });
  }
}
