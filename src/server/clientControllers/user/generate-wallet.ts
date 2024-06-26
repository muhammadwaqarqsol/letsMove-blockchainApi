import { verifyJWT } from '~/utils/jwt';
import { createSmartAccount } from '../web3-controller/createAccount';
import rateLimitMiddleware from '~/middleware/rateLimiter';

async function getUserWallet(req: any, res: any) {
  try {
    console.log('check', req?.body);
    const privatekey = req.body.decodePrivateKey;

    console.log('PRIVATE : ', privatekey);
    // Decode private address using JWT
    const decodePrivateAddress: any = await verifyJWT(privatekey);
    console.log('PRivate decode : ', decodePrivateAddress);
    const smartAccount = await createSmartAccount({
      private_address: decodePrivateAddress?.decodePrivateKey,
    });
    console.log({ smartAccount });
    const smartAccountAddress = await smartAccount.getAccountAddress();
    return res.status(200).send({ walletAddress: smartAccountAddress });
  } catch (err: any) {
    res.status(500).send({ message: err.message as string });
  }
}
export default rateLimitMiddleware(getUserWallet)
