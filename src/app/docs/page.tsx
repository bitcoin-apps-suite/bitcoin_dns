'use client'

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import Taskbar from '@/components/Taskbar'
import Link from 'next/link'
import { Book, Code, FileText, GitBranch, Rocket, Shield, Terminal, ChevronRight, ExternalLink, Copy, Check } from 'lucide-react'

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: <Rocket size={18} /> },
    { id: 'architecture', title: 'Architecture', icon: <GitBranch size={18} /> },
    { id: 'api-reference', title: 'API Reference', icon: <Code size={18} /> },
    { id: 'dns-methods', title: 'DNS Resolution', icon: <FileText size={18} /> },
    { id: 'authentication', title: 'Authentication', icon: <Shield size={18} /> },
    { id: 'contributing', title: 'Contributing', icon: <Terminal size={18} /> }
  ]

  return (
    <div style={{ 
      background: '#000000', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <div className="docs-page">
        <div className="docs-container">
          <aside className="docs-sidebar">
            <div className="sidebar-header">
              <Book size={24} />
              <h2>Documentation</h2>
            </div>
            
            <nav className="docs-nav">
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.icon}
                  <span>{section.title}</span>
                  <ChevronRight size={16} className="chevron" />
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <div className="quick-links">
                <h3>Quick Links</h3>
                <a href="https://github.com/bitcoin-corp/bitcoin_dns" target="_blank" rel="noopener noreferrer">
                  GitHub Repository <ExternalLink size={14} />
                </a>
                <a href="https://github.com/bitcoin-corp/bitcoin_dns/issues" target="_blank" rel="noopener noreferrer">
                  Report an Issue <ExternalLink size={14} />
                </a>
                <Link href="/contracts">
                  View Contracts <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </aside>

          <main className="docs-content">
            {activeSection === 'getting-started' && (
              <section className="doc-section">
                <h1>Getting Started with Bitcoin DNS</h1>
                <p className="section-intro">
                  Bitcoin DNS is a decentralized domain name system built on the BSV blockchain. 
                  This guide will help you set up your development environment and start contributing.
                </p>

                <div className="doc-block">
                  <h2>Prerequisites</h2>
                  <ul>
                    <li>Node.js 18+ and npm</li>
                    <li>Git for version control</li>
                    <li>A code editor (VS Code recommended)</li>
                    <li>BSV wallet for blockchain interaction</li>
                    <li>HandCash Developer Account (optional)</li>
                  </ul>
                </div>

                <div className="doc-block">
                  <h2>Installation</h2>
                  <p>Clone the repository and install dependencies:</p>
                  
                  <div className="code-block">
                    <div className="code-header">
                      <span>Terminal</span>
                      <button 
                        className="copy-btn"
                        onClick={() => copyToClipboard('git clone https://github.com/bitcoin-corp/bitcoin_dns.git\ncd bitcoin_dns\nnpm install', 'install')}
                      >
                        {copiedCode === 'install' ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    <pre>
                      <code>{`git clone https://github.com/bitcoin-corp/bitcoin_dns.git
cd bitcoin_dns
npm install`}</code>
                    </pre>
                  </div>
                </div>

                <div className="doc-block">
                  <h2>Quick Start</h2>
                  <p>Start the development server:</p>
                  
                  <div className="code-block">
                    <div className="code-header">
                      <span>Terminal</span>
                      <button 
                        className="copy-btn"
                        onClick={() => copyToClipboard('npm run dev', 'dev')}
                      >
                        {copiedCode === 'dev' ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    <pre>
                      <code>npm run dev</code>
                    </pre>
                  </div>
                  
                  <p>Open <code>http://localhost:3000</code> in your browser to see the application.</p>
                </div>
              </section>
            )}

            {activeSection === 'architecture' && (
              <section className="doc-section">
                <h1>Bitcoin DNS Architecture</h1>
                <p className="section-intro">
                  Bitcoin DNS uses a hybrid architecture combining traditional DNS with blockchain technology 
                  for decentralized domain name resolution.
                </p>

                <div className="doc-block">
                  <h2>Core Components</h2>
                  <ul>
                    <li><strong>BSV Blockchain Layer:</strong> Stores domain records immutably</li>
                    <li><strong>DNS Resolver:</strong> Handles traditional DNS queries</li>
                    <li><strong>API Gateway:</strong> Bridges blockchain and DNS protocols</li>
                    <li><strong>Frontend Interface:</strong> User-friendly domain management</li>
                  </ul>
                </div>

                <div className="doc-block">
                  <h2>Data Flow</h2>
                  <ol>
                    <li>User registers domain via web interface</li>
                    <li>Domain data is written to BSV blockchain</li>
                    <li>DNS queries are resolved using blockchain data</li>
                    <li>Traditional DNS clients receive responses</li>
                  </ol>
                </div>
              </section>
            )}

            {activeSection === 'dns-methods' && (
              <section className="doc-section">
                <h1>DNS Resolution Methods</h1>
                <p className="section-intro">
                  Bitcoin DNS supports multiple resolution methods for maximum compatibility and flexibility.
                </p>

                <div className="doc-block">
                  <h2>On-Chain Resolution</h2>
                  <p>Direct resolution from BSV blockchain:</p>
                  <ul>
                    <li>Fully decentralized</li>
                    <li>Immutable records</li>
                    <li>Cryptographic verification</li>
                    <li>Higher latency but maximum security</li>
                  </ul>
                </div>

                <div className="doc-block">
                  <h2>Hybrid Resolution</h2>
                  <p>Combines blockchain with traditional DNS caching:</p>
                  <ul>
                    <li>Fast response times</li>
                    <li>Periodic blockchain synchronization</li>
                    <li>Fallback to on-chain for verification</li>
                    <li>Best for production use</li>
                  </ul>
                </div>

                <div className="doc-block">
                  <h2>Domain Registration Example</h2>
                  
                  <div className="code-block">
                    <div className="code-header">
                      <span>JavaScript</span>
                      <button 
                        className="copy-btn"
                        onClick={() => copyToClipboard(`import { BitcoinDNS } from '@bitcoin-corp/dns-sdk'

const dns = new BitcoinDNS({
  network: 'mainnet',
  apiKey: 'your-api-key'
})

// Register a domain
const result = await dns.registerDomain({
  name: 'example.bsv',
  records: {
    A: '192.168.1.1',
    AAAA: '2001:db8::1',
    CNAME: 'www.example.com'
  }
})`, 'register')}
                      >
                        {copiedCode === 'register' ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    <pre>
                      <code>{`import { BitcoinDNS } from '@bitcoin-corp/dns-sdk'

const dns = new BitcoinDNS({
  network: 'mainnet',
  apiKey: 'your-api-key'
})

// Register a domain
const result = await dns.registerDomain({
  name: 'example.bsv',
  records: {
    A: '192.168.1.1',
    AAAA: '2001:db8::1',
    CNAME: 'www.example.com'
  }
})`}</code>
                    </pre>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'api-reference' && (
              <section className="doc-section">
                <h1>API Reference</h1>
                <p className="section-intro">
                  Complete API documentation for integrating with Bitcoin DNS services.
                </p>

                <div className="doc-block">
                  <h2>Authentication</h2>
                  <p>All API requests require authentication via API key:</p>
                  
                  <div className="code-block">
                    <div className="code-header">
                      <span>HTTP</span>
                    </div>
                    <pre>
                      <code>{`Authorization: Bearer your-api-key-here
Content-Type: application/json`}</code>
                    </pre>
                  </div>
                </div>

                <div className="doc-block">
                  <h2>Domain Endpoints</h2>
                  <div className="endpoint">
                    <div className="method">POST</div>
                    <div className="path">/api/domains</div>
                    <div className="description">Register a new domain</div>
                  </div>
                  
                  <div className="endpoint">
                    <div className="method">GET</div>
                    <div className="path">/api/domains/{'{name}'}</div>
                    <div className="description">Retrieve domain information</div>
                  </div>
                  
                  <div className="endpoint">
                    <div className="method">PUT</div>
                    <div className="path">/api/domains/{'{name}'}</div>
                    <div className="description">Update domain records</div>
                  </div>
                  
                  <div className="endpoint">
                    <div className="method">DELETE</div>
                    <div className="path">/api/domains/{'{name}'}</div>
                    <div className="description">Delete domain registration</div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'contributing' && (
              <section className="doc-section">
                <h1>Contributing Guide</h1>
                <p className="section-intro">
                  We welcome contributions to Bitcoin DNS! Here&apos;s how to get started and earn $BDNS tokens.
                </p>

                <div className="doc-block">
                  <h2>Development Workflow</h2>
                  <ol>
                    <li>Fork the repository on GitHub</li>
                    <li>Create a feature branch: <code>git checkout -b feature/new-feature</code></li>
                    <li>Make your changes and write tests</li>
                    <li>Commit with clear messages: <code>git commit -m &quot;Add DNS caching feature&quot;</code></li>
                    <li>Push to your fork: <code>git push origin feature/new-feature</code></li>
                    <li>Open a Pull Request with detailed description</li>
                  </ol>
                </div>

                <div className="doc-block">
                  <h2>Code Standards</h2>
                  <ul>
                    <li>Follow TypeScript best practices</li>
                    <li>Write comprehensive tests for new features</li>
                    <li>Document all public APIs</li>
                    <li>Use consistent code formatting (Prettier)</li>
                    <li>Follow conventional commit messages</li>
                  </ul>
                </div>

                <div className="doc-block">
                  <h2>Token Rewards</h2>
                  <p>Contributors can earn $BDNS tokens for merged contributions:</p>
                  <ul>
                    <li><strong>Major Features:</strong> 5,000-10,000 $BDNS</li>
                    <li><strong>Bug Fixes:</strong> 1,000-3,000 $BDNS</li>
                    <li><strong>Documentation:</strong> 500-1,500 $BDNS</li>
                    <li><strong>Tests:</strong> 250-1,000 $BDNS</li>
                  </ul>
                  
                  <p><strong>Note:</strong> All token distributions require KYC verification and cap table registration.</p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
      
      <style jsx>{`
        .docs-page {
          background: #0a0a0a;
          color: #ffffff;
          min-height: 100vh;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding-top: 24px;
          overflow-x: hidden;
        }

        .docs-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          max-width: 1400px;
          margin: 0 auto;
          gap: 40px;
          padding: 0 40px;
        }

        /* Sidebar */
        .docs-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 24px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-header svg {
          color: #00ff88;
        }

        .sidebar-header h2 {
          font-size: 18px;
          font-weight: 400;
          margin: 0;
          color: #ffffff;
        }

        .docs-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .nav-item.active {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          border-left: 2px solid #00ff88;
        }

        .nav-item svg {
          flex-shrink: 0;
        }

        .nav-item .chevron {
          margin-left: auto;
          opacity: 0.3;
          transition: opacity 0.2s;
        }

        .nav-item.active .chevron {
          opacity: 1;
        }

        .sidebar-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .quick-links h3 {
          font-size: 14px;
          font-weight: 500;
          color: #00ff88;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .quick-links a {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .quick-links a:hover {
          color: #00ff88;
        }

        /* Main Content */
        .docs-content {
          padding-bottom: 80px;
        }

        .doc-section {
          max-width: 800px;
        }

        .doc-section h1 {
          font-size: 32px;
          font-weight: 200;
          margin: 0 0 16px 0;
          color: #ffffff;
          letter-spacing: -1px;
        }

        .section-intro {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 40px 0;
        }

        .doc-block {
          margin-bottom: 40px;
        }

        .doc-block h2 {
          font-size: 24px;
          font-weight: 300;
          margin: 0 0 16px 0;
          color: #00ff88;
          letter-spacing: -0.5px;
        }

        .doc-block p {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 16px 0;
        }

        .doc-block ul, .doc-block ol {
          margin: 0 0 16px 0;
          padding-left: 24px;
        }

        .doc-block li {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .doc-block code {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 14px;
        }

        .code-block {
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          margin: 16px 0 24px 0;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .copy-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
        }

        .copy-btn:hover {
          border-color: #00ff88;
          color: #00ff88;
        }

        .code-block pre {
          margin: 0;
          padding: 16px;
          overflow-x: auto;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.5;
        }

        .code-block code {
          background: none;
          color: #ffffff;
          padding: 0;
          border-radius: 0;
        }

        /* API Endpoints */
        .endpoint {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .method {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          min-width: 60px;
          text-align: center;
        }

        .endpoint .method {
          background: #00ff88;
          color: #000;
        }

        .path {
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          font-size: 14px;
          color: #00ff88;
          font-weight: 500;
        }

        .description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .docs-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .docs-sidebar {
            position: static;
          }

          .doc-section h1 {
            font-size: 28px;
          }

          .endpoint {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  )
}