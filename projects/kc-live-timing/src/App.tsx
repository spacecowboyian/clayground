import { useState, useCallback } from 'react';
import type { TimingData } from './types/timing';
import { parseAxwareHtml } from './utils/parseAxware';
import { FileDropZone } from './components/FileDropZone';
import { LatestRuns } from './components/LatestRuns';
import { ClassResults } from './components/ClassResults';
import { CompetitionPage } from './components/CompetitionPage';
import { useLocalStorage } from './hooks/useLocalStorage';

type Tab = 'results' | 'competition';

export function App() {
  const [timingData, setTimingData] = useState<TimingData | null>(null);
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('results');
  const [myDriverKey, setMyDriverKey] = useLocalStorage<string>('kc-timing-me', '');
  const [competitionKeys, setCompetitionKeys] = useLocalStorage<string[]>('kc-timing-competition', []);

  const handleFile = useCallback((html: string, name: string) => {
    const data = parseAxwareHtml(html);
    setTimingData(data);
    setFileName(name);
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

  const competitionSet = new Set(competitionKeys);

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

          {/* Tab bar */}
          <nav className="tab-bar" role="tablist" aria-label="Timing views">
            <button
              role="tab"
              aria-selected={activeTab === 'results'}
              className={`tab-btn${activeTab === 'results' ? ' tab-btn--active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              Results
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'competition'}
              className={`tab-btn${activeTab === 'competition' ? ' tab-btn--active' : ''}`}
              onClick={() => setActiveTab('competition')}
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
              onClick={() => { setTimingData(null); setFileName(''); }}
            >
              📂 {fileName || 'Load file'}
            </button>
          </nav>

          <main className="app-main" role="tabpanel">
            {activeTab === 'results' ? (
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
                      onSetMe={handleSetMe}
                      onToggleCompetition={handleToggleCompetition}
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
                onSetMe={handleSetMe}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}
