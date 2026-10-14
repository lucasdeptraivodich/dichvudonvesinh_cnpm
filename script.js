/* ============================================================
   CLEANOVA - script.js
   Xử lý logic tương tác: Đa ngôn ngữ, Calculator, UI/UX
   ============================================================ */

/* ---------------------------------------------------------------
   1. HỆ THỐNG ĐA NGÔN NGỮ (Bilingual VI/EN)
   Lưu trữ toàn bộ văn bản ở 2 ngôn ngữ
   --------------------------------------------------------------- */
const translations = {
  vi: {
    /* --- Header / Navigation --- */
    nav_home: 'Trang chủ',
    nav_services: 'Dịch vụ',
    nav_process: 'Quy trình',
    nav_pricing: 'Bảng giá',
    nav_reviews: 'Đánh giá',
    nav_faq: 'FAQ',
    btn_login: 'Đăng nhập',
    btn_book_now: 'Đặt lịch ngay',

    /* --- Hero Section --- */
    hero_badge: '🟢 Ứng dụng dọn vệ sinh #1 Việt Nam',
    hero_title_1: 'Dịch vụ dọn vệ sinh',
    hero_title_highlight: 'nhà cửa & văn phòng',
    hero_title_2: 'chuyên nghiệp',
    hero_subtitle: 'Đặt lịch trong 60 giây. Đội ngũ đối tác uy tín, tận tâm, chuẩn hóa quy trình. Cho bạn không gian sống sạch hoàn hảo.',
    hero_cta_book: 'Đặt dịch vụ ngay',
    hero_cta_price: 'Xem bảng giá',
    trust_rating_value: '4.9/5★',
    trust_rating_label: 'Đánh giá',
    trust_customers_value: '10.000+',
    trust_customers_label: 'Khách hàng tin dùng',
    trust_guarantee_value: '100%',
    trust_guarantee_label: 'Đảm bảo hài lòng',
    hero_float_1_title: 'Hoàn thành!',
    hero_float_1_text: 'Đã dọn xong 3 phòng',
    hero_float_2_title: '⭐ 5.0',
    hero_float_2_text: 'Dịch vụ tuyệt vời!',

    /* --- Services Section --- */
    services_badge: '🧹 Dịch vụ của chúng tôi',
    services_title: 'Giải pháp vệ sinh toàn diện',
    services_subtitle: 'Từ dọn dẹp nhà cửa hàng ngày đến tổng vệ sinh chuyên sâu, chúng tôi đáp ứng mọi nhu cầu của bạn.',
    service_1_title: 'Dọn dẹp nhà cửa theo giờ',
    service_1_desc: 'Lau chùi, dọn phòng khách, phòng ngủ, nhà bếp, toilet. Linh hoạt theo nhu cầu của bạn.',
    service_1_price: 'Từ 150.000 VNĐ/giờ',
    service_2_title: 'Tổng vệ sinh Deep Cleaning',
    service_2_desc: 'Vệ sinh toàn bộ diện tích nhà, làm sạch sâu mọi ngóc ngách. Phù hợp định kỳ hàng tháng.',
    service_2_price: 'Từ 500.000 VNĐ/lần',
    service_3_title: 'Vệ sinh văn phòng & Workspace',
    service_3_desc: 'Dịch vụ định kỳ cho doanh nghiệp, đảm bảo môi trường làm việc sạch đẹp, chuyên nghiệp.',
    service_3_price: 'Từ 300.000 VNĐ/lần',
    service_4_title: 'Giặt Sofa, Nệm & Rèm cửa',
    service_4_desc: 'Hút bụi chuyên sâu, khử khuẩn bằng hơi nước nóng. Trả lại vẻ mới cho nội thất.',
    service_4_price: 'Từ 400.000 VNĐ/món',
    service_5_title: 'Vệ sinh sau xây dựng',
    service_5_desc: 'Dọn dẹp thô, xử lý vết sơn, bụi mịn sau thi công. Sẵn sàng cho ngày dọn về.',
    service_5_price: 'Từ 8.000 VNĐ/m²',
    btn_detail: 'Chi tiết',

    /* --- Calculator Section --- */
    calc_badge: '💰 Báo giá nhanh',
    calc_title: 'Công cụ tính giá ước tính',
    calc_subtitle: 'Chọn loại dịch vụ và nhận báo giá ngay lập tức. Nhanh chóng, minh bạch.',
    calc_form_title: 'Tùy chỉnh dịch vụ',
    calc_label_service: 'Loại dịch vụ',
    calc_option_hourly: 'Dọn dẹp theo giờ',
    calc_option_deep: 'Tổng vệ sinh Deep Cleaning',
    calc_option_sofa: 'Giặt Sofa / Nệm',
    calc_label_area: 'Diện tích / Quy mô',
    calc_option_small: 'Nhỏ (< 50m² / 1-2 phòng)',
    calc_option_medium: 'Vừa (50-100m² / 3-4 phòng)',
    calc_option_large: 'Lớn (> 100m² / 5+ phòng)',
    calc_label_frequency: 'Tần suất',
    calc_option_once: 'Một lần',
    calc_option_weekly: 'Hàng tuần (Giảm 15%)',
    calc_option_monthly: 'Hàng tháng (Giảm 10%)',
    calc_result_label: 'GIÁ ƯỚC TÍNH',
    calc_result_unit: '/lần dịch vụ',
    calc_discount_text: 'Tiết kiệm',
    calc_btn_continue: 'Tiếp tục đặt lịch →',

    /* --- How It Works Section --- */
    how_badge: '⚡ Quy trình đặt dịch vụ',
    how_title: 'Đơn giản chỉ 4 bước',
    how_subtitle: 'Từ đặt lịch đến tận hưởng không gian sạch sẽ, mọi thứ diễn ra nhanh chóng và thuận tiện.',
    step_1_title: 'Chọn dịch vụ & Thời gian',
    step_1_desc: 'Chọn loại vệ sinh, ngày giờ phù hợp với lịch trình của bạn.',
    step_2_title: 'Xác nhận & Thanh toán',
    step_2_desc: 'Xác nhận đơn và thanh toán tiện lợi qua nhiều phương thức.',
    step_3_title: 'Chuyên viên tới nhà',
    step_3_desc: 'Đội ngũ chuyên nghiệp đến đúng giờ, đầy đủ dụng cụ.',
    step_4_title: 'Tận hưởng không gian sạch',
    step_4_desc: 'Kiểm tra, đánh giá và tận hưởng kết quả hoàn hảo.',

    /* --- Why Choose Us Section --- */
    why_badge: '✨ Tại sao chọn Cleanova',
    why_title: '6 lý do bạn nên tin tưởng chúng tôi',
    why_subtitle: 'Chúng tôi cam kết mang đến dịch vụ vệ sinh chất lượng cao nhất với trải nghiệm tốt nhất.',
    why_1_title: 'Nhân viên được xác minh',
    why_1_desc: 'Minh bạch nhân thân, đào tạo bài bản, cam kết uy tín và an toàn tuyệt đối.',
    why_2_title: 'Giá cả minh bạch',
    why_2_desc: 'Không chi phí ẩn, báo giá rõ ràng trước khi đặt dịch vụ. Thanh toán an toàn.',
    why_3_title: 'Khử khuẩn an toàn',
    why_3_desc: 'Sử dụng dung dịch thân thiện môi trường, an toàn cho trẻ nhỏ và thú cưng.',
    why_4_title: 'Đặt lịch linh hoạt',
    why_4_desc: 'Đổi lịch miễn phí, hủy trước 24h không mất phí. Phù hợp mọi lịch trình.',
    why_5_title: 'Bảo hiểm tài sản',
    why_5_desc: 'Bảo hiểm lên đến 50 triệu VNĐ. Đảm bảo hài lòng 100% hoặc hoàn tiền.',
    why_6_title: 'Hỗ trợ 24/7',
    why_6_desc: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ mọi lúc, mọi nơi.',

    /* --- Testimonials Section --- */
    reviews_badge: '💬 Đánh giá khách hàng',
    reviews_title: 'Khách hàng nói gì về chúng tôi',
    reviews_subtitle: 'Hàng ngàn khách hàng đã tin tưởng và hài lòng với dịch vụ của Cleanova.',
    review_1_text: '"Dịch vụ tuyệt vời! Nhân viên đến đúng giờ, làm việc rất cẩn thận. Nhà tôi sạch bóng sau 3 tiếng. Chắc chắn sẽ đặt lại!"',
    review_1_name: 'Nguyễn Thị Mai Anh',
    review_1_service: 'Tổng vệ sinh Deep Cleaning',
    review_2_text: '"Giặt sofa nhà mình sạch như mới, không ngờ kết quả tốt đến vậy. Giá cả hợp lý và quy trình rất chuyên nghiệp."',
    review_2_name: 'Trần Văn Hùng',
    review_2_service: 'Giặt Sofa & Nệm',
    review_3_text: '"Văn phòng công ty mình đặt dịch vụ hàng tuần. Rất hài lòng về chất lượng và sự đúng giờ. Nhân viên thân thiện."',
    review_3_name: 'Lê Phương Thảo',
    review_3_service: 'Vệ sinh văn phòng định kỳ',

    /* --- Promo Banner --- */
    promo_title: 'Nhận ngay ưu đãi 20% cho lần đặt lịch đầu tiên!',
    promo_subtitle: 'Áp dụng cho tất cả dịch vụ. Ưu đãi có giới hạn - Đặt ngay hôm nay!',
    promo_btn: 'Đặt ngay — Nhập mã CLEANOVA20',

    /* --- FAQ Section --- */
    faq_badge: '❓ Câu hỏi thường gặp',
    faq_title: 'Giải đáp thắc mắc của bạn',
    faq_subtitle: 'Tìm câu trả lời cho những câu hỏi phổ biến về dịch vụ của Cleanova.',
    faq_1_q: 'Làm thế nào để đặt dịch vụ vệ sinh?',
    faq_1_a: 'Bạn chỉ cần chọn loại dịch vụ, thời gian mong muốn, xác nhận đơn hàng và thanh toán. Toàn bộ quy trình chỉ mất khoảng 60 giây. Bạn cũng có thể gọi hotline 1900-xxxx để được hỗ trợ trực tiếp.',
    faq_2_q: 'Nhân viên vệ sinh có được đào tạo không?',
    faq_2_a: 'Tất cả nhân viên của Cleanova đều được xác minh lý lịch, đào tạo chuyên nghiệp và kiểm tra kỹ năng định kỳ. Chúng tôi đảm bảo chất lượng dịch vụ ở mức cao nhất.',
    faq_3_q: 'Tôi có thể hủy hoặc đổi lịch không?',
    faq_3_a: 'Hoàn toàn có thể! Bạn được hủy hoặc đổi lịch miễn phí trước 24 giờ so với giờ hẹn. Sau thời gian này, phí hủy sẽ là 50% giá dịch vụ.',
    faq_4_q: 'Cleanova có cung cấp dụng cụ và hóa chất không?',
    faq_4_a: 'Có, đội ngũ của chúng tôi mang đầy đủ dụng cụ chuyên dụng và dung dịch tẩy rửa thân thiện môi trường. Bạn không cần chuẩn bị gì thêm.',
    faq_5_q: 'Phương thức thanh toán nào được hỗ trợ?',
    faq_5_a: 'Cleanova hỗ trợ thanh toán qua thẻ ngân hàng (Visa/Mastercard), ví điện tử (MoMo, ZaloPay, VNPay), chuyển khoản ngân hàng hoặc tiền mặt khi hoàn thành dịch vụ.',

    /* --- Footer --- */
    footer_slogan: 'Không gian sạch hơn, cuộc sống tốt hơn.',
    footer_phone: '1900-xxxx',
    footer_email: 'contact@cleanova.vn',
    footer_address: '123 Đường ABC, Quận Cầu Giấy, Hà Nội',
    footer_col2_title: 'Dịch vụ',
    footer_link_hourly: 'Dọn dẹp theo giờ',
    footer_link_deep: 'Tổng vệ sinh',
    footer_link_office: 'Vệ sinh văn phòng',
    footer_link_sofa: 'Giặt sofa & nệm',
    footer_link_construction: 'Vệ sinh sau xây dựng',
    footer_col3_title: 'Về Cleanova',
    footer_link_about: 'Giới thiệu',
    footer_link_career: 'Tuyển dụng',
    footer_link_partner: 'Trở thành đối tác',
    footer_link_blog: 'Blog',
    footer_link_contact: 'Liên hệ',
    footer_newsletter_title: 'Nhận thông báo ưu đãi',
    footer_newsletter_desc: 'Đăng ký email để nhận thông tin khuyến mãi và mẹo vệ sinh hữu ích.',
    footer_newsletter_placeholder: 'Nhập email của bạn...',
    footer_newsletter_btn: 'Đăng ký',
    footer_copyright: '© 2024 Cleanova. Bảo lưu mọi quyền.',
    footer_privacy: 'Chính sách bảo mật',
    footer_terms: 'Điều khoản dịch vụ',

    /* --- Toast Messages --- */
    toast_booking_title: 'Đặt lịch thành công!',
    toast_booking_text: 'Chúng tôi sẽ liên hệ bạn trong ít phút để xác nhận.',
    toast_newsletter_title: 'Đăng ký thành công!',
    toast_newsletter_text: 'Cảm ơn bạn đã đăng ký nhận thông báo từ Cleanova.',
    toast_promo_title: 'Mã giảm giá đã được sao chép!',
    toast_promo_text: 'Sử dụng mã CLEANOVA20 khi đặt lịch.',
  },

  en: {
    /* --- Header / Navigation --- */
    nav_home: 'Home',
    nav_services: 'Services',
    nav_process: 'Process',
    nav_pricing: 'Pricing',
    nav_reviews: 'Reviews',
    nav_faq: 'FAQ',
    btn_login: 'Log In',
    btn_book_now: 'Book Now',

    /* --- Hero Section --- */
    hero_badge: '🟢 #1 Cleaning Service App in Vietnam',
    hero_title_1: 'Professional Cleaning',
    hero_title_highlight: 'Home & Office',
    hero_title_2: 'Services',
    hero_subtitle: 'Book in 60 seconds. Trusted, dedicated partners with standardized processes. A perfectly clean living space for you.',
    hero_cta_book: 'Book a Service',
    hero_cta_price: 'View Pricing',
    trust_rating_value: '4.9/5★',
    trust_rating_label: 'Rating',
    trust_customers_value: '10,000+',
    trust_customers_label: 'Trusted Customers',
    trust_guarantee_value: '100%',
    trust_guarantee_label: 'Satisfaction Guaranteed',
    hero_float_1_title: 'Completed!',
    hero_float_1_text: '3 rooms cleaned',
    hero_float_2_title: '⭐ 5.0',
    hero_float_2_text: 'Amazing service!',

    /* --- Services Section --- */
    services_badge: '🧹 Our Services',
    services_title: 'Comprehensive Cleaning Solutions',
    services_subtitle: 'From daily housekeeping to deep cleaning, we cover all your needs.',
    service_1_title: 'Hourly House Cleaning',
    service_1_desc: 'Wiping, cleaning living rooms, bedrooms, kitchens, and bathrooms. Flexible to your needs.',
    service_1_price: 'From $7/hour',
    service_2_title: 'Deep Cleaning',
    service_2_desc: 'Complete home cleaning, deep cleaning every corner. Perfect for monthly maintenance.',
    service_2_price: 'From $22/session',
    service_3_title: 'Office & Workspace Cleaning',
    service_3_desc: 'Regular service for businesses, ensuring a clean and professional work environment.',
    service_3_price: 'From $13/session',
    service_4_title: 'Sofa, Mattress & Curtain Cleaning',
    service_4_desc: 'Deep vacuuming, steam sterilization. Restore your furniture to new condition.',
    service_4_price: 'From $17/item',
    service_5_title: 'Post-Construction Cleaning',
    service_5_desc: 'Rough cleanup, paint stain removal, and fine dust treatment after construction.',
    service_5_price: 'From $0.35/sqft',
    btn_detail: 'Details',

    /* --- Calculator Section --- */
    calc_badge: '💰 Quick Quote',
    calc_title: 'Estimated Price Calculator',
    calc_subtitle: 'Choose your service type and get an instant quote. Fast and transparent.',
    calc_form_title: 'Customize Service',
    calc_label_service: 'Service Type',
    calc_option_hourly: 'Hourly Cleaning',
    calc_option_deep: 'Deep Cleaning',
    calc_option_sofa: 'Sofa / Mattress Cleaning',
    calc_label_area: 'Area / Scale',
    calc_option_small: 'Small (< 500sqft / 1-2 rooms)',
    calc_option_medium: 'Medium (500-1000sqft / 3-4 rooms)',
    calc_option_large: 'Large (> 1000sqft / 5+ rooms)',
    calc_label_frequency: 'Frequency',
    calc_option_once: 'One-time',
    calc_option_weekly: 'Weekly (15% off)',
    calc_option_monthly: 'Monthly (10% off)',
    calc_result_label: 'ESTIMATED PRICE',
    calc_result_unit: '/per service',
    calc_discount_text: 'You save',
    calc_btn_continue: 'Continue Booking →',

    /* --- How It Works Section --- */
    how_badge: '⚡ How It Works',
    how_title: 'Simple 4-Step Process',
    how_subtitle: 'From booking to enjoying a clean space, everything is quick and convenient.',
    step_1_title: 'Choose Service & Time',
    step_1_desc: 'Select cleaning type, date and time that fits your schedule.',
    step_2_title: 'Confirm & Pay',
    step_2_desc: 'Confirm your order and pay conveniently through multiple methods.',
    step_3_title: 'Cleaner Arrives',
    step_3_desc: 'Professional team arrives on time with all necessary equipment.',
    step_4_title: 'Enjoy Clean Space',
    step_4_desc: 'Inspect, rate and enjoy the perfect results.',

    /* --- Why Choose Us Section --- */
    why_badge: '✨ Why Choose Cleanova',
    why_title: '6 Reasons to Trust Us',
    why_subtitle: 'We are committed to delivering the highest quality cleaning service with the best experience.',
    why_1_title: 'Verified Staff',
    why_1_desc: 'Background checked, professionally trained, committed to reliability and absolute safety.',
    why_2_title: 'Transparent Pricing',
    why_2_desc: 'No hidden fees, clear quotes before booking. Secure payment processing.',
    why_3_title: 'Safe Sanitization',
    why_3_desc: 'Eco-friendly cleaning solutions, safe for children and pets.',
    why_4_title: 'Flexible Scheduling',
    why_4_desc: 'Free rescheduling, cancel 24h before at no charge. Fits any schedule.',
    why_5_title: 'Property Insurance',
    why_5_desc: 'Insurance up to $2,000. 100% satisfaction guaranteed or money back.',
    why_6_title: '24/7 Support',
    why_6_desc: 'Customer care team always ready to help anytime, anywhere.',

    /* --- Testimonials Section --- */
    reviews_badge: '💬 Customer Reviews',
    reviews_title: 'What Our Customers Say',
    reviews_subtitle: 'Thousands of customers have trusted and are satisfied with Cleanova services.',
    review_1_text: '"Excellent service! Staff arrived on time and worked very carefully. My house was spotless after 3 hours. Will definitely book again!"',
    review_1_name: 'Mai Anh Nguyen',
    review_1_service: 'Deep Cleaning',
    review_2_text: '"My sofa looks brand new after cleaning. Didn\'t expect such great results. Reasonable pricing and very professional process."',
    review_2_name: 'Hung Tran',
    review_2_service: 'Sofa & Mattress Cleaning',
    review_3_text: '"Our company books weekly cleaning. Very satisfied with the quality and punctuality. Staff are friendly and professional."',
    review_3_name: 'Thao Le',
    review_3_service: 'Office Cleaning (Weekly)',

    /* --- Promo Banner --- */
    promo_title: 'Get 20% off your first booking!',
    promo_subtitle: 'Valid for all services. Limited offer — Book today!',
    promo_btn: 'Book Now — Use code CLEANOVA20',

    /* --- FAQ Section --- */
    faq_badge: '❓ Frequently Asked Questions',
    faq_title: 'Got Questions? We Have Answers',
    faq_subtitle: 'Find answers to common questions about Cleanova services.',
    faq_1_q: 'How do I book a cleaning service?',
    faq_1_a: 'Simply choose a service type, preferred time, confirm your order and pay. The entire process takes about 60 seconds. You can also call our hotline 1900-xxxx for direct assistance.',
    faq_2_q: 'Are cleaning staff trained?',
    faq_2_a: 'All Cleanova staff are background checked, professionally trained and regularly assessed for skills. We ensure the highest quality of service.',
    faq_3_q: 'Can I cancel or reschedule?',
    faq_3_a: 'Absolutely! You can cancel or reschedule for free up to 24 hours before the appointment. After that, a 50% cancellation fee applies.',
    faq_4_q: 'Does Cleanova provide cleaning supplies?',
    faq_4_a: 'Yes, our team brings all professional-grade equipment and eco-friendly cleaning solutions. You don\'t need to prepare anything.',
    faq_5_q: 'What payment methods are accepted?',
    faq_5_a: 'Cleanova accepts bank cards (Visa/Mastercard), e-wallets (MoMo, ZaloPay, VNPay), bank transfer, or cash upon completion.',

    /* --- Footer --- */
    footer_slogan: 'A Cleaner Space, A Better Life.',
    footer_phone: '1900-xxxx',
    footer_email: 'contact@cleanova.vn',
    footer_address: '123 ABC Street, Cau Giay District, Hanoi',
    footer_col2_title: 'Services',
    footer_link_hourly: 'Hourly Cleaning',
    footer_link_deep: 'Deep Cleaning',
    footer_link_office: 'Office Cleaning',
    footer_link_sofa: 'Sofa & Mattress',
    footer_link_construction: 'Post-Construction',
    footer_col3_title: 'About Cleanova',
    footer_link_about: 'About Us',
    footer_link_career: 'Careers',
    footer_link_partner: 'Become a Partner',
    footer_link_blog: 'Blog',
    footer_link_contact: 'Contact',
    footer_newsletter_title: 'Get Deals & Updates',
    footer_newsletter_desc: 'Subscribe for promotions and useful cleaning tips.',
    footer_newsletter_placeholder: 'Enter your email...',
    footer_newsletter_btn: 'Subscribe',
    footer_copyright: '© 2024 Cleanova. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',

    /* --- Toast Messages --- */
    toast_booking_title: 'Booking Received!',
    toast_booking_text: 'We will contact you shortly to confirm.',
    toast_newsletter_title: 'Subscribed Successfully!',
    toast_newsletter_text: 'Thank you for subscribing to Cleanova updates.',
    toast_promo_title: 'Promo Code Copied!',
    toast_promo_text: 'Use code CLEANOVA20 when booking.',
  }
};

