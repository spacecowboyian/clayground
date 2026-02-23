import { useState, useCallback, useMemo } from 'react';
import type { TimingData } from './types/timing';
import { parseAxwareHtml } from './utils/parseAxware';
import { FileDropZone } from './components/FileDropZone';
import { LatestRuns } from './components/LatestRuns';
import { ClassResults } from './components/ClassResults';
import { CompetitionPage } from './components/CompetitionPage';
import { DriverDetail } from './components/DriverDetail';
import { useLocalStorage } from './hooks/useLocalStorage';
import { formatTime } from './utils/timeUtils';

type Tab = 'results' | 'competition';

export function App() {
  const [timingData, setTimingData] = useState<TimingData | null>(null);
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('results');
  const [myDriverKey, setMyDriverKey] = useLocalStorage<string>('kc-timing-me', '');
  const [competitionKeys, setCompetitionKeys] = useLocalStorage<string[]>('kc-timing-competition', []);
  const [selectedDriverKey, setSelectedDriverKey] = useState<string | null>(null);

  const handleFile = useCallback((html: string, name: string) => {
    const data = parseAxwareHtml(html);
    setTimingData(data);
    setFileName(name);
    setSelectedDriverKey(null);
  }, []);

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

  return (
    <div className="app">
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
        </div>
      </header>

      {!timingData ? (
        <main className="app-main app-main--empty">
          <FileDropZone onFile={handleFile} />
          <p className="hint">
            Download <code>results_live.htm</code> from your axware server and drop it here.
            The page auto-refreshes every ~30 s — re-drop the file to update.
          </p>
        </main>
      ) : (
        <>
          {/* Latest runs strip */}
          <div className="latest-runs-wrapper">
            <LatestRuns runs={timingData.latestRuns} />
          </div>

          {/* Global sticky "YOU" bar — always visible when "me" is set */}
          {meDetail && (
            <div
              className="global-me-bar"
              role="status"
              aria-label={`Your result: ${meDetail.driver.name}`}
            >
              <span className="global-me-bar__label">You</span>
              <button
                className="global-me-bar__name"
                onClick={() => handleDriverClick(myDriverKey)}
                aria-label={`View your details: ${meDetail.driver.name}`}
              >
                {meDetail.driver.name}
              </button>
              <span className="global-me-bar__class">{meDetail.cls.code}</span>
              <span className="global-me-bar__time">
                {meDetail.driver.bestTime !== null
                  ? formatTime(meDetail.driver.bestTime)
                  : '—'}
              </span>
              <span className="global-me-bar__pos">
                {meDetail.driver.bestTime !== null ? `P${meDetail.driver.position}` : '—'}
              </span>
            </div>
          )}

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
            <button
              className="tab-btn tab-btn--reload"
              title="Load a new file"
              aria-label="Load a new file"
              onClick={() => { setTimingData(null); setFileName(''); setSelectedDriverKey(null); }}
            >
              📂 {fileName || 'Load file'}
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
                  <p className="no-data">No class data found in this file.</p>
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
