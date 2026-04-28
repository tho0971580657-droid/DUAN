// Thợ Ơi Authentication System
// Using localStorage for demo purposes

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    safeParse(storageKey, fallback = []) {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return fallback;
        try {
            return JSON.parse(raw);
        } catch (error) {
            console.warn(`Invalid JSON in ${storageKey}, resetting to fallback.`, error);
            localStorage.removeItem(storageKey);
            return fallback;
        }
    }

    init() {
        try {
            this.seedMockData();
            this.checkLoginStatus();
            this.updateNavbar();
            document.body.classList.add('auth-ready');
        } catch (error) {
            console.error('AuthManager init failed:', error);
            document.body.classList.add('auth-error');
        }
    }

    // Seed mock users and orders if localStorage is empty
    seedMockData() {
        const existingUsers = this.safeParse('thooi_users', []);
        const existingOrders = this.safeParse('thooi_orders', []);

        if (existingUsers.length > 0 && existingOrders.length > 0) {
            return;
        }

        const users = [
            {
                id: 1001,
                firstName: 'Nguyễn',
                lastName: 'Văn A',
                fullName: 'Nguyễn Văn A',
                email: 'customer1@example.com',
                phone: '0901001001',
                password: '123456',
                role: 'customer',
                createdAt: '2024-01-01T08:00:00.000Z',
                orders: []
            },
            {
                id: 1002,
                firstName: 'Trần',
                lastName: 'Thị B',
                fullName: 'Trần Thị B',
                email: 'customer2@example.com',
                phone: '0902002002',
                password: '123456',
                role: 'customer',
                createdAt: '2024-01-02T09:00:00.000Z',
                orders: []
            },
            {
                id: 2001,
                firstName: 'Lê',
                lastName: 'Gia C',
                fullName: 'Lê Gia C',
                email: 'worker1@example.com',
                phone: '0911001101',
                password: '123456',
                role: 'worker',
                createdAt: '2024-01-03T10:00:00.000Z',
                skills: 'Dọn dẹp, Giặt ủi',
                experience: 3,
                birthDate: '1992-05-10',
                gender: 'male',
                address: 'Hà Nội',
                idCardFront: '',
                idCardBack: '',
                certificates: [],
                assignedOrders: [],
                verificationStatus: 'verified',
                orders: []
            },
            {
                id: 2002,
                firstName: 'Phạm',
                lastName: 'Minh D',
                fullName: 'Phạm Minh D',
                email: 'worker2@example.com',
                phone: '0912001202',
                password: '123456',
                role: 'worker',
                createdAt: '2024-01-04T11:00:00.000Z',
                skills: 'Sửa chữa, Lắp đặt',
                experience: 5,
                birthDate: '1990-08-20',
                gender: 'male',
                address: 'Hồ Chí Minh',
                idCardFront: '',
                idCardBack: '',
                certificates: [],
                assignedOrders: [],
                verificationStatus: 'verified',
                orders: []
            }
        ];

        const orders = [
            {
                id: 5001,
                customerId: 1001,
                customerName: 'Nguyễn Văn A',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Dọn dẹp nhà cửa',
                address: 'Số 12, Phố Kim Mã, Hà Nội',
                date: '2024-04-14',
                time: '09:00',
                notes: 'Tập trung khu vực phòng khách và bếp.',
                price: '450.000 VNĐ',
                status: 'completed',
                createdAt: '2024-04-10T08:30:00.000Z',
                reviewed: true,
                rating: 5,
                reviewComment: 'Thợ rất nhiệt tình và sạch sẽ.',
                reviewDate: '2024-04-14T12:00:00.000Z'
            },
            {
                id: 5002,
                customerId: 1002,
                customerName: 'Trần Thị B',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Giặt ủi và vệ sinh',
                address: 'Số 45, Quận 1, Hồ Chí Minh',
                date: '2024-04-15',
                time: '14:30',
                notes: 'Giặt ga trải giường và lau chùi phòng ngủ.',
                price: '380.000 VNĐ',
                status: 'completed',
                createdAt: '2024-04-13T10:15:00.000Z',
                reviewed: true,
                rating: 4,
                reviewComment: 'Làm nhanh, dọn sạch. Rất hài lòng.',
                reviewDate: '2024-04-15T16:00:00.000Z'
            },
            {
                id: 5003,
                customerId: 1001,
                customerName: 'Nguyễn Văn A',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Vệ sinh bếp',
                address: 'Số 12, Phố Kim Mã, Hà Nội',
                date: '2024-04-17',
                time: '11:00',
                notes: 'Lau chùi bếp và sàn nhà.',
                price: '420.000 VNĐ',
                status: 'completed',
                createdAt: '2024-04-16T09:00:00.000Z',
                reviewed: true,
                rating: 5,
                reviewComment: 'Cực kỳ sạch sẽ, rất ưng ý.',
                reviewDate: '2024-04-17T13:30:00.000Z'
            },
            {
                id: 5004,
                customerId: 1002,
                customerName: 'Trần Thị B',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Giặt rèm cửa',
                address: 'Số 45, Quận 1, Hồ Chí Minh',
                date: '2024-04-18',
                time: '09:30',
                notes: 'Giặt rèm phòng khách và lau cửa sổ.',
                price: '500.000 VNĐ',
                status: 'completed',
                createdAt: '2024-04-17T08:45:00.000Z',
                reviewed: true,
                rating: 5,
                reviewComment: 'Rèm sạch như mới, nhân viên thân thiện.',
                reviewDate: '2024-04-18T12:15:00.000Z'
            },
            {
                id: 5005,
                customerId: 1001,
                customerName: 'Nguyễn Văn A',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Vệ sinh phòng ngủ',
                address: 'Số 12, Phố Kim Mã, Hà Nội',
                date: '2024-04-19',
                time: '13:00',
                notes: 'Hút bụi, lau bàn giường và thay ga trải.',
                price: '410.000 VNĐ',
                status: 'in-progress',
                createdAt: '2024-04-18T10:20:00.000Z',
                reviewed: false
            },
            {
                id: 5006,
                customerId: 1002,
                customerName: 'Trần Thị B',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Dọn dẹp sau sửa chữa',
                address: 'Số 45, Quận 1, Hồ Chí Minh',
                date: '2024-04-20',
                time: '15:00',
                notes: 'Dọn dẹp vết xi măng và lau sàn.',
                price: '650.000 VNĐ',
                status: 'assigned',
                createdAt: '2024-04-19T11:10:00.000Z',
                reviewed: false
            },
            {
                id: 5007,
                customerId: 1001,
                customerName: 'Nguyễn Văn A',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Giặt ghế sofa',
                address: 'Số 12, Phố Kim Mã, Hà Nội',
                date: '2024-04-22',
                time: '10:30',
                notes: 'Giặt sạch ghế sofa phòng khách.',
                price: '540.000 VNĐ',
                status: 'pending',
                createdAt: '2024-04-20T08:00:00.000Z',
                reviewed: false
            },
            {
                id: 5008,
                customerId: 1002,
                customerName: 'Trần Thị B',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Vệ sinh phòng tắm',
                address: 'Số 45, Quận 1, Hồ Chí Minh',
                date: '2024-04-23',
                time: '08:00',
                notes: 'Lau sạch bồn cầu, lavabo và gạch sàn.',
                price: '470.000 VNĐ',
                status: 'completed',
                createdAt: '2024-04-22T09:15:00.000Z',
                reviewed: true,
                rating: 4,
                reviewComment: 'Làm tốt nhưng hơi lâu một chút.',
                reviewDate: '2024-04-23T12:20:00.000Z'
            },
            {
                id: 5009,
                customerId: 1001,
                customerName: 'Nguyễn Văn A',
                assignedWorkerId: 2002,
                assignedWorkerName: 'Phạm Minh D',
                service: 'Sửa chữa điện nước',
                address: 'Số 12, Phố Kim Mã, Hà Nội',
                date: '2024-04-24',
                time: '13:30',
                notes: 'Sửa đường nước bếp bị rò rỉ.',
                price: '700.000 VNĐ',
                status: 'assigned',
                createdAt: '2024-04-23T10:50:00.000Z',
                reviewed: false
            },
            {
                id: 5010,
                customerId: 1002,
                customerName: 'Trần Thị B',
                assignedWorkerId: 2001,
                assignedWorkerName: 'Lê Gia C',
                service: 'Lau kính toàn nhà',
                address: 'Số 45, Quận 1, Hồ Chí Minh',
                date: '2024-04-25',
                time: '09:00',
                notes: 'Lau kính cửa sổ và ban công.',
                price: '560.000 VNĐ',
                status: 'completed',
                createdAt: '2024-04-24T08:45:00.000Z',
                reviewed: true,
                rating: 5,
                reviewComment: 'Kính sáng bóng, rất ưng.',
                reviewDate: '2024-04-25T11:30:00.000Z'
            }
        ];

        // Map orders into customer records and worker assigned orders
        orders.forEach(order => {
            const customer = users.find(u => u.id === order.customerId);
            const worker = users.find(u => u.id === order.assignedWorkerId);

            if (customer) {
                customer.orders = customer.orders || [];
                customer.orders.push({
                    id: order.id,
                    service: order.service,
                    address: order.address,
                    date: order.date,
                    time: order.time,
                    notes: order.notes,
                    price: order.price,
                    status: order.status,
                    createdAt: order.createdAt,
                    reviewed: order.reviewed,
                    rating: order.rating,
                    reviewComment: order.reviewComment,
                    reviewDate: order.reviewDate
                });
            }

            if (worker) {
                worker.assignedOrders = worker.assignedOrders || [];
                worker.assignedOrders.push(order.id);
            }
        });

        localStorage.setItem('thooi_users', JSON.stringify(users));
        localStorage.setItem('thooi_orders', JSON.stringify(orders));
    }

    // Check if user is logged in
    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('thooi_isLoggedIn') === 'true';
        const userRole = localStorage.getItem('thooi_userRole');
        const userId = localStorage.getItem('thooi_userId');

        if (isLoggedIn && userId && userRole) {
            const users = this.safeParse('thooi_users', []);
            this.currentUser = users.find(u => u.id == userId);
            if (this.currentUser) {
                this.currentUser.role = userRole; // Ensure role is set
            }
        }
        return this.currentUser;
    }

    // Login user
    login(emailOrPhone, password) {
        const users = this.safeParse('thooi_users', []);
        const user = users.find(u =>
            (u.email === emailOrPhone || u.phone === emailOrPhone) &&
            u.password === password
        );

        if (user) {
            this.currentUser = user;
            localStorage.setItem('thooi_isLoggedIn', 'true');
            localStorage.setItem('thooi_userRole', user.role);
            localStorage.setItem('thooi_userId', user.id.toString());
            alert(`Đăng nhập thành công với vai trò: ${user.role}`);
            this.updateNavbar();
            return { success: true, user };
        }

        return { success: false, message: 'Email/SĐT hoặc mật khẩu không đúng' };
    }

    // Register new user
    register(userData) {
        const users = this.safeParse('thooi_users', []);

        // Check if user already exists
        const existingUser = users.find(u =>
            u.email === userData.email || u.phone === userData.phone
        );

        if (existingUser) {
            return { success: false, message: 'Email hoặc số điện thoại đã được sử dụng' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            ...userData,
            fullName: `${userData.firstName} ${userData.lastName}`,
            createdAt: new Date().toISOString(),
            orders: []
        };

        // Add role-specific fields
        if (userData.role === 'worker') {
            newUser.role = 'worker';
            newUser.skills = userData.skills;
            newUser.experience = userData.experience;
            newUser.birthDate = userData.birthDate;
            newUser.gender = userData.gender;
            newUser.address = userData.address;
            newUser.idCardFront = userData.idCardFront;
            newUser.idCardBack = userData.idCardBack;
            newUser.certificates = userData.certificates || [];
            newUser.assignedOrders = [];
            newUser.verificationStatus = 'pending'; // pending, verified, rejected
        } else {
            newUser.role = 'customer';
        }

        users.push(newUser);
        localStorage.setItem('thooi_users', JSON.stringify(users));

        this.currentUser = newUser;
        localStorage.setItem('thooi_isLoggedIn', 'true');
        localStorage.setItem('thooi_userRole', newUser.role);
        localStorage.setItem('thooi_userId', newUser.id.toString());
        alert(`Đăng ký thành công với vai trò: ${newUser.role}`);
        this.updateNavbar();

        return { success: true, user: newUser };
    }

    // Logout user
    logout() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            console.log('Logout called');
            this.currentUser = null;
            localStorage.removeItem('thooi_isLoggedIn');
            localStorage.removeItem('thooi_userRole');
            localStorage.removeItem('thooi_userId');
            localStorage.removeItem('thooi_remember_login');
            console.log('LocalStorage cleared');
            this.updateNavbar();
            window.location.reload();
        }
    }

    // Add order to user's account
    addOrder(orderData) {
        if (!this.currentUser) return false;

        const order = {
            id: Date.now(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.currentUser.orders = this.currentUser.orders || [];
        this.currentUser.orders.push(order);

        // Update in users array
        const users = JSON.parse(localStorage.getItem('thooi_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('thooi_users', JSON.stringify(users));
            localStorage.setItem('thooi_current_user', JSON.stringify(this.currentUser));
        }

        return order;
    }

    // Update navbar based on login status
    updateNavbar() {
        // Get navbar elements
        const userMenu = document.getElementById('userMenu');
        const userMenuMobile = document.getElementById('userMenuMobile');
        const profileDropdown = document.getElementById('profileDropdown');
        const profileDropdownMobile = document.getElementById('profileDropdownMobile');
        const loginLink = document.getElementById('loginLink');
        const registerLink = document.getElementById('registerLink');
        const desktopLoginButton = document.getElementById('desktopLoginButton');
        const desktopAuthButtons = document.getElementById('desktopAuthButtons');
        const userNameSpan = document.getElementById('userName');

        document.body.classList.toggle('logged-in', !!this.currentUser);
        document.body.classList.toggle('logged-out', !this.currentUser);

        const workerItems = document.querySelectorAll('.worker-only');
        const customerItems = document.querySelectorAll('.customer-only');
        const role = this.currentUser ? this.currentUser.role : null;

        if (this.currentUser) {
            // User is logged in - show user menu, hide login/register links
            if (userMenu) userMenu.style.display = 'none'; // Desktop user menu removed
            if (userMenuMobile) userMenuMobile.style.display = 'block';
            if (profileDropdown) profileDropdown.style.display = 'none';
            if (profileDropdownMobile) profileDropdownMobile.style.display = 'none';
            if (loginLink) loginLink.style.display = 'none';
            if (registerLink) registerLink.style.display = 'none';
            if (desktopLoginButton) desktopLoginButton.style.display = 'none';
            if (desktopAuthButtons) desktopAuthButtons.style.display = 'none';

            // Update user name in dropdown
            if (userNameSpan) {
                userNameSpan.textContent = this.currentUser.firstName;
            }

            // Show/hide role-specific page elements
            workerItems.forEach(el => {
                el.style.display = role === 'worker' ? '' : 'none';
            });
            customerItems.forEach(el => {
                el.style.display = role === 'customer' ? '' : 'none';
            });
        } else {
            // User is not logged in - hide user menu, show login/register links
            if (userMenu) userMenu.style.display = 'none';
            if (userMenuMobile) userMenuMobile.style.display = 'none';
            if (profileDropdown) profileDropdown.style.display = 'block';
            if (profileDropdownMobile) profileDropdownMobile.style.display = 'block';
            if (loginLink) loginLink.style.display = 'block';
            if (registerLink) registerLink.style.display = 'block';
            if (desktopLoginButton) desktopLoginButton.style.display = 'inline-flex';
            workerItems.forEach(el => el.style.display = 'none');
            customerItems.forEach(el => el.style.display = 'none');
        }

        if (desktopLoginButton && this.currentUser) {
            desktopLoginButton.style.display = 'none';
        }
    }


    // Show user profile
    showProfile() {
        window.location.href = 'profile.html';
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Make auth manager globally available
window.authManager = authManager;