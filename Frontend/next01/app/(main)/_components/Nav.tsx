"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const categories = [
    { name: "CPU", href: "/category/cpu" },
    { name: "Mainboard", href: "/category/mainboard" },
    { name: "GPU", href: "/category/gpu" },
    { name: "Ram", href: "/category/ram" },
    { name: "SSD-HDD", href: "/category/ssd-hdd" },
    { name: "PSU", href: "/category/psu" },
    { name: "Case", href: "/category/case" },
    { name: "Cooling", href: "/category/cooling" },
    { name: "Other", href: "/category/other" },
    { name: "Monitor", href: "/category/monitor" },
  ];
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="bg-red-600 flex gap-1 text-white px-4 py-2 rounded cursor-pointer">
        <Menu />
        <span>Danh mục sản phẩm</span>
      </div>

      {open && (
        <div className="absolute left-0 top-full bg-white shadow-lg w-72 z-50">
          <ul className="text-sm">
            {categories.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block p-2 hover:bg-gray-100 ${
                    pathname === item.href ? "text-red-600 font-medium" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
