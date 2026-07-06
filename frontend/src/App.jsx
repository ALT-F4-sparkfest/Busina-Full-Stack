//app.jsx

import { useState, useEffect } from "react";
import { usePwaUpdate } from "./hooks/usePwaUpdate";
import PwaUpdateToast from "./components/PwaUpdateToast";

import LandingPage from "./pages/LandingPage";
import CommuterView from "./pages/CommuterView";
import OperatorView from "./pages/OperatorView";
import OperatorLoginGate from "./components/auth/OperatorLoginGate";
import SyncDemoView from "./pages/SyncDemoView";

function App() {
  const [activeView, setActiveView] = useState("landing");

  const { updateAvailable, applyUpdate, offlineReady, dismissOfflineReady } =
    usePwaUpdate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    if (mode === "commuter") setActiveView("commuter");
    else if (mode === "operator") setActiveView("operator");
    else if (mode === "sync-demo") setActiveView("sync-demo");
  }, []);

  const goLanding = () => setActiveView("landing");

  const renderView = () => {
    switch (activeView) {
      case "commuter":
        return <CommuterView onBack={goLanding} />;

      case "operator":
        return (
          <OperatorLoginGate onLogout={goLanding}>
            <OperatorView onBack={goLanding} />
          </OperatorLoginGate>
        );

      case "sync-demo":
        return <SyncDemoView onBack={goLanding} />;

      default:
        return <LandingPage setActiveView={setActiveView} />;
    }
  };

  return (
    <>
      {/* key={activeView} forces a remount on every view switch, which
          re-triggers the CSS animation below — a simple, dependency-free
          page transition. */}
      <div key={activeView} className="view-transition">
        {renderView()}
      </div>
      <style>{`
        .view-transition {
          animation: busina-view-fade 0.32s ease-out;
        }
        @keyframes busina-view-fade {
          from { opacity: 0; transform: translateY(14px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .view-transition { animation: none; }
        }
      `}</style>

      <PwaUpdateToast
        offlineReady={offlineReady}
        needRefresh={updateAvailable}
        onUpdate={applyUpdate}
        onDismissOffline={dismissOfflineReady}
      />
    </>
  );
}

export default App;
