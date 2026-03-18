// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 登录表单处理
    const loginForm = document.getElementById('login-form');
    const loginPage = document.getElementById('login-page');
    const mainPage = document.getElementById('main-page');
    const logoutBtn = document.getElementById('logout-btn');
    
    // 登录表单提交事件
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 模拟登录验证
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // 登录成功，显示主页面
                loginPage.classList.remove('active');
                mainPage.classList.add('active');
                // 默认显示生产管理子系统
                showSubsystem('production');
            } else {
                alert('请输入用户名和密码');
            }
        });
    }
    
    // 退出登录
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // 显示登录页面
            mainPage.classList.remove('active');
            loginPage.classList.add('active');
            // 清空表单
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        });
    }
    
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            showSubsystem(target);
            
            // 更新导航链接状态
            navLinks.forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // 显示指定子系统
    function showSubsystem(target) {
        const subsystems = document.querySelectorAll('.subsystem');
        subsystems.forEach(function(subsystem) {
            subsystem.classList.remove('active');
        });
        
        const targetSubsystem = document.getElementById(target);
        if (targetSubsystem) {
            targetSubsystem.classList.add('active');
        }
    }
    
    // 初始化页面
    function init() {
        // 默认显示登录页面
        loginPage.classList.add('active');
    }
    
    // 调用初始化函数
    init();
});