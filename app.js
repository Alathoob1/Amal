// Localization Data
const translations = {
  en: {
    nav_home: "Home",
    nav_parent: "Parent Dashboard",
    nav_doctor: "Doctor Dashboard",
    nav_admin: "Admin Dashboard",
    btn_login: "Login",
    btn_logout: "Logout",
    role_parent_header: "| Parent Portal",
    role_doctor_header: "| Doctor Portal",
    role_admin_header: "| System Admin",
    welcome_title: "A Safe Space for Growth",
    welcome_desc: "AI-assisted pediatric psychology platform designed with sensory safety and empathy at its core.",
    btn_get_started: "Get Started",
    disclaimer: "This AI analysis provides supportive behavioral indicators, not a clinical diagnosis. All reports are pending human medical review.",
    
    // Parent Dashboard
    pd_title: "Child Profile & Dashboard",
    pd_upload: "Upload Drawing",
    pd_reports: "My Reports",
    pd_community: "Community Support",
    upload_title: "Upload a New Drawing",
    upload_desc: "Drag and drop your child's drawing here, or click to browse. Max size 5MB.",
    btn_upload: "Select File",
    
    // Doctor Dashboard
    dd_title: "Doctor Review Dashboard",
    dd_queue: "Pending Reviews (3)",
    dd_patients: "My Patients",
    dd_history: "Review History",
    queue_title: "Pending AI Drafts",
    patient_name: "Patient: Leo M. (Age 6)",
    ai_confidence: "AI Confidence: 85%",
    btn_review: "Review & Edit Draft",
    patient_name_2: "Patient: Sara A. (Age 9)",
    ai_confidence_2: "AI Confidence: 92%",
    uploaded_time_2: "Uploaded: 5 hours ago",
    
    // Admin Dashboard
    ad_title: "System Overview",
    ad_users: "User Management",
    ad_moderation: "Community Moderation",
    ad_logs: "HIPAA Audit Logs",
    ad_stats_title: "Platform Health & Statistics",
    ad_stat_active: "Active Users",
    ad_stat_reports: "Reports Processed",
    ad_stat_alerts: "Flagged Posts",
    ad_recent_logs: "Recent Audit Logs",
    
    // Login
    login_title: "Welcome Back",
    login_email: "Email Address",
    login_password: "Password",
    btn_login_submit: "Sign In",
    login_forgot: "Forgot password?",
    
    // Modal
    modal_title: "Uploading Drawing...",
    modal_desc: "Please wait while we securely process the image.",
    modal_success: "Upload Complete! AI analysis is starting..."
  },
  ar: {
    nav_home: "الرئيسية",
    nav_parent: "لوحة تحكم الأهل",
    nav_doctor: "لوحة تحكم الطبيب",
    nav_admin: "لوحة تحكم الإدارة",
    btn_login: "تسجيل الدخول",
    btn_logout: "تسجيل الخروج",
    role_parent_header: "│ بوابة أولياء الأمور",
    role_doctor_header: "│ بوابة الطبيب",
    role_admin_header: "│ بوابة الإدارة",
    welcome_title: "مساحة آمنة للنمو",
    welcome_desc: "منصة مساعدة نفسية للأطفال مدعومة بالذكاء الاصطناعي، مصممة بأعلى معايير الأمان الحسي والتعاطف.",
    btn_get_started: "ابدأ الآن",
    disclaimer: "يوفر تحليل الذكاء الاصطناعي مؤشرات سلوكية داعمة، وليس تشخيصًا سريريًا. تخضع جميع التقارير للمراجعة الطبية البشرية.",
    
    // Parent Dashboard
    pd_title: "ملف الطفل ولوحة التحكم",
    pd_upload: "رفع رسمة",
    pd_reports: "تقاريري",
    pd_community: "مجتمع الدعم",
    upload_title: "ارفع رسمة جديدة",
    upload_desc: "اسحب وأفلت رسمة طفلك هنا، أو انقر للاستعراض. الحد الأقصى 5 ميجابايت.",
    btn_upload: "اختيار ملف",
    
    // Doctor Dashboard
    dd_title: "لوحة مراجعة الطبيب",
    dd_queue: "المراجعات المعلقة (3)",
    dd_patients: "مرضاي",
    dd_history: "سجل المراجعات",
    queue_title: "مسودات الذكاء الاصطناعي المعلقة",
    patient_name: "المريض: ليو م. (العمر 6)",
    ai_confidence: "ثقة الذكاء الاصطناعي: 85%",
    btn_review: "مراجعة وتعديل المسودة",
    patient_name_2: "المريض: سارة أ. (العمر 9)",
    ai_confidence_2: "ثقة الذكاء الاصطناعي: 92%",
    uploaded_time_2: "تم الرفع: منذ 5 ساعات",
    
    // Admin Dashboard
    ad_title: "لوحة المتابعة",
    ad_users: "إدارة المستخدمين",
    ad_moderation: "إشراف المجتمع",
    ad_logs: "سجلات تدقيق HIPAA",
    ad_stats_title: "صحة المنصة والإحصائيات",
    ad_stat_active: "المستخدمين النشطين",
    ad_stat_reports: "التقارير المعالجة",
    ad_stat_alerts: "المنشورات المبلغ عنها",
    ad_recent_logs: "سجلات التدقيق الحديثة",
    
    // Login
    login_title: "مرحباً بعودتك",
    login_email: "البريد الإلكتروني",
    login_password: "كلمة المرور",
    btn_login_submit: "تسجيل الدخول",
    login_forgot: "هل نسيت كلمة المرور؟",
    
    // Modal
    modal_title: "جاري رفع الرسمة...",
    modal_desc: "يرجى الانتظار بينما نقوم بمعالجة الصورة بشكل آمن.",
    modal_success: "اكتمل الرفع! سيبدأ تحليل الذكاء الاصطناعي..."
  }
};

let currentLang = 'ar'; // Default to Arabic based on user prompt

function setLanguage(lang) {
  currentLang = lang;
  
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

function toggleLanguage() {
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  setLanguage(newLang);
}

// Modal Logic
function openUploadModal() {
  const modal = document.getElementById('uploadModal');
  const progressBar = document.getElementById('progressBar');
  const modalTitle = document.getElementById('modalTitle');
  
  if (modal) {
    modalTitle.setAttribute('data-i18n', 'modal_title');
    modalTitle.textContent = translations[currentLang]['modal_title'];
    
    modal.classList.add('active');
    
    // Reset progress bar
    progressBar.style.width = '0%';
    
    // Simulate upload progress
    setTimeout(() => {
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        modalTitle.setAttribute('data-i18n', 'modal_success');
        modalTitle.textContent = translations[currentLang]['modal_success'];
        
        setTimeout(() => {
          modal.classList.remove('active');
        }, 1500);
      }, 2000);
    }, 100);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }
  
  const uploadBtn = document.getElementById('uploadAction');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', openUploadModal);
  }
});
