import { getPhotos } from "@/lib/r2";
import Gallery from "@/app/components/Gallery";

export const revalidate = 3600;

export default async function Home() {
  const photos = await getPhotos();
  return <Gallery photos={photos} />;
}
