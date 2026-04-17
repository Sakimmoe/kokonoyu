// =========================================
// 🌐 中日英多语言大词典 🌐
// =========================================
const langDict = {
    cn: {
        nav_gift: "赞助/GIFT", nav_comm: "COMMISSION", nav_work: "关于委托工作", nav_contact: "联系我", nav_site: "关于本站", name: "九重紫",
        bio: "自2020年开始在国内外活动活动的虚拟主播（VUP）。<br>自称向往和平的“动画女孩巫女”。除联动，商品介绍，企划参与外，还承接Live2D建模的工作。如果有什么需求请随时联系我。",
        title_profile: "个人档案",
        p_nick: "<strong>昵称：</strong> ここのゆ、のゆ、ゆ", p_height: "<strong>身高：</strong> 152cm", p_zodiac: "<strong>星座：</strong> 巨蟹座", p_birth: "<strong>生日：</strong> 7月22日", p_nature: "<strong>性格：</strong> 待人柔和、认真、有些胆小、直率的“豆腐心”", p_moe: "<strong>萌点：</strong> 治愈系、巫女、亚人、病弱、傲娇", p_fans: "<strong>粉丝名：</strong> 平和族（变态族） / 一家紫 / 紫细胞 / 兵马俑", p_treasure: "<strong>最珍视的事物：</strong> 家人与粉丝（听众）", p_role: "<strong>喜欢的角色：</strong> sirotan", p_tag: "<strong>主标签：</strong> #ここのゆ", p_fanart: "<strong>同人图标签：</strong> #ここのゆああと", p_mama: "画师妈妈：",
        p_design: "<strong>🎨 艺术设计：</strong> <span class='design-link' onclick=\"showPage('design-page')\">点击查看 Design</span>",
        title_story: "角色设定",
        p_story1: "几年前因为被来自冥王星的光直击，从人类变成了亚人。现在一边作为 VUP 活动，一边以“代替梦的主人去追寻那些未能实现或被遗忘的梦并予以供养”为生。",
        p_story2: "我的梦想是：<strong>能够变得更加闪耀光芒！</strong>",
        title_intro: "主播轶事",
        val_intro1: "直播内容以游戏直播和杂谈为主，偶尔会唱歌和画画。虽然游戏力不高，特别不擅长FPS还会晕3D，但总是非常努力！",
        val_intro2: "因为懂得很多本土梗被粉丝称为“整活大师”，还因为能熟练吹奏各种神曲的口哨被弹幕赐号“天哨星”~",
        val_intro3: "虽然是个常常发烧的“病弱”体质，但总是坚持带病为大家直播，是个非常宠粉、温柔纯情的“豆腐心”小娘紫哦！",
        title_design: "Character Design", btn_back: "← 返回上一页",
        sp_desc1: "每月更新一次，发布绘画日记和个人拍摄的照片等。", sp_desc2: "可以通过fansfer寄送信件，或通过Gipt赠送愿望清单物品，支持海外与PayPal。", sp_desc4: "手绘周边、简单插图委托（目前仅接原创角色）以及音频文件出售。",
        rb1: "制作和发布九重紫的直播剪辑视频：可以", rl1: "<li>恶意编辑和剪辑禁止。</li><li>禁止篡改视频发言的意图或表达，造成误解的编辑。</li><li>禁止任何损害九重紫名誉、人格或信誉的编辑。</li><li>禁止剪辑YouTube的限定公开直播档案。</li>",
        rb2: "向插画师委托九重紫的粉丝艺术作品：可以", rl2: "<li>请告知版权拥有者和插图的使用范围（如是否允许商用等）。</li><li>如果作品包含过度的色情或暴力等敏感内容，可能无法公开或使用。</li><li>创作者的业绩展示是允许的，请尽量避免给创作者带来困扰。</li>",
        p_coming1: "施工中...", p_coming2: "施工中...", p_coming3: "施工中...",
        site_p1: "你好！欢迎来到这里。这是一个由粉丝用爱发电、自发搭建的<strong>非官方个人主页</strong>。", site_h1: "📝 搭建初衷", site_p2: "作为一名一直关注着九重紫（のゆ）的粉丝，我被她温柔的声音、可爱的性格以及向往和平的“豆腐心”深深打动。为了能让更多人方便地了解她、找到她的各种官方社交媒体和支持渠道，我制作了这个简单的网页。希望能尽自己的一份绵薄之力，让更多人看到正在闪耀光芒的她！", site_h2: "👤 关于我", site_p3: "我只是一名普通的粉丝，如果你也喜欢九重紫，或者对这个网页的排版有什么建议，欢迎来 B站 找我玩：<br>👉 <a href='https://space.bilibili.com/17276?spm_id_from=333.976.0.0' target='_blank' class='design-link' style='border:none;'>点击访问我的 Bilibili 个人主页</a>", site_box: "<strong>⚠️ 版权与免责声明</strong><br><br>1. 本网站内所使用的<strong>所有美术素材、图片、Logo、背景故事及设定等内容，版权均归主播 <a href='https://kokonoeyukari.my.canva.site/' target='_blank'>九重紫（Kokonoe Yukari）</a> 及其合作画师所有。</strong><br>2. 本站仅作粉丝安利与导航整理用途，没有任何商业盈利目的。<br>3. 如果本站的内容有任何侵权或不妥之处，请随时通过上方 B 站链接私信联系我，我会在第一时间配合修改或删除。"
    },
    jp: {
        nav_gift: "支援/GIFT", nav_comm: "依頼", nav_work: "お仕事について", nav_contact: "連絡先", nav_site: "このサイトについて", name: "ここのえゆかり",
        bio: "2020年からVTuber（VUP）として国内外で活動中。<br>平和を爱する自称「アニメガール巫女」。コラボや商品紹介のほか、Live2Dモデリングも承っております。お気軽にお問い合わせください。",
        title_profile: "プロフィール",
        p_nick: "<strong>ニックネーム：</strong> ここのゆ、のゆ、ゆ", p_height: "<strong>身長：</strong> 152cm", p_zodiac: "<strong>星座：</strong> 蟹座", p_birth: "<strong>誕生日：</strong> 7月22日", p_nature: "<strong>性格：</strong> 物腰が柔らかく真面目、少し臆病で素直な「豆腐メンタル」", p_moe: "<strong>萌え属性：</strong> 癒やし系、巫女、亜人、病弱、ツンデレ", p_fans: "<strong>ファンネーム：</strong> 平和族 / 一家紫 / 紫細胞 / 兵馬俑", p_treasure: "<strong>大切にしているもの：</strong> 家族、ファン（リスナー様）", p_role: "<strong>好きなキャラ：</strong> しろたん", p_tag: "<strong>メインタグ：</strong> #ここのゆ", p_fanart: "<strong>ファンアートタグ：</strong> #ここのゆああと", p_mama: "絵師ママ：",
        p_design: "
