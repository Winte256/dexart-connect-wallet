import * as wagmi from '@wagmi/core'
import { bsc } from '@wagmi/core/chains'
import { EthereumClient, w3mConnectors, w3mProvider  } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'

const { configureChains, createConfig, ...wagmiCore } = wagmi;

declare global {
  interface Window {
    onCWInstanceReady: any;
    getCW: any;
  }
}

const chains = [bsc]

window.getCW = (projectId: string) => {  
  // 2. Configure wagmi client
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const connectors = w3mConnectors({ projectId, chains })

  const wagmiClient = createConfig({
    autoConnect: true,
    connectors,
    publicClient
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
