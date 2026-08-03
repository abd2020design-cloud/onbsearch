'use client'

import { useState } from 'react'

export default function OnbSearchHome() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('web') // التصفية الذكية الحية (ويب، عقارات، سيارات)

  const handleMasterSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // نظام التوجيه والفلترة الذكي لمحرك بحث onbsearch
    if (activeTab === 'web') {
      window.open(`https://google.com{encodeURIComponent(searchQuery)}`, '_blank')
    } else if (activeTab === 'cars') {
      // توجيه مستهدف لإنعاش موقع السيارات والمزادات الخاص بك مجاناً!
      window.open(`https://onbcars.com{encodeURIComponent(searchQuery)}`, '_blank')
    } else if (activeTab === 'realestate') {
      alert(`🔍 جاري البحث عن (${searchQuery}) داخل منصة العقارات الذكية قريباً...`)
    }
  }

  return (
    <main className="min-h-screen bg-white text-right flex flex-col justify-between" dir="rtl">
      
      {/* القائمة العلوية البسيطة للمحرك */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-2 font-bold text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600">
          🌐 شبكة منصات الألف مليون الإقليمية
        </div>
        <div className="flex gap-4 text-xs font-semibold text-gray-500">
          <a href="https://onbcars.com" target="_blank" className="hover:text-blue-600 transition">🏎️ سوق السيارات</a>
          <a href="https://onbcars.com/auctions" target="_blank" className="hover:text-blue-600 transition">🔨 المزادات الحية</a>
        </div>
      </header>

      {/* الجسد المركزي لمحرك البحث (العملاق البسيط) */}
      <div className="w-full max-w-2xl mx-auto px-4 py-20 flex flex-col items-center justify-center flex-1 space-y-8">
        
        {/* براند الأيقونة الكبرى والمربع الفاخر 1B الخاص بمؤسستك */}
        <div className="flex flex-col items-center justify-center gap-3 animate-fade-in">
          <div className="bg-gray-950 text-white font-black text-5xl w-24 h-24 rounded-[28px] flex items-center justify-center tracking-tighter shadow-md border border-gray-800 transition duration-300 transform hover:scale-105">
            1B
          </div>
          <h1 className="text-4xl font-black text-gray-950 tracking-tight mt-2">
            onb<span className="text-blue-605 font-extrabold text-blue-600">search</span>
          </h1>
          <p className="text-gray-400 text-xs font-medium">البوابة الإقليمية الفائقة للبحث الذكي وأتمتة الخدمات</p>
        </div>

        {/* أزرار التصفية العلوية لشريط البحث (الفصل بين القطاعات المدمجة) */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-600 shadow-inner">
          <button onClick={() => setActiveTab('web')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'web' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-900'}`}>🔍 بحث الويب العام</button>
          <button onClick={() => setActiveTab('cars')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'cars' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-900'}`}>🏎️ السيارات والمزادات</button>
          <button onClick={() => setActiveTab('realestate')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'realestate' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-900'}`}>🏢 العقارات والأراضي</button>
        </div>

        {/* شريط بحث onbsearch الخارق */}
        <form onSubmit={handleMasterSearch} className="w-full relative max-w-xl">
          <input 
            type="text" 
            placeholder={activeTab === 'web' ? 'ابحث في الويب العربي والعالمي بذكاء...' : activeTab === 'cars' ? 'ابحث عن ماركة سيارة، موديل، أو مزاد نشط...' : 'ابحث عن شقق، أراضي، أو فلل للبيع...'}
            value={searchQuery}
            className="w-full bg-white border border-gray-250 rounded-2xl pl-16 pr-6 py-4 text-right font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:shadow-md transition"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute left-3 top-2.5 bg-gray-950 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-blue-600 transition shadow-sm"
          >
            بحث 🚀
          </button>
        </form>

      </div>

      {/* تذييل الصفحة (الخدمات والحماية القانونية للمؤسسة) */}
      <footer className="bg-gray-50 border-t border-gray-100 py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
        <div>🔒 جميع حقوق الملكية الفكرية والأنظمة محفوظة لمؤسستك الرسمية لتقنية المعلومات © 2026</div>
        <div className="flex gap-4">
          <span>شروط الخدمة</span>
          <span>سياسة الخصوصية والأمان</span>
          <span className="text-gray-500 font-bold">بواسطة Node 1B Pro</span>
        </div>
      </footer>

    </main>
  )
}
