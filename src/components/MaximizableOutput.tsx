import React, { useState } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';

interface MaximizableOutputProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  actionButtons?: React.ReactNode;
}

export const MaximizableOutput: React.FC<MaximizableOutputProps> = ({
  children,
  title = "Output",
  className = "",
  actionButtons,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (isMaximized) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center gap-2">
            {actionButtons}
            <button
              onClick={toggleMaximize}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title="Minimize"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMaximize}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Action Buttons and Maximize Button */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        {actionButtons}
        <button
          onClick={toggleMaximize}
          className="p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
          title="Maximize"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}; 