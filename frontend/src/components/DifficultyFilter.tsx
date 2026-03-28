import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

const GRADES = [
  'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8',
  'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17',
];

export default function DifficultyFilter() {
  const { filterOpen, setFilterOpen, minGrade, maxGrade, setGradeRange } = useAppStore();
  const [localMin, setLocalMin] = useState(minGrade);
  const [localMax, setLocalMax] = useState(maxGrade);

  useEffect(() => {
    setLocalMin(minGrade);
    setLocalMax(maxGrade);
  }, [minGrade, maxGrade, filterOpen]);

  if (!filterOpen) return null;

  const handleApply = () => {
    setGradeRange(localMin, localMax);
    setFilterOpen(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setFilterOpen(false)}>
      <div
        className="absolute top-0 right-0 w-80 max-w-full h-full bg-dark-card shadow-2xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Difficulty Range</h2>
          <button onClick={() => setFilterOpen(false)} className="p-1 hover:bg-white/10 rounded">
            ✕
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-white/60 mb-2">
            Min Grade: <span className="text-white font-semibold">{GRADES[localMin]}</span>
          </label>
          <input
            type="range"
            min={0}
            max={17}
            value={localMin}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setLocalMin(Math.min(val, localMax));
            }}
            className="w-full accent-brand"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm text-white/60 mb-2">
            Max Grade: <span className="text-white font-semibold">{GRADES[localMax]}</span>
          </label>
          <input
            type="range"
            min={0}
            max={17}
            value={localMax}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setLocalMax(Math.max(val, localMin));
            }}
            className="w-full accent-brand"
          />
        </div>

        {/* Grade chip display */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {GRADES.map((grade, i) => (
            <span
              key={grade}
              className={`text-xs px-2 py-1 rounded-full ${
                i >= localMin && i <= localMax
                  ? 'bg-brand text-white'
                  : 'bg-white/5 text-white/30'
              }`}
            >
              {grade}
            </span>
          ))}
        </div>

        <button
          onClick={handleApply}
          className="w-full py-3 bg-brand hover:bg-brand-dark rounded-xl font-semibold transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
