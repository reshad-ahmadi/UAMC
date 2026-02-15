import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'da' | 'ps';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  companies: Company[];
}

export interface Company {
  id: string;
  image: string;
  logo?: string;
  title: string;
  description: string;
  factoryAddressLabel: string;
  factoryAddress: string;
  salesLabel: string;
  salesAddress: string;
  phoneLabel: string;
  phone: string;
  sloganLabel: string;
  slogan: string;
  email?: string;
  website?: string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'home': 'Home',
    'companies': 'Members',
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
      'about_mission_title': "Our Mission",
      'about_mission_desc': "To serve as a strategic bridge between the industrial sector and governing bodies, advocating for policies that foster local manufacturing growth and protecting the interests of Afghan steel and profile producers.",
      'about_vision_title': "Our Vision",
      'about_vision_desc': "To lead Afghanistan toward industrial self-sufficiency, where high-quality locally manufactured steel and pipe products become the primary choice for national infrastructure development.",
      'core_values': "Core Values",
      'value_integrity': "Integrity",
      'value_integrity_desc': "Upholding the highest ethical standards in manufacturing and trade.",
      'value_innovation': "Innovation",
      'value_innovation_desc': "Continuously modernizing facilities and production techniques.",
      'value_collaboration': "Collaboration",
      'value_collaboration_desc': "Fostering strong partnerships among members and stakeholders.",
     
     // Products Section
     'products_header': '( OUR PRODUCTS )',
     'products_title': 'Iron Pipes & Galvanized Products',
     'products_subtitle': 'Our member factories produce a wide range of high-quality iron and galvanized pipe products, built to meet international industrial standards for construction and infrastructure.',
     'product_iron_title': 'Iron Pipes',
     'product_iron_desc': 'Heavy-duty black iron pipes manufactured for structural applications, water distribution, gas lines, and industrial construction projects across Afghanistan.',
     'product_iron_f1': 'High tensile strength for structural use',
     'product_iron_f2': 'Available in multiple diameters and thicknesses',
     'product_iron_f3': 'Suitable for water, gas, and oil transport',
     'product_galvanized_title': 'Galvanized Pipes',
     'product_galvanized_desc': 'Zinc-coated steel pipes offering superior corrosion resistance, ideal for plumbing, fencing, scaffolding, and outdoor infrastructure applications.',
     'product_galvanized_f1': 'Zinc coating for corrosion protection',
     'product_galvanized_f2': 'Long lifespan in harsh environments',
     'product_galvanized_f3': 'Perfect for plumbing and outdoor use',
     'product_profiles_title': 'Steel Profiles & Cans',
     'product_profiles_desc': 'Precision-engineered steel profiles including I-beams, channels, angles, and square/rectangular cans for commercial and residential construction.',
     'product_profiles_f1': 'Wide range of shapes and sizes',
     'product_profiles_f2': 'Precision-cut for construction accuracy',
     'product_profiles_f3': 'Load-bearing structural applications',

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

     // Detailed About Content
     'about_detailed_title': 'Union of Afghan Manufacturing Companies of Cans, Profiles, Iron and Galvanized Pipes',
     'about_detailed_p1': 'The Union of Afghan Manufacturing Companies of Cans, Profiles, Iron and Galvanized Pipes was established in 2024 (1403 in the Afghan calendar) with the primary objective of fostering internal coordination among related manufacturing industries and strengthening cooperation with governmental and non-governmental institutions. With a strategic focus on enhancing both the quality and quantity of domestic production, the Union officially obtained its license to operate from the Ministry of Justice of the Islamic Emirate of Afghanistan on 30 October 2025 (8/8/1404) and commenced its practical activities thereafter.',
     'about_detailed_p2': 'Although Afghanistan’s manufacturing industries are relatively new and in their formative stage, they have successfully pursued a path of growth and development by producing high-quality goods. By substituting domestic products for low-quality imports, these industries have played a vital role in meeting local market demands and significantly reducing dependence on foreign imports.',
     'about_detailed_p3': 'Despite these achievements, domestic industries remain vulnerable to external threats such as dumping policies and unfair foreign competition. Therefore, comprehensive and coordinated efforts are essential to ensure further growth and sustainable development of this sector.',
     'about_detailed_p4': 'The Union can leverage existing opportunities to attract governmental and non-governmental support, thereby creating the foundation for long-term industrial sustainability. Such measures not only prevent the collapse of domestic industries but also strengthen their resilience against internal and external challenges.',
     'about_detailed_p5': 'One of the Union’s fundamental responsibilities is to establish effective communication and interaction among its members, as well as between the government and the manufacturing sector. By regulating industrial affairs, promoting technical knowledge, organizing market structures, and preventing unhealthy competition, the Union can play a crucial role in strengthening Afghanistan’s manufacturing base. Furthermore, the Union can facilitate purposeful collaboration between industries and other institutions, thereby contributing to the prosperity and sustainability of the sector and ultimately to the national economy.',
     'about_detailed_p6': 'In the contemporary global context, particularly in developing countries, industrial unions are recognized as vital institutions for industrial growth and advancement. The active and effective presence of this Union in Afghanistan can pave the way for the development of can, profile, iron, and galvanized pipe industries. Through practical and coordinated measures, existing challenges can be addressed, enabling domestic industries not only to compete in the national market but also to gradually establish their position at the regional level.',
    
