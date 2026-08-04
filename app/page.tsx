'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function OnbSearchHome() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('web')
  const [results, setResults] = useState<any[]>([])
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // نظام جلب الاقتراحات التلقائية الحية أثناء الكتابة
  useEffect(() => {
    if (!searchQuery.trim() || activeTab === 'web') {
      setSuggestions([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from('onb_web_index')
          .select('title')
          .eq('category', activeTab)
          .ilike('title', '%' + searchQuery + '%')
          .limit(5)

        if (!error && data) {
          const uniqueTitles = Array.from(new Set(data.map((item: any) => item.title)))
          setSuggestions(uniqueTitles)
        }
      } catch (err) {
        console.error(err)
      }
    }, 250)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, activeTab])

  // 🌟 دالة البحث الفائقة والتقليدية الخالصة - حظر كامل لأي أكواد تشويه
  const handleMasterSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setSearched(true)
    setSuggestions([])

    // توجيه تقليدي مبسط جداً خالي تماماً من الأقواس المعقدة
    if (activeTab === 'web') {
      setLoading(false)
      const cleanWord = searchQuery.trim()
      window.open("https://google.com" + cleanWord, '_blank')
      return
    }

    // البحث داخل قاعدة البيانات للأقسام الأخرى
    try {
      const { data, error } = await supabase
        .from('onb_web_index')
        .select('*')
        .eq('category', activeTab)
        .textSearch('search_vector', searchQuery, { config: 'arabic', type: 'plain' })

      if (!error && data) {
        setResults(data)
      } else {
        setResults([])
      }
    } catch (err) {
      setResults([])
    }
    
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white text-right flex flex-col justify-between" dir="rtl">
      
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-2 font-bold text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600">
          🌐 شبكة منصات الألف مليون الإقليمية
        </div>
        <div className="flex gap-4 text-xs font-semibold text-gray-500">
          <a href="https://onbcars.com" target="_blank" className="hover:text-blue-600 transition" rel="noreferrer">🏎️ سوق السيارات</a>
          <a href="https://onbcars.com/auctions" target="_blank" className="hover:text-blue-600 transition" rel="noreferrer">🔨 المزادات الحية</a>
        </div>
      </header>

      <div className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center flex-1 space-y-8">
        
        {!searched && (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="bg-gray-950 text-white font-black text-5xl w-24 h-24 rounded-[28px] flex items-center justify-center border border-gray-800 shadow-md">
              1B
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-2">
              onb<span className="text-blue-600 font-extrabold">search</span>
            </h1>
            <p className="text-gray-400 text-xs font-medium">محرك البحث الإقليمي الفائق لأتمتة البيانات والقطاعات</p>
          </div>
        )}

        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl text-xs font-bold text-gray-600 shadow-inner">
          <button type="button" onClick={() => { setActiveTab('web'); setResults([]); setSearched(false); }} className={`px-4 py-2 rounded-lg transition ${activeTab === 'web' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-900'}`}>🔍 الويب العام</button>
          <button type="button" onClick={() => { setActiveTab('cars'); setResults([]); setSearched(false); }} className={`px-4 py-2 rounded-lg transition ${activeTab === 'cars' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-900'}`}>🏎️ السيارات</button>
          <button type="button" onClick={() => { setActiveTab('realestate'); setResults([]); setSearched(false); }} className={`px-4 py-2 rounded-lg transition ${activeTab === 'realestate' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-900'}`}>🏢 العقارات</button>
        </div>

        <div className="w-full max-w-xl relative">
          <form onSubmit={handleMasterSearch} className="w-full relative">
            <input 
              type="text" 
              placeholder="اكتب ما تبحث عنه باللغة العربية..."
              value={searchQuery}
              className="w-full bg-white border border-gray-250 rounded-2xl pl-16 pr-6 py-4 text-right font-semibold text-gray-900 focus:outline-none focus:border-blue-600 focus:shadow-md transition shadow-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute left-3 top-2.5 bg-gray-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-blue-600 transition">
              بحث 🚀
            </button>
          </form>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-150 rounded-2xl mt-2 shadow-lg overflow-hidden z-50 text-right">
              {suggestions.map((sugar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSearchQuery(sugar)
                    setSuggestions([])
                  }}
                  className="w-full text-right px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50 last:border-0 flex items-center gap-2 transition"
                >
                  <span>🕒</span>
                  <span>{sugar}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <section className="w-full max-w-xl space-y-6 pt-6">
          {loading && <p className="text-center text-sm text-gray-500 animate-pulse">جاري جلب وفحص البيانات بالذكاء الاصطناعي...</p>}
          
          {results.map((res) => (
            <div key={res.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition text-right">
              <a href={res.url} target="_blank" className="text-xs text-green-700 font-mono block mb-1 truncate" rel="noreferrer">{res.url}</a>
              <a href={res.url} target="_blank" className="text-lg font-bold text-blue-600 hover:underline" rel="noreferrer">{res.title}</a>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">{res.description}</p>
            </div>
          ))}

          {searched && results.length === 0 && !loading && activeTab !== 'web' && (
            <p className="text-center text-xs text-gray-400 bg-gray-50 p-6 rounded-xl border">📥 لم نجد نتائج مطابقة تماماً في كشافاتنا الحالية لبلدك. جرب كلمات أخرى!</p>
          )}
        </section>

      </div>

      <footer className="bg-gray-50 border-t border-gray-100 py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-gray-400">
        <div>🔒 جميع حقوق الملكية الفكرية والأنظمة محفوظة لمؤسستك الرسمية لتقنية المعلومات © 2026</div>
        <div className="flex gap-4 font-bold text-gray-500">Node 1B Pro Powered</div>
      </footer>

    </main>
  )
}




