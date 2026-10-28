import { useEffect, useRef } from "react";
import { clock } from "../project";
import { NOTE_TYPES, type Note, type NoteType } from "../types";
import { NOTE_COLORS } from "./Player";

const LABEL: Record<NoteType, string> = { strength: "Strength", issue: "Issue", tactical: "Tactical" };

interface Props {
  notes: Note[];
  selectedId: string | null;
  focusId: string | null;
  onSelect: (id: string) => void;
  onJump: (time: number) => void;
  onChange: (id: string, patch: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onDraw: (id: string) => void;
}

/** The notes of the analysis, in time order. Click one to jump to that moment. */
export default function NotesPanel({ notes, selectedId, focusId, onSelect, onJump, onChange, onDelete, onDraw }: Props) {
  const titles = useRef<Record<string, HTMLInputElement | null>>({});
  const sorted = [...notes].sort((a, b) => a.time - b.time);

  // A new note gets the cursor in its title.
  useEffect(() => {
    if (focusId) titles.current[focusId]?.focus();
  }, [focusId, notes.length]);

  if (sorted.length === 0) {
    return (
      <p className="empty" data-testid="notes-empty">
        No notes yet. Pause the video where something matters and press <kbd>N</kbd>.
      </p>
    );
  }

  return (
    <ol className="notes" data-testid="notes">
      {sorted.map((n) => (
        <li key={n.id} className={selectedId === n.id ? "note on" : "note"} onClick={() => onSelect(n.id)}>
          <div className="row">
            <button
              type="button"
              className="time"
              aria-label={`Go to ${clock(n.time)}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(n.id);
                onJump(n.time);
              }}
            >
              {clock(n.time)}
            </button>
            <select
              aria-label="Type"
              value={n.type}
              style={{ borderColor: NOTE_COLORS[n.type] }}
              onChange={(e) => onChange(n.id, { type: e.target.value as NoteType })}
            >
              {NOTE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {LABEL[t]}
                </option>
              ))}
            </select>
            <button type="button" className="link" onClick={(e) => { e.stopPropagation(); onDraw(n.id); }}>
              {n.shapes.length > 0 ? "Edit drawing" : "Draw"}
            </button>
            <button type="button" className="link danger" onClick={(e) => { e.stopPropagation(); onDelete(n.id); }}>
              Delete
            </button>
          </div>
          <input
            ref={(el) => {
              titles.current[n.id] = el;
            }}
            aria-label="Title"
            placeholder="Title"
            value={n.title}
            onChange={(e) => onChange(n.id, { title: e.target.value })}
          />
          <textarea aria-label="Text" rows={3} placeholder="What you see and what to do about it" value={n.text} onChange={(e) => onChange(n.id, { text: e.target.value })} />
          {n.drawing && (
            <img className="thumb" src={n.drawing} alt="Annotated frame" />
          )}
        </li>
      ))}
    </ol>
  );
}
