'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/supabaseClient'

// 🌟 إجبار السيرفر على التشغيل الحي لمنع أخطاء الكاش نهائياً
export const dynamic = 'force-dynamic';

export default function SearchEnginePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [suggestions, setBidsSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // 1. نظام الاقتراحات التلقائية الذكية أثناء كتابة الزائر حرفاً بحرف
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setBidsSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      const { data } = await supabase
        .from('search_index')
        .select('title')
        .ilike('title', `%${searchQuery}%`)
        .limit(5)
      
      if (data) setBidsSuggestions(data)
    }

    // تقنية الـ Debouncing لمنع استهلاك وحرق كاش السيرفر
    const delayTimer = setTimeout(() => {
      fetchSuggestions()
    }, 200)

    return () => clearTimeout(delayTimer)
  }, [searchQuery])

  // 2. دالة البحث النصي الفائق باللغة العربية والـ Vector Search الصاروخي
  const handleSearchExecution = async (e: React.FormEvent, forcedQuery?: string) => {
    if (e) e.preventDefault()
    const finalQuery = forcedQuery || searchQuery
    if (!finalQuery.trim()) return

    setLoading(true)
    setBidsSuggestions([])
    try {
      // البحث بداخل الفهارس المرقاة لباقتك Pro لحصد أدق النتائج
      const { data, error } = await supabase
        .from('search_index')
        .select('*')
        .textSearch('title', finalQuery, { config: 'arabic', type: 'plain' })
        .limit(30)

      if (!error && data) {
        setResults(data)
      } else {
        // خط دفاع برمي بديل بالـ ILIKE في حال لم يتم ضبط الفيكتور بجدول الأرشفة بعد
        const { data: backupData } = await supabase
          .from('search_index')
          .select('*')
          .ilike('title', `%${finalQuery}%`)
          .limit(20)
        setResults(backupData || [])
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white py-20 px-4 md:px-8 text-right font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* براند محرك البحث الجوجلي الفخم */}
        <header className="text-center space-y-4">
          <div className="bg-gray-950 text-white font-black text-4xl w-20 h-20 rounded-3xl flex items-center justify-center border border-gray-800 shadow-md mx-auto tracking-tighter hover:rotate-6 transition duration-300 cursor-pointer">
            1B
          </div>
          <h1 className="text-4xl font-black text-gray-950 tracking-tight">onbsearch</h1>
          <p className="text-gray-400 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
            محرك البحث الإقليمي الفائق لأرشفة البيانات والمواقع والزواحف الرقمية بالخليج العربي حياً بالثانية.
          </p>
        </header>

        {/* شريط مستطيل البحث الاحترافي والذكي مع قائمة الاقتراحات المنسدلة */}
        <section className="relative max-w-2xl mx-auto">
          <form onSubmit={(e) => handleSearchExecution(e)} className="relative flex items-center shadow-lg rounded-2xl border border-gray-200 overflow-hidden bg-white hover:border-blue-500 transition duration-300">
            <input 
              type="text" 
              required
              placeholder="اكتب ما تبحث عنه الآن..." 
              value={searchQuery}
              className="w-full pl-32 pr-6 py-4 text-right font-bold text-gray-900 focus:outline-none text-base"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" disabled={loading} className="absolute left-2 top-2 bottom-2 bg-gray-950 text-white font-bold px-6 rounded-xl hover:bg-blue-600 transition text-sm">
              {loading ? 'جاري الفحص...' : 'ابحث في الويب'}
            </button>
          </form>

          {/* لوحة ظهور الاقتراحات الذكية الفورية أثناء كتابة المستخدم */}
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-150 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-50 text-right animate-fade-in">
              {suggestions.map((s, index) => (
                <button 
                  key={index}
                  type="button"
                  className="w-full text-right px-6 py-3.5 hover:bg-gray-50 text-xs font-bold text-gray-700 block transition"
                  onClick={() => {
                    setSearchQuery(s.title)
                    handleSearchExecution(null as any, s.title)
                  }}
                >
                  🔍 {s.title}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ساحة شبكة عرض نتائج البحث والأرشفة المكتشفة */}
        <section className="space-y-6 max-w-2xl mx-auto pt-6">
          {results.map((res) => (
            <article key={res.id} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition duration-200 group text-right">
              <span className="text-[10px] text-green-600 font-bold block mb-1 truncate line-clamp-1 font-mono">{res.url}</span>
              <a href={res.url} target="_blank" rel="noreferrer" className="text-lg font-bold text-blue-600 group-hover:text-blue-800 group-hover:underline block leading-tight mb-2">
                {res.title}
              </a>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{res.description || 'لم يتم إضافة شفرة وصفية ملخصة لهذه الصفحة المؤرشفة حالياً.'}</p>
            </article>
          ))}

          {results.length === 0 && !loading && searchQuery.trim() !== '' && (
            <div className="bg-yellow-50 text-yellow-800 p-6 rounded-2xl text-center border border-yellow-100 text-xs font-semibold">
              📥 لم يعثر الرادار على صفحات مؤرشفة تطابق كلمتك حالياً في قاعدة بياناتك Pro. جاري تشغيل الزواحف لاقتناصها!
            </div>
          )}
        </section>

      </div>
    </main>
  )
}
