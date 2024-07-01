import Web3 from 'web3';
import tokenAddress from '../../utils/web3ContractData/token-address.json';
import tokenAbi from '../../utils/web3ContractData/token-address-abi.json';

const rpcUrl: any = process.env.RPC_URL;
const web3: any = new Web3(rpcUrl);
const tokenContract = new web3.eth.Contract(
  tokenAbi.abi, //ABI
  tokenAddress.address,
); //Contract Address

console.log('Beginning routine');
console.log('Listening for events >...');

tokenContract.events['Transfer']({}, (error: any, event: any) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('New event received:');
  console.log(event.returnValues);
})
  .on('connected', () => {
    console.log('Connected to the blockchain');
  })
  .on('changed', (event: any) => {
    console.log('Event changed:', event.returnValues);
  })
  .on('error', (error: any) => {
    console.error('Event error:', error);
  });

console.log('End of routine');
