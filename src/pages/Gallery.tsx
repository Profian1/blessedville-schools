import GallerySection from "../components/Gallery";
import Seo from "../lib/Seo";

export default function Gallery() {
  return (
    <>
      <Seo
        title="Gallery | Blessedville Schools"
        description="Browse photos from Blessedville Schools in Kahawa West — learning, play, sports, events, and everyday moments from daycare through to lower primary."
        path="/gallery"
      />
      <GallerySection />
    </>
  );
}