'use client'

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import Taskbar from '@/components/Taskbar'
import Link from 'next/link'
import { GitBranch, GitCommit, GitMerge, GitPullRequest, Star, TrendingUp, Award, ExternalLink, Calendar } from 'lucide-react'

interface Contribution {
  id: number
  type: string
  title: string
  description: string
  date: string
  status: string
  points: number
  tokens: number
  pr?: string
  issue?: string
  url?: string
}

interface UserStats {
  totalContributions: number
  pullRequests: number
  issues: number
  reviews: number
  totalPoints: number
  totalTokens: number
  currentStreak: number
  longestStreak: number
}

export default function ContributionsPage() {
  // const { data: session } = useSession()
  const session = null // Temporary until next-auth is properly configured
  const [timeFilter, setTimeFilter] = useState('all')
  const [userContributions] = useState<Contribution[]>([])
  const [userStats] = useState<UserStats | null>(null)
  const [loading] = useState(false)

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'merged': return '#00ff88'
      case 'closed': return '#00ff88'
      case 'open': return '#ffaa00'
      default: return 'rgba(255,255,255,0.5)'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'pull_request': return <GitPullRequest size={18} />
      case 'issue': return <GitBranch size={18} />
      case 'commit': return <GitCommit size={18} />
      case 'review': return <GitMerge size={18} />
      default: return <GitBranch size={18} />
    }
  }

  const displayContributions = userContributions
  const displayStats = userStats

  return (
    <div style={{ 
      background: '#000000', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <div className="contributions-page">
        <div className="contributions-container">
          <section className="contributions-hero">
            <h1>My Contributions</h1>
            <p className="contributions-tagline">
              Track your progress and see how your work is helping build Bitcoin DNS
            </p>
            {!session && (
              <div className="auth-notice">
                <p>Contribution tracking is not live yet. See open work on GitHub issues.</p>
              </div>
            )}
          </section>

          {displayStats && (
            <>
              <section className="stats-overview">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{displayStats.totalContributions}</h3>
                      <p>Total Contributions</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Star size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{displayStats.totalPoints.toLocaleString()}</h3>
                      <p>Points Earned</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Award size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{displayStats.totalTokens.toLocaleString()}</h3>
                      <p>$BDNS Tokens</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Calendar size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>{displayStats.currentStreak}</h3>
                      <p>Day Streak</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="contributions-content">
                <div className="content-header">
                  <h2>Contribution History</h2>
                  <div className="filters">
                    <button 
                      className={`filter-btn ${timeFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('all')}
                    >
                      All Time
                    </button>
                    <button 
                      className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('month')}
                    >
                      This Month
                    </button>
                    <button 
                      className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('week')}
                    >
                      This Week
                    </button>
                  </div>
                </div>

                <div className="contributions-list">
                  {loading ? (
                    <div className="loading-state">
                      <p>Loading contributions...</p>
                    </div>
                  ) : displayContributions.length > 0 ? (
                    displayContributions.map(contribution => (
                      <div key={contribution.id} className="contribution-card">
                        <div className="contribution-header">
                          <div className="contribution-type">
                            {getTypeIcon(contribution.type)}
                            <span className="type-label">{contribution.type.replace('_', ' ')}</span>
                          </div>
                          <div className="contribution-meta">
                            <span 
                              className="status"
                              style={{ color: getStatusColor(contribution.status) }}
                            >
                              {contribution.status}
                            </span>
                            <span className="date">{contribution.date}</span>
                          </div>
                        </div>
                        
                        <h3 className="contribution-title">{contribution.title}</h3>
                        <p className="contribution-description">{contribution.description}</p>
                        
                        <div className="contribution-footer">
                          <div className="rewards">
                            <div className="reward-item">
                              <Star size={14} />
                              <span>{contribution.points} pts</span>
                            </div>
                            <div className="reward-item tokens">
                              <Award size={14} />
                              <span>{contribution.tokens} $BDNS</span>
                            </div>
                          </div>
                          
                          <div className="contribution-links">
                            {contribution.pr && (
                              <span className="pr-number">{contribution.pr}</span>
                            )}
                            {contribution.issue && (
                              <span className="issue-number">{contribution.issue}</span>
                            )}
                            {contribution.url && (
                              <a 
                                href={contribution.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="view-link"
                              >
                                View <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <GitBranch size={48} />
                      <h3>No contributions yet</h3>
                      <p>Start contributing to Bitcoin DNS and see your progress here!</p>
                      <Link href="/contracts" className="start-btn">
                        View Available Contracts
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              <section className="contribution-guide">
                <h2>How to Contribute</h2>
                <div className="guide-grid">
                  <div className="guide-step">
                    <div className="step-number">1</div>
                    <h3>Find a Task</h3>
                    <p>Browse available contracts and tasks that match your skills</p>
                  </div>
                  <div className="guide-step">
                    <div className="step-number">2</div>
                    <h3>Submit Work</h3>
                    <p>Create pull requests or report issues following our guidelines</p>
                  </div>
                  <div className="guide-step">
                    <div className="step-number">3</div>
                    <h3>Earn Rewards</h3>
                    <p>Get points and $BDNS tokens for accepted contributions</p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .contributions-page {
          background: #0a0a0a;
          color: #ffffff;
          min-height: 100vh;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding-top: 24px;
          overflow-x: hidden;
        }

        .contributions-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .contributions-hero {
          text-align: center;
          padding: 60px 20px;
          background: #000000;
          margin: -24px -40px 40px -40px;
        }

        .contributions-hero h1 {
          font-size: 42px;
          font-weight: 200;
          margin: 0 0 16px 0;
          background: linear-gradient(90deg, #00ff88, #00cc66);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contributions-tagline {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 30px 0;
        }

        .auth-notice {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 24px;
          max-width: 400px;
          margin: 0 auto;
        }

        .auth-notice p {
          margin: 0 0 16px 0;
          color: rgba(255, 255, 255, 0.7);
        }

        .sign-in-btn {
          background: linear-gradient(90deg, #00ff88, #00cc66);
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sign-in-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
        }

        .stats-overview {
          padding: 40px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
        }

        .stat-card:hover {
          border-color: rgba(0, 255, 136, 0.3);
          background: rgba(255, 255, 255, 0.03);
        }

        .stat-icon {
          color: #00ff88;
        }

        .stat-content h3 {
          font-size: 24px;
          font-weight: 200;
          margin: 0 0 4px 0;
          color: #ffffff;
        }

        .stat-content p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .contributions-content {
          padding: 40px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .content-header h2 {
          font-size: 28px;
          font-weight: 200;
          margin: 0;
        }

        .filters {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: #00ff88;
          color: #00ff88;
        }

        .filter-btn.active {
          background: #00ff88;
          color: #000;
          border-color: #00ff88;
        }

        .contributions-list {
          display: grid;
          gap: 16px;
        }

        .contribution-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 24px;
          transition: all 0.2s;
        }

        .contribution-card:hover {
          border-color: rgba(0, 255, 136, 0.3);
          background: rgba(255, 255, 255, 0.03);
        }

        .contribution-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .contribution-type {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #00ff88;
        }

        .type-label {
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .contribution-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .status {
          font-weight: 500;
          text-transform: capitalize;
        }

        .date {
          color: rgba(255, 255, 255, 0.5);
        }

        .contribution-title {
          font-size: 18px;
          font-weight: 400;
          margin: 0 0 8px 0;
          color: #ffffff;
        }

        .contribution-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .contribution-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .rewards {
          display: flex;
          gap: 16px;
        }

        .reward-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          color: #00ff88;
        }

        .reward-item.tokens {
          color: #ffaa00;
        }

        .contribution-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pr-number, .issue-number {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }

        .view-link {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #00ff88;
          text-decoration: none;
          font-size: 14px;
          transition: opacity 0.2s;
        }

        .view-link:hover {
          opacity: 0.8;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.5);
        }

        .empty-state svg {
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 20px;
          font-weight: 300;
          margin: 0 0 8px 0;
          color: #ffffff;
        }

        .empty-state p {
          margin: 0 0 24px 0;
        }

        .start-btn {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(90deg, #00ff88, #00cc66);
          color: #000;
          padding: 12px 24px;
          border-radius: 100px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .start-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
        }

        .contribution-guide {
          padding: 60px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .contribution-guide h2 {
          font-size: 32px;
          font-weight: 200;
          margin: 0 0 40px 0;
        }

        .guide-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 800px;
          margin: 0 auto;
        }

        .guide-step {
          text-align: center;
        }

        .step-number {
          width: 48px;
          height: 48px;
          background: rgba(0, 255, 136, 0.1);
          border: 2px solid #00ff88;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          color: #00ff88;
          margin: 0 auto 16px;
        }

        .guide-step h3 {
          font-size: 18px;
          font-weight: 400;
          margin: 0 0 8px 0;
          color: #ffffff;
        }

        .guide-step p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        .loading-state {
          text-align: center;
          padding: 40px;
          color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .contributions-hero h1 {
            font-size: 32px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .content-header {
            flex-direction: column;
            gap: 20px;
          }

          .guide-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .contribution-footer {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}