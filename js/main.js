// =========================================
// 🚀 初始化 & 防止 Hash 干扰
// =========================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if(loader) { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; }
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
});
setTimeout(function() {
    const loader = document.getElementById('loader');
    if(loader) { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; }
}, 1500);

document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: false, offset: 60, duration: 800, easing: 'ease-out-cubic' });
    }
    showPage('home-page');
});

// =========================================
// 🌐 数据库配置区 (Bmob 密钥) 
// =========================================
try {
    Bmob.initialize("6c39dac0aff82e8c", "kokonoyu471056.Y");
} catch (e) {
    console.error("Bmob 初始化失败：", e);
}

// =========================================
// ✨ 视频配置区
// =========================================
const worksData = [
    {
        id: 'vlog',
        title: { cn: '一个人来中国玩一个月', jp: '一人で中国に一ヶ月遊びに行く' },
        cover: 'images/vlog1.jpg', 
        videos: [
            { title: '第一集', bvid: 'BV1MH4y1a7wA' },
            { title: '第二集', bvid: 'BV1Rm411U791' },
            { title: '第三集', bvid: 'BV1ox421k7QZ' }
        ]
    }
];

let currentCollectionId = null;

// =========================================
// ✨ 历程精选配置区 (全面补全扩充版本)
// =========================================
const milestonesData = [
    { date: '2020年3月13日', cn: '在YouTube发布自我介绍视频。', jp: 'YouTubeで自己紹介動画を公開。' },
    { date: '2020年6月9日', cn: '在bilibili进行初次投稿 📺', jp: 'bilibili初投稿 📺' },
    { date: '2020年7月22日', cn: '在YouTube进行生日回直播。', jp: 'YouTubeで誕生日配信を実施。' },
    { date: '2020年11月10日', cn: '成功进行bilibili首次直播 🎙️', jp: '初のbilibili配信 🎙️' },
    { date: '2020年11月18日', cn: 'bilibili粉丝数突破1万 🎉<br><span class="timeline-detail">因为一个整活视频，1天的时间粉丝从二三百暴涨到一万。</span>', jp: 'bilibiliフォロワー数1万人突破 🎉<br><span class="timeline-detail">ネタ動画が大ウケし、1日でフォロワーが数百人から1万人に急増。</span>' },
    { date: '2020年11月22日', cn: '进行首次B限直播 🎤<br><span class="timeline-detail">主歌回，副整活。自己烤肉过程中感觉越来越尴尬。</span>', jp: '初のbilibili限定配信 🎤<br><span class="timeline-detail">歌枠メイン、ネタサブ。自分で翻訳しながら徐々に恥ずかしくなる。</span>' },
    { date: '2021年7月23日', cn: '生日回首次达成“百人舰队”成就 🚢', jp: '誕生日配信で初の「百人艦隊」達成 🚢' },
    { date: '2021年8月3日', cn: 'bilibili粉丝数突破10万 🎈', jp: 'bilibiliフォロワー数10万人突破 🎈' },
    { date: '2021年8月21日', cn: '发布第二套正式形象 👗', jp: '2nd公式モデル発表 👗' },
    { date: '2021年12月5日', cn: 'bilibili进行一周年纪念回直播 🎂', jp: 'bilibili1周年記念配信 🎂' },
    { date: '2022年1月3日', cn: '发布第三套正式形象 🎀', jp: '3rd公式モデル発表 🎀' },
    { date: '2022年1月9日', cn: 'bilibili粉丝数突破15.8万 🎯', jp: 'bilibiliフォロワー数15.8万人突破 🎯' },
    { date: '2022年2月23日', cn: 'bilibili粉丝数突破20万 🎊', jp: 'bilibiliフォロワー数20万人突破 🎊' },
    { date: '2022年4月1日', cn: '愚人节整活大危机 🐱<br><span class="timeline-detail">“猫猫”代播放出奇怪文件，造就了经典的一天。</span>', jp: 'エイプリルフール企画 🐱<br><span class="timeline-detail">「猫ちゃん」が配信を乗っ取り、色々とやばいファイルが流出。</span>' },
    { date: '2022年11月6日', cn: 'bilibili粉丝数突破30万 👑', jp: 'bilibiliフォロワー数30万人突破 👑' },
    { date: '2024年2月18日', cn: 'bilibili粉丝数突破40万 🚀', jp: 'bilibiliフォロワー数40万人突破 🚀' },
    { date: '2024年5月28日', cn: 'bilibili粉丝数突破50万 🌟', jp: 'bilibiliフォロワー数50万人突破 🌟' },
    { date: '2025年2月4日', cn: '举办九重紫4周年＆3D化纪念会 ✨', jp: '九重紫4周年＆3D化記念配信 ✨' },
    { date: '2025年12月25日', cn: '超美丽3D圣诞直播 🎄<br><span class="timeline-detail">开启漫无止境的圣诞节头像活动，共计绘制头像772张。</span>', jp: '超美麗3Dクリスマス配信 🎄<br><span class="timeline-detail">終わらないクリスマスアイコン描き企画がスタート（計772枚作成）。</span>' },
    { date: '2026年2月1日', cn: '登顶全站热门 🔥<br><span class="timeline-detail">投稿视频《总有人看了点哔哩哔哩就以为自己会说中文了》大受好评。</span>', jp: '全休人気ランキング入り 🔥<br><span class="timeline-detail">中国語ネタ動画が大好評でトレンド入り。</span>' },
    { date: '2026年2月16日', cn: '突破60万粉 & 除夕夜直播 🧨<br><span class="timeline-detail">新年到来之际，戴上马年头饰迎来了60万粉丝的时刻。</span>', jp: '60万人突破 & 大晦日配信 🧨<br><span class="timeline-detail">新年の訪れとともに、馬の髪飾りをつけて60万人突破の瞬間を迎えた。</span>' },
    { date: '2026年2月23日', cn: '2222天纪念日 📆<br><span class="timeline-detail">迎来以九重紫名义使用bilibili账号的第2222天。</span>', jp: '2222日記念日 📆<br><span class="timeline-detail">九重紫としてbilibili活動2222日目を迎える。</span>' },
    { date: '2026年4月20日', cn: '中国行最终回直播 🇨🇳<br><span class="timeline-detail">紫老师来中国工作旅游的最后一次直播，圆满收官。</span>', jp: '中国旅行最終配信 🇨🇳<br><span class="timeline-detail">紫先生が中国での仕事と旅行を終える最後の配信。</span>' }
];

