/**
 * TỔNG HỢP LOGIC CHO HỆ THỐNG DỊCH VỤ - [Tên Thương Hiệu]
 * Áp dụng cho 16 file HTML từ index.html đến 16_cam-on.html
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. XỬ LÝ THANH ĐIỀU HƯỚNG (NAVBAR)
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Tự động thêm class 'active' cho link tương ứng với trang hiện tại
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. LOGIC CHO TRANG ĐẶT LỊCH (15_dat-lich.html)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Lấy dữ liệu (Ví dụ: tên, dịch vụ, ngày giờ)
            const formData = new FormData(bookingForm);
            console.log("Dữ liệu đặt lịch:", Object.fromEntries(formData));

            // Hiệu ứng chờ giả lập trước khi chuyển trang
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Đang xử lý...';
            submitBtn.disabled = true;

            setTimeout(() => {
                window.location.href = "16_cam-on.html";
            }, 1500);
        });
    }

    // 4. HIỆU ỨNG ANIMATION KHI CUỘN (Scroll-triggered Animations)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Áp dụng cho các phần tử cần animation
    document.querySelectorAll('.service-upgrade-card, .testimonial-card, .step-item').forEach(el => {
        observer.observe(el);
    });

    // Thêm class CSS cho animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // 4. XỬ LÝ HIỂN THỊ ẢNH (Dùng cho 12_thu-vien.html)
    // Nếu bạn có dùng modal để phóng to ảnh
    const galleryImages = document.querySelectorAll('.img-box img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            console.log("Đang xem ảnh:", img.src);
            // Thêm logic mở modal ở đây nếu cần
        });
    });

    // 5. TỰ ĐỘNG CẬP NHẬT NĂM Ở FOOTER
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 6. LOGIC CHO TRANG BẢNG GIÁ (13_bang-gia.html)
    // Ví dụ: Nhấn vào gói dịch vụ sẽ tự điền vào form đặt lịch
    const priceButtons = document.querySelectorAll('.btn-select-package');
    priceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const packageName = btn.dataset.package;
            localStorage.setItem('selectedService', packageName);
            window.location.href = "15_dat-lich.html";
        });
    });

    // 7. BACK TO TOP BUTTON GLOBAL (1-14 pages)
    let backToTop = document.getElementById('backToTop');
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.setAttribute('aria-label', 'Lên đầu trang');
        backToTop.innerText = '↑';
        document.body.appendChild(backToTop);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});