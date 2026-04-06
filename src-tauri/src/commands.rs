use serde::{Deserialize, Serialize};
use tauri::State;
use crate::openclaw::OpenClawClient;
use crate::state::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
    pub key: String,
    pub agent_id: String,
    pub label: Option<String>,
    pub active: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AgentSpawn {
    pub session_key: String,
    pub agent_id: String,
    pub task: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ExecResult {
    pub stdout: String,
    pub stderr: String,
    pub exit_code: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MemoryResult {
    pub path: String,
    pub content: String,
    pub score: f32,
}

#[tauri::command]
pub async fn list_sessions(state: State<'_, AppState>) -> Result<Vec<Session>, String> {
    let client = state.openclaw_client.lock().await;
    client.list_sessions().await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn spawn_agent(
    state: State<'_, AppState>,
    task: String,
) -> Result<AgentSpawn, String> {
    let client = state.openclaw_client.lock().await;
    client.spawn_agent(&task).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn exec_command(
    state: State<'_, AppState>,
    command: String,
) -> Result<ExecResult, String> {
    let client = state.openclaw_client.lock().await;
    client.exec_command(&command).await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn search_memory(
    state: State<'_, AppState>,
    query: String,
) -> Result<Vec<MemoryResult>, String> {
    let client = state.openclaw_client.lock().await;
    client.search_memory(&query).await
        .map_err(|e| e.to_string())
}
