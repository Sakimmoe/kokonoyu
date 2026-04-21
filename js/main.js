// =========================================
// 🚀 救命神药：最先执行，防卡死加载动画保险 🚀
// =========================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if(loader) { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; }
});
setTimeout(function() {
    const loader = document.getElementById('loader');
    if(loader) { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; }
}, 1500);

// =========================================
// ✨ AOS 滚动加载动画初始化 ✨
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: false, offset: 60, duration: 800, easing: 'ease-out-cubic' });
    }
});

// =========================================
// 🌐 数据库配置区 (Bmob 密钥) 🌐
// =========================================
try {
    Bmob.initialize("6c39dac0aff82e8c", "kokonoyu471056.Y");
} catch (e) {
    console.error("Bmob 初始化失败：", e);
}

// =========================================
// ✨ 视频配置区 (直接填入 BVID，无需再填 cover) ✨
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
// ✨ 历程精选配置区 (数据精简提炼自萌娘百科) ✨
// =========================================
const milestonesData = [
    { date: '2020年6月9日', cn: '在bilibili进行初次投稿 📺', jp: 'bilibili初投稿 📺' },
    { date: '2020年11月10日', cn: '成功进行bilibili首次直播 🎙️', jp: '初のbilibili配信 🎙️' },
    { date: '2020年11月18日', cn: 'bilibili粉丝数突破1万 🎉<br><span class="timeline-detail">因为一个整活视频，1天内粉丝从二三百暴涨到一万。</span>', jp: 'bilibiliフォロワー数1万人突破 🎉<br><span class="timeline-detail">ネタ動画が大ウケし、1日でフォロワーが数百人から1万人に急増。</span>' },
    { date: '2021年8月21日', cn: '发布第二套正式形象 👗', jp: '2nd公式モデル発表 👗' },
    { date: '2022年2月23日', cn: 'bilibili粉丝数突破20万 🎈', jp: 'bilibiliフォロワー数20万人突破 🎈' },
    { date: '2022年4月1日', cn: '愚人节整活大危机 🐱<br><span class="timeline-detail">“猫猫”代播放出奇怪文件，造就了经典的一天。</span>', jp: 'エイプリルフール企画 🐱<br><span class="timeline-detail">「猫ちゃん」が配信を乗っ取り、色々とやばいファイルが流出するハプニングが発生。</span>' },
    { date: '2022年7月23日', cn: '生日回首次达成10名提督成就 🚢', jp: '誕生日配信で初の提督10人達成 🚢' },
    { date: '2022年9月16日', cn: '宣布开设官方字幕组 📝', jp: '公式字幕組の設立を発表 📝' },
    { date: '2022年11月6日', cn: 'bilibili粉丝数突破30万 👑', jp: 'bilibiliフォロワー数30万人突破 👑' },
    { date: '2024年5月28日', cn: 'bilibili粉丝数突破50万 🌟', jp: 'bilibiliフォロワー数50万人突破 🌟' },
    { date: '2025年2月4日', cn: '举办九重紫4周年＆3D化纪念会 🎊', jp: '九重紫4周年＆3D化記念配信 🎊' },
    { date: '2025年12月25日', cn: '超美丽3D圣诞直播 🎄<br><span class="timeline-detail">开启漫无止境的圣诞节头像活动，共计绘制头像772张。</span>', jp: '超美麗3Dクリスマス配信 🎄<br><span class="timeline-detail">終わらないクリスマスアイコン描き企画がスタート（計772枚作成）。</span>' },
    { date: '2026年2月1日', cn: '登顶全站热门 🔥<br><span class="timeline-detail">投稿视频《总有人看了点哔哩哔哩就以为自己会说中文了》大受好评。</span>', jp: '全休人気ランキング入り 🔥<br><span class="timeline-detail">中国語ネタ動画が大好評で、久々に全サイトのトレンド入り。</span>' },
    { date: '2026年2月16日', cn: '除夕夜直播 & 突破60万粉 🧨<br><span class="timeline-detail">新年到来之际，戴上马年头饰迎来了60万粉丝的时刻。</span>', jp: '大晦日配信 & 60万人フォロワー突破 🧨<br><span class="timeline-detail">新年の訪れとともに、馬の髪飾りをつけて60万人突破の瞬間を迎えた。</span>' },
    { date: '2026年2月23日', cn: '2222天纪念日 ✨<br><span class="timeline-detail">迎来以九重紫名义使用bilibili账号的第2222天。</span>', jp: '2222日記念日 ✨<br><span class="timeline-detail">九重紫としてbilibili活動2222日目を迎える。</span>' }
];

