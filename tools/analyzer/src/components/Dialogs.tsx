import { useEffect, useRef, useState } from "react";
import { DEFAULT_MODEL, type Settings } from "../settings";
import type { Lang } from "../types";

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} ref={ref}>
        <header>
          <h2>{title}</h2>
          <button type="button" className="link" onClick={onClose} aria-label="Close">
            Close
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

export function SettingsDialog({ settings, onSave, onClose }: { settings: Settings; onSave: (s: Settings) => void; onClose: () => void }) {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [model, setModel] = useState(settings.model);
  const [lang, setLang] = useState<Lang>(settings.lang);
  return (
    <Modal title="Settings" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ apiKey: apiKey.trim(), model: model.trim() || DEFAULT_MODEL, lang });
          onClose();
        }}
      >
        <label className="block">
          Anthropic API key
          <input type="password" autoComplete="off" spellCheck={false} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-ant-..." data-testid="api-key" />
        </label>
        <p className="muted small">
          Used only for the AI draft. It is stored in this browser on this computer, is never written into a project file or sent anywhere except to Anthropic, and
          is never committed to the repository.
        </p>
        <label className="block">
          Model
          <input value={model} onChange={(e) => setModel(e.target.value)} spellCheck={false} data-testid="model" />
        </label>
        <p className="muted small">Default is {DEFAULT_MODEL}. Use any model ID your key can access.</p>
        <label className="block">
          Language for new projects
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </label>
        <div className="group">
          <button type="submit" className="btn primary" data-testid="save-settings">
            Save settings
          </button>
          {settings.apiKey && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                onSave({ ...settings, apiKey: "" });
                setApiKey("");
              }}
            >
              Remove the saved key
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

const SHORTCUTS: [string, string][] = [
  ["Space", "Play or pause"],
  ["← →", "Step one frame back or forward"],
  ["J  L", "Jump 5 seconds back or forward"],
  ["N", "Add a note at the current time"],
  ["D", "Draw on the paused frame (press again to finish)"],
  ["C", "Open match charting"],
  ["S", "Save now"],
  ["Ctrl or Cmd + Z", "Undo the last drawing, or the last charted point"],
  ["Esc", "Finish drawing, close this sheet"],
  ["?", "Show this sheet"],
];

export function ShortcutSheet({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Keyboard shortcuts" onClose={onClose}>
      <dl className="shortcuts" data-testid="shortcuts">
        {SHORTCUTS.map(([k, v]) => (
          <div key={k}>
            <dt>
              <kbd>{k}</kbd>
            </dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="muted small">Shortcuts work when the cursor is not in a text field.</p>
    </Modal>
  );
}
