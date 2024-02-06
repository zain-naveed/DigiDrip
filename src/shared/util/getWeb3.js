import Web3 from "web3";
import { ETH_CONTRACTS } from "../util/AppEndpoint";
import { toastMessage } from "../components/common/toast";
export let WEB3_INSTANCE = null;
export let MINT_CONTRACT = null;

export const getWeb3 = async (abi) => {
  if (window.ethereum) {
    window.ethereum.on("connect", () => {
      console.log("Metamask connected");
    });
    WEB3_INSTANCE = new Web3(window.ethereum);

    try {
      await window.ethereum.enable();
      let cont = await initalizeConctract(WEB3_INSTANCE, abi);
      return {
        mintContract: cont,
        web3_instance: WEB3_INSTANCE,
      };
    } catch (e) {
      throw e;
    }
  } else if (window.web3) {
    WEB3_INSTANCE = window.web3;

    let cont = await initalizeConctract(WEB3_INSTANCE, abi);
    return {
      mintContract: cont,
      web3_instance: WEB3_INSTANCE,
    };
  } else {
    // for the local connection
    // const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    // WEB3_INSTANCE = new Web3(provider);
    // console.log("No Web 3 instance injected");
    // let cont = await initalizeConctract(WEB3_INSTANCE, abi);
    // return {
    //   mintContract: cont,
    //   web3_instance: WEB3_INSTANCE,
    // };
    toastMessage("Please Connect The Meta Mask", "error");
    return false;
  }
};

const initalizeConctract = async (WEB3, abi) => {
  if (abi) {
    let res = await new WEB3.eth.Contract(
      abi,
      ETH_CONTRACTS.MINT_NFT_CONTRACT_ADDRESS
    );
    MINT_CONTRACT = res;
    return res;
  } else {
    return null;
  }
};
