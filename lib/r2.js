import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { unstable_cache } from "next/cache";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

async function fetchPhotos() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
  });
  const response = await r2Client.send(command);
  const objects = response.Contents || [];

  return objects
    .filter((obj) =>
      IMAGE_EXTENSIONS.some((ext) => obj.Key.toLowerCase().endsWith(ext)),
    )
    .map((obj) => ({
      key: obj.Key,
      url: `${process.env.R2_PUBLIC_URL}/${obj.Key}`,
    }));
}

export const getPhotos = unstable_cache(fetchPhotos, ["r2-photos"], {
  revalidate: 3600,
});

export const listPhotosFresh = fetchPhotos;

export async function getUploadUrl(filename, contentType) {
  const key = `${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 });
  return { uploadUrl, key };
}

export async function deletePhoto(key) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });
  await r2Client.send(command);
}
