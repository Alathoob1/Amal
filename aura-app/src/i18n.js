import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav_home": "Home",
      "btn_login": "Login",
      "btn_logout": "Logout",
      "welcome_title": "A Safe Space for Growth",
      "welcome_desc": "AI-assisted pediatric psychology platform designed with sensory safety and empathy at its core.",
      "btn_get_started": "Get Started",
      "disclaimer": "This AI analysis provides supportive behavioral indicators, not a clinical diagnosis. All reports are pending human medical review.",
      
      "login_title": "Welcome Back",
      "login_email": "Email Address",
      "login_password": "Password",
      "btn_login_submit": "Sign In",
      "login_error": "Please enter a valid role email (parent@aura.com, dr@aura.com, admin@aura.com)",
      
      "pd_title": "Child Profile & Dashboard",
      "pd_upload": "Upload Drawing",
      "upload_title": "Upload a New Drawing",
      "upload_desc": "Drag and drop your child's drawing here. Max size 5MB.",
      "btn_upload": "Select File",
      
      "dd_title": "Doctor Review Dashboard",
      "queue_title": "Pending AI Drafts",
      "patient_name": "Patient: Leo M. (Age 6)",
      "ai_confidence": "AI Confidence: 85%",
      "btn_review": "Review & Edit Draft",
      
      "ad_title": "System Overview",
      "ad_stats_title": "Platform Health & Statistics",
      "ad_stat_active": "Active Users",
      "ad_stat_reports": "Reports Processed"
    }
  },
  ar: {
    translation: {
      "nav_home": "الرئيسية",
      "btn_login": "تسجيل الدخول",
      "btn_logout": "تسجيل خروج",
      "welcome_title": "مساحة آمنة للنمو",
      "welcome_desc": "منصة مساعدة نفسية للأطفال مدعومة بالذكاء الاصطناعي، مصممة بأعلى معايير الأمان الحسي والتعاطف.",
      "btn_get_started": "ابدأ الآن",
      "disclaimer": "يوفر تحليل الذكاء الاصطناعي مؤشرات سلوكية داعمة، وليس تشخيصًا سريريًا. تخضع جميع التقارير للمراجعة الطبية البشرية.",
      
      "login_title": "مرحباً بعودتك",
      "login_email": "البريد الإلكتروني",
      "login_password": "كلمة المرور",
      "btn_login_submit": "تسجيل الدخول",
      "login_error": "يرجى إدخال بريد إلكتروني صحيح (parent@aura.com, dr@aura.com, admin@aura.com)",
      
      "pd_title": "ملف الطفل ولوحة التحكم",
      "pd_upload": "رفع رسمة",
      "upload_title": "ارفع رسمة جديدة",
      "upload_desc": "اسحب وأفلت رسمة طفلك هنا. الحد الأقصى 5 ميجابايت.",
      "btn_upload": "اختيار ملف",
      
      "dd_title": "لوحة مراجعة الطبيب",
      "queue_title": "مسودات الذكاء الاصطناعي المعلقة",
      "patient_name": "المريض: ليو م. (العمر 6)",
      "ai_confidence": "ثقة الذكاء الاصطناعي: 85%",
      "btn_review": "مراجعة وتعديل المسودة",
      
      "ad_title": "نظرة عامة على النظام",
      "ad_stats_title": "صحة المنصة والإحصائيات",
      "ad_stat_active": "المستخدمين النشطين",
      "ad_stat_reports": "التقارير المعالجة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // Default to Arabic
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
