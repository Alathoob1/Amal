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
    
    // Parent Dashboard Navigation
    nav_dashboard: "Dashboard",
    nav_profile: "Child Profile",
    nav_upload: "Upload Drawing",
    nav_reports: "AI Reports",
    nav_progress: "Progress Tracking",
    nav_appointments: "Appointments",
    nav_chat: "Chat with Doctor",
    nav_community: "Parent Community",
    nav_resources: "Educational Resources",
    nav_notifications: "Notifications",
    nav_settings: "Settings",
    nav_emergency: "Emergency Support",

    // Dashboard Items
    db_summary: "Child Summary",
    db_name: "Name",
    db_age: "Age",
    db_diagnosis: "Diagnosis Level",
    db_doctor: "Assigned Doctor",
    db_reports: "Latest Reports",
    db_appointments: "Upcoming Appointments",
    db_activity: "Recent Activity",
    db_quick: "Quick Access",
    db_years: "Years",
    db_level: "Level",

    // Profile Items
    prof_title: "Child Medical & Behavioral Profile",
    prof_personal: "Personal Information",
    prof_gender: "Gender",
    prof_com: "Communication Style",
    prof_history: "Behavioral History",
    prof_triggers: "Emotional Triggers",
    prof_notes: "Medical Notes",
    prof_therapy: "Therapy History",
    prof_med: "Medications",
    prof_allergies: "Allergies",
    prof_emergency: "Emergency Contact",
    prof_save: "Save Profile Settings",
    prof_edit: "Edit Profile Info",

    // Upload Items
    upload_title: "Upload a New Drawing",
    upload_desc: "Drag and drop your child's drawing here, or click to browse. Max size 5MB.",
    btn_upload: "Select File",
    upload_history: "Drawing Submission Log",
    upload_step1: "Upload",
    upload_step2: "AI Analysis",
    upload_step3: "Doctor Review",
    upload_step4: "Approved",
    upload_status: "Current Status",

    // Reports Items
    rep_title: "Doctor-Approved AI Reports",
    rep_unapproved: "This report is currently undergoing AI analysis or clinical doctor verification.",
    rep_summary: "AI Cognitive Summary",
    rep_emo: "Emotional Development Indicators",
    rep_beh: "Behavioral Patterns Identified",
    rep_conf: "AI Model Confidence Score",
    rep_doc: "Clinical Supervisor Remarks",
    rep_rec: "Actionable Recommendations",
    rep_download: "Download PDF Copy",
    rep_disclaimer: "AI provides supportive observations only and is not a final diagnosis. All reports are reviewed by a licensed clinician.",

    // Progress Items
    prog_title: "Child Progress Analytics",
    prog_com: "Communication Skills",
    prog_beh: "Behavioral Regulation",
    prog_emo: "Emotional Stability",
    prog_ther: "Therapy Engagement",

    // Appointments Items
    apt_title: "Appointment Scheduler",
    apt_book: "Book New Appointment",
    apt_reschedule: "Reschedule",
    apt_cancel: "Cancel",
    apt_history: "Appointment History",
    apt_date: "Date",
    apt_time: "Time",
    apt_type: "Session Type",
    apt_status: "Status",
    apt_action: "Actions",

    // Chat Items
    chat_title: "Secure Messaging with Dr. Ahmed",
    chat_placeholder: "Type a message or attach a file...",
    chat_send: "Send",
    chat_attachment: "Attachment",
    chat_voice: "Voice Note",

    // Community Items
    comm_title: "Parent Communities & Support Groups",
    comm_post: "Create Community Post",
    comm_comment: "Comment",
    comm_anon: "Post Anonymously",
    comm_placeholder: "Share your experience or ask a question...",

    // Resources Items
    res_title: "Educational Resources Library",
    res_filter_age: "Filter by Child Age",
    res_filter_level: "Filter by Autism Level",
    res_filter_topic: "Filter by Topic",

    // Notifications Items
    notif_title: "Notification Center",
    notif_clear: "Clear All Notifications",
    notif_mark: "Mark All as Read",

    // Settings Items
    set_title: "Account Settings",
    set_profile: "Parent Profile",
    set_password: "Change Password",
    set_lang: "Language & RTL Preferences",
    set_notif: "Notification Prefs",
    set_privacy: "Privacy Controls",
    set_security: "Security Logs",

    // Emergency Items
    em_title: "Emergency Crisis Center",
    em_contact: "Healthcare Emergency Line",
    em_desc: "If your child is experiencing an acute behavioral or emotional crisis, contact us immediately.",
    em_button: "Call Medical Center Now",
    
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
    
    // Parent Dashboard Navigation
    nav_dashboard: "لوحة التحكم",
    nav_profile: "ملف الطفل",
    nav_upload: "رفع رسمة",
    nav_reports: "تقارير الذكاء الاصطناعي",
    nav_progress: "متابعة التقدم",
    nav_appointments: "المواعيد",
    nav_chat: "المحادثة مع الطبيب",
    nav_community: "مجتمع أولياء الأمور",
    nav_resources: "الموارد التعليمية",
    nav_notifications: "الإشعارات",
    nav_settings: "الإعدادات",
    nav_emergency: "الدعم الطارئ",

    // Dashboard Items
    db_summary: "ملخص حالة الطفل",
    db_name: "الاسم",
    db_age: "العمر",
    db_diagnosis: "مستوى التوحد",
    db_doctor: "الطبيب المتابع",
    db_reports: "أحدث التقارير",
    db_appointments: "المواعيد القادمة",
    db_activity: "النشاط الأخير",
    db_quick: "وصول سريع",
    db_years: "سنوات",
    db_level: "المستوى",

    // Profile Items
    prof_title: "الملف الطبي والسلوكي للطفل",
    prof_personal: "المعلومات الشخصية",
    prof_gender: "الجنس",
    prof_com: "أسلوب التواصل",
    prof_history: "التاريخ السلوكي",
    prof_triggers: "المحفزات العاطفية",
    prof_notes: "ملاحظات طبية",
    prof_therapy: "تاريخ العلاج",
    prof_med: "الأدوية",
    prof_allergies: "الحساسية",
    prof_emergency: "اتصال الطوارئ",
    prof_save: "حفظ إعدادات الملف",
    prof_edit: "تعديل بيانات الملف",

    // Upload Items
    upload_title: "ارفع رسمة جديدة",
    upload_desc: "اسحب وأفلت رسمة طفلك هنا، أو انقر للاستعراض. الحد الأقصى 5 ميجابايت.",
    btn_upload: "اختيار ملف",
    upload_history: "سجل الرسومات المرفوعة",
    upload_step1: "رفع الرسمة",
    upload_step2: "تحليل الذكاء الاصطناعي",
    upload_step3: "مراجعة الطبيب",
    upload_step4: "تم الاعتماد",
    upload_status: "الحالة الحالية",

    // Reports Items
    rep_title: "تقارير الذكاء الاصطناعي المعتمدة",
    rep_unapproved: "هذا التقرير قيد التحليل أو في انتظار المراجعة السريرية من الطبيب المعالج.",
    rep_summary: "ملخص الإدراك السلوكي (ذكاء اصطناعي)",
    rep_emo: "مؤشرات التطور العاطفي",
    rep_beh: "الأنماط السلوكية المكتشفة",
    rep_conf: "نسبة ثقة نموذج الذكاء الاصطناعي",
    rep_doc: "ملاحظات الطبيب المشرف",
    rep_rec: "التوصيات المقترحة للأسرة",
    rep_download: "تنزيل نسخة PDF",
    rep_disclaimer: "يوفر الذكاء الاصطناعي مؤشرات سلوكية داعمة فقط وليس تشخيصًا نهائيًا. تخضع جميع التقارير لمراجعة سريرية مرخصة.",

    // Progress Items
    prog_title: "تحليلات تقدم الطفل",
    prog_com: "مهارات التواصل",
    prog_beh: "الضبط السلوكي",
    prog_emo: "الاستقرار العاطفي",
    prog_ther: "التفاعل مع العلاج",

    // Appointments Items
    apt_title: "جدول المواعيد",
    apt_book: "حجز موعد جديد",
    apt_reschedule: "تغيير الموعد",
    apt_cancel: "إلغاء الموعد",
    apt_history: "سجل المواعيد السابقة",
    apt_date: "التاريخ",
    apt_time: "الوقت",
    apt_type: "نوع الجلسة",
    apt_status: "الحالة",
    apt_action: "الإجراءات",

    // Chat Items
    chat_title: "مراسلة آمنة مع د. أحمد",
    chat_placeholder: "اكتب رسالتك أو أرفق ملفًا هنا...",
    chat_send: "إرسال",
    chat_attachment: "مرفق",
    chat_voice: "تسجيل صوتي",

    // Community Items
    comm_title: "مجتمعات أولياء الأمور ودعم التوحد",
    comm_post: "كتابة منشور جديد للمجتمع",
    comm_comment: "تعليق",
    comm_anon: "نشر بهوية مجهولة",
    comm_placeholder: "شارك تجربتك أو اطرح سؤالك هنا...",

    // Resources Items
    res_title: "مكتبة الموارد والمقالات التعليمية",
    res_filter_age: "تصفية حسب عمر الطفل",
    res_filter_level: "تصفية حسب مستوى التوحد",
    res_filter_topic: "تصفية حسب الموضوع",

    // Notifications Items
    notif_title: "مركز الإشعارات والتنبيهات",
    notif_clear: "مسح جميع الإشعارات",
    notif_mark: "تحديد الكل كمقروء",

    // Settings Items
    set_title: "إعدادات الحساب",
    set_profile: "ملف ولي الأمر",
    set_password: "تغيير كلمة المرور",
    set_lang: "خيارات اللغة والاتجاهات",
    set_notif: "تفضيلات الإشعارات",
    set_privacy: "خيارات الخصوصية",
    set_security: "سجلات الأمان",

    // Emergency Items
    em_title: "مركز الطوارئ السلوكية والعاطفية",
    em_contact: "خط الطوارئ للمركز الصحي",
    em_desc: "إذا كان طفلك يمر بأزمة سلوكية حادة أو عاطفية طارئة، اتصل بنا فوراً للدعم السريع المباشر.",
    em_button: "اتصل بالمركز الصحي الآن",
    
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

