// =========================================
// 初始化 & 防止 Hash 干扰
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
// 数据库配置区 (Bmob)
// =========================================
try {
    Bmob.initialize("6c39dac0aff82e8c", "kokonoyu");
} catch (e) {
    console.error("Bmob 初始化失败：", e);
}

// =========================================
// 视频作品数据
// =========================================
const worksData = [
    {
        id: 'vlog',
        title: { cn: '一个人来中国玩一个月', jp: '一人で中国に一ヶ月遊びに行く' },
        cover: 'images/vlog1.jpg', 
        videos: [
            { title: '第一集', bvid: 'BV1MH4y1a7wA' },
            { title: '第二集', bvid: 'BV1Rm411U791' },
            { title: '第三集', bvid: 'BV1ox421k7QZ' },
            { title: '第四集', bvid: 'BV1rt42137xK' },
            { title: '第五集', bvid: 'BV1Q1421q7ce' },
            { title: '第六集', bvid: 'BV1Jz421z75g' },
            { title: '第七集', bvid: 'BV1hwkwYBEy8' },
            { title: '第八集', bvid: 'BV1vCL1zyEgm' },
            { title: '第九集', bvid: 'BV1asuxzeEhS' }
        ]
    }
];

let currentCollectionId = null;

// =========================================
// 历程精选配置区
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
    { date: '2026年2月1日', cn: '登顶全站热门 🔥<br><span class="timeline-detail">投稿视频《总有人看了点哔哩哔哩就以为自己会说中文了》大受好评。</span>', jp: 'bilibili総合人気ランキング入り 🔥<br><span class="timeline-detail">中国語ネタ動画が大好評でトレンド入り。</span>' },
    { date: '2026年2月16日', cn: '突破60万粉 & 除夕夜直播 🧨<br><span class="timeline-detail">新年到来之际，戴上马年头饰迎来了60万粉丝的时刻。</span>', jp: '60万人突破 & 春節前夜（大晦日）配信 🧨<br><span class="timeline-detail">新年の訪れとともに、馬の髪飾りをつけて60万人突破の瞬間を迎えた。</span>' },
    { date: '2026年2月23日', cn: '2222天纪念日 📆<br><span class="timeline-detail">迎来以九重紫名义使用bilibili账号的第2222天。</span>', jp: '2222日記念日 📆<br><span class="timeline-detail">九重紫としてbilibili活動2222日目を迎える。</span>' },
    { date: '2026年4月20日', cn: '中国行二周目前夕 🇨🇳<br><span class="timeline-detail">紫老师来中国工作旅游前的最后一次直播。</span>', jp: '中国訪問2回目 前夜 🇨🇳<br><span class="timeline-detail">紫先生が中国での仕事と旅行に向かう前の最後の配信。</span>' }
];

