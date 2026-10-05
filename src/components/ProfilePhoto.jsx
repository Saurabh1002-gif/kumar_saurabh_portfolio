import { useState } from "react";

// Put your photo at public/assets/profile.jpg (or .png / .webp: change the src below).
// Until then the placeholder /assets/profile.svg is shown.
export default function ProfilePhoto({ className = "", size }) {
  const [src, setSrc] = useState("/assets/profile.jpg");
  return (
    <img
      className={"photo " + className}
      src={src}
      onError={() => setSrc("/assets/profile.svg")}
      alt="Portrait of Saurabh Kumar"
      width={size}
      height={size}
      loading="eager"
    />
  );
}
