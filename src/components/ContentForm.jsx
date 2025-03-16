import React from 'react';

const ContentForm = ({
  url,
  setUrl,
  companyName,
  setCompanyName,
  productName,
  setProductName,
  idealUser,
  setIdealUser,
  email,
  setEmail,
  handleSubmit,
  isLoading,
  generatedContent 
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Website Link</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-50"
          placeholder="Enter the link and we will do the rest of the work for you"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="text-center my-4">
        <span className="text-gray-500">OR</span>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-50"
          placeholder="Acme"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Product Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-50"
          placeholder=""
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Ideal User</label>
        <input
          type="text"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-50"
          placeholder="Experienced blacksmiths"
          value={idealUser}
          onChange={(e) => setIdealUser(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg bg-gray-50"
          placeholder="joe@doe.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-200"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            Generate Content
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </button>


      <div className="mt-6 md:hidden">
        <button
          type="button"
          onClick={() => {/* Your download logic here */}}
          disabled={!generatedContent}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-200"
        >
          Download
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ContentForm;
