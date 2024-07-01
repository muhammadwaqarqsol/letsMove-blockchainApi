import { verifyJWT } from '~/utils/jwt'; // Import function to verify JWT
import { createSmartAccount } from '../web3-controller/createAccount'; // Import function to create a smart account
import rateLimitMiddleware from '~/middleware/rateLimiter'; // Import rate limiting middleware

/**
 * Handles the retrieval of a user's wallet address.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
async function getUserWallet(req: any, res: any) {
  try {
    const privatekey = req.body.decodePrivateKey; // Extract the private key from the request body

    // Verify the JWT to decode the private address
    const decodePrivateAddress: any = await verifyJWT(privatekey);
    console.log('Private decode : ', decodePrivateAddress); // Debug log for the decoded private address

    // Create a smart account using the decoded private address
    const smartAccount = await createSmartAccount({
      private_address: decodePrivateAddress?.decodePrivateKey,
    });
    console.log({ smartAccount }); // Debug log for the smart account

    // Get the smart account address
    const smartAccountAddress = await smartAccount.getAccountAddress();

    // Send the smart account address in the response
    return res.status(200).send({ walletAddress: smartAccountAddress });
  } catch (err: any) {
    // Handle any errors by sending a 500 response with the error message
    res.status(500).send({ message: err.message as string });
  }
}

export default rateLimitMiddleware(getUserWallet); // Apply rate limiting middleware to the function
