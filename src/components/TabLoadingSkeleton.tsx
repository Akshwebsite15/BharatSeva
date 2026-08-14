import React from 'react';

export const TabLoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-pulse p-4">
      {/* Top Banner Skeleton */}
      <div className="h-28 bg-slate-200/80 rounded-3xl w-full"></div>

      {/* Filter / Search bar skeleton */}
      <div className="flex gap-3">
        <div className="h-12 bg-slate-200/80 rounded-2xl flex-1"></div>
        <div className="h-12 bg-slate-200/80 rounded-2xl w-32 hidden sm:block"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-6 bg-slate-200 rounded-lg w-24"></div>
              <div className="h-6 bg-slate-100 rounded-full w-16"></div>
            </div>
            <div className="h-5 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <div className="h-4 bg-slate-100 rounded w-20"></div>
              <div className="h-8 bg-slate-200 rounded-xl w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
