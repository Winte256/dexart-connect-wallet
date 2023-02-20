import * as wagmi from '@wagmi/core'
import { bsc } from '@wagmi/core/chains'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'

const { configureChains, createClient, ...wagmiCore } = wagmi;

declare global {
  interface Window {
    onCWInstanceReady: any;
    getCW: any;
  }
}

let instance: any;

window.getCW = (projectId: string) => {
  if (typeof instance !== undefined) {
    return instance
  }
  
  // 2. Configure wagmi client
  const { provider, chains } = configureChains([bsc], [walletConnectProvider({ projectId })])
  const connectors = modalConnectors({ appName: 'web3Modal', chains })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: connectors,
    provider
  })

  // 3. Create ethereum and modal clients
  const ethereumClient = new EthereumClient(wagmiClient, chains)
  const web3Modal = new Web3Modal(
    { projectId },
    ethereumClient
  )
  
  return {
    web3Modal,
    wagmiCore,
  }
};

if (typeof window.onCWInstanceReady === 'function') {
  window.onCWInstanceReady(window.getCW)
}
