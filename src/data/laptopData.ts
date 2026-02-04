export interface Series {
  id: string;
  name: string;
}

export interface Model {
  id: string;
  name: string;
  series: Series[];
}

export interface Brand {
  id: string;
  name: string;
  models: Model[];
}

export const laptopData: Brand[] = [
  {
    id: 'lenovo',
    name: 'Lenovo',
    models: [
      {
        id: 'thinkpad',
        name: 'ThinkPad',
        series: [
          { id: 'x1', name: 'X1 Series (Carbon/Yoga/Extreme)' },
          { id: 't14', name: 'T14' },
          { id: 't14s', name: 'T14s' },
          { id: 't16', name: 'T16' },
          { id: 'x-series', name: 'X Series (X13/X12)' },
          { id: 'p-series', name: 'P Series (P1/P14s/P16)' },
          { id: 'l-series', name: 'L Series (L13/L14/L15)' },
          { id: 'e-series', name: 'E Series (E14/E16)' },
          { id: 'z-series', name: 'Z Series (Z13/Z16)' },
        ],
      },
      {
        id: 'thinkbook',
        name: 'ThinkBook',
        series: [
          { id: '13s', name: '13s' },
          { id: '14s', name: '14s / Yoga' },
          { id: '14', name: '14 Gen 4+' },
          { id: '15', name: '15 Gen 4' },
          { id: '16', name: '16p' },
          { id: 'plus', name: 'Plus Gen 3' },
        ],
      },
      {
        id: 'ideapad',
        name: 'IdeaPad',
        series: [
          { id: '1', name: '1 Series' },
          { id: '1-slim', name: 'Slim 1' },
          { id: '3', name: '3 Series' },
          { id: '3-slim', name: 'Slim 3' },
          { id: '5', name: '5 Series' },
          { id: '5-slim', name: 'Slim 5' },
          { id: '5-pro', name: 'Pro 5' },
          { id: 'flex', name: 'Flex (3/5)' },
        ],
      },
      {
        id: 'yoga',
        name: 'Yoga',
        series: [
          { id: '6', name: '6 (2-in-1)' },
          { id: '7', name: '7 / 7i (2-in-1)' },
          { id: 'pro-7', name: 'Pro 7 / 7i' },
          { id: 'slim-7', name: 'Slim 7 / 7i' },
          { id: '9', name: '9 / 9i (2-in-1)' },
          { id: 'pro-9', name: 'Pro 9 / 9i' },
          { id: 'book', name: 'Book 9i' },
        ],
      },
      {
        id: 'legion',
        name: 'Legion',
        series: [
          { id: 'pro-5', name: 'Pro 5 / 5i' },
          { id: 'pro-7', name: 'Pro 7 / 7i' },
          { id: 'slim-5', name: 'Slim 5 / 5i' },
          { id: 'slim-7', name: 'Slim 7 / 7i' },
          { id: '9', name: '9i' },
        ],
      },
      {
        id: 'loq',
        name: 'LOQ',
        series: [
          { id: '15', name: '15 (Intel/AMD)' },
          { id: '16', name: '16 (Intel/AMD)' },
        ],
      },
      {
        id: 'flex',
        name: 'Flex',
        series: [
          { id: '5i', name: '5i' },
          { id: '4i', name: '4i' },
        ],
      },
    ],
  },
  {
    id: 'dell',
    name: 'Dell',
    models: [
      {
        id: 'xps',
        name: 'XPS',
        series: [
          { id: '13', name: '13 / 13 Plus' },
          { id: '14', name: '14' },
          { id: '15', name: '15' },
          { id: '16', name: '16' },
          { id: '17', name: '17' },
        ],
      },
      {
        id: 'latitude',
        name: 'Latitude',
        series: [
          { id: '3000', name: '3000 Series (33xx/34xx/35xx)' },
          { id: '5000', name: '5000 Series (53xx/54xx/55xx)' },
          { id: '7000', name: '7000 Series (73xx/74xx/76xx)' },
          { id: '9000', name: '9000 Series (93xx/94xx)' },
          { id: 'rugged', name: 'Rugged Series' },
        ],
      },
      {
        id: 'inspiron',
        name: 'Inspiron',
        series: [
          { id: '13', name: '13' },
          { id: '14', name: '14 / 14 Plus / 14 2-in-1' },
          { id: '15', name: '15 / 3000' },
          { id: '16', name: '16 / 16 Plus / 16 2-in-1' },
        ],
      },
      {
        id: 'precision',
        name: 'Precision',
        series: [
          { id: '3000', name: '3000 Mobile Workstations' },
          { id: '5000', name: '5000 Mobile Workstations' },
          { id: '7000', name: '7000 Mobile Workstations' },
        ],
      },
      {
        id: 'vostro',
        name: 'Vostro',
        series: [
          { id: '3000', name: '3000 Series' },
          { id: '5000', name: '5000 Series' },
          { id: '7000', name: '7000 Series' },
        ],
      },
      {
        id: 'alienware',
        name: 'Alienware',
        series: [
          { id: 'm16', name: 'm16 / m16 R2' },
          { id: 'm18', name: 'm18 / m18 R2' },
          { id: 'x14', name: 'x14 R2' },
          { id: 'x16', name: 'x16 R2' },
        ],
      },
      {
        id: 'g-series',
        name: 'G Series',
        series: [
          { id: 'g15', name: 'G15' },
          { id: 'g16', name: 'G16' },
        ],
      },
    ],
  },
  {
    id: 'hp',
    name: 'HP',
    models: [
      {
        id: 'elitebook',
        name: 'EliteBook',
        series: [
          { id: '600', name: '600 Series (630/640/650)' },
          { id: '800', name: '800 Series (830/840/860)' },
          { id: '1000', name: '1000 Series (1040/Dragonfly)' },
          { id: 'x360', name: 'x360 (Convertible)' },
        ],
      },
      {
        id: 'probook',
        name: 'ProBook',
        series: [
          { id: '400', name: '400 Series (430/440/450)' },
          { id: '405', name: '405 Series (445/455)' },
          { id: 'x360', name: 'x360 435' },
        ],
      },
      {
        id: 'zbook',
        name: 'ZBook',
        series: [
          { id: 'firefly', name: 'Firefly' },
          { id: 'power', name: 'Power' },
          { id: 'studio', name: 'Studio' },
          { id: 'fury', name: 'Fury' },
        ],
      },
      {
        id: 'spectre',
        name: 'Spectre',
        series: [
          { id: 'x360-14', name: 'x360 14 inch' },
          { id: 'x360-16', name: 'x360 16 inch' },
          { id: 'fold', name: 'Spectre Fold' },
        ],
      },
      {
        id: 'envy',
        name: 'Envy',
        series: [
          { id: 'x360-14', name: 'x360 14 inch' },
          { id: 'x360-15', name: 'x360 15 inch' },
          { id: '16', name: '16 inch' },
          { id: '17', name: '17 inch' },
        ],
      },
      {
        id: 'pavilion',
        name: 'Pavilion',
        series: [
          { id: '14', name: '14 inch' },
          { id: '15', name: '15 inch' },
          { id: 'plus-14', name: 'Plus 14' },
          { id: 'plus-16', name: 'Plus 16' },
          { id: 'aero', name: 'Aero 13' },
          { id: 'x360', name: 'x360' },
        ],
      },
      {
        id: 'omen',
        name: 'OMEN',
        series: [
          { id: 'transcend-14', name: 'Transcend 14' },
          { id: 'transcend-16', name: 'Transcend 16' },
          { id: '16', name: '16' },
          { id: '17', name: '17' },
        ],
      },
      {
        id: 'victus',
        name: 'Victus',
        series: [
          { id: '15', name: '15L / 15 inch' },
          { id: '16', name: '16 inch' },
        ],
      },
      {
        id: 'omnibook',
        name: 'OmniBook (New)',
        series: [
          { id: 'x', name: 'X' },
          { id: 'ultra', name: 'Ultra' },
        ],
      },
    ],
  },
  {
    id: 'mac',
    name: 'Mac',
    models: [
      {
        id: 'macbook-air',
        name: 'MacBook Air',
        series: [
          { id: 'm1', name: 'M1 (13-inch)' },
          { id: 'm2-13', name: 'M2 (13-inch)' },
          { id: 'm2-15', name: 'M2 (15-inch)' },
          { id: 'm3-13', name: 'M3 (13-inch)' },
          { id: 'm3-15', name: 'M3 (15-inch)' },
        ],
      },
      {
        id: 'macbook-pro',
        name: 'MacBook Pro',
        series: [
          { id: '13-m2', name: '13-inch (M2)' },
          { id: '14-m3', name: '14-inch (M3 / Pro / Max)' },
          { id: '16-m3', name: '16-inch (M3 Pro / Max)' },
          { id: '14-m2', name: '14-inch (M2 Pro / Max) - Older' },
          { id: '16-m2', name: '16-inch (M2 Pro / Max) - Older' },
          { id: '14-m1', name: '14-inch (M1 Pro / Max) - Older' },
          { id: '16-m1', name: '16-inch (M1 Pro / Max) - Older' },
        ],
      },
    ],
  },
];
