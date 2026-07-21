"use client";

import { ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import BuildPcModal from "./BuildPcModal";

const components = [
  {
    id: 1,
    key: "cpu",
    title: "BỘ VI XỬ LÝ - CPU",
    description: "Lựa chọn CPU phù hợp với nhu cầu của bạn",
  },
  {
    id: 2,
    key: "mainboard",
    title: "BO MẠCH CHỦ - MAINBOARD",
    description: "Chọn mainboard tương thích với CPU",
  },
  {
    id: 3,
    key: "ram",
    title: "BỘ NHỚ TRONG - RAM",
    description: "Lựa chọn RAM phù hợp với hệ thống",
  },
  {
    id: 4,
    key: "ssd",
    title: "Ổ CỨNG SSD",
    description: "Lựa chọn SSD tốc độ cao",
  },
  {
    id: 5,
    key: "hdd",
    title: "Ổ CỨNG HDD",
    description: "Lựa chọn HDD lưu trữ",
  },
  {
    id: 6,
    key: "gpu",
    title: "CARD MÀN HÌNH - VGA",
    description: "Lựa chọn card đồ họa",
  },
  {
    id: 7,
    key: "psu",
    title: "NGUỒN - PSU",
    description: "Lựa chọn nguồn phù hợp",
  },
  {
    id: 8,
    key: "case",
    title: "CASE MÁY TÍNH",
    description: "Lựa chọn vỏ máy",
  },
  {
    id: 9,
    key: "cooler",
    title: "TẢN NHIỆT CPU",
    description: "Lựa chọn tản nhiệt",
  },
  {
    id: 10,
    key: "monitor",
    title: "MÀN HÌNH",
    description: "Lựa chọn màn hình",
  },
];

const emptyConfig = {
  cpu: null,
  mainboard: null,
  ram: null,
  ssd: null,
  hdd: null,
  gpu: null,
  psu: null,
  case: null,
  cooler: null,
  monitor: null,
};

export default function BuildPcPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [configs, setConfigs] = useState([
    { ...emptyConfig },
    { ...emptyConfig },
    { ...emptyConfig },
    { ...emptyConfig },
    { ...emptyConfig },
  ]);

  const current = configs[activeTab];

  const selectedCount = Object.values(current).filter(Boolean).length;

  const resetCurrent = () => {
    const newConfigs = [...configs];
    newConfigs[activeTab] = { ...emptyConfig };
    setConfigs(newConfigs);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl py-8">
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="flex border-b">
            {configs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`cursor-pointer border-r px-8 py-4 font-semibold transition ${
                  activeTab === index
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Cấu hình {index + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between p-6">
            <div>
              <p className="font-medium">
                Tiến trình:
                <span className="text-red-600">
                  {" "}
                  {selectedCount} / {components.length}
                </span>
              </p>

              <p className="mt-1 text-gray-500">
                Đã chọn {selectedCount} trên {components.length} linh kiện
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-500">Chi phí dự tính</p>
              <h2 className="text-3xl font-bold text-red-600">0đ</h2>
            </div>

            <button
              onClick={resetCurrent}
              className="flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-3 hover:bg-gray-100"
            >
              <RotateCcw size={18} />
              Làm mới
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {components.map((item) => {
            const selected = current[item.key as keyof typeof emptyConfig];

            return (
              <div
                key={item.id}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                      {item.id}
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">{item.title}</h2>

                      <p className="mt-1 text-gray-500">{item.description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`rounded-full px-4 py-2 text-sm ${
                        selected
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {selected ? "Đã chọn" : "Chưa chọn"}
                    </span>

                    <button
                      onClick={() => {
                        setModalTitle(item.title);
                        setOpenModal(true);
                      }}
                      className="mt-4 flex cursor-pointer items-center gap-2 font-bold text-red-600 hover:text-red-700"
                    >
                      CHỌN
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b p-8">
            <p className="mb-4 text-center text-gray-500">
              Chiết khấu / Bù trừ thêm (VNĐ)
            </p>

            <div className="mx-auto max-w-md">
              <div className="flex overflow-hidden rounded-lg border">
                <button className="flex-1 bg-white py-3 font-semibold cursor-pointer">
                  Trừ tiền
                </button>

                <button className="flex-1 bg-gray-100 py-3 text-gray-500 cursor-pointer">
                  Cộng tiền
                </button>
              </div>

              <input
                type="number"
                defaultValue={0}
                className="mt-3 w-full rounded-lg border py-3 text-center outline-none"
              />

              <div className="mt-5 text-center">
                <p className="text-gray-500">Chi phí dự tính</p>

                <p className="text-3xl font-bold text-red-600">0đ</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div className="flex gap-4">
              <button
                onClick={resetCurrent}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
              >
                <RotateCcw size={18} />
                LÀM MỚI
              </button>

              <button className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-100 cursor-pointer">
                LƯU CẤU HÌNH
              </button>

              <button className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-100 cursor-pointer">
                TẢI EXCEL
              </button>

              <button className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-100 cursor-pointer">
                XEM & IN
              </button>
            </div>

            <button className="rounded-lg bg-red-600 px-8 py-3 font-bold text-white transition hover:bg-red-700 cursor-pointer">
              THÊM VÀO GIỎ
            </button>
          </div>
        </div>
      </div>
      <BuildPcModal
        open={openModal}
        title={modalTitle}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
