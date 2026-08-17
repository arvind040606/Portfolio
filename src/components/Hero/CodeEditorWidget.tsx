import React, { useState } from "react";
import { Code, Terminal, FileCode, Check } from "lucide-react";

export const CodeEditorWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bunkmate" | "cardioguard" | "atmosphere">("bunkmate");

  const codeSnippets = {
    bunkmate: {
      fileName: "BunkMate.ts",
      lang: "TypeScript",
      code: `import { WebCrypto, PBKDF2 } from "@/lib/security";

export async function calculateAttendance(subjectId: string) {
  const localRecord = await db.attendance.findUnique({ where: { subjectId } });
  const projectedBunks = localRecord.totalClasses - localRecord.attended;

  // Local-First Encrypted Sync
  const encryptedKey = await WebCrypto.deriveKey(PBKDF2.salt);
  return {
    safeMargin: projectedBunks > 3,
    status: "ENCRYPTED_LOCAL_OK"
  };
}`,
    },
    cardioguard: {
      fileName: "CardioGuard.py",
      lang: "Python",
      code: `@app.post("/api/v1/predict-risk")
async def calculate_risk(patient: PatientMetrics):
    """Supervised ML Clinical Scoring with SHAP Explainability"""
    model_score = ml_pipeline.predict(patient.to_numpy())
    shap_explain = shap_explainer.attribute(patient)
    
    return {
        "risk_category": classify_score(model_score),
        "feature_importance": shap_explain,
        "integrity_verified": True
    }`,
    },
    atmosphere: {
      fileName: "Atmosphere.tsx",
      lang: "TypeScript React",
      code: `export function WeatherSearchEngine({ query }: { query: string }) {
  const { data: forecast } = useQuery({
    queryKey: ["weather", query],
    queryFn: () => fetchAtmosphericData(query),
  });

  return (
    <AtmosphericGlobe
      pressure={forecast?.barometric}
      windVector={forecast?.wind}
      aiSummary={forecast?.aiInterpretation}
    />
  );
}`,
    },
  };

  const current = codeSnippets[activeTab];

  return (
    <div className="rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden font-mono text-xs shadow-2xl shadow-cyan-500/10">
      {/* Tab Bar */}
      <div className="bg-slate-950/90 border-b border-white/10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          <span className="text-slate-400 text-[11px] ml-2">IDE — REAL PROJECT SNIPPETS</span>
        </div>

        <div className="flex space-x-1">
          {(["bunkmate", "cardioguard", "atmosphere"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                activeTab === tab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {codeSnippets[tab].fileName}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 bg-[#080B14]/90 overflow-x-auto">
        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2 border-b border-white/5 pb-1">
          <span>PATH: src/core/{current.fileName}</span>
          <span className="text-cyan-400 font-bold">{current.lang}</span>
        </div>

        <pre className="text-slate-200 leading-relaxed font-mono text-[11.5px]">
          <code>
            {current.code.split("\n").map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-slate-600 pr-4 select-none text-[10px]">
                  {i + 1}
                </span>
                <span className="table-cell">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
