/**
 * Inspect.mx product/category/video/build data.
 *
 * This is the single source of truth for everything rendered on the site.
 * No product info is hard-coded into the HTML — main.js reads these arrays
 * and builds the DOM. Later this can be swapped for a fetch() call to a
 * PHP / Firebase / REST API endpoint that returns the same shape.
 *
 * >>> REPLACE_AFFILIATE_URL: swap every "affiliateUrl" below with your real
 *     TikTok Shop affiliate link for that product.
 * >>> REPLACE_IMAGE: swap "image" paths with real product photos once you
 *     have them (keep the same folder structure, e.g. images/products/...).
 */

const CATEGORIES = [
  { id: "engine", name: "Engine", icon: "🔧", description: "Performance & engine parts" },
  { id: "controls", name: "Controls", icon: "🎛️", description: "Throttles, levers & grips" },
  { id: "brakes", name: "Brakes", icon: "🛑", description: "Pads, discs & brake lines" },
  { id: "suspension", name: "Suspension", icon: "🏍️", description: "Shocks & forks" },
  { id: "electrical", name: "Electrical", icon: "💡", description: "Lighting & wiring" },
  { id: "accessories", name: "Motorcycle Accessories", icon: "🪖", description: "Everyday upgrades" },
  { id: "trail", name: "Trail Gear", icon: "🌄", description: "Off-road & adventure gear" },
  { id: "maintenance", name: "Maintenance", icon: "🧰", description: "Tools & upkeep" },
];

