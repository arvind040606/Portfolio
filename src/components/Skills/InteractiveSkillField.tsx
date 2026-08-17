import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Cpu, Terminal, Network, ShieldCheck, Zap, Database, GitBranch } from "lucide-react";

export interface SkillDetail {
  id: string;
  name: string;
  category: string;
  codeSnippet: string;
  reactionType: "python" | "react" | "ai" | "fastapi" | "sql" | "git" | "rest";
  reactionDescription: string;
}

export const skillsList: SkillDetail[] = [
  {
    id: "python",
    name: "PYTHON",
    category: "AI / ML & Backend",
    reactionType: "python",
    reactionDescription: "Scikit-Learn predictive modeling & SHAP explainability pipelines",
    codeSnippet: `def compute_cardio_risk(patient_metrics: PatientInput) -> RiskReport:
    # Validate clinical dataset features
    features = preprocess_clinical_features(patient_metrics)
    risk_score = ml_classifier.predict_proba(features)[0][1]
    
    # SHAP feature importance breakdown
    explainer = shap.TreeExplainer(ml_classifier)
    shap_values = explainer.shap_values(features)
    return RiskReport(score=risk_score, shap=shap_values)`,
  },
  {
    id: "react",
    name: "REACT",
    category: "Frontend UI Architecture",
    reactionType: "react",
    reactionDescription: "Gesture-driven swipe interactions & state machine component trees",
    codeSnippet: `export const AttendanceCard: React.FC<CardProps> = ({ classItem, onSwipe }) => {
  const [bunkState, setBunkState] = useState<AttendanceStatus>('ATTENDED');
  
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      onDragEnd={(_, info) => handleSwipeGesture(info.offset.x)}
      className="p-6 rounded-2xl bg-space-card border border-cyan-500/20"
    >
      <AttendancePercentageRing percentage={classItem.percentage} />
    </motion.div>
  );
};`,
  },
  {
    id: "fastapi",
    name: "FASTAPI",
    category: "High-Performance Backend",
    reactionType: "fastapi",
    reactionDescription: "Asynchronous Python API microservices & clinical scoring endpoints",
    codeSnippet: `@app.post("/api/v1/cardioguard/predict", response_model=PredictionResponse)
async def predict_risk(payload: PatientPayload, auth: AuthUser = Depends()):
    logger.info(f"Processing clinical risk scoring for session {auth.id}")
    report = await risk_engine.evaluate(payload)
    return JSONResponse(status_code=200, content=report.dict())`,
  },
  {
    id: "ai",
    name: "AI & ML",
    category: "Intelligent Systems",
    reactionType: "ai",
    reactionDescription: "Gemini API structured timetable parsing & neural vector search",
    codeSnippet: `const extractTimetableFromImage = async (imageBuffer: ArrayBuffer) => {
  const response = await geminiVisionModel.generateContent([
    { inlineData: { data: toBase64(imageBuffer), mimeType: "image/png" } },
    { text: "Extract weekly schedule JSON: subject, time, room, instructor." }
  ]);
  return JSON.parse(response.response.text());
};`,
  },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    category: "Type-Safe Full-Stack",
    reactionType: "react",
    reactionDescription: "Strict API schemas, WebCrypto payload interfaces & type safety",
    codeSnippet: `export interface EncryptedVaultPayload {
  version: "1.0.0";
  algorithm: "AES-GCM-256";
  iv: string; // Base64 encoded initialization vector
  salt: string; // PBKDF2 salt
  ciphertext: string; // Encrypted student schedule
}`,
  },
  {
    id: "rest",
    name: "REST APIs",
    category: "System Integration",
    reactionType: "rest",
    reactionDescription: "JSON request/response serialization & error boundary handling",
    codeSnippet: `export const fetchAtmosphereTelemetry = async (city: string): Promise<WeatherData> => {
  const { data } = await axios.get<AtmosphereResponse>('/api/weather', {
    params: { q: city, units: 'metric' },
    headers: { 'X-Cache-Control': 'max-age=300' }
  });
  return parseAtmosphereTelemetry(data);
};`,
  },
  {
    id: "sql",
    name: "SQL & TURSO",
    category: "Data Storage & Schemas",
    reactionType: "sql",
    reactionDescription: "Relational database indexing & distributed SQLite edge queries",
    codeSnippet: `CREATE TABLE IF NOT EXISTS student_schedules (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  encrypted_data BLOB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_schedule ON student_schedules(user_id);`,
  },
  {
    id: "git",
    name: "GIT & GITHUB",
    category: "DevOps & CI/CD",
    reactionType: "git",
    reactionDescription: "Version control workflows, Vercel deployments & automated checks",
    codeSnippet: `git checkout -b feature/local-first-encryption
git commit -m "feat(crypto): implement PBKDF2 key derivation for BunkMate vault"
git push origin feature/local-first-encryption`,
  },
];

export const InteractiveSkillField: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillDetail>(skillsList[0]);

  return (
    <div className="space-y-12">
      {/* Skill Pills Field */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
        {skillsList.map((skill) => {
          const isActive = activeSkill.id === skill.id;
          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill)}
              onMouseEnter={() => setActiveSkill(skill)}
              data-cursor={`HOVER ${skill.name}`}
              className={`px-6 py-3.5 rounded-2xl font-display font-extrabold text-sm tracking-wider uppercase transition-all duration-300 border ${
                isActive
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] scale-105"
                  : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-cyan-500/40 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {skill.name}
            </button>
          );
        })}
      </div>

      {/* Environment Reaction Visualizer Box */}
      <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden border border-white/10 bg-[#070A14] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase">
              ENVIRONMENT REACTION // {activeSkill.name}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {activeSkill.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Reaction Description & Info */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-2xl font-bold font-display text-white">
              {activeSkill.name}
            </h3>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {activeSkill.reactionDescription}
            </p>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs text-cyan-300 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Used in Arvind's production applications</span>
            </div>
          </div>

          {/* Animated Code snippet reaction view */}
          <div className="lg:col-span-7 rounded-2xl bg-[#030308] border border-white/10 p-5 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-3 mb-3 border-b border-white/5">
              <span>REAL PRODUCTION CODE</span>
              <span className="text-cyan-400">UTF-8</span>
            </div>
            <pre className="text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
              {activeSkill.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
