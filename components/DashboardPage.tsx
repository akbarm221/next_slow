// Lokasi: components/DashboardPage.tsx

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useAuth } from "./AuthProvider"

// Definisi Interface untuk struktur data modular
interface PopulationSummaryData {
  total: number
  lakiLaki: number
  perempuan: number
}

interface ReligionCountsData {
  islam: number
  kristen: number
  katolik: number
  hindu: number
  buddha: number
  konghucu: number
  kepercayaanLainnya: number
  aliranKepercayaan: number
}

interface EducationStatsData {
  labels: string[]
  values: number[]
}

interface AgricultureData {
  peternakan: {
    labels: string[]
    values: number[]
  }
  perkebunan: {
    labels: string[]
    values: number[]
  }
  tanamanPangan: {
    labels: string[]
    values: number[]
  }
}

interface ApbdData {
  pendapatan: number
  belanja: number
  pendapatanDetail: {
    labels: string[]
    values: number[]
  }
  belanjaDetail: {
    labels: string[]
    values: number[]
  }
}

// Interface gabungan untuk state lokal
interface DashboardCombinedData {
  populationSummary: PopulationSummaryData
  religionCounts: ReligionCountsData
  educationStats: EducationStatsData
  agricultureData: AgricultureData
  apbdData: ApbdData
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("penduduk")
  const [data, setData] = useState<DashboardCombinedData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Mengambil data dari beberapa dokumen Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const [
            populationSnap,
            religionSnap,
            educationSnap,
            agricultureSnap,
            apbdSnap,
          ] = await Promise.all([
            getDoc(doc(db, "infografis", "population_summary")),
            getDoc(doc(db, "infografis", "religion_counts")),
            getDoc(doc(db, "infografis", "education_stats")),
            getDoc(doc(db, "infografis", "agriculture_data")),
            getDoc(doc(db, "infografis", "apbd_data")),
          ])

