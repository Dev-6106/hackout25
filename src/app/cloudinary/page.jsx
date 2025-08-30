import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config(
    {
        cloud_name: "drzxqzgmv",
        api_key: "946623466751161",
        api_secret: "0jx5cvNnxiKTj2gBTYqM2DvbA_0"
    }
);


const uploadToCloudinary = async (localFilePath)=>
{
    try{
        
        console.log("Uploading file to Cloudinary:", localFilePath);

        if(!localFilePath) return null;

        //upload file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,
        {
            resource_type: "auto"
        });

        //file has been uploaded successfully
        //console.log("File uploaded to Cloudinary successfully:", response.url);
        fs.unlinkSync(localFilePath); //remove the locally saved file
        console.log("Cloudinary done",response.url)
        return response.url;
    }catch(error){
        //remove the locally saved file as upload file operation got failed
        fs.unlinkSync(localFilePath);
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
}


export default uploadToCloudinary;