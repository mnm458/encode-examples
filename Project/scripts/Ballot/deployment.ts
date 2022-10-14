import {ContractFactory, ethers} from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json"
const EXPOSED_KEY = "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

const PROPOSALS = ["Proposal 1". "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]){
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++){
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main(){
  const contractFactory = new ethers.ContractFactory(ballotJson.abi, ballotJson.bytecode);
  const contract = await contractFactory.deploy(convertStringArrayToBytes32(PROPOSALS));
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});