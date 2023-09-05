import Axios from "axios";
import axios from "../axios";
import { toast } from "react-toastify";

const cloudinaryUpload = async (image, folderName) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUNDINARY_UPLOAD_PRESET
  );
  formData.append("cloud_name", process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME);
  formData.append("folder", folderName);
  const req_url =
    "https://api.cloudinary.com/v1_1/" +
    process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME +
    "/image/upload";
  try {
    const res = await Axios.post(req_url, formData);
    console.log("IMAGE RESULT: ", res);
    return {
      asset_id: res.data.asset_id,
      created_at: res.data.created_at,
      original_filename: res.data.original_filename,
      public_id: res.data.public_id,
      secure_url: res.data.secure_url,
      signature: res.data.signature,
      image_url: res.data.url,
    };
  } catch (e) {
    toast.error(
      `Image file ${image.name} failed to upload. Please contact support team for help.`,
      {
        toastId: `image_upload_error_${image.name}`,
      }
    );
  }
};

export async function uploadImages(imageFiles, folder) {
  var images = [];
  for (const image of imageFiles) {
    // making post request to cloudinary
    const imageInfo = await cloudinaryUpload(image, folder);
    if (imageInfo) {
      images.push(imageInfo);
    }
  }
  return images;
}

export function deleteCloudinaryImages(images) {
  console.log("in delete cloudinary images");
  try {
    axios.post("/api/dogs/delete-cloudinary-images", {
      images,
    });
  } catch (e) {
    // log error
  }
}
