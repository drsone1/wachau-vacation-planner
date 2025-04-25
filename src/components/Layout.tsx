import { useTranslation } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }) {
  const t = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                {t('site.title')}
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                {t('nav.about')}
              </Link>
              <Link href="/planner" className="text-gray-700 hover:text-blue-600">
                {t('nav.planner')}
              </Link>
              <Link href="/accommodations" className="text-gray-700 hover:text-blue-600">
                {t('nav.accommodations')}
              </Link>
              <Link href="/dining" className="text-gray-700 hover:text-blue-600">
                {t('nav.dining')}
              </Link>
              <Link href="/activities" className="text-gray-700 hover:text-blue-600">
                {t('nav.activities')}
              </Link>
              <Link href="/bike-rental" className="text-gray-700 hover:text-blue-600">
                {t('nav.bikeRental')}
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="hidden md:block">
                <Link 
                  href="/" 
                  locale="en"
                  className="px-2 py-1 rounded bg-blue-100 text-blue-600"
                >
                  EN
                </Link>
                <Link 
                  href="/" 
                  locale="de"
                  className="px-2 py-1 rounded text-gray-600"
                >
                  DE
                </Link>
              </div>
              
              {/* My Plan Button */}
              <Link 
                href="/my-plan" 
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {t('nav.myPlan')}
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  {t('nav.home')}
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">
                  {t('nav.about')}
                </Link>
                <Link href="/planner" className="text-gray-700 hover:text-blue-600">
                  {t('nav.planner')}
                </Link>
                <Link href="/accommodations" className="text-gray-700 hover:text-blue-600">
                  {t('nav.accommodations')}
                </Link>
                <Link href="/dining" className="text-gray-700 hover:text-blue-600">
                  {t('nav.dining')}
                </Link>
                <Link href="/activities" className="text-gray-700 hover:text-blue-600">
                  {t('nav.activities')}
                </Link>
                <Link href="/bike-rental" className="text-gray-700 hover:text-blue-600">
                  {t('nav.bikeRental')}
                </Link>
                <Link href="/my-plan" className="text-gray-700 hover:text-blue-600">
                  {t('nav.myPlan')}
                </Link>
                
                {/* Mobile Language Selector */}
                <div className="flex space-x-2 pt-2">
                  <Link 
                    href="/" 
                    locale="en"
                    className="px-2 py-1 rounded bg-blue-100 text-blue-600"
                  >
                    EN
                  </Link>
                  <Link 
                    href="/" 
                    locale="de"
                    className="px-2 py-1 rounded text-gray-600"
                  >
                    DE
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('site.title')}</h3>
              <p className="text-gray-400">{t('site.description')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.about')}</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">{t('nav.about')}</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">{t('nav.contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('nav.planner')}</h3>
              <ul className="space-y-2">
                <li><Link href="/accommodations" className="text-gray-400 hover:text-white">{t('nav.accommodations')}</Link></li>
                <li><Link href="/dining" className="text-gray-400 hover:text-white">{t('nav.dining')}</Link></li>
                <li><Link href="/activities" className="text-gray-400 hover:text-white">{t('nav.activities')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.terms')}</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">{t('footer.privacy')}</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