/* ---------------------------------------------------------------
   2. BIẾN TRẠNG THÁI TOÀN CỤC
   --------------------------------------------------------------- */
let currentLang = localStorage.getItem('cleanova_lang') || 'vi';

/* ---------------------------------------------------------------
   3. HÀM CHUYỂN ĐỔI NGÔN NGỮ
   Cập nhật toàn bộ văn bản trên trang mà không load lại
   --------------------------------------------------------------- */
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('cleanova_lang', lang);
  document.documentElement.lang = lang;

  const t = translations[lang];

  // Cập nhật tất cả phần tử có thuộc tính data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Cập nhật placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  // Cập nhật aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (t[key]) {
      el.setAttribute('aria-label', t[key]);
    }
  });

  // Cập nhật các option trong select
  document.querySelectorAll('[data-i18n-option]').forEach(el => {
    const key = el.getAttribute('data-i18n-option');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Cập nhật nút toggle ngôn ngữ (active state)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Cập nhật calculator khi đổi ngôn ngữ
  calculatePrice();
}

/* ---------------------------------------------------------------
   4. CHỨC NĂNG TÍNH GIÁ TỰ ĐỘNG (Calculator Logic)
   Bảng giá cơ sở (VNĐ) và tỷ giá quy đổi
   --------------------------------------------------------------- */
const priceTable = {
  /* Giá cơ sở VNĐ theo loại dịch vụ & diện tích */
  hourly: {
    small: 300000,   // 300.000 VNĐ
    medium: 500000,  // 500.000 VNĐ
    large: 800000    // 800.000 VNĐ
  },
  deep: {
    small: 800000,   // 800.000 VNĐ
    medium: 1500000, // 1.500.000 VNĐ
    large: 2500000   // 2.500.000 VNĐ
  },
  sofa: {
    small: 400000,   // 400.000 VNĐ (1 món)
    medium: 700000,  // 700.000 VNĐ (2-3 món)
    large: 1200000   // 1.200.000 VNĐ (4+ món)
  }
};

// Hệ số giảm giá theo tần suất
const frequencyDiscount = {
  once: 0,      // Không giảm
  weekly: 0.15, // Giảm 15%
  monthly: 0.10 // Giảm 10%
};

// Tỷ giá VNĐ sang USD (ước tính)
const VND_TO_USD = 24500;

function calculatePrice() {
  const serviceSelect = document.getElementById('calc-service');
  const areaSelect = document.getElementById('calc-area');
  const frequencySelect = document.getElementById('calc-frequency');

  if (!serviceSelect || !areaSelect || !frequencySelect) return;

  const service = serviceSelect.value;
  const area = areaSelect.value;
  const frequency = frequencySelect.value;

  // Lấy giá cơ sở từ bảng giá
  const basePrice = priceTable[service]?.[area] || 0;

  // Tính giảm giá
  const discount = frequencyDiscount[frequency] || 0;
  const discountAmount = basePrice * discount;
  const finalPrice = basePrice - discountAmount;

  // Cập nhật hiển thị giá
  const priceEl = document.getElementById('calc-price');
  const discountEl = document.getElementById('calc-discount-display');
  const discountRow = document.getElementById('calc-discount-row');

  if (priceEl) {
    if (currentLang === 'vi') {
      priceEl.textContent = formatVND(finalPrice);
    } else {
      priceEl.textContent = formatUSD(finalPrice / VND_TO_USD);
    }
  }

  // Hiển thị/ẩn thông tin giảm giá
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = 'inline-flex';
      const savedAmount = currentLang === 'vi'
        ? formatVND(discountAmount)
        : formatUSD(discountAmount / VND_TO_USD);
      if (discountEl) {
        discountEl.textContent = `${translations[currentLang].calc_discount_text} ${savedAmount}`;
      }
    } else {
      discountRow.style.display = 'none';
    }
  }
}

