const langDict = {
    cn: {
        nav_home: "首页", nav_gift: "赞助", nav_comm: "委托", nav_work: "工作相关", nav_contact: "联系", nav_site: "关于",
        name: "九重紫", bio: "通过体验实现某人生前无法达成的梦想来超度他们...",
        title_profile: "个人档案", title_activity: "直播内容", title_design: "Character Design", btn_back: "返回"
    },
    jp: {
        nav_home: "ホーム", nav_gift: "支援", nav_comm: "依頼", nav_work: "仕事について", nav_contact: "連絡", nav_site: "このサイトについて",
        name: "ここのえゆかり", bio: "誰かが生前に叶えられなかった夢を追体験して...",
        title_profile: "プロフィール", title_activity: "配信内容", title_design: "キャラクターデザイン", btn_back: "戻る"
    },
    en: {
        nav_home: "Home", nav_gift: "Support", nav_comm: "Comm", nav_work: "Work", nav_contact: "Contact", nav_site: "About",
        name: "Kokonoe Yukari", bio: "A demi-human who extends her own lifespan...",
        title_profile: "Profile", title_activity: "Activity", title_design: "Character Design", btn_back: "Back"
    }
};

// 页面切换
function showPage(pageId) {
    const pages = document.querySelectorAll('.sub-page');
    pages.forEach(p => p.classList.remove('active-page'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active-page');
    
    // 自动关闭手机菜单
    document.getElementById('topNav').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 语言切换
function changeLang(lang, btn) {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (langDict[lang][key]) el.innerHTML = langDict[lang][key];
    });
}

// 绑定手机菜单开关
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('topNav');
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// 智能导航栏 (滑动隐藏)
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav-wrapper');
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
