export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">Kontak Kami</h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-green-600 dark:text-green-400 mt-1 flex-shrink-0"></i>
                <span>Jl. Desa Slorok No. 123, Kecamatan Makmur, Kabupaten Sentosa, Provinsi Bahagia 12345</span>
              </p>
              <p className="flex items-center space-x-3">
                <i className="fas fa-phone text-green-600 dark:text-green-400 flex-shrink-0"></i>
                <span>(021) 1234-5678</span>
              </p>
              <p className="flex items-center space-x-3">
                <i className="fas fa-envelope text-green-600 dark:text-green-400 flex-shrink-0"></i>
                <span>info@desasejahtera.id</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">Jam Pelayanan</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>Senin - Jumat: 08:00 - 16:00 WIB</p>
              <p>Sabtu: 08:00 - 12:00 WIB</p>
              <p>Minggu: Tutup</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">Media Sosial</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Develop by MMD FILKOM 18 Universitas Brawijaya. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
