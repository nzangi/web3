import React, {useEffect,useState} from "react";
import { ethers } from "ethers";
//import { contractABI,contractAddress} from "../utilis/constants";
import {contractAddress,contractABI} from "../utilis/constants";


export const TransactionContext = React.createContext();

const { ethereum } = window;

    function display_alert(){
        if (confirm("Please install a metaMask"));
        window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" ,'_blank');
    };

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress,contractABI,signer);

    //console.log({provider,signer,transactionsContract});
    //console.log(contractAddress);
    //console.log(this.state.signer.provider.getCode(address));

    return transactionsContract;
};



export const TransactionProvider = ({children}) => {
    const [formData,setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [currentAccount,setCurrentAccount] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [transactions,setTransactions] = useState([]);
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState,[name]: e.target.value}));

    };

    const getAllTransactions = async () => {
        try {
            //if(!ethereum) return display_alert();
            if(ethereum){
            const  transactionsContract = getEthereumContract();
            const availableTransactions = await transactionsContract.getAllTransactions();
            //console.log(availableTransactions);

            const structuredTransactions  = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount : parseInt(transaction.amount._hex) /(10**18),
            }));

            //console.log(structuredTransactions);
            setTransactions(structuredTransactions);
            //window.reload();
            window.reload();
            }
            else {
                console.log("Ethereum is not present in the blockchain.");

                }
        } catch (error) {
            console.log(error);
        }
    };
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return display_alert();

            const accounts = await ethereum.request({method: 'eth_accounts'});
            //console.log(accounts);
            if (accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
        
            }else {
                console.log(error);
                console.log("No Accounts Found.");
            }
            
           } 
           catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object.");
            
        }   
    };

    const checkIfTransactionExists = async () => {
        try {
            if(ethereum){
            const  transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();

            window.localStorage.setItem("transactionCount",currentTransactionCount);
            }

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object");
            
        }

    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return display_alert();

            const accounts = await ethereum.request({method:"eth_requestAccounts",});

            setCurrentAccount(accounts[0]);
            window.location.reload();
        }catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    };

    const sendTransaction = async () => {
        try {
            if(ethereum){
            //get data from the form..
            const {addressTo,amount,keyword,message} = formData;
            const  transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to:addressTo,
                    gas:"0x5208", //2100GWEI
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transactionsContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
            setIsLoading(true);
            console.log(`LOADING - ${transactionHash.hash}`);
            //console.log('Loading- ${transactionHash.hash}');
            await transactionHash.wait();
            console.log(`SUCCESS - ${transactionHash.hash}`);
            //console.log('Success- ${transactionHash.hash}');
            setIsLoading(false);


            const transactionCount = await transactionsContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

            //window.location.reload();
            
            }
            else{
                console.log("No ethereum object");}
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object.");
        }

    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExists();
    },[]);

    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,transactions,isLoading}} >
            {children}
        </TransactionContext.Provider>
    );

};

//export default TransactionContext;