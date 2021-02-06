
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
    console.log(i18n.messages);
}

// const messages = {
//     tw: {
//         mhrhelper: "MHRise 魔物筆記",
//         species: "種類",
//         list: "列表",
//         description: "基本介紹",
//         description_details: "設定細節",
//         reference: "參考資料",
//         dataType: {
//             largeMonster: "大型魔物",
//             endemicLifes: "環境生物"
//         },
//         monster: {
//             name: { "鐮鼬龍王": "鐮鼬龍王", "青熊獸": "青熊獸", "雌火龍": "雌火龍", "泡狐龍": "泡狐龍", "河童蛙": "河童蛙", "傘鳥": "傘鳥", "人魚龍": "人魚龍", "奇怪龍": "奇怪龍", "水獸": "水獸", "火龍": "火龍", "毒妖鳥": "毒妖鳥", "搔鳥": "搔鳥", "飛雷龍": "飛雷龍", "蠻顎龍": "蠻顎龍", "泥魚龍": "泥魚龍", "毒狗龍王": "毒狗龍王", "天狗獸": "天狗獸", "怨虎龍": "怨虎龍", "雪鬼獸": "雪鬼獸", "眠狗龍王": "眠狗龍王", "白兔獸": "白兔獸", "冰牙龍": "冰牙龍", "轟龍": "轟龍", "土砂龍": "土砂龍", "迅龍": "迅龍", "赤甲獸": "赤甲獸", "岩龍": "岩龍", "雷狼龍": "雷狼龍", "絡新婦": "絡新婦" },
//             species: {
//                 全部: "全部",
//                 鳥龍種: "鳥龍種",
//                 牙獸種: "牙獸種",
//                 飛龍種: "飛龍種",
//                 海龍種: "海龍種",
//                 兩生種: "兩生種",
//                 牙龍種: "牙龍種",
//                 獸龍種: "獸龍種",
//                 魚龍種: "魚龍種",
//                 鋏角種: "鋏角種"
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
//         description_details: "Details",
//         reference: "Reference",
//         dataType: {
//             largeMonster: "Large Monster",
//             endemicLifes: "Endemic Lifes"
//         },
//         monster: {
//             name: {
//                 "鐮鼬龍王": "Great Izuchi",
//                 "青熊獸": "Aoashira",
//                 "雌火龍": "Rathian",
//                 "泡狐龍": "Mizutsune",
//                 "河童蛙": "Tetranadon",
//                 "傘鳥": "Aknosom",
//                 "人魚龍": "Somnacanth",
//                 "奇怪龍": "Khezu",
//                 "水獸": "Royal Ludroth",
//                 "火龍": "Rathalos",
//                 "毒妖鳥": "Pukei-Pukei",
//                 "搔鳥": "Kulu-Ya-Ku",
//                 "飛雷龍": "Tobi-Kadachi",
//                 "蠻顎龍": "Anjanath",
//                 "泥魚龍": "Jyuratodus",
//                 "毒狗龍王": "Great Wroggi",
//                 "天狗獸": "Bishaten",
//                 "怨虎龍": "Magnamalo",
//                 "雪鬼獸": "Goss Harag",
//                 "眠狗龍王": "Great Baggi",
//                 "白兔獸": "Lagombi",
//                 "冰牙龍": "Barioth",
//                 "轟龍": "Tigrex",
//                 "土砂龍": "Barroth",
//                 "迅龍": "Nargacuga",
//                 "赤甲獸": "Volvidon",
//                 "岩龍": "Basarios",
//                 "雷狼龍": "Zinogre",
//                 "絡新婦": "Yatsukadaki"
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
//             "鐮鼬龍王": "オサイズチ",
//             "青熊獸": "アオアシラ",
//             "雌火龍": "リオレイア",
//             "泡狐龍": "タマミツネ",
//             "河童蛙": "ヨツミワドウ",
//             "傘鳥": "アケノシルム",
//             "人魚龍": "イソネミクニ",
//             "奇怪龍": "フルフル",
//             "水獸": "ロアルドロス",
//             "火龍": "リオレウス",
//             "毒妖鳥": "プケプケ",
//             "搔鳥": "クルルヤック",
//             "飛雷龍": "トビカガチ",
//             "蠻顎龍": "アンジャナフ",
//             "泥魚龍": "ジュラトドス",
//             "毒狗龍王": "毒狗竜",
//             "天狗獸": "ビシュテンゴ",
//             "怨虎龍": "マガイマガド",
//             "雪鬼獸": "ゴシャハギ",
//             "眠狗龍王": "ドスバギィ",
//             "白兔獸": "ウルクスス",
//             "冰牙龍": "ベリオロス",
//             "轟龍": "ティガレックス",
//             "土砂龍": "ボルボロス",
//             "迅龍": "ナルガクルガ",
//             "赤甲獸": "ラングロトラ",
//             "岩龍": "バサルモス",
//             "雷狼龍": "ジンオウガ",
//             "絡新婦": "ヤツカダキ"
//         }
//     }
// };

