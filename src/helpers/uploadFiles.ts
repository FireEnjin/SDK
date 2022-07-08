import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import getExtension from "./getExtension";

export default async function uploadFiles(
  app: any,
  files: File[],
  options?: {
    path?: string;
  }
): Promise<{ success?: boolean; name?: string; url?: string; error?: any }[]> {
  const results: {
    success?: boolean;
    name?: string;
    url?: string;
    error?: any;
  }[] = [];
  const storage = getStorage(app);
  for (const file of files) {
    try {
      const storageRef = ref(
        storage,
        `/${
          options?.path || ""
        }${new Date().toISOString()}.${await getExtension(file?.name)}`
      );
      const upload = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(upload.ref);
      results.push({
        success: true,
        name: file?.name,
        url,
      });
    } catch (error) {
      results.push({ success: false, error });
    }
  }

  return results;
}
