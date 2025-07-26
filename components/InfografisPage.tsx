"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Chart from "chart.js/auto"

interface ChartData {
  labels: string[]
  datasets: any[]
}

interface ChartConfig {
  type: any // Type diubah menjadi 'any' agar lebih fleksibel
  data: ChartData
  options: any
}

export default function InfografisPage() {
  const [activeTab, setActiveTab] = useState("kependudukan")

  // Menggunakan useRef untuk menyimpan instance chart agar tidak memicu re-render
  const chartRefs = useRef<{ [key: string]: Chart | null }>({}).current

  // Chart canvas refs
  const pendidikanChartRef = useRef<HTMLCanvasElement>(null)
  const peternakanChartRef = useRef<HTMLCanvasElement>(null)
  const perkebunanChartRef = useRef<HTMLCanvasElement>(null)
  const tanamanPanganChartRef = useRef<HTMLCanvasElement>(null)
  const pendapatanDetailChartRef = useRef<HTMLCanvasElement>(null)
  const belanjaDetailChartRef = useRef<HTMLCanvasElement>(null)

  // Animated number hook
  const useAnimatedNumber = (targetValue: number, format?: string) => {
    const [currentValue, setCurrentValue] = useState(0)

    useEffect(() => {
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = progress * targetValue

        setCurrentValue(current)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }, [targetValue])

    if (format === "currency") {
      return "Rp" + Math.floor(currentValue).toLocaleString("id-ID")
    }
    return Math.floor(currentValue).toLocaleString("id-ID")
  }

  const formatAsShortCurrency = (value: number) => {
    if (value >= 1.0e9) return "Rp " + (value / 1.0e9).toFixed(2) + " M"
    if (value >= 1.0e6) return "Rp " + (value / 1.0e6).toFixed(1) + " Jt"
    if (value >= 1.0e3) return "Rp " + (value / 1.0e3).toFixed(1) + " Rb"
    return "Rp " + value
  }
  
  // Perubahan Utama ada di dalam useEffect ini
  useEffect(() => {
    const chartMapping: { [key: string]: { ref: React.RefObject<HTMLCanvasElement>; config: ChartConfig } } = {
        pendidikan: {
            ref: pendidikanChartRef,
            config: {
                type: "bar",
                data: {
                    labels: [
                        "Tidak/Belum Sekolah", "Belum Tamat SD/Sederajat", "Tamat SD/Sederajat", "SLTP/Sederajat",
                        "SLTA/Sederajat", "Diploma I/II", "Diploma III/Sarjana Muda", "Diploma IV/Strata I",
                        "Strata II", "Strata III",
                    ],
                    datasets: [{
                        label: "Jumlah Penduduk",
                        data: [173, 201, 285, 140, 286, 22, 13, 26, 2, 0],
                        backgroundColor: "#ff6b35",
                        borderRadius: 5,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                },
            }
        },
        peternakan: {
            ref: peternakanChartRef,
            config: {
              type: "bar",
              data: {
                labels: ["2018", "2019", "2020", "2021", "2022"],
                datasets: [
                  { label: "Sapi", data: [1235, 1236, 1240, 1240, 1240], backgroundColor: "#4caf50" },
                  { label: "Kambing", data: [153, 155, 160, 160, 160], backgroundColor: "#8dd18d" },
                  { label: "Ayam", data: [1720, 1700, 1750, 1750, 1750], backgroundColor: "#bce5bc" },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
                scales: { y: { beginAtZero: true } },
              },
            }
        },
        perkebunan: {
            ref: perkebunanChartRef,
            config: {
              type: "bar",
              data: {
                labels: ["2018", "2019", "2020", "2021", "2022"],
                datasets: [
                  { label: "Kelapa", data: [2, 2, 2, 2, 2], backgroundColor: "#4caf50" },
                  { label: "Karet", data: [0, 0, 0, 0, 0], backgroundColor: "#8dd18d" },
                  { label: "Kopi", data: [0, 0, 0, 0, 0], backgroundColor: "#bce5bc" },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
                scales: { y: { beginAtZero: true } },
              },
            }
        },
        tanamanPangan: {
            ref: tanamanPanganChartRef,
            config: {
              type: "line",
              data: {
                labels: ["2018", "2019", "2020", "2021", "2022"],
                datasets: [
                  { label: "Padi", data: [118, 120, 120, 120, 120], borderColor: "#ff6b35", tension: 0.1 },
                  { label: "Jagung", data: [93, 96, 96, 96, 96], borderColor: "#4caf50", tension: 0.1 },
                  { label: "Kacang Tanah", data: [5, 5, 5, 5, 5], borderColor: "#2e7d32", tension: 0.1 },
                  { label: "Tomat", data: [13, 15, 15, 15, 15], borderColor: "#8dd18d", tension: 0.1 },
                  { label: "Cabe", data: [24, 25, 25, 25, 25], borderColor: "#bce5bc", tension: 0.1 },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
                scales: { y: { beginAtZero: true } },
              },
            }
        },
        pendapatanDetail: {
            ref: pendapatanDetailChartRef,
            config: {
              type: "bar",
              data: {
                labels: ["Pendapatan Asli Desa", "Pendapatan Transfer", "Pendapatan Lain-lain"],
                datasets: [{
                  label: "Anggaran (Rp)",
                  data: [325310200, 2089649500, 0],
                  backgroundColor: ["#2e7d32", "#4caf50", "#8dd18d"],
                  borderRadius: 5,
                }],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { callback: (value: any) => formatAsShortCurrency(value) } } },
              },
            }
        },
        belanjaDetail: {
            ref: belanjaDetailChartRef,
            config: {
              type: "bar",
              data: {
                labels: [
                  "Penyelenggaraan Pemerintahan Desa", "Pelaksanaan Pembangunan Desa", "Pembinaan Kemasyarakatan",
                  "Pemberdayaan Masyarakat Desa", "Penanggulangan Bencana, Keadaan Darurat dan Mendesak",
                ],
                datasets: [{
                  label: "Anggaran (Rp)",
                  data: [1123785756.34, 1187744000, 73627444, 218317000, 173093000],
                  backgroundColor: ["#ff6b35", "#ff8a5c", "#ffab8a", "#ffcba8", "#ffe8d6"],
                  borderRadius: 5,
                }],
              },
              options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true, ticks: { callback: (value: any) => formatAsShortCurrency(value) } } },
              },
            }
        }
    };

    const createChart = (key: string, ref: React.RefObject<HTMLCanvasElement>, config: ChartConfig) => {
        if (ref.current) {
            const ctx = ref.current.getContext("2d");
            if (ctx) {
                chartRefs[key] = new Chart(ctx, config);
            }
        }
    };
    
    // Logika untuk membuat chart berdasarkan tab yang aktif
    if (activeTab === 'kependudukan') {
        createChart('pendidikan', chartMapping.pendidikan.ref, chartMapping.pendidikan.config);
    } else if (activeTab === 'pertanian') {
        createChart('peternakan', chartMapping.peternakan.ref, chartMapping.peternakan.config);
        createChart('perkebunan', chartMapping.perkebunan.ref, chartMapping.perkebunan.config);
        createChart('tanamanPangan', chartMapping.tanamanPangan.ref, chartMapping.tanamanPangan.config);
    } else if (activeTab === 'apbd') {
        createChart('pendapatanDetail', chartMapping.pendapatanDetail.ref, chartMapping.pendapatanDetail.config);
        createChart('belanjaDetail', chartMapping.belanjaDetail.ref, chartMapping.belanjaDetail.config);
    }

    // Fungsi cleanup untuk menghancurkan semua chart
    return () => {
        Object.keys(chartRefs).forEach(key => {
            if (chartRefs[key]) {
                chartRefs[key]?.destroy();
                chartRefs[key] = null;
            }
        });
    };
}, [activeTab]);


  // Animated numbers
  const totalPenduduk = useAnimatedNumber(8598)
  const perempuan = useAnimatedNumber(4281)
  const lakiLaki = useAnimatedNumber(4317)
  const islam = useAnimatedNumber(1148)
  const kristen = useAnimatedNumber(22)
  const katolik = useAnimatedNumber(268)
  const hindu = useAnimatedNumber(23)
  const pendapatan = useAnimatedNumber(2414959700, "currency")
  const belanja = useAnimatedNumber(2776567200, "currency")

  return (
    <div className="font-poppins bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="pt-16 min-h-screen">
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Data Statistik Desa</h1>
            <p className="text-xl opacity-90">Visualisasi data dan informasi desa dalam bentuk grafik</p>
          </div>
        </section>

        {/* Tab Buttons */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button
                onClick={() => setActiveTab("kependudukan")}
                className={`w-40 h-40 flex flex-col items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  activeTab === "kependudukan"
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100"
                }`}
              >
                <img src="/assets/img/Penduduk.png" alt="Kependudukan" className="mb-2 w-10 h-10" />
                <span className="text-center">Data Penduduk</span>
              </button>
              <button
                onClick={() => setActiveTab("pertanian")}
                className={`w-40 h-40 flex flex-col items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  activeTab === "pertanian"
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100"
                }`}
              >
                <img src="/assets/img/farmer.png" alt="Pertanian" className="mb-2 w-10 h-10" />
                <span className="text-center leading-tight">
                  Data Potensi
                  <br />
                  Pertanian
                </span>
              </button>
              <button
                onClick={() => setActiveTab("apbd")}
                className={`w-40 h-40 flex flex-col items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  activeTab === "apbd"
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100"
                }`}
              >
                <img src="/assets/img/money.png" alt="APBD Desa" className="mb-2 w-10 h-10" />
                <span className="text-center dark:text-white">Data APBD Desa</span>
              </button>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="pb-16">
          {/* Kependudukan Tab */}
          {activeTab === "kependudukan" && (
            <div>
              {/* Population Summary */}
              <section className="mb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-black dark:text-white">Jumlah Penduduk</h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center justify-center space-x-6">
                      <div className="flex-shrink-0">
                        <i className="fas fa-people-arrows text-blue-600" style={{ fontSize: "48px" }}></i>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total Penduduk
                        </p>
                        <p className="text-4xl font-bold text-black dark:text-white">{totalPenduduk} Jiwa</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <i className="fas fa-person-dress text-blue-600" style={{ fontSize: "48px" }}></i>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-black dark:text-gray-400 uppercase tracking-wider">
                          Perempuan
                        </p>
                        <p className="text-4xl font-bold text-black dark:text-white">{perempuan} Jiwa</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <i className="fas fa-person text-blue-600" style={{ fontSize: "48px" }}></i>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Laki-laki
                        </p>
                        <p className="text-4xl font-bold text-black dark:text-white">{lakiLaki} Jiwa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

    
{/* Religion Statistics */}
<section className="mb-16 bg-white dark:bg-gray-900 py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Statistik Berdasarkan Agama
      </h2>
    </div>
    {/* AWAL PERUBAHAN: Menambahkan 4 card baru dan menyesuaikan grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Card Islam */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-mosque text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{islam}</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Islam</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Kristen */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-church text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{kristen}</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Kristen</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Katolik */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-bible text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{katolik}</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Katolik</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Hindu */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-om text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">{hindu}</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Hindu</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Buddha (BARU) */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-dharmachakra text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">0</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Buddha</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Konghucu (BARU) */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-yin-yang text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">0</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Konghucu</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Kepercayaan Lainnya (BARU) */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-pray text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">0</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Kepercayaan Lainnya</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
      {/* Card Aliran Kepercayaan (BARU) */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <i className="fas fa-praying-hands text-blue-600 mt-2 mb-6" style={{ fontSize: "40px" }}></i>
        <p className="text-4xl font-extrabold text-gray-900 dark:text-white">0</p>
        <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">Aliran Kepercayaan</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Jiwa</p>
      </div>
    </div>
    {/* AKHIR PERUBAHAN */}
  </div>
</section>

              {/* Education Chart */}
              <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-black dark:text-white">Berdasarkan Pendidikan</h2>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                    <div className="overflow-x-auto">
                      <div className="relative h-96" style={{ minWidth: "800px" }}>
                        <canvas ref={pendidikanChartRef}></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Pertanian Tab */}
          {activeTab === "pertanian" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    Data Potensi Peternakan
                  </h3>
                  <div className="h-80">
                    <canvas ref={peternakanChartRef}></canvas>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    Data Potensi Perkebunan ( Ton )
                  </h3>
                  <div className="h-80">
                    <canvas ref={perkebunanChartRef}></canvas>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
                    Data Potensi Tanaman Pangan
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="relative h-96" style={{ minWidth: "800px" }}>
                      <canvas ref={tanamanPanganChartRef}></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APBD Tab */}
          {activeTab === "apbd" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16">
                <div className="lg:col-span-1 text-center lg:text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2">APBD Desa 2024</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ringkasan Anggaran Pendapatan dan Belanja Desa tahun berjalan.
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                        <i className="fas fa-arrow-up text-green-500 mr-2"></i>
                        Pendapatan
                      </div>
                      <p className="mt-2 text-2xl font-bold text-green-500">{pendapatan}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                      <div className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                        <i className="fas fa-arrow-down text-red-500 mr-2"></i>
                        Belanja
                      </div>
                      <p className="mt-2 text-2xl font-bold text-red-500">{belanja}</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-16 border-gray-200 dark:border-gray-700" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                    Detail Pendapatan Desa
                  </h3>
                  <div className="h-96">
                    <canvas ref={pendapatanDetailChartRef}></canvas>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                    Detail Belanja Desa
                  </h3>
                  <div className="h-96">
                    <canvas ref={belanjaDetailChartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}