export const languages = { en: 'EN', zh: '中文' } as const;
export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.custom': 'Custom orders',
    'nav.instagram': 'Instagram',

    'home.eyebrow': 'Handmade pottery · Malaysia',
    'home.lede':
      'Small batch pieces, thrown and painted by hand. No two come out quite the same — which is rather the point.',
    'home.cta.shop': 'See what’s available',
    'home.cta.custom': 'Ask about a custom piece',
    'home.latest': 'Latest pieces',
    'home.latest.sub': 'A few things from the current batch.',
    'home.viewAll': 'View everything',
    'home.story.title': 'Made to be used & loved',
    'home.story.body':
      'Every piece starts on the wheel or in the hand, then gets glazed and fired in small batches. They are meant for real mornings — coffee, toast, and the good kind of worn edge earned over years.',
    'home.story.link': 'More about the studio',

    'shop.title': 'Shop',
    'shop.lede':
      'Pieces are released in small batches. One-of-a-kind pieces are marked — once they are gone, they are gone.',
    'shop.empty': 'Nothing is listed right now. The next batch is on the way.',
    'shop.filter.all': 'All',
    'shop.filter.unique': 'One-of-a-kind',
    'shop.filter.batch': 'Made in batches',

    'piece.unique': 'One of a kind',
    'piece.batch': 'Made in batches',
    'piece.available': 'Available',
    'piece.sold': 'Sold',
    'piece.madeToOrder': 'Made to order',
    'piece.enquire': 'Enquire on WhatsApp',
    'piece.enquireIg': 'Ask on Instagram',
    'piece.enquireDm': 'Or send a DM on Instagram',
    'piece.soldNote':
      'This one has found a home. Similar pieces come up in most batches — ask and I’ll let you know.',
    'piece.askSimilar': 'Ask about something similar',
    'piece.details': 'Details',
    'piece.care': 'Care',
    'piece.dimensions': 'Size',
    'piece.back': 'Back to shop',
    'piece.related': 'You might also like',

    'about.title': 'About',

    'custom.title': 'Custom orders',
    'custom.lede':
      'I take on a small number of custom pieces — a mug with someone’s cat on it, a set for a wedding, a dish in a particular colour.',
    'custom.how': 'How it works',
    'custom.step1.t': 'Tell me the idea',
    'custom.step1.b':
      'Message me on WhatsApp or Instagram with roughly what you have in mind. Photos and references help a lot.',
    'custom.step2.t': 'We settle the details',
    'custom.step2.b':
      'Shape, size, colours, and how many. I’ll quote a price and a rough timeline before anything starts.',
    'custom.step3.t': 'Making and firing',
    'custom.step3.b':
      'Usually three to six weeks. Clay sets its own pace, and everything is fired twice.',
    'custom.step4.t': 'Payment and delivery',
    'custom.step4.b':
      'Payment is arranged directly for now — bank transfer or DuitNow. Posted anywhere in Malaysia, packed carefully.',
    'custom.cta': 'Start a conversation',

    'waitlist.title': 'Know when the next batch lands',
    'waitlist.body':
      'Batches are small and usually go quickly. Leave your email and you’ll hear before it goes up.',
    'waitlist.placeholder': 'your@email.com',
    'waitlist.button': 'Keep me posted',
    'waitlist.fallback':
      'The list isn’t open yet — follow along on Instagram and you’ll see the next batch first.',
    'waitlist.follow': 'Follow on Instagram',
    'waitlist.thanks': 'Lovely — you’re on the list.',

    'footer.madeIn': 'Handmade in Malaysia',
    'footer.rights': 'All rights reserved.',
    'footer.enquiries': 'Enquiries',

    'notfound.title': 'Nothing here',
    'notfound.body': 'This page doesn’t exist — or a piece has been taken down.',
    'notfound.cta': 'Go to the shop',
  },
  zh: {
    'nav.shop': '作品',
    'nav.about': '关于',
    'nav.custom': '订制',
    'nav.instagram': 'Instagram',

    'home.eyebrow': '手作陶艺 · 马来西亚',
    'home.lede': '小批量制作,手拉坯、手绘。每一件都不一样 —— 这正是手作的意思。',
    'home.cta.shop': '看看现有作品',
    'home.cta.custom': '询问订制',
    'home.latest': '最新作品',
    'home.latest.sub': '这一批的其中几件。',
    'home.viewAll': '查看全部',
    'home.story.title': '为日常而做,值得被爱',
    'home.story.body':
      '每一件都从拉坯或手捏开始,上釉后小批量烧制。它们是为真实的早晨而做的 —— 咖啡、吐司,还有多年使用后那种好看的磨损痕迹。',
    'home.story.link': '了解工作室',

    'shop.title': '作品',
    'shop.lede': '作品以小批量释出。独一无二的作品会另外标示 —— 售出后就没有了。',
    'shop.empty': '目前没有上架的作品,下一批正在路上。',
    'shop.filter.all': '全部',
    'shop.filter.unique': '独一无二',
    'shop.filter.batch': '小批量',

    'piece.unique': '独一无二',
    'piece.batch': '小批量制作',
    'piece.available': '现货',
    'piece.sold': '已售出',
    'piece.madeToOrder': '接受订制',
    'piece.enquire': 'WhatsApp 询问',
    'piece.enquireIg': 'Instagram 询问',
    'piece.enquireDm': '或在 Instagram 私讯',
    'piece.soldNote': '这件已经有新家了。类似的作品每一批大多都会有,想要的话跟我说一声。',
    'piece.askSimilar': '询问类似作品',
    'piece.details': '详情',
    'piece.care': '保养',
    'piece.dimensions': '尺寸',
    'piece.back': '返回作品',
    'piece.related': '也许你也会喜欢',

    'about.title': '关于',

    'custom.title': '订制',
    'custom.lede': '我接少量订制 —— 印着你家猫的杯子、婚礼的一整套、特定颜色的碟子。',
    'custom.how': '流程',
    'custom.step1.t': '说说你的想法',
    'custom.step1.b': '用 WhatsApp 或 Instagram 跟我说大概的构想。有照片或参考图会很有帮助。',
    'custom.step2.t': '确定细节',
    'custom.step2.b': '形状、尺寸、颜色、数量。开始之前我会先报价,也会说明大概需要多久。',
    'custom.step3.t': '制作与烧制',
    'custom.step3.b': '通常三到六个星期。陶土有自己的节奏,每件都要烧两次。',
    'custom.step4.t': '付款与寄送',
    'custom.step4.b': '目前直接安排付款 —— 银行转账或 DuitNow。马来西亚全境寄送,包装会很仔细。',
    'custom.cta': '开始聊聊',

    'waitlist.title': '下一批上架时通知我',
    'waitlist.body': '每一批数量都不多,通常很快就没了。留下电邮,上架前会先通知你。',
    'waitlist.placeholder': 'your@email.com',
    'waitlist.button': '通知我',
    'waitlist.fallback': '通知名单还没开放 —— 先在 Instagram 上追踪,新的一批你会最先看到。',
    'waitlist.follow': '前往 Instagram',
    'waitlist.thanks': '好了 —— 你已经在名单上。',

    'footer.madeIn': '马来西亚手作',
    'footer.rights': '版权所有。',
    'footer.enquiries': '联络',

    'notfound.title': '这里没有东西',
    'notfound.body': '这个页面不存在 —— 或者作品已经下架了。',
    'notfound.cta': '前往作品页',
  },
} as const;
