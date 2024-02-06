import { getWeb3 } from "../util/getWeb3";
import { MINT_ABI, COLLECTION_ABI, AUCTION_ABI } from "../abis/abis";
import { ETH_CONTRACTS } from "../util/AppEndpoint";
import Web3 from "web3";

const mintCollection = async (parm) => {
  let obj = await getWeb3(MINT_ABI);
  if (obj?.mintContract) {
    let acc = await obj?.web3_instance.eth.getAccounts();
    let collect = await obj?.mintContract.methods
      .newCollectionMint(parm?.collectName, parm?.artName, parm?.artUrl)
      .send({ from: acc[0] });
    return collect;
  }
};

const mintArtwork = async (params) => {
  if (window.ethereum) {
    await window.ethereum.enable();
    let web3Instance = await new Web3(window.ethereum);
    let acc = await web3Instance.eth.getAccounts();
    let collectionContract = await new web3Instance.eth.Contract(
      COLLECTION_ABI,
      params.collectionAddress
    );
    return await collectionContract.methods
      .mintTo(params.address)
      .send({ from: acc[0] });
  } else {
    alert("Please Connect The Meta Mask");
  }
};

const createAution = (params) => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      let web3Instance = await new Web3(window.ethereum);
      await window.ethereum.enable();
      let acc = await web3Instance.eth.getAccounts();
      let auctionContract = await new web3Instance.eth.Contract(
        AUCTION_ABI,
        ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
      );
      auctionContract.methods
        .NewAuction(
          params.collectionAddress,
          params.tokenId,
          params.startTime,
          params.endTime,
          params.startPrice
        )
        .send({ from: acc[0] })
        .then(() => {
          resolve({
            status: true,
          });
        })
        .catch((err) => {
          console.log(err);
          reject({
            status: false,
          });
        });
    } else {
      alert("Please Connect The Meta Mask");
      resolve({
        status: false,
      });
    }
  });
};

const placeBid = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        let web3Instance = await new Web3(window.ethereum);
        await window.ethereum.enable();
        let acc = await web3Instance.eth.getAccounts();
        let auctionContract = await new web3Instance.eth.Contract(
          AUCTION_ABI,
          ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
        );
        await auctionContract.methods
          .Bid(params.auctionId)
          .send({ from: acc[0], value: params.amount, gasPrice: 7000000000 });
        resolve({
          status: true,
        });
      } else {
        alert("Please Connect The Meta Mask");
        resolve({
          status: false,
        });
      }
    } catch (e) {
      reject({
        status: false,
      });
    }
  });
};

const claimSaleFromContract = (params) => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      let web3Instance = await new Web3(window.ethereum);
      await window.ethereum.enable();
      let acc = await web3Instance.eth.getAccounts();
      let auctionContract = await new web3Instance.eth.Contract(
        AUCTION_ABI,
        ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
      );
      await auctionContract.methods
        .collectETH(params.auctionId)
        .send({ from: acc[0] });
      resolve({
        status: true,
      });
    } else {
      alert("Please Connect The Meta Mask");
      reject({
        status: false,
      });
    }
  });
};

const claimBackFromContract = (params) => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      let web3Instance = await new Web3(window.ethereum);
      await window.ethereum.enable();
      let acc = await web3Instance.eth.getAccounts();
      let auctionContract = await new web3Instance.eth.Contract(
        AUCTION_ABI,
        ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
      );
      await auctionContract.methods
        .cancelAuction(params.auctionId)
        .send({ from: acc[0] });
      resolve({
        status: true,
      });
    } else {
      alert("Please Connect The Meta Mask");
      reject({
        status: false,
      });
    }
  });
};

const claimNft = (params) => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      let web3Instance = await new Web3(window.ethereum);
      await window.ethereum.enable();
      let acc = await web3Instance.eth.getAccounts();
      let auctionContract = await new web3Instance.eth.Contract(
        AUCTION_ABI,
        ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
      );
      await auctionContract.methods
        .claimNFT(params.auctionId)
        .send({ from: acc[0] });
      resolve({
        status: true,
      });
    } else {
      alert("Please Connect The Meta Mask");
      reject({
        status: false,
      });
    }
  });
};

const putNftOnSale = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        let web3Instance = await new Web3(window.ethereum);
        await window.ethereum.enable();
        let acc = await web3Instance.eth.getAccounts();
        let auctionContract = await new web3Instance.eth.Contract(
          AUCTION_ABI,
          ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
        );
        let res = await auctionContract.methods
          .SaleNFT(params.collectionAdress, params.tokenId, params.price)
          .send({ from: acc[0] });
        resolve({
          status: true,
        });
      } else {
        alert("Please Connect The Meta Mask");
        reject({
          status: false,
        });
      }
    } catch (e) {
      reject({
        status: false,
      });
    }
  });
};

const cancelNftSale = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        let web3Instance = await new Web3(window.ethereum);
        await window.ethereum.enable();
        let acc = await web3Instance.eth.getAccounts();
        let auctionContract = await new web3Instance.eth.Contract(
          AUCTION_ABI,
          ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
        );
        let res = await auctionContract.methods
          .cancelSale(params.saleId)
          .send({ from: acc[0] });
        resolve({
          status: true,
        });
      } else {
        alert("Please Connect The Meta Mask");
        reject({
          status: false,
        });
      }
    } catch (e) {
      reject({
        status: false,
      });
    }
  });
};

const buyNft = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        let web3Instance = await new Web3(window.ethereum);
        await window.ethereum.enable();
        let acc = await web3Instance.eth.getAccounts();
        let auctionContract = await new web3Instance.eth.Contract(
          AUCTION_ABI,
          ETH_CONTRACTS.AUCTION_CONTRACT_ADDRESS
        );
        let res = await auctionContract.methods
          .buyNFTsale(params.saleId)
          .send({ from: acc[0], value: params.amount, gasPrice: 7000000000 });
        resolve({
          status: true,
        });
      } else {
        alert("Please Connect The Meta Mask");
        reject({
          status: false,
        });
      }
    } catch (e) {
      reject({
        status: false,
      });
    }
  });
};

export {
  mintCollection,
  mintArtwork,
  createAution,
  placeBid,
  claimNft,
  claimSaleFromContract,
  claimBackFromContract,
  putNftOnSale,
  cancelNftSale,
  buyNft,
};
