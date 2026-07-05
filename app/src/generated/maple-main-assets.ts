export const mapleMainAssets = {
  hero: {
    still: "/assets/hero/hero-window-still.png",
    video: "/assets/hero/hero-window-scrub.mp4",
    lqip: "/assets/hero/hero-window-lqip.webp",
    frameCount: 101,
    framePath: (index: number) =>
      `/assets/frames/hero/window-${index.toString().padStart(3, "0")}.webp`,
  },
  textures: {
    paintedGreenTrim: "/assets/textures/painted-green-trim.png",
    boothVinylRed: "/assets/textures/booth-vinyl-red.png",
    porcelainTabletop: "/assets/textures/porcelain-tabletop.png",
    menuPaperOverlay: "/assets/textures/menu-paper-overlay.png",
  },
  food: {
    breakfastPancakes: "/assets/food/breakfast-pancakes.png",
    lunchSoupSandwich: "/assets/food/lunch-soup-sandwich.png",
    coffeePour: "/assets/food/coffee-pour.png",
  },
  people: {
    familyBooth: "/assets/people/family-booth.png",
    localsCoffeeSeat: "/assets/people/locals-coffee-seat.png",
    travelerTakeout: "/assets/people/traveler-takeout.png",
  },
  specials: {
    chalkboardPlate: "/assets/specials/chalkboard-plate.png",
    handbillCluster: "/assets/specials/handbill-cluster.png",
  },
  visit: {
    tabletopStrip: "/assets/visit/tabletop-strip.png",
    mapBlock: "/assets/visit/map-block.png",
  },
  footer: {
    lastCup: "/assets/footer/last-cup.png",
  },
  brand: {
    logoMarkSource: "/assets/brand/logo-mark-source.png",
    monogramBadgeSource: "/assets/brand/monogram-badge-source.png",
    windowpaneMaplePattern: "/assets/brand/windowpane-maple-pattern.png",
  },
  icons: {
    sheet: "/assets/icons/icon-sheet.png",
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
