import { useState } from 'react';
import './../styles/animations.css';

const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className={`copy-button ${isCopied ? 'copied' : ''}`}
      onClick={handleCopy}
      disabled={isCopied}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;