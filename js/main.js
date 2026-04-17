// =========================================
// 1. 全屏加载动画逻辑 (Loading)
// =========================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if(loader) {
        // 给一点点延迟，让用户能看清可爱的加载动画
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 500); 
    }
});

// =========================================
// 2. 樱花飘落生成器 (Sakura Falling)
// =========================================
function createSakura() {
    const container = document.getElementById('sakura-container');
    if(!container) return;

    const sakura = document.createElement('div');
    sakura.classList.add('sakura');

    // 随机大小 (10px 到 20px 之间)
    const size = Math.random() * 10 + 10; 
    sakura.style.width = size + 'px';
    sakura.style.height = size + 'px';

    // 随机水平起始位置
    sakura.style.left = Math.random() * 100 + 'vw';

    // 随机动画持续时间 (下落速度，5s 到 10s 之间)
    const fallDuration = Math.random() * 5 + 5;
    const swayDuration = Math.random() * 2 + 2;
    sakura.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

    container.appendChild(sakura);

    // 等花瓣落到底部后将其移除，防止内存泄漏
    setTimeout(() => {
        sakura.remove();
    }, fallDuration * 1000);
}

// 每隔 300 毫秒生成一片新的小樱花
setInterval(createSakura, 300);

// =========================================
// 3. 页面切换与交互逻辑
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
