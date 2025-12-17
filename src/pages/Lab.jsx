import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';
import { useViewMode } from '../context/ViewModeContext';
import { RefreshCw, Copy, Check } from 'lucide-react';

const Lab = () => {
  const { isTechnical } = useViewMode();
  const [input, setInput] = useState('Hello World');
  const [copied, setCopied] = useState(null);

  // Simple hashing (simulated for simplicity, or using crypto.subtle)
  const [hashes, setHashes] = useState({
    base64: '',
    urlEncoded: '',
    length: 0
  });

  useEffect(() => {
    // Basic transforms
    setHashes({
      base64: btoa(input),
      urlEncoded: encodeURIComponent(input),
      length: input.length
    });
  }, [input]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="py-20 md:py-32">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Mini-Lab</h1>
          <p className="text-slate-400">
            {isTechnical ? '// A collection of small utilities.' : 'Interactive experiments and tools.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <label className="block text-sm font-medium text-slate-400 mb-2">Input String</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-4 text-white font-mono focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none transition-all"
              />
            </div>

             <div className="p-4 bg-sky-900/10 border border-sky-900/20 rounded-lg text-sm text-sky-400">
               <span className="font-bold">Fact:</span> The Base64 encoding scheme uses 64 characters to represent binary data in an ASCII string format.
             </div>
          </div>

          {/* Output */}
          <div className="space-y-4">
            <OutputCard
              label="Length"
              value={hashes.length}
              isTechnical={isTechnical}
              onCopy={() => {}}
              hideCopy
            />
            <OutputCard
              label="Base64"
              value={hashes.base64}
              isTechnical={isTechnical}
              onCopy={() => copyToClipboard(hashes.base64, 'base64')}
              copied={copied === 'base64'}
            />
            <OutputCard
              label="URL Encoded"
              value={hashes.urlEncoded}
              isTechnical={isTechnical}
              onCopy={() => copyToClipboard(hashes.urlEncoded, 'url')}
              copied={copied === 'url'}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

const OutputCard = ({ label, value, isTechnical, onCopy, copied, hideCopy }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition-colors">
    <div className="overflow-hidden">
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">{label}</div>
      <div className={`text-white truncate font-mono ${isTechnical ? 'text-sky-300' : ''}`}>
        {value}
      </div>
    </div>
    {!hideCopy && (
      <button
        onClick={onCopy}
        className="p-2 text-slate-500 hover:text-white transition-colors"
      >
        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
      </button>
    )}
  </div>
);

export default Lab;
