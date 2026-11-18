import { useMemo, useState } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import { presets, starterCode } from "./demo";
import { runDemoOverride } from "./transform";

type ViewMode = "editor" | "diff";

export default function App() {
  const [source, setSource] = useState(starterCode);
  const [instruction, setInstruction] = useState("Remove console logs");
  const [proposal, setProposal] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>("editor");

  const changed = proposal !== null && proposal !== source;
  const lineCount = useMemo(() => source.split("\n").length, [source]);

  function runOverride() {
    const next = runDemoOverride(source, instruction);
    setProposal(next);
    setView("diff");
  }

  function applyOverride() {
    if (!proposal || proposal === source) return;
    setHistory((items) => [...items, source]);
    setSource(proposal);
    setProposal(null);
    setView("editor");
  }

  function rejectOverride() {
    setProposal(null);
    setView("editor");
  }

  function undo() {
    const previous = history.at(-1);
    if (previous === undefined) return;
    setSource(previous);
    setHistory((items) => items.slice(0, -1));
    setProposal(null);
    setView("editor");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">&lt;//&gt;</div>
          <div>
            <strong>SYNTAX</strong>
            <span>// OVERRIDE</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="eyebrow">PROJECT</p>
          <button className="project-row active">
            <span className="dot" />
            playground.ts
          </button>
          <button className="project-row muted" disabled>
            + Open folder
            <span className="soon">SOON</span>
          </button>
        </div>

        <div className="sidebar-section">
          <p className="eyebrow">SAVED OVERRIDES</p>
          <div className="preset-list">
            {presets.map((preset) => (
              <button
                className="preset"
                key={preset.name}
                onClick={() => setInstruction(preset.command)}
                title={preset.description}
              >
                <span>{preset.name}</span>
                <small>{preset.command}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <span>LOCAL MODE</span>
          <i />
          No code leaves this app
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="file-meta">
            <span className="ts-badge">TS</span>
            <div>
              <strong>playground.ts</strong>
              <small>{lineCount} lines · demo workspace</small>
            </div>
          </div>
          <div className="top-actions">
            <button
              className={view === "editor" ? "ghost active" : "ghost"}
              onClick={() => setView("editor")}
            >
              Editor
            </button>
            <button
              className={view === "diff" ? "ghost active" : "ghost"}
              onClick={() => proposal && setView("diff")}
              disabled={!proposal}
            >
              Diff
            </button>
            <button className="ghost" onClick={undo} disabled={!history.length}>
              Undo
            </button>
          </div>
        </header>

        <section className="editor-frame">
          <div className="editor-toolbar">
            <div>
              <span className="status-light" />
              {view === "diff" && proposal ? "OVERRIDE PREVIEW" : "LIVE EDITOR"}
            </div>
            <span>TypeScript</span>
          </div>

          <div className="editor-host">
            {view === "diff" && proposal ? (
              <DiffEditor
                height="100%"
                language="typescript"
                original={source}
                modified={proposal}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  renderSideBySide: true,
                  readOnly: true,
                  smoothScrolling: true,
                  padding: { top: 18 }
                }}
              />
            ) : (
              <Editor
                height="100%"
                language="typescript"
                value={source}
                onChange={(value) => setSource(value ?? "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  smoothScrolling: true,
                  cursorSmoothCaretAnimation: "on",
                  padding: { top: 18 },
                  fontLigatures: true
                }}
              />
            )}
          </div>
        </section>

        <section className="command-deck">
          <div className="command-head">
            <div>
              <span className="slash">//</span>
              <strong>OVERRIDE COMMAND</strong>
            </div>
            <span className="mode-pill">DEMO ENGINE</span>
          </div>

          <div className="command-row">
            <textarea
              value={instruction}
              onChange={(event) => setInstruction(event.target.value)}
              placeholder="Describe what should change..."
              rows={2}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  runOverride();
                }
              }}
            />
            <button className="run-button" onClick={runOverride}>
              RUN OVERRIDE
              <span>⌘↵</span>
            </button>
          </div>

          {proposal && (
            <div className="review-bar">
              <div>
                <strong>{changed ? "Override ready." : "No changes detected."}</strong>
                <span>
                  {changed
                    ? "Review the diff before anything touches your source."
                    : "Try another command or edit the source."}
                </span>
              </div>
              <div className="review-actions">
                <button className="reject" onClick={rejectOverride}>
                  Reject
                </button>
                <button className="apply" onClick={applyOverride} disabled={!changed}>
                  Apply changes
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
