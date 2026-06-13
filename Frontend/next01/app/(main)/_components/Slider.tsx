"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "https://computerarenakh.com/image/cache/catalog/001-DESIGNING%202025/001-BANNER%20SMALL%202025/ROG-ASTRAL-RTX-5080-16GB-GDDR7-WHITE-OC-EDITION-best-price-cac-cambodia-567x200.jpg",
  "https://file.hstatic.net/200000921511/file/bpstore-vga-msi-geforce-rtx-5090-32g-ventus-3x-oc__3_.jpg",
  "https://storage-asset.msi.com/global/picture/news/2025/vga/rtx5090-20250106-1.jpg",
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-125 overflow-hidden rounded">
      <Image
        src={images[index]}
        alt="banner"
        fill
        className="object-cover transition-all duration-500 group-hover:translate-x-4 group-hover:scale-105"
      />

      <button
        onClick={() =>
          setIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
      >
        ‹
      </button>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
      >
        ›
      </button>
    </div>
  );
}
