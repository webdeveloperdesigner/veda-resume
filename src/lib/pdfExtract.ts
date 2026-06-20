import * as pdfjsLib from 'pdfjs-dist';

// Required for Vite to properly bundle the pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: unknown) => (item as { str: string }).str).join(' ');
      fullText += pageText + '\n';
    }

    const cleanText = fullText.trim();
    if (cleanText.length < 50) {
      throw new Error('PDF_NO_TEXT');
    }
    
    return cleanText;
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw error;
  }
}
