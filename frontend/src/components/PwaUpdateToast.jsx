// src/components/PwaUpdateToast.jsx
export default function PwaUpdateToast({
  updateAvailable,
  needRefresh,
  applyUpdate,
  onUpdate,
  offlineReady,
  dismissOfflineReady,
  onDismissOffline,
}) {
  const hasUpdate = updateAvailable ?? needRefresh;
  const handleUpdate = applyUpdate ?? onUpdate;
  const handleDismiss = dismissOfflineReady ?? onDismissOffline;

  if (!hasUpdate && !offlineReady) return null;

  if (hasUpdate) {
    return (
      <div className="pwa-toast">
        <div className="pwa-toast-text">
          <strong>New version available</strong>
          <span>Reload to get the latest BUSINA.</span>
        </div>
        <button className="pwa-toast-btn" onClick={handleUpdate}>
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="pwa-toast pwa-toast-muted">
      <div className="pwa-toast-text">
        <strong>BUSINA is ready offline</strong>
        <span>Core features will work without a connection.</span>
      </div>
      <button
        className="pwa-toast-dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
