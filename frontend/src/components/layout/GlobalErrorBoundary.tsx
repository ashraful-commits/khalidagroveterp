'use client';

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-2 p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-border text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-syne font-bold text-text-primary mb-2">Something went wrong</h1>
            <p className="text-text-secondary text-sm mb-8 leading-relaxed">
              We&apos;ve encountered an unexpected error. Don&apos;t worry, your data is safe. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full h-12 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
            >
              <RotateCcw size={18} /> Refresh System
            </button>
            <p className="mt-4 text-[10px] text-text-muted font-mono uppercase">
              Error: {this.state.error?.message}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
