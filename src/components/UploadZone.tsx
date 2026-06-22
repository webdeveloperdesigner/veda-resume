import { useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { Upload, AlertCircle } from 'lucide-react';
import { extractTextFromPDF } from '../lib/pdfExtract';

interface UploadZoneProps {
  onProcessText: (text: string, targetRole?: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

export function UploadZone({ onProcessText }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'pdf' | 'text'>('pdf');
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [targetRole, setTargetRole] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    
    setError(null);
    setIsProcessingFile(true);
    
    try {
      const text = await extractTextFromPDF(file);
      onProcessText(text, targetRole);
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message === 'PDF_NO_TEXT') {
        setError('Could not extract text. Make sure the PDF is not an image/scan.');
      } else {
        setError('Failed to read PDF. Please try pasting text instead.');
      }
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleSubmitText = () => {
    if (textInput.length < 100) {
      setError('Text is too short. Please provide at least 100 characters.');
      return;
    }
    setError(null);
    onProcessText(textInput, targetRole);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <motion.div variants={itemVariants} className="flex justify-center mb-6 space-x-2">
        <button
          onClick={() => setMode('pdf')}
          className={`px-6 py-2 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
            mode === 'pdf' ? 'bg-white/10 text-white backdrop-blur-sm border border-white/10 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Upload PDF
        </button>
        <button
          onClick={() => setMode('text')}
          className={`px-6 py-2 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
            mode === 'text' ? 'bg-white/10 text-white backdrop-blur-sm border border-white/10 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Paste Text
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Target Role (Optional)</label>
            <input 
              type="text" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-gray-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
            />
          </div>

          {mode === 'pdf' ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.02]'
                  : 'border-gray-500/30 hover:border-gray-400 hover:bg-white/5'
              }`}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-gray-500/30 flex items-center justify-center bg-white/5">
                <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-emerald-400' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload your Resume</h3>
              <p className="text-gray-400 mb-6 max-w-sm mx-auto text-sm">Drag & drop your PDF resume here, or click to browse. Max size 5MB.</p>
              
              <label className="cursor-pointer inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-[0.98] font-medium text-sm text-white border border-white/5 backdrop-blur-md">
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  disabled={isProcessingFile}
                />
                {isProcessingFile ? 'Reading PDF...' : 'Browse Files'}
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none shadow-inner"
                placeholder="Paste your resume text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">
                  {textInput.length} characters
                </span>
                <button
                  onClick={handleSubmitText}
                  className="px-8 py-3 rounded-full font-bold text-white shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all score-gradient relative overflow-hidden group"
                >
                  <span className="relative z-10">Analyze Resume</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </button>
              </div>
            </div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
