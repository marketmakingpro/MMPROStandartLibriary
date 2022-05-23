export const ethereumConnect = () =>
  window.ethereum.request({ method: "eth_requestAccounts" });
export const isEthereumConnected = window.ethereum
  ? window.ethereum.isConnected()
  : false;
export const isEthereumMetaMask = window.ethereum
  ? window.ethereum.isMetaMask
  : null;
export const ethereumSendTransaction = (params) => {
  console.log("sending ethereum transaction with params:", params)
  window.ethereum.request({
    method: "eth_sendTransaction",
    params,
  });
}

export const switchNetwork = async (chainId) => {
  try {
    console.log("trying to switch network to bsc main-net")
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      console.log("error while switching network, the chain has not been added to MetaMask")
      try {
        console.log("trying to add network to MetaMask")
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "BSC Mainnet",
              nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });
      } catch (error) {
        console.log("error while trying to add network to MetaMask")
        console.error(error);
      }
    }
  }
};
