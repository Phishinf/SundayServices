import { ChurchService, Volunteer, ValidationAlert, ConfigurationRules, AutomationToggles } from '../types/bulletin';

export const INITIAL_SERVICES: ChurchService[] = [
  {
    id: 'service-1',
    title: '主餐崇拜　二零二六年八月二日',
    date: '二零二六年八月二日　上午 9 時 45 分',
    churchName: '茶果嶺浸信會',
    motto: '同心侍主，共建神家',
    sermonSeries: '知足感恩的心',
    sermonTitle: '知足感恩的心',
    scripture: '出埃及記 20:17、申命記 5:21',
    preacher: '葉秀嫻傳道',
    status: 'draft',
    items: [
      { id: '1', type: 'prelude', label: '安靜', detail: '會眾' },
      { id: '2', type: 'call', label: '宣召', detail: '詩篇 107:1、腓立比書 4:5-7 — 譚鈞平弟兄' },
      { id: '3', type: 'prayer', label: '祈禱', detail: '主席' },
      { id: '4', type: 'hymn', label: '讚美', detail: '歡欣、真神羔羊、要記念我 — 李劉美珊姊妹', hymnNumber: '306、524' },
      { id: '5', type: 'offertory', label: '奉獻祈禱', detail: '黎陸潤卿姊妹' },
      { id: '6', type: 'custom', label: '主餐', detail: '葉秀嫻傳道' },
      { id: '7', type: 'custom', label: '襄禮', detail: '林遠宏執事、蔡月保執事、陳玉娟執事' },
      { id: '8', type: 'hymn', label: '回應詩歌', detail: '除祢以外 — 眾坐' },
      { id: '9', type: 'hymn', label: '回應詩歌', detail: '祢的恩典 — 領詩' },
      { id: '10', type: 'custom', label: '家事分享', detail: '陳玉娟執事' },
      { id: '11', type: 'prayer', label: '牧禱', detail: '葉秀嫻傳道' },
      { id: '12', type: 'benediction', label: '祝禱', detail: '葉秀嫻傳道' },
      { id: '13', type: 'custom', label: '殿樂', detail: '會眾' },
      { id: '14', type: 'custom', label: '彼此祝福', detail: '主賜福你 — 會眾' },
    ],
    announcements: [
      { id: 'a1', text: '茶浸 Y2K 8 月份聚會預告：8 月 8 日（六）下午 2 時於教會舉行，歡迎中學生參加，並與 Peter、祉康傳道聯絡查詢。' },
      { id: 'a2', text: '茶堂「共享空間」逢禮拜二至禮拜五上午 10 時半至下午 4 時開放，歡迎街坊、鄰舍到訪，彼此認識，保持聯絡。' },
      { id: 'a3', text: '2026 年執事選舉現已開始進行，提名將於本主日截止，請各會友把握機會提名，同心侍主、共建神家。' },
      { id: 'a4', text: '青少年暑期活動：機械人及 3D 打印工作坊，8 月 18 日至 20 日下午 3 時至 5 時於觀塘堂舉行，歡迎升小五至升中六學生報名。' },
      { id: 'a5', text: '讀經獎勵計劃：歡迎透過 https://getinbible.vercel.app/ 或 QR code 進入應用程式，深入了解神的話語。' },
      { id: 'a6', text: '同工休假：葉傳道 8 月 11 日至 29 日、潤生傳道 8 月 12 日至 29 日放年假，敬請留意。' },
      { id: 'a7', text: '本會現正聘請幹事及傳道，有意申請者請聯絡葉秀嫻傳道或林遠宏執事，並請弟兄姊妹繼續禱告記念。' },
    ],

    hymnLyrics: [
      {
        id: 'hl1',
        title: '歡欣',
        meta: '曲：Henry Smith；詞：凌東成　迎欣出版社，版權所有。',
        body: `歡欣，心裡感謝神；歌唱，歸於聖父；
讚頌，祢賜下慈愛獨生的愛子。

今天，心中剛強無懼怕，主的豐盛滿一生，
皆因主手曾為我顯深恩。讚美！`,
      },
      {
        id: 'hl2',
        title: '真神羔羊',
        meta: '曲及詞：Twila Paris；陳天心譯　以琳書房，版權所有。',
        body: `上帝兒子聖潔無瑕，竟被差遣離天座位，
踏上塵土罪惡世界，甘願成為神的羔羊。

神的愛子被釘十架，受盡凌辱，遭人厭棄，
謙卑君王頭戴荊冠，成為犧牲，真神羔羊。

前我失喪，毫無盼望，蒙祢救贖，近祢身旁，
用杖與竿領我一生，我今成為主的小羊。

【副歌】
真神羔羊，寶貴羔羊，我深愛慕聖潔羔羊，
求祢寶血來洗淨我，耶穌基督真神羔羊（我今成為主的小羊）。`,
      },
      {
        id: 'hl3',
        title: '要記念我',
        meta: '曲：Buryl Red；詞：Ragan Courtney；湯茗雅譯　浸信會出版社（國際）有限公司，版權所有。',
        body: `1. 為要記念著我，領這餅。為要記念著我，喝這杯。
   為要記念著我，祈求父神讓祂早日成就。

2. 為要記念著我，醫疾病。為要記念著我，救貧餓。
   為要記念著我，打開家門讓你弟兄進來，請進來。
   吃，使心靈得安慰；喝，為要記念我。
   這是我的身體和寶血為你而捨，為你捨。
   為要記念著我，求真理，為要記念著我，要相愛。
   為要記念著我，不看世界，省察內心，
   是否有主同在？為要記念我如此行。`,
      },
      {
        id: 'hl4',
        title: '除祢以外（主餐回應詩）',
        meta: '曲：林良真；詞：經文摘編　讚美之泉音樂事工，版權所有。',
        body: `除祢以外　在天上我還能有誰
除祢以外　在地上我別無眷戀
除祢以外　有誰能擦乾我眼淚
除祢以外　有誰能帶給我安慰
雖然我的肉體和我的心腸
漸漸地衰退
但是神是我心裡的力量
是我的福份直到永遠`,
      },
      {
        id: 'hl5',
        title: '祢的恩典（回應詩歌）',
        meta: '曲、詞：方家明　全華音樂公司，版權所有。',
        body: `祢的恩典每天夠我用，縱有困難也不會逃避，
有祢與我一起，我還懼怕甚麼，賜我勇氣，去改變自己。

【副歌】
啊！耶穌，耶穌，耶穌，奉獻一生皆因最愛是祢，
為了祢我願將一切拋棄，耶穌為要得著祢。
我已決定我一生最愛是祢。`,
      },
      {
        id: 'hl6',
        title: '主賜福你（彼此祝福詩歌）',
        meta: '曲：吳秉堅；詞：林少強、鄭楚萍　香港基督徒音樂事工協會（ACM），版權所有。',
        body: `1. 求主恩賜福你，求賜信心不致動搖，
   無論晴或雨時刻保守你，
   使你在今天嚐盡主恩熱愛。

2. 神恩豐富供應，靈內富足心裡欣喜，
   幻變難避免求主祝福你，
   使你在這刻嚐盡主恩大愛。`,
      },
    ],

    worshipNotes: [
      {
        id: 'wn1',
        title: '宣召啟應文',
        meta: '詩篇 107:1、腓立比書 4:5-7',
        body: `啟：你們要稱謝耶和華，因祂本為善，
應：祂的慈愛永遠長存。

啟：當叫眾人知道你們謙讓的心。
應：主已經近了。

啟：應當一無掛慮，只要凡事藉著禱告、祈求、和感謝，
應：將你們所要的告訴神。

啟：神所賜出人意外的平安，
應：必在基督耶穌裏，
齊：保守你們的心懷意念。`,
      },
      {
        id: 'wn2',
        title: '信息經文：出埃及記 20:17',
        body: '「不可貪戀人的房屋；也不可貪戀人的妻子、僕婢、牛驢，並他一切所有的。」',
      },
      {
        id: 'wn3',
        title: '信息經文：申命記 5:21',
        body: '「不可貪戀人的妻子；也不可貪圖人的房屋、田地、僕婢、牛、驢，並他一切所有的。」',
      },
      {
        id: 'wn4',
        title: '反思問題',
        body: '應該要怎樣抗拒「貪戀、貪圖」的心？',
      },
      {
        id: 'wn5',
        title: '八月份金句：以賽亞書 40:6b-8',
        body: `6b 凡有血氣的盡都如草；
　　他的美容都像野地的花。

7 草必枯乾，花必凋殘，
　因為耶和華的氣吹在其上；
　百姓誠然是草。

8 草必枯乾，花必凋殘，
　惟有我們神的話必永遠立定。`,
      },
    ],

    ministryUpdates: [
      {
        id: 'mu1',
        title: '1. 茶浸 Y2K 8 月份聚會預告',
        body: `日期：2026 年 8 月 8 日（六）
時間：下午 2 時
地點：教會
對象：所有中學生
內容：生日週
查詢：歡迎與 Peter、祉康傳道聯絡

其他日程：
8 月 15 日（六）　烹飪週
8 月 22 日（六）　行山（暫定）
8 月 29 日（六）　分享週：暑假回顧`,
      },
      {
        id: 'mu2',
        title: '2. 茶堂「共享空間」',
        body: `日期：逢禮拜二至禮拜五（假期暫停）
時間：由上午 10 時半至下午 4 時
活動：
　8 月 6 日、20 日（四）下午 2 時至 3 時　量血壓及血糖
　8 月 18 日（二）下午 1 時至 3 時　「桂花糕製作」
內容：開放教會，歡迎街坊、鄰舍到訪，大家打個招呼，彼此認識，保持聯絡。

歡迎弟兄姊妹到茶堂支持，並請為這服事獻上禱告。`,
      },
      {
        id: 'mu3',
        title: '3. 2026 年執事選舉',
        body: `現已開始進行，合資格被提名執事名單如下：

李嘉雋、林妙芳、林美玲、林國良、林遠宏、邱俊樺、馬子飛、
高卓平、張一偉、張也健、張加恩、張澍佳、梁大衛、莫錦文、
郭永健、陳以洛、陳巧芬、陳玉娟、陳美娟、揭連梅、馮恩怡、
馮恩誠、楊桂蓮、葉玉嫦、葉國良、葉皚靈、鄔瑜靜、熊天佑、
劉家安、劉康盈、劉寶儀、歐浩恩、歐紹楚、蔡月保、蔡錦源、
蔡啟康、鄧惠權、黎麗明、鍾鳳玉、簡慧萍、藍志揚、譚鈞平

執事候選人提名將於今主日截止，請各會友盡量把握機會提名。
願神興起僕人回應呼召，與眾肢體「同心侍主、共建神家」。`,
      },
      {
        id: 'mu4',
        title: '4. 青少年暑期活動',
        body: `內容：暑期機械人及 3D 打印工作坊
日期：8 月 18 日（二）至 20 日（四）
時間：下午 3 時至 5 時
地點：觀塘堂
導師：熊天佑弟兄
對象：升小五至升中六學生
報名及查詢：請與祉康傳道聯絡`,
      },
      {
        id: 'mu5',
        title: '5. 8 月份聚會預告',
        body: `8 月 9 日（日）下午 2 時半　事委會　同工、事委
8 月 16 日（日）上午 11 時半至 12 時半　主日學合班　新教崇拜中的聖言　羅潔盈博士　弟兄姊妹
8 月 26 日（三）　宣教祈禱會　藍志揚傳道　弟兄姊妹
8 月 30 日（日）下午 12 時 45 分　月會　所有會友
8 月 30 日（日）下午 2 時半　執事會　執事及教牧`,
      },
      {
        id: 'mu6',
        title: '6. 讀經獎勵計劃',
        body: '弟兄姊妹可透過網址 https://getinbible.vercel.app/ 或 QR code 進入「讀經獎勵計劃協助應用程式」，願此應用程式能幫助弟兄姊妹深入了解神的話語，靈命得著滋養。',
      },
      {
        id: 'mu7',
        title: '7. 同工休假',
        body: `葉傳道於 8 月 11 日至 29 日放年假。
潤生傳道於 8 月 12 日至 29 日放年假。`,
      },
      {
        id: 'mu8',
        title: '8. 聘請幹事及傳道',
        body: `幹事：中學畢業，處理教會行政工作，支援事工，熟識電腦操作，需週六日當值。
傳道：神學畢業，帶領教會牧養服事，團隊事奉。

有意申請者，請聯絡葉秀嫻傳道或林遠宏執事。並請弟兄姊妹繼續禱告記念，求神預備適合人選，一齊服事。`,
      },
    ],

    otherNotices: [
      {
        id: 'on1',
        title: '1. 維修基金奉獻',
        body: `本會逢每月第二個主日特別為維修基金奉獻。
請弟兄姊妹預先準備，到時將奉獻放進奉獻箱。`,
      },
      {
        id: 'on2',
        title: '2. 第 98 屆港九培靈研經會',
        meta: '大會主題：翻轉生命更新侍主　2026 年 8 月 1 日至 10 日　九龍城浸信會',
        body: `研經會　上午 9 時　在流散中重塑盼望　謝挺博士
講道會　上午 11 時　平凡人生，非凡呼召　黃國維牧師
奮興會　晚上 7 時　徹底翻身的門徒 – 生命轉化的十個記號　陳傳華牧師

歡迎赴會，詳情請參閱已張貼報告板之海報。`,
      },
      {
        id: 'on3',
        title: '3. 惡劣天氣聚會指引',
        body: `三號風球：崇拜、主日學及成長小組、青少年團契照常；長者／兒童團契取消。

八號風球或以上：
　聚會開始前兩小時內：崇拜、主日學、團契等一律取消。
　聚會期間生效：提早／立即終止，讓會眾盡快離開。

紅雨：
　聚會開始前兩小時內：崇拜、主日學、青少年團契照常；長者／兒童團契取消。
　聚會期間生效：全部照常，長者／兒童團契建議在安全情況下離開。

黑雨：
　聚會開始前兩小時內：崇拜、主日學、團契等一律取消。
　聚會期間生效：崇拜照常；主日學及各團契照常聚會，建議在安全情況下離開。

颱風信號／紅雨／黑雨警告在聚會開始前 2 小時除下，聚會將如常舉行。
註：如有任何意見，請向牧師或執事聯絡。`,
      },
    ],

    weeklyPrayers: [
      {
        id: 'wp1',
        title: '1.',
        body: '為印尼訪宣隊禱告。感謝神保守他們能適應當地的天氣，起居飲食，身心靈健壯。求神使他們有美好的服侍，與百德浸信會弟兄姊妹彼此配搭，一同教導英文、探訪家庭、教會聚會、文化體驗。求神使用訪宣隊一切的預備，祝福當地的孩子、家庭、居民。願教會弟兄姊妹在禱告中積極支持，一同實踐主的大使命，拓展神的國度。',
      },
      {
        id: 'wp2',
        title: '2.',
        body: '為已開始放暑假的學生禱告。求神保守他們能善用暑假，好好安排時間作息、活動。盼望他們能把握機會更多參加教會聚會，認識福音。',
      },
      {
        id: 'wp3',
        title: '3.',
        body: '為青少年牧區禱告。求神幫助各中學生都用心學習、分享主愛，建立群體美好的關係。求神讓大專生樂意參加每月的相聚，亦求神帶領他們畢業後的前途。求神保守職青小組能積極參加查經和分享，彼此支持，互相代禱。為小學生及家長禱告，求神保守他們能常到教會參加聚會和活動，早日相信耶穌。',
      },
      {
        id: 'wp4',
        title: '4.',
        body: '為茶堂「共享空間」在茶果嶺區的服事禱告。求神大大使用，讓我們透過不同的活動，關心、接觸和認識更多街坊及家庭，了解他們的需要，向他們分享福音。也為茶果嶺區未來的發展禱告。求神賜我們聰明智慧去面對茶果嶺區的轉變，教導我們知道如何關心唐樓的居民和街坊，使我們成為社區的祝福。',
      },
      {
        id: 'wp5',
        title: '5.',
        body: '為香港人的生活禱告。求神憐憫眷顧港人的日常生活，在面對現實社會中各種的壓力，能找到出路。願港人早日認識福音，接受救恩，享受從主而來的恩典和保障。',
      },
      {
        id: 'wp6',
        title: '6.',
        body: '為動盪不安、面對天災人禍的世界禱告。求神憐憫拯救受地震、暴雨影響的人民，讓他們早日得到援助，重建家園。亦求神親自掌管，止息戰爭。讓世人能經歷神的愛和赦免，得著救恩。',
      },
      {
        id: 'wp7',
        title: '7.',
        body: '為患病的肢體及親友禱告：謝美英（繼續療程）、葉東娥（打針順利）、何耀明（少少咳嗽）、葉愛寬（院舍生活）、尤琼仙（飲食有進步）、吳金（藥物舒緩）、朱瑞農（有進展）。求神親自醫治他們，保護他們。亦為教會各弟兄姊妹身體健康禱告。求神恩待，讓大家好好保重，遇身體不適的早日能得到醫治、康復，有健康身心靈親近神、敬拜神。',
      },
      {
        id: 'wp8',
        title: '8.',
        body: '為下主日崇拜講員禱告：陳潤生傳道',
      },
    ],

    serviceRoster: [
      { id: 'r1', section: '主日崇拜事奉芳名表', role: '主席', thisWeek: '譚鈞平弟兄', nextWeek: '蔡錦源弟兄' },
      { id: 'r2', section: '主日崇拜事奉芳名表', role: '領詩', thisWeek: '李劉美珊姊妹', nextWeek: '劉家安弟兄' },
      { id: 'r3', section: '主日崇拜事奉芳名表', role: '司琴', thisWeek: '蘇馮恩怡姊妹', nextWeek: '梁湘盈姊妹' },
      { id: 'r4', section: '主日崇拜事奉芳名表', role: '主持主餐', thisWeek: '葉秀嫻傳道', nextWeek: '--' },
      { id: 'r5', section: '主日崇拜事奉芳名表', role: '襄禮', thisWeek: '林遠宏執事、蔡月保執事、陳玉娟執事', nextWeek: '--' },
      { id: 'r6', section: '主日崇拜事奉芳名表', role: '預備主餐', thisWeek: '林遠宏執事', nextWeek: '--' },
      { id: 'r7', section: '主日崇拜事奉芳名表', role: '信息', thisWeek: '葉秀嫻傳道', nextWeek: '陳潤生傳道' },
      { id: 'r8', section: '主日崇拜事奉芳名表', role: '司事', thisWeek: '黎陸潤卿姊妹', nextWeek: '黃劉慧儀姊妹' },
      { id: 'r9', section: '主日崇拜事奉芳名表', role: '迎賓', thisWeek: '陳林妙芳師母、蔡鍾鳳玉姊妹', nextWeek: '關敬芬姊妹、李楊桂英姊妹' },
      { id: 'r10', section: '主日崇拜事奉芳名表', role: '影音', thisWeek: '許嘉麒弟兄、馬子飛弟兄', nextWeek: '馬子飛弟兄、葉國良弟兄' },
      { id: 'r11', section: '主日崇拜事奉芳名表', role: '總務', thisWeek: '但以理組', nextWeek: '呂底亞組' },
      { id: 'r12', section: '主日崇拜事奉芳名表', role: '照顧兒童', thisWeek: '王張加恩姊妹', nextWeek: '張陳巧芬姊妹' },
      { id: 'r13', section: '主日崇拜事奉芳名表', role: '鮮花奉獻', thisWeek: '吳淑清姊妹', nextWeek: '許晉珊姊妹' },
      { id: 'r14', section: '主日崇拜事奉芳名表', role: '點收奉獻', thisWeek: '吳慧儀姊妹、林遠宏執事', nextWeek: '張陳美娟姊妹、張綺芬幹事' },

      { id: 'r15', section: '觀塘堂主日兒童崇拜事奉芳名表', role: '主席及領詩', thisWeek: '張陳巧芬姊妹（美食廚房 1）', nextWeek: '歐浩恩姊妹（動畫欣賞）' },
      { id: 'r16', section: '觀塘堂主日兒童崇拜事奉芳名表', role: '經文分享', thisWeek: '張陳巧芬姊妹', nextWeek: '歐浩恩姊妹' },

      { id: 'r17', section: '茶果嶺堂禮拜六兒童小組事奉芳名表（1/8）', role: '負責／領詩', thisWeek: '張陳巧芬姊妹／陳揭連梅姊妹', nextWeek: '--' },
      { id: 'r18', section: '茶果嶺堂禮拜六兒童小組事奉芳名表（1/8）', role: '協助／茶點', thisWeek: '陳小艷姊妹／陳揭連梅姊妹', nextWeek: '--' },
    ],

    attendance: [
      { id: 'at1', meeting: '主日崇拜', count: '--' },
      { id: 'at2', meeting: '網上崇拜（實時點擊數目）', count: '66 人' },
      { id: 'at3', meeting: '＊兒童主日崇拜', count: '--' },
      { id: 'at4', meeting: '＊主日學', count: '--' },
      { id: 'at5', meeting: '＊福音班', count: '--' },
      { id: 'at6', meeting: '＊少年主日學', count: '--' },
      { id: 'at7', meeting: '主日英文班', count: '--' },
      { id: 'at8', meeting: '教會祈禱會', count: '10 人' },
      { id: 'at9', meeting: '約翰團', count: '14 人' },
      { id: 'at10', meeting: '週三正形健膝操', count: '--' },
      { id: 'at11', meeting: '祈禱會', count: '17 人' },
      { id: 'at12', meeting: '媽咪小組', count: '--' },
      { id: 'at13', meeting: '兒童小組', count: '--' },
      { id: 'at14', meeting: '拉撒路組', count: '--' },
      { id: 'at15', meeting: '提摩太組', count: '--' },
      { id: 'at16', meeting: 'CB Y2K', count: '8 人' },
    ],
    attendanceNote: '＊ 因 8 號風球聚會取消',
  },
  {
    id: 'service-2',
    title: '主日崇拜　二零二六年八月九日',
    date: '二零二六年八月九日　上午 9 時 45 分',
    churchName: '茶果嶺浸信會',
    motto: '同心侍主，共建神家',
    sermonSeries: '同心侍主',
    sermonTitle: '同心侍主',
    scripture: '羅馬書 12:1-2',
    preacher: '陳潤生傳道',
    status: 'pastor_review',
    items: [
      { id: '201', type: 'prelude', label: '序樂', detail: '梁湘盈姊妹' },
      { id: '202', type: 'call', label: '宣召', detail: '詩篇 100:1-5 — 蔡錦源弟兄' },
      { id: '203', type: 'prayer', label: '祈禱', detail: '主席' },
      { id: '204', type: 'hymn', label: '讚美詩歌', detail: '你真偉大', hymnNumber: '1' },
      { id: '205', type: 'sermon', label: '信息', detail: '同心侍主', leader: '陳潤生傳道' },
      { id: '206', type: 'offertory', label: '奉獻', detail: '陳潤生傳道' },
      { id: '207', type: 'benediction', label: '祝禱', detail: '陳潤生傳道' },
    ],
    announcements: [
      { id: 'a201', text: '主日學合班：8 月 16 日上午 11 時半至 12 時半，羅潔盈博士主講「新教崇拜中的聖言」，歡迎弟兄姊妹參加。' },
      { id: 'a202', text: '事委會將於今日下午 2 時半舉行，敬請同工及事委預留時間出席。' },
    ],
    hymnLyrics: [],
    worshipNotes: [],
    ministryUpdates: [],
    otherNotices: [],
    weeklyPrayers: [],
    serviceRoster: [],
    attendance: [],
  },
  {
    id: 'service-3',
    title: '主日崇拜　二零二六年七月廿六日',
    date: '二零二六年七月廿六日　上午 9 時 45 分',
    churchName: '茶果嶺浸信會',
    motto: '同心侍主，共建神家',
    sermonSeries: '宣教的心',
    sermonTitle: '宣教的心',
    scripture: '使徒行傳 1:8',
    preacher: '藍志揚傳道',
    status: 'finalized',
    items: [
      { id: '301', type: 'prelude', label: '序樂', detail: '司琴' },
      { id: '302', type: 'call', label: '宣召', detail: '詩篇 96:1-3' },
      { id: '303', type: 'hymn', label: '讚美詩歌', detail: '普天同慶', hymnNumber: '1' },
      { id: '304', type: 'prayer', label: '祈禱', detail: '主席' },
      { id: '305', type: 'sermon', label: '信息', detail: '宣教的心', leader: '藍志揚傳道' },
      { id: '306', type: 'offertory', label: '獻詩', detail: '詩班獻詩' },
      { id: '307', type: 'benediction', label: '祝福', detail: '藍志揚傳道' },
    ],
    announcements: [
      { id: 'a301', text: '宣教祈禱會：8 月 26 日（三）舉行，藍志揚傳道主領，歡迎弟兄姊妹一同代禱。' },
    ],
    hymnLyrics: [],
    worshipNotes: [],
    ministryUpdates: [],
    otherNotices: [],
    weeklyPrayers: [],
    serviceRoster: [],
    attendance: [],
  },
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  { id: 'v1', initials: '葉秀', name: '葉秀嫻傳道', role: '主任傳道', consecutiveWeeks: 4, available: true },
  { id: 'v2', initials: '林遠', name: '林遠宏執事', role: '執事（襄禮／總務）', consecutiveWeeks: 3, available: true },
  { id: 'v3', initials: '李劉', name: '李劉美珊姊妹', role: '領詩', consecutiveWeeks: 2, available: true },
  { id: 'v4', initials: '陳潤', name: '陳潤生傳道', role: '客席傳道', consecutiveWeeks: 1, available: true },
  { id: 'v5', initials: '蘇馮', name: '蘇馮恩怡姊妹', role: '司琴／影音', consecutiveWeeks: 1, available: true },
];