// =========================================
// 🌐 中日双语字典 🌐
// =========================================
const langDict = {
    cn: {
        nav_home: "首页", nav_site: "关于本站", name: "九重紫",
        nav_gallery: "画廊",
        nav_guestbook: "留言板", 
        nav_works: "作品",
        nav_milestone: "历程",
        works_back: "← 返回合集列表",
        video_count: "个视频",
        ms_counter_prefix: "紫老师在哔哩哔哩已活跃",
        ms_days: "天",
        gb_avatar_text: "请选择你的头像：", gb_name_placeholder: "你的昵称 (选填，默认匿名)", gb_content_placeholder: "在这里写下想对紫老师说的话吧...", gb_submit: "发送留言 ✨", gb_admin: "🛠️ 管理员入口", gb_loading: "努力向云端拉取留言中...", gb_no_comment: "还没有人留言哦，快来抢沙发！", gb_fail: "连接云端数据库失败，可能由于网络原因组件未加载。刷新页面再试一下！", gb_delete: "🗑️ 强制删除",
        bio: "通过体验实现某人生前无法达成的梦想来超度他们，以延续自己寿命的亚人。<br>在几年前还是人类，但现在以亚人的姿态存在。<br>自称最清楚的平和族，梦想大家能和平相处，每一个人都幸福地在同一个世界生活。<br>为了这个目标而努力进行活动。",
        title_profile: "个人档案", p_nick: "<strong>昵称：</strong> ここのゆ、のゆ、ゆ", p_height: "<strong>身高：</strong> 152cm", p_zodiac: "<strong>星座：</strong> 巨蟹座", p_birth: "<strong>生日：</strong> 7月22日", p_nature: "<strong>性格：</strong> 待人柔和、认真、有些胆小、直率的“豆腐心”", p_moe: "<strong>萌点：</strong> 治愈系、巫女、亚人、病弱、傲娇", p_fans: "<strong>粉丝名：</strong> 平和族（变态族） / 一家紫 / 紫细胞 / 兵马俑", p_treasure: "<strong>最珍视的事物：</strong> 家人与粉丝（听众）", p_role: "<strong>喜欢的角色：</strong> sirotan", p_tag: "<strong>主标签：</strong> #こ这个のゆ", p_fanart: "<strong>同人图标签：</strong> #こ这个のゆああと", p_mama: "画师妈妈：",
        p_design: "<strong>🎨 艺术设计：</strong> <span class='design-link' onclick=\"showPage('design-page')\">点击查看 Design</span>",
        title_activity: "直播内容 - 活动内容", val_activity: "<p>基本是游戏直播和杂谈，有时候会唱歌和画画。</p><p>游戏直播以RPG为主，不过会尝试各种不同类型的游戏。</p><p>游戏力水平比较低，含有杀戮，犯罪，欺骗的游戏基本都不擅长. 特别不擅长FPS，会晕3D.</p><p>没有字幕组，自己制作视频和整活（现已成立自己的字幕组）.</p>",
        title_personal: "个人相关", val_personal: "<ul class='info-list'><li><strong>啊加嘛似嘛似：</strong>紫老师常用“啊加嘛似嘛似（あじゃますます）”表达感谢. 完整的表达通常会在后面加上“ありがとうにゃん 谢谢”.</li><li><strong>病弱：</strong>紫老师大约一至两个月会有身体不佳的情况，通常是发烧. 目前带病直播几乎是常态.</li><li><strong>简称：</strong>紫老师全名 ここのえゆかり ⇒ こ这个のゆ ⇒ のゆ ⇒ ゆ. 一般简称到こ这个のゆ，直播待机结束画面说的也是こ这个のゆ.</li><li><strong>整活大师：</strong>熟悉本土各种梗，经常会做视频将梗运用到极致，常整得一手好活. 自称所有的梗都是从萌娘百科看明白的. 很多视频鉴赏回当场一脸懵逼，但第二天就玩得66的. 可放的吸收能力.</li><li><strong>天哨星：</strong>紫老师直播吹得一手好口哨，能熟练吹出《好汉歌》、《Never Gonna Give You Up》等歌曲，弹幕曾在水浒回赐号：天哨星. 紫老师便是这108将的第109人.</li><li><strong>字幕组校对：</strong>紫老师曾在oto字幕组当校对. 你永远不知道自己推的女人在干什么.</li><li><strong>理工男气质：</strong>紫老师礼貌、努力、懂事，做事一板一眼，颇有理工男气质.</li></ul>",
        title_meme: "相关梗", val_meme: "<ul class='info-list'><li><strong>秦始皇/兵马俑：</strong>首次出现在《三句话把我骗到了bilibili》. 原梗为早期电信诈骗：“我是秦始皇，现在给我打钱，我起势了封你做大官”. 因为视频中出现了“秦始皇让兵马俑给我点了赞”，所以阿紫的粉丝玩此梗时便自称为兵马俑.</li><li><strong>紫细胞：</strong>在直播中抓获某位粉丝的DD行为时，该粉丝自称：推其他人都是我的细胞自己分裂出去的，我是阿紫的单推人. 因为此行为类似细胞分裂，所以粉丝玩此梗时会自称是紫细胞.</li><li><strong>平和族/变态族：</strong>粉丝名称一开始为和平族，后因为觉得比起世界和平，更希望粉丝们能内心平和，因此改名为平和族. 但是经常会有粉丝做出一些hentai的发言/行为，这部分粉丝被称为变态族.</li><li><strong>男孩紫：</strong>出现于《日本小巫女看王迅找茬》. 其中的白发紫在被找茬后，反怼对方说自己是男孩子. DD狂喜：那不是更好.</li><li><strong>粉丝握手会：</strong>在粉丝握手会的直播中，玩起了VR打僵尸（DD）游戏. 僵尸（DD）们前来和阿紫握手，被阿紫热烈款待（DD爆头）.</li><li><strong>×重紫：</strong>直播间的当前人气排名是第几名就是几重紫（如当前排名第一就是一重紫）. 此梗出自修仙小说体系中表示修仙者能力的层数.</li><li><strong>旧重紫：</strong>通常指初代模型，也可用于形容阿紫比较老的直播内容或动态.</li></ul>",
        btn_back: "← 返回上一页",
        site_p1: "你好！欢迎来到这里. 这是一个由粉丝用爱发电、自发搭建的<strong>非官方个人主页</strong>.", site_h1: "搭建初衷", site_p2: "我是2026年1月13日开始关注紫老师的，当时紫老师正在看《爱情公寓》，我也跟着看了一两集，我发现一件让我觉得很奇怪的事：为什么这么大的一个主播连一毛钱的礼物都会很认真的感谢？后面就逐渐对紫老师的直播感兴趣了.<br><br>我觉得紫老师是一个对工作很认真、很负责的人，对粉丝也很用心、很真诚. 后面了解到原来之前圣诞节还会上舰给舰长画头像的活动，我发现紫老师对每一个头像画的都很认真，没有一丝丝的敷衍（可惜我错过活动了呜呜）.<br><br>在那之后我就想给紫老师做点什么，正好发现紫老师kokonoyu.com这个域名还没有人注册，于是我就买了下来准备做点东西.<br><br>所以我首先做了紫老师的主页，后续可能还会做紫老师的作品导航、音乐站之类的（如果能得到紫老师授权的话）.", site_h2: "内容来源与建议", site_p3: "本站的部分内容资料摘自 <strong>萌娘百科</strong> 以及 <strong>九重紫的B站个人空间</strong>. 我只是一名普通的粉丝，如果你也喜欢九重紫，或者对这个网页的排版与内容有什么建议，欢迎通过哔哩哔哩私信我：<br>👉 <a href='https://space.bilibili.com/17276?spm_id_from=333.976.0.0' target='_blank' class='design-link' style='border:none;'>点击访问我的 Bilibili 个人主页</a>", site_box: "<strong>⚠️ 版权与免责声明</strong><br><br>1. 本网站内所使用的<strong>所有美术素材、图片、Logo、背景故事及设定等内容，版权均归主播 <a href='https://kokonoeyukari.my.canva.site/' target='_blank'>九重紫（Kokonoe Yukari）</a> 及其合作画师所有.</strong><br>2. 本站仅作粉丝安利与导航整理用途，没有任何商业盈利目的.<br>3. 如果本站的内容有任何侵权或不妥之处，请随时通过上方 B 站链接私信联系我，我会在第一时间配合修改或删除."
    },
    jp: {
        nav_home: "ホーム", nav_site: "このサイトについて", name: "ここのえゆかり",
        nav_gallery: "ギャラリー",
        nav_guestbook: "掲示板", 
        nav_works: "作品",
        nav_milestone: "軌跡",
        works_back: "← コレクション一覧に戻る",
        video_count: "本の動画",
        ms_counter_prefix: "紫先生がbilibiliで活動を始めてから",
        ms_days: "日",
        gb_avatar_text: "アイコンを選択してください：", gb_name_placeholder: "ニックネーム（任意、デフォルトは匿名）", gb_content_placeholder: "ここに紫先生へのメッセージを書いてください...", gb_submit: "送信する ✨", gb_admin: "🛠️ 管理者入口", gb_loading: "コメントを読み込み中...", gb_no_comment: "まだコメントはありません. 最初のコメントを書きましょう！", gb_fail: "データベースの接続に失敗しました. ページをリロードしてください.", gb_delete: "🗑️ 削除",
        bio: "誰かが生前に叶えられなかった夢を追体験して供養し、自身の寿命を延ばしている亜人.<br>数年前までは人間だったが、現在は亜人の姿で存在している.<br>自称「最も清楚な平和族」. 皆が平和に過ごし、誰もが同じ世界で幸せに暮らせることを夢見ている.<br>その目標のために日々活動を頑張っている.",
        title_profile: "プロフィール", p_nick: "<strong>ニックネーム：</strong> ここのゆ、のゆ、ゆ", p_height: "<strong>身長：</strong> 152cm", p_zodiac: "<strong>星座：</strong> 蟹座", p_birth: "<strong>誕生日：</strong> 7月22日", p_nature: "<strong>性格：</strong> 物腰が柔らかく真面目、少し臆病で素直な「豆腐メンタル」", p_moe: "<strong>萌え属性：</strong> 癒やし系、巫女、亜人、病弱、ツンデレ", p_fans: "<strong>ファンネーム：</strong> 平和族 / 一家紫 / 紫細胞 / 兵马俑", p_treasure: "<strong>大切にしているもの：</strong> 家族、ファン（リスナー様）", p_role: "<strong>好きなキャラ：</strong> しろたん", p_tag: "<strong>メインタグ：</strong> #ここのゆ", p_fanart: "<strong>ファンアートタグ：</strong> #ここのゆああと", p_mama: "絵師ママ：",
        p_design: "<strong>🎨 キャラクターデザイン：</strong> <span class='design-link' onclick=\"showPage('design-page')\">Designを見る</span>",
        title_activity: "配信内容", val_activity: "<p>基本はゲーム配信と杂谈、たまに歌枠やお絵描き.</p><p>ゲームはRPGを中心に、様々なジャンルに挑戦する.</p><p>ゲームスキルは低めで、殺戮、犯罪、騙し合いのあるゲームは苦手. 特にFPSは苦手で3D酔いしやすい.</p><p>以前は字幕組がなく、自ら動画制作やネタ作りを行っていた（現在は公式字幕組が設立されている）.</p>",
        title_personal: "パーソナル情報", val_personal: "<ul class='info-list'><li><strong>あじゃますます：</strong>感謝を伝える際によく使う言葉. 後に「ありがとうにゃん」を続けることが多い.</li><li><strong>病弱：</strong>1〜2ヶ月に一度体調を崩し、よく熱を出す. 現在では病み上がり配信がほぼ日常茶飯事.</li><li><strong>略称：</strong>ここのえゆかり ⇒ ここのゆ ⇒ のゆ ⇒ ゆ. 一般的には「ここのゆ」と呼ばれ、待機画面でもそう名乗っている.</li><li><strong>ネタ職人：</strong>中国のネットミームに精通しており、動画でよく使いこなす. 吸収力が凄まじい.</li><li><strong>天哨星：</strong>配信で口笛を吹くのが上手く、「天哨星」というあだ名が付けられた.</li><li><strong>字幕組校对：</strong>かつてoto字幕組で校正を担当していた.</li><li><strong>理系男子気質：</strong>礼儀正しく、努力家で物事をきっちりこなす理系男子のような一面がある.</li></ul>",
        title_meme: "関連ミーム", val_meme: "<ul class='info-list'><li><strong>始皇帝/兵马俑：</strong>诈欺ミームが元ネタ. 動画で「始皇帝が兵马俑にいいねを押させた」と言ったことから、ファンが兵马俑を自称するように.</li><li><strong>紫細胞：</strong>DD行為がバレたファンが「他の推しは自分の細胞が分裂したもの」と言言い訳したことから.</li><li><strong>平和族/変態族：</strong>ファンネームは平和族だが、変態的な発言をするファンは「変態族」と呼ばれる.</li><li><strong>男の子紫：</strong>動画内で「僕は男の子だよ」と反論したことから. DD歓喜.</li><li><strong>ファン握手会：</strong>VRゾンビゲームで近づいてくるゾンビ（DD）をヘッドショットすること.</li><li><strong>×重紫：</strong>配信の現在人気ランキング順位＝×重紫（1位なら一重紫）.</li><li><strong>旧重紫：</strong>初期モデルや、昔の配信コンテンツを指す言葉.</li></ul>",
        btn_back: "← 戻る",
        site_p1: "こんにちは！このサイトはファンが愛を込めて自主的に作成した<strong>非公式の個人サイト</strong>です.", site_h1: "制作のきっかけ", site_p2: "私が紫先生を応援し始めたのは2026年1月13日です. 当時、先生がドラマ『愛情公寓』の同時視聴をしていて、私も一緒に数話見ました. その時、あることに驚きました.「こんなに大きな配信者なのに、1円のギフトにもすごく丁寧に感謝しているのはなぜだろう？」と. そこから徐々に紫先生の配信に惹かれていきました.<br><br>紫先生は仕事に対してとても真面目で責任感があり、ファンに対しても心がこもっていて誠実な方だと思います. 後で知ったのですが、クリスマスの時期にメンバーシップ（艦長）加入者にアイコンを描く企画があり、その一つ一つを一切の手抜きなく、とても丁寧に描いているのを見て感動しました（私は参加しそびれてしまって泣いていますが…）.<br><br>それ以来、紫先生のために何かしたいと思うようになり、ちょうど「kokonoyu.com」というドメインが空いているのを見つけたので、取得して何か作ることにしました.<br><br>そこで、まずは紫先生のホームページを作りました. 今後、許可をいただければ、作品のナビゲーションサイトや音楽サイトなども作っていけたらと思っています.", site_h2: "情報源とご意見について", site_p3: "当サイトのコンテンツの一部は、<strong>萌娘百科</strong>および<strong>九重紫さんのBilibili個人ページ</strong>から引用しています. 私はただの一般ファンですが、もしこのサイトについてアドバイスやご意見がありましたら、BilibiliのDMでお気軽にお知らせください：<br>👉 <a href='https://space.bilibili.com/17276?spm_id_from=333.976.0.0' target='_blank' class='design-link' style='border:none;'>私の Bilibili ページへ</a>", site_box: "<strong>⚠️ 著作権および免責事項</strong><br><br>1. 当サイトで使用している<strong>すべてのイラスト等の著作権は、<a href='https://kokonoeyukari.my.canva.site/' target='_blank'>九重紫様</a>および絵師様に帰属します.</strong><br>2. 当サイトは非営利目的のファンサイトです.<br>3. 万が一問題がございましたら、Bilibiliのリンクからご連絡ください."
    }
};

