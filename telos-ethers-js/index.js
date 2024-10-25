const { ethers } = require('ethers');

const abi = [
    {
        "type": "function",
        "name": "increment",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "number",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setNumber",
        "inputs": [
            {
                "name": "newNumber",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    }
];

// Telos EVM testnet RPC URL
const rpcUrl = 'https://testnet.telos.net/evm';

// Create a Provider
const provider = new ethers.JsonRpcProvider(rpcUrl);

// Don't show your private key to anyone and anywhere
const privateKey = '3a4d8c6d4e4fc2bdbe0f66e12fd15f64736b2a8c829a1dfc28c944aeb0d8f344';
const wallet = new ethers.Wallet(privateKey, provider);

// Query account balance
async function getBalance(address) {
    const balance = await provider.getBalance(address);
    console.log(`Balance of ${address}: ${ethers.formatEther(balance)} TLOS`);
}

async function callContractMethod(contractAddress) {
    // Create contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // Call method
    const tx = await contract.setNumber(1);
    console.log(`https://testnet.teloscan.io/tx/${tx.hash}`);
    const result = await contract.number();
    console.log('number result:', result);
}

getBalance(wallet.address);
callContractMethod('0x52aA02144938dA5bF9DCcD674f67c9C9a94f58cA');