// Định dạng tiền VNĐ: 1.500.000 VNĐ
function formatVND(amount) {
  return Math.round(amount).toLocaleString('vi-VN') + ' VNĐ';
}

// Định dạng tiền USD: $61.22
function formatUSD(amount) {
  return '$' + amount.toFixed(2);
}

/* ---------------------------------------------------------------
   5. STICKY HEADER - Thu nhỏ khi cuộn trang
   --------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ---------------------------------------------------------------
   6. MOBILE MENU TOGGLE
   Mở/đóng menu hamburger cho mobile
   --------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');

  if (!toggle || !mobileNav || !overlay) return;

  function openMenu() {
    toggle.classList.add('active');
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    toggle.classList.remove('active');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Đóng menu khi bấm overlay
  overlay.addEventListener('click', closeMenu);

  // Đóng menu khi bấm vào link
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------------------------------------------------------------
   7. FAQ ACCORDION
   Mở/đóng câu hỏi thường gặp
   --------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Đóng tất cả FAQ items khác
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // Toggle item hiện tại
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ---------------------------------------------------------------
   8. TOAST NOTIFICATION
   Hiển thị thông báo nổi thân thiện
   --------------------------------------------------------------- */
function showToast(type, titleKey, textKey) {
  const t = translations[currentLang];
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? '✅' : 'ℹ️';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <strong>${t[titleKey] || titleKey}</strong>
      <p>${t[textKey] || textKey}</p>
    </div>
    <button class="toast-close" aria-label="Đóng thông báo">&times;</button>
  `;

  container.appendChild(toast);

  // Nút đóng
  toast.querySelector('.toast-close').addEventListener('click', () => {
    removeToast(toast);
  });

  // Tự động biến mất sau 4 giây
  setTimeout(() => {
    removeToast(toast);
  }, 4000);
}

function removeToast(toast) {
  if (!toast || toast.classList.contains('removing')) return;
  toast.classList.add('removing');
  setTimeout(() => {
    toast.remove();
  }, 300);
}

/* ---------------------------------------------------------------
   9. SCROLL REVEAL ANIMATION
   Hiệu ứng xuất hiện các section khi cuộn vào viewport
   --------------------------------------------------------------- */
function initScrollReveal() {
  // Kiểm tra prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    // Nếu người dùng muốn giảm chuyển động, hiện tất cả ngay
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Chỉ reveal 1 lần
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------------
   10. SMOOTH SCROLL cho Navigation Links
   --------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------------------------------------------------------------
   11. EVENT LISTENERS cho các nút CTA
   Hiển thị toast khi bấm nút đặt lịch hoặc đăng ký
   --------------------------------------------------------------- */
function initCTAButtons() {
  // Tất cả nút "Đặt lịch" / "Book Now"
  document.querySelectorAll('[data-action="book"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('success', 'toast_booking_title', 'toast_booking_text');
    });
  });

  // Nút đăng ký Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        showToast('success', 'toast_newsletter_title', 'toast_newsletter_text');
        emailInput.value = '';
      }
    });
  }

  // Nút promo copy code
  document.querySelectorAll('[data-action="promo"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Copy mã giảm giá vào clipboard
      navigator.clipboard.writeText('CLEANOVA20').then(() => {
        showToast('info', 'toast_promo_title', 'toast_promo_text');
      }).catch(() => {
        showToast('info', 'toast_promo_title', 'toast_promo_text');
      });
    });
  });
}

/* ---------------------------------------------------------------
   12. CALCULATOR EVENT LISTENERS
   Lắng nghe thay đổi từ các select trong widget tính giá
   --------------------------------------------------------------- */
function initCalculator() {
  const calcSelects = document.querySelectorAll('#calc-service, #calc-area, #calc-frequency');
  calcSelects.forEach(select => {
    select.addEventListener('change', calculatePrice);
  });

  // Tính giá ban đầu khi load trang
  calculatePrice();
}

/* ---------------------------------------------------------------
   13. LANGUAGE TOGGLE EVENT
   Xử lý bấm nút chuyển đổi ngôn ngữ
   --------------------------------------------------------------- */
function initLanguageToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && lang !== currentLang) {
        switchLanguage(lang);
      }
    });
  });
}

/* ---------------------------------------------------------------
   14. KHỞI TẠO KHI TRANG ĐÃ TẢI XONG
   --------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo ngôn ngữ đã lưu (hoặc mặc định tiếng Việt)
  switchLanguage(currentLang);

  // Khởi tạo tất cả các module
  initStickyHeader();
  initMobileMenu();
  initFAQ();
  initScrollReveal();
  initSmoothScroll();
  initCTAButtons();
  initCalculator();
  initLanguageToggle();
});
