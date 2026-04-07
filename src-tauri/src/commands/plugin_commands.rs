use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::AppHandle;

#[derive(Debug, Serialize, Deserialize)]
pub struct PluginConfig {
    pub plugin_id: String,
    pub config: String,
}

/// 获取插件配置目录
fn get_plugin_config_dir(app: &AppHandle) -> Result<PathBuf, String> {
    let app_dir = app
        .path_resolver()
        .app_config_dir()
        .ok_or("Failed to get app config dir")?;

    let plugin_dir = app_dir.join("plugins");

    // 确保目录存在
    fs::create_dir_all(&plugin_dir)
        .map_err(|e| format!("Failed to create plugin config dir: {}", e))?;

    Ok(plugin_dir)
}

/// 加载插件配置
#[tauri::command]
pub async fn load_plugin_config(
    app: AppHandle,
    plugin_id: String,
) -> Result<String, String> {
    let config_dir = get_plugin_config_dir(&app)?;
    let config_file = config_dir.join(format!("{}.json", plugin_id));

    if !config_file.exists() {
        // 返回空配置
        return Ok("{}".to_string());
    }

    fs::read_to_string(&config_file)
        .map_err(|e| format!("Failed to read plugin config: {}", e))
}

/// 保存插件配置
#[tauri::command]
pub async fn save_plugin_config(
    app: AppHandle,
    plugin_id: String,
    config: String,
) -> Result<(), String> {
    let config_dir = get_plugin_config_dir(&app)?;
    let config_file = config_dir.join(format!("{}.json", plugin_id));

    fs::write(&config_file, config)
        .map_err(|e| format!("Failed to write plugin config: {}", e))
}

/// 删除插件配置
#[tauri::command]
pub async fn remove_plugin_config(
    app: AppHandle,
    plugin_id: String,
) -> Result<(), String> {
    let config_dir = get_plugin_config_dir(&app)?;
    let config_file = config_dir.join(format!("{}.json", plugin_id));

    if config_file.exists() {
        fs::remove_file(&config_file)
            .map_err(|e| format!("Failed to remove plugin config: {}", e))?;
    }

    Ok(())
}

/// 列出所有插件配置
#[tauri::command]
pub async fn list_plugin_configs(app: AppHandle) -> Result<Vec<String>, String> {
    let config_dir = get_plugin_config_dir(&app)?;

    let entries = fs::read_dir(&config_dir)
        .map_err(|e| format!("Failed to read plugin config dir: {}", e))?;

    let mut plugin_ids = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| format!("Failed to read entry: {}", e))?;
        let path = entry.path();

        if path.extension().and_then(|s| s.to_str()) == Some("json") {
            if let Some(stem) = path.file_stem().and_then(|s| s.to_str()) {
                plugin_ids.push(stem.to_string());
            }
        }
    }

    Ok(plugin_ids)
}
