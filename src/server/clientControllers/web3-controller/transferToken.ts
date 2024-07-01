import Web3 from 'web3'; // Import the Web3 library to interact with the Ethereum blockchain
import tokenAddress from '../../../utils/web3ContractData/token-address.json'; // Import token address from a JSON file
import tokenAbi from '../../../utils/web3ContractData/token-address-abi.json'; // Import token ABI from a JSON file
import { prisma } from '~/server/prisma'; // Import Prisma for database interactions

/**
 * Transfers tokens from the owner's address to a specified address.
 * @param payload - Object containing the toAddress and amount of tokens to transfer.
 * @returns An object indicating the success or failure of the transaction.
 */
export async function transferToken(payload: any) {
  try {
    const pk: any = process.env.OWNER_PK; // Owner's private key from environment variables
    const ownerAddress: any = process.env.OWNER_ADDRESS; // Owner's address from environment variables
    const toAddress = payload.toAddress; // Destination address from the payload
    const amount = payload.amount; // Amount of tokens to transfer from the payload
    const rpcUrl: any = process.env.RPC_URL; // RPC URL for connecting to the Ethereum network
    const web3: any = new Web3(rpcUrl); // Initialize a new Web3 instance

    // Create a new contract instance with the token ABI and address
    const tokenContract = new web3.eth.Contract(
      tokenAbi.abi,
      tokenAddress.address,
    );

    // Define the transaction object
    const transaction = {
      from: ownerAddress,
      to: tokenAddress.address,
      maxFeePerGas: web3.utils.toWei('2.6', 'gwei'),
      maxPriorityFeePerGas: web3.utils.toWei('2.5', 'gwei'),
      gasLimit: web3.utils.toHex(3000000),
      data: tokenContract.methods.transfer(toAddress, amount).encodeABI(),
    };

    // Sign the transaction with the owner's private key
    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      pk,
    );
    console.log({ signedTransaction }); // Debug log for the signed transaction

    // Check if the transaction hash already exists in the database
    const transaction_data = await prisma.transaction.findFirst({
      where: { transaction_hash: signedTransaction?.transactionHash },
    });
    if (transaction_data) {
      return { success: false, message: 'Transaction Hash Already Exists' }; // Return error if transaction hash already exists
    }

    // Save the transaction data to the database
    const result = await prisma.transaction.create({
      data: {
        transaction_hash: signedTransaction.transactionHash,
        from: ownerAddress,
        to: toAddress,
        value: amount.toString(),
        event_type: 'Transfer',
      },
    });

    console.log('RESULT : ', result); // Debug log for the database save result

    // Send the signed transaction to the Ethereum network
    const transactionReceipt = web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction,
    );

    // Return success response with transaction details
    return {
      success: true,
      transaction_id: signedTransaction?.transactionHash,
      data: result,
    };
  } catch (err: any) {
    console.log('ERROR : ', err); // Log any errors that occur
    return { success: false, message: err.message }; // Return error response with the error message
  }
}
