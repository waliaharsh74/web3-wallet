
import './App.css';
import { useState } from 'react';
import { SolanaWallets } from './components/solanaWallets';
import { EthereumWallets } from './components/etheriumWallets';

function App() {
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleSelectionChange = (event) => {
    setSelectedWallet(event.target.value);
  };

  return (
    <div className="app">
      <h1>Create Wallet</h1>
      <div className="wallet-selection">
        <label>
          <input
            type="radio"
            value="solana"
            checked={selectedWallet === 'solana'}
            onChange={handleSelectionChange}
          />
          Solana
        </label>
        <label>
          <input
            type="radio"
            value="ethereum"
            checked={selectedWallet === 'ethereum'}
            onChange={handleSelectionChange}
          />
          Ethereum
        </label>
      </div>

      {selectedWallet === 'solana' && <SolanaWallets />}
      {selectedWallet === 'ethereum' && <EthereumWallets />}
    </div>
  );
}

export default App;
