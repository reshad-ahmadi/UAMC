import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'da' | 'ps';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'home': 'Home',
    'companies': 'Companies',
    'contact': 'Contact',
    'select_language': 'Select Language',
    
    // Hero Section
    'powered_by': 'Powered by Community',
    'hero_title_1': 'Union of Afghan Manufacturing Companies of',
    'hero_title_2': 'Cans, Profiles, Iron and Galvanized Pipes',
    'hero_desc': 'The union was established in 2024 (1403 in the Afghan calendar) to improve coordination among manufacturing companies and strengthen cooperation with government and non-government institutions, supporting the growth of Afghanistan’s manufacturing sector.',
    'join_now': 'JOIN NOW',

    // Companies Page
    'search_placeholder': 'Search companies...',
    'all_categories': 'All Categories',
    'add_company': '+ Add Company',
    'location': 'Location:',
    'view_details': 'View Details',
    'no_companies': 'No companies found.',
    'our_members': '( OUR MEMBERS )',
    'leading': 'Leading',
    'companies_highlight': 'Companies',
    'companies_desc': "Discover the premier industrial manufacturers and factories that form the backbone of Afghanistan's steel and profile industry.",
    'all': 'All',
    'loading_units': 'Loading production units...',
    'view_profile': 'View Profile',
    'no_companies_found': 'No companies found in the union database.',
    'add_first_company': 'Add Your First Company',
    
    // Contact
    'contact_us': 'Contact Us',
    'send_message': 'Send Message',
    'name': 'Name',
    'email': 'Email',
    'subject': 'Subject',
    'message': 'Message',
    'location_label': 'Location',
    'phone': 'Phone',
    'contact_header': '( CONTACT US )',
    'get_in_touch': 'Get in Touch',
    'contact_desc': "Have questions about our association? We're here to help and answer any question you might have.",
    'contact_info_title': 'Contact Information',
    'office_label': 'Office',
    'send_message_title': 'Send us a Message',
    'full_name_label': 'Full Name',
    'email_address_label': 'Email Address',
    'subject_label': 'Subject',
    'message_label': 'Message',
    'sending_btn': 'Sending...',
    'send_message_btn': 'Send Message',
    'success_message': 'Your message has been sent successfully!',
    'error_message': 'Something went wrong. Please try again later.',
    'placeholder_name': 'John Doe',
    'placeholder_email': 'john@example.com',
    'placeholder_subject': 'How can we help?',
    'placeholder_message': 'Your message here...', 

     // Footer
     'rights_reserved': 'All rights reserved.',
     'association_desc': 'Empowering communities and fostering growth through collaboration and innovation. Join us in making a difference.',
     'quick_links': 'Quick Links',
     'resources': 'Resources',
     'stay_updated': 'Stay Updated',
     'newsletter_desc': 'Subscribe to our newsletter for the latest updates.',
     'email_placeholder': 'Enter your email',
     'rights_reserved_text': 'Association. All rights reserved.',
     'privacy_policy': 'Privacy Policy',
     'terms_service': 'Terms of Service',
     'cookies_settings': 'Cookies Settings',
     'about_us': 'About Us',
     'our_mission': 'Our Mission',
     'events': 'Events',
     'membership': 'Membership',
     'news_updates': 'News & Updates',
     'documentation': 'Documentation',
     'support_center': 'Support Center',
     'community': 'Community',
     
     // About
     'about_header': '( ABOUT OUR UNION )',
     'about_desc': "Strengthening Afghanistan's industrial future by fostering collaboration, promoting high-quality local production, and building a unified front for sustainable manufacturing growth.",
     'stats_factories_label': "Leading Factories",
     'stats_factories_desc': "Our union represents the largest network of industrial manufacturing plants across Afghanistan, setting the benchmark for steel and profile production.",
     'stats_provinces_label': "Provinces Covered",
     'stats_provinces_desc': "From Herat to Mazar, our reach extends across major industrial hubs, ensuring consistent supply and high-grade manufacturing standards nationwide.",
     'stats_quality_label': "Quality Standards",
     'stats_quality_desc': "We are committed to international manufacturing excellence, ensuring every iron, pipe, and profile product meets the highest industrial benchmarks.",
     
     // Navigation Component
     'trusted_leaders': "Trusted by Leaders",

     // Slider / Companies Carousel
     'slider_1_t1': "Aria Sanat", 'slider_1_t2': "PROFILE", 'slider_1_t3': "PRODUCT CO.",
     'slider_1_desc': "Aria Sanat Profile Production Co. is a manufacturing and industrial trading company operating out of Herat, Afghanistan. The business is known to be involved in industrial profile production and related steel or metal processing activities.",
     
     'slider_2_t1': "Afghanistan Steel", 'slider_2_t2': "MANUFACTURING", 'slider_2_t3': "FACTORIES UNION.",
     'slider_2_desc': "Supporting the industrial growth and integration of manufacturing sectors across the region with a focus on steel and metal excellence. Providing essential infrastructure components for national development projects.",
     
     'slider_3_t1': "Folad Sanat", 'slider_3_t2': "IRON & STEEL", 'slider_3_t3': "FACTORY.",
     'slider_3_desc': "Leading the way in heavy industry and steel processing in Afghanistan. Equipped with modern technology to deliver high-quality construction materials for the local market.",
     
     'slider_4_t1': "Fazlli Ganzhawi", 'slider_4_t2': "PIPE PRODUCTION", 'slider_4_t3': "COMPANY.",
     'slider_4_desc': "Specializing in high-quality pipe manufacturing and industrial solutions. Dedicated to delivering professional infrastructure components for major construction projects.",
     
     'slider_5_t1': "Industrial Manufacturing", 'slider_5_t2': "HERAT,", 'slider_5_t3': "AFGHANISTAN.",
     'slider_5_desc': "A hub of industrial innovation and production excellence located in Herat's business district. Driving regional economic growth through dedicated manufacturing and trade services.",
     
     'slider_6_t1': "Nawid Mazar", 'slider_6_t2': "INDUSTRIAL", 'slider_6_t3': "COMPANY.",
     'slider_6_desc': "Expanding the reach of industrial manufacturing excellence to Mazar-i-Sharif and beyond. Providing localized production solutions for large-scale infrastructure and industrial needs.",
     
     'slider_7_t1': "General Metal", 'slider_7_t2': "AND STEEL", 'slider_7_t3': "CONSTRUCTION.",
     'slider_7_desc': "Building a stronger future for Afghanistan through advanced metal processing and engineering. A committed member of the manufacturing union focusing on quality and sustainability.",
  },
  da: {
    // Nav
    'home': 'خانه',
    'companies': 'شرکت‌ها',
    'contact': 'تماس',
    'select_language': 'انتخاب زبان',

    // Hero Section
    'powered_by': 'قدرت گرفته از جامعه',
    'hero_title_1': 'اتحادیه شرکت‌های تولیدی افغانستان',
    'hero_title_2': 'قوطی، پروفیل، آهن و لوله‌های گالوانیزه',
    'hero_desc': 'این اتحادیه در سال ۱۴۰۳ (۲۰۲۴ میلادی) به منظور بهبود هماهنگی میان شرکت‌های تولیدی و تقویت همکاری با نهادهای دولتی و غیردولتی، جهت حمایت از رشد بخش تولید افغانستان تأسیس گردید.',
    'join_now': 'عضو شوید',

    // Companies Page
    'search_placeholder': 'جستجوی شرکت‌ها...',
    'all_categories': 'همه دسته‌ها',
    'add_company': '+ افزودن شرکت',
    'location': 'موقعیت:',
    'view_details': 'مشاهده جزئیات',
    'no_companies': 'هیچ شرکتی یافت نشد.',
    'our_members': '( اعضای ما )',
    'leading': 'شرکت‌های',
    'companies_highlight': 'پیشرو',
    'companies_desc': 'تولیدکنندگان برتر صنعتی و کارخانجاتی که ستون فقرات صنعت فولاد و پروفیل افغانستان را تشکیل می‌دهند را کشف کنید.',
    'all': 'همه',
    'loading_units': 'در حال بارگذاری واحدهای تولیدی...',
    'view_profile': 'مشاهده پروفایل',
    'no_companies_found': 'هیچ شرکتی در پایگاه داده اتحادیه یافت نشد.',
    'add_first_company': 'افزودن اولین شرکت',

    // Contact
    'contact_us': 'تماس با ما',
    'send_message': 'ارسال پیام',
    'name': 'نام',
    'email': 'ایمیل',
    'subject': 'موضوع',
    'message': 'پیام',
    'location_label': 'موقعیت',
    'phone': 'تلفن',
    'contact_header': '( تماس با ما )',
    'get_in_touch': 'در تماس باشید',
    'contact_desc': 'آیا سوالی در مورد انجمن ما دارید؟ ما اینجا هستیم تا کمک کنیم و به هر سوالی که ممکن است داشته باشید پاسخ دهیم.',
    'contact_info_title': 'اطلاعات تماس',
    'office_label': 'دفتر',
    'send_message_title': 'به ما پیام دهید',
    'full_name_label': 'نام کامل',
    'email_address_label': 'آدرس ایمیل',
    'subject_label': 'موضوع',
    'message_label': 'پیام',
    'sending_btn': 'در حال ارسال...',
    'send_message_btn': 'ارسال پیام',
    'success_message': 'پیام شما با موفقیت ارسال شد!',
    'error_message': 'مشکلی پیش آمد. لطفا بعدا تلاش کنید.',
    'placeholder_name': 'جان دو',
    'placeholder_email': 'john@example.com',
    'placeholder_subject': 'چگونه می توانیم کمک کنیم؟',
    'placeholder_message': 'پیام شما در اینجا...',

    // Footer
    'rights_reserved': 'تمامی حقوق محفوظ است.',
    'association_desc': 'توانمندسازی جوامع و تقویت رشد از طریق همکاری و نوآوری. برای ایجاد تفاوت به ما بپیوندید.',
    'quick_links': 'لینک‌های سریع',
    'resources': 'منابع',
    'stay_updated': 'به‌روز باشید',
    'newsletter_desc': 'برای دریافت آخرین به‌روزرسانی‌ها در خبرنامه ما مشترک شوید.',
    'email_placeholder': 'ایمیل خود را وارد کنید',
    'rights_reserved_text': 'انجمن. تمامی حقوق محفوظ است.',
    'privacy_policy': 'سیاست حفظ حریم خصوصی',
    'terms_service': 'شرایط خدمات',
    'cookies_settings': 'تنظیمات کوکی‌ها',
    'about_us': 'درباره ما',
    'our_mission': 'ماموریت ما',
    'events': 'رویدادها',
    'membership': 'عضویت',
    'news_updates': 'اخبار و به‌روزرسانی‌ها',
    'documentation': 'مستندات',
    'support_center': 'مرکز پشتیبانی',
    'community': 'جامعه',

    // About
    'about_header': '( درباره اتحادیه ما )',
    'about_desc': 'تقویت آینده صنعتی افغانستان با تقویت همکاری، ترویج تولید باکیفیت داخلی و ایجاد جبهه‌ای متحد برای رشد تولید پایدار.',
    'stats_factories_label': 'کارخانه‌های پیشرو',
    'stats_factories_desc': 'اتحادیه ما بزرگترین شبکه کارخانه‌های تولیدی صنعتی در سراسر افغانستان را نمایندگی می‌کند و معیار تولید فولاد و پروفیل را تعیین می‌کند.',
    'stats_provinces_label': 'ولایات تحت پوشش',
    'stats_provinces_desc': 'از هرات تا مزار، دامنه فعالیت ما در قطب‌های اصلی صنعتی گسترش یافته است و عرضه مداوم و استانداردهای تولید با کیفیت بالا را در سراسر کشور تضمین می‌کند.',
    'stats_quality_label': 'استانداردهای کیفیت',
    'stats_quality_desc': 'ما متعهد به تعالی تولید بین‌المللی هستیم و اطمینان می‌دهیم که هر محصول آهن، لوله و پروفیل با بالاترین معیارهای استاندارد صنعتی مطابقت دارد.',

    // Navigation Component
    'trusted_leaders': 'مورد اعتماد رهبران',

    // Slider / Companies Carousel
    'slider_1_t1': 'آریا صنعت', 'slider_1_t2': 'پروفیل', 'slider_1_t3': 'شرکت تولیدی',
    'slider_1_desc': 'شرکت تولیدی پروفیل آریا صنعت یک شرکت تجاری و صنعتی تولیدی است که در هرات، افغانستان فعالیت می‌کند. این کسب‌وکار به تولید پروفیل صنعتی و فعالیت‌های مرتبط با پردازش فولاد یا فلز شناخته می‌شود.',
    
    'slider_2_t1': 'فولاد افغانستان', 'slider_2_t2': 'تولیدی', 'slider_2_t3': 'اتحادیه فابریکات',
    'slider_2_desc': 'حمایت از رشد صنعتی و یکپارچگی بخش‌های تولیدی در سراسر منطقه با تمرکز بر تعالی فولاد و فلز. تأمین اجزای زیرساختی اساسی برای پروژه‌های توسعه ملی.',
    
    'slider_3_t1': 'فولاد صنعت', 'slider_3_t2': 'آهن و فولاد', 'slider_3_t3': 'فابریکه',
    'slider_3_desc': 'پیشرو در صنایع سنگین و پردازش فولاد در افغانستان. مجهز به فناوری مدرن برای تحویل مواد ساختمانی با کیفیت بالا برای بازار محلی.',
    
    'slider_4_t1': 'فضلی غزنوی', 'slider_4_t2': 'تولید پایپ', 'slider_4_t3': 'شرکت',
    'slider_4_desc': 'تخصص در تولید پایپ با کیفیت بالا و راهکارهای صنعتی. متعهد به تحویل اجزای زیرساختی حرفه‌ای برای پروژه‌های ساختمانی بزرگ.',
    
    'slider_5_t1': 'تولیدات صنعتی', 'slider_5_t2': 'هرات،', 'slider_5_t3': 'افغانستان',
    'slider_5_desc': 'یک قطب نوآوری صنعتی و تعالی تولید واقع در منطقه تجاری هرات. پیشبرد رشد اقتصادی منطقه از طریق خدمات تولیدی و تجاری اختصاصی.',
    
    'slider_6_t1': 'نوید مزار', 'slider_6_t2': 'صنعتی', 'slider_6_t3': 'شرکت',
    'slider_6_desc': 'گسترش دامنه تعالی تولید صنعتی به مزارشریف و فراتر از آن. ارائه راهکارهای تولیدی بومی‌سازی شده برای زیرساخت‌های بزرگ مقیاس و نیازهای صنعتی.',
    
    'slider_7_t1': 'جنرال متال', 'slider_7_t2': 'و فولاد', 'slider_7_t3': 'ساختمانی',
    'slider_7_desc': 'ساخت آینده‌ای قوی‌تر برای افغانستان از طریق پردازش فلز پیشرفته و مهندسی. یک عضو متعهد اتحادیه تولیدی با تمرکز بر کیفیت و پایداری.',
  },
  ps: {
    // Nav
    'home': 'کور',
    'companies': 'شرکتونه',
    'contact': 'اړیکه',
    'select_language': 'ژبه غوره کړئ',

    // Hero Section
    'powered_by': 'د ټولنې لخوا ځواکمن شوی',
    'hero_title_1': 'د افغانستان د تولیدي شرکتونو اتحادیه',
    'hero_title_2': 'قطي، پروفیل، اوسپنه او ګالوانیز پایپونه',
    'hero_desc': 'دا اتحادیه په ۱۴۰۳ (۲۰۲۴) کال کې د تولیدي شرکتونو ترمنځ د همغږۍ ښه کولو او د دولتي او غیر دولتي ادارو سره د همکارۍ پیاوړتیا لپاره تاسیس شوه، ترڅو د افغانستان د تولیدي سکتور وده ملاتړ وکړي.',
    'join_now': 'اوس یوځای شئ',

    // Companies Page
    'search_placeholder': 'د شرکتونو لټون...',
    'all_categories': 'ټولې کټګورۍ',
    'add_company': '+ شرکت اضافه کړئ',
    'location': 'موقعیت:',
    'view_details': 'تفصیلات وګورئ',
    'no_companies': 'هیڅ شرکت ونه موندل شو.',
    'our_members': '( زموږ غړي )',
    'leading': 'مخکښ',
    'companies_highlight': 'شرکتونه',
    'companies_desc': 'د صنعتي تولید کونکو او فابریکو په اړه معلومات ترلاسه کړئ چې د افغانستان د فولادو او پروفیل صنعت بنسټ جوړوي.',
    'all': 'ټول',
    'loading_units': 'د تولید واحدونه بارول کیږي...',
    'view_profile': 'پروفایل وګورئ',
    'no_companies_found': 'په اتحادیه کې هیڅ شرکت ونه موندل شو.',
    'add_first_company': 'خپل لومړی شرکت اضافه کړئ',

     // Contact
    'contact_us': 'موږ سره اړیکه ونیسئ',
    'send_message': 'پیغام واستوئ',
    'name': 'نوم',
    'email': 'بریښنالیک',
    'subject': 'موضوع',
    'message': 'پیغام',
    'location_label': 'موقعیت',
    'phone': 'تلیفون',
    'contact_header': '( موږ سره اړیکه ونیسئ )',
    'get_in_touch': 'اړیکه ونیسئ',
    'contact_desc': 'ایا تاسو زموږ د ټولنې په اړه پوښتنې لرئ؟ موږ دلته یو چې مرسته وکړو او هرې پوښتنې ته ځواب ووایو چې تاسو یې لرئ.',
    'contact_info_title': 'د اړیکې معلومات',
    'office_label': 'دفتر',
    'send_message_title': 'موږ ته پیغام واستوئ',
    'full_name_label': 'بشپړ نوم',
    'email_address_label': 'بریښنالیک پته',
    'subject_label': 'موضوع',
    'message_label': 'پیغام',
    'sending_btn': 'لیږل کیږي...',
    'send_message_btn': 'پیغام واستوئ',
    'success_message': 'ستاسو پیغام په بریالیتوب سره لیږل شوی!',
    'error_message': 'کومه ستونزه رامنځته شوه. مهرباني وکړئ وروسته بیا هڅه وکړئ.',
    'placeholder_name': 'جان دو',
    'placeholder_email': 'john@example.com',
    'placeholder_subject': 'موږ څنګه مرسته کولی شو؟',
    'placeholder_message': 'ستاسو پیغام دلته...',

    // Footer
    'rights_reserved': 'ټول حقونه خوندي دي.',
    'association_desc': 'د ټولنو پیاوړتیا او د همکارۍ او نوښت له لارې وده ته وده ورکول. د بدلون راوستلو لپاره موږ سره یوځای شئ.',
    'quick_links': 'چټک لینکونه',
    'resources': 'سرچینې',
    'stay_updated': 'خبر اوسئ',
    'newsletter_desc': 'د وروستي تازه معلوماتو لپاره زموږ په خبرپاڼه کې ګډون وکړئ.',
    'email_placeholder': 'خپل بریښنالیک دننه کړئ',
    'rights_reserved_text': 'ټولنه. ټول حقونه خوندي دي.',
    'privacy_policy': 'د محرمیت تګلاره',
    'terms_service': 'د خدمت شرایط',
    'cookies_settings': 'د کوکیز تنظیمات',
    'about_us': 'زموږ په اړه',
    'our_mission': 'زموږ ماموریت',
    'events': 'پیښې',
    'membership': 'غړیتوب',
    'news_updates': 'خبرونه او تازه معلومات',
    'documentation': 'اسناد',
    'support_center': 'د ملاتړ مرکز',
    'community': 'ټولنه',

    // About
    'about_header': '( زموږ د اتحادیې په اړه )',
    'about_desc': 'د افغانستان د صنعتي راتلونکي پیاوړتیا د همکارۍ په وده، د لوړ کیفیت ملي تولیداتو ملاتړ او د دوامداره تولیدي ودې لپاره د یو متحد ډګر په جوړولو سره.',
    'stats_factories_label': 'مخکښ فابریکې',
    'stats_factories_desc': 'زموږ اتحادیه په ټول افغانستان کې د صنعتي تولید فابریکو ترټولو لویه شبکه استازیتوب کوي، چې د فولادو او پروفیل تولید لپاره معیار ټاکي.',
    'stats_provinces_label': 'پوښل شوي ولایتونه',
    'stats_provinces_desc': 'له هرات څخه تر مزار پورې، زموږ فعالیتونه په لویو صنعتي مرکزونو کې پراخه دي، چې په ټول هیواد کې د دوامداره عرضه او د لوړې کچې تولید معیارونه تضمینوي.',
    'stats_quality_label': 'د کیفیت معیارونه',
    'stats_quality_desc': 'موږ د نړیوال تولید غوره والي ته ژمن یو، ډاډ ترلاسه کوو چې هر اوسپنه، پایپ او پروفیل محصول د لوړو صنعتي معیارونو سره سمون لري.',

    // Navigation Component
    'trusted_leaders': 'د مشرانو لخوا باور شوی',

    // Slider / Companies Carousel
    'slider_1_t1': 'آریا صنعت', 'slider_1_t2': 'پروفیل', 'slider_1_t3': 'تولیدي شرکت',
    'slider_1_desc': 'د آریا صنعت پروفیل تولید شرکت یو تولیدي او صنعتي سوداګریز شرکت دی چې په هرات، افغانستان کې فعالیت کوي. دا سوداګري د صنعتي پروفیل تولید او اړوندو فولادو یا فلزي پروسس فعالیتونو کې پیژندل کیږي.',
    
    'slider_2_t1': 'فولاد افغانستان', 'slider_2_t2': 'تولیدي', 'slider_2_t3': 'فابریکو اتحادیه',
    'slider_2_desc': 'د سیمې په کچه د صنعتي ودې او تولیدي سکتورونو ادغام ملاتړ د فولادو او فلزي غوره والي باندې تمرکز سره. د ملي پراختیایی پروژو لپاره اړین زیربنایی برخې چمتو کول.',
    
    'slider_3_t1': 'فولاد صنعت', 'slider_3_t2': 'آهن او فولاد', 'slider_3_t3': 'فابریکه',
    'slider_3_desc': 'په افغانستان کې د درنو صنایعو او فولادو پروسس په برخه کې مخکښ. د ځایی بازار لپاره د لوړ کیفیت ساختماني موادو وړاندې کولو لپاره په عصري ټیکنالوژۍ سمبال.',
    
    'slider_4_t1': 'فضلی غزنوی', 'slider_4_t2': 'پایپ تولید', 'slider_4_t3': 'شرکت',
    'slider_4_desc': 'د لوړ کیفیت پایپ تولید او صنعتي حلونو کې تخصص. د لویو ساختماني پروژو لپاره مسلکي زیربنایی برخو وړاندې کولو ته ژمن.',
    
    'slider_5_t1': 'صنعتي تولیدات', 'slider_5_t2': 'هرات،', 'slider_5_t3': 'افغانستان',
    'slider_5_desc': 'په هرات سوداګریزه سیمه کې د صنعتي نوښت او تولیدي غوره والي یو مرکز. د ځانګړي تولیدي او سوداګریزو خدماتو له لارې د سیمه ایزې اقتصادي ودې لامل کیږي.',
    
    'slider_6_t1': 'نوید مزار', 'slider_6_t2': 'صنعتي', 'slider_6_t3': 'شرکت',
    'slider_6_desc': 'مزارشریف او هاخوا ته د صنعتي تولید غوره والي پراختیا. د لوی کچې زیربنا او صنعتي اړتیاو لپاره ځایی شوي تولیدي حلونه وړاندې کول.',
    
    'slider_7_t1': 'جنرال متال', 'slider_7_t2': 'او فولاد', 'slider_7_t3': 'ساختماني',
    'slider_7_desc': 'د پرمختللي فلزي پروسس او انجینرۍ له لارې د افغانستان لپاره د پیاوړې راتلونکې جوړول. د تولیدي اتحادیې ژمن غړی چې په کیفیت او پایښت تمرکز کوي.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'da' || saved === 'ps') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    const dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const dir = language === 'en' ? 'ltr' : 'rtl';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
