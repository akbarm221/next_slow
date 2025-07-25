"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"

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

export default function BumdesPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    // Load news data (same as home page for demo)
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
      {
        id: 4,
        title: "Gotong Royong Pembersihan Sungai Desa",
        excerpt:
          "Seluruh warga bergotong royong membersihkan sungai untuk menjaga kelestarian lingkungan dan mencegah banjir.",
        content:
          "Kegiatan gotong royong pembersihan Sungai Jernih yang melintasi Desa Slorok diikuti oleh lebih dari 200 warga dari berbagai kalangan.",
        image: "/assets/img/desa.jpg",
        date: "2024-01-05",
        author: "Ahmad Wijaya",
        category: "Lingkungan",
      },
    ]
    setNewsData(news)
    setFilteredNews(news)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const filterNews = (category: string) => {
    setActiveFilter(category)
    if (category === "all") {
      setFilteredNews(newsData)
    } else {
      setFilteredNews(newsData.filter((news) => news.category === category))
    }
  }

  const searchNews = () => {
    if (!searchQuery.trim()) {
      setFilteredNews(newsData)
      return
    }

    const filtered = newsData.filter(
      (news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredNews(filtered)
  }

  const showNewsDetail = (newsId: number) => {
    const news = newsData.find((n) => n.id === newsId)
    if (news) {
      setSelectedNews(news)
    }
  }

  const closeModal = () => {
    setSelectedNews(null)
  }

  const categories = ["all", "Pembangunan", "Sosial", "Ekonomi", "Lingkungan"]

  return (
    <div className="font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="pt-16 min-h-screen">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Badan Usaha Milik Desa</h1>
            <p className="text-xl opacity-90">Macam-macam badan usaha milik desa</p>
          </div>
        </section>

        {/* News Filter */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => filterNews(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeFilter === category
                        ? "bg-green-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category === "all" ? "Semua" : category}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berita..."
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={searchNews}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Oleh: {news.author}</span>
                      <button
                        onClick={() => showNewsDetail(news.id)}
                        className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>Baca</span>
                        <i className="fas fa-arrow-right text-sm"></i>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Tidak ada berita ditemukan
                </h3>
                <p className="text-gray-500 dark:text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* News Detail Modal */}
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
