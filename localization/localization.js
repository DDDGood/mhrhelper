
var i18n = new VueI18n({
    locale: 'tw', // 語系可以先指定或之後指定
    fallbackLocale: 'tw',
});


InitLocalization();

function InitLocalization() {
    LoadLocaleData(['localization/tw.json', 'localization/en.json', 'localization/jp.json'], OnLocaleLoaded)
}

function LoadLocaleData(paths, callback) {
    localeData = {};
    let fetchTasks = [];
    for (let path of paths) {
        fetchTasks.push(fetch(path));
    }
    Promise.all(fetchTasks).then((results) => {
        var jsonPromises = [];
        for (let res of results) {
            jsonPromises.push(res.json());
        }
        return Promise.all(jsonPromises);
    }).then((jsonDatas) => {
        for (let jsonData of jsonDatas) {
            for (let key in jsonData) {
                i18n.setLocaleMessage(key, jsonData[key]);
            }
        }
        if (callback != undefined)
            callback();
    })
}
function OnLocaleLoaded() {
}

// const messages = {
//     tw: {
//         mhrhelper: "MHRise 魔物筆記",
//         species: "種類",
//         list: "列表",
//         description: "基本介紹",
//         description_detail: "設定細節",
//         reference: "參考資料",
//         dataType: {
//             large_monsters: "大型魔物",
//             endemic_lifes: "環境生物"
//         },
//         monster: {
//             name: { "great_izuchi": "great_izuchi", "arzuros": "arzuros", "rathian": "rathian", "mizutsune": "mizutsune", "tetranadon": "tetranadon", "aknosom": "aknosom", "somnacanth": "somnacanth", "khezu": "khezu", "royal_ludroth": "royal_ludroth", "rathalos": "rathalos", "pukei-pukei": "pukei-pukei", "kulu-ya-ku": "kulu-ya-ku", "tobi-kadachi": "tobi-kadachi", "anjanath": "anjanath", "jyuratodus": "jyuratodus", "great_wroggi": "great_wroggi", "bishaten": "bishaten", "magnamalo": "magnamalo", "goss_harag": "goss_harag", "great_baggi": "great_baggi", "lagombi": "lagombi", "barioth": "barioth", "tigrex": "tigrex", "barroth": "barroth", "nargacuga": "nargacuga", "volvidon": "volvidon", "basarios": "basarios", "zinogre": "zinogre", "yatsukadaki": "yatsukadaki" },
//             species: {
//                 全部: "all",
//                 鳥龍種: "bird_wyvern",
//                 牙獸種: "fanged_beast",
//                 飛龍種: "flying_wryven",
//                 海龍種: "leviathan",
//                 兩生種: "amphibian",
//                 牙龍種: "fanged_wyvern",
//                 獸龍種: "brute_wyvern",
//                 魚龍種: "piscine_wyvern",
//                 鋏角種: "temnoceran"
//             },
//             trait: {
//                 roar: "咆嘯",
//                 wind: "風壓",
//                 tremor: "震動",
//                 element: "主要屬性",
//                 aliment: "異常狀態"
//             },
//             weakness: {
//                 cut: "切",
//                 blunt: "打",
//                 ammo: "彈",
//                 element: "屬性弱點",
//                 aliment: "異常弱點",
//                 item: "道具效果",
//                 items: {
//                     pitfalltrap: "落穴",
//                     shocktrap: "麻痺",
//                     flashpod: "閃光",
//                     screamerpod: "音爆"
//                 }
//             },
//             part: "部位",
//             state: "狀態",
//             hitdata: "詳細肉質(舊版資訊)",
//             battlestrategy: "對戰要點",
//             moves: "招式派生",
//             moveshint: "(點擊可查看招式介紹)",
//         },
//         element: {
//             fire: "火",
//             water: "水",
//             thunder: "雷",
//             ice: "冰",
//             dragon: "龍",
//         },
//         aliment: {
//             poison: "中毒",
//             sleep: "睡眠",
//             paralysis: "麻痺",
//             blast: "爆破",
//             stun: "昏厥",
//         }
//     },
//     en: {
//         mhrhelper: "MHRHelper",
//         species: "Species",
//         list: "List",
//         description: "Description",
//         description_detail: "Details",
//         reference: "Reference",
//         dataType: {
//             large_monsters: "Large Monster",
//             endemic_lifes: "Endemic Lifes"
//         },
//         monster: {
//             name: {
//                 "great_izuchi": "Great Izuchi",
//                 "arzuros": "Aoashira",
//                 "rathian": "Rathian",
//                 "mizutsune": "Mizutsune",
//                 "tetranadon": "Tetranadon",
//                 "aknosom": "Aknosom",
//                 "somnacanth": "Somnacanth",
//                 "khezu": "Khezu",
//                 "royal_ludroth": "Royal Ludroth",
//                 "rathalos": "Rathalos",
//                 "pukei-pukei": "Pukei-Pukei",
//                 "kulu-ya-ku": "Kulu-Ya-Ku",
//                 "tobi-kadachi": "Tobi-Kadachi",
//                 "anjanath": "Anjanath",
//                 "jyuratodus": "Jyuratodus",
//                 "great_wroggi": "Great Wroggi",
//                 "bishaten": "Bishaten",
//                 "magnamalo": "Magnamalo",
//                 "goss_harag": "Goss Harag",
//                 "great_baggi": "Great Baggi",
//                 "lagombi": "Lagombi",
//                 "barioth": "Barioth",
//                 "tigrex": "Tigrex",
//                 "barroth": "Barroth",
//                 "nargacuga": "Nargacuga",
//                 "volvidon": "Volvidon",
//                 "basarios": "Basarios",
//                 "zinogre": "Zinogre",
//                 "yatsukadaki": "Yatsukadaki"
//             },
//             species: {
//                 全部: "All",
//                 鳥龍種: "Bird Wyverns",
//                 牙獸種: "Fanged Beasts",
//                 飛龍種: "Flying Wryven",
//                 海龍種: "Leviathans",
//                 兩生種: "Amphibians",
//                 牙龍種: "Fanged Wyverns",
//                 獸龍種: "Brute Wyverns",
//                 魚龍種: "Flying Wyverns",
//                 鋏角種: "Temnocerans"
//             },
//             trait: {
//                 roar: "roar",
//                 wind: "wind",
//                 tremor: "tremor",
//                 element: "element",
//                 aliment: "aliment"
//             },
//             weakness: {
//                 cut: "cut",
//                 blunt: "blunt",
//                 ammo: "ammo",
//                 element: "Element Weakness",
//                 aliment: "Aliment Weakness",
//                 item: "Items Effectness",
//                 items: {
//                     pitfalltrap: "pitfalltrap",
//                     shocktrap: "shocktrap",
//                     flashpod: "flashpod",
//                     screamerpod: "screamerpod"
//                 }
//             },
//             part: "Part",
//             state: "State",
//             hitdata: "Hit Data (previous ver.)",
//             battlestrategy: "Battle Strategy",
//             moves: "Attack Patterns",
//             moveshint: "(Click to see informations)",
//         },
//         element: {
//             fire: "fire",
//             water: "water",
//             thunder: "thunder",
//             ice: "ice",
//             dragon: "dragon",
//         },
//         aliment: {
//             poison: "poison",
//             sleep: "sleep",
//             paralysis: "paralysis",
//             blast: "blast",
//             stun: "stun",
//         }
//     },
//     jp: {
//         mhrhelper: "MHRHelper",
//         name: {
//             "great_izuchi": "オサイズチ",
//             "arzuros": "アオアシラ",
//             "rathian": "リオレイア",
//             "mizutsune": "タマミツネ",
//             "tetranadon": "ヨツミワドウ",
//             "aknosom": "アケノシルム",
//             "somnacanth": "イソネミクニ",
//             "khezu": "フルフル",
//             "royal_ludroth": "ロアルドロス",
//             "rathalos": "リオレウス",
//             "pukei-pukei": "プケプケ",
//             "kulu-ya-ku": "クルルヤック",
//             "tobi-kadachi": "トビカガチ",
//             "anjanath": "アンジャナフ",
//             "jyuratodus": "ジュラトドス",
//             "great_wroggi": "毒狗竜",
//             "bishaten": "ビシュテンゴ",
//             "magnamalo": "マガイマガド",
//             "goss_harag": "ゴシャハギ",
//             "great_baggi": "ドスバギィ",
//             "lagombi": "ウルクスス",
//             "barioth": "ベリオロス",
//             "tigrex": "ティガレックス",
//             "barroth": "ボルボロス",
//             "nargacuga": "ナルガクルガ",
//             "volvidon": "ラングロトラ",
//             "basarios": "バサルモス",
//             "zinogre": "ジンオウガ",
//             "yatsukadaki": "ヤツカダキ"
//         }
//     }
// };

