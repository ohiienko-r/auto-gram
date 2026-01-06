export const TYPEOF_TRANSPORT = {
  ALL: "all",
  PASSENGER: "passenger",
  MOTO: "moto",
  TRUCK: "truck",
  SPECIAL: "special",
  BUS: "bus",
} as const;

export const CAR_BRANDS_OPTIONS = [
  { value: "acura", label: "Acura" },
  { value: "alfa-romeo", label: "Alfa Romeo" },
  { value: "aston-martin", label: "Aston Martin" },
  { value: "audi", label: "Audi" },
  { value: "bentley", label: "Bentley" },
  { value: "bmw", label: "BMW" },
  { value: "bugatti", label: "Bugatti" },
  { value: "buick", label: "Buick" },
  { value: "cadillac", label: "Cadillac" },
  { value: "chevrolet", label: "Chevrolet" },
  { value: "chrysler", label: "Chrysler" },
  { value: "citroen", label: "Citroën" },
  { value: "cupra", label: "Cupra" },
  { value: "dacia", label: "Dacia" },
  { value: "daewoo", label: "Daewoo" },
  { value: "daihatsu", label: "Daihatsu" },
  { value: "dodge", label: "Dodge" },
  { value: "ds", label: "DS Automobiles" },
  { value: "ferrari", label: "Ferrari" },
  { value: "fiat", label: "Fiat" },
  { value: "ford", label: "Ford" },
  { value: "genesis", label: "Genesis" },
  { value: "gmc", label: "GMC" },
  { value: "great-wall", label: "Great Wall" },
  { value: "haval", label: "Haval" },
  { value: "honda", label: "Honda" },
  { value: "hyundai", label: "Hyundai" },
  { value: "infiniti", label: "Infiniti" },
  { value: "isuzu", label: "Isuzu" },
  { value: "jaguar", label: "Jaguar" },
  { value: "jeep", label: "Jeep" },
  { value: "kia", label: "Kia" },
  { value: "koenigsegg", label: "Koenigsegg" },
  { value: "lamborghini", label: "Lamborghini" },
  { value: "lancia", label: "Lancia" },
  { value: "land-rover", label: "Land Rover" },
  { value: "lexus", label: "Lexus" },
  { value: "lincoln", label: "Lincoln" },
  { value: "lotus", label: "Lotus" },
  { value: "lucid", label: "Lucid" },
  { value: "maserati", label: "Maserati" },
  { value: "maybach", label: "Maybach" },
  { value: "mazda", label: "Mazda" },
  { value: "mclaren", label: "McLaren" },
  { value: "mercedes-benz", label: "Mercedes-Benz" },
  { value: "mg", label: "MG" },
  { value: "mini", label: "MINI" },
  { value: "mitsubishi", label: "Mitsubishi" },
  { value: "nissan", label: "Nissan" },
  { value: "opel", label: "Opel" },
  { value: "peugeot", label: "Peugeot" },
  { value: "polestar", label: "Polestar" },
  { value: "pontiac", label: "Pontiac" },
  { value: "porsche", label: "Porsche" },
  { value: "ram", label: "RAM" },
  { value: "renault", label: "Renault" },
  { value: "rolls-royce", label: "Rolls-Royce" },
  { value: "rover", label: "Rover" },
  { value: "saab", label: "Saab" },
  { value: "seat", label: "SEAT" },
  { value: "skoda", label: "Skoda" },
  { value: "smart", label: "Smart" },
  { value: "subaru", label: "Subaru" },
  { value: "suzuki", label: "Suzuki" },
  { value: "tesla", label: "Tesla" },
  { value: "toyota", label: "Toyota" },
  { value: "vinfast", label: "VinFast" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "volvo", label: "Volvo" },
  { value: "xpeng", label: "Xpeng" },
  { value: "zhidou", label: "Zhidou" },
];

export const CAR_CONDITION = {
  ALL: "all",
  NEW: "new",
  USED: "used",
} as const;

export const CAR_CONDITION_OPTIONS = [
  { value: CAR_CONDITION.ALL, label: "Всі" },
  { value: CAR_CONDITION.NEW, label: "Нові" },
  { value: CAR_CONDITION.USED, label: "Вживані" },
];

export const CAR_ACCIDENT = {
  ALL: "all",
  YES: "yes",
  NO: "no",
} as const;

export const CAR_ACCIDENT_OPTIONS = [
  { value: CAR_ACCIDENT.ALL, label: "Всі" },
  { value: CAR_ACCIDENT.YES, label: "Було" },
  { value: CAR_ACCIDENT.NO, label: "Не було" },
];

export const FUEL_TYPE = {
  ALL: "all",
  PETROL: "petrol",
  GAS: "gas",
  DIESEL: "diesel",
  ELECTRO: "electro",
  GAS_PETROL: "gas_petrol",
  METHANE_PETROL: "methane_petrol",
  HYBRID_HEV: "hybrid_hev",
  HYBRID_PHEV: "hybrid_phev",
  HYBRID_MHEV: "hybrid_mhev",
} as const;

