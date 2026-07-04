import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
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
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'pdf' | 'text'>('pdf');
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedPdfText, setExtractedPdfText] = useState<string | null>(null);

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
      setError(t('upload.errors.invalid_pdf'));
      return;
    }
    
    setError(null);
    setIsProcessingFile(true);
    
    try {
      const text = await extractTextFromPDF(file);
      setSelectedFile(file);
      setExtractedPdfText(text);
    } catch (err: unknown) {
      const error = err as Error;
      if (error.message === 'PDF_NO_TEXT') {
        setError(t('upload.errors.no_text'));
      } else {
        setError(t('upload.errors.read_failed'));
      }
      setSelectedFile(null);
      setExtractedPdfText(null);
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

  const handleSubmit = () => {
    if (mode === 'pdf') {
      if (!extractedPdfText) {
        setError(t('upload.errors.upload_first'));
        return;
      }
      setError(null);
      onProcessText(extractedPdfText, targetRole);
    } else {
      if (textInput.length < 100) {
        setError(t('upload.errors.too_short'));
        return;
      }
      setError(null);
      onProcessText(textInput, targetRole);
    }
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
            mode === 'pdf' ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm border border-gray-300 dark:border-white/10 shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          {t('upload.tabs.pdf')}
        </button>
        <button
          onClick={() => setMode('text')}
          className={`px-6 py-2 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
            mode === 'text' ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm border border-gray-300 dark:border-white/10 shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          {t('upload.tabs.text')}
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col items-center">
        <div className="w-full bg-white dark:bg-[#121212] backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-8">
          {/* Subtle background glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('upload.role_label')}</label>
              <input 
                type="text" 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder={t('upload.role_placeholder')}
                className="w-full bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
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
                    : 'border-gray-500/30 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {selectedFile && extractedPdfText ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 border-2 border-gray-400 rounded-lg flex flex-col justify-start items-start p-2 mb-4">
                      <div className="w-6 h-1 bg-gray-400 mb-1 rounded"></div>
                      <div className="w-4 h-1 bg-gray-400 mb-1 rounded"></div>
                      <div className="w-8 h-1 bg-gray-400 rounded"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedFile.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{t('upload.dropzone.characters_extracted', { count: extractedPdfText.length.toLocaleString() })}</p>
                    <label className="cursor-pointer text-emerald-500 hover:text-emerald-400 font-medium text-sm transition-colors">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                        disabled={isProcessingFile}
                      />
                      {t('upload.dropzone.replace')}
                    </label>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                        <path d="M12 12v9"></path>
                        <path d="m8 16 4-4 4 4"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('upload.dropzone.title')}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-medium">{t('upload.dropzone.subtitle')}</p>
                    
                    <label className="cursor-pointer absolute inset-0 w-full h-full opacity-0">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf" 
                        onChange={handleFileChange} 
                        disabled={isProcessingFile}
                      />
                    </label>
                    {isProcessingFile && <p className="text-emerald-500 font-medium mt-4">{t('upload.dropzone.reading')}</p>}
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  className="w-full h-64 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none shadow-inner"
                  placeholder={t('upload.text_paste.placeholder')}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">
                    {t('upload.text_paste.characters', { count: textInput.length.toLocaleString() })}
                  </span>
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
        </div>

        <button
          onClick={handleSubmit}
          className="px-12 py-4 rounded-full font-bold text-white shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all score-gradient relative overflow-hidden group text-lg tracking-wide uppercase"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            <span>{t('upload.submit')}</span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </button>
      </motion.div>
    </motion.div>
  );
}
