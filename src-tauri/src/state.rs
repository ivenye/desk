use std::sync::Arc;
use tokio::sync::Mutex;
use crate::desk_client::DeskClient;

#[derive(Default)]
pub struct AppState {
    pub desk_client: Arc<Mutex<DeskClient>>,
}
