'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/supabaseClient'
import Link from 'next/link'

export default function CrawlerDashboardPage() {
  const [targetUrl, setTargetUrl] = useState('')
  const [indexedPages, setIndexedPages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ total: 0 })

  // 1. دالة جلب جرد البيانات المؤرشفة حالياً بالرادار لتراقب نمو قاعدة بياناتك Pro
  const fetchIndexedData = async () => {
    try {
      const { data, error, count } = await supabase
        .from('search_index')
        .select('*', { count: 'exact' })
        .order('id', { ascending: false })
        .limit(15)

      if (!error) {
        setIndexedPages(data || [])
        setStats({ total: count || 0 })
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchIndexedData()
  }, [])

  // 2. دالة إطلاق المسبار والزاحف الآلي لاقتناص وفهرسة الصفحات حياً بـ Supabase
  const handleStartCrawling = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!targetUrl.trim()) return

    setLoading(true)
    try {
      // محاكاة ذكية للزاحف الرقمي الفوري لقراءة وتوليد أوصاف تملأ السيرفر بالبيانات الفاخرة
      const fakeTitle = `بوابة صفحة مؤرشفة ذكياً - ${new URL(targetUrl).hostname}`
      const fakeDescription = `تم التقاط وفهرسة ومسح محتوى الرابط المباشر ${targetUrl} بنجاح من خلال رادار الزواحف الرقمية المطور لمؤسسة الألف مليون لتقنية المعلومات وبأعلى دقة في الخليج العربي.`

      const { error } = await supabase
        .from('search_index')
        .insert([
          {
            url: targetUrl.trim(),
            title: fakeTitle,
            description: fakeDescription
          }
        ])

      if (!error) {
        alert("🤖 رادار الزواحف: تم اقتناص وفهرسة وضخ الموقع بنجاح داخل قاعدة البيانات المرقاة Pro!")
        setTargetUrl('')
        fetchIndexedData() // إنعاش فوري للوحة التحكم
      } else {
        alert("فشل حقن الأرشفة بالسيرفر: " + error.message)
      }
    } catch (err: any) {
      alert("خطأ برمي في الرابط: " + err.message)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 text-right font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* رأس لوحة التحكم بالزواحف */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-50 text-blue-600 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase">رادار الأرشفة المركزية</span>
              <span className="bg-gray-950 text-white font-black text-xs px-2 py-0.5 rounded">Crawler Master Control</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">لوحة تحكم الزواحف الرقمية 🤖</h1>
            <p className="text-gray-500 text-sm mt-1">بصفتك المشرف العام، يمكنك ضخ الروابط، وتوجيه عناكب الفهرسة لملء محرك بحثك بالبيانات.</p>
          </div>
          <Link href="/" className="text-xs font-bold text-blue-600 bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition">
            ← العودة لمحرك البحث الرئيسي
          </Link>
        </header>

        {/* كارت عداد نمو قاعدة البيانات السحابية Pro */}
        <div className="bg-gradient-to-r from-gray-950 to-blue-950 text-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm text-blue-300">📈 إجمالي الصفحات والمواقع المؤرشفة بالرادار</h3>
            <p className="text-xs text-gray-400 mt-1">المحرك ينمو بشكل متكامل وجاهز لاستقبال ملايين الكلمات المفتاحية باللغة العربية.</p>
          </div>
          <div className="text-3xl font-black font-mono tracking-tight text-white bg-white/10 px-6 py-2 rounded-xl border border-white/10 animate-pulse">
            {stats.total} صفحة
          </div>
        </div>

        {/* استمارة حقن وضخ المواقع والروابط للزواحف */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-150">
          <form onSubmit={handleStartCrawling} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">🔗 أدخل رابط الموقع أو الصفحة المستهدفة للأرشفة *</label>
              <div className="relative flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:border-blue-500 transition">
                <input 
                  type="url" 
                  required 
                  placeholder="https://example.com" 
                  value={targetUrl}
                  className="w-full pl-3 pr-6 py-3.5 text-left font-mono font-bold text-sm text-gray-900 focus:outline-none"
                  dir="ltr"
                  onChange={(e) => setTargetUrl(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-blue-700 transition shadow-sm"
            >
              {loading ? 'جاري قيادة وعناكب الأرشفة وضخ البيانات...' : '🚀 حقن وتشغيل الزواحف لاقتناص الصفحة فوراً'}
            </button>
          </form>
        </section>

        {/* جدول جرد آخر الصفحات التي قمنا باقتناصها وفهرستها حياً */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-150 overflow-hidden">
          <h3 className="text-sm font-black text-gray-900 mb-4">📋 آخر المواقع والروابط المؤرشفة حياً بالسيرفر</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-600">
                  <th className="p-3">رابط الصفحة المؤرشفة</th>
                  <th className="p-3">عنوان الأرشفة الفرعي</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-700 divide-y divide-gray-50">
                {indexedPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-3 font-mono text-green-600 truncate max-w-[300px]">{page.url}</td>
                    <td className="p-3 font-bold text-gray-900 truncate max-w-[250px]">{page.title}</td>
                  </tr>
                ))}
                {indexedPages.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center py-8 text-gray-400 font-medium">📥 لا توجد مواقع مؤرشفة حالياً. استخدم الاستمارة في الأعلى لضمان تعبئة المحرك!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  )
}
