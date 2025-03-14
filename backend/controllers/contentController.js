import Link from "../models/Link.js";
import generateContent from "../services/aiService.js";

export const generatePost = async (req, res) => {
    try {
        const { type, linkId } = req.params;
        const link = await Link.findById(linkId);

        if (!link) {
            return res.status(404).json({ success: false, message: "Link not found" });
        }

        const content = await generateContent(type, link);
        res.json({ success: true, data: content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
