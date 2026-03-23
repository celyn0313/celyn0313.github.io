document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');
    
    if (filterBtns.length > 0 && newsItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                newsItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            clearErrors();
            
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入姓名');
                isValid = false;
            }
            
            if (!phoneInput.value.trim()) {
                showError(phoneInput, '请输入电话');
                isValid = false;
            } else if (!isValidPhone(phoneInput.value.trim())) {
                showError(phoneInput, '请输入正确的电话格式');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, '请输入邮箱');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, '请输入正确的邮箱格式');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入留言内容');
                isValid = false;
            }
            
            if (isValid) {
                alert('提交成功！我们会尽快与您联系。');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        input.classList.add('error');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
    
    function clearErrors() {
        const errorInputs = document.querySelectorAll('.form-group .error');
        errorInputs.forEach(input => input.classList.remove('error'));
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
        return phoneRegex.test(phone);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
