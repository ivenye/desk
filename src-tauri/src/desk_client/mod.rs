use reqwest::Client;
use serde::{Deserialize, Serialize};
use crate::commands::{Session, AgentSpawn, ExecResult, MemoryResult};

/// Desk API Client - provides mock data for demo purposes
/// In production, this would connect to a real backend API
#[derive(Clone)]
pub struct DeskClient {
    base_url: String,
    api_token: Option<String>,
    client: Client,
}

impl Default for DeskClient {
    fn default() -> Self {
        Self {
            base_url: "http://localhost:3000".to_string(),
            api_token: None,
            client: Client::new(),
        }
    }
}

impl DeskClient {
    pub fn new(base_url: String, api_token: Option<String>) -> Self {
        Self {
            base_url,
            api_token,
            client: Client::new(),
        }
    }

    pub async fn list_sessions(&self) -> Result<Vec<Session>, Box<dyn std::error::Error>> {
        // Mock implementation - returns demo data
        // TODO: Connect to real backend API
        Ok(vec![
            Session {
                key: "agent:main:main".to_string(),
                agent_id: "main".to_string(),
                label: Some("Main Session".to_string()),
                active: true,
            }
        ])
    }

    pub async fn spawn_agent(&self, task: &str) -> Result<AgentSpawn, Box<dyn std::error::Error>> {
        // Mock implementation - returns demo data
        // TODO: Connect to real backend API
        Ok(AgentSpawn {
            session_key: "agent:spawned:123".to_string(),
            agent_id: "spawned".to_string(),
            task: task.to_string(),
        })
    }

    pub async fn exec_command(&self, command: &str) -> Result<ExecResult, Box<dyn std::error::Error>> {
        // Mock implementation - returns demo data
        // TODO: Execute commands locally or via backend API
        Ok(ExecResult {
            stdout: format!("Executed: {}\n", command),
            stderr: String::new(),
            exit_code: 0,
        })
    }

    pub async fn search_memory(&self, query: &str) -> Result<Vec<MemoryResult>, Box<dyn std::error::Error>> {
        // Mock implementation - returns demo data
        // TODO: Implement real memory search
        Ok(vec![
            MemoryResult {
                path: "MEMORY.md".to_string(),
                content: format!("Search results for: {}", query),
                score: 0.95,
            }
        ])
    }
}
