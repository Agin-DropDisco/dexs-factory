const DexSwapFeeReceiver = artifacts.require("DexSwapFeeReceiver");
const DexSwapFeeSetter = artifacts.require("DexSwapFeeSetter");
const DexSwapDeployer = artifacts.require("DexSwapDeployer");
const DexSwapFactory = artifacts.require("DexSwapFactory");
const DexSwapERC20 = artifacts.require("DexSwapERC20");
const xDEXS = artifacts.require("xDEXS");
const WONE = artifacts.require("WONE");
const WMATIC = artifacts.require("WMATIC");
const AURORA = artifacts.require("AURORA");


const argValue = (arg, defaultValue) => process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue
const network = () => argValue('--network', 'local')

const DexSwapZoo = "0x45e92Dd180ECa40f90556Aa5B84620F253194E5E"; // AURORA
// const DexSwapZoo = ""; // MUMBAI
// const DexSwapZoo = ""; // MAINNET
// const DexSwapZoo = ""; // TESTNET

module.exports = async (deployer) => {

    const BN = web3.utils.toBN;
    const bnWithDecimals = (number, decimals) => BN(number).mul(BN(10).pow(BN(decimals)));
    const senderAccount = (await web3.eth.getAccounts())[0];

    if (network() === "aurora") {


        console.log();
        console.log(":: Deploying Wrapped Aurora"); 
        await deployer.deploy(AURORA)
        const AURORAInstance = await AURORA.deployed();
        console.log();
        console.log(":: AURORA DEPOSIT CALL");
        await AURORAInstance.deposit({ from: senderAccount, value: 1 });
        console.log();

        console.log();
        console.log(":: Init DexSwap Deployer");
        await deployer.deploy(DexSwapDeployer, DexSwapZoo, senderAccount, AURORAInstance.address, [AURORAInstance.address], [DexSwapZoo], [25]);
        const dexSwapDeployer = await DexSwapDeployer.deployed();

        console.log();
        console.log(":: Start Sending 1 WEI ...");
        await dexSwapDeployer.send(1, {from: senderAccount}); 


        console.log();
        console.log(":: Sent deployment reimbursement");
        await dexSwapDeployer.deploy({from: senderAccount})
        console.log("Deployed dexSwap");


        console.log();
        console.log(":: Deploying Factory");
        await deployer.deploy(DexSwapFactory, senderAccount);
        const DexSwapFactoryInstance = await DexSwapFactory.deployed();
        
        
        console.log();
        console.log(":: Start Deploying DexSwap LP");
        await deployer.deploy(DexSwapERC20);
        const DexSwapLP = await DexSwapERC20.deployed();
        

        console.log(":: Start Deploying FeeReceiver");
        await deployer.deploy(DexSwapFeeReceiver, senderAccount, DexSwapFactoryInstance.address, AURORAInstance.address, DexSwapZoo, senderAccount);
        const DexSwapFeeReceiverInstance =  await DexSwapFeeReceiver.deployed();
        console.log();


        console.log(":: Start Deploying FeeSetter");
        await deployer.deploy(DexSwapFeeSetter, senderAccount, DexSwapFactoryInstance.address);
        const DexSwapFeeSetterInstance = await DexSwapFeeSetter.deployed();


        console.log();
        console.log(":: Setting Correct FeeSetter in Factory");
        await DexSwapFactoryInstance.setFeeToSetter(DexSwapFeeSetterInstance.address);


        console.log();
        console.log(":: Transfer Ownership FeeReceiver");
        await DexSwapFeeReceiverInstance.transferOwnership(senderAccount);


        console.log();
        console.log(":: Transfer Ownership FeeSetter");
        await DexSwapFeeSetterInstance.transferOwnership(senderAccount);

        console.log();
        console.log(":: Updating Protocol FeeReceiver");
        await DexSwapFeeReceiverInstance.changeReceivers(DexSwapZoo, senderAccount, {from: senderAccount});

        
        console.log();
        console.log("====================================================================");
        console.log(`Deployer Address:`,     dexSwapDeployer.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`Factory Address:`,      DexSwapFactoryInstance.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`DexSwap LP Address:`,   DexSwapLP.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`Fee Setter Address:`,   DexSwapFeeSetterInstance.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`Fee Receiver Address:`, DexSwapFeeReceiverInstance.address);
        console.log("====================================================================");
        
        console.log("====================================================================");
        console.log(`DexSwapZoo Token Address:`,  DexSwapZoo);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`AURORA Token Address:`,  AURORAInstance.address);
        console.log("====================================================================");

        console.log("=============================================================================");
        console.log(`Code Hash:`, await DexSwapFactoryInstance.INIT_CODE_PAIR_HASH());
        console.log("=============================================================================");

        console.log("DONE");

    } else if (network() === "mumbai") {

        console.log();
        console.log(":: Deploying WMATIC"); 
        
        const WONEInstance = await WMATIC.at('0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'); 
        
        console.log();
        console.log(":: WMATIC DEPOSIT CALL");
        await WONEInstance.deposit({ from: senderAccount, value: 1 });
        console.log();


        console.log();
        console.log(":: Init DexSwap Deployer");
        await deployer.deploy(DexSwapDeployer, DexSwapZoo, senderAccount, WONEInstance.address, [WONEInstance.address], [DexSwapZoo], [25]);
        const dexSwapDeployer = await DexSwapDeployer.deployed();

        console.log();
        console.log(":: Start Sending 1 WEI ...");
        await dexSwapDeployer.send(1, {from: senderAccount}); 


        console.log();
        console.log(":: Sent deployment reimbursement");
        await dexSwapDeployer.deploy({from: senderAccount})
        console.log("Deployed dexSwap");


        console.log();
        console.log(":: Deploying Factory");
        await deployer.deploy(DexSwapFactory, senderAccount);
        const DexSwapFactoryInstance = await DexSwapFactory.deployed();
        
        
        console.log();
        console.log(":: Start Deploying DexSwap LP");
        await deployer.deploy(DexSwapERC20);
        const DexSwapLP = await DexSwapERC20.deployed();
        

        console.log(":: Start Deploying FeeReceiver");
        await deployer.deploy(DexSwapFeeReceiver, senderAccount, DexSwapFactoryInstance.address, WONEInstance.address, DexSwapZoo, senderAccount);
        const DexSwapFeeReceiverInstance =  await DexSwapFeeReceiver.deployed();
        console.log();


        console.log(":: Start Deploying FeeSetter");
        await deployer.deploy(DexSwapFeeSetter, senderAccount, DexSwapFactoryInstance.address);
        const DexSwapFeeSetterInstance = await DexSwapFeeSetter.deployed();


        console.log();
        console.log(":: Setting Correct FeeSetter in Factory");
        await DexSwapFactoryInstance.setFeeToSetter(DexSwapFeeSetterInstance.address);


        console.log();
        console.log(":: Transfer Ownership FeeReceiver");
        await DexSwapFeeReceiverInstance.transferOwnership(senderAccount);


        console.log();
        console.log(":: Transfer Ownership FeeSetter");
        await DexSwapFeeSetterInstance.transferOwnership(senderAccount);

        console.log();
        console.log(":: Updating Protocol FeeReceiver");
        await DexSwapFeeReceiverInstance.changeReceivers(DexSwapZoo, senderAccount, {from: senderAccount});

        
        console.log();
        console.log("====================================================================");
        console.log(`Deployer Address:`,     dexSwapDeployer.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`Factory Address:`,      DexSwapFactoryInstance.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`DexSwap LP Address:`,   DexSwapLP.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`Fee Setter Address:`,   DexSwapFeeSetterInstance.address);
        console.log("====================================================================");

        console.log("====================================================================");
        console.log(`Fee Receiver Address:`, DexSwapFeeReceiverInstance.address);
        console.log("====================================================================");

        console.log("=============================================================================");
        console.log(`Code Hash:`, await DexSwapFactoryInstance.INIT_CODE_PAIR_HASH());
        console.log("=============================================================================");

        console.log("DONE");
    }
};
