'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Minimize, Camera, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function BarcodeScanner({ onScan }: { onScan: (code: string) => void }) {
  const [active, setActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScanner = () => {
    setActive(true);
    setScanning(true);
    // Mocking the scanner behavior for demonstration
    setTimeout(() => {
      const mockCodes = ['PRD-001', 'BATCH-99', 'EMP-102'];
      const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
      onScan(randomCode);
      setScanning(false);
      toast.success(`Scanned: ${randomCode}`);
    }, 2000);
  };

  return (
    <div>
      <button 
        onClick={startScanner}
        className="flex items-center gap-2 px-4 py-2 bg-surface-3 hover:bg-surface-2 rounded-xl transition-all border border-border group"
      >
        <Camera className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
        <span className="text-sm font-bold text-text-secondary">Scan Item</span>
      </button>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-syne font-bold text-text-primary">Barcode Scanner</h3>
                <button onClick={() => setActive(false)} className="p-1 hover:bg-surface-2 rounded-lg transition-colors"><X size={20} /></button>
              </div>
              
              <div className="aspect-square bg-black relative">
                {scanning && (
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#16a34a] z-10"
                  />
                )}
                <div className="absolute inset-8 border-2 border-white/20 rounded-2xl border-dashed flex items-center justify-center">
                  <div className="text-white/40 text-center px-6">
                    <p className="text-xs font-bold uppercase tracking-widest">Position Barcode</p>
                    <p className="text-[10px] mt-2">Alignment ensures 99.9% accuracy</p>
                  </div>
                </div>
              </div>

              <div className="p-6 text-center">
                <p className="text-xs font-medium text-text-muted mb-4">Initializing high-speed optical recognition...</p>
                {!scanning && (
                  <button 
                    onClick={() => setActive(false)}
                    className="w-full h-11 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