const PRODUCTS = [
  {
    id: "quick-throttle",
    name: "Quick Throttle",
    price: 399,
    category: "controls",
    image: "images/products/quick-throttle.svg",
    gallery: [
      "images/products/quick-throttle.svg",
      "images/products/handlebar.svg",
      "images/products/grips.svg",
    ],
    description: "Quick throttle for motorcycle applications. Shortens throttle throw for faster, sharper response.",
    personallyUsed: true,
    rating: 4.7,
    reviewCount: 128,
    reasons: [
      "Affordable",
      "Easy to install",
      "Suitable for daily/trail use",
      "Good value for the price",
    ],
    experience:
      "I've personally used this product on my XTZ and this is how it performs — noticeably quicker throttle response, especially useful on trail sections where you need snappy acceleration.",
    video: {
      platform: "YouTube",
      title: "Quick Throttle Test on My XTZ125",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "images/videos/thumb1.svg",
    },
    specs: {
      Brand: "Generic Performance",
      Material: "CNC Aluminum",
      Compatibility: "Universal 22mm handlebar",
      Size: "Standard",
      Type: "Quick-action throttle",
    },
    affiliateUrl: "https://shop.tiktok.com/ph/pdp/1733198870124266852?_d=ejadfm8mfe40a7&_svg=1&chain_key=%7B%22t%22%3A1%2C%22k%22%3A%22000000000000000007688239895940925192%22%2C%22sc%22%3A%22messenger%22%7D&checksum=823b3cbdd751f6b6e1e71d3bafc496362ebb259618bccf059c11cad18277aa65&encode_params=MIIBUwQM7h24k62qMPkGNp7RBIIBL1FUucbTJRZeyUA5cD5-yY9qKkEv6IA1g0lbfo4AfavYhw9mVC5k13y6W4pc1YcxDHWbhNpgOylA3aeWJqiPSrUC4TxpK2INCGd9LDgQt1kV3pnKuEVBCmnzUtwv1RVRh4n6vTld2HWrTdN9yEaqjQ2t3wOoZLDqnX4ovPhgbT_QeoCzHl0MUrXcFRycH1qYNiWs5WyoF_l4NM8PPTbQKaK_pEEASTxEOMsTLJbnvSPIwZflmizgeJ7TGkEjU2JMaVD5TlFVwAv-vm4KPdHGiGqd9c6RPxjA-2Gmp19jNJdPSAEgV28ZbETPYA4n1fH8fmDKpk4_Sqz16vVwtZohuqXBZV_IUJTO5nzww_DyeSH_MeZ0TiJHcS7FgNQpi9pLixovUzXybodCvMGb6efO0wQQxC73mNq3Jb8mClcxgUrT9Q%3D%3D&og_info=%7B%22title%22%3A%22Quick+Throttle+Grip+V2+-+Full+Alloy+CNC+Construction+for+Faster+Response+%7C+Universal+for+7%5C%2F8%5C%22+%2822mm%29+Handlebars+w%5C%2F+110cm+Cable%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F33ef56eb32f642809aaecdef8ed99c51~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&panel_source_v2=share_panel&sec_user_id=MS4wLjABAAAAKTujjUIRNZWMFg-ChYXO-ak3a-4o1q8aTnNMJQuo0099a2PyqilHrMysC_tUJArB&share_app_id=1180&share_enter_from=&share_link_id=524191C5-CC94-49A6-AA9D-F16A7E0AFE20&share_region=PH&social_share_type=15&timestamp=1790057852&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227482982344271349253%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B2%5D%7D&tt_from=messenger&u_code=DMDKBCFKIM74CF&ug_btm=b2878%2Cb6661&unique_id=yahiko851&user_id=7047830306321974274&utm_campaign=client_share&utm_medium=ios&utm_source=messenger",
  },
  {
    id: "handlebar",
    name: "Motorcycle Handlebar",
    price: 850,
    category: "controls",
    image: "images/products/handlebar.svg",
    gallery: ["images/products/handlebar.svg", "images/products/grips.svg"],
    description: "Wide trail-style handlebar for improved control and a more aggressive riding stance.",
    personallyUsed: true,
    rating: 4.6,
    reviewCount: 64,
    reasons: [
      "Improves control on trail sections",
      "Comfortable upright riding position",
      "Durable steel construction",
      "Fits most naked/trail bikes",
    ],
    experience:
      "Swapped this onto my XTZ125 for a more upright trail stance — better leverage standing up on rough terrain.",
    video: {
      platform: "TikTok",
      title: "Handlebar Setup",
      embedUrl: "https://www.tiktok.com/embed/placeholder",
      thumbnail: "images/videos/thumb2.svg",
    },
    specs: {
      Brand: "Generic Trail",
      Material: "High-tensile steel",
      Compatibility: "22mm clamp, most standard/trail bikes",
      Size: "780mm width",
      Type: "Trail handlebar",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-HANDLEBAR",
  },
  {
    id: "side-mirror",
    name: "Side Mirror",
    price: 250,
    category: "accessories",
    image: "images/products/side-mirror.svg",
    gallery: ["images/products/side-mirror.svg"],
    description: "Compact rectangular side mirrors with wide-angle glass for better rear visibility.",
    personallyUsed: false,
    rating: 4.3,
    reviewCount: 41,
    reasons: [
      "Wide viewing angle",
      "Compact, low-profile design",
      "Affordable pair pricing",
      "Simple bolt-on install",
    ],
    experience: null,
    video: null,
    specs: {
      Brand: "Generic",
      Material: "ABS housing, glass lens",
      Compatibility: "8mm/10mm universal thread",
      Size: "Compact",
      Type: "Rectangular side mirror (pair)",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-SIDE-MIRROR",
  },
  {
    id: "oring-chain",
    name: "O-Ring Chain",
    price: 1200,
    category: "engine",
    image: "images/products/oring-chain.svg",
    gallery: ["images/products/oring-chain.svg"],
    description: "Heavy-duty O-ring drive chain built for longer life and smoother power delivery.",
    personallyUsed: true,
    rating: 4.8,
    reviewCount: 96,
    reasons: [
      "Longer lifespan than standard chains",
      "Better sealing keeps lubrication in",
      "Handles trail abuse well",
      "Noticeably smoother power delivery",
    ],
    experience:
      "Running this O-ring chain on my XTZ for trail rides — holds up well against mud and dust compared to my old chain.",
    video: {
      platform: "Facebook",
      title: "Trail Bike Setup",
      embedUrl: "https://www.facebook.com/plugins/video.php?href=placeholder",
      thumbnail: "images/videos/thumb3.svg",
    },
    specs: {
      Brand: "Generic Heavy Duty",
      Material: "Alloy steel, O-ring sealed",
      Compatibility: "428 / 520 pitch (check your bike)",
      Size: "120 links",
      Type: "O-ring drive chain",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-ORING-CHAIN",
  },
  {
    id: "led-headlight",
    name: "LED Headlight",
    price: 599,
    category: "electrical",
    image: "images/products/led-headlight.svg",
    gallery: ["images/products/led-headlight.svg"],
    description: "Bright LED headlight upgrade for better night visibility on and off-road.",
    personallyUsed: false,
    rating: 4.5,
    reviewCount: 52,
    reasons: [
      "Significantly brighter than stock halogen",
      "Lower power draw",
      "Plug-and-play on most bikes",
      "Great for night trail riding",
    ],
    experience: null,
    video: null,
    specs: {
      Brand: "Generic LED",
      Material: "Aluminum housing, polycarbonate lens",
      Compatibility: "H4 / universal socket",
      Size: "Standard round housing",
      Type: "LED headlight bulb/housing",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-LED-HEADLIGHT",
  },
  {
    id: "grips",
    name: "Grips",
    price: 299,
    category: "controls",
    image: "images/products/grips.svg",
    gallery: ["images/products/grips.svg"],
    description: "Textured rubber grips with reinforced end caps for a secure, comfortable hold.",
    personallyUsed: true,
    rating: 4.6,
    reviewCount: 77,
    reasons: [
      "Better grip in wet/muddy conditions",
      "Reduces hand fatigue on long rides",
      "Easy DIY install",
      "Affordable",
    ],
    experience: "Been running these grips for months on my XTZ — solid feel even with gloves on.",
    video: {
      platform: "TikTok",
      title: "Budget Motorcycle Mods",
      embedUrl: "https://www.tiktok.com/embed/placeholder2",
      thumbnail: "images/videos/thumb4.svg",
    },
    specs: {
      Brand: "Generic",
      Material: "Rubber compound",
      Compatibility: "22mm handlebar (7/8\")",
      Size: "120mm length",
      Type: "Handlebar grips (pair)",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-GRIPS",
  },
  {
    id: "brake-pads",
    name: "Brake Pads",
    price: 350,
    category: "brakes",
    image: "images/products/brake-pads.svg",
    gallery: ["images/products/brake-pads.svg"],
    description: "Sintered brake pads for consistent stopping power in wet and dry conditions.",
    personallyUsed: true,
    rating: 4.7,
    reviewCount: 110,
    reasons: [
      "Strong stopping power",
      "Performs well in wet trail conditions",
      "Reasonable lifespan for the price",
      "Direct bolt-on replacement",
    ],
    experience: "Replaced my worn stock pads with these — braking feels sharper, especially on wet trails.",
    video: null,
    specs: {
      Brand: "Generic Sintered",
      Material: "Sintered metal compound",
      Compatibility: "Check your caliper model before ordering",
      Size: "Standard",
      Type: "Front/rear brake pad set",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-BRAKE-PADS",
  },
  {
    id: "foot-pegs",
    name: "Trail Foot Pegs",
    price: 480,
    category: "trail",
    image: "images/products/foot-pegs.svg",
    gallery: ["images/products/foot-pegs.svg"],
    description: "Wide, serrated foot pegs built for standing control on rough trail terrain.",
    personallyUsed: false,
    rating: 4.4,
    reviewCount: 33,
    reasons: [
      "Wider platform for standing control",
      "Serrated surface grips boots even when muddy",
      "CNC-machined for durability",
      "Simple bolt-on upgrade",
    ],
    experience: null,
    video: null,
    specs: {
      Brand: "Generic Trail",
      Material: "CNC aluminum",
      Compatibility: "10mm universal mount",
      Size: "Wide platform",
      Type: "Foot pegs (pair)",
    },
    // REPLACE_AFFILIATE_URL
    affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-FOOT-PEGS",
  },
];

const VIDEOS = [
  {
    title: "Quick Throttle Test on My XTZ125",
    description: "Quick before/after feel test after installing a quick throttle.",
    platform: "YouTube",
    thumbnail: "images/videos/thumb1.svg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // REPLACE_SOCIAL_LINK
    productId: "quick-throttle",
  },
  {
    title: "Handlebar Setup",
    description: "Swapping to a wider trail handlebar for better standing control.",
    platform: "TikTok",
    thumbnail: "images/videos/thumb2.svg",
    url: "https://www.tiktok.com/@inspectmx/video/placeholder", // REPLACE_SOCIAL_LINK
    productId: "handlebar",
  },
  {
    title: "Trail Bike Setup",
    description: "Full trail-ready setup walkthrough on the XTZ125.",
    platform: "Facebook",
    thumbnail: "images/videos/thumb3.svg",
    url: "https://www.facebook.com/inspectmx/videos/placeholder", // REPLACE_SOCIAL_LINK
    productId: "oring-chain",
  },
  {
    title: "Budget Motorcycle Mods",
    description: "Cheap upgrades that actually make a difference on a daily rider.",
    platform: "TikTok",
    thumbnail: "images/videos/thumb4.svg",
    url: "https://www.tiktok.com/@inspectmx/video/placeholder2", // REPLACE_SOCIAL_LINK
    productId: "grips",
  },
];

const BUILDS = [
  {
    id: "xtz125-trail",
    name: "XTZ125 Trail Build",
    bike: "Yamaha XTZ125",
    image: "images/builds/xtz125-trail.svg",
    summary: "My daily-to-trail build — focused on control, durability, and low-cost upgrades that hold up off-road.",
    parts: [
      { label: "Engine setup", productId: "oring-chain" },
      { label: "Controls", productId: "quick-throttle" },
      { label: "Handlebar", productId: "handlebar" },
      { label: "Trail setup", productId: "foot-pegs" },
    ],
  },
];

const SOCIAL_LINKS = {
  // REPLACE_SOCIAL_LINK with your real profile URLs
  tiktok: "https://www.tiktok.com/@inspectmx",
  facebook: "https://www.facebook.com/inspectmx",
  youtube: "https://www.youtube.com/@inspectmx",
  instagram: "https://www.instagram.com/inspectmx",
};
