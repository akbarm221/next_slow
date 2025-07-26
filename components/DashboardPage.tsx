// Lokasi: components/DashboardPage.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useAuth } from "./AuthProvider"

interface AgamaData {
  islam: number;
  kristen: number;
  katolik: number;
  hindu: number;
  buddha: number;
  konghucu: number;
  kepercayaanLainnya: number;
  aliranKepercayaan: number;
}

interface ChartData {
  labels: string[]
  values: number[]
}

interface InfografisData {
  penduduk: {
    total: number
    lakiLaki: number
    perempuan: number
    agama: AgamaData;
  }
  pendidikan: ChartData
  pertanian: {
    peternakan: ChartData
    perkebunan: ChartData
    tanamanPangan: ChartData
  }
  apbd: {
    pendapatan: number
    belanja: number
    pendapatanDetail: ChartData
    belanjaDetail: ChartData
  }
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("penduduk")
  const [data, setData] = useState<InfografisData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "infografis", "data_penduduk");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as InfografisData);
        } else {
          console.log("No such document!");
        }
      }
    };

    if (!loading && user) {
      fetchData();
    }
  }, [user, loading]);

  // AWAL PERUBAHAN: useEffect untuk kalkulasi total penduduk otomatis
  useEffect(() => {
    if (data) {
      const newTotal = (data.penduduk.lakiLaki || 0) + (data.penduduk.perempuan || 0);
      // Cek agar tidak terjadi infinite loop update
      if (newTotal !== data.penduduk.total) {
        setData(prevData => {
          if (!prevData) return null;
          // Buat salinan deep copy untuk menghindari mutasi state langsung
          const newData = JSON.parse(JSON.stringify(prevData));
          newData.penduduk.total = newTotal;
          return newData;
        });
      }
    }
  }, [data?.penduduk.lakiLaki, data?.penduduk.perempuan]);
  // AKHIR PERUBAHAN

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Gagal untuk logout.");
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, "infografis", "data_penduduk");
      await setDoc(docRef, data, { merge: true });
      alert("Data berhasil disimpan di Firebase!");
    } catch (error) {
      console.error("Error menyimpan data:", error);
      alert("Gagal menyimpan data.");
    }
    setIsSaving(false);
  };

  const updateValue = (path: string, value: number | string) => {
    setData((prevData) => {
      if (!prevData) return null;
      const keys = path.split('.');
      const newData = JSON.parse(JSON.stringify(prevData));
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = typeof value === 'string' ? Number.parseInt(value) || 0 : value;
      return newData;
    });
  }

  const updateArrayValue = (path: string, index: number, value: string) => {
      setData((prevData) => {
          if (!prevData) return null;
          const newData = { ...prevData };
          const keys = path.split('.');
          let current: any = newData;
          for (let i = 0; i < keys.length - 1; i++) {
              current = current[keys[i]];
          }
          current[keys[keys.length - 1]][index] = Number.parseInt(value) || 0;
          return newData;
      });
  }

  if (loading || !user || !data) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        </div>
    );
  }
  return (
    // ... Sisa dari JSX komponen Anda (Header, main content, dll) tidak perlu diubah ...
    // Pastikan fungsi onClick pada tombol logout memanggil handleLogout yang baru.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/assets/img/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard Admin - Desa Slorok</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <i className="fas fa-save mr-2"></i>
                Simpan Data
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "penduduk", label: "Data Penduduk", icon: "fas fa-users" },
              { id: "pendidikan", label: "Data Pendidikan", icon: "fas fa-graduation-cap" },
              { id: "pertanian", label: "Data Pertanian", icon: "fas fa-seedling" },
              { id: "apbd", label: "Data APBD", icon: "fas fa-money-bill-wave" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeSection === tab.id
                    ? "bg-green-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {/* Data Penduduk */}
          {activeSection === "penduduk" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data Penduduk</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Penduduk
                  </label>
                  <input
                    type="number"
                    value={data.penduduk.total}
                    onChange={(e) => updateValue("penduduk.total", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Laki-laki</label>
                  <input
                    type="number"
                    value={data.penduduk.lakiLaki}
                    onChange={(e) => updateValue("penduduk.lakiLaki", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Perempuan</label>
                  <input
                    type="number"
                    value={data.penduduk.perempuan}
                    onChange={(e) => updateValue("penduduk.perempuan", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Agama</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Islam</label>
                    <input
                      type="number"
                      value={data.penduduk.agama.islam}
                      onChange={(e) => updateValue("penduduk.agama.islam", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kristen</label>
                    <input
                      type="number"
                      value={data.penduduk.agama.kristen}
                      onChange={(e) => updateValue("penduduk.agama.kristen", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Katolik</label>
                    <input
                      type="number"
                      value={data.penduduk.agama.katolik}
                      onChange={(e) => updateValue("penduduk.agama.katolik", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hindu</label>
                    <input
                      type="number"
                      value={data.penduduk.agama.hindu}
                      onChange={(e) => updateValue("penduduk.agama.hindu", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Pendidikan */}
          {activeSection === "pendidikan" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data Pendidikan</h2>

              <div className="space-y-4">
                {data.pendidikan.labels.map((label, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        value={data.pendidikan.values[index]}
                        onChange={(e) => updateArrayValue("pendidikan.values", index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Pertanian */}
          {activeSection === "pertanian" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data Pertanian</h2>

              {/* Peternakan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Peternakan</h3>
                <div className="space-y-4">
                  {data.pertanian.peternakan.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={data.pertanian.peternakan.values[index]}
                          onChange={(e) => updateArrayValue("pertanian.peternakan.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perkebunan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Perkebunan (Ton)</h3>
                <div className="space-y-4">
                  {data.pertanian.perkebunan.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={data.pertanian.perkebunan.values[index]}
                          onChange={(e) => updateArrayValue("pertanian.perkebunan.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tanaman Pangan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Tanaman Pangan</h3>
                <div className="space-y-4">
                  {data.pertanian.tanamanPangan.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={data.pertanian.tanamanPangan.values[index]}
                          onChange={(e) => updateArrayValue("pertanian.tanamanPangan.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Data APBD */}
          {activeSection === "apbd" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data APBD</h2>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Pendapatan (Rp)
                  </label>
                  <input
                    type="number"
                    value={data.apbd.pendapatan}
                    onChange={(e) => updateValue("apbd.pendapatan", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Belanja (Rp)
                  </label>
                  <input
                    type="number"
                    value={data.apbd.belanja}
                    onChange={(e) => updateValue("apbd.belanja", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Detail Pendapatan */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detail Pendapatan</h3>
                <div className="space-y-4">
                  {data.apbd.pendapatanDetail.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                      </div>
                      <div className="w-48">
                        <input
                          type="number"
                          value={data.apbd.pendapatanDetail.values[index]}
                          onChange={(e) => updateArrayValue("apbd.pendapatanDetail.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Belanja */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detail Belanja</h3>
                <div className="space-y-4">
                  {data.apbd.belanjaDetail.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                      </div>
                      <div className="w-48">
                        <input
                          type="number"
                          value={data.apbd.belanjaDetail.values[index]}
                          onChange={(e) => updateArrayValue("apbd.belanjaDetail.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}