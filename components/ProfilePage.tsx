"use client"

import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function ProfilePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const leaders = [
    { name: "Kromosonto", period: "1873-1885", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Diposentono", period: "1885-1906", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Kasanrodjo", period: "1906-1922", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Kromowitjono", period: "1922-1929", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Kromosentono", period: "1929-1931", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Kartosemito", period: "1931-1933", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Sastrosoerono", period: "1933-1947", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Tomopawiro", period: "1947-1988", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Habib Suminto (Pj.)", period: "1988-1989", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "H. Imam Bachrodin", period: "1988-1997", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "JFR. Suyatin (Pj.)", period: "1997-1998", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "H. Imam Bachrodin", period: "1998-2003", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Muryani (Pj.)", period: "2003-2007", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Zaenal Mustofa, S.Pd.I", period: "2007-2019", photo: "/assets/img/officer/placeholder.jpg" },
    { name: "Bambang Siswaya, S.T.", period: "2019-sekarang", photo: "/assets/img/officer/pakBam.jpg" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leaders.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [leaders.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="font-poppins bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className="pt-16 min-h-screen">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Profil Desa Slorok</h1>
            <p className="text-xl opacity-90">Mengenal lebih dekat desa kami</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Sejarah Desa */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-6 flex items-center">
                <i className="fas fa-history mr-3"></i>
                Sejarah Desa
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Desa Slorok, yang berdiri sejak tahun 1881, mendapatkan namanya dari sebuah makam dengan pintu
                "slorokan" yang ditemukan saat pembukaan lahan pertama oleh tujuh pendiri. Desa ini terdiri dari
                beberapa dusun yang namanya juga memiliki asal-usul unik. Dusun Menjangan Kalung dinamai setelah
                penampakan gaib seekor menjangan berkalung. Dusun Pucungsari berasal dari nama pohon Pucung, dan Dusun
                Sumber dinamai karena banyaknya mata air di wilayah tersebut.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Sepanjang sejarahnya, Desa Slorok memegang peranan penting. Pada era pra-kemerdekaan, wilayah Menjangan
                Kalung menjadi pangkalan pejuang melawan Jepang. Di zaman Belanda, salah satu rumah di Pucungsari Kidul
                menjadi markas pejuang dan menerima penghargaan dari Legiun Veteran pada tahun 1987. Desa ini juga
                menjadi lokasi pemberantasan oknum G30S/PKI. Selain itu, desa mengalami beberapa perubahan signifikan,
                termasuk pemindahan pasar desa pada tahun 1961 dan pengurangan wilayah pada tahun 1971. Kini, Desa
                Slorok merupakan bagian dari Kecamatan Garum.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Tujuh Pendiri Desa Slorok:
                <br />
                1. Darma Wangsa (Makam di Dusun Menjangankalung)
                <br />
                2. Raden Subroto (Makam di Dusun Pucungsari Kidul)
                <br />
                3. Merto Yudho (Makam di Dusun Slorok)
                <br />
                4. Dewi Dukimat (Makam di Dusun Sumber)
                <br />
                5. Tunggul Wulung (Makam di Dusun Sumber)
                <br />
                6. Belum diketahui
                <br />
                7. Belum diketahui
              </p>
            </div>

            {/* Slider Sejarah Kepala Desa */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-6 flex items-center">
                <i className="fas fa-crown mr-3"></i>
                Sejarah Kepala Desa
              </h3>
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {leaders.map((leader, index) => (
                    <div key={index} className="min-w-full flex-shrink-0 px-4">
                      <div className="text-center">
                        <img
                          src={leader.photo || "/placeholder.svg"}
                          alt={leader.name}
                          className="w-48 h-48 mx-auto mb-4 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"
                        />
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{leader.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Periode: {leader.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                  {leaders.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentSlide ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Visi dan Misi */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-6 flex items-center">
                  <i className="fas fa-eye mr-3"></i> Visi
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg">
                  "Mewujudkan Desa Slorok sebagai desa yang maju, mandiri, dan sejahtera berdasarkan nilai-nilai gotong
                  royong dan kearifan lokal pada tahun 2030"
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-6 flex items-center">
                  <i className="fas fa-bullseye mr-3"></i> Misi
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan keterampilan
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      Mengembangkan potensi ekonomi desa berbasis pertanian dan UMKM
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      Membangun infrastruktur desa yang mendukung aktivitas ekonomi dan sosial masyarakat
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      Melestarikan lingkungan hidup dan kearifan lokal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-600 mr-3 mt-1"></i>
                    <span className="text-gray-700 dark:text-gray-300">
                      Memperkuat nilai-nilai gotong royong dan kebersamaan dalam kehidupan bermasyarakat
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Peta Wilayah */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg animate-fade-in-up">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-6 flex items-center justify-center">
                <i className="fas fa-map mr-3"></i> Peta Wilayah Desa
              </h3>
              <div className="flex justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5926853995315!2d112.24407290949203!3d-8.040860280263455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7893403295fb01%3A0x679a5b38157dae73!2sBalai%20Desa%20Slorok!5e0!3m2!1sid!2sid!4v1752723297853!5m2!1sid!2sid"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl h-[350px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
