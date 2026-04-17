// =========================================
// 🌐 多语言字典 🌐
// =========================================
const langDict = {
    cn: {
        nav_home: "首页 / HOME", nav_gift: "赞助 / GIFT", nav_comm: "COMMISSION", nav_work: "关于委托工作", nav_contact: "联系我", nav_site: "关于本站", name: "九重紫",
        bio: "通过体验实现某人生前无法达成的梦想来超度他们，以延续自己寿命的亚人。<br>在几年前还是人类，但现在以亚人的姿态存在。<br>自称最清楚的平和族，梦想大家能和平相处，每一个人都幸福地在同一个世界生活。<br>为了这个目标而努力进行活动。",
        title_profile: "个人档案",
        title_activity: "直播内容 - 活动内容",
        title_personal: "个人相关",
        title_meme: "相关梗",
        title_design: "Character Design", btn_back: "← 返回上一页",
        site_p1: "你好！欢迎来到这里。这是一个由粉丝用爱发电、自发搭建的非官方个人主页。",
        site_h1: "内容来源与建议",
        site_p3: "本站资料摘自 萌娘百科 与 九重紫B站空间。如有建议欢迎私信。"
        // 其他字段保持之前逻辑...
    },
    // JP 和 EN 翻译逻辑同理，此处省略字数，请保留您之前 main.js 里的完整字典包
};

// =========================================
// 📱 手机端菜单开关逻辑 🌟
// =========================================
function toggleMobileMenu() {
    const nav = document.getElementById('topNav');
    nav.classList.toggle('active');
}

// 切换语言时同时关闭手机菜单
function changeLang(lang, element) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if(element) element.classList.add('active');
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (langDict[lang][key]) {
            el.innerHTML = langDict[lang][key];
        }
    });
    // 关闭手机菜单
    document.getElementById('topNav').classList.remove('active');
}

// 切换页面时同时关闭手机菜单
function showPage(pageId) {
    var pages = document.getElementsByClassName('sub-page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active-page');
    }
    var targetPage = document.getElementById(pageId);
    void targetPage.offsetWidth; 
    targetPage.classList.add('active-page');
    
    // 关闭手机菜单
    document.getElementById('topNav').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================
// 🌟 智能导航栏：向下滑动隐藏逻辑 🌟
// =========================================
let lastScrollTop = 0; 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.nav-wrapper');
    const mobileNav = document.getElementById('topNav');
    
    // 如果手机菜单正开着，不要隐藏导航栏
    if (mobileNav.classList.contains('active')) return;

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
