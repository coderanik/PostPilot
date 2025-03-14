import Link from "../models/Link.js";
import scrapeHeading from "../services/scraperService.js";

export const addData = async (req,res) =>{
    try{
        const { url } = req.body;
        const title =  await scrapeHeading(url);

        const link = new Link({url,title});
        await link.save();

        res.status(200).json({success:true,data:link});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};

export const getLink = async (req,res) => {
    const links = await Link.find();
    res.json({success:true ,data:links});
}