let currentLang = 'ar'; // Default to Arabic

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

// Default seed values for Sarah A. demo parent
const defaultSarahProfile = {
  parentName: "Sarah A.",
  email: "parent@example.com",
  password: "password",
  phone: "+966 50 123 4567",
  childProfile: {
    name: "Leo M.",
    age: 6,
    gender: "Male / ذكر",
    autismLevel: "Level 2 (Moderate ASD) / المستوى الثاني",
    communicationStyle: "Uses speech tablets and gestures / يستخدم لوحات التعبير والتحفيز الإيمائي",
    behavioralHistory: "Prone to sensory overloads in crowded environments / عرضة للتحسس الزائد بالمحيط المزدحم",
    emotionalTriggers: "High-pitched noises, sudden bright lights / الأصوات العالية والأنوار المفاجئة",
    medicalNotes: "Participates in sensory motor therapy twice a week / يخضع لجلسات علاج تكامل حسي حركي مرتين أسبوعياً",
    therapyHistory: "6 months of Speech Therapy, occupational coaching / 6 أشهر تخاطب وعلاج وظيفي",
    medications: "None / لا يوجد",
    allergies: "Gluten sensitive / حساسية قمح خفيفة",
    emergencyContact: "+966 50 123 4567"
  },
  drawings: [
    {
      id: "dr-01",
      name: "Family Portrait / لوحة العائلة",
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400",
      status: "approved",
      uploadDate: "2026-06-25",
      aiSummary: "The drawing uses high levels of primary yellow and orange, indicating high sensory arousal. Spatial layout shows isolated figures with minor overlap.",
      emotional: "Expressing mild anxiety, isolation from central figures, but clean strokes show confidence.",
      behavioral: "Focus on repetitive geometric structures in drawing boundaries, common with detail-oriented cognitive mapping.",
      confidence: "88%",
      doctorComments: "Approved AI observations. Suggest encouraging joint coloring exercises to foster connection.",
      recommendations: "Continue sensory-safe visual play. Try modeling facial expressions on clay modeling sessions."
    },
    {
      id: "dr-02",
      name: "Tree in the Garden / شجرة الحديقة",
      imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400",
      status: "review",
      uploadDate: "2026-07-01",
      aiSummary: "AI Draft: Significant repetitive green strokes. Indicators of focused attention.",
      emotional: "Calm state, high symmetry.",
      behavioral: "Pattern repetitions.",
      confidence: "91%",
      doctorComments: "Pending clinician review.",
      recommendations: "Pending final report approval."
    }
  ],
  appointments: [
    { id: "apt-1", doctor: "Dr. Ahmed", date: "2026-07-05", time: "10:30 AM", type: "Speech Therapy Followup", status: "scheduled" },
    { id: "apt-2", doctor: "Dr. Ahmed", date: "2026-06-18", time: "09:00 AM", type: "Behavioral Assessment", status: "completed" }
  ],
  chatMessages: [
    { sender: "doctor", text: "Hello Sarah, I reviewed Leo's latest drawing analysis report. The behavioral markers match his progress. We will discuss it on the next session.", time: "10:15 AM", date: "Yesterday" },
    { sender: "parent", text: "Thank you Dr. Ahmed, I also noticed he has been calmer since our speech session last Tuesday.", time: "11:30 AM", date: "Yesterday" }
  ],
  notifications: [
    { id: "n-1", type: "report", text: "Dr. Ahmed approved Leo's 'Family Portrait' drawing analysis report.", unread: true, date: "1 hour ago" },
    { id: "n-2", type: "message", text: "New secure text message from Dr. Ahmed.", unread: true, date: "2 hours ago" }
  ]
};

