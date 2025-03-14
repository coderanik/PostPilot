import { load } from "cheerio";
import axios from "axios";

const scrapeHeading = async (url) => {
    try {
        const { data } = await axios.get(url, { timeout: 10000 }); // Set timeout to avoid hanging requests
        const $ = load(data);
        const title = $("title").text().trim() || "No title found";

        return { title };
    } catch (error) {
        console.error("❌ Error fetching page:", error.message);
        return { error: "Failed to fetch page data" };
    }
};

export default scrapeHeading;
