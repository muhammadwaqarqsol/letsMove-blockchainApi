import userRoutes from '../actionRoutes/user.router';

export default async function openRoutes(req: any, res: any) {
  const { query } = req;

  console.log({ query });

  switch (query.routes[0]) {
    case 'user':
      return userRoutes(req, res);
    default:
      return res.status(405).send({ message: 'This request is not allowed' });
  }
}