// ─── Community data helpers (shared across all accounts) ─────────────────────
// Community groups are global (shared), but posts are per-parent.
const DEFAULT_COMMUNITY_GROUPS = [
  { id: "grp-general",    nameEn: "General Discussion",     nameAr: "المناقشة العامة",              descEn: "Connect with parents for general chat and peer advice.",                      descAr: "تواصل مع أولياء الأمور للمحادثة العامة والنصائح المشتركة.",           members: 241, moderators: ["Sarah A.", "Dr. Ahmed"], unread: 1,  pinnedEn: "Welcome to Aura Communities! Keep discussions supportive and sensory-safe.",          pinnedAr: "مرحباً بكم في مجتمعات أمان! يرجى الحفاظ على سرية المشاركات والدعم الحسي." },
  { id: "grp-newly",     nameEn: "Newly Diagnosed",         nameAr: "المكتشف حديثاً",               descEn: "Support group for families navigating initial ASD steps.",                     descAr: "مجموعة دعم للعائلات التي تخطو خطواتها الأولى في التشخيص.",          members: 86,  moderators: ["Dr. Ahmed"],              unread: 0,  pinnedEn: "Check out the 'Understanding Autism Levels' handbook in the Resources tab.",          pinnedAr: "راجع دليل 'فهم مستويات التوحد' في قسم الموارد والكتيبات." },
  { id: "grp-nonverbal", nameEn: "Non-Verbal Children",     nameAr: "الأطفال غير اللفظيين",         descEn: "AAC tools, sensory boards, and non-verbal expression advice.",                  descAr: "أدوات التواصل البديل AAC، اللوحات الحسية، ونصائح التعبير اللفظي والجسدي.",  members: 110, moderators: ["Dr. Ahmed", "Mona K."],  unread: 0,  pinnedEn: "Share your experience with speech tablet models here.",                               pinnedAr: "شارك تجربتك مع نماذج وأجهزة التابلت اللفظي هنا." },
  { id: "grp-level1",    nameEn: "ASD Level 1",             nameAr: "توحد مستوى 1",                 descEn: "Support and advice for children with DSM-5 Level 1.",                          descAr: "دعم ونصائح للأطفال من ذوي التوحد المستوى الأول.",                   members: 92,  moderators: ["Sarah A."],              unread: 0,  pinnedEn: "School integration guide is available in Resources.",                               pinnedAr: "دليل الدمج المدرسي متاح الآن في مكتبة الموارد." },
  { id: "grp-level2",    nameEn: "ASD Level 2",             nameAr: "توحد مستوى 2",                 descEn: "Support and advice for children with DSM-5 Level 2.",                          descAr: "دعم ونصائح للأطفال من ذوي التوحد المستوى الثاني.",                  members: 148, moderators: ["Dr. Ahmed"],              unread: 0,  pinnedEn: "Reminder: Track stimming triggers in the dashboard daily.",                          pinnedAr: "تذكير: يرجى تدوين محفزات الاستثارة الحسية في لوحة التحكم يومياً." },
  { id: "grp-level3",    nameEn: "ASD Level 3",             nameAr: "توحد مستوى 3",                 descEn: "Support and advice for children with DSM-5 Level 3.",                          descAr: "دعم ونصائح للأطفال من ذوي التوحد المستوى الثالث.",                  members: 76,  moderators: ["Dr. Ahmed"],              unread: 0,  pinnedEn: "Occupational therapy session files uploaded.",                                      pinnedAr: "تم تحديث ورفع ملفات جلسات العلاج الوظيفي." },
  { id: "grp-speech",    nameEn: "Speech Therapy",          nameAr: "علاج النطق والتخاطب",          descEn: "Exercises and ideas to encourage verbal communication.",                       descAr: "تمارين وأفكار لتشجيع التواصل اللفظي والنطق السليم.",               members: 165, moderators: ["Mona K.", "Dr. Ahmed"],  unread: 0,  pinnedEn: "Weekly coloring speech list updated.",                                             pinnedAr: "تم تحديث قائمة التلوين والنطق الأسبوعية للأطفال." },
  { id: "grp-school",    nameEn: "School Support",          nameAr: "الدمج والدعم المدرسي",         descEn: "Navigating school transitions, IEPs, and classroom support.",                  descAr: "التكيف المدرسي، خطط التعليم الفردية IEP، وتسهيلات الفصول الدراسية.", members: 104, moderators: ["Sarah A."],              unread: 0,  pinnedEn: "IEP planning sheet is printable from Resources.",                                  pinnedAr: "ورقة عمل تخطيط الـ IEP قابلة للطباعة من الموارد." },
  { id: "grp-nutrition", nameEn: "Nutrition",               nameAr: "التغذية والحمية الغذائية",     descEn: "Diets, gluten sensitivity, and feeding behavior adjustments.",                  descAr: "الأنظمة الغذائية، حساسية الجلوتين، وتعديل سلوكيات الطعام للأطفال.", members: 89,  moderators: ["Sarah A."],              unread: 0,  pinnedEn: "Gluten-free diet recommendations list.",                                           pinnedAr: "قائمة مقترحات الأطعمة الخالية من الجلوتين متوفرة." },
  { id: "grp-home",      nameEn: "Home Activities",         nameAr: "الأنشطة المنزلية",             descEn: "Simple craft, drawing, and play exercises for sensory stimulation.",            descAr: "أنشطة يدوية بسيطة، رسم، وألعاب للمنزل تدعم التحفيز الحسي.",       members: 132, moderators: ["Dr. Ahmed"],              unread: 0,  pinnedEn: "Use clay modeling to express basic emotions.",                                     pinnedAr: "استخدم الصلصال والتجسيد للتعبير عن المشاعر الأساسية." },
  { id: "grp-specialist",nameEn: "Ask a Specialist",        nameAr: "اسأل المختص",                 descEn: "Dedicated room monitored directly by clinical staff.",                         descAr: "مساحة مخصصة تخضع لمراقبة الطاقم الطبي المباشر للرد على الاستفسارات.", members: 210, moderators: ["Dr. Ahmed", "Mona K."],  unread: 0,  pinnedEn: "Response times are within 24 hours. For emergencies use the red CTA.",             pinnedAr: "الاستجابة للاستشارات خلال 24 ساعة. للطوارئ استخدم زر الدعم الأحمر." }
];

function getCommunityGroups() {
  const stored = localStorage.getItem('auraCommunityGroups');
  if (!stored) {
    localStorage.setItem('auraCommunityGroups', JSON.stringify(DEFAULT_COMMUNITY_GROUPS));
    return DEFAULT_COMMUNITY_GROUPS;
  }
  return JSON.parse(stored);
}

function saveCommunityGroups(groups) {
  localStorage.setItem('auraCommunityGroups', JSON.stringify(groups));
}

function getCommunityPosts() {
  const stored = localStorage.getItem('auraCommunityPosts');
  if (!stored) {
    const seed = [{ id: "p-init", groupId: "grp-general", author: "Dr. Ahmed", anonymous: false, date: "Just now", text: "Welcome to the Aura communities support threads! Connect, share experiences, and support each other.", attachment: null, comments: [] }];
    localStorage.setItem('auraCommunityPosts', JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(stored);
}

function saveCommunityPosts(posts) {
  localStorage.setItem('auraCommunityPosts', JSON.stringify(posts));
}
// ─────────────────────────────────────────────────────────────────────────────

// Seeding standard list of parents
function getParentsList() {
  let list = JSON.parse(localStorage.getItem('auraRegisteredParents') || '[]');
  if (list.length === 0) {
    list.push(defaultSarahProfile);
    localStorage.setItem('auraRegisteredParents', JSON.stringify(list));
  }
  return list;
}

/**
 * Returns the full profile object for the currently logged-in parent.
 * Reads auraActiveUserEmail set by login.html at sign-in time.
 * If no match is found, returns the Sarah demo only when no email is stored
 * (first-time load without a session). In all other cases, returns null so
 * the caller can redirect to login.
 */
function getLocalData() {
  const parents = getParentsList();
  const activeEmail = localStorage.getItem('auraActiveUserEmail');

  // No session at all — default to demo for backward compat
  if (!activeEmail) {
    return defaultSarahProfile;
  }

  const activeParent = parents.find(p => p.email.toLowerCase() === activeEmail.toLowerCase());

  // Account not found — this should not normally happen; return demo so page doesn't break
  if (!activeParent) {
    console.warn('[Aura] Active email', activeEmail, 'not found in registered parents. Using demo fallback.');
    return defaultSarahProfile;
  }

  return activeParent;
}

function saveLocalData(updatedParentData) {
  const parents = getParentsList();
  const activeEmail = localStorage.getItem('auraActiveUserEmail') || 'parent@example.com';
  const idx = parents.findIndex(p => p.email.toLowerCase() === activeEmail.toLowerCase());
  if (idx !== -1) {
    parents[idx] = updatedParentData;
  } else {
    parents.push(updatedParentData);
  }
  localStorage.setItem('auraRegisteredParents', JSON.stringify(parents));
}

/** Called by the Logout button so the session is fully cleared. */
function logoutParent() {
  localStorage.removeItem('auraActiveUserEmail');
  window.location.href = 'login.html';
}

// Global active sub-group tracking variable
let activeGroupId = null;
let postAttachedFile = null;

// Navigation SPA Router
function showView(viewId) {
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.remove('active');
  });
  
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update sidebar active styling
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(viewId)) {
      link.classList.add('active');
    }
  });

  // Render view dynamic content
  renderViewContent(viewId);
}

