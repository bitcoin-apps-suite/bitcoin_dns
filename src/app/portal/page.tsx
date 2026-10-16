'use client';

import { useState } from 'react';
import { Users, DollarSign, ArrowRight, Zap, Layers } from 'lucide-react';

interface BRC100DomainSetup {
  companyName: string;
  subdomain: string;
  ticker: string; // BRC-100 token ticker
  initialTokens: number;
  governanceConfig: {
    votingPeriod: number; // days
    quorum: number; // percentage
    threshold: number; // percentage
  };
  ammConfig: {
    initialBTC: number; // satoshis
    feeRate: number; // percentage
    enableAutoDistribution: boolean;
  };
  revenueDistribution: {
    liquidity: number; // LP providers
    staking: number; // Token stakers
    treasury: number; // Domain treasury
    development: number; // Dev fund
  };
  extensions: string[]; // BRC-101, BRC-102, BRC-103
}

export default function PortalPage() {
  const [step, setStep] = useState(1);
  const [setup, setSetup] = useState<BRC100DomainSetup>({
    companyName: '',
    subdomain: '',
    ticker: '',
    initialTokens: 1000000,
    governanceConfig: {
      votingPeriod: 7,
      quorum: 10,
      threshold: 51
    },
    ammConfig: {
      initialBTC: 50000,
      feeRate: 0.3,
      enableAutoDistribution: true
    },
    revenueDistribution: {
      liquidity: 40,
      staking: 30,
      treasury: 20,
      development: 10
    },
    extensions: ['BRC-101', 'BRC-102']
  });

  const updateTicker = (subdomain: string) => {
    const ticker = `$bDNS/${subdomain}`;
    setSetup({...setup, subdomain, ticker});
  };

  const [notice, setNotice] = useState('');
  const handleSubmit = () => {
    setNotice('Deployment is not live yet. Nothing has been created or charged.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Bitcoin DNS Portal
            </h1>
            <p className="text-lg text-gray-600">
              Deploy your blockchain-governed b.subdomain with BRC-100 protocol stack
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">BRC-101 Governance</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">BRC-102 AMM</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">BRC-103 Bridge</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {num}
                  </div>
                  {num < 5 && <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Domain Configuration</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={setup.companyName}
                  onChange={(e) => setSetup({...setup, companyName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Coca-Cola"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Subdomain
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">b.</span>
                  <input
                    type="text"
                    value={setup.subdomain}
                    onChange={(e) => updateTicker(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="coca-cola"
                  />
                  <span className="text-gray-500 ml-2">.com</span>
                </div>
                {setup.subdomain && (
                  <p className="text-sm text-gray-600 mt-2">
                    Your subdomain: <strong>b.{setup.subdomain}.com</strong> • 
                    BRC-100 Ticker: <strong>{setup.ticker}</strong>
                  </p>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">BRC-100 Protocol Features:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>BRC-101 Governance:</strong> Token-weighted voting with proof-based execution</li>
                  <li>• <strong>BRC-102 AMM:</strong> Automated revenue distribution via liquidity pools</li>
                  <li>• <strong>BRC-103 Bridging:</strong> Cross-chain and cross-domain compatibility</li>
                  <li>• <strong>Nested Applications:</strong> Sub-domain governance (e.g., b.coca-cola.com:europe)</li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">BRC-100 Token Setup</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Ticker (Auto-generated)
                </label>
                <input
                  type="text"
                  value={setup.ticker}
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
                <p className="text-sm text-gray-600 mt-1">
                  BRC-100 compatible ticker for your domain token
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Token Supply
                </label>
                <input
                  type="number"
                  value={setup.initialTokens}
                  onChange={(e) => setSetup({...setup, initialTokens: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="10000"
                  step="10000"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Total supply of governance tokens (inscribed on Bitcoin)
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">BRC-100 Base</p>
                  <p className="text-xs text-gray-600">UTXO + State Machine</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">BRC-101 Governance</p>
                  <p className="text-xs text-gray-600">Democratic voting</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">BRC-102 AMM</p>
                  <p className="text-xs text-gray-600">Automated revenue</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">BRC-101 Governance Parameters</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voting Period ({setup.governanceConfig.votingPeriod} days)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={setup.governanceConfig.votingPeriod}
                    onChange={(e) => setSetup({
                      ...setup,
                      governanceConfig: {
                        ...setup.governanceConfig,
                        votingPeriod: parseInt(e.target.value)
                      }
                    })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600 mt-1">Duration for proposal voting</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Approval Threshold ({setup.governanceConfig.threshold}%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={setup.governanceConfig.threshold}
                    onChange={(e) => setSetup({
                      ...setup,
                      governanceConfig: {
                        ...setup.governanceConfig,
                        threshold: parseInt(e.target.value)
                      }
                    })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600 mt-1">Required approval percentage</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quorum ({setup.governanceConfig.quorum}%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={setup.governanceConfig.quorum}
                    onChange={(e) => setSetup({
                      ...setup,
                      governanceConfig: {
                        ...setup.governanceConfig,
                        quorum: parseInt(e.target.value)
                      }
                    })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600 mt-1">Minimum participation required</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setup.extensions.includes('BRC-103')}
                    onChange={(e) => {
                      const extensions = e.target.checked 
                        ? [...setup.extensions, 'BRC-103']
                        : setup.extensions.filter(ext => ext !== 'BRC-103');
                      setSetup({...setup, extensions});
                    }}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Enable BRC-103 Cross-Chain Bridge
                  </label>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">BRC-101 Features:</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Token-weighted voting on all domain proposals</li>
                  <li>• Proof-based execution for DNS record updates</li>
                  <li>• Delegation and proxy voting capabilities</li>
                  <li>• Automatic execution when threshold is reached</li>
                </ul>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">BRC-102 Revenue Distribution</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Liquidity Providers ({setup.revenueDistribution.liquidity}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={setup.revenueDistribution.liquidity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const remaining = 100 - value;
                      const other = remaining / 3;
                      setSetup({
                        ...setup,
                        revenueDistribution: {
                          liquidity: value,
                          staking: Math.floor(other),
                          treasury: Math.floor(other),
                          development: remaining - Math.floor(other) * 2
                        }
                      });
                    }}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Token Stakers ({setup.revenueDistribution.staking}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={100 - setup.revenueDistribution.liquidity}
                    value={setup.revenueDistribution.staking}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const remaining = 100 - setup.revenueDistribution.liquidity - value;
                      setSetup({
                        ...setup,
                        revenueDistribution: {
                          ...setup.revenueDistribution,
                          staking: value,
                          treasury: Math.floor(remaining / 2),
                          development: remaining - Math.floor(remaining / 2)
                        }
                      });
                    }}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domain Treasury ({setup.revenueDistribution.treasury}%)
                    </label>
                    <div className="w-full bg-gray-200 rounded-lg h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-lg"
                        style={{ width: `${setup.revenueDistribution.treasury}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Development Fund ({setup.revenueDistribution.development}%)
                    </label>
                    <div className="w-full bg-gray-200 rounded-lg h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-lg"
                        style={{ width: `${setup.revenueDistribution.development}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">BRC-102 AMM Configuration:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-yellow-700">Initial BTC Liquidity:</span>
                    <span className="font-bold text-yellow-900 ml-2">{setup.ammConfig.initialBTC} sats</span>
                  </div>
                  <div>
                    <span className="text-yellow-700">Trading Fee:</span>
                    <span className="font-bold text-yellow-900 ml-2">{setup.ammConfig.feeRate}%</span>
                  </div>
                  <div>
                    <span className="text-yellow-700">Formula:</span>
                    <span className="font-bold text-yellow-900 ml-2">x * y = k</span>
                  </div>
                  <div>
                    <span className="text-yellow-700">Auto-Distribution:</span>
                    <span className="font-bold text-yellow-900 ml-2">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Review & Deploy BRC-100 Domain</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Company</p>
                    <p className="text-lg">{setup.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Subdomain</p>
                    <p className="text-lg">b.{setup.subdomain}.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">BRC-100 Ticker</p>
                    <p className="text-lg font-mono">{setup.ticker}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Token Supply</p>
                    <p className="text-lg">{setup.initialTokens.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Protocol Extensions</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">BRC-100</span>
                    {setup.extensions.map(ext => (
                      <span key={ext} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{ext}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Governance Configuration</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white p-2 rounded border">
                      <span className="text-gray-600">Voting Period:</span>
                      <span className="font-semibold ml-1">{setup.governanceConfig.votingPeriod} days</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-gray-600">Threshold:</span>
                      <span className="font-semibold ml-1">{setup.governanceConfig.threshold}%</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-gray-600">Quorum:</span>
                      <span className="font-semibold ml-1">{setup.governanceConfig.quorum}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Revenue Distribution</p>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-blue-600 text-white p-2 rounded text-center text-sm">
                      LP {setup.revenueDistribution.liquidity}%
                    </div>
                    <div className="flex-1 bg-green-600 text-white p-2 rounded text-center text-sm">
                      Staking {setup.revenueDistribution.staking}%
                    </div>
                    <div className="flex-1 bg-purple-600 text-white p-2 rounded text-center text-sm">
                      Treasury {setup.revenueDistribution.treasury}%
                    </div>
                    <div className="flex-1 bg-orange-600 text-white p-2 rounded text-center text-sm">
                      Dev {setup.revenueDistribution.development}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Deployment Process:</h3>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Deploy BRC-100 token with governance extensions</li>
                  <li>2. Create BRC-102 AMM liquidity pool</li>
                  <li>3. Configure BRC-101 governance parameters</li>
                  <li>4. Initialize revenue distribution mechanism</li>
                  <li>5. Register DNS resolver for b.{setup.subdomain}.com</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Estimated Deployment Cost:</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">BRC-100 Inscription + AMM Setup</span>
                  <span className="font-bold text-blue-900">0.08 BSV (~$4.00)</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            
            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!setup.companyName || !setup.subdomain)) ||
                  (step === 2 && (!setup.initialTokens || !setup.ticker))
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Deploy BRC-100 Domain
              </button>
            )}
          </div>
          {notice && <p className="mt-4 text-center text-sm text-amber-700">{notice}</p>}
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}