export const INITIAL_ALERTS: ValidationAlert[] = [
  {
    id: 'alt-1',
    type: 'warning',
    title: '事奉輪替提示',
    message: '林遠宏執事已連續 3 週擔任襄禮／總務事奉。',
    actionText: '調配事奉表',
    actionType: 'shuffle_roster',
  },
  {
    id: 'alt-2',
    type: 'info',
    title: '詩歌配對建議',
    message: '「真神羔羊」與本週信息主題「知足感恩的心」相符度達 88%。',
    actionText: '套用建議詩歌',
    actionType: 'update_hymn',
  },
];

export const INITIAL_RULES: ConfigurationRules = {
  sermonSeries: '知足感恩的心',
  hymnStyle: '禮儀傳統詩歌',
  conflictCheck: true,
  bufferMinutes: 15,
};

export const INITIAL_TOGGLES: AutomationToggles = {
  hymnSelection: true,
  volunteerRotation: true,
  conflictCheck: true,
  autoFormat: true,
};

export const HYMN_LIBRARY = [
  { number: '306', title: '歡欣', tags: ['感謝', '讚美', '榮耀'], style: '傳統' },
  { number: '524', title: '要記念我', tags: ['主餐', '紀念', '捨己'], style: '傳統' },
  { number: '401', title: '真神羔羊', tags: ['救贖', '羔羊', '敬拜'], style: '傳統' },
  { number: '402', title: '除祢以外', tags: ['主餐', '倚靠', '安慰'], style: '敬拜讚美' },
  { number: '403', title: '祢的恩典', tags: ['恩典', '奉獻', '跟隨'], style: '敬拜讚美' },
  { number: '404', title: '主賜福你', tags: ['祝福', '差遣', '團契'], style: '傳統' },
  { number: '109', title: '奇異恩典', tags: ['恩典', '救贖', '感恩'], style: '傳統' },
  { number: '1', title: '普天同慶', tags: ['讚美', '敬拜', '榮耀'], style: '禮儀' },
];
