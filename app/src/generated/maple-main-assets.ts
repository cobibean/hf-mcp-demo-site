export const mapleMainAssets = {
  hero: {
    still: "/assets/hero/hero-window-still.webp",
    frameCount: 101,
    framePath: (index: number) =>
      `/assets/frames/hero/window-${index.toString().padStart(3, "0")}.webp`,
  },
  textures: {
    paintedGreenTrim: "/assets/textures/painted-green-trim.webp",
    boothVinylRed: "/assets/textures/booth-vinyl-red.webp",
    porcelainTabletop: "/assets/textures/porcelain-tabletop.webp",
    menuPaperOverlay: "/assets/textures/menu-paper-overlay.webp",
  },
  food: {
    breakfastPancakes: "/assets/food/breakfast-pancakes.webp",
    lunchSoupSandwich: "/assets/food/lunch-soup-sandwich.webp",
    coffeePour: "/assets/food/coffee-pour.webp",
  },
  people: {
    familyBooth: "/assets/people/family-booth.webp",
    localsCoffeeSeat: "/assets/people/locals-coffee-seat.webp",
    travelerTakeout: "/assets/people/traveler-takeout.webp",
  },
  specials: {
    chalkboardPlate: "/assets/specials/chalkboard-plate.webp",
    handbillCluster: "/assets/specials/handbill-cluster.webp",
  },
  visit: {
    tabletopStrip: "/assets/visit/tabletop-strip.webp",
    mapBlock: "/assets/visit/map-block.webp",
  },
  footer: {
    lastCup: "/assets/footer/last-cup.webp",
    windowDecal: "/assets/footer/window-decal.webp",
  },
  brand: {
    logoMarkSource: "/assets/brand/logo-mark-source.png",
    monogramBadgeSource: "/assets/brand/monogram-badge-source.png",
    windowpaneMaplePattern: "/assets/brand/windowpane-maple-pattern.png",
  },
  icons: {
    coffee: "/assets/icons/coffee.png",
    breakfast: "/assets/icons/breakfast.png",
    lunch: "/assets/icons/lunch.png",
    kids: "/assets/icons/kids.png",
    parking: "/assets/icons/parking.png",
    pie: "/assets/icons/pie.png",
    takeout: "/assets/icons/takeout.png",
    hours: "/assets/icons/hours.png",
  },
  meta: {
    ogImage: "/assets/meta/og-image.png",
    faviconSvg: "/favicon.svg",
    faviconIco: "/favicon.ico",
    favicon16: "/favicon-16.png",
    favicon32: "/favicon-32.png",
    appleTouchIcon: "/apple-touch-icon.png",
    icon192: "/icon-192.png",
    icon512: "/icon-512.png",
    maskableIcon512: "/icon-maskable-512.png",
    webmanifest: "/site.webmanifest",
  },
} as const;

export type MapleMainAssets = typeof mapleMainAssets;