// =========================================
// 切换语言功能
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

    if(document.getElementById('milestone-timeline')) {
        renderMilestones();
    }
}

// =========================================
// ✨ 视频与作品逻辑
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
            if (img) {
                img.src = secureUrl;
            }
        }
        delete window['setBiliCover_' + bvid];
        const script = document.getElementById('script_' + bvid);
        if (script) script.remove();
    };

    const script = document.createElement('script');
    script.id = 'script_' + bvid;
    script.src = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}&jsonp=jsonp&callback=setBiliCover_${bvid}`;
    document.body.appendChild(script);
}

function renderCollections() {
    const grid = document.getElementById('collections-view');
    if(!grid) return;
    const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
    
    grid.innerHTML = worksData.map(collection => `
        <div class="collection-card" onclick="openCollection('${collection.id}')">
            <img src="${collection.cover}" class="card-cover" referrerpolicy="no-referrer" alt="cover">
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
    const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
    
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
                <div class="play-overlay">
                    <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
            </div>
            <div class="card-info">
                <div class="card-title">${video.title}</div>
            </div>
        </div>
        `;
    }).join('');

    collection.videos.forEach(video => {
        if (!coverCache[video.bvid]) {
            fetchBiliCover(video.bvid);
        }
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
// ✨ 画廊加载与弹窗逻辑 ✨
// =========================================
let galleryInitialized = false;
let currentLightboxIndex = 0; 
let galleryImagesList = [];    

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
        img.onerror = function() { loadingText.style.display = 'none'; };
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
    if (event && event.target.id !== 'lightbox-modal' && !event.target.classList.contains('lightbox-close')) { return; }
    const modal = document.getElementById("lightbox-modal");
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; 
}

// =========================================
// ✨ 全网云端留言板逻辑 ✨
// =========================================
let isAdmin = false;

async function loadComments() {
    const list = document.getElementById('guestbook-list');
    if(!list) return;
    const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
    list.innerHTML = `<p style="text-align:center; color:#d87093; font-size:15px; margin-top:30px;" data-key="gb_loading">${langDict[currentLang].gb_loading}</p>`;

    try {
        if(typeof Bmob === 'undefined') throw new Error("Bmob 没有成功加载");
        const query = Bmob.Query("Guestbook");
        query.order("-createdAt");
        const comments = await query.find();

        list.innerHTML = '';
        if (comments.length === 0) {
            list.innerHTML = `<p style="text-align:center; color:#999; font-size:15px; margin-top:30px;" data-key="gb_no_comment">${langDict[currentLang].gb_no_comment}</p>`;
            return;
        }

        comments.forEach((c) => {
            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `
                <img src="${c.avatar}" class="comment-avatar" alt="Avatar">
                <div class="comment-body">
                    <div class="comment-header">
                        <div>
                            <span class="comment-name">${escapeHTML(c.name)}</span>
                            <span class="comment-time">${c.createdAt}</span>
                        </div>
                        ${isAdmin ? `<button class="comment-delete" style="display:block;" onclick="deleteComment('${c.objectId}')" data-key="gb_delete">${langDict[currentLang].gb_delete}</button>` : ''}
                    </div>
                    <div class="comment-content">${escapeHTML(c.content)}</div>
                </div>
            `;
            list.appendChild(div);
        });
        if (typeof AOS !== 'undefined') AOS.refresh();
    } catch (error) {
        list.innerHTML = `<p style="text-align:center; color:red; margin-top:30px;" data-key="gb_fail">${langDict[currentLang].gb_fail}</p>`;
    }
}

async function submitComment() {
    const btn = document.querySelector('.gb-submit-btn');
    const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
    const defaultName = currentLang === 'jp' ? '匿名の兵马俑' : '匿名兵马俑';
    const nameInput = document.getElementById('gb-name').value.trim() || defaultName;
    const contentInput = document.getElementById('gb-content').value.trim();
    const avatarInput = document.querySelector('input[name="gb-avatar"]:checked').value;

    if(!contentInput) { alert(currentLang === 'jp' ? '空白のメッセージは送信できません！' : '不能发送空白留言哦！'); return; }

    btn.innerText = currentLang === 'jp' ? "送信中..." : "上传云端中...";
    btn.disabled = true;

    try {
        if(typeof Bmob === 'undefined') throw new Error("Bmob 没有成功加载");
        const query = Bmob.Query('Guestbook');
        query.set("name", nameInput);
        query.set("content", contentInput);
        query.set("avatar", avatarInput);
        await query.save();

        document.getElementById('gb-content').value = ''; 
        loadComments(); 
    } catch (error) {
        alert(currentLang === 'jp' ? '送信に失敗しました. 再試行してください！' : '发送失败了，可能是网络原因，请刷新重试！');
    } finally {
        btn.innerText = langDict[currentLang].gb_submit;
        btn.disabled = false;
    }
}

function toggleAdmin() {
    if(isAdmin) { isAdmin = false; alert('已退出管理员模式。'); loadComments(); return; }
    const pwd = prompt('请输入管理员密码：');
    if(pwd === 'kokonoyu471056.Y') { isAdmin = true; alert('✅ 身份确认！管理员模式已开启。'); loadComments(); } 
    else if (pwd !== null) { alert('❌ 密码错误！'); }
}

async function deleteComment(id) {
    if(confirm('警告：确定要从全网数据库中彻底删除这条留言吗？')) {
        try {
            const query = Bmob.Query('Guestbook');
            await query.destroy(id);
            loadComments(); 
        } catch (error) { alert('删除失败！'); }
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

// =========================================
// 🎉 历程渲染与天数计算逻辑 🎉
// =========================================
function renderMilestones() {
    const timeline = document.getElementById('milestone-timeline');
    if (!timeline) return;
    const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
    
    timeline.innerHTML = milestonesData.map((item, index) => `
        <div class="timeline-item" data-aos="fade-up" data-aos-delay="${Math.min(index * 50, 400)}">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">${item[currentLang]}</div>
        </div>
    `).join('');
}

function updateDaysCounter() {
    const daysEl = document.getElementById('live-days');
    if (!daysEl) return;

    // 核心逻辑：以 2026年2月23日 作为 第2222天的锚点
    const anchorDate = new Date('2026-02-23T00:00:00+08:00');
    const today = new Date();
    
    // 计算时差并转为天数
    const diffTime = today.getTime() - anchorDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    
    // 基础锚点2222天 + 相差的天数
    const targetDays = 2222 + diffDays;

    // 跳动数字动画效果
    let currentVal = 0;
    const duration = 1500;
    const interval = 30;
    const step = Math.ceil(targetDays / (duration / interval));

    const timer = setInterval(() => {
        currentVal += step;
        if (currentVal >= targetDays) {
            daysEl.innerText = targetDays;
            clearInterval(timer);
        } else {
            daysEl.innerText = currentVal;
        }
    }, interval);
}

// =========================================
// 页面切换与导航逻辑
// =========================================
function showPage(pageId) {
    var pages = document.getElementsByClassName('sub-page');
    for (var i = 0; i < pages.length; i++) { pages[i].classList.remove('active-page'); }
    var targetPage = document.getElementById(pageId);
    void targetPage.offsetWidth; 
    targetPage.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const topNav = document.getElementById('top-nav-menu');
    if (topNav.classList.contains('active')) { topNav.classList.remove('active'); }

    if (pageId === 'works-page') { 
        renderCollections(); 
        backToCollections();
    }
    if (pageId === 'gallery-page') { initGallery(); }
    if (pageId === 'guestbook-page') { loadComments(); }
    
    // 进入历程页时触发渲染与计数器
    if (pageId === 'milestone-page') {
        renderMilestones();
        updateDaysCounter();
    }
    
    setTimeout(() => { if (typeof AOS !== 'undefined') AOS.refresh(); }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const topNav = document.getElementById('top-nav-menu');
    if(menuBtn && topNav) {
        menuBtn.addEventListener('click', function() { topNav.classList.toggle('active'); });
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
// ✨ 原生分享相关功能 ✨
// =========================================
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

async function sharePage() {
    const shareData = { title: '九重紫 -Jiuchong Zi- 个人主页', text: '快来看看紫老师（ここのえゆかり）的非官方个人主页吧！', url: window.location.href };
    try {
        if (navigator.share) { await navigator.share(shareData); } 
        else {
            navigator.clipboard.writeText(shareData.url).then(() => {
                const currentLang = document.querySelector('.lang-btn.active').innerText.toLowerCase() === 'jp' ? 'jp' : 'cn';
                alert(currentLang === 'jp' ? 'リンクがクリップボードにコピーされました！' : '网址已复制到剪贴板，快去分享给小伙伴吧！');
            });
        }
    } catch (err) { console.log('分享取消或失败:', err); }
}