// =========================================
// 中日双语字典 (已加入音乐播放器所有词汇)
// =========================================
const langDict = {
    cn: {
        nav_home: "首页", nav_site: "关于本站", name: "九重紫",
        nav_gallery: "画廊", nav_guestbook: "留言板", nav_works: "作品", nav_milestone: "历程",
        nav_music: "音乐", // 音乐导航
        music_play: "播放", music_pause: "暂停",
        music_mode_loop: "列表循环", music_mode_random: "随机播放", music_mode_single: "单曲循环",
        music_list_expand: "展开歌单", music_list_collapse: "收起歌单",
        
        works_back: "← 返回合集列表", video_count: "个视频",
        ms_counter_prefix: "紫老师在哔哩哔哩已活跃", ms_days: "天",
        gb_avatar_text: "请选择你的头像：", gb_name_placeholder: "你的昵称 (选填，默认匿名)", 
        gb_content_placeholder: "在这里写下想对紫老师说的话吧...", gb_submit: "发送留言 ✨", 
        gb_loading: "努力向云端拉取留言中...", 
        gb_no_comment: "还没有人留言哦，快来抢沙发！", 
        gb_fail: "连接云端数据库失败，可能由于网络原因组件未加载。刷新页面再试一下！",
        bio: "通过体验实现某人生前无法达成的梦想来超度他们，以延续自己寿命的亚人。<br>在几年前还是人类，但现在以亚人的姿态存在。<br>自称最清楚的平和族，梦想大家能和平相处，每一个人都幸福地在同一个世界生活。<br>为了这个目标而努力进行活动。",
        title_profile: "个人档案", p_nick: "<strong>昵称：</strong> ここのゆ、のゆ、ゆ", p_height: "<strong>身高：</strong> 152cm", p_zodiac: "<strong>星座：</strong> 巨蟹座", p_birth: "<strong>生日：</strong> 7月22日", p_nature: "<strong>性格：</strong> 待人柔和、认真、有些胆小、直率的“豆腐心”", p_moe: "<strong>萌点：</strong> 治愈系、巫女、亚人、病弱、傲娇", p_fans: "<strong>粉丝名：</strong> 平和族（变态族） / 一家紫 / 紫细胞 / 兵马俑", p_treasure: "<strong>最珍视的事物：</strong> 家人与粉丝（听众）", p_role: "<strong>喜欢的角色：</strong> sirotan", p_tag: "<strong>主标签：</strong> #ここのゆ", p_fanart: "<strong>同人图标签：</strong> #ここのゆああと", p_mama: "画师妈妈：",
        p_design: "<strong>🎨 艺术设计：</strong> <span class='design-link' onclick=\"showPage('design-page')\">点击查看 Design</span>",
        title_activity: "直播内容 - 活动内容", 
        val_activity: "<p>基本是游戏直播和杂谈，有时候会唱歌和画画。</p><p>游戏直播以RPG为主，不过会尝试各种不同类型的游戏。</p><p>游戏力水平比较低，含有杀戮，犯罪，欺骗的游戏基本都不擅长。特别不擅长FPS，会晕3D。</p><p>没有字幕组，自己制作视频和整活（现已成立自己的字幕组）。</p>",
        title_personal: "个人相关", 
        val_personal: "<ul class='info-list'><li><strong>啊加嘛似嘛似：</strong>紫老师常用“啊加嘛似嘛似（あじゃますます）”表达感谢。完整的表达通常会在后面加上“ありがとうにゃん 谢谢”。</li><li><strong>病弱：</strong>紫老师大约一至两个月会有身体不佳的情况，通常是发烧。目前带病直播几乎是常态。</li><li><strong>简称：</strong>紫老师全名 ここのえ　ゆかり（kokonoe yukari） ⇒ここのゆ（kokonoyu）⇒のゆ（noyu)⇒ゆ(yu)。一般简称到ここのゆ，直播待机结束画面说得也是ここのゆ。</li><li><strong>整活大师：</strong>熟悉本土各种梗，经常会做视频将梗运用到极致，常整得一手好活。自称所有的梗都是从萌娘百科看明白的。很多视频鉴赏回当场一脸懵逼，但第二天就玩得66的。可怕的吸收能力。</li><li><strong>天哨星：</strong>紫老师直播吹得一手好口哨，能熟练吹出《好汉歌》、《Never Gonna Give You Up》等歌曲，弹幕曾在水浒回赐号：天哨星。紫老师便是这108将的第109人。</li><li><strong>字幕组校对：</strong>紫老师曾在oto字幕组当校对。你永远不知道自己推的女人在干什么。</li><li><strong>理工男气质：</strong>紫老师礼貌、努力、懂事，做事一板一眼，颇有理工男气质。</li></ul>",
        title_meme: "相关梗", 
        val_meme: "<ul class='info-list'><li><strong>秦始皇/兵马俑：</strong>首次出现在《三句话把我骗到了bilibili》。原梗为早期电信诈骗：“我是秦始皇，现在给我打钱，我起势了封你做大官”。因为视频中出现了“秦始皇让兵马俑给我点了赞”，所以阿紫的粉丝玩此梗时便自称为兵马俑。</li><li><strong>紫细胞：</strong>在直播中抓获某位粉丝的DD行为时，该粉丝自称：推其他人都是我的细胞自己分裂出去的，我是阿紫的单推人。因为此行为类似细胞分裂，所以粉丝玩此梗时会自称是紫细胞。</li><li><strong>平和族/变态族：</strong>粉丝名称一开始为和平族，后因为觉得比起世界和平，更希望粉丝们能内心平和，因此改名为平和族。但是经常会有粉丝做出一些hentai的发言/行为，这部分粉丝被称为变态族。</li><li><strong>男孩紫：</strong>出现于《日本小巫女看王迅找茬》。其中的白发紫在被找茬后，反怼对方说自己是男孩子。DD狂喜：那不是更好。</li><li><strong>粉丝握手会：</strong>在粉丝握手会的直播中，玩起了VR打僵尸（DD）游戏。僵尸（DD）们前来和阿紫握手，被阿紫热烈款待（DD爆头）。</li><li><strong>×重紫：</strong>直播间的当前人气排名是第几名就是几重紫（如当前排名第一就是一重紫）。此梗出自修仙小说体系中表示修仙者能力的层数。</li><li><strong>旧重紫：</strong>通常指初代模型，也可用于形容阿紫比较老的直播内容或动态。</li></ul>",
        btn_back: "← 返回上一页",
        site_p1: "你好！欢迎来到这里。这是一个由粉丝用爱发电、自发搭建的<strong>非官方个人主页</strong>。", 
        site_h1: "搭建初衷", 
        site_p2: "我是2026年1月13日开始关注紫老师的，当时紫老师正在看《爱情公寓》，我也跟着看了一两集，我发现一件让我觉得很奇怪的事：为什么这么大的一个主播连一毛钱的礼物都会很认真的感谢？后面就逐渐对紫老师的直播感兴趣了。<br><br>我觉得紫老师是一个对工作很认真、很负责的人，对粉丝也很用心、很真诚。后面了解到原来之前圣诞节还会上舰给舰长画头像的活动，我发现紫老师对每一个头像画的都很认真，没有一丝丝的敷衍（可惜我错过活动了呜呜）。<br><br>在那之后我就想给紫老师做点什么，正好发现紫老师kokonoyu.com这个域名还没有人注册，于是我就买了下来准备做点东西。<br><br>所以我首先做了紫老师的主页，后续可能还会做紫老师的作品导航、音乐站之类的（如果能得到紫老师授权的话）。", 
        site_h2: "内容来源与建议", 
        site_p3: "本站的部分内容资料摘自 <strong>萌娘百科</strong> 以及 <strong>九重紫的B站个人空间</strong>。我只是一名普通的粉丝，如果你也喜欢九重紫，或者对这个网页的排版与内容有什么建议，欢迎通过哔哩哔哩私信我：<br>👉 <a href='https://space.bilibili.com/17276?spm_id_from=333.976.0.0' target='_blank' class='design-link' style='border:none;' rel='noopener noreferrer'>点击访问我的 Bilibili 个人主页</a>", 
        site_box: "<strong>⚠️ 版权与免责声明</strong><br><br>1. 本网站内所使用的<strong>所有美术素材、图片、Logo、背景故事及设定等内容，版权均归主播 九重紫 及其合作画师所有。</strong><br>2. 本站仅作粉丝安利与导航整理用途，没有任何商业盈利目的。<br>3. 如果本站的内容有任何侵权或不妥之处，请随时通过上方 B 站链接私信联系我，我会在第一时间配合修改或删除。"
    },
    jp: {
        nav_home: "ホーム", nav_site: "このサイトについて", name: "ここのえゆかり",
        nav_gallery: "ギャラリー", nav_guestbook: "掲示板", nav_works: "作品", nav_milestone: "軌跡",
        nav_music: "音楽", // 音乐导航
        music_play: "再生", music_pause: "一時停止",
        music_mode_loop: "リストループ", music_mode_random: "シャッフル", music_mode_single: "1曲ループ",
        music_list_expand: "リストを開く", music_list_collapse: "リストを閉じる",
        
        works_back: "← コレクション一覧に戻る", video_count: "本の動画",
        ms_counter_prefix: "紫先生がbilibiliで活動を始めてから", ms_days: "日",
        gb_avatar_text: "アイコンを選択してください：", gb_name_placeholder: "ニックネーム（任意、デフォルトは匿名）", 
        gb_content_placeholder: "ここに紫先生へのメッセージを書いてください...", gb_submit: "送信する ✨", 
        gb_loading: "コメントを読み込み中...", 
        gb_no_comment: "まだコメントはありません。最初のコメントを書きましょう！", 
        gb_fail: "データベースの接続に失敗しました。ページをリロードしてください。",
        bio: "誰かが生前に叶えられなかった夢を追体験して供養し、自身の寿命を延ばしている亜人。<br>数年前までは人間だったが、現在は亜人の姿で存在している。<br>自称「最も清楚な平和族」。皆が平和に過ごし、誰もが同じ世界で幸せに暮らせることを夢見ている。<br>その目標のために日々活動を頑張っている。",
        title_profile: "プロフィール", p_nick: "<strong>ニックネーム：</strong> ここのゆ、のゆ、ゆ", p_height: "<strong>身長：</strong> 152cm", p_zodiac: "<strong>星座：</strong> 蟹座", p_birth: "<strong>誕生日：</strong> 7月22日", p_nature: "<strong>性格：</strong> 物腰が柔らかく真面目、少し臆病で素直な「豆腐メンタル」", p_moe: "<strong>萌え属性：</strong> 癒やし系、巫女、亜人、病弱、ツンデレ", p_fans: "<strong>ファンネーム：</strong> 平和族（変態族） / 一家紫（いっかむらさき） / 紫細胞 / 兵馬俑", p_treasure: "<strong>大切にしているもの：</strong> 家族、ファン（リスナー様）", p_role: "<strong>好きなキャラ：</strong> しろたん", p_tag: "<strong>メインタグ：</strong> #ここのゆ", p_fanart: "<strong>ファンアートタグ：</strong> #ここのゆああと", p_mama: "絵師ママ：",
        p_design: "<strong>🎨 キャラクターデザイン：</strong> <span class='design-link' onclick=\"showPage('design-page')\">Designを見る</span>",
        title_activity: "配信内容", 
        val_activity: "<p>基本はゲーム配信と雑談、たまに歌枠やお絵描き。</p><p>ゲームはRPGを中心に、様々なジャンルに挑戦します。</p><p>プレイスキルは低めで、殺戮、犯罪、騙し合いのあるゲームは苦手。特にFPSは苦手で3D酔いしやすい。</p><p>以前は字幕組がなく、自ら動画制作や切り抜き、ネタ作りを行っていた（現在は専用の字幕組が設立されている）。</p>",
        title_personal: "パーソナル情報", 
        val_personal: "<ul class='info-list'><li><strong>あじゃますます：</strong>「ありがとうございます」を可愛く崩した独特の挨拶。完全な表現は後ろに「ありがとうにゃん」がつく。</li><li><strong>病弱：</strong>1〜2ヶ月に一度体調を崩し、よく熱を出す。現在は病気を抱えながらの配信がほぼ日常化している。</li><li><strong>略称：</strong>フルネームのここのえゆかり ⇒ ここのゆ ⇒ のゆ ⇒ ゆ。一般的には「ここのゆ」と呼ばれ、配信の待機終了画面でも「ここのゆ」と言っている。</li><li><strong>ネタ職人：</strong>中国のネットミームに精通しており、それを最大限に活かした動画を作るのが得意。すべてのネタは「萌娘百科」を見て理解していると自称。配信でネタ動画を見た時はポカンとしていても、翌日には使いこなしている恐るべき吸収力。</li><li><strong>天哨星：</strong>配信で口笛を吹くのが上手く、『好漢歌』や『Never Gonna Give You Up』などを器用に吹けるため、コメント欄で「天哨星」という称号を与えられた。水滸伝108星の109人目。</li><li><strong>字幕組校正：</strong>かつてoto字幕組で校正を担当していた。推しの女が裏で何をしているかは誰にも分からない。</li><li><strong>理系男子気質：</strong>礼儀正しく、努力家で物分かりが良く、物事をきっちりこなす理系男子のような一面がある。</li></ul>",
        title_meme: "関連ミーム", 
        val_meme: "<ul class='info-list'><li><strong>始皇帝/兵馬俑：</strong>『三言で私をbilibiliに騙した』で初登場。元ネタは初期の振り込め詐欺。動画内で「始皇帝が<ruby>兵馬俑<rt>へいばよう</rt></ruby>にいいねを押させた」というくだりがあったため、ファンがこのネタを使う時に「兵馬俑」を自称するようになった。</li><li><strong>紫細胞：</strong>配信で某ファンのDD（複数推し）行為を捕まえた際、そのファンが「他の人を推しているのは自分の細胞が分裂しただけで、私は紫の単推しです」と言い訳したことから。</li><li><strong>平和族/変態族：</strong>ファンネームは最初「和平族」だったが、世界平和よりもファンの心が穏やか（平和）であってほしいという願いから「平和族」に変更。しかし、よくhentai的な発言や行動をするファンがおり、彼らは「変態族」と呼ばれる。</li><li><strong>男の子紫：</strong>『日本の小さな巫女が王迅の粗探しを見る』で登場。動画内で相手に反論する際、自分が男の子だと言い放った。DD歓喜：「その方がいいじゃん」。</li><li><strong>ファン握手会：</strong>ファン握手会と称した配信で、VRのゾンビ（DD）撃退ゲームをプレイ。握手を求めて群がるゾンビ（DD）たちを熱烈に大歓迎（ヘッドショット）した。</li><li><strong>〇重紫：</strong>配信の現在のアクティブ人気ランキングの順位がそのまま「〇重紫」となる（1位なら一重紫）。修仙小説における修行の階層を表すシステムが元ネタ。</li><li><strong>旧重紫：</strong>通常は初期モデル（初代）を指すが、紫先生の古い配信内容やSNSの投稿、過去の動向を形容する際にも使われる。</li></ul>",
        site_p1: "こんにちは！当サイトへようこそ。これはファンが愛を込めて自主的に立ち上げた<strong>非公式の個人ホームページ</strong>です。",
        site_h1: "制作のきっかけ", 
        site_p2: "私が紫先生を応援し始めたのは2026年1月13日のことです。当時、紫先生が『愛情公寓（iPartment）』を見ていて、私も一緒に1〜2話見たのですが、一つ不思議に思ったことがありました。「なぜこんなに大きな配信者が、1角（約2円）のギフトにもこれほど真剣に感謝するのだろう？」と。そこから次第に紫先生の配信に興味を持つようになりました。<br><br>紫先生は仕事に対してとても真面目で責任感があり、ファンに対してもとても思いやりがあり、誠実な人だと思います。後になって、以前のクリスマスに「艦長（スポンサー）」になってくれた人にアイコンを描く企画があったことを知りました。紫先生が描くアイコンはどれも本当に丁寧で、一切の妥協がないことに気づきました（その企画を見逃してしまって本当に残念です…涙）。<br><br>それから、私も紫先生のために何かしたいと思うようになりました。ちょうど「kokonoyu.com」というドメインがまだ誰にも登録されていないことに気づき、何か作ろうと思って購入しました。<br><br>まずは紫先生の個人ホームページを作成しましたが、今後（もし紫先生の許可が頂ければ）作品のナビゲーションサイトや音楽サイトなども作っていけたらと考えています。", 
        site_h2: "情報源とご意見について", 
        site_p3: "当サイトの一部コンテンツや資料は、<strong>萌娘百科</strong>および<strong>九重紫さんのBilibili個人ページ</strong>から引用しています。私はただの一ファンですが、もしあなたも九重紫さんが好きだったり、このウェブサイトのレイアウトやコンテンツについて何かアドバイスがあれば、ぜひBilibiliのDMで教えてください：<br>👉 <a href=\"https://space.bilibili.com/17276?spm_id_from=333.976.0.0\" target=\"_blank\" class=\"design-link\" style=\"border:none;\" rel=\"noopener noreferrer\">私の Bilibili 個人ページはこちら</a>", 
        site_box: "<strong>⚠️ 著作権および免責事項</strong><br><br>1. 当サイトで使用している<strong>すべてのイラスト素材、画像、ロゴ、背景ストーリー、設定などの著作権は、配信者である九重紫様および提携絵師様に帰属します。</strong><br>2. 当サイトはファンの布教や情報整理を目的としたものであり、いかなる商業的な営利目的もありません。<br>3. もし当サイトのコンテンツに著作権侵害や不適切な箇所がございましたら、いつでも上記のBilibiliリンクからDMでご連絡ください。直ちに修正または削除の対応をいたします。"
    }
};

