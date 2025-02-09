import { IKImage } from "imagekitio-react";

function Image({ path, className, alt, h, w }) {
  if (!path && !import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT) {
    console.error("Image path or URL endpoint is missing.");
    return null;
  }

  // Default path to a fallback image if path is falsy
  const imagePath = path || "./logo.png";

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={imagePath}
      className={className || ""}
      height={h}
      width={w}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      transformation={[{ height: h, width: w }]}
    />
  );
}

export default Image;
