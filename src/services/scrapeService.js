export async function scrapeWebsite(url) {
    try {
      console.log("Starting to scrape website:", url);
      const response = await fetch(`http://localhost:4000/scrape?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        console.error("Scraping failed with status:", response.status);
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      console.log("Received response from scrape endpoint");
      const data = await response.json();
      console.log("Parsed JSON data:", data);
      
      
      let title = "No title found";
      
      if (data.html) {
        console.log("HTML content received, attempting to extract title");
       
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data.html;
        
        
        const titleTag = tempDiv.querySelector('title');
        if (titleTag && titleTag.textContent) {
          title = titleTag.textContent.trim();
          console.log("Successfully extracted title from HTML:", title);
        } else {
         
          const h1Tag = tempDiv.querySelector('h1');
          if (h1Tag && h1Tag.textContent) {
            title = h1Tag.textContent.trim();
            console.log("Extracted title from h1 tag:", title);
          } else {
            console.log("Could not find title or h1 tag in HTML");
          }
        }
      } else {
        console.log("No HTML content received from scrape endpoint");
      }
      
      console.log("Final extracted title:", title);
      return title;
    } catch (error) {
      console.error("Error in scrapeWebsite function:", error);
      console.error("Error details:", error.message);
      throw new Error("Scraping failed: " + error.message);
    }
  }