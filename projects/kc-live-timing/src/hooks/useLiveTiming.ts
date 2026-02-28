import { useState, useEffect, useCallback, useRef } from 'react';
import { parseAxwareHtml } from '../utils/parseAxware';
import type { TimingData } from '../types/timing';

const POLL_INTERVAL_MS = 60_000; // 1 minute
const LIVE_PATH = '/solo/live/results_live.htm';
// In development use the Vite proxy to avoid CORS; in production fetch directly
const LIVE_URL = import.meta.env.DEV
  ? `/kcrscca-proxy${LIVE_PATH}`
  : `https://www.kcrscca.org${LIVE_PATH}`;

interface LiveTimingState {
  data: TimingData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useLiveTiming() {
  const [state, setState] = useState<LiveTimingState>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch(LIVE_URL, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const html = await res.text();
      const data = parseAxwareHtml(html);
      setState({ data, loading: false, error: null, lastUpdated: new Date() });
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setState(prev => ({
        ...prev,
        loading: false,
        error: (err as Error).message ?? 'Failed to fetch results',
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => {
      clearInterval(id);
      abortRef.current?.abort();
    };
  }, [fetchData]);

  return { ...state, refresh: fetchData };
}
