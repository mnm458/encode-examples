import {ethers} from "ethers";
import "dotenv/config";

const EXPOSED_KEY = "";

function convertStringArrayToBytes32(array: string[]){
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++){
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main(){
  //TODO
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});