          // Mengatur data state dengan data dari Firestore atau data default jika tidak ada
          setData({
            populationSummary: (populationSnap.exists()
              ? (populationSnap.data() as PopulationSummaryData)
              : { total: 0, lakiLaki: 0, perempuan: 0 }),
            religionCounts: (religionSnap.exists()
              ? (religionSnap.data() as ReligionCountsData)
              : { islam: 0, kristen: 0, katolik: 0, hindu: 0, buddha: 0, konghucu: 0, kepercayaanLainnya: 0, aliranKepercayaan: 0 }),
            educationStats: (educationSnap.exists()
              ? (educationSnap.data() as EducationStatsData)
              : { labels: [], values: [] }),
            agricultureData: (agricultureSnap.exists()
              ? (agricultureSnap.data() as AgricultureData)
              : { peternakan: { labels: [], values: [] }, perkebunan: { labels: [], values: [] }, tanamanPangan: { labels: [], values: [] } }),
            apbdData: (apbdSnap.exists() ? (apbdSnap.data() as ApbdData) : { pendapatan: 0, belanja: 0, pendapatanDetail: { labels: [], values: [] }, belanjaDetail: { labels: [], values: [] } }),
          })
          setIsDataLoaded(true);
        } catch (error) {
          console.error("Gagal mengambil data dari Firestore:", error)
          setIsDataLoaded(true); // Hentikan loading meskipun error
        }
      }
    }

    if (!loading && user) {
      fetchData()
    }
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])


  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Gagal logout:", error)
      alert("Gagal untuk logout.")
    }
  }

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    
    // Pastikan total penduduk ter-update sebelum menyimpan
    const dataToSave = JSON.parse(JSON.stringify(data));
    if (dataToSave.populationSummary) {
      dataToSave.populationSummary.total = 
        (dataToSave.populationSummary.lakiLaki || 0) + (dataToSave.populationSummary.perempuan || 0);
    }
    
    try {
      // Menyimpan setiap bagian data ke dokumennya masing-masing
      if (dataToSave.populationSummary) await setDoc(doc(db, "infografis", "population_summary"), dataToSave.populationSummary);
      if (dataToSave.religionCounts) await setDoc(doc(db, "infografis", "religion_counts"), dataToSave.religionCounts);
      if (dataToSave.educationStats) await setDoc(doc(db, "infografis", "education_stats"), dataToSave.educationStats);
      if (dataToSave.agricultureData) await setDoc(doc(db, "infografis", "agriculture_data"), dataToSave.agricultureData);
      if (dataToSave.apbdData) await setDoc(doc(db, "infografis", "apbd_data"), dataToSave.apbdData);
  
      alert("Data berhasil disimpan di Firebase!");
    } catch (error) {
      console.error("Error menyimpan data:", error);
      alert("Gagal menyimpan data.");
    }
    setIsSaving(false);
  };
  
  const updateNestedValue = (
    docKey: keyof DashboardCombinedData,
    fieldPath: string,
    value: string | number
  ) => {
    setData((prevData) => {
      if (!prevData) return null;
  
      const newData = JSON.parse(JSON.stringify(prevData));
      let currentLevel = newData[docKey];
  
      if (!currentLevel) return prevData;
  
      const keys = fieldPath.split(".");
      for (let i = 0; i < keys.length - 1; i++) {
        currentLevel = currentLevel[keys[i]];
      }
  
      currentLevel[keys[keys.length - 1]] =
        typeof value === "string" ? Number(value) || 0 : value;
      
      // Kalkulasi total penduduk otomatis
      if (docKey === 'populationSummary' && (fieldPath === 'lakiLaki' || fieldPath === 'perempuan')) {
        const summary = newData.populationSummary;
        summary.total = (summary.lakiLaki || 0) + (summary.perempuan || 0);
      }

      return newData;
    });
  };

  const updateArrayValue = (
    docKey: keyof DashboardCombinedData,
    arrayPath: string,
    index: number,
    value: string
  ) => {
    setData(prevData => {
        if (!prevData) return null;
        const newData = JSON.parse(JSON.stringify(prevData));
        let currentDoc = newData[docKey];
        if (!currentDoc) return prevData;
        
        const keys = arrayPath.split('.');
        let currentLevel: any = currentDoc;
        for (let i = 0; i < keys.length - 1; i++) {
            currentLevel = currentLevel[keys[i]];
        }
        
        currentLevel[keys[keys.length - 1]][index] = Number(value) || 0;
        
        return newData;
    });
  };

  if (loading || !user || !isDataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/img/logo.png"
                alt="Logo"
                className="w-8 h-8 rounded-full"
              />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard Admin - Desa Slorok
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:bg-green-400"
              >
                <i className="fas fa-save mr-2"></i>
                {isSaving ? "Menyimpan..." : "Simpan Data"}
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
        <nav className="flex space-x-8 mb-8">
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

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {/* AWAL PERUBAHAN: Menambahkan pengecekan null untuk data */}
          {activeSection === "penduduk" && data?.populationSummary && data.religionCounts && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data Penduduk</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Penduduk (Otomatis)</label>
                  <input
                    type="number"
                    readOnly
                    value={data.populationSummary.total}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Laki-laki</label>
                  <input
                    type="number"
                    value={data.populationSummary.lakiLaki}
                    onChange={(e) => updateNestedValue("populationSummary", "lakiLaki", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Perempuan</label>
                  <input
                    type="number"
                    value={data.populationSummary.perempuan}
                    onChange={(e) => updateNestedValue("populationSummary", "perempuan", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Agama</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {(Object.keys(data.religionCounts) as Array<keyof ReligionCountsData>).map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                      <input
                        type="number"
                        value={data.religionCounts[key]}
                        onChange={(e) => updateNestedValue("religionCounts", key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "pendidikan" && data?.educationStats && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data Pendidikan</h2>
              <div className="space-y-4">
                {data.educationStats.labels.map((label, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        value={data.educationStats.values[index]}
                        onChange={(e) => updateArrayValue("educationStats", "values", index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "pertanian" && data?.agricultureData && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data Pertanian</h2>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Peternakan</h3>
                <div className="space-y-4">
                  {data.agricultureData.peternakan.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1"><label className="block text-sm font-medium">{label}</label></div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={data.agricultureData.peternakan.values[index]}
                          onChange={(e) => updateArrayValue("agricultureData", "peternakan.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Perkebunan (Ton)</h3>
                <div className="space-y-4">
                  {data.agricultureData.perkebunan.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1"><label className="block text-sm font-medium">{label}</label></div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={data.agricultureData.perkebunan.values[index]}
                          onChange={(e) => updateArrayValue("agricultureData", "perkebunan.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Tanaman Pangan</h3>
                <div className="space-y-4">
                  {data.agricultureData.tanamanPangan.labels.map((label, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1"><label className="block text-sm font-medium">{label}</label></div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={data.agricultureData.tanamanPangan.values[index]}
                          onChange={(e) => updateArrayValue("agricultureData", "tanamanPangan.values", index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeSection === "apbd" && data?.apbdData && (
             <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Data APBD</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Pendapatan (Rp)</label>
                      <input type="number" value={data.apbdData.pendapatan} onChange={(e) => updateNestedValue("apbdData", "pendapatan", e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Belanja (Rp)</label>
                      <input type="number" value={data.apbdData.belanja} onChange={(e) => updateNestedValue("apbdData", "belanja", e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg" />
                   </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detail Pendapatan</h3>
                  <div className="space-y-4">
                    {data.apbdData.pendapatanDetail.labels.map((label, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1"><label className="block text-sm font-medium">{label}</label></div>
                        <div className="w-48">
                          <input
                            type="number"
                            value={data.apbdData.pendapatanDetail.values[index]}
                            onChange={(e) => updateArrayValue("apbdData", "pendapatanDetail.values", index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detail Belanja</h3>
                  <div className="space-y-4">
                    {data.apbdData.belanjaDetail.labels.map((label, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1"><label className="block text-sm font-medium">{label}</label></div>
                        <div className="w-48">
                          <input
                            type="number"
                            value={data.apbdData.belanjaDetail.values[index]}
                            onChange={(e) => updateArrayValue("apbdData", "belanjaDetail.values", index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

             </div>
          )}
          {/* AKHIR PERUBAHAN */}
        </div>
      </div>
    </div>
  )
}