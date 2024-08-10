
import { useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';

window.Buffer = Buffer;

export function SolanaWallets() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);
  const [numWallets, setNumWallets] = useState(1);
  const [showMnemonic, setShowMnemonic] = useState(true);
  const [walletsGenerated, setWalletsGenerated] = useState(false);

  const handleGenerateMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setShowMnemonic(true);
    setWalletsGenerated(true);
  };

  const handleGenerateWallets = () => {
    const newWallets = wallets.slice();
    const size = newWallets.length + 1;

    const wallet = generateSolanaWallet(size);
    newWallets.push(wallet);

    setWallets(newWallets);
    setShowMnemonic(false);
  };

  const generateSolanaWallet = (index) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    return {
      publicKey: keypair.publicKey.toBase58(),
      secretKey: keypair.secretKey,
    };
  };

  const handleAddNewAccount = () => {
    handleGenerateWallets();
  };

  return (
    <div className="app-container">
      <h1>Create Solana Wallets</h1>

      {!walletsGenerated && (
        <button onClick={handleGenerateMnemonic}>Generate Mnemonic</button>
      )}
      {mnemonic && showMnemonic && (
        <div className="mnemonic-section">
          <h3>Mnemonic:- {mnemonic}</h3>
          
          <div className="warning">
            <p><strong>Warning:</strong> Keep your mnemonic phrase safe and secure. It is crucial for accessing your wallet and funds. Do not share it with anyone.</p>
          </div>

          <button onClick={handleGenerateWallets}>Generate Wallet</button>
        </div>
      )}

      {wallets.length > 0 && (
        <div className="wallets-section">
          <button onClick={handleAddNewAccount} className="add-new-account">
            Add new Account+
          </button>
          {wallets.map((wallet, index) => (
            <div key={index} className="wallet-box">
              <img src="/solana.png" alt="Solana Logo" className="solana-logo" />
              <div><strong>Wallet {index + 1}:</strong> {wallet.publicKey}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