// Dynamic rendering engine for SPA views
function renderViewContent(viewId) {
  const data = getLocalData();
  
  // Render navbar fields dynamically to avoid hardcoded user names
  const navNameEl = document.getElementById('parent-navbar-name');
  const navAvatarEl = document.getElementById('parent-navbar-avatar');
  if (navNameEl) navNameEl.textContent = data.parentName || "Sarah A.";
  if (navAvatarEl) navAvatarEl.textContent = data.parentName ? data.parentName[0].toUpperCase() : "P";

  if (viewId === 'view-dashboard') {
    // Child Summary Card
    document.getElementById('db-child-name').textContent = data.childProfile.name;
    document.getElementById('db-child-age').textContent = `${data.childProfile.age} ${translations[currentLang]['db_years']}`;
    document.getElementById('db-child-level').textContent = data.childProfile.autismLevel;
    document.getElementById('db-child-doc').textContent = data.appointments[0]?.doctor || "Dr. Ahmed";

    // Stats
    const totalReports = data.drawings.filter(d => d.status === 'approved').length;
    const upcomingCount = data.appointments.filter(a => a.status === 'scheduled').length;
    const unreadNotif = data.notifications.filter(n => n.unread).length;
    
    document.getElementById('stat-rep-count').textContent = totalReports;
    document.getElementById('stat-apt-count').textContent = upcomingCount;
    document.getElementById('stat-notif-count').textContent = unreadNotif;

    // Latest Approved Reports Widget
    const reportListHtml = data.drawings.filter(d => d.status === 'approved').map(d => `
      <div style="padding: 12px; border: 1px solid var(--glass-border); background: white; border-radius: var(--border-radius-sm); margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: var(--color-text-main);">${d.name}</strong>
          <div style="font-size: 0.8rem; color: var(--color-text-muted);">${d.uploadDate}</div>
        </div>
        <button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.8rem;" onclick="openApprovedReport('${d.id}')">View Report</button>
      </div>
    `).join('');
    document.getElementById('db-latest-reports').innerHTML = reportListHtml || '<p style="color: var(--color-text-muted);">No reports approved yet.</p>';

    // Upcoming Appointment Card
    const nextApt = data.appointments.find(a => a.status === 'scheduled');
    if (nextApt) {
      document.getElementById('db-upcoming-apt').innerHTML = `
        <div style="border-inline-start: 4px solid var(--color-secondary); padding-inline-start: 12px;">
          <h4 style="color: var(--color-text-main);">${nextApt.type}</h4>
          <p style="font-size: 0.9rem; margin-top: 4px;">With <strong>${nextApt.doctor}</strong></p>
          <div style="display: flex; gap: 16px; margin-top: 8px; font-size: 0.85rem; color: var(--color-text-muted);">
            <span>📅 ${nextApt.date}</span>
            <span>⏰ ${nextApt.time}</span>
          </div>
        </div>
      `;
    } else {
      document.getElementById('db-upcoming-apt').innerHTML = '<p style="color: var(--color-text-muted);">No scheduled appointments.</p>';
    }

    // Recent Activity Feed
    const activities = [
      { icon: "📄", text: "Approved analysis report for Family Portrait", time: "1 hour ago" },
      { icon: "💬", text: "New message exchange with Dr. Ahmed", time: "Today" },
      { icon: "🎨", text: "Uploaded new drawing 'Tree in the Garden'", time: "Today" }
    ];
    document.getElementById('db-activity-feed').innerHTML = activities.map(act => `
      <li class="activity-item">
        <span>${act.icon} ${act.text}</span>
        <span class="date">${act.time}</span>
      </li>
    `).join('');
  }

  else if (viewId === 'view-profile') {
    // Populate Child Profile Form fields
    document.getElementById('prof-name-input').value = data.childProfile.name;
    document.getElementById('prof-age-input').value = data.childProfile.age;
    document.getElementById('prof-gender-input').value = data.childProfile.gender;
    document.getElementById('prof-level-input').value = data.childProfile.autismLevel;
    document.getElementById('prof-com-input').value = data.childProfile.communicationStyle;
    document.getElementById('prof-history-input').value = data.childProfile.behavioralHistory;
    document.getElementById('prof-triggers-input').value = data.childProfile.emotionalTriggers;
    document.getElementById('prof-notes-input').value = data.childProfile.medicalNotes;
    document.getElementById('prof-therapy-input').value = data.childProfile.therapyHistory;
    document.getElementById('prof-med-input').value = data.childProfile.medications;
    document.getElementById('prof-allergies-input').value = data.childProfile.allergies;
    document.getElementById('prof-emergency-input').value = data.childProfile.emergencyContact;
  }

  else if (viewId === 'view-upload') {
    renderUploadHistory();
  }

  else if (viewId === 'view-reports') {
    renderApprovedReportsList();
  }

  else if (viewId === 'view-progress') {
    // Perform simple animation on progress bars
    setTimeout(() => {
      document.querySelectorAll('.progress-bar-fill').forEach(bar => {
        const val = bar.getAttribute('data-val');
        if (val) bar.style.width = val;
      });
    }, 100);
  }

  else if (viewId === 'view-appointments') {
    renderAppointmentsPage();
  }

  else if (viewId === 'view-chat') {
    renderChatMessages();
  }

  else if (viewId === 'view-community') {
    renderCommunityPosts();
  }

  else if (viewId === 'view-resources') {
    renderEducationalResources();
  }

  else if (viewId === 'view-notifications') {
    renderNotificationsPage();
  }
}

// Upload view helper
function renderUploadHistory() {
  const data = getLocalData();
  const listEl = document.getElementById('upload-submissions');
  if (!listEl) return;

  listEl.innerHTML = data.drawings.map(d => {
    let statusClass = "badge-pending";
    let stepActive = 1;
    if (d.status === 'review') { statusClass = "badge-review"; stepActive = 3; }
    if (d.status === 'approved') { statusClass = "badge-approved"; stepActive = 4; }
    if (d.status === 'analyzing') { statusClass = "badge-analyzing"; stepActive = 2; }

    return `
      <div class="card" style="margin-bottom: 24px; padding: 24px;">
        <div class="flex justify-between items-center" style="margin-bottom: 16px;">
          <div>
            <h3 style="font-size: 1.15rem; color: var(--color-text-main);">${d.name}</h3>
            <p style="font-size: 0.8rem; color: var(--color-text-muted);">Uploaded: ${d.uploadDate}</p>
          </div>
          <span class="status-badge ${statusClass}">${d.status}</span>
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <img src="${d.imageUrl}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--border-radius-sm); border: 1px solid var(--glass-border);" alt="drawing">
          <div style="flex: 1; font-size: 0.9rem;">
            <strong>AI Observation Draft:</strong>
            <p style="margin-top: 4px; color: var(--color-text-muted);">${d.aiSummary}</p>
          </div>
        </div>

        <!-- Progress workflow stepper -->
        <div class="stepper">
          <div class="step ${stepActive >= 1 ? 'completed' : ''}">
            <div class="step-circle">1</div>
            <div class="step-label" data-i18n="upload_step1">Upload</div>
          </div>
          <div class="step ${stepActive >= 2 ? (stepActive === 2 ? 'active' : 'completed') : ''}">
            <div class="step-circle">2</div>
            <div class="step-label" data-i18n="upload_step2">AI Analysis</div>
          </div>
          <div class="step ${stepActive >= 3 ? (stepActive === 3 ? 'active' : 'completed') : ''}">
            <div class="step-circle">3</div>
            <div class="step-label" data-i18n="upload_step3">Doctor Review</div>
          </div>
          <div class="step ${stepActive >= 4 ? 'completed' : ''}">
            <div class="step-circle">4</div>
            <div class="step-label" data-i18n="upload_step4">Approved</div>
          </div>
        </div>

        ${d.status === 'approved' ? `
          <button class="btn btn-primary" style="margin-top: 10px;" onclick="openApprovedReport('${d.id}')">View Complete Approved Report</button>
        ` : `
          <div style="background: rgba(0,0,0,0.02); padding: 10px 14px; font-size: 0.85rem; border-radius: 6px; color: var(--color-text-muted);">
            🔒 Reports and advice will unlock immediately once Dr. Ahmed confirms and signs off the clinical review.
          </div>
        `}
      </div>
    `;
  }).join('');
  
  // Re-translate items
  setLanguage(currentLang);
}

