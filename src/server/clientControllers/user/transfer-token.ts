import rateLimitMiddleware from '~/middleware/rateLimiter'; // Import rate limiting middleware
import { transferTokenSchema } from '~/schema/user'; // Import schema for input validation
import { transferToken } from '../web3-controller/transferToken'; // Import the function to transfer tokens

/**
 * Handles user token transfer requests.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
async function userTransferToken(req: any, res: any) {
  try {
    // Check if request body is present
    if (!req.body)
      return res.status(400).send({ message: 'payload not found' });

    const input = req.body; // Extract input from request body
    const validate: any = transferTokenSchema.safeParse(input); // Validate the input against the schema

    // If validation fails, send a 400 response with an error message
    if (!validate.success)
      return res.status(400).send({
        message:
          validate?.error && validate?.error?.errors[0]?.message
            ? validate?.error?.errors[0]?.message
            : 'Bad Request',
      });

    // Todo: Check auth for user Data (authentication and authorization checks)

    // Call the function to transfer tokens with provided input
    const response: any = await transferToken({
      toAddress: input?.toAddress,
      amount: input?.amount,
    });
    console.log('Response :', response); // Debug log for response

    // If the response indicates a failure, throw an error
    if (!response?.success) {
      throw new Error(response?.message);
    }

    // If the transfer is successful, send a 200 response with success message and data
    return res.status(200).send({
      success: true,
      message: 'Token Successfully Transferred',
      data: response?.data,
    });
  } catch (err: any) {
    console.log('Error :', err.message); // Log the error message
    res.status(500).send({ message: err.message as string }); // Send a 500 response with the error message
  }
}

export default rateLimitMiddleware(userTransferToken); // Apply rate limiting middleware to the function
