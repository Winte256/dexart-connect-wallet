import * as core from "@wagmi/core";
import * as chains from "@wagmi/core/chains";
import * as html from "@web3modal/html";
import * as ethereum from "@web3modal/ethereum";

declare global {
  interface Window {
    WalletConnectCore: any;
    initWalletConnectCore: any;
  }
}

window.WalletConnectCore = {
  core, chains, html, ethereum
}

if (typeof window.initWalletConnectCore === 'function') {
  window.initWalletConnectCore(window.WalletConnectCore)
}