// Drawing uploading logic simulator
function handleDrawingUpload(e) {
  e.preventDefault();
  const fileInput = document.getElementById('drawing-file-field');
  const titleInput = document.getElementById('drawing-title-field');
  
  if (!fileInput || fileInput.files.length === 0) {
    alert("Please select a drawing to upload first / الرجاء تحديد الرسمة أولاً");
    return;
  }

  const title = titleInput.value.trim() || "Child Drawing / لوحة الطفل";
  
  const modal = document.getElementById('uploadModal');
  const progressBar = document.getElementById('progressBar');
  const modalTitle = document.getElementById('modalTitle');
  
  if (modal) {
    modalTitle.setAttribute('data-i18n', 'modal_title');
    modalTitle.textContent = translations[currentLang]['modal_title'];
    modal.classList.add('active');
    progressBar.style.width = '0%';
    
    // Simulate upload progress
    setTimeout(() => {
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        modalTitle.setAttribute('data-i18n', 'modal_success');
        modalTitle.textContent = translations[currentLang]['modal_success'];
        
        // Add item to local storage state
        const data = getLocalData();
        const newDrawing = {
          id: `dr-${Date.now()}`,
          name: title,
          imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", // colorful abstract
          status: "analyzing",
          uploadDate: new Date().toISOString().split('T')[0],
          aiSummary: "Performing visual extraction for shapes and balance...",
          emotional: "Pending clinical calibration",
          behavioral: "Calibrating markers",
          confidence: "Calculating...",
          doctorComments: "",
          recommendations: ""
        };
        data.drawings.unshift(newDrawing);
        
        // Push a report approval simulation alert/notification
        const newNotif = {
          id: `n-${Date.now()}`,
          type: "report",
          text: `Analysis started for '${title}'.`,
          unread: true,
          date: "Just now"
        };
        data.notifications.unshift(newNotif);
        
        saveLocalData(data);
        updateSidebarBadgeCount();

        // Simulate doctor approving it in 8 seconds
        setTimeout(() => {
          const innerData = getLocalData();
          const drawIndex = innerData.drawings.findIndex(dr => dr.id === newDrawing.id);
          if (drawIndex !== -1) {
            innerData.drawings[drawIndex].status = "approved";
            innerData.drawings[drawIndex].aiSummary = "The color palette features moderate use of light blue and brown. Structure and spacing suggest high coordination and self-directed attention.";
            innerData.drawings[drawIndex].emotional = "Content child state, strong visual expression of home environment.";
            innerData.drawings[drawIndex].behavioral = "Repeated spiral constructs on upper drawing corners showing focused execution.";
            innerData.drawings[drawIndex].confidence = "94%";
            innerData.drawings[drawIndex].doctorComments = "Clinically verified. Drawing reflects great spatial planning. Recommended to practice naming the figures painted.";
            innerData.drawings[drawIndex].recommendations = "Introduce coloring exercises involving family interactions to guide narrative therapy.";
            
            innerData.notifications.unshift({
              id: `n-${Date.now()}`,
              type: "report",
              text: `Dr. Ahmed has reviewed and approved the clinical report for '${title}'.`,
              unread: true,
              date: "Just now"
            });
            saveLocalData(innerData);
            updateSidebarBadgeCount();
            
            // Re-render if looking at the active screen
            const activeSec = document.querySelector('.view-section.active');
            if (activeSec) {
              renderViewContent(activeSec.id);
            }
          }
        }, 8000);

        setTimeout(() => {
          modal.classList.remove('active');
          showView('view-upload');
        }, 1200);
      }, 1500);
    }, 100);
  }
}

// Reports view helper
function renderApprovedReportsList() {
  const data = getLocalData();
  const reportsEl = document.getElementById('approved-reports-container');
  if (!reportsEl) return;

  const approved = data.drawings.filter(d => d.status === 'approved');
  if (approved.length === 0) {
    reportsEl.innerHTML = `
      <div class="card text-center" style="padding: 40px;">
        <p style="color: var(--color-text-muted);">No reports approved by your doctor yet. Submit drawings in the Upload section.</p>
      </div>
    `;
    return;
  }

  reportsEl.innerHTML = `
    <div style="margin-bottom: 20px;">
      <label class="form-label" data-i18n="rep_title">Select Report to View</label>
      <select id="report-selector" class="form-control" onchange="loadReportDetails(this.value)">
        ${approved.map(d => `<option value="${d.id}">${d.name} (${d.uploadDate})</option>`).join('')}
      </select>
    </div>
    <div id="active-report-body"></div>
  `;

  // Load the first report by default
  loadReportDetails(approved[0].id);
}

// Display report detail panel
function loadReportDetails(reportId) {
  const data = getLocalData();
  const d = data.drawings.find(dr => dr.id === reportId);
  const container = document.getElementById('active-report-body');
  if (!d || !container) return;

  container.innerHTML = `
    <div class="card" id="printable-report-area">
      <div class="flex justify-between items-center" style="border-bottom: 2px solid var(--color-primary); padding-bottom: 12px; margin-bottom: 20px;">
        <div>
          <h2 style="color: var(--color-primary);">${d.name}</h2>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">Submission Date: ${d.uploadDate} | Subject: ${data.childProfile.name}</p>
        </div>
        <span class="status-badge badge-approved" data-i18n="upload_step4">Approved</span>
      </div>

      <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 24px;">
        <img src="${d.imageUrl}" style="max-width: 260px; width: 100%; height: auto; object-fit: cover; border-radius: var(--border-radius-lg); border: 1px solid var(--glass-border);">
        <div style="flex: 1; min-width: 260px;">
          <h4 style="color: var(--color-primary); margin-bottom: 6px;" data-i18n="rep_summary">AI Cognitive Summary</h4>
          <p style="margin-bottom: 16px; color: var(--color-text-main); font-size: 0.95rem;">${d.aiSummary}</p>

          <h4 style="color: var(--color-primary); margin-bottom: 6px;" data-i18n="rep_conf">AI Model Confidence Score</h4>
          <div class="progress-bar-container" style="margin-top: 4px; height: 10px; margin-bottom: 16px;">
            <div class="progress-bar-fill" style="width: ${d.confidence}"></div>
          </div>
          <span style="font-weight: 700; color: var(--color-primary);">${d.confidence}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
        <div style="padding: 16px; background: rgba(144, 180, 242, 0.08); border-radius: var(--border-radius-sm);">
          <h4 style="margin-bottom: 8px; color: var(--color-text-main);" data-i18n="rep_emo">Emotional Development Indicators</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">${d.emotional}</p>
        </div>
        <div style="padding: 16px; background: rgba(117, 154, 114, 0.08); border-radius: var(--border-radius-sm);">
          <h4 style="margin-bottom: 8px; color: var(--color-text-main);" data-i18n="rep_beh">Behavioral Patterns Identified</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">${d.behavioral}</p>
        </div>
      </div>

      <div class="alert-clinical" style="margin-bottom: 24px;">
        <div>
          <strong style="color: var(--color-primary-hover);" data-i18n="rep_doc">Clinical Supervisor Remarks</strong>
          <p style="margin-top: 4px; color: var(--color-text-main); font-style: italic;">"${d.doctorComments}"</p>
        </div>
      </div>

      <div style="margin-bottom: 24px; padding: 16px; background: rgba(223, 164, 139, 0.08); border-radius: var(--border-radius-sm); border: 1px solid rgba(223, 164, 139, 0.2);">
        <h4 style="color: var(--color-accent); margin-bottom: 6px;" data-i18n="rep_rec">Actionable Recommendations</h4>
        <p style="color: var(--color-text-main); font-size: 0.95rem;">${d.recommendations}</p>
      </div>

      <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span style="font-size: 0.8rem; color: var(--color-text-muted); max-width: 70%;" data-i18n="rep_disclaimer">
          “AI provides supportive observations only and is not a final diagnosis. All reports are reviewed by a licensed clinician.”
        </span>
        <button class="btn btn-outline" onclick="downloadReportPdf()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-inline-end: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> <span data-i18n="rep_download">Download PDF Copy</span></button>
      </div>
    </div>
  `;
  
  setLanguage(currentLang);
}

