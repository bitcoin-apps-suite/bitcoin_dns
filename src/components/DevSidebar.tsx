'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Code, 
  GitBranch, 
  Bug, 
  FileText, 
  DollarSign, 
  Users, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
  Terminal,
  Activity,
} from 'lucide-react';
import './DevSidebar.css';

interface DevSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const DevSidebar: React.FC<DevSidebarProps> = ({ onCollapsedChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Default to collapsed if no preference is saved
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });
  const [issueCount, setIssueCount] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    // Load collapsed state from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString());
    }
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  useEffect(() => {
    // Fetch GitHub issue count for bitcoin-dns
    fetch('https://api.github.com/repos/bitcoin-corp/bitcoin_dns/issues?state=open')
      .then(res => res.json())
      .then(issues => setIssueCount(Array.isArray(issues) ? issues.length : 0))
      .catch(() => setIssueCount(0));
  }, []);

  const menuItems: Array<{
    path?: string;
    icon?: React.ComponentType<{ size?: number }>;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
    subtitle?: string;
  }> = [
    { path: '/contracts', icon: FileText, label: 'Contracts', badge: '17', subtitle: 'Development contracts' },
    { path: '/tasks', icon: Terminal, label: 'Tasks', badge: '17', subtitle: 'Active GitHub issues' },
    { path: '/contributions', icon: Users, label: 'Contributors', badge: '2' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/token', icon: DollarSign, label: '$BDNS', badge: 'NEW' },
    { divider: true },
    { path: 'https://github.com/bitcoin-corp/bitcoin_dns', icon: GitBranch, label: 'GitHub', external: true },
    { path: 'https://github.com/bitcoin-corp/bitcoin_dns/issues/1', icon: Bug, label: 'BSV Integration', external: true, badge: '3M $BDNS', subtitle: 'Critical • 4-6 weeks' },
    { path: 'https://github.com/bitcoin-corp/bitcoin_dns/issues/2', icon: Package, label: 'NFT Container', external: true, badge: '2.5M $BDNS', subtitle: 'High • 3-4 weeks' },
    { path: 'https://github.com/bitcoin-corp/bitcoin_dns/issues/3', icon: Code, label: 'Mainnet Deploy', external: true, badge: '4M $BDNS', subtitle: 'Critical • 6-8 weeks' },
    { divider: true },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: '/changelog', icon: FileText, label: 'Changelog' },
    { path: '/status', icon: Activity, label: 'Status', badge: '🟢' }
  ];

  const stats = {
    totalTokens: '1,000,000,000',
    devAllocation: '100,000,000',
    activeContracts: '—',
    totalRewards: '0'
  };

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Zap className="dev-sidebar-logo" />
            <span>Developer Hub</span>
          </div>
        )}
        <button 
          className="dev-sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="dev-sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="dev-sidebar-divider" />;
          }

          const Icon = item.icon;
          const isActive = pathname === item.path;

          if (item.external) {
            return (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {Icon && <Icon size={20} />}
                {!isCollapsed && (
                  <>
                    <span className="dev-sidebar-label">{item.label}</span>
                    {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path || '/'}
              className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon size={20} />}
              {!isCollapsed && (
                <>
                  <span className="dev-sidebar-label">{item.label}</span>
                  {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="dev-sidebar-stats">
          <h4>Development Fund</h4>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Supply</span>
            <span className="dev-stat-value">{stats.totalTokens}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Dev Allocation</span>
            <span className="dev-stat-value">{stats.devAllocation}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Active Contracts</span>
            <span className="dev-stat-value">{stats.activeContracts}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Rewards</span>
            <span className="dev-stat-value">{stats.totalRewards}</span>
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Start Contributing</p>
            <Link href="/tasks" className="dev-sidebar-cta-button">
              View Tasks
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevSidebar;