import mainRoutes from '../../server/routes';
import awsConfig from '~/server/lib/AWSConfig';
import { NextApiRequest, NextApiResponse } from 'next';
import erc20abi from '../../utils/web3ContractData/token-address-abi.json';
import Web3, { Contract, WebSocketProvider } from 'web3';
import { updateTransaction } from '~/server/clientControllers/web3-controller/functions/updateTransaction';

//# AWS Configuration
awsConfig();

let flag = false;

/* 
  Workaround for JSON.stringify() event logs with BigInt values. 
  We need to stringify event logs for more readable logging in CloudWatch.
  https://github.com/GoogleChromeLabs/jsbi/issues/30
*/
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * Starts the smart contract event listener.
 * Websocket Provider config: https://docs.web3js.org/api/web3-providers-ws/class/WebSocketProvider
 * @param chain - Name of the blockchain network for logging purposes.
 * @param wssEndpoint - Websocket endpoint for the blockchain network.
 * @param contractAddress - Smart contract address.
 */
const startEventListener = async (
  chain: string,
  wssEndpoint: string,
  contractAddress: string,
) => {
  const provider = new WebSocketProvider(
    wssEndpoint,
    {},
    {
      autoReconnect: true,
      delay: 10000, // Default: 5000 ms
      maxAttempts: 10, // Default: 5
    },
  );

  provider.on('connect', () => {
    console.log(`Connected to ${chain} websocket provider`);
  });

  provider.on('disconnect', (error) => {
    console.error(`Closed ${chain} webSocket connection`, error);
  });

  const web3 = new Web3(provider);

  /*
    Smart contract event listeners

    Listening to events:
      - Transfer
      - Approval
  */
  const contract: any = new web3.eth.Contract(erc20abi?.abi, contractAddress);
  await subscribeToEvent(chain, contract, 'Transfer');
};

/**
 * Subscribes to a smart contract event.
 * @param chain - Name of the blockchain network for logging purposes.
 * @param contract - Smart contract address.
 * @param eventName - Name of the event to subscribe to.
 */
const subscribeToEvent = async (
  chain: string,
  contract: any,
  eventName: string,
) => {
  const subscription = contract?.events[eventName]();

  subscription.on('connected', (subscriptionId: any) => {
    console.log(`${chain} USDT '${eventName}' SubID:`, subscriptionId);
  });

  subscription.on('data', async (event: any) => {
    console.log(`${chain} USDT '${eventName}'`, JSON.stringify({ event })); // cannot json.stringify BigInt...
    const payload = {
      transaction_hash: event?.transactionHash,
      status: 'success',
    };
    await updateTransaction(payload);
  });

  subscription.on('changed', (event: any) => {
    // Remove event from local database
  });

  subscription.on('error', (error: any) => {
    console.error(`${chain} USDT '${eventName}' error:`, error);
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!flag) {
    flag = true;
    startEventListener(
      'Polygon Amoy',
      'wss://polygon-amoy.g.alchemy.com/v2/fqk5-s1wv0q2e_OrG5knHMwbNcnVGXex',
      '0xcb9a62452a47c0f5fb7f05ce7b7c2f3af2cd4e59',
    );
  }

  return mainRoutes(req, res);
}
