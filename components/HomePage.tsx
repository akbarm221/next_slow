"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Link from "next/link"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
}

export default function HomePage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    // Load news data
    const news = [
      {
        id: 1,
        title: "Pembangunan Jalan Desa Tahap II Dimulai",
        excerpt:
          "Proyek pembangunan jalan desa tahap kedua telah dimulai dengan target penyelesaian dalam 3 bulan ke depan.",
        content:
          "Desa Slorok kembali melanjutkan program pembangunan infrastruktur dengan memulai proyek jalan desa tahap kedua. Proyek ini merupakan kelanjutan dari pembangunan tahap pertama yang telah berhasil diselesaikan tahun lalu.",
        image: "/assets/img/desa.jpg",
        date: "2024-01-15",
        author: "Tim Redaksi Desa",
        category: "Pembangunan",
      },
      {
        id: 2,
        title: "Program Pelatihan Keterampilan untuk Ibu-Ibu PKK",
        excerpt:
          "Dinas Pemberdayaan Masyarakat mengadakan pelatihan membuat kerajinan tangan untuk meningkatkan ekonomi keluarga.",
        content:
          "Sebanyak 50 ibu-ibu anggota PKK Desa Slorok mengikuti program pelatihan keterampilan membuat kerajinan tangan yang diselenggarakan selama 5 hari.",
        image: "/assets/img/desa.jpg",
        date: "2024-01-10",
        author: "Siti Aminah",
        category: "Sosial",
      },
      {
        id: 3,
        title: "Panen Raya Padi Musim Tanam Pertama",
        excerpt:
          "Petani desa merayakan hasil panen yang melimpah dengan produktivitas meningkat 15% dibanding tahun lalu.",
        content:
          "Musim panen raya padi periode pertama tahun 2024 di Desa Slorok menunjukkan hasil yang sangat menggembirakan.",
        image: "/assets/img/desa.jpg",
        date: "2024-01-08",
        author: "Budi Santoso",
        category: "Ekonomi",
      },
    ]
    setNewsData(news)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const showNewsModal = (newsId: number) => {
    const news = newsData.find((n) => n.id === newsId)
    if (news) {
      setSelectedNews(news)
    }
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  const infoCards = [
    { icon: "fas fa-users", number: "2,500", label: "Jumlah Penduduk" },
    { icon: "fas fa-home", number: "650", label: "Kepala Keluarga" },
    { icon: "fas fa-map", number: "6,26542", label: "Luas Wilayah (km²)" },
    { icon: "fas fa-seedling", number: "3", label: "Dusun" },
  ]

  return (
    <div className="font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-green-50 dark:from-gray-800 dark:to-gray-900 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-green-600 dark:text-green-400 mb-6 animate-fade-in-up">
                  Selamat Datang di Desa Slorok
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
                  Desa yang maju, mandiri, dan sejahtera untuk semua warga
                </p>
                <Link
                  href="/profil"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up animation-delay-400"
                >
                  Jelajahi Desa
                </Link>
              </div>
              <div className="animate-fade-in-right animation-delay-600">
                <img src="/assets/img/desa.jpg" alt="Pemandangan Desa" className="w-full h-auto rounded-xl shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <i className={`${card.icon} text-4xl text-green-600 dark:text-green-400 mb-4`}></i>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{card.number}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Galeri Kegiatan</h2>
              <p className="text-gray-600 dark:text-gray-300">Foto foto kegiatan di desa slorok</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsData.map((news) => (
                <article
                  key={news.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(news.date)}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
                        {news.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{news.excerpt}</p>
                    <button
                      onClick={() => showNewsModal(news.id)}
                      className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>Baca Selengkapnya</span>
                      <i className="fas fa-arrow-right text-sm"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">{selectedNews.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0"
                >
                  ×
                </button>
              </div>
              <img
                src={selectedNews.image || "/placeholder.svg"}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>
                  <i className="fas fa-calendar mr-1"></i>
                  {formatDate(selectedNews.date)}
                </span>
                <span>
                  <i className="fas fa-user mr-1"></i>
                  {selectedNews.author}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  {selectedNews.category}
                </span>
              </div>
              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedNews.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