// Print/PDF download trigger
function downloadReportPdf() {
  const printableArea = document.getElementById('printable-report-area');
  if (!printableArea) return;
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Aura Report PDF</title>');
  printWindow.document.write('<link rel="stylesheet" href="styles.css">');
  printWindow.document.write('<style>body{padding:40px; background:white; font-family:sans-serif;}</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(printableArea.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

// Appointments page logic
function renderAppointmentsPage() {
  const data = getLocalData();
  const listEl = document.getElementById('appointments-list-container');
  if (!listEl) return;

  const currentApts = data.appointments;
  listEl.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th data-i18n="apt_date">Date</th>
          <th data-i18n="apt_time">Time</th>
          <th data-i18n="db_doctor">Doctor</th>
          <th data-i18n="apt_type">Session Type</th>
          <th data-i18n="apt_status">Status</th>
          <th data-i18n="apt_action">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${currentApts.map(apt => `
          <tr>
            <td><strong>${apt.date}</strong></td>
            <td>${apt.time}</td>
            <td>Dr. Ahmed</td>
            <td>${apt.type}</td>
            <td><span class="status-badge ${apt.status === 'scheduled' ? 'badge-analyzing' : 'badge-approved'}">${apt.status}</span></td>
            <td>
              ${apt.status === 'scheduled' ? `
                <button class="btn btn-outline" style="padding: 4px 8px; font-size: 0.8rem;" onclick="rescheduleAppointment('${apt.id}')" data-i18n="apt_reschedule">Reschedule</button>
                <button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.8rem;" onclick="cancelAppointment('${apt.id}')" data-i18n="apt_cancel">Cancel</button>
              ` : `<span style="color: var(--color-text-muted); font-size: 0.85rem;">--</span>`}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  setLanguage(currentLang);
}

// Appointment booking form logic
function handleBookAppointment(e) {
  e.preventDefault();
  const dateInput = document.getElementById('apt-date-input');
  const timeInput = document.getElementById('apt-time-input');
  const typeInput = document.getElementById('apt-type-input');

  if (!dateInput.value || !timeInput.value || !typeInput.value) {
    alert("Please fill all booking inputs / الرجاء إدخال تفاصيل الموعد");
    return;
  }

  const data = getLocalData();
  const newApt = {
    id: `apt-${Date.now()}`,
    doctor: "Dr. Ahmed",
    date: dateInput.value,
    time: timeInput.value,
    type: typeInput.value,
    status: "scheduled"
  };
  data.appointments.unshift(newApt);
  
  // Alert/Notification addition
  data.notifications.unshift({
    id: `n-${Date.now()}`,
    type: "appointment",
    text: `Appointment booked for ${dateInput.value} at ${timeInput.value}.`,
    unread: true,
    date: "Just now"
  });

  saveLocalData(data);
  updateSidebarBadgeCount();
  renderViewContent('view-appointments');
  
  // Reset form
  dateInput.value = '';
  timeInput.value = '';
  typeInput.value = '';
  
  alert("Appointment scheduled successfully! / تم حجز الموعد بنجاح");
}

function cancelAppointment(id) {
  if (confirm("Are you sure you want to cancel this appointment? / هل أنت متأكد من إلغاء هذا الموعد؟")) {
    const data = getLocalData();
    const index = data.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      data.appointments[index].status = "cancelled";
      // Push cancellation alert
      data.notifications.unshift({
        id: `n-${Date.now()}`,
        type: "appointment",
        text: `Cancelled appointment on ${data.appointments[index].date}.`,
        unread: true,
        date: "Just now"
      });
      saveLocalData(data);
      updateSidebarBadgeCount();
      renderViewContent('view-appointments');
    }
  }
}

function rescheduleAppointment(id) {
  const newDate = prompt("Enter new date (e.g. 2026-07-10) / أدخل التاريخ الجديد:");
  const newTime = prompt("Enter new time (e.g. 10:00 AM) / أدخل الوقت الجديد:");
  if (newDate && newTime) {
    const data = getLocalData();
    const index = data.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      data.appointments[index].date = newDate;
      data.appointments[index].time = newTime;
      data.appointments[index].status = "scheduled";
      // Push rescheduling alert
      data.notifications.unshift({
        id: `n-${Date.now()}`,
        type: "appointment",
        text: `Rescheduled appointment to ${newDate} at ${newTime}.`,
        unread: true,
        date: "Just now"
      });
      saveLocalData(data);
      updateSidebarBadgeCount();
      renderViewContent('view-appointments');
    }
  }
}

// Chat Page Helpers
function renderChatMessages() {
  const data = getLocalData();
  const chatMessagesEl = document.getElementById('chat-history-container');
  if (!chatMessagesEl) return;

  chatMessagesEl.innerHTML = data.chatMessages.map(msg => `
    <div class="chat-bubble ${msg.sender === 'parent' ? 'sent' : 'received'}">
      <div style="font-weight: 600; font-size: 0.8rem; margin-bottom: 4px;">
        ${msg.sender === 'parent' ? (data.parentName || 'Sarah') : 'Dr. Ahmed'}
      </div>
      <p style="margin: 0; color: inherit;">${msg.text}</p>
      ${msg.attachment ? `
        <div class="chat-attachment">
          <span>📎</span>
          <a href="#" style="color: inherit; text-decoration: underline;" onclick="alert('File view matches HIPAA storage guidelines. Only accessible within medical tunnel.')">${msg.attachment.name}</a>
        </div>
      ` : ''}
      <div class="time">${msg.date} ${msg.time}</div>
    </div>
  `).join('');
  
  // Auto scroll to bottom
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function sendChatMessage(e) {
  e.preventDefault();
  const textInput = document.getElementById('chat-text-input');
  if (!textInput || !textInput.value.trim()) return;

  const data = getLocalData();
  const newMsg = {
    sender: "parent",
    text: textInput.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: "Today"
  };
  data.chatMessages.push(newMsg);
  
  saveLocalData(data);
  textInput.value = '';
  renderChatMessages();

  // Simulate Doctor reply in 3 seconds
  setTimeout(() => {
    const innerData = getLocalData();
    innerData.chatMessages.push({
      sender: "doctor",
      text: "Thank you for the updates. I will keep this in mind during our visual progress review.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: "Today"
    });
    // Add notification alert
    innerData.notifications.unshift({
      id: `n-${Date.now()}`,
      type: "message",
      text: "New secure text message from Dr. Ahmed.",
      unread: true,
      date: "Just now"
    });
    saveLocalData(innerData);
    updateSidebarBadgeCount();
    
    const activeSec = document.querySelector('.view-section.active');
    if (activeSec && activeSec.id === 'view-chat') {
      renderChatMessages();
    }
  }, 3000);
}

// Send Voice Note Simulator
function sendVoiceNoteMock() {
  const data = getLocalData();
  data.chatMessages.push({
    sender: "parent",
    text: "🎤 Voice Note (0:14) / تسجيل صوتي",
    attachment: { name: "voice_note_parent_2026-07-01.wav" },
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: "Today"
  });
  saveLocalData(data);
  renderChatMessages();
}

// Send File Simulator
function triggerAttachmentMock(fileName) {
  const data = getLocalData();
  data.chatMessages.push({
    sender: "parent",
    text: `📁 Sent a document / تم إرسال ملف: ${fileName}`,
    attachment: { name: fileName },
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: "Today"
  });
  saveLocalData(data);
  renderChatMessages();
}

// WhatsApp Communities Style - Community view helpers
function renderCommunityPosts() {
  const data = getLocalData();
  
  const groupsListContainer = document.getElementById('community-groups-list');
  const groupDetailContainer = document.getElementById('community-group-detail');
  
  if (!groupsListContainer || !groupDetailContainer) return;

  const groups = getCommunityGroups();
  const posts = getCommunityPosts();

  if (activeGroupId === null) {
    // Show Groups list and hide active group posts view
    groupsListContainer.style.display = 'block';
    groupDetailContainer.style.display = 'none';
    
    const gridEl = document.getElementById('community-groups-grid');
    if (gridEl) {
      gridEl.innerHTML = groups.map(grp => {
        const name = currentLang === 'ar' ? grp.nameAr : grp.nameEn;
        const desc = currentLang === 'ar' ? grp.descAr : grp.descEn;
        const moderatorsStr = grp.moderators.join(', ');
        const unreadIndicator = grp.unread > 0 
          ? `<span class="nav-badge" style="background: var(--color-accent); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">${grp.unread} new</span>` 
          : '';

        return `
          <div class="card" style="margin-bottom: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; justify-content: space-between; cursor: pointer; transition: all 0.3s;" onclick="enterCommunityGroup('${grp.id}')">
            <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
              <div style="width: 50px; height: 50px; border-radius: var(--border-radius-sm); background: rgba(117,154,114,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                💬
              </div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                  <h3 style="font-size: 1.15rem; color: var(--color-text-main); margin: 0; font-weight:600;">${name}</h3>
                  <span style="font-size: 0.8rem; background: rgba(144, 180, 242, 0.15); color: #1D4ED8; padding: 2px 8px; border-radius: 12px; font-weight: 500;">${grp.members} members</span>
                </div>
                <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-top: 4px; line-height: 1.4;">${desc}</p>
                <div style="font-size: 0.78rem; color: var(--color-text-muted); margin-top: 6px;">
                  Moderators: <strong>${moderatorsStr}</strong>
                </div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
              ${unreadIndicator}
              <span style="color: var(--color-primary); font-size: 1.2rem; font-weight: bold;">${currentLang === 'ar' ? '←' : '→'}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  } else {
    // Show active group detail view and hide Groups list
    groupsListContainer.style.display = 'none';
    groupDetailContainer.style.display = 'block';

    const activeGrp = groups.find(g => g.id === activeGroupId);
    if (!activeGrp) return;

    const grpName = currentLang === 'ar' ? activeGrp.nameAr : activeGrp.nameEn;
    const grpDesc = currentLang === 'ar' ? activeGrp.descAr : activeGrp.descEn;
    const grpPinned = currentLang === 'ar' ? activeGrp.pinnedAr : activeGrp.pinnedEn;

    // Load Header details
    const headerCard = document.getElementById('group-header-card');
    if (headerCard) {
      headerCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="width: 60px; height: 60px; border-radius: var(--border-radius-sm); background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
            💬
          </div>
          <div>
            <h2 style="color: var(--color-primary); margin: 0; font-size:1.4rem;">${grpName}</h2>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-top: 4px;">${grpDesc}</p>
            <div style="display: flex; gap: 16px; font-size: 0.82rem; color: var(--color-text-muted); margin-top: 6px;">
              <span>👥 <strong>${activeGrp.members} members</strong></span>
              <span>🛡️ Moderators: <strong>${activeGrp.moderators.join(', ')}</strong></span>
            </div>
          </div>
        </div>
        
        <div style="background: rgba(223, 164, 139, 0.08); border-left: 4px solid var(--color-accent); padding: 12px 16px; border-radius: var(--border-radius-sm); font-size: 0.9rem;">
          <strong style="color: #8C5B48;">📌 Pinned Announcement:</strong>
          <span style="color: var(--color-text-main); margin-inline-start: 6px;">${grpPinned}</span>
        </div>
      `;
    }

    renderGroupPostsList();
  }
}

// Enter sub group view
function enterCommunityGroup(groupId) {
  activeGroupId = groupId;
  
  // Clear unread count for this group in local storage
  const groups = getCommunityGroups();
  const grpIndex = groups.findIndex(g => g.id === groupId);
  if (grpIndex !== -1) {
    groups[grpIndex].unread = 0;
    saveCommunityGroups(groups);
  }
  
  renderCommunityPosts();
}

// Go back to WhatsApp communities main page
function exitCommunityGroup() {
  activeGroupId = null;
  postAttachedFile = null;
  
  // Clear mock file attachment span
  const span = document.getElementById('post-file-attached-label');
  if (span) span.textContent = '';
  
  const searchField = document.getElementById('group-post-search');
  if (searchField) searchField.value = '';

  const createCard = document.getElementById('create-post-card');
  if (createCard) createCard.style.display = 'none';

  renderCommunityPosts();
}

function toggleCreatePostCollapse() {
  const card = document.getElementById('create-post-card');
  if (card) {
    card.style.display = card.style.display === 'none' ? 'block' : 'none';
  }
}

// Attachment mock trigger inside post creation
function triggerPostFileMock() {
  const fileName = prompt("Enter mock file / image name to attach: (e.g. child_drawing_vibe.jpg) / أدخل اسم الملف المرفق:");
  if (fileName) {
    postAttachedFile = fileName;
    const label = document.getElementById('post-file-attached-label');
    if (label) {
      label.textContent = `Attached / تم إرفاق: ${fileName}`;
    }
  }
}

// Render active group posts lists with filters
function renderGroupPostsList() {
  const activeParent = getLocalData();
  const searchVal = document.getElementById('group-post-search')?.value.trim().toLowerCase() || '';
  const postsContainer = document.getElementById('group-posts-container');
  if (!postsContainer) return;

  const posts = getCommunityPosts();

  // Filter posts matching activeGroupId and search text
  const groupPosts = posts.filter(p => p.groupId === activeGroupId && 
    (searchVal === '' || p.text.toLowerCase().includes(searchVal) || p.author.toLowerCase().includes(searchVal))
  );

  if (groupPosts.length === 0) {
    postsContainer.innerHTML = `<p style="text-align: center; color: var(--color-text-muted); padding: 40px;">No posts published in this topic group yet.</p>`;
    return;
  }

  postsContainer.innerHTML = groupPosts.map(post => `
    <div class="post-card">
      <div class="post-header">
        <div class="post-meta">
          <div class="avatar-placeholder" style="${post.anonymous ? 'background: var(--color-accent);' : ''}">
            ${post.anonymous ? '?' : post.author[0]}
          </div>
          <div>
            <strong>${post.anonymous ? (currentLang === 'ar' ? 'عضو مجهول الهوية' : 'Anonymous Member') : post.author}</strong>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">${post.date}</div>
          </div>
        </div>
      </div>

      <p style="font-size: 0.95rem; margin-top: 10px; color: var(--color-text-main);">${post.text}</p>
      
      ${post.attachment ? `
        <div style="margin-top: 12px; padding: 12px; background: rgba(0,0,0,0.03); border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.88rem;">
          🖼️ <a href="#" style="color: var(--color-primary-hover); text-decoration: underline;" onclick="alert('Viewing attachment in community safe tunnel.')">${post.attachment.name}</a>
        </div>
      ` : ''}

      <div class="post-actions">
        <button class="post-action-btn" onclick="alert('Liked post / تم الإعجاب بالمنشور')">❤️ Like</button>
        <button class="post-action-btn" onclick="toggleCommentsSection('${post.id}')">💬 Comments (${post.comments.length})</button>
      </div>

      <div class="comment-section" id="comments-${post.id}" style="display: none;">
        ${post.comments.map(c => `
          <div class="comment">
            <strong style="font-size: 0.85rem;">${c.author}:</strong>
            <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 2px;">${c.text}</p>
          </div>
        `).join('')}
        
        <form style="display: flex; gap: 8px; margin-top: 12px;" onsubmit="handlePostComment(event, '${post.id}')">
          <input type="text" class="form-control" placeholder="Write a comment... / اكتب تعليقاً..." style="padding: 6px 12px; font-size: 0.85rem;" required id="comment-input-${post.id}">
          <button class="btn btn-primary" style="padding: 4px 12px; font-size: 0.85rem;" data-i18n="comm_comment">Comment</button>
        </form>
      </div>
    </div>
  `).join('');

  setLanguage(currentLang);
}

function handleCreatePostInGroup(e) {
  e.preventDefault();
  const textInput = document.getElementById('post-text-input');
  const anonCheck = document.getElementById('post-anon-checkbox');
  if (!textInput || !textInput.value.trim() || !activeGroupId) return;

  const parent = getLocalData();
  const posts = getCommunityPosts();
  const newPost = {
    id: `p-${Date.now()}`,
    groupId: activeGroupId,
    author: parent.parentName || "Maha",
    anonymous: anonCheck ? anonCheck.checked : false,
    date: "Just now",
    text: textInput.value.trim(),
    attachment: postAttachedFile ? { name: postAttachedFile, type: "file" } : null,
    comments: []
  };
  posts.unshift(newPost);
  saveCommunityPosts(posts);
  
  // Bump member count slightly to simulate active interaction
  const groups = getCommunityGroups();
  const grpIndex = groups.findIndex(g => g.id === activeGroupId);
  if (grpIndex !== -1) {
    groups[grpIndex].members += 1;
    saveCommunityGroups(groups);
  }

  // Reset form inputs
  textInput.value = '';
  if (anonCheck) anonCheck.checked = false;
  postAttachedFile = null;
  const label = document.getElementById('post-file-attached-label');
  if (label) label.textContent = '';

  // Collapse the card
  const createCard = document.getElementById('create-post-card');
  if (createCard) createCard.style.display = 'none';

  renderGroupPostsList();
  alert("Post published in this group feed! / تم النشر في مجموعة النقاش بنجاح");
}

function filterGroupPosts() {
  renderGroupPostsList();
}

function handlePostComment(e, postId) {
  e.preventDefault();
  const input = document.getElementById(`comment-input-${postId}`);
  if (!input || !input.value.trim()) return;

  const parent = getLocalData();
  const posts = getCommunityPosts();
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts[index].comments.push({
      author: parent.parentName || "Maha",
      text: input.value.trim()
    });
    saveCommunityPosts(posts);
    input.value = '';
    
    // Re-render
    renderGroupPostsList();
    
    // Keep comments block visible
    const el = document.getElementById(`comments-${postId}`);
    if (el) el.style.display = 'block';
  }
}

function toggleCommentsSection(postId) {
  const el = document.getElementById(`comments-${postId}`);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

// Educational Resources view helpers
function renderEducationalResources() {
  const container = document.getElementById('resources-list-container');
  if (!container) return;

  // Static educational resources library
  const resourcesList = [
    { title: "Understanding Autism Levels: A Guide for Parents", category: "Diagnosis", ageGroup: "All Ages", level: "All Levels", type: "Article (PDF)", icon: "📄", url: "#" },
    { title: "Visual Schedules and Daily Transitions", category: "Home Activities", ageGroup: "Age 3-8", level: "Level 1 & 2", type: "Home Video", icon: "▶️", url: "#" },
    { title: "Managing Sensory Meltdowns Safely", category: "Behavioral Support", ageGroup: "Age 5-12", level: "All Levels", type: "Handbook (PDF)", icon: "📥", url: "#" },
    { title: "Speech Stimulus Games through Drawing", category: "Speech & Communication", ageGroup: "Age 4-9", level: "Level 2 & 3", type: "Home Activity Guide", icon: "🎯", url: "#" }
  ];

  // Filter selections
  const ageFilter = document.getElementById('res-age-filter')?.value || 'All Ages';
  const levelFilter = document.getElementById('res-level-filter')?.value || 'All Levels';
  const topicFilter = document.getElementById('res-topic-filter')?.value || 'All Topics';

  const filtered = resourcesList.filter(res => {
    const ageMatch = ageFilter === 'All Ages' || res.ageGroup === ageFilter;
    const levelMatch = levelFilter === 'All Levels' || res.level === levelFilter || res.level === 'All Levels';
    const topicMatch = topicFilter === 'All Topics' || res.category === topicFilter;
    return ageMatch && levelMatch && topicMatch;
  });

  container.innerHTML = filtered.map(res => `
    <div class="resource-card">
      <div class="resource-media-placeholder">
        <span style="font-size: 3rem;">${res.icon}</span>
      </div>
      <div class="resource-body">
        <div class="resource-tags">
          <span class="resource-tag age">${res.ageGroup}</span>
          <span class="resource-tag level">${res.level}</span>
        </div>
        <h4 style="margin-bottom: 8px; color: var(--color-text-main); font-size: 1rem;">${res.title}</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 16px;">Category: ${res.category} | Type: ${res.type}</p>
        <a href="${res.url}" class="btn btn-outline" style="margin-top: auto; padding: 6px; font-size: 0.85rem; width: 100%; text-align: center;" onclick="alert('Resource accessed. Safeguarded for offline viewing.')">Read/Watch</a>
      </div>
    </div>
  `).join('');
  
  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 40px;">No matches found for the selected filters.</p>`;
  }
}

// Notifications view helper
function renderNotificationsPage() {
  const data = getLocalData();
  const container = document.getElementById('notifications-list-container');
  if (!container) return;

  if (data.notifications.length === 0) {
    container.innerHTML = `<p style="color: var(--color-text-muted); text-align: center; padding: 40px;">No notifications yet.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="notification-list">
      ${data.notifications.map(n => `
        <div class="notification-item ${n.unread ? 'unread' : ''}">
          <div style="font-size: 1.5rem;">
            ${n.type === 'report' ? '📄' : n.type === 'message' ? '💬' : n.type === 'appointment' ? '📅' : '🔔'}
          </div>
          <div style="flex: 1;">
            <p style="margin: 0; color: var(--color-text-main); font-size: 0.95rem;">${n.text}</p>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${n.date}</span>
          </div>
          ${n.unread ? `<div class="notification-dot"></div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function markAllNotificationsRead() {
  const data = getLocalData();
  data.notifications.forEach(n => n.unread = false);
  saveLocalData(data);
  updateSidebarBadgeCount();
  renderNotificationsPage();
  alert("All notifications marked as read. / تم تحديد الكل كمقروء");
}

function clearAllNotifications() {
  const data = getLocalData();
  data.notifications = [];
  saveLocalData(data);
  updateSidebarBadgeCount();
  renderNotificationsPage();
}

// Update badges on sidebar nav
function updateSidebarBadgeCount() {
  const data = getLocalData();
  const unreadNotif = data.notifications.filter(n => n.unread).length;
  
  const badgeEl = document.getElementById('sidebar-notif-badge');
  if (badgeEl) {
    if (unreadNotif > 0) {
      badgeEl.textContent = unreadNotif;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // Update top bar notifications indicator if on index/login dashboard header
  const topBadge = document.getElementById('notification-count');
  if (topBadge) {
    topBadge.textContent = unreadNotif;
    topBadge.style.display = unreadNotif > 0 ? 'flex' : 'none';
  }
}

// Child Profile Save action
function handleProfileUpdate(e) {
  e.preventDefault();
  const data = getLocalData();

  data.childProfile.name = document.getElementById('prof-name-input').value;
  data.childProfile.age = parseInt(document.getElementById('prof-age-input').value) || 0;
  data.childProfile.gender = document.getElementById('prof-gender-input').value;
  data.childProfile.autismLevel = document.getElementById('prof-level-input').value;
  data.childProfile.communicationStyle = document.getElementById('prof-com-input').value;
  data.childProfile.behavioralHistory = document.getElementById('prof-history-input').value;
  data.childProfile.emotionalTriggers = document.getElementById('prof-triggers-input').value;
  data.childProfile.medicalNotes = document.getElementById('prof-notes-input').value;
  data.childProfile.therapyHistory = document.getElementById('prof-therapy-input').value;
  data.childProfile.medications = document.getElementById('prof-med-input').value;
  data.childProfile.allergies = document.getElementById('prof-allergies-input').value;
  data.childProfile.emergencyContact = document.getElementById('prof-emergency-input').value;

  // Add notification log
  data.notifications.unshift({
    id: `n-${Date.now()}`,
    type: "profile",
    text: "Child medical and behavioral profile updated successfully.",
    unread: true,
    date: "Just now"
  });

  saveLocalData(data);
  updateSidebarBadgeCount();
  alert("Child profile saved successfully! / تم حفظ ملف الطفل بنجاح");
  showView('view-dashboard');
}

// Settings changes saving
function handleSettingsUpdate(e, type) {
  e.preventDefault();
  
  if (type === 'profile') {
    const parent = getLocalData();
    parent.parentName = e.target.querySelector('input[type="text"]').value;
    parent.email = e.target.querySelector('input[type="email"]').value;
    saveLocalData(parent);
    
    // update navbar instantly
    const navNameEl = document.getElementById('parent-navbar-name');
    if (navNameEl) navNameEl.textContent = parent.parentName;
  }
  alert("Settings updated successfully! / تم حفظ الإعدادات بنجاح");
}

function toggleSettingsTab(tabName) {
  document.querySelectorAll('.settings-tab-content').forEach(el => {
    el.style.display = 'none';
  });
  document.querySelectorAll('.settings-tabs .tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetTab = document.getElementById(`settings-tab-${tabName}`);
  if (targetTab) targetTab.style.display = 'block';

  const targetBtn = document.querySelector(`.settings-tabs .tab-btn[onclick*="${tabName}"]`);
  if (targetBtn) targetBtn.classList.add('active');
}

// Open report shortcut from dashboard widget
function openApprovedReport(reportId) {
  showView('view-reports');
  loadReportDetails(reportId);
}

// Modal Logic for drawing upload (legacy support)
function openUploadModal() {
  const modal = document.getElementById('uploadModal');
  const progressBar = document.getElementById('progressBar');
  const modalTitle = document.getElementById('modalTitle');
  
  if (modal) {
    modalTitle.setAttribute('data-i18n', 'modal_title');
    modalTitle.textContent = translations[currentLang]['modal_title'];
    modal.classList.add('active');
    progressBar.style.width = '0%';
    
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

  // Update badges
  updateSidebarBadgeCount();

  // If we are in parent.html page, render the active SPA view (default: view-dashboard)
  if (document.getElementById('view-dashboard')) {
    showView('view-dashboard');
  }
});
