import { useState } from 'react';
import { usePluginStore } from '@/stores/pluginStore';
import { pluginRegistry } from '@/services/plugin-registry';

export function PluginTest() {
  const { loadPlugin, getAllPlugins, loading, errors } = usePluginStore();
  const [result, setResult] = useState<string>('');

  const handleLoadExample = async () => {
    try {
      setResult('Loading plugin...');

      // 加载示例插件
      await loadPlugin('../plugins/example-plugin/index.ts');

      setResult('Plugin loaded! Testing tool...');

      // 测试工具
      const tool = pluginRegistry.getTool('example_tool');
      if (tool) {
        const toolResult = await tool.execute(
          { message: 'Hello World', uppercase: true },
          { logger: console, config: {} }
        );
        setResult(`Tool result:\n${JSON.stringify(toolResult, null, 2)}`);
      }
    } catch (error) {
      setResult(`Error: ${error}`);
      console.error('Failed to load plugin:', error);
    }
  };

  const handleTestCommand = async () => {
    try {
      const command = pluginRegistry.getCommand('example-command');
      if (command) {
        const cmdResult = await command.execute(
          {},
          { logger: console, config: {} }
        );
        setResult(`Command result:\n${JSON.stringify(cmdResult, null, 2)}`);
      } else {
        setResult('Command not found. Load plugin first.');
      }
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleListTools = () => {
    const tools = pluginRegistry.getAllTools();
    setResult(`Available tools:\n${tools.map(t => `- ${t.name}: ${t.description}`).join('\n')}`);
  };

  const handleListCommands = () => {
    const commands = pluginRegistry.getAllCommands();
    setResult(`Available commands:\n${commands.map(c => `- ${c.id}: ${c.name}`).join('\n')}`);
  };

  const plugins = getAllPlugins();
  const isLoading = loading.size > 0;

  return (
    <div className="flex flex-col h-full p-6 space-y-4 bg-background">
      <div>
        <h2 className="text-2xl font-bold mb-2">Plugin System Test</h2>
        <p className="text-sm text-muted-foreground">
          Test the plugin system by loading and executing plugins
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleLoadExample}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Loading...' : 'Load Example Plugin'}
        </button>

        <button
          onClick={handleTestCommand}
          disabled={plugins.length === 0}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Test Command
        </button>

        <button
          onClick={handleListTools}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          List Tools
        </button>

        <button
          onClick={handleListCommands}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          List Commands
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold mb-2">Loaded Plugins ({plugins.length})</h3>
            {plugins.length === 0 ? (
              <p className="text-sm text-muted-foreground">No plugins loaded</p>
            ) : (
              <div className="space-y-2">
                {plugins.map(plugin => (
                  <div key={plugin.definition.id} className="p-2 bg-background rounded border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{plugin.definition.name}</p>
                        <p className="text-xs text-muted-foreground">{plugin.definition.id}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        plugin.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        plugin.status === 'loading' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {plugin.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {plugin.definition.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errors.size > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <h3 className="font-semibold text-red-400 mb-2">Errors</h3>
              <div className="space-y-1">
                {Array.from(errors.entries()).map(([id, error]) => (
                  <p key={id} className="text-sm text-red-300">
                    • {id}: {error.message}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <h3 className="font-semibold mb-2">Result</h3>
          {result ? (
            <pre className="text-sm bg-background p-3 rounded border border-border overflow-auto max-h-96 whitespace-pre-wrap font-mono">
              {result}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">No results yet. Click a button to test.</p>
          )}
        </div>
      </div>
    </div>
  );
}
