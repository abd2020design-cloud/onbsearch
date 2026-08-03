'use client'

import { useState } from 'react'
import { supabase } from '../../supabaseClient' // استدعاء عقل سوبابيز المباشر

export default function AdminIndexerPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    url_to_index: '',
    custom_title: '',
    custom_desc: '',
    category_type: 'web',
    country: 'ALL'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.url_to_index || !formData.custom_title) {
      alert('يرجى ملء الحقول الإلزامية الرابط والعنوان!')
      return
    }

    setLoading(true)

    try {
      // 🌟 خطة إنقاذ خارقة: حقن وأرشفة البيانات مباشرة بداخل Supabase Pro وتخطي الـ API المعلق!
      const { data, error } = await supabase
        .from('onb_web_index')
        .insert([
          {
            url: formData.url_to_index,
            title: formData.custom_title,
            description: formData.custom_desc || '',
            category: formData.category_type || 'web',
            country_code: formData.country || 'ALL'
          }
        ])
        .select()

      setLoading(false)

      if (!error) {
        alert('🚀 نجاح خارق ومباشر! تم سحب وتصنيف موقعك بداخل كشافات البحث الفورية بنجاح التخطي السحابي.')
        setFormData({
          url_to_index: '',
          custom_title: '',
          custom_desc: '',
          category_type: 'web',
          country: 'ALL'
        })
      } else {
        // حماية البيانات مؤرشفة مسبقاً
        if (error.code === '23505') {
          alert('🔄 هذا الرابط مؤرشف بالفعل في محرك onbsearch وتحديث كشافاته تلقائي.')
        } else {
          alert(`🚨 خطأ سوبابيز: ${error.message}`)
        }
      }

    } catch (err: any) {
      setLoading(false)
      alert(`🚨 خطأ في الاتصال بالشبكة: ${err.message}`)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 text-right" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
        
        <header className="mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-50 text-red-600 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase">الأدمن فقط</span>
            <span className="bg-gray-950 text-white font-black text-xs px-2 py-0.5 rounded">1B Direct Injector</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900">لوحة تحكم كشافات الأرشفة والزواحف 🤖</h1>
          <p className="text-gray-500 text-xs mt-1">بصفتك المالك، يمكنك حقن وأرشفة صفحات الويب، السلع، العقارات حياً داخل محرك بحث onbsearch.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">الرابط المطلق للموقع (URL) *</label>
            <input 
              type="url" 
              required 
              placeholder="https://example.com" 
              value={formData.url_to_index}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-left font-mono text-sm" 
              dir="ltr"
              onChange={(e) => setFormData({ ...formData, url_to_index: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">عنوان الصفحة أو السلعة في البحث *</label>
            <input 
              type="text" 
              required 
              placeholder="مثال: شقة فاخرة للبيع حي الياسمين الرياض" 
              value={formData.custom_title}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-right font-medium text-sm" 
              onChange={(e) => setFormData({ ...formData, custom_title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">تصنيف البيانات (مكان الأرشفة)</label>
              <select 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-right font-semibold text-sm bg-white"
                value={formData.category_type}
                onChange={(e) => setFormData({ ...formData, category_type: e.target.value })}
              >
                <option value="web">🌍 الويب العام (بحث عام)</option>
                <option value="cars">🏎️ سوق السيارات والمزادات</option>
                <option value="realestate">🏢 العقارات والأراضي</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">النطاق الجغرافي للدولة</label>
              <select 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-right font-semibold text-sm bg-white"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="ALL">🌍 كل العالم / عام</option>
                <option value="SA">🇸🇦 المملكة العربية السعودية</option>
                <option value="EG">🇪🇬 جمهورية مصر العربية</option>
                <option value="AE">🇦🇪 الإمارات العربية المتحدة</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">المحتوى النصي الكامل والأوصاف المفتاحية</label>
            <textarea 
              rows={5} 
              placeholder="انسخ محتوى المقال أو تفاصيل العقار أو السلعة بالكامل هنا. سيقوم محرك البحث بفرز هذه النصوص بالكامل باللغة العربية وتأمين البحث بها..." 
              value={formData.custom_desc}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-right text-xs leading-relaxed" 
              onChange={(e) => setFormData({ ...formData, custom_desc: e.target.value })}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gray-950 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition disabled:bg-gray-400 text-sm shadow-sm"
          >
            {loading ? 'جاري ضخ البيانات حياً بالسيرفر المرقّى...' : 'تشغيل الزاحف وحقن البيانات فوراً ←'}
          </button>
        </form>

      </div>
    </main>
  )
}

