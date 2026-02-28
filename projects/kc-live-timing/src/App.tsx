import { useState, useCallback, useMemo } from 'react';
import { LatestRuns } from './components/LatestRuns';
import { ClassResults } from './components/ClassResults';
import { CompetitionPage } from './components/CompetitionPage';
import { DriverDetail } from './components/DriverDetail';
import { MeBar } from './components/MeBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLiveTiming } from './hooks/useLiveTiming';

type Tab = 'results' | 'competition';

export function App() {
  const { data: timingData, loading, error, lastUpdated, refresh } = useLiveTiming();
  const [activeTab, setActiveTab] = useState<Tab>('results');
  const [myDriverKey, setMyDriverKey] = useLocalStorage<string>('kc-timing-me', '');
  const [competitionKeys, setCompetitionKeys] = useLocalStorage<string[]>('kc-timing-competition', []);
  const [selectedDriverKey, setSelectedDriverKey] = useState<string | null>(null);

  const handleSetMe = useCallback((key: string) => {
    setMyDriverKey(key);
  }, [setMyDriverKey]);

  const handleToggleCompetition = useCallback((key: string) => {
    setCompetitionKeys(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key);
      return [...prev, key];
    });
  }, [setCompetitionKeys]);

  const handleDriverClick = useCallback((key: string) => {
    setSelectedDriverKey(key);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedDriverKey(null);
  }, []);

  const competitionSet = new Set(competitionKeys);

  // Resolve the selected driver + class for the detail view
  const selectedDetail = useMemo(() => {
    if (!selectedDriverKey || !timingData) return null;
    for (const cls of timingData.classes) {
      const driver = cls.drivers.find(
        d => `${cls.code}-${d.carNumber}` === selectedDriverKey
      );
      if (driver) return { driver, cls };
    }
    return null;
  }, [selectedDriverKey, timingData]);

  // Resolve "me" driver for the global sticky bar
  const meDetail = useMemo(() => {
    if (!myDriverKey || !timingData) return null;
    for (const cls of timingData.classes) {
      const driver = cls.drivers.find(
        d => `${cls.code}-${d.carNumber}` === myDriverKey
      );
      if (driver) return { driver, cls };
    }
    return null;
  }, [myDriverKey, timingData]);

  const lastUpdatedStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  return (
    <div className={`app${meDetail ? ' app--has-me' : ''}`}>
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-header__title">
            <span aria-hidden="true">🏁</span> KC Live Timing
          </h1>
          {timingData && (
            <div className="app-header__event">
              <span className="app-header__event-title">{timingData.eventTitle}</span>
              {timingData.eventInfo && (
                <span className="app-header__event-info">{timingData.eventInfo}</span>
              )}
              <span className={`badge badge--${timingData.eventType}`}>
                {timingData.eventType}
              </span>
            </div>
          )}
          <div className="app-header__status">
            {loading && <span className="status-dot status-dot--loading" aria-label="Fetching…" />}
            {lastUpdatedStr && !loading && (
              <span className="status-updated">Updated {lastUpdatedStr}</span>
            )}
            <button
              className="status-refresh-btn"
              aria-label="Refresh now"
              title="Refresh now"
              onClick={refresh}
            >
              ↻
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="fetch-error" role="alert">
          <span>⚠️ Could not load results — {error}</span>
          <button className="fetch-error__retry" onClick={refresh}>Retry</button>
        </div>
      )}

      {loading && !timingData && (
        <main className="app-main app-main--empty">
          <p className="loading-msg">Loading live results…</p>
        </main>
      )}

      {timingData && (
        <>
          {/* Global sticky "YOU" bar — above latest runs */}
          {meDetail && (
            <MeBar
              driver={meDetail.driver}
              cls={meDetail.cls}
              driverKey={myDriverKey}
              onDriverClick={handleDriverClick}
            />
          )}

          {/* Latest runs strip */}
          <div className="latest-runs-wrapper">
            <LatestRuns runs={timingData.latestRuns} />
          </div>

          {/* Tab bar */}
          <nav className="tab-bar" role="tablist" aria-label="Timing views">
            <button
              role="tab"
              aria-selected={activeTab === 'results'}
              className={`tab-btn${activeTab === 'results' ? ' tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('results'); setSelectedDriverKey(null); }}
            >
              Results
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'competition'}
              className={`tab-btn${activeTab === 'competition' ? ' tab-btn--active' : ''}`}
              onClick={() => { setActiveTab('competition'); setSelectedDriverKey(null); }}
            >
              Competition
              {competitionKeys.length > 0 && (
                <span className="tab-btn__badge">{competitionKeys.length}</span>
              )}
            </button>
          </nav>

          <main className="app-main" role="tabpanel">
            {/* Driver detail overlay — takes over main content area */}
            {selectedDetail ? (
              <DriverDetail
                driver={selectedDetail.driver}
                cls={selectedDetail.cls}
                driverKey={selectedDriverKey!}
                isMe={selectedDriverKey === myDriverKey}
                onSetMe={handleSetMe}
                onBack={handleBack}
              />
            ) : activeTab === 'results' ? (
              <div className="classes-list">
                {timingData.classes.length === 0 ? (
                  <p className="no-data">No class data found.</p>
                ) : (
                  timingData.classes.map(cls => (
                    <ClassResults
                      key={cls.code}
                      cls={cls}
                      myDriverKey={myDriverKey}
                      competitionKeys={competitionSet}
                      onToggleCompetition={handleToggleCompetition}
                      onDriverClick={handleDriverClick}
                    />
                  ))
                )}
              </div>
            ) : (
              <CompetitionPage
                classes={timingData.classes}
                competitionKeys={competitionSet}
                myDriverKey={myDriverKey}
                onToggleCompetition={handleToggleCompetition}
                onDriverClick={handleDriverClick}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}
