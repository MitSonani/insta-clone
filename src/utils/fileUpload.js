const cloudinary = require('cloudinary').v2;
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const uploadOnCloudnary = async (localFilePath) => {

    try {
        if (!localFilePath) return null
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'

        })
        // file has been uploaded sucessfully
        fs.unlinkSync(localFilePath)  //remove locally saved temporary file if opration got failed
        return response
    } catch (error) {

        //remove locally saved temporary file if opration got failed
        fs.unlinkSync(localFilePath)
        return null
    }

}


const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId) {
        throw new Error('Public ID is required to delete the image');
    }

    try {
        const response = await cloudinary.uploader.destroy(publicId);
        if (response.result === 'ok') {
            return true;
        } else {
            console.error('Image deletion failed:', response);
            return false;
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return false;
    }
};

module.exports = { uploadOnCloudnary, deleteImageFromCloudinary }