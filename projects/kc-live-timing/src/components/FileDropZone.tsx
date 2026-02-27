import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileDropZoneProps {
  onFile: (html: string, fileName: string) => void;
}

export function FileDropZone({ onFile }: FileDropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  }

  function readFile(file: File) {
    const reader = new FileReader();
    reader.onload = ev => {
      onFile((ev.target?.result as string) ?? '', file.name);
    };
    reader.readAsText(file);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Drop or click to load an axware results HTML file"
      className="drop-zone"
      data-dragging={dragging}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
    >
      <span className="drop-zone__icon" aria-hidden="true">📂</span>
      <p className="drop-zone__title">Drop <code>results_live.htm</code> here</p>
      <p className="drop-zone__sub">or click to browse</p>
      <input
        ref={inputRef}
        type="file"
        accept=".htm,.html"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </div>
  );
}
