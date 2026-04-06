use std::sync::Arc;
use tokio::sync::Mutex;
use crate::openclaw::OpenClawClient;

#[derive(Default)]
pub struct AppState {
    pub openclaw_client: Arc<Mutex<OpenClawClient>>,
}