    // Member - Shirzad Steel
    'shirzad_title': "Shirzad Steel Profile Manufacturing Company",
    'shirzad_desc': `Shirzad Steel Profile Manufacturing Company was established in 2023 in the Herat Industrial Park (Phase 2, Shokofa 4) and commenced its operations in the production of steel and galvanized square tubes and pipes in various sizes and thicknesses. With an annual production capacity exceeding 25,000 tons and a dedicated team of 25 skilled professionals, the company is recognized as one of the leading manufacturers in the pipe and profile industry in Afghanistan.\n\nBy utilizing advanced production technologies and experienced human resources, Shirzad Steel has become the first manufacturer in the country to produce 8-inch pipes with a thickness of 6 millimeters, marking a significant milestone in the development of Afghanistan’s profile manufacturing sector. The company’s products are distributed to all provinces across the country in order to meet domestic market demands.\n\nShirzad Steel’s primary objective is to enhance the quality of local manufacturing, strengthen the national industrial sector, and create a sustainable foundation for economic growth and job creation at the national level.`,
    'shirzad_factory_label': "Factory Address:",
    'shirzad_factory_addr': "Herat Industrial Park, Phase 2, Shokofa 4",
    'shirzad_sales_label': "Sales Office Address:",
    'shirzad_sales_addr': "Herat, Bakrabad Roundabout, Opposite Jada-e-Millat Road",
    'shirzad_phone_label': "Contact Numbers:",
    'shirzad_phones': "0708000500 – 0792101010",
    'shirzad_slogan_label': "Company Slogan:",
    'shirzad_slogan': "Shirzad Steel – A Distinct Path in the Nation’s Profile Industry",

    // Member - Shamal Profile
    'shamal_title': "Shamal Profile Industrial and Manufacturing Company",
    'shamal_desc': `Shamal Profile Industrial and Manufacturing Company, holder of license number (D-01-1536), is officially registered with the esteemed Ministry of Industry and Commerce of Afghanistan. The company was founded in 2014 (1393) in Balkh Province, northern Afghanistan, under the leadership of Haji Mohammad Aslam Osmani as President and his partners.\n\nIn 2020 (1399), the company established its second branch in Kabul Industrial Parks. Furthermore, its third branch, equipped with modern machinery capable of producing various iron and galvanized profiles and pipes up to 6 millimeters, will soon be inaugurated in Mazar-e-Sharif.\n\nThe factories have a production capacity of 300 tons per 24 hours, with an annual capacity of 109,500 tons. The company produces profiles, sheets, iron and galvanized pipes, door frames, and structural steel for hangars. Products include profiles from 10x10 mm to 140x140 mm (up to 4mm thickness) and pipes from 1.3 cm to 8 inches (1-4mm thickness).`,
    'shamal_factory_label': "Factory Addresses:",
    'shamal_factory_addr': "Kabul Industrial Parks & Balkh Province",
    'shamal_sales_label': "Sales Office:",
    'shamal_sales_addr': "Mazar-e-Sharif & Kabul",
    'shamal_phone_label': "Contact Numbers:",
    'shamal_phones': "0799-XXX-XXX",
    'shamal_slogan_label': "Company Slogan:",
    'shamal_slogan': "Quality Production, National Pride",

