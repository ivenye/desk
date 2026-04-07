import { useState } from 'react';
import { X, Download, Upload, RotateCcw } from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import { configTemplates, type ConfigTemplateName } from '@/config/templates';
import { configTemplateInfo } from '@/config/types';

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { config, updateSection, resetConfig, exportConfig, importConfig } = useConfig();
  const [activeTab, setActiveTab] = useState<'app' | 'editor' | 'terminal' | 'plugins' | 'keybindings'>('app');

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'desk-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = e.target?.result as string;
            importConfig(json);
            alert('Configuration imported successfully!');
          } catch (error) {
            alert('Failed to import configuration: ' + error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLoadTemplate = (templateName: ConfigTemplateName) => {
    const template = configTemplates[templateName];
    importConfig(JSON.stringify(template));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl h-[80vh] bg-card border border-border rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold">⚙️ Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-border p-2 space-y-1">
            <button
              onClick={() => setActiveTab('app')}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === 'app' ? 'bg-accent' : 'hover:bg-accent/50'
              }`}
            >
              🎨 Appearance
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === 'editor' ? 'bg-accent' : 'hover:bg-accent/50'
              }`}
            >
              📝 Editor
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === 'terminal' ? 'bg-accent' : 'hover:bg-accent/50'
              }`}
            >
              💻 Terminal
            </button>
            <button
              onClick={() => setActiveTab('plugins')}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === 'plugins' ? 'bg-accent' : 'hover:bg-accent/50'
              }`}
            >
              🧩 Plugins
            </button>
            <button
              onClick={() => setActiveTab('keybindings')}
              className={`w-full text-left px-3 py-2 rounded ${
                activeTab === 'keybindings' ? 'bg-accent' : 'hover:bg-accent/50'
              }`}
            >
              ⌨️ Keybindings
            </button>

            <div className="pt-4 border-t border-border space-y-1">
              <button
                onClick={handleExport}
                className="w-full text-left px-3 py-2 rounded hover:bg-accent/50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleImport}
                className="w-full text-left px-3 py-2 rounded hover:bg-accent/50 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'app' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Appearance</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="flex gap-2">
                    {(['light', 'dark', 'system'] as const).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => updateSection('app', { theme })}
                        className={`px-4 py-2 rounded border ${
                          config.app.theme === theme
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:bg-accent'
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.app.autoUpdate}
                      onChange={(e) => updateSection('app', { autoUpdate: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Enable auto updates</span>
                  </label>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold mb-3">Configuration Templates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(configTemplateInfo).map(([key, info]) => (
                      <button
                        key={key}
                        onClick={() => handleLoadTemplate(key as ConfigTemplateName)}
                        className="p-4 border border-border rounded hover:bg-accent text-left"
                      >
                        <div className="text-2xl mb-2">{info.icon}</div>
                        <div className="font-medium">{info.name}</div>
                        <div className="text-xs text-muted-foreground">{info.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Editor Settings</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Font Size: {config.editor.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={config.editor.fontSize}
                    onChange={(e) => updateSection('editor', { fontSize: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font Family</label>
                  <input
                    type="text"
                    value={config.editor.fontFamily}
                    onChange={(e) => updateSection('editor', { fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tab Size: {config.editor.tabSize}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={config.editor.tabSize}
                    onChange={(e) => updateSection('editor', { tabSize: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.editor.autoSave}
                      onChange={(e) => updateSection('editor', { autoSave: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Auto Save</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.editor.wordWrap}
                      onChange={(e) => updateSection('editor', { wordWrap: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Word Wrap</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.editor.minimap}
                      onChange={(e) => updateSection('editor', { minimap: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Show Minimap</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'terminal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Terminal Settings</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">Shell</label>
                  <input
                    type="text"
                    value={config.terminal.shell}
                    onChange={(e) => updateSection('terminal', { shell: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Font Size: {config.terminal.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={config.terminal.fontSize}
                    onChange={(e) => updateSection('terminal', { fontSize: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cursor Style</label>
                  <select
                    value={config.terminal.cursorStyle}
                    onChange={(e) => updateSection('terminal', { cursorStyle: e.target.value as 'block' | 'underline' | 'bar' })}
                    className="w-full px-3 py-2 bg-background border border-border rounded"
                  >
                    <option value="block">Block</option>
                    <option value="underline">Underline</option>
                    <option value="bar">Bar</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'plugins' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Plugin Settings</h3>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.plugins.autoLoad}
                      onChange={(e) => updateSection('plugins', { autoLoad: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Auto-load plugins on startup</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Plugin Paths</label>
                  <div className="space-y-2">
                    {config.plugins.pluginPaths.map((path, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={path}
                          readOnly
                          className="flex-1 px-3 py-2 bg-background border border-border rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'keybindings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                <p className="text-sm text-muted-foreground">
                  Customize keyboard shortcuts for commands
                </p>

                <div className="space-y-2">
                  {Object.entries(config.keybindings).map(([commandId, shortcut]) => (
                    <div key={commandId} className="flex items-center gap-3 p-2 hover:bg-accent/50 rounded">
                      <div className="flex-1 text-sm">{commandId}</div>
                      <div className="px-3 py-1 bg-background border border-border rounded text-sm font-mono">
                        {shortcut}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <button
            onClick={resetConfig}
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent rounded"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
