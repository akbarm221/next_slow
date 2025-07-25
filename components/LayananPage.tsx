"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface Service {
  id: string
  title: string
  icon: string
  description: string
  flowContent: string
}

export default function LayananPage() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    // Load services data
    const servicesData = [
      {
        id: "surat-keterangan",
        title: "Surat Keterangan",
        icon: "fas fa-file-alt",
        description: "Pengurusan berbagai surat keterangan seperti domisili, tidak mampu, usaha, dll.",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-pengantar-pernikahan",
        title: "Surat Pengantar Pernikahan",
        icon: "fas fa-file-alt",
        description: "Surat pengantar untuk keperluan pernikahan",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-pengantar-perceraian",
        title: "Surat Pengantar Perceraian",
        icon: "fas fa-file-alt",
        description: "Surat pengantar untuk keperluan perceraian",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-pengantar-skck",
        title: "Surat Pengantar SKCK",
        icon: "fas fa-file-alt",
        description: "Surat pengantar untuk pembuatan SKCK",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-keterangan-hubungan-keluarga",
        title: "Surat Keterangan Hubungan Keluarga",
        icon: "fas fa-file-alt",
        description: "Surat keterangan hubungan keluarga",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-keterangan-kelahiran",
        title: "Surat Keterangan Kelahiran",
        icon: "fas fa-file-alt",
        description: "Surat keterangan kelahiran",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-keterangan-kematian",
        title: "Surat Keterangan Kematian",
        icon: "fas fa-file-alt",
        description: "Surat keterangan kematian",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-keterangan-domisili-usaha",
        title: "Surat Keterangan Domisili Usaha",
        icon: "fas fa-file-alt",
        description: "Surat keterangan domisili usaha",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-izin-keluarga",
        title: "Surat Izin Keluarga",
        icon: "fas fa-file-alt",
        description: "Surat izin keluarga",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-pernyataan-perubahan-biodata",
        title: "Surat Pernyataan Perubahan Biodata",
        icon: "fas fa-file-alt",
        description: "Surat pernyataan perubahan biodata",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-perubahan-kartu-keluarga",
        title: "Surat Perubahan Kartu Keluarga",
        icon: "fas fa-file-alt",
        description: "Surat perubahan kartu keluarga",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-pindah-tempat",
        title: "Surat Pindah Tempat",
        icon: "fas fa-file-alt",
        description: "Surat pindah tempat",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
      {
        id: "surat-keterangan-tidak-mampu",
        title: "Surat Keterangan Tidak Mampu",
        icon: "fas fa-file-alt",
        description: "Surat keterangan tidak mampu",
        flowContent: "<h4><b>Berkas yang disiapkan:</b></h4><p>Satu dokumen Kartu Keluarga (KK)</p>",
      },
    ]
    setServices(servicesData)
  }, [])

  const showServiceDetail = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setSelectedService(service)
    }
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <div className="font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="pt-16 min-h-screen">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Layanan Desa</h1>
            <p className="text-xl opacity-90">Berbagai layanan untuk kemudahan warga desa</p>
          </div>
        </section>

        {/* Services Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => showServiceDetail(service.id)}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center space-x-6"
                >
                  <div className="flex-shrink-0">
                    <i className={`${service.icon} text-4xl text-green-600 dark:text-green-400`}></i>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">{selectedService.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0"
                >
                  ×
                </button>
              </div>

              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedService.flowContent }}
              />

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={`https://wa.me/6285607006122?text=${encodeURIComponent(`== Perihal Meminta ${selectedService.title} ==\n\nHalo Admin Dukcapil Slorok, Saya (...) ingin meminta pembuatan ${selectedService.title}\n\nTerima kasih..`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Chat Call Center {selectedService.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
