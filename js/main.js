// =========================================
// 页面切换与交互逻辑
// =========================================

function showPage(pageId) {
    var pages = document.getElementsByClassName('sub-page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active-page');
    }
    var targetPage = document.getElementById(pageId);
    void targetPage.offsetWidth; 
    targetPage.classList.add('active-page');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 手机端：点击菜单项后自动收起菜单
    const topNav = document.getElementById('top-nav-menu');
    if (topNav.classList.contains('active')) {
        topNav.classList.remove('active');
    }
}

// 手机端菜单展开/收起逻辑
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const topNav = document.getElementById('top-nav-menu');

    if(menuBtn && topNav) {
        menuBtn.addEventListener('click', function() {
            topNav.classList.toggle('active');
        });
    }
});

// 智能吸顶导航栏逻辑 (向下滚动隐藏，向上滚动显示)
let lastScrollTop = 0; 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.nav-wrapper');
    if (!navbar) return;
    
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop <= 0) {
        navbar.classList.remove('nav-hidden');
        return;
    }

    if (scrollTop > lastScrollTop && scrollTop > 80) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop;
});
