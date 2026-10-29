import { useState } from "react";
import { SettingsDialog } from "./components/Dialogs";
import StartScreen, { type Session } from "./components/StartScreen";
import Workspace from "./components/Workspace";
import { loadSettings, saveSettings, type Settings } from "./settings";

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [session, setSession] = useState<Session | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const save = (s: Settings) => {
    saveSettings(s);
    setSettings(s);
  };

  return (
    <>
      {session ? (
        // A new key per project, so nothing carries over from the previous one.
        <Workspace key={session.project.id} session={session} settings={settings} onSettings={() => setShowSettings(true)} onClose={() => setSession(null)} />
      ) : (
        <StartScreen settings={settings} onStart={setSession} onSettings={() => setShowSettings(true)} />
      )}
      {showSettings && <SettingsDialog settings={settings} onSave={save} onClose={() => setShowSettings(false)} />}
    </>
  );
}
