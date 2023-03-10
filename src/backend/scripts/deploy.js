const fromWei = (num) => ethers.utils.formatEther(num)

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", fromWei(await deployer.getBalance()));

  const teamWallet = "0xc1162882863C55e8cDF8cfCf34758C83709ADF3f" // goerli
  // const teamWallet = "" // mainnet
  
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(teamWallet);
  console.log("NFT contract address", nft.address)
  saveFrontendFiles(nft, "NFT");

  // For testing
  // await nft.setMintEnabled(true);
  // // await nft.setPrice(0); // Price is already 0
  // await nft.mint(1, { value: 0});
  // console.log("Goerli test functions called")
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
