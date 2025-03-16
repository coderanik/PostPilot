import React, { useState } from 'react';
import Header from './components/Header';
import ContentForm from './components/ContentForm';
import { scrapeWebsite } from './services/scrapeService';
import { generateContent } from './services/geminiService';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [idealUser, setIdealUser] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [extractedTitle, setExtractedTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setExtractedTitle('');
    
    try {
      console.log("Form submission started with values:", { url, companyName, productName, idealUser, email });
      
      let title = '';
      if (url) {
        console.log("Attempting to scrape website:", url);
        try {
          title = await scrapeWebsite(url);
          console.log("EXTRACTED TITLE:", title);
          setExtractedTitle(title);
        } catch (scrapeError) {
          console.error("Scraping failed but continuing with generation:", scrapeError);
          title = "Could not extract title";
          setExtractedTitle("Could not extract title (error)");
        }
      } else {
        console.log("No URL provided, skipping scraping");
        setExtractedTitle("No URL provided");
      }
      
      console.log("Starting content generation with title:", title);
      
      // Generate content using the data we have
      const content = await generateContent({
        title,
        companyName,
        productName,
        idealUser,
        email
      });
      
      console.log("Generation complete, content:", content);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setErrorMessage(`Error: ${error.message}`);
      alert(`Error generating content: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'postpilot-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8 bg-slate-50">
          <Header />
          <ContentForm 
            url={url}
            setUrl={setUrl}
            companyName={companyName}
            setCompanyName={setCompanyName}
            productName={productName}
            setProductName={setProductName}
            idealUser={idealUser}
            setIdealUser={setIdealUser}
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {extractedTitle && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded border border-blue-100">
              <strong>Extracted Title:</strong> {extractedTitle}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded border border-red-100">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 bg-gradient-to-b from-indigo-800 to-indigo-950 rounded-r-lg p-8 text-white relative">
          <div className="flex items-center mb-6">
            <div className="w-2 h-8 bg-indigo-400 rounded mr-3"></div>
            <h2 className="text-2xl font-bold">Generated Content</h2>
          </div>
          
          {/* Content preview area with styled scrollbar */}
          <div className="content-preview-container relative rounded-lg bg-opacity-20 bg-black backdrop-filter backdrop-blur-sm border border-indigo-700 p-6 mb-4 h-96 overflow-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-400 mb-4"></div>
                <p className="text-indigo-300 font-medium">Generating brilliant content...</p>
              </div>
            ) : generatedContent ? (
              <div className="prose prose-invert">
                <pre className="whitespace-pre-wrap text-gray-100 font-sans leading-relaxed">{generatedContent}</pre>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-500 bg-opacity-30 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-gray-300 mb-2">Your AI-generated content will appear here</p>
                <p className="text-gray-400 text-sm">Fill out the form and click "Generate" to begin</p>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end">
            {generatedContent && (
              <button
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Download Content</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Add style for custom scrollbar */}
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(99, 102, 241, 0.5);
              border-radius: 4px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(99, 102, 241, 0.7);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default App;