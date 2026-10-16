'use client';

import React, { useState } from 'react';
import { Globe, Shield, Coins, ArrowRight } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const [notice, setNotice] = useState('');
  const handleSearch = () => {
    setNotice(
      'Name registration is not open yet. bDNS names will register on-chain from your own wallet; nothing is charged until then.'
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-500/5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            
            <h1 className="text-3xl md:text-4xl font-light bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
              Bitcoin DNS
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Corporate domain name system built on Bitcoin SV blockchain. 
              Register, trade, and govern domains with enterprise-grade security.
            </p>

            {/* Business Registration Portal */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/30 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-light text-white mb-2">Corporate Domain Registration</h3>
                  <p className="text-gray-400 font-light">Register your business domain and issue $bDNS tokens</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Domain Registration */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">Domain Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="yourbusiness.dns"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 outline-none focus:border-purple-500 transition-colors"
                        />
                        <div className="absolute right-3 top-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">Business Name</label>
                      <input
                        type="text"
                        placeholder="Your Business Ltd."
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">Business Email</label>
                      <input
                        type="email"
                        placeholder="admin@yourbusiness.com"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  {/* Token Options */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">Token Supply</label>
                      <select className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white outline-none focus:border-blue-500 transition-colors">
                        <option>1,000,000 $bDNS</option>
                        <option>10,000,000 $bDNS</option>
                        <option>100,000,000 $bDNS</option>
                        <option>Custom Amount</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">Initial Price</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0.001 BSV per token"
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors"
                        />
                        <div className="absolute right-3 top-3">
                          <Coins className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-600/10 border border-purple-500/20 rounded-lg p-4">
                      <h4 className="text-sm font-light text-purple-300 mb-2">Registration Fee</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-light">Domain + Token Setup</span>
                        <span className="text-blue-400 font-light">0.1 BSV</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-light hover:from-purple-700 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Register Domain</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={handleSearch} className="border border-purple-500/30 text-purple-300 px-8 py-4 rounded-xl font-light hover:bg-purple-600/10 transition-all duration-200">
                    Check Availability
                  </button>
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-gray-900/50 border border-gray-600/30 rounded-lg">
                <h4 className="text-sm font-light text-blue-300 mb-3">DNS Configuration Required</h4>
                <div className="space-y-2 text-xs font-light text-gray-400">
                  <div className="flex justify-between">
                    <span>CNAME Record:</span>
                    <span className="text-blue-400 font-mono">yourdomain.com → ns.bitcoin-dns.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>A Record:</span>
                    <span className="text-blue-400 font-mono">@ → 185.199.108.153</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TXT Record:</span>
                    <span className="text-blue-400 font-mono">bitcoin-dns-verify=your-token</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 font-light">
                  After registration, configure these DNS records with your domain registrar to enable Bitcoin DNS resolution
                </p>
              </div>
              
              {notice && (
                <p className="text-sm text-amber-300 mt-4 text-center">{notice}</p>
              )}
              <p className="text-sm text-gray-400 mt-4 text-center font-light">
                Secure your corporate domain on Bitcoin SV blockchain with instant token issuance
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              <div className="bg-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:shadow-lg hover:border-purple-400/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-light text-white mb-2">Blockchain-Secured</h3>
                <p className="text-gray-300 text-sm">
                  Corporate governance. Domains secured by Bitcoin SV blockchain technology.
                </p>
              </div>

              <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:shadow-lg hover:border-blue-400/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-light text-white mb-2">Tokenized</h3>
                <p className="text-gray-300 text-sm">
                  Trade domain shares as $bDNS tokens with automated revenue distribution.
                </p>
              </div>

              <div className="bg-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:shadow-lg hover:border-purple-400/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-light text-white mb-2">Governed</h3>
                <p className="text-gray-300 text-sm">
                  Corporate governance with BRC-101 token-weighted voting system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple steps to register and manage your corporate domain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-lg font-light text-white">Search & Register</h3>
              <p className="text-gray-300">
                Search for available domains and register them on the Bitcoin SV blockchain with instant confirmation.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-lg font-light text-white">Tokenize & Trade</h3>
              <p className="text-gray-300">
                Convert your domain into $bDNS tokens and trade shares on our corporate exchange platform.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-lg font-light text-white">Govern & Earn</h3>
              <p className="text-gray-300">
                Participate in governance decisions and earn revenue through automated distribution to token holders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Features */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
              BRC-100 Protocol Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade infrastructure powered by proven Bitcoin protocols
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:shadow-lg hover:border-purple-400/30 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <span className="text-purple-400 font-bold">100</span>
                </div>
                <h3 className="text-lg font-light text-white">BRC-100 Base</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Dual model approach combining UTXO and state machine for optimal performance and scalability.
              </p>
            </div>

            <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:shadow-lg hover:border-blue-400/30 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                  <span className="text-blue-400 font-bold">101</span>
                </div>
                <h3 className="text-lg font-light text-white">BRC-101 Governance</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Token-weighted voting system with proof-based execution for corporate domain management.
              </p>
            </div>

            <div className="bg-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:shadow-lg hover:border-purple-400/30 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <span className="text-purple-400 font-bold">102</span>
                </div>
                <h3 className="text-lg font-light text-white">BRC-102 AMM</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Automated market maker with constant product formula for efficient token trading and liquidity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-light text-white mb-6">
            Ready to Own the Future of Domains?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto font-light">
            Join the corporate blockchain revolution. Register your domain on Bitcoin DNS today and become part of the new internet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/portal'}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => window.location.href = '/exchange'}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Explore Exchange
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}