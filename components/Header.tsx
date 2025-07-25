"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark"
    setIsDark(!isDark)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", newTheme)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/", label: "Beranda", icon: "fas fa-home" },
    { href: "/profil", label: "Profile Desa", icon: "fas fa-info-circle" },
    { href: "/infografis", label: "Infografis", icon: "fas fa-chart-bar" },
    { href: "/layanan", label: "Layanan", icon: "fas fa-cogs" },
    { href: "/bumdes", label: "Bumdes", icon: "fas fa-store" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/assets/img/logo.png" alt="Logo Desa" className="w-10 h-10 rounded-full" />
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">Desa Slorok</span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-green-600 hover:border-green-600 transition-all duration-200"
          >
            <i className={isDark ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1"
          >
            <span className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <ul className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-green-600 bg-green-50 dark:bg-green-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className={`${item.icon} w-5`}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