// =========================================
// 切换语言功能 (已优化，所有数据随之实时改变)
// =========================================
function changeLang(lang, element) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if(element) element.classList.add('active');
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (langDict[lang][key]) el.innerHTML = langDict[lang][key];
    });

    document.querySelectorAll('[data-placeholder-key]').forEach(el => {
        const key = el.getAttribute('data-placeholder-key');
        if (langDict[lang][key]) el.setAttribute('placeholder', langDict[lang][key]);
    });

    if(document.getElementById('collections-view')) {
        renderCollections();
        if(currentCollectionId) {
            const collection = worksData.find(c => c.id === currentCollectionId);
            document.getElementById('current-collection-title').innerText = collection.title[lang];
        }
    }
    if(document.getElementById('milestone-timeline')) renderMilestones();
}

// 供其他模块获取当前语言的小助手
function getCurrentLang() {
    return document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
}

// =========================================
// 视频与作品逻辑
// =========================================
const coverCache = {};

function fetchBiliCover(bvid) {
    if (window['bili_fetch_' + bvid]) return; 
    window['bili_fetch_' + bvid] = true;

    window['setBiliCover_' + bvid] = function(res) {
        if (res && res.data && res.data.pic) {
            const secureUrl = res.data.pic.replace('http://', 'https://');
            coverCache[bvid] = secureUrl; 
            const img = document.getElementById('cover-' + bvid);
            if (img) img.src = secureUrl;
        }
        cleanup();
    };
    
    function cleanup() {
        delete window['setBiliCover_' + bvid];
        const script = document.getElementById('script_' + bvid);
        if (script && script.parentNode) script.parentNode.removeChild(script); 
    }

    const script = document.createElement('script');
    script.id = 'script_' + bvid;
    script.src = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}&jsonp=jsonp&callback=setBiliCover_${bvid}`;
    script.onerror = cleanup; 
    document.body.appendChild(script);
}

function renderCollections() {
    const grid = document.getElementById('collections-view');
    if(!grid) return;
    const currentLang = getCurrentLang();
    
    grid.innerHTML = worksData.map(collection => `
        <div class="collection-card" onclick="openCollection('${collection.id}')">
            <img src="${collection.cover}" class="card-cover" referrerpolicy="no-referrer" alt="cover" onerror="this.onerror=null; this.src='https://api.dicebear.com/7.x/lorelei/svg?seed=Video'">
            <div class="card-info">
                <div class="card-title">${collection.title[currentLang]}</div>
                <div class="card-meta">${collection.videos.length} ${langDict[currentLang].video_count}</div>
            </div>
        </div>
    `).join('');
}

function openCollection(id) {
    const collection = worksData.find(c => c.id === id);
    if(!collection) return;
    currentCollectionId = id;
    const currentLang = getCurrentLang();
    
    document.getElementById('collections-view').style.display = 'none';
    document.getElementById('videos-view').style.display = 'block';
    document.getElementById('current-collection-title').innerText = collection.title[currentLang];
    
    const vGrid = document.getElementById('videos-grid');
    vGrid.innerHTML = collection.videos.map(video => {
        const cachedCover = coverCache[video.bvid];
        const imgSrc = cachedCover ? cachedCover : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        return `
        <div class="video-card" onclick="playVideo('${video.bvid}')">
            <div style="position:relative;">
                <img id="cover-${video.bvid}" src="${imgSrc}" class="card-cover" style="background-color: #ffd1df;" referrerpolicy="no-referrer" alt="cover">
                <div class="play-overlay"><svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div>
            </div>
            <div class="card-info"><div class="card-title">${video.title}</div></div>
        </div>`;
    }).join('');

    collection.videos.forEach(video => {
        if (!coverCache[video.bvid]) fetchBiliCover(video.bvid);
    });
    if (typeof AOS !== 'undefined') AOS.refresh();
}

function backToCollections() {
    currentCollectionId = null;
    document.getElementById('videos-view').style.display = 'none';
    document.getElementById('collections-view').style.display = 'grid';
    if (typeof AOS !== 'undefined') AOS.refresh();
}

function playVideo(bvid) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('bili-iframe');
    iframe.src = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
}

function closeVideoModal(event) {
    if (event && event.target.id !== 'video-modal' && !event.target.classList.contains('video-close')) return;
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('bili-iframe');
    modal.classList.remove('show');
    iframe.src = ''; 
    document.body.style.overflow = 'auto';
}

// =========================================
// 樱花飘落
// =========================================
function createSakura() {
    const container = document.getElementById('sakura-container');
    if(!container) return;
    const sakura = document.createElement('div');
    sakura.classList.add('sakura');
    const size = Math.random() * 10 + 10; 
    sakura.style.width = size + 'px';
    sakura.style.height = size + 'px';
    sakura.style.left = Math.random() * 100 + 'vw';
    const fallDuration = Math.random() * 5 + 5;
    const swayDuration = Math.random() * 2 + 2;
    sakura.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    container.appendChild(sakura);
    setTimeout(() => { sakura.remove(); }, fallDuration * 1000);
}
setInterval(createSakura, 300);

// =========================================
// 画廊加载与弹窗逻辑
// =========================================
let galleryInitialized = false;
let currentLightboxIndex = 0; 
let galleryImagesList = [];    
let galleryErrorCount = 0; 
const MAX_GALLERY_ERRORS = 3;

function initGallery() {
    if (galleryInitialized) return;
    galleryInitialized = true;
    const galleryContainer = document.getElementById('vtuber-gallery');
    const loadingText = document.getElementById('gallery-loading-text');
    loadingText.style.display = 'block';
    let currentImgIndex = 1;

    function loadNextImage() {
        const img = new Image();
        img.src = `images/${currentImgIndex}.jpg`;
        img.onload = function() {
            galleryErrorCount = 0; 
            const itemDiv = document.createElement('div');
            itemDiv.className = 'gallery-item';
            const realImg = document.createElement('img');
            realImg.src = img.src;
            realImg.alt = "紫老师美图 " + currentImgIndex;
            itemDiv.appendChild(realImg);
            galleryContainer.appendChild(itemDiv);

            itemDiv.onclick = function() { openLightbox(img.src); };

            currentImgIndex++;
            loadNextImage();
            if (typeof AOS !== 'undefined') AOS.refresh();
        };
        img.onerror = function() { 
            galleryErrorCount++;
            if(galleryErrorCount >= MAX_GALLERY_ERRORS) {
                loadingText.style.display = 'none'; 
            } else {
                currentImgIndex++;
                loadNextImage(); 
            }
        };
    }
    loadNextImage();
}

function openLightbox(clickedSrc) {
    const imgs = document.querySelectorAll('#vtuber-gallery .gallery-item img');
    galleryImagesList = Array.from(imgs).map(img => img.src);
    currentLightboxIndex = galleryImagesList.indexOf(clickedSrc);
    updateLightboxImage(); 
    const modal = document.getElementById("lightbox-modal");
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
}
function updateLightboxImage() {
    const modalImg = document.getElementById("lightbox-img");
    modalImg.src = galleryImagesList[currentLightboxIndex];
}
function navigateLightbox(direction, event) {
    if (event) event.stopPropagation(); 
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= galleryImagesList.length) { currentLightboxIndex = 0; } 
    else if (currentLightboxIndex < 0) { currentLightboxIndex = galleryImagesList.length - 1; }
    updateLightboxImage();
}
function closeLightbox(event) {
    if (event && event.target.id !== 'lightbox-modal' && !event.target.classList.contains('lightbox-close')) return;
    const modal = document.getElementById("lightbox-modal");
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; 
}

// =========================================
// 全网云端留言板逻辑 (Bmob)
// =========================================
const ALLOWED_AVATARS = [
    'images/avatar-01.png', 'images/avatar-02.png', 'images/avatar-03.png',
    'images/avatar-04.png', 'images/avatar-05.png', 'images/avatar-06.png',
    'images/avatar-07.png'
];

async function loadComments() {
    const list = document.getElementById('guestbook-list');
    if(!list) return;
    const currentLang = getCurrentLang();
    list.innerHTML = `<p style="text-align:center; color:#d87093; font-size:15px; margin-top:30px;">${langDict[currentLang].gb_loading}</p>`;

    try {
        if(typeof Bmob === 'undefined') throw new Error("Bmob 没有成功加载");
        const query = Bmob.Query("Guestbook");
        query.order("-createdAt");
        const comments = await query.find();

        list.innerHTML = '';
        if (comments.length === 0) {
            list.innerHTML = `<p style="text-align:center; color:#999; font-size:15px; margin-top:30px;">${langDict[currentLang].gb_no_comment}</p>`;
            return;
        }

        comments.forEach((c) => {
            const safeAvatar = ALLOWED_AVATARS.includes(c.avatar) ? c.avatar : 'images/avatar-01.png';
            
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `
                <img src="${safeAvatar}" class="comment-avatar" alt="Avatar">
                <div class="comment-body">
                    <div class="comment-header">
                        <div>
                            <span class="comment-name">${escapeHTML(c.name)}</span>
                            <span class="comment-time">${c.createdAt}</span>
                        </div>
                    </div>
                    <div class="comment-content">${escapeHTML(c.content)}</div>
                </div>
            `;
            list.appendChild(div);
        });
        if (typeof AOS !== 'undefined') AOS.refresh();
    } catch (error) {
        list.innerHTML = `<p style="text-align:center; color:red; margin-top:30px;">${langDict[currentLang].gb_fail}</p>`;
    }
}

async function submitComment() {
    const btn = document.querySelector('.gb-submit-btn');
    const currentLang = getCurrentLang();
    
    const lastTime = localStorage.getItem('lastGBSubmit');
    const now = Date.now();
    if (lastTime && now - lastTime < 60000) {
        alert(currentLang === 'jp' ? '送信が早すぎます。1分後にもう一度お試しください。' : '留言太快啦，请休息1分钟后再试！');
        return;
    }

    const defaultName = currentLang === 'jp' ? '匿名の兵馬俑' : '匿名兵马俑';
    const nameInput = document.getElementById('gb-name').value.trim() || defaultName;
    const contentInput = document.getElementById('gb-content').value.trim();
    const avatarInput = document.querySelector('input[name="gb-avatar"]:checked').value;

    if(!contentInput) { alert(currentLang === 'jp' ? '空白のメッセージは送信できません！' : '不能发送空白留言哦！'); return; }

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const captchaMsg = currentLang === 'jp' 
        ? `スパム防止のため、計算をお願いします： ${num1} + ${num2} = ?` 
        : `防刷屏检测，请回答：${num1} + ${num2} = ?`;
    
    const answer = prompt(captchaMsg);
    if (answer === null) return; 
    if (parseInt(answer) !== (num1 + num2)) {
        alert(currentLang === 'jp' ? '答えが間違っています！' : '计算错误，留言取消！');
        return;
    }

    btn.innerText = currentLang === 'jp' ? "送信中..." : "上传云端中...";
    btn.disabled = true;

    try {
        if(typeof Bmob === 'undefined') throw new Error("Bmob 没有成功加载");
        const query = Bmob.Query('Guestbook');
        query.set("name", nameInput);
        query.set("content", contentInput);
        query.set("avatar", avatarInput);
        query.set("ACL", {"*":{"read":true}}); 
        
        await query.save();

        localStorage.setItem('lastGBSubmit', Date.now());

        document.getElementById('gb-content').value = ''; 
        loadComments(); 
    } catch (error) {
        alert(currentLang === 'jp' ? '送信に失敗しました。再試行してください！' : '发送失败了，可能是网络原因，请刷新重试！');
    } finally {
        btn.innerText = langDict[currentLang].gb_submit;
        btn.disabled = false;
    }
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

// =========================================
// 历程渲染与天数计算逻辑
// =========================================
function renderMilestones() {
    const timeline = document.getElementById('milestone-timeline');
    if (!timeline) return;
    const currentLang = getCurrentLang();
    
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

// =========================================
// 页面切换与导航逻辑
// =========================================
function showPage(pageId) {
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active-page'));
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const topNav = document.getElementById('top-nav-menu');
    if (topNav.classList.contains('active')) topNav.classList.remove('active');

    if (pageId === 'works-page') { renderCollections(); backToCollections(); }
    if (pageId === 'gallery-page') initGallery();
    if (pageId === 'guestbook-page') loadComments();
    if (pageId === 'milestone-page') {
        renderMilestones();
        updateDaysCounter();
    }
    
    setTimeout(() => { if (typeof AOS !== 'undefined') AOS.refresh(); }, 100);
}

document.addEventListener('click', function(e) {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const topNav = document.getElementById('top-nav-menu');
    if(menuBtn && topNav) {
        if (topNav.classList.contains('active') && !menuBtn.contains(e.target) && !topNav.contains(e.target)) {
            topNav.classList.remove('active');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const topNav = document.getElementById('top-nav-menu');
    if(menuBtn && topNav) {
        menuBtn.addEventListener('click', function(e) { 
            e.stopPropagation(); 
            topNav.classList.toggle('active'); 
        });
    }
});

let lastScrollTop = 0; 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.nav-wrapper');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) {
        if (scrollTop <= 0) { navbar.classList.remove('nav-hidden'); }
        else if (scrollTop > lastScrollTop && scrollTop > 80) { navbar.classList.add('nav-hidden'); } 
        else { navbar.classList.remove('nav-hidden'); }
    }
    lastScrollTop = scrollTop;

    const fabGroup = document.getElementById('fab-group');
    if (fabGroup) {
        if (scrollTop > 300) { fabGroup.classList.add('show'); } 
        else { fabGroup.classList.remove('show'); }
    }
});

// =========================================
// 原生分享相关功能
// =========================================
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

async function sharePage() {
    const shareData = { title: '九重紫 -Jiuchong Zi- 个人主页', text: '快来看看紫老师的非官方个人主页吧！', url: window.location.href };
    try {
        if (navigator.share) { await navigator.share(shareData); } 
        else {
            navigator.clipboard.writeText(shareData.url).then(() => {
                const currentLang = getCurrentLang();
                alert(currentLang === 'jp' ? 'リンクがクリップボードにコピーされました！' : '网址已复制到剪贴板，快去分享吧！');
            });
        }
    } catch (err) { console.log('分享取消或失败:', err); }
}

// =========================================
// 🌟 专属音乐站逻辑 (已接入多语言双语引擎) 🌟
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    const mPlayBtn = document.getElementById('music-play-btn');
    if (!mPlayBtn) return;

    const mPrevBtn = document.getElementById('music-prev-btn');
    const mNextBtn = document.getElementById('music-next-btn');
    const mModeBtn = document.getElementById('music-mode-btn');
    const mPlaylistBtn = document.getElementById('music-playlist-btn');
    const mAudioPlayer = document.getElementById('audio-player');
    const mSongTitle = document.getElementById('music-song-title');
    const mCoverImg = document.getElementById('music-cover');
    const mProgressContainer = document.getElementById('music-progress-container');
    const mProgress = document.getElementById('music-progress');
    const mPlaylistWrapper = document.getElementById('music-playlist-wrapper');
    const mPlaylistList = document.getElementById('music-playlist-list');

    const R2_BASE_URL = "https://res.kokonoyu.com/"; 

    const songs = [
        { name: "中国话", file: "中国话.mp3", cover: "中国话.jpg" },
        { name: "杀破狼", file: "杀破狼.mp3", cover: "杀破狼.jpg" },
        { name: "恋は戦争", file: "恋は戦争.mp3", cover: "恋は戦争.jpg" },
        { name: "想你的365天", file: "想你的365天.mp3", cover: "想你的365天.jpg" },
        { name: "Uninstall", file: "Uninstall.mp3", cover: "Uninstall.jpg" },
        { name: "⚡虚 拟 萨 日 朗！！！⚡", file: "⚡虚 拟 萨 日 朗！！！⚡.mp3", cover: "⚡虚 拟 萨 日 朗！！！⚡.jpg" },
        { name: "青藏高原", file: "青藏高原.mp3", cover: "青藏高原.jpg" },
        { name: "仙剑问情", file: "仙剑问情.mp3", cover: "仙剑问情.jpg" },
        { name: "热爱105°C的拼音", file: "热爱105°C的拼音.mp3", cover: "热爱105°C的拼音.jpg" },
        { name: "1 2 fan club", file: "1 2 fan club.mp3", cover: "1 2 fan club.jpg" },
        { name: "梦想歌", file: "梦想歌.mp3", cover: "梦想歌.jpg" }
    ];

    let songIndex = 0;
    let playMode = 0; 
    
    // 模式键的字典对照
    const modes = [
        { icon: 'fa-repeat', key: 'music_mode_loop' },
        { icon: 'fa-shuffle', key: 'music_mode_random' },
        { icon: 'fa-rotate-right', key: 'music_mode_single' }
    ];

    function loadSong(song) {
        mCoverImg.classList.add('fade-out');
        mSongTitle.classList.add('fade-out');

        setTimeout(() => {
            mSongTitle.removeAttribute('data-key'); // 移除准备播放的状态
            mSongTitle.innerText = song.name;
            mAudioPlayer.src = R2_BASE_URL + "music/" + song.file;
            mCoverImg.src = R2_BASE_URL + "images/" + song.cover;
            
            mCoverImg.classList.remove('fade-out');
            mSongTitle.classList.remove('fade-out');
        }, 400); 
    }

    // 网页加载时的默认处理
    mSongTitle.removeAttribute('data-key');
    mSongTitle.innerText = songs[songIndex].name;
    mAudioPlayer.src = R2_BASE_URL + "music/" + songs[songIndex].file;
    mCoverImg.src = R2_BASE_URL + "images/" + songs[songIndex].cover;

    function playMusic() {
        setTimeout(() => { mAudioPlayer.play(); }, 400);
        // 只改换图标和标签标识，翻译让引擎自动去弄
        mPlayBtn.querySelector('i').className = 'fa-solid fa-pause';
        const span = mPlayBtn.querySelector('span');
        span.setAttribute('data-key', 'music_pause');
        span.innerText = langDict[getCurrentLang()].music_pause;
        
        mCoverImg.classList.add('music-spin');
        mCoverImg.classList.remove('music-paused');
    }

    function pauseMusic() {
        mAudioPlayer.pause();
        mPlayBtn.querySelector('i').className = 'fa-solid fa-play';
        const span = mPlayBtn.querySelector('span');
        span.setAttribute('data-key', 'music_play');
        span.innerText = langDict[getCurrentLang()].music_play;
        
        mCoverImg.classList.add('music-paused');
    }

    function nextMusic() {
        if (playMode === 1) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            while(randomIndex === songIndex && songs.length > 1) {
                randomIndex = Math.floor(Math.random() * songs.length);
            }
            songIndex = randomIndex;
        } else if (playMode === 2) {
            // 单曲循环逻辑
        } else {
            songIndex++;
            if (songIndex > songs.length - 1) { songIndex = 0; }
        }
        loadSong(songs[songIndex]);
        if (!mAudioPlayer.paused) { playMusic(); }
    }

    function prevMusic() {
        if (playMode === 1) {
            songIndex = Math.floor(Math.random() * songs.length);
        } else {
            songIndex--;
            if (songIndex < 0) { songIndex = songs.length - 1; }
        }
        loadSong(songs[songIndex]);
        if (!mAudioPlayer.paused) { playMusic(); }
    }

    mPlayBtn.addEventListener('click', () => {
        if (mAudioPlayer.paused) { playMusic(); } else { pauseMusic(); }
    });
    mPrevBtn.addEventListener('click', prevMusic);
    mNextBtn.addEventListener('click', nextMusic);

    mModeBtn.addEventListener('click', () => {
        playMode = (playMode + 1) % 3;
        mModeBtn.querySelector('i').className = `fa-solid ${modes[playMode].icon}`;
        const span = mModeBtn.querySelector('span');
        span.setAttribute('data-key', modes[playMode].key);
        span.innerText = langDict[getCurrentLang()][modes[playMode].key];
    });

    mPlaylistBtn.addEventListener('click', () => {
        const isOpen = mPlaylistWrapper.style.maxHeight && mPlaylistWrapper.style.maxHeight !== '0px';
        const span = mPlaylistBtn.querySelector('span');
        if (isOpen) {
            mPlaylistWrapper.style.maxHeight = '0';
            span.setAttribute('data-key', 'music_list_expand');
            span.innerText = langDict[getCurrentLang()].music_list_expand;
        } else {
            mPlaylistWrapper.style.maxHeight = '300px';
            span.setAttribute('data-key', 'music_list_collapse');
            span.innerText = langDict[getCurrentLang()].music_list_collapse;
        }
    });

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            mProgress.style.width = `${progressPercent}%`;
        }
    }
    mAudioPlayer.addEventListener('timeupdate', updateProgress);

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = mAudioPlayer.duration;
        mAudioPlayer.currentTime = (clickX / width) * duration;
    }
    mProgressContainer.addEventListener('click', setProgress);
    mAudioPlayer.addEventListener('ended', nextMusic);

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = (index + 1) + ". " + song.name;
        
        li.addEventListener('click', () => {
            if (songIndex !== index) {
                songIndex = index;
                loadSong(songs[songIndex]);
                playMusic();
            }
        });
        mPlaylistList.appendChild(li);
    });
});
