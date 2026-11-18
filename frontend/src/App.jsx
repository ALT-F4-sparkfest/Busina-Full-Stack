import { useState } from "react";
import { usePwaUpdate } from "./hooks/usePwaUpdate";
import PwaUpdateToast from "./components/PwaUpdateToast";

import LandingPage from "./pages/LandingPage";
import CommuterView from "./pages/CommuterView";
import OperatorView from "./pages/OperatorView";
import OperatorLoginGate from "./components/auth/OperatorLoginGate";
import SyncDemoView from "./pages/SyncDemoView";

function getInitialView() {
  if (typeof window === "undefined") return "landing";
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  if (mode === "commuter" || mode === "operator" || mode === "sync-demo") {
    return mode;
  }
  return "landing";
}

function App() {
  const [activeView, setActiveView] = useState(getInitialView);

  const { updateAvailable, applyUpdate, offlineReady, dismissOfflineReady } =
    usePwaUpdate();

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
      <div key={activeView} className="view-transition">
        {renderView()}
      </div>
      <style>{`
        .view-transition {
          animation: busina-view-fade 0.28s ease-out;
        }
        @keyframes busina-view-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .view-transition { animation: none; }
        }
      `}</style>

      <PwaUpdateToast
        offlineReady={offlineReady}
        updateAvailable={updateAvailable}
        applyUpdate={applyUpdate}
        dismissOfflineReady={dismissOfflineReady}
      />
    </>
  );
}

export default App;