    // Member - Aria Sanat
    'aria_title': "Aria Sanat Profile Manufacturing Company",
    'aria_desc': `Aria Sanat Profile Manufacturing Company commenced its operations in 2011 with the aim of meeting domestic market demand, enhancing the quality of metal products, expanding trade, and creating sustainable employment opportunities in Afghanistan. Upon entering the market, the company began production with 18 types of profiles and, through continuous development and the adoption of modern technologies, has expanded its product portfolio to more than 250 diversified products. Today, Aria Sanat is recognized as one of the leading profile manufacturers in the country.\n\nThe Aria Sanat factory has been established on a land area of 7,000 square meters, and in recent years its total industrial built-up area has been expanded to over 10,000 square meters. This industrial complex comprises various sections, including fully equipped production halls, quality control laboratories, standard warehouses, and specialized departments such as factory management, engineering and production design, planning, research and development (R&D), quality control, and a central warehouse.\n\nSince the beginning of its activities, Aria Sanat has utilized advanced technologies imported from reputable Chinese companies and has strengthened its position through continuous technical and production cooperation with international partners. The company has established itself as one of the largest and most reliable manufacturers of steel profiles, square and rectangular tubes, and iron and galvanized pipes in a wide range of dimensions and thicknesses. This approach has ensured that Aria Sanat products remain competitive and trustworthy in terms of quality, delivery time, and pricing.\n\nAria Sanat’s quality policy is based on three fundamental principles:\n1) Manufacturing high-quality products in accordance with industrial standards\n2) Ensuring timely and reliable delivery to customers\n3) Offering competitive and reasonable prices\n\nWith a strong commitment to customer satisfaction and continuous improvement, Aria Sanat consistently strives to play an effective role in the industrial and economic growth of Afghanistan.`,
    'aria_factory_label': "Factory Address:",
    'aria_factory_addr': "Herat, Afghanistan, Industrial Park, Phase 2, Shokofa 4",
    'aria_sales_label': "Sales Office Address:",
    'aria_sales_addr': "Herat, Spin Adi Area, Adjacent to Jawaz Mosque, Molana Adina (RA)",
    'aria_phone_label': "Contact Numbers:",
    'aria_phones': "0799000500 / 0791646464",
    'aria_slogan_label': "Company Slogan:",
    'aria_slogan': "Aria Sanat – A Symbol of Quality and Pride in the Nation’s Profile Industry",
  },
  da: {
    // Nav
    'home': 'خانه',
    'companies': 'اعضا',
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
      'about_mission_title': 'ماموریت ما',
      'about_mission_desc': 'خدمت به عنوان یک پل استراتژیک بین بخش صنعتی و نهادهای حاکم، حمایت از سیاست‌هایی که باعث رشد تولیدات داخلی می‌شود و محافظت از منافع تولیدکنندگان فولاد و پروفیل افغانستان.',
      'about_vision_title': 'دیدگاه ما',
      'about_vision_desc': 'رهبری افغانستان به سمت خودکفایی صنعتی، جایی که محصولات فولادی و لوله‌های با کیفیت تولید شده در داخل، انتخاب اصلی برای توسعه زیرساخت‌های ملی باشد.',
      'core_values': 'ارزش‌های اصلی',
      'value_integrity': 'صداقت',
      'value_integrity_desc': 'حفظ بالاترین استانداردهای اخلاقی در تولید و تجارت.',
      'value_innovation': 'نوآوری',
      'value_innovation_desc': 'مدرن‌سازی مداوم تسهیلات و تکنیک‌های تولید.',
      'value_collaboration': 'همکاری',
      'value_collaboration_desc': 'تقویت مشارکت‌های قوی بین اعضا و ذینفعان.',

    // Products Section
    'products_header': '( محصولات ما )',
    'products_title': 'لوله‌های آهنی و محصولات گالوانیزه',
    'products_subtitle': 'کارخانه‌های عضو ما طیف گسترده‌ای از محصولات لوله‌های آهنی و گالوانیزه با کیفیت بالا تولید می‌کنند که مطابق استانداردهای بین‌المللی صنعتی برای ساخت و ساز و زیرساخت ساخته شده‌اند.',
    'product_iron_title': 'لوله‌های آهنی',
    'product_iron_desc': 'لوله‌های آهنی سیاه سنگین برای کاربردهای سازه‌ای، توزیع آب، خطوط گاز و پروژه‌های ساختمانی صنعتی در سراسر افغانستان تولید می‌شوند.',
    'product_iron_f1': 'استحکام کششی بالا برای استفاده سازه‌ای',
    'product_iron_f2': 'موجود در قطرها و ضخامت‌های مختلف',
    'product_iron_f3': 'مناسب برای حمل و نقل آب، گاز و نفت',
    'product_galvanized_title': 'لوله‌های گالوانیزه',
    'product_galvanized_desc': 'لوله‌های فولادی با پوشش روی که مقاومت عالی در برابر خوردگی دارند، ایده‌آل برای لوله‌کشی، حصارکشی، داربست و کاربردهای زیرساختی فضای باز.',
    'product_galvanized_f1': 'پوشش روی برای محافظت در برابر خوردگی',
    'product_galvanized_f2': 'عمر طولانی در محیط‌های سخت',
    'product_galvanized_f3': 'مناسب برای لوله‌کشی و استفاده در فضای باز',
    'product_profiles_title': 'پروفیل‌های فولادی و قوطی',
    'product_profiles_desc': 'پروفیل‌های فولادی مهندسی شده شامل تیرآهن، ناودانی، نبشی و قوطی‌های مربع/مستطیل برای ساخت و ساز تجاری و مسکونی.',
    'product_profiles_f1': 'طیف گسترده‌ای از اشکال و اندازه‌ها',
    'product_profiles_f2': 'برش دقیق برای صحت ساختمانی',
    'product_profiles_f3': 'کاربردهای سازه‌ای باربر',

    // Navigation Component
    'trusted_leaders': 'مورد اعتماد رهبران',

    // Slider / Companies Carousel
    'slider_1_t1': 'آریا صنعت', 'slider_1_t2': 'پروفیل', 'slider_1_t3': 'شرکت تولیدی',
    'slider_1_desc': 'شرکت تولیدی پروفیل آریا صنعت یک شرکت تجاری و صنعتی تولیدی است که در هرات، افغانستان فعالیت می‌کند. این کسب‌وکار به تولید پروفیل صنعتی و فعالیت‌های مرتبط با پردازش فولاد یا فلز شناخته می‌شود.',
    
    'slider_2_t1': 'فولاد افغانستان', 'slider_2_t2': 'تولیدی', 'slider_2_t3': 'اتحادیه فابریکات',
    'slider_2_desc': 'حمایت از رشد صنعتی och یکپارچگی بخش‌های تولیدی در سراسر منطقه با تمرکز بر تعالی فولاد و فلز. تأمین اجزای زیرساختی اساسی برای پروژه‌های توسعه ملی.',
    
    'slider_3_t1': 'فولاد صنعت', 'slider_3_t2': 'آهن و فولاد', 'slider_3_t3': 'فابریکه',
    'slider_3_desc': 'پیشرو در صنایع سنگین و پردازش فولاد در افغانستان. مجهز به فناوری مدرن برای تحویل مواد ساختمانی با کیفیت بالا برای بازار محلی.',
    
    'slider_4_t1': 'فضلی غزنوی', 'slider_4_t2': 'تولید پایپ', 'slider_4_t3': 'شرکت',
    'slider_4_desc': 'تخصص در تولید پایپ با کیفیت بالا و راهکارهای صنعتی. متعهد به تحویل اجزای زیرساختی حرفه‌ای برای پروژه‌های ساختمانی بزرگ.',
    
    'slider_5_t1': 'تولیدات صنعتی', 'slider_5_t2': 'هرات،', 'slider_5_t3': 'افغانستان',
    'slider_5_desc': 'یک قطب نوآوری صنعتی و تعالی تولید واقع در منطقه تجاری هرات. پیشبرد رشد اقتصادی منطقه از طریق خدمات تولیدی و تجاری اختصاصی.',
    
    'slider_6_t1': 'نوید مزار', 'slider_6_t2': 'صنعتی', 'slider_6_t3': 'شرکت',
    'slider_6_desc': 'گسترش دامنه تعالی تولید صنعتی به مزارشریف و فراتر از آن. ارائه راهکارهای تولیدی بومی‌سازی شده برای زیرساخت‌های بزرگ مقیاس و نیازهای صنعتی.',
    
    'slider_7_t1': 'جنرال متال', 'slider_7_t2': 'و فولاد', 'slider_7_t3': 'ساختمانی',
    'slider_7_desc': 'ساخت آینده‌ای قوی‌تر برای افغانستان از طریق پردازش فلز پیشرفته و انجینرینگ. یک عضو متعهد اتحادیه تولیدی با تمرکز بر کیفیت و پایداری.',

    // Detailed About Content
    'about_detailed_title': 'اتحادیه شرکتهای تولیدی قوطی، پروفیل، نل آهنی و جستی افغانستان',
    'about_detailed_p1': 'اتحادیه شرکتهای تولیدی قوطی، پروفیل، نل آهنی و جستی افغانستان با هدف ایجاد هماهنگی درون سازمانی میان صنایع تولیدی مرتبط و همچنین تقویت تعامل با نهادهای دولتی و غیردولتی، در سال ۱۴۰۳ خورشیدی تأسیس گردیده، و این اتحادیه با رویکرد ارتقای کیفیت و افزایش کمیت محصولات تولیدی، به تاریخ ۸/۸/۱۴۰۴ خورشیدی موفق به اخذ جواز رسمی فعالیت از وزارت عدلیه امارت اسلامی افغانستان شد و از همان تاریخ فعالیتهای عملی خویش را آغاز نمود.',
    'about_detailed_p2': 'صنایع تولیدی افغانستان، هرچند تازه تأسیس و نوپا هستند، اما توانستهاند با عرضه و تولید محصولات باکیفیت، مسیر رشد و توسعه را در پیش گیرند. این صنایع با جایگزین نمودن تولیدات داخلی به جای کالاهای کم کیفیت وارداتی، نقش موثری در تأمین نیازهای بازار داخلی ایفا کرده و میزان وابستگی به واردات بسیاری از محصولات را به حداقل رسانده اند.',
    'about_detailed_p3': 'با وجود این دستاوردها، صنایع داخلی درمعرض تهدید سیاستهای دامپینگ و رقابتهای ناسالم خارجی قرار دارند. بنابراین، تلاشهای گسترده و هماهنگ برای رشد و انکشاف بیشتر این بخش ضروری است.',
    'about_detailed_p4': 'بناً این اتحادیه میتواند با بهره گیری از فرصتهای موجود، همکاری و حمایتهای دولتی و غیردولتی را جلب کرده و زمینه برای توسعه پایدار صنایع داخلی را فراهم سازند. چنین اقداماتی نه تنها از ورشکستگی و نابودی صنایع داخلی جلوگیری میکند، بلکه توان مقاومت در برابرتهدیدات خارجی و داخلی را افزایش میدهد.',
    'about_detailed_p5': 'یکی از وظایف اساسی اتحادیه، ایجاد ارتباط و تعامل مؤثر میان اعضا و همچنین میان دولت و بخش صنایع تولیدی است. اتحادیه میتواند با تنظیم امور، توسعه دانش فنی، ایجاد نظم در بازار و جلوگیری از رقابتهای ناسالم، نقش مهمی در تقویت صنایع ایفا نماید. علاوه براین، اتحادیه میتواند تعامل هدفمند میان صنایع و سایر نهادها را شکل دهد و به رونق و پایداری این سکتور و در نهایت به اقتصاد ملی کشور کمک کنند.',
    'about_detailed_p6': 'از آنجایکه درشرایط کنونی جهان به ویژه در کشورهای در حال توسعه، اتحادیههای صنعتی بهعنوان نهادهای حیاتی در رشد و انکشاف صنایع شناخته میشوند. حضور فعال و مؤثر این اتحادیه در افغانستان میتواند مسیر توسعه صنایع تولیدی قوطی، پروفیل، نل آهنی و جستی را هموار سازد و با اقدامات عملی و هماهنگ، مشکلات موجود را برطرف نماید. بدین ترتیب، صنایع داخلی نه تنها توان رقابت در بازار ملی را خواهند داشت، بلکه میتوانند به تدریج جایگاه خود را در سطح منطقه نیز تثبیت نمایند.',
    'about_detailed_journey': 'سفر استراتژیک ما',

    // Member - Shirzad Steel
    'shirzad_title': "شرکت تولیدی پروفیل شیرزاد استیل",
    'shirzad_desc': `شرکت تولیدی پروفیل شیرزاد استیل در سال ۱۴۰۲ هجری شمسی در شهرک صنعتی هرات (فاز ۲، شکوفه ۴) تأسیس گردیده و فعالیت خود را در زمینه تولید قوطی و لولههای آهنی و گالوانیزه در سایزها و ضخامتهای مختلف آغاز نموده است. این شرکت با ظرفیت تولید سالانه بیش از ۲۵٬۰۰۰ تن و بهرهمندی از یک تیم متشکل از ۲۵ نفر نیروی متخصص، بهعنوان یکی از شرکتهای پیشرو در صنعت تولید قوطی و لوله در افغانستان شناخته میشود.\n\nشیرزاد استیل با بهرهگیری از فناوریهای پیشرفته و نیروی انسانی مجرب، بهعنوان نخستین تولیدکننده لولههای ۸ اینچ با ضخامت ۶ میلیمتر در کشور، گامی مهم در توسعه صنعت پروفیل افغانستان برداشته است. محصولات این شرکت با هدف پاسخگویی به نیازهای بازار داخلی، به تمامی ولایات افغانستان عرضه میگردد.\n\nهدف اصلی شیرزاد استیل، ارتقای کیفیت تولیدات داخلی، تقویت زیرساختهای صنعتی کشور و ایجاد بستری پایدار برای رشد اقتصادی و اشتغالزایی در سطح ملی میباشد.`,
    'shirzad_factory_label': "آدرس کارخانه:",
    'shirzad_factory_addr': "هرات، شهرک صنعتی، فاز ۲، شکوفه ۴",
    'shirzad_sales_label': "آدرس دفتر فروش:",
    'shirzad_sales_addr': "هرات، فلکه بکرآباد، مقابل جاده ملت",
    'shirzad_phone_label': "شمارههای تماس:",
    'shirzad_phones': "0708000500 – 0792101010",
    'shirzad_slogan_label': "شعار شرکت:",
    'shirzad_slogan': "شیرزاد استیل؛ خطی متفاوت در صنعت پروفیل کشور",

    // Member - Shamal Profile
    'shamal_title': "شرکت صنعتی و تولیدی شمال پروفیل",
    'shamal_desc': `شرکت صنعتی و تولیدی شمال پروفیل دارنده نمبر جواز (D-01-1536) ثبت وراجستر شده وزارت محترم صنعت و تجارت افغانستان بوده که درسال 1393 (2014) در شمال افغانستان ولایت بلخ تاسیس گردید. این فابریکه درسال 1399 (2020) نماینده گی دوم خویش را در پارک های صنعتی کابل تاسیس نمود.\n\nهمچنان نماینده گی سوم این فابریکه با ماشین آلات مدرن که ظرفیت تولید انواع پروفیل ونل های آهنی و جستی الی 6 ملی را دارد در مزار شریف عنقریب افتتاح میگردد. فابریکات این شرکت ظرفیت تولید 300 تن در 24 ساعت وسالانه ظرفیت تولید 109،500 تن را دارد.\n\nاین فابریکه انواع مختلف پروفیل (10x10 الی 140x140)، قطی، نل های آهنی و جستی (1.3 سانتی الی 8 انچ)، چوکات های آهنی دروازه و آهن آلات ساخت هنگرها را تولید میکند.`,
    'shamal_factory_label': "آدرس فابریکه:",
    'shamal_factory_addr': "پارک های صنعتی کابل و ولایت بلخ",
    'shamal_sales_label': "دفتر فروش:",
    'shamal_sales_addr': "مزار شریف و کابل",
    'shamal_phone_label': "شماره های تماس:",
    'shamal_phones': "0799-XXX-XXX",
    'shamal_slogan_label': "شعار شرکت:",
    'shamal_slogan': "تولید با کیفیت، افتخار ملی",

    // Member - Aria Sanat
    'aria_title': "شرکت تولید پروفیل آریا صنعت",
    'aria_desc': `شرکت تولید پروفیل آریا صنعت فعالیت خود را در سال ۱۳۹۰ با هدف تأمین نیاز بازار داخلی، ارتقای کیفیت محصولات فلزی، توسعه تجارت و ایجاد فرصتهای شغلی پایدار در افغانستان آغاز نمود. این شرکت در بدو ورود به بازار، تولید ۱۸ نوع پروفیل را در دستور کار خود قرار داد و با تکیه بر توسعه مستمر و بهکارگیری فناوریهای نوین، امروزه با بیش از ۲۵۰ نوع محصول متنوع، بهعنوان یکی از پیشگامان صنعت تولید پروفیل در کشور شناخته میشود.\n\nکارخانه آریا صنعت در زمینی به مساحت ۷٬۰۰۰ متر مربع احداث گردیده و طی سالهای اخیر، زیربنای صنعتی آن به بیش از ۱۰٬۰۰۰ متر مربع توسعه یافته است. این مجموعه صنعتی شامل بخشهای مختلفی از جمله سالنهای تولید مجهز، آزمایشگاههای کنترل کیفیت، انبارهای استاندارد و واحدهای تخصصی نظیر مدیریت کارخانه، مهندسی و طراحی تولید، برنامهریزی، تحقیق و توسعه (R&D)، کنترل کیفیت و انبار مرکزی میباشد.\n\nآریا صنعت از ابتدای فعالیت خود با بهرهگیری از فناوریهای پیشرفته وارداتی از شرکتهای معتبر چینی و از طریق همکاریهای فنی و تولیدی مستمر با شرکای بینالمللی، جایگاه خود را بهعنوان یکی از بزرگترین و معتبرترین تولیدکنندگان پروفیل، قوطی و لولههای آهنی و گالوانیزه در ابعاد و ضخامتهای متنوع تثبیت نموده است. این رویکرد موجب شده است محصولات این شرکت از نظر کیفیت، زمان تحویل و قیمت، همواره رقابتپذیر و قابل اعتماد باشند.\n\nخطمشی کیفیت شرکت آریا صنعت بر سه اصل اساسی استوار است:\n1) تولید محصولات با کیفیت مطابق با استانداردهای صنعتی\n2) تحویل بهموقع و مطمئن به مشتریان\n3) ارائه قیمت های رقابتی و منطقی\n\nآریا صنعت با تعهد به رضایت مشتریان و بهبود مستمر، همواره در مسیر ایفای نقشی مؤثر در رشد صنعتی و اقتصادی افغانستان گام برمیدارد.`,
    'aria_factory_label': "آدرس کارخانه:",
    'aria_factory_addr': "افغانستان، هرات، شهرک صنعتی، فاز ۲، شکوفه ۴",
    'aria_sales_label': "آدرس دفتر فروشات:",
    'aria_sales_addr': "هرات، اسپین اَدی، جوار مسجد جامع مولانا آدینه (رح)",
    'aria_phone_label': "شماره‌های تماس:",
    'aria_phones': "0799000500 / 0791646464",
    'aria_slogan_label': "شعار شرکت:",
    'aria_slogan': "آریا صنعت؛ نماد کیفیت و افتخار در صنعت پروفیل کشور",
  },
  ps: {
    // Nav
    'home': 'کور',
    'companies': 'غړي',
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
      'about_mission_title': 'زموږ ماموریت',
      'about_mission_desc': 'د صنعتي سکتور او حاکمو بنسټونو ترمنځ د یوې ستراتیژیکې پل په توګه خدمت کول، د هغو پالیسیو ملاتړ کول چې د کورني تولیداتو وده لامل کیږي او د افغان فولادو او پروفیل تولیدونکو ګټو ساتنه.',
      'about_vision_title': 'زموږ لید',
      'about_vision_desc': 'افغانستان د صنعتي ځان بسیاینې په لور رهبري کول، چیرې چې په کور دننه تولید شوي د فولادو او پایپونو لوړ کیفیت لرونکي محصولات د ملي زیربناوو د پراختیا لپاره لومړنی انتخاب وي.',
      'core_values': 'اصلي ارزښتونه',
      'value_integrity': 'رښتونولي',
      'value_integrity_desc': 'په تولید او سوداګرۍ کې د لوړو اخلاقي معیارونو ساتل.',
      'value_innovation': 'نوښت',
      'value_innovation_desc': 'د تولیدي اسانتیاوو او تخنیکونو دوامداره عصري کول.',
      'value_collaboration': 'همکاري',
      'value_collaboration_desc': 'د غړو او ذینفعانو ترمنځ د قوي مشارکتونو رامینځته کول.',

    // Products Section
    'products_header': '( زموږ محصولات )',
    'products_title': 'د اوسپنې پایپونه او ګالوانیز محصولات',
    'products_subtitle': 'زموږ غړي فابریکې د لوړ کیفیت اوسپنې او ګالوانیز پایپ محصولاتو پراخه لړۍ تولیدوي، چې د ساختمان او زیربنا لپاره د نړیوالو صنعتي معیارونو سره سم جوړ شوي.',
    'product_iron_title': 'د اوسپنې پایپونه',
    'product_iron_desc': 'درنې توره اوسپنې پایپونه چې د سازه‌ایی کارونو، د اوبو ویش، د ګاز لینونو او په ټول افغانستان کې د صنعتي ساختماني پروژو لپاره تولیدیږي.',
    'product_iron_f1': 'د سازه‌ایی کارونو لپاره لوړ کششي ځواک',
    'product_iron_f2': 'په مختلفو قطرونو او ضخامتونو کې شتون لري',
    'product_iron_f3': 'د اوبو، ګاز او تیلو لیږد لپاره مناسب',
    'product_galvanized_title': 'ګالوانیز پایپونه',
    'product_galvanized_desc': 'د زنګ پوښ لرونکي فولادي پایپونه چې د زنګ وهلو پر وړاندې غوره مقاومت وړاندې کوي، د پلمبینګ، باڼ جوړولو، داربست او بهرني زیربنایی کارونو لپاره مناسب.',
    'product_galvanized_f1': 'د زنګ وهلو مخنیوی لپاره زنګ پوښ',
    'product_galvanized_f2': 'په سختو چاپیریالونو کې اوږد عمر',
    'product_galvanized_f3': 'د پلمبینګ او بهرني کارولو لپاره مناسب',
    'product_profiles_title': 'فولادي پروفیلونه او قوطي',
    'product_profiles_desc': 'دقیق مهندسي شوي فولادي پروفیلونه شمیره تیرآهن، ناودانی، نبشی او مربع/مستطیل قوطي د سوداګریز او استوګنیز ساختمان لپاره.',
    'product_profiles_f1': 'د شکلونو او اندازو پراخه لړۍ',
    'product_profiles_f2': 'د ساختماني دقت لپاره دقیق پرې شوي',
    'product_profiles_f3': 'د بار وړونکي سازه‌ایی کارونه',

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

    // Detailed About Content
    'about_detailed_title': 'د افغانستان د قوطۍ، پروفیل، اوسپنیزو او جستي پایپونو د تولیدي شرکتونو اتحادیه',
    'about_detailed_p1': 'د افغانستان د قوطۍ، پروفیل، اوسپنیزو او جستي پایپونو د تولیدي شرکتونو اتحادیه په ۱۴۰۳ هجري لمریز کال کې د دې لپاره تأسیس شوه چې د اړوندو تولیدي صنعتونو ترمنځ داخلي همغږي رامنځته کړي او د دولتي او غیر دولتي بنسټونو سره تعامل او همکاري پیاوړې کړي. دغه اتحادیه د تولیداتو د کیفیت او کمیت د لوړولو په موخه، د ۱۴۰۴ هجري لمریز کال د لړم په ۸مه نېټه د افغانستان د اسلامي امارت د عدلیې وزارت څخه رسمي جواز ترلاسه کړ او له همدې نېټې یې عملي فعالیتونه پیل کړل.',
    'about_detailed_p2': 'که څه هم د افغانستان تولیدي صنایع تازه تأسیس او نوې دي، خو توانېدلي دي چې د لوړ کیفیت لرونکو محصولاتو په تولید سره د ودې او پرمختګ لاره خپله کړي. دغه صنایع د ټیټ کیفیت لرونکو وارداتي توکو پر ځای د کورنیو تولیداتو په وړاندې کولو سره د داخلي بازار اړتیاوې پوره کړي او د ډېرو محصولاتو واردات یې تر ډېره حده راکم کړي دي.',
    'about_detailed_p3': 'سره له دې لاسته راوړنو، کورني صنایع د ډمپینگ سیاستونو او ناسالمې بهرنۍ سیالۍ له ګواښ سره مخ دي. له همدې امله، پراخې او همغږې هڅې د دې سکتور د لا زیاتې ودې او پراختیا لپاره اړینې دي.',
    'about_detailed_p4': 'اتحادیه کولای شي له موجودو فرصتونو څخه ګټه واخلي، د دولتي او غیر دولتي ملاتړ جلب کړي او د کورنیو صنعتونو د پایدارې ودې زمینه برابره کړي. دا اقدامات نه یوازې د کورنیو صنعتونو له ورشکستګۍ او له منځه تلو مخنیوی کوي، بلکې د داخلي او خارجي ګواښونو پر وړاندې د هغوی د مقاومت وړتیا هم زیاتوي.',
    'about_detailed_p5': 'د اتحادیې له اساسي دندو څخه یوه دا ده چې د غړو ترمنځ او همدارنګه د دولت او تولیدي سکتور ترمنځ اغېزمنه اړیکه او تعامل رامنځته کړي. اتحادیه کولای شي د چارو په تنظیم، د تخنیکي پوهې په پراختیا, د بازار په منظمولو او د ناسالمې سیالۍ په مخنیوي کې مهم رول ولوبوي. سربېره پر دې، اتحادیه کولای شي د صنعتونو او نورو بنسټونو ترمنځ هدفمند تعامل رامنځته کړي او د دې سکتور د رونق او پایدارۍ سبب شي چې په پایله کې د هېواد ملي اقتصاد ته مرسته وکړي.',
    'about_detailed_p6': 'په اوسني نړیوال وضعیت کې، په ځانګړي ډول په پرمختیايي هېوادونو کې، صنعتي اتحادیې د صنعتونو د ودې او پراختیا لپاره حیاتي بنسټونه ګڼل کېږي. د دې اتحادیې فعال او اغېزمن حضور په افغانستان کې کولای شي د قوطۍ، پروفیل، اوسپنیزو او جستي پایپونو د تولیدي صنعتونو د ودې لاره هواره کړي او د عملي او همغږو اقداماتو له لارې موجودې ستونزې حل کړي. په دې توګه، کورني صنایع نه یوازې د ملي بازار په کچه د سیالۍ توان پیدا کوي، بلکې په تدریج سره کولای شي په سیمه ییزه کچه خپل ځای تثبیت کړي.',
    'about_detailed_journey': 'زموږ ستراتیژیک سفر',

    // Member - Shirzad Steel
    'shirzad_title': "د شیرزاد استیل د پروفیل تولیدي شرکت",
    'shirzad_desc': `د شیرزاد استیل د پروفیل تولیدي شرکت په ۱۴۰۲ لمریز کال کې د هرات په صنعتي ښارګوټي (فاز ۲، شکوفه ۴) کې تأسیس شو او د اوسپنیزو او ګالوانیزه قوطیو او پایپونو د تولید په برخه کې یې خپل فعالیت پیل کړ. دغه شرکت د بېلابېلو اندازو او ضخامتونو محصولاتو په تولید سره، د کلني تولید له ۲۵٬۰۰۰ ټنو څخه د زیاتو ظرفیت او د ۲۵ کسیز مسلکي کاري ټیم په لرلو، د افغانستان د قوطیو او پایپونو د تولید په صنعت کې د مخکښو شرکتونو له ډلې څخه شمېرل کېږي.\n\nشیرزاد استیل د پرمختللې ټکنالوژۍ او تجربه لرونکي بشري ځواک په کارولو سره، په هېواد کې د لومړي ځل لپاره د ۶ مليمتر ضخامت لرونکي ۸ اینچه پایپونو تولید پیل کړی، چې دا د افغانستان د پروفیل صنعت د ودې په برخه کې یو مهم ګام بلل کېږي. د دغه شرکت محصولات د کورني بازار د اړتیاوو د پوره کولو په موخه، د افغانستان ټولو ولایتونو ته عرضه کېږي.\n\nد شیرزاد استیل اساسي موخه د کورنیو تولیداتو د کیفیت لوړول، د هېواد د صنعتي بنسټونو پیاوړتیا، او په ملي کچه د اقتصادي ودې او کاري فرصتونو د رامنځته کولو لپاره د دوامدارې زمینې برابرول دي.`,
    'shirzad_factory_label': "د فابریکې پته:",
    'shirzad_factory_addr': "هرات، صنعتي ښارګوټی، فاز ۲، شکوفه ۴",
    'shirzad_sales_label': "د پلور دفتر پته:",
    'shirzad_sales_addr': "هرات، بکرآباد څلورلارې، د ملت سړک ته مخامخ",
    'shirzad_phone_label': "د اړیکې شمېرې:",
    'shirzad_phones': "0708000500 – 0792101010",
    'shirzad_slogan_label': "د شرکت شعار:",
    'shirzad_slogan': "شیرزاد استیل؛ د هېواد د پروفیل صنعت کې یوه بېله لاره",

    // Member - Shamal Profile
    'shamal_title': "شمال پروفایل صنعتي او تولیدي شرکت",
    'shamal_desc': `شمال پروفایل صنعتي او تولیدي شرکت د جواز نمبر (D-01-1536) لرونکی دی چې په کال ۱۳۹۳ (۲۰۱۴) کې د بلخ ولایت په شمالي افغانستان کې تاسیس شو. په کال ۱۳۹۹ (۲۰۲۰) کې دغه شرکت خپله دوهمه نمایندګي د کابل په صنعتي پارکونو کې پرانستله.\n\nهمدارنګه، د دې فابریکې درېیمه نمایندګي چې له عصري ماشینونو سره مجهزه ده، ډېر ژر په مزارشریف کې پرانستل کېږي. د دې شرکت فابریکې د ۲۴ ساعتونو په موده کې د ۳۰۰ ټنه تولید ظرفیت لري او کلنی تولید یې ۱۰۹،۵۰۰ ټنه دی.\n\nدغه شرکت بېلابېلو پروفیلونو (۱۰x۱۰ تر ۱۴۰x۱۴۰)، قطیو، د اوسپنې او جستي پایپونو (۱.۳ سانتي تر ۸ انچه)، او د هنګرونو د جوړولو اوسپنیزو موادو تولید او عرضه کوي.`,
    'shamal_factory_label': "د فابریکې پته:",
    'shamal_factory_addr': "د کابل صنعتي پارکونه او بلخ ولایت",
    'shamal_sales_label': "د پلور دفتر:",
    'shamal_sales_addr': "مزارشریف او کابل",
    'shamal_phone_label': "د اړیکې شمېرې:",
    'shamal_phones': "0799-XXX-XXX",
    'shamal_slogan_label': "د شرکت شعار:",
    'shamal_slogan': "با کیفیت تولید، ملي ویاړ",

    // Member - Aria Sanat
    'aria_title': "د آریا صنعت د پروفیل تولیدي شرکت",
    'aria_desc': `د آریا صنعت د پروفیل تولیدي شرکت په ۱۳۹۰ کال کې د افغانستان د کورني بازار د اړتیاوو د پوره کولو، د فلزي محصولاتو د کیفیت د لوړولو، د سوداګرۍ د پراختیا او د دوامدارو کاري فرصتونو د رامنځته کولو په موخه خپل فعالیت پیل کړ. دغه شرکت په پیل کې د ۱۸ ډوله پروفیلونو په تولید سره بازار ته داخل شو او د دوامدار پرمختګ او د نوې ټکنالوژۍ د کارونې له لارې، نن ورځ له ۲۵۰ څخه زیات ډول ډول محصولات تولیدوي او د هېواد د پروفیل تولید په صنعت کې د مخکښو شرکتونو له ډلې څخه شمېرل کېږي.\n\ د آریا صنعت فابریکه په ۷٬۰۰۰ متره مربع ځمکه کې جوړه شوې ده او په وروستیو کلونو کې یې صنعتي زیربنا له ۱۰٬۰۰۰ متره مربع څخه زیاته شوې ده. دغه صنعتي مجموعه بېلابېل برخې لري، چې پکې سمبال تولیدي سالونونه، د کیفیت د کنټرول لابراتوارونه، معیاري ګودامونه، او تخصصي څانګې لکه د فابریکې مدیریت، د تولید انجینري او ډیزاین، پلان جوړونه، څېړنه او پراختیا (R&D)، د کیفیت کنټرول او مرکزي ګودام شامل دي.\n\nآریا صنعت د خپل فعالیت له پیل راهیسې د چین له معتبرو شرکتونو څخه وارد شوې پرمختللې ټکنالوژۍ کارولې دي او د نړیوالو شریکانو سره د دوامدارو تخنیکي او تولیدي همکاریو له لارې یې خپل ځای د پروفیل، قوطۍ، او د اوسپنې او ګالوانیزه پایپونو د سترو او باوري تولیدوونکو په توګه تثبیت کړی دی. دغه تګلاره د دې لامل شوې چې د آریا صنعت محصولات د کیفیت، د سپارلو وخت او بیې له پلوه تل سیالي وړ او د باور وړ پاتې شي.\n\nد آریا صنعت د کیفیت تګلاره پر درې اساسي اصولو ولاړه ده:\n1) د صنعتي معیارونو سره سم د لوړ کیفیت محصولاتو تولید\n2) پیرېدونکو ته پر وخت او باوري سپارنه\n3) د سیالۍ وړ او منطقي بیو وړاندې کول\n\nآریا صنعت د پیرېدونکو د رضایت او دوامدار پرمختګ ته ژمن پاتې شوی او تل هڅه کوي چې د افغانستان د صنعتي او اقتصادي ودې په بهیر کې اغېزمن رول ولوبوي.`,
    'aria_factory_label': "د فابریکې پته:",
    'aria_factory_addr': "هرات، افغانستان، صنعتي ښارګوټی، 2 فاز، 4 شکوفه",
    'aria_sales_label': "د پلور دفتر پته:",
    'aria_sales_addr': "هرات، د سپین اډي، د مولانا آدینه (رح) جامع جومات ته څېرمه",
    'aria_phone_label': "د اړیکې شمېرې:",
    'aria_phones': "0799000500 / 0791646464",
    'aria_slogan_label': "د شرکت شعار:",
    'aria_slogan': "آریا صنعت؛ د هېواد د پروفیل صنعت کې د کیفیت او ویاړ نښه",
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

  const companies: Company[] = [
    {
      id: 'shirzad-steel',
      image: '/images/steel-profiles.jpg',
      logo: '/images/SHIRZAD_PROFILE.jpg-removebg-preview (1).png',
      title: t('shirzad_title'),
      description: t('shirzad_desc'),
      factoryAddressLabel: t('shirzad_factory_label'),
      factoryAddress: t('shirzad_factory_addr'),
      salesLabel: t('shirzad_sales_label'),
      salesAddress: t('shirzad_sales_addr'),
      phoneLabel: t('shirzad_phone_label'),
      phone: t('shirzad_phones'),
      sloganLabel: t('shirzad_slogan_label'),
      slogan: t('shirzad_slogan')
    },
    {
      id: 'shamal-profile',
      image: '/images/slide-pipe-production.jpg',
      logo: '/images/SHAMAL_PROFILE.jpg-removebg-preview (1).png',
      title: t('shamal_title'),
      description: t('shamal_desc'),
      factoryAddressLabel: t('shamal_factory_label'),
      factoryAddress: t('shamal_factory_addr'),
      salesLabel: t('shamal_sales_label'),
      salesAddress: t('shamal_sales_addr'),
      phoneLabel: t('shamal_phone_label'),
      phone: t('shamal_phones'),
      sloganLabel: t('shamal_slogan_label'),
      slogan: t('shamal_slogan')
    },
    {
      id: 'aria-sanat',
      image: '/images/slide-ariya-profile.jpg',
      logo: '/images/ARIYA_PROFILE.jpg-removebg-preview (1).png',
      title: t('aria_title'),
      description: t('aria_desc'),
      factoryAddressLabel: t('aria_factory_label'),
      factoryAddress: t('aria_factory_addr'),
      salesLabel: t('aria_sales_label'),
      salesAddress: t('aria_sales_addr'),
      phoneLabel: t('aria_phone_label'),
      phone: t('aria_phones'),
      sloganLabel: t('aria_slogan_label'),
      slogan: t('aria_slogan'),
      email: 'Ariasanat.Profile@gmail.com',
      website: 'www.Aria-sanat.com'
    }
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, companies }}>
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
