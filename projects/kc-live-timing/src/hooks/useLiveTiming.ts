import { useState, useEffect, useCallback, useRef } from 'react';
import { parseAxwareHtml } from '../utils/parseAxware';
import type { TimingData } from '../types/timing';

const POLL_INTERVAL_MS = 60_000; // 1 minute
const LIVE_PATH = '/solo/live/results_live.htm';
// In development use the Vite proxy to avoid CORS; in production fetch directly
const LIVE_URL = import.meta.env.DEV
  ? `/kcrscca-proxy${LIVE_PATH}`
  : `https://www.kcrscca.org${LIVE_PATH}`;
// Fallback: bundled sample file (relative to the app's base path)
const SAMPLE_URL = `${import.meta.env.BASE_URL}sample-autocross.htm`;

interface LiveTimingState {
  data: TimingData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  usingSample: boolean;
}

export function useLiveTiming() {
  const [state, setState] = useState<LiveTimingState>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null,
    usingSample: false,
  });

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Try the live URL first
      let html: string;
      let usingSample = false;

      try {
        const res = await fetch(LIVE_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        html = await res.text();
      } catch (liveErr) {
        if ((liveErr as Error).name === 'AbortError') return;
        // In production, fall back to the bundled sample file so the app is
        // always functional for demos and previews.
        if (import.meta.env.DEV) throw liveErr;
        const sampleRes = await fetch(SAMPLE_URL, { signal: controller.signal });
        if (!sampleRes.ok) throw new Error('Failed to load sample data');
        html = await sampleRes.text();
        usingSample = true;
      }

      const data = parseAxwareHtml(html);
      setState({ data, loading: false, error: null, lastUpdated: new Date(), usingSample });
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
