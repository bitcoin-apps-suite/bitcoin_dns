'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import WalletButton from '@/components/WalletButton';
import { useWallet } from '@/lib/bwallet';

export default function ExchangePage() {
  const { user } = useWallet();
  return (
    <div className="min-h-screen px-6 py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-3xl text-center text-white">
        <Globe className="mx-auto mb-4 h-10 w-10 text-purple-400" />
        <h1 className="text-3xl font-light">bDNS Exchange</h1>
        <p className="mt-3 text-gray-300">
          No domain tokens are listed yet. When names are registered on-chain they will appear here, and trades
          will settle from your own wallet.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
          <h2 className="text-lg font-light">Your names</h2>
          {user ? (
            <p className="mt-2 text-sm text-gray-400">You hold no bDNS names yet.</p>
          ) : (
            <div className="mt-4 flex justify-center">
              <WalletButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
