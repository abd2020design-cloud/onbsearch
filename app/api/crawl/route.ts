import { NextResponse } from 'next/server'
import { supabase } from '@/supabaseClient'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url_to_index, custom_title, custom_desc, category_type, country } = body

    if (!url_to_index || !custom_title) {
      return NextResponse.json({ error: 'الرابط والعنوان حقول إلزامية للأرشفة!' }, { status: 400 })
    }

    // حقن الموقع المختار داخل جدول قاعدة البيانات المرقاة Pro
    const { data, error } = await supabase
      .from('onb_web_index')
      .insert([
        {
          url: url_to_index,
          title: custom_title,
          description: custom_desc || '',
          category: category_type || 'web',
          country_code: country || 'ALL'
        }
      ])
      .select()

    if (error) {
      // إذا كان الرابط مضافاً مسبقاً، يمنع انهيار السيرفر ويعلمك بذلك
      if (error.code === '23505') {
        return NextResponse.json({ message: '🔄 هذا الرابط مؤرشف بالفعل في محرك onbsearch وتحديث كشافاته تلقائي.' }, { status: 200 })
      }
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      message: '🚀 نجاح الأرشفة! تم سحب وتصنيف الموقع بداخل كشافات البحث بنجاح.',
      indexed_data: data 
    })

  } catch (err: any) {
    console.error("🚨 خطأ الأرشفة السحابية:", err.message)
    return NextResponse.json({ error: 'فشل السيرفر في معالجة البيانات: ' + err.message }, { status: 500 })
  }
}
