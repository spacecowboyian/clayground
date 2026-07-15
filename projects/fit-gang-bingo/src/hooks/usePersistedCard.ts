import { useEffect, useState } from 'react';
import { SQUARES, type Square } from '../data/squares';
import { HOT_ROD_ART } from '../data/hotRods';
import { shuffle } from '../utils/shuffle';

const STORAGE_KEY = 'fitgang-bingo:play-card';

interface StoredCard {
  order: string[];
  marks: string[];
  hotRodIndex: number;
}

const squareById = new Map(SQUARES.map((square) => [square.id, square]));

function freshCard(): StoredCard {
  return {
    order: shuffle(SQUARES).map((square) => square.id),
    // Free space starts marked; nothing else does.
    marks: ['free-space'],
    hotRodIndex: Math.floor(Math.random() * HOT_ROD_ART.length),
  };
}

function loadCard(): StoredCard {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshCard();
    const parsed = JSON.parse(raw) as Partial<StoredCard>;
    if (
      !Array.isArray(parsed.order) ||
      parsed.order.length !== SQUARES.length ||
      !parsed.order.every((id) => squareById.has(id))
    ) {
      return freshCard();
    }
    return {
      order: parsed.order,
      marks: Array.isArray(parsed.marks) ? parsed.marks : ['free-space'],
      hotRodIndex: typeof parsed.hotRodIndex === 'number' ? parsed.hotRodIndex : 0,
    };
  } catch {
    return freshCard();
  }
}

/** A player's card + marks, persisted to localStorage so a stray refresh
 *  doesn't nuke a game halfway to Colorado. Local-only — see decisions.md
 *  for why there's no server-side shared state. */
export function usePersistedCard() {
  const [stored, setStored] = useState<StoredCard>(loadCard);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [stored]);

  const squares: Square[] = stored.order.map((id) => squareById.get(id)!);
  const marks = new Set(stored.marks);
  const hotRodArt = HOT_ROD_ART[stored.hotRodIndex % HOT_ROD_ART.length];

  function toggleMark(id: string) {
    // Free space is marked from the start and isn't interactive.
    if (id === 'free-space') return;
    setStored((prev) => {
      const nextMarks = new Set(prev.marks);
      if (nextMarks.has(id)) nextMarks.delete(id);
      else nextMarks.add(id);
      return { ...prev, marks: [...nextMarks] };
    });
  }

  function newCard() {
    setStored(freshCard());
  }

  return { squares, marks, hotRodArt, toggleMark, newCard };
}