export const FUEL_TYPE_OPTIONS = [
  { value: FUEL_TYPE.ALL, label: "Всі" },
  { value: FUEL_TYPE.PETROL, label: "Бензин" },
  { value: FUEL_TYPE.GAS, label: "Газ" },
  { value: FUEL_TYPE.DIESEL, label: "Дизель" },
  { value: FUEL_TYPE.ELECTRO, label: "Електро" },
  { value: FUEL_TYPE.GAS_PETROL, label: "Пропан-бутан/Бензин" },
  { value: FUEL_TYPE.METHANE_PETROL, label: "Метан/Бензин" },
  { value: FUEL_TYPE.HYBRID_HEV, label: "Гібрид HEV" },
  { value: FUEL_TYPE.HYBRID_PHEV, label: "Гібрид PHEV" },
  { value: FUEL_TYPE.HYBRID_MHEV, label: "Гібрид MHEV" },
];

export const TRANSMISSION_TYPE = {
  ALL: "all",
  MANUAL: "manual",
  AUTOMATIC: "automatic",
  TIPTRONIC: "tiptronic",
  ROBOTIC: "robotic",
  VARIATOR: "variator",
} as const;

export const TRANSMISSION_TYPE_OPTIONS = [
  { value: TRANSMISSION_TYPE.ALL, label: "Усі" },
  { value: TRANSMISSION_TYPE.MANUAL, label: "Ручна/Механічна" },
  { value: TRANSMISSION_TYPE.AUTOMATIC, label: "Автомат" },
  { value: TRANSMISSION_TYPE.TIPTRONIC, label: "Типтронік" },
  { value: TRANSMISSION_TYPE.ROBOTIC, label: "Робот" },
  { value: TRANSMISSION_TYPE.VARIATOR, label: "Варіатор" },
];

export const REGIONS_OPTIONS = [
  { value: "vinnytsia", label: "Вінницька область" },
  { value: "volyn", label: "Волинська область" },
  { value: "dnipropetrovsk", label: "Дніпропетровська область" },
  { value: "donetsk", label: "Донецька область" },
  { value: "zhytomyr", label: "Житомирська область" },
  { value: "zakarpattia", label: "Закарпатська область" },
  { value: "zaporizhzhia", label: "Запорізька область" },
  { value: "ivano_frankivsk", label: "Івано-Франківська область" },
  { value: "kyiv", label: "Київська область" },
  { value: "kirovohrad", label: "Кіровоградська область" },
  { value: "luhansk", label: "Луганська область" },
  { value: "lviv", label: "Львівська область" },
  { value: "mykolaiv", label: "Миколаївська область" },
  { value: "odesa", label: "Одеська область" },
  { value: "poltava", label: "Полтавська область" },
  { value: "rivne", label: "Рівненська область" },
  { value: "sumy", label: "Сумська область" },
  { value: "ternopil", label: "Тернопільська область" },
  { value: "kharkiv", label: "Харківська область" },
  { value: "kherson", label: "Херсонська область" },
  { value: "khmelnytskyi", label: "Хмельницька область" },
  { value: "cherkasy", label: "Черкаська область" },
  { value: "chernivtsi", label: "Чернівецька область" },
  { value: "chernihiv", label: "Чернігівська область" },
  { value: "kyiv_city", label: "м. Київ" },
  { value: "sevastopol", label: "м. Севастополь" },
];

export const BODY_TYPE = {
  UNIVERSAL: "universal",
  SEDAN: "sedan",
  HATCHBACK: "hatchback",
  COUPE: "coupe",
  CABRIOLET: "cabriolet",
  MINIVAN: "minivan",
} as const;

export const BODY_TYPE_OPTIONS = [
  { value: BODY_TYPE.UNIVERSAL, label: "Універсал" },
  { value: BODY_TYPE.SEDAN, label: "Седан" },
  { value: BODY_TYPE.HATCHBACK, label: "Хетчбек" },
  { value: BODY_TYPE.COUPE, label: "Купе" },
  { value: BODY_TYPE.CABRIOLET, label: "Кабріолет" },
  { value: BODY_TYPE.MINIVAN, label: "Мінівен" },
];

export const SUSPENSION_TYPE = {
  FULL: "full",
  PARTIAL: "partial",
} as const;

export const SUSPENSION_TYPE_OPTIONS = [
  { value: SUSPENSION_TYPE.FULL, label: "Повна" },
  { value: SUSPENSION_TYPE.PARTIAL, label: "Часткова" },
];

export const DRIVE_TYPE = {
  AWD: "awd", // Повний
  RWD: "rwd", // Задній
  FWD: "fwd", // Передній
} as const;

export const DRIVE_TYPE_OPTIONS = [
  { value: DRIVE_TYPE.AWD, label: "Повний" },
  { value: DRIVE_TYPE.RWD, label: "Задній" },
  { value: DRIVE_TYPE.FWD, label: "Передній" },
];

export const CAR_COUNTRIES_OPTIONS = [
  { value: "usa", label: "США" },
  { value: "germany", label: "Німеччина" },
  { value: "japan", label: "Японія" },
  { value: "south-korea", label: "Південна Корея" },
  { value: "china", label: "Китай" },
  { value: "france", label: "Франція" },
  { value: "italy", label: "Італія" },
  { value: "uk", label: "Велика Британія" },
  { value: "sweden", label: "Швеція" },
  { value: "czech-republic", label: "Чехія" },
  { value: "romania", label: "Румунія" },
  { value: "spain", label: "Іспанія" },
  { value: "netherlands", label: "Нідерланди" },
  { value: "switzerland", label: "Швейцарія" },
  { value: "austria", label: "Австрія" },
  { value: "vietnam", label: "Вʼєтнам" },
  { value: "india", label: "Індія" },
  { value: "poland", label: "Польща" },
  { value: "ukraine", label: "Україна" },
];