// 中日双语字典与其余的 JS 逻辑（语言切换、视频模态框、留言板、天数计算等）保持原样接入即可...
// （这里由于篇幅省略原有的通用函数实现，你只需将上方更新的 milestonesData 替换进你的 js 即可）

function renderMilestones() {
    const timeline = document.getElementById('milestone-timeline');
    if (!timeline) return;
    const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
    
    timeline.innerHTML = milestonesData.map((item, index) => `
        <div class="timeline-item" data-aos="fade-up" data-aos-delay="${Math.min(index * 30, 300)}">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">${item[currentLang]}</div>
        </div>
    `).join('');
}

function updateDaysCounter() {
    const daysEl = document.getElementById('live-days');
    if (!daysEl) return;
    const anchorDate = new Date('2026-02-23T00:00:00+08:00');
    const today = new Date();
    const diffTime = today.getTime() - anchorDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    const targetDays = 2222 + diffDays;

    let currentVal = 0;
    const timer = setInterval(() => {
        currentVal += Math.ceil(targetDays / 50);
        if (currentVal >= targetDays) {
            daysEl.innerText = targetDays;
            clearInterval(timer);
        } else {
            daysEl.innerText = currentVal;
        }
    }, 30);
}

function showPage(pageId) {
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active-page'));
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'milestone-page') {
        renderMilestones();
        updateDaysCounter();
    }
    setTimeout(() => { if (typeof AOS !== 'undefined') AOS.refresh(); }, 100);
}

function changeLang(lang, element) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if(element) element.classList.add('active');
    // 简化版演示，此处挂载你的原生翻译逻辑
    if(document.getElementById('milestone-timeline')) renderMilestones();
}
