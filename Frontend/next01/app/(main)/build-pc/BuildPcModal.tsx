"use client";

import { X, Plus, Search } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
};

export default function BuildPcModal({
  open,
  title,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex h-[90vh] w-[95vw] flex-col overflow-hidden rounded-xl bg-white">

        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-3xl font-bold">Chọn {title}</h2>

          <button
            onClick={onClose}
            className="rounded p-2 hover:bg-gray-100"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex items-center gap-4 border-b p-5">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Tìm theo tên, SKU..."
              className="w-full rounded-lg border py-3 pl-10 outline-none"
            />
          </div>

          <select className="rounded-lg border px-4 py-3">
            <option>Sản phẩm mới</option>
          </select>
        </div>

        <div className="flex flex-1 overflow-hidden">

          <div className="w-72 overflow-y-auto border-r p-5">
            <h3 className="mb-4 font-bold">Hãng sản xuất</h3>

            {["Samsung", "Kingston", "Gigabyte", "Colorful"].map((item) => (
              <label
                key={item}
                className="mb-3 flex cursor-pointer items-center gap-3"
              >
                <input type="checkbox" />
                {item}
              </label>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-5">

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="mb-4 flex rounded-xl border bg-white p-5"
              >
                <img
                  src="https://placehold.co/150x150"
                  className="h-36 w-36 rounded object-cover"
                />

                <div className="ml-5 flex flex-1 flex-col">
                  <h2 className="text-xl font-bold">
                    SSD Samsung 990 Pro 2TB NVMe PCIe 4.0
                  </h2>

                  <p className="mt-2 text-gray-500">
                    SKU: SSD001
                  </p>

                  <p className="mt-2 text-green-600">
                    Còn hàng
                  </p>

                  <p className="mt-auto text-3xl font-bold text-red-600">
                    5.990.000đ
                  </p>
                </div>

                <button className="my-auto rounded-full bg-red-600 p-4 text-white hover:bg-red-700">
                  <Plus />
                </button>
              </div>
            ))}

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-red-600 px-8 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}