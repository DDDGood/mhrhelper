
var vue;

var data;
var dataTW;
function GetData(key) {
    return data[key];
}
var speciesDictionary = {};
function SetLocal(key) {
    let langData;
    if (key === "tw")
        langData = dataTW;
    else
        langData = i18n.messages[key]?.data;
    if (langData !== undefined) {
        Object.deepExtend(data, langData);
    }
    i18n.locale = key;
}
// function GetLocaleNameByKey(dataType, key) {
//     const typeData = GetData(dataType);
//     if (typeData !== undefined) {
//         const objData = typeData[key];
//         if (objData !== undefined) {
//             const nameData = objData.name;
//             if (nameData !== undefined) {
//                 const localeName = nameData[i18n.locale];
//                 if (localeName !== undefined)
//                     return localeName
//             }
//         }
//     }
//     return key;
// }


$(document).ready(Initialize);

function Initialize() {
    try {
        LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json"], tryOnDexLoaded);
    } catch (error) {
        console.log(error.message);
        document.getElementById("error").innerHTML = "error:" + error.message;
    }
}

function LoadData(paths, callback) {
    data = {};
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
                data[key] = jsonData[key];
            }
        }
        if (callback != undefined)
            callback();
    })
}

function tryOnDexLoaded() {
    try {
        onDexLoaded();
    } catch (error) {
        console.log(error.message);
        document.getElementById("error").innerHTML = "error:" + error.message;
    }
}

function onDexLoaded() {

    const dexData = GetData("large_monsters");

    speciesDictionary["all"] = {};
    for (key in dexData) {
        var mon = dexData[key];
        speciesDictionary["all"][key] = mon;
        if (mon.species !== "") {
            if (speciesDictionary.hasOwnProperty(mon.species) == false) {
                speciesDictionary[mon.species] = {};
            }
            speciesDictionary[mon.species][key] = mon;
        }
    }

    const router = InitRouter();

    vue = new Vue({
        el: '#app',
        data: function () {
            return {
                menuitems: [{ "name": "ddd" }]
            }
        },
        components: {
            topbarmenu: httpVueLoader("components/topbarmenu.vue")
        },
        router,
        i18n
    })


    data = Vue.observable(data);
    dataTW = JSON.parse(JSON.stringify(data));

    $("#wrapper").show();

    let uri = window.location.href.split('?');
    if (uri.length == 2) {
        let vars = uri[1].split('&');
        let getVars = {};
        let tmp = '';
        vars.forEach(function (v) {
            tmp = v.split('=');
            if (tmp.length == 2)
                getVars[tmp[0]] = tmp[1];
        });

        if (getVars['mon'] !== undefined) {
            const navMon = decodeURI(getVars['mon']);
            var result = Object.keys(dexData).find(key => dexData[key].name.tw === navMon);
            console.log('try redirect to: ' + navMon);
            if (dexData.hasOwnProperty(result)) {
                router.push({
                    path: "/mon/" + dexData[result].species + "/" + result
                });
            }
        }
    }

    // someDataWorks();


}
function someDataWorks() {


    const PART_COLOR = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabed4", "#469990"];

    // let currentColorID = -1;
    // let lastPart = "";
    // for (let part of data['large_monsters']["magnamalo"].parts) {
    //     console.log(part.name);
    //     if (lastPart != part.name) {
    //         currentColorID++;
    //     }
    //     lastPart = part.name;
    //     part.hitzone_color = PART_COLOR[currentColorID];
    // }
    // console.log(JSON.stringify(data['large_monsters']["magnamalo"].parts))

    // for (let m of data['hitdata']) {
    //     console.log(m.name_en);
    //     for (let id in data['large_monsters']) {
    //         let mon = data['large_monsters'][id];
    //         if (mon.name.en === m.name_en) {
    //             console.log("find!: " + mon.name.tw);
    //             mon.hitzone_image = "";
    //             mon.parts = [];

    //             let currentColorID = -1;
    //             let lastPart = "";
    //             for (let partID in m.rouzhi_array) {
    //                 let part = m.rouzhi_array[partID];
    //                 if (lastPart != part.part) {
    //                     currentColorID++;
    //                 }
    //                 lastPart = part.part;
    //                 mon.parts.push({
    //                     "name": part.part,
    //                     "state": part.partCondition,
    //                     "hitzone_color": PART_COLOR[currentColorID],
    //                     "hitData": [
    //                         part.cut,
    //                         part.hit,
    //                         part.shot,
    //                         part.fire,
    //                         part.water,
    //                         part.thunder,
    //                         part.ice,
    //                         part.dragon,
    //                         part.dizzy
    //                     ]
    //                 })
    //             }
    //             console.log(JSON.stringify(mon.parts));
    //         }
    //     }
    // }



    let tempDic = {};
    for (let id in data['parsed']) {
        let item = data['parsed'][id];
        // console.log(item.url);
        let foundedMonID = "";
        for (let monID in data['large_monsters']) {
            let mon = data['large_monsters'][monID];
            if (mon.name.en === item.name_en)
                foundedMonID = monID;
        }
        // console.log(foundedMonID);
        tempDic[foundedMonID] = item;
    }





    // ParseHitData    
    let partTrans = {
        "胴体": "身體",
        "前脚": "前腳",
        "後脚": "後腳",
        "尻尾": "尾巴",
        "尾先": "尾尖",
        "髪ヒレ": "髮鰭",
        "タテガミ": "鬃毛",
        "ヒレ": "鰭",
        "氷塊": "冰塊",
        "首・背": "頸・背",
        "尾根元": "尾根",
        "首下": "頸下",
        "回転中": "滾動中",
        "尻": "屁股",
        "脚(糸)": "腳(絲)",
        "尻先": "尾尖",
        "尻": "屁股",
        "首": "頸",
        "胴": "身",
        "脚": "腳",
        "剥ぎ取り": "剝取",
        "本体": "本體",
        "落とし物": "掉落物",
        "ターゲット": "目標",
        "ハチミツを食べている": "正在吃蜂蜜時",
        "魚を食べている時": "正在吃魚時",
        "音爆弾、閃光玉、罠にかかった時": "音爆彈、閃光彈、陷阱困住時",
        "切断系の攻撃": "切斷系(斬)攻擊",
        "炎熱蓄積状態中に頭を攻撃してダウン時": "炎熱蓄積狀態中攻擊頭部擊倒時",
        "左右どちらかの脚を破壊": "破壞左腿或右腿",
        "頭または翼の部位破壊時": "頭或翼破壞時",
        "体力30%以下の時に耐久値を1回0にすると報酬": "體力值30%以下時將耐久值1回降到0的報酬",
        "持っている岩や卵を落とした時": "擊落手中的岩石或卵時",
        "音爆弾でダウンさせた時泥纏いを中断させた時攻撃を当てて泳ぎ状態から地上に出した時泥を剥がした時": "當音爆彈擊倒時，當中斷泥纏時，當將他從游泳狀態打回地面時，當剝去泥漿時",
        "超帯電状態から通常状態に戻った時": "從超帶電狀態恢復到正常狀態時",
        "左右どちらかの爪を破壊": "破壞左爪或右爪",
        "切断属性": "切斷屬性",
        "泡まとい状態の解除時、爪とぎ時": "泡纏狀態解除時",
        "突進で地形にぶつかった時音爆弾で怯ませた時": "衝鋒撞到地形時，用音爆彈嚇它時",
        "疲れ状態で突進後にダウンした時": "疲勞狀態下衝鋒倒地",
        "左右どちらかの爪の": "左爪或右爪",
        "を引きずって逃げる時": "瘸腿逃跑時",
        "帯電状態を解除させた時張り付いた壁からダメージを受けて落下時": "帶電狀態解除時，在牆上被打下來",
        "擬態を解除時": "擬態解除時",
        "食事を中断させた時": "打斷進食時",
        "天井からヨダレを垂らした時": "天花板上流口水時",
        "攻撃に失敗してもがいた時": "攻擊失敗掙扎時",
        "打撃系の攻撃で一定ダメージ": "打撃系的攻擊造成一定傷害",
        "突進で地形にぶつかった時泥を纏った時": "突進撞上地形時，泥纏時。",
        "どちらかの": "任一側",
        "1段階の破壊で報酬": "1次破壞的報酬",
        "2段階の破壊で報酬": "2次破壞的報酬",
        "空中から落下させた時": "空中擊落時",
        "タテガミ破壊時": "上臂破壞時",
        "0にする": "降到0",
        "耐久値を": "耐久值",
        "を": ""
    }
    // for (let id in tempDic) {
    //     let item = tempDic[id];
    //     let target = data['large_monsters'][id];
    //     if (id !== "arzuros" && id !== "mizutsune" && id !== "great_izuchi" && id !== "rathian" && id !== "magnamalo") {
    //         console.log(target.name.tw + " no hitdata, do write");

    //         if (target.hitdata === undefined)
    //             target.hitdata = {}
    //         target.hitdata.parts = [];
    //         for (let i in item.meatQuality) {
    //             let parsedPart = item.meatQuality[i];
    //             let partName = partTrans.hasOwnProperty(parsedPart.part) ? partTrans[parsedPart.part] : parsedPart.part;
    //             target.hitdata.parts.push({
    //                 "part": partName,
    //                 "condition": parsedPart.partCondition === parsedPart.part ? "通常" : parsedPart.partCondition,
    //                 "cut": parsedPart.cut,
    //                 "blunt": parsedPart.hit,
    //                 "ammo": parsedPart.shot,
    //                 "fire": parsedPart.fire,
    //                 "water": parsedPart.water,
    //                 "thunder": parsedPart.thunder,
    //                 "ice": parsedPart.ice,
    //                 "dragon": parsedPart.dragon
    //             })
    //         }

    //     } else {
    //         console.log(target.name.tw + " has hitdata, no write");
    //     }

    // }


    // for (let key in i18n.messages.jp.data.items) {
    //     let item = i18n.messages.jp.data.items[key];
    //     console.log(item.name);
    //     // if (item.name === jpName) {
    //     //     console.log("find jp id: " + jpName + "  /" + item.name)
    //     //     return item.name;
    //     // }
    //     // else {
    //     //     console.log("can't find jp id: " + jpName + "  /" + item.name)
    //     //     return jpName;
    //     // }
    // }
    // var id = getMatIDFromJP("青熊獣の剛毛");
    // console.log(id);
    // return;
    for (let id in tempDic) {
        let item = tempDic[id];
        let target = data['large_monsters'][id];
        target.materials = [];
        for (let j in item.boqu) {
            let box = item.boqu[j];
            let matData = {
                "source": box.buwei,
                "num": box.num,
            };
            if (box.info !== undefined) {

                matData.info = box.info;
                for (let partJP in partTrans) {
                    if (matData.info.includes(partJP))
                        matData.info = matData.info.replace(partJP, partTrans[partJP]);
                }
                console.log(matData.info);
            }
            for (let partJP in partTrans) {
                if (matData.source.includes(partJP))
                    matData.source = matData.source.replace(partJP, partTrans[partJP]);
            }
            matData.low_rank = []
            for (let i in box.xia) {
                let jpName = box.xia[i].sucaiName;
                let itemCount = "1";
                let trySplitNum = jpName.split("x")
                if (trySplitNum.length > 1) {
                    jpName = trySplitNum[0];
                    itemCount = trySplitNum[1];
                }
                matData.low_rank.push({
                    "item": getMatIDFromJP(jpName),
                    "rate": box.xia[i].gailv,
                    "num": itemCount
                })
            }
            matData.high_rank = []
            for (let i in box.shang) {
                let jpName = box.shang[i].sucaiName;
                let itemCount = "1";
                let trySplitNum = jpName.split("x")
                if (trySplitNum.length > 1) {
                    jpName = trySplitNum[0];
                    itemCount = trySplitNum[1];
                }
                matData.high_rank.push({
                    "item": getMatIDFromJP(jpName),
                    "rate": box.shang[i].gailv,
                    "num": itemCount
                })
            }
            target.materials.push(matData);
        }
    }


    // for (let id in data.large_monsters) {
    //     let mon = data.large_monsters[id];
    //     mon["icon_large"] = "images/monsters/icons/large/" + id + ".png";
    //     mon = moveObjectElement("icon_large", "icon", mon);
    //     data.large_monsters[id] = mon;
    // }

    saveTextFile(JSON.stringify(data.large_monsters));


    // console.log(JSON.stringify(temp));

}

function getMatIDFromJP(jpName) {
    if (i18n.messages.jp.data.items[jpName] !== undefined) {
        // console.log("find id: " + jpName + " - " + i18n.messages.jp.data.items[jpName].name)
        return i18n.messages.jp.data.items[jpName].name
    }
    else
        console.log("can't find id: ")
    return jpName;
}

function orderKeys(obj, keys) {
    const newObj = {};
    for (let key of keys) {
        newObj[key] = obj[key];
    }
    return newObj;
}

function outputText(text) {
    const win = window.open('about:blank', '_blank');
    win.document.write(text);
}

function saveTextFile(text) {
    let file = new Blob([text], { type: 'text/json' });
    let url = window.URL.createObjectURL(file);

    let a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    a.href = url;
    a.download = "output.json";
    a.click();
    // window.URL.revokeObjectURL(url);
    a.remove();
}

//currentKey: the key you want to move
//afterKey: position to move-after the currentKey, null or '' if it must be in position [0]
//obj: object
function moveObjectElement(currentKey, afterKey, obj) {
    var result = {};
    var val = obj[currentKey];
    delete obj[currentKey];
    var next = -1;
    var i = 0;
    if (typeof afterKey == 'undefined' || afterKey == null) afterKey = '';
    $.each(obj, function (k, v) {
        if ((afterKey == '' && i == 0) || next == 1) {
            result[currentKey] = val;
            next = 0;
        }
        if (k == afterKey) { next = 1; }
        result[k] = v;
        ++i;
    });
    if (next == 1) {
        result[currentKey] = val;
    }
    if (next !== -1) return result; else return obj;
}

function InitRouter() {
    Vue.use(VueRouter);
    // const Foo = { template: '<div>foo</div>' }
    // const Bar = httpVueLoader("temp.vue");
    const SpeciesListComp = httpVueLoader("components/mon_browse_species.vue");
    const MonListComp = httpVueLoader("components/mon_browse_monsters.vue");
    const newMonList = httpVueLoader("components/mon_browse_all.vue");
    const MonComp = httpVueLoader("components/mon_main.vue");
    const SMonListComp = httpVueLoader("components/smon_browse_all.vue");
    const SMonComp = httpVueLoader("components/smon_main.vue");
    const EndemicListComp = httpVueLoader("components/endemics_browse_all.vue");
    const EndemicComp = httpVueLoader("components/endemics_main.vue");
    const WeaponListComp = httpVueLoader("components/weapon_browse_all.vue");
    const WeaponComp = httpVueLoader("components/weapon_main.vue");

    const router = new VueRouter({
        routes: [
            {
                name: 'home',
                path: '/',
                redirect: { path: '/mon' }
            },
            {
                name: 'monlist',
                path: '/mon',
                component: SpeciesListComp,
                props: { dex: GetData("large_monsters"), specieslist: speciesDictionary }
            },
            {
                path: '/mon/:name',
                component: MonComp,
                props: { dex: GetData("large_monsters"), moves: GetData("moves") }
            },
            {
                path: '/mon/all/:name',
                redirect: '/mon/:name',
                component: MonComp,
                props: { dex: GetData("large_monsters"), moves: GetData("moves") }
            },
            {
                name: 'mon',
                path: '/mon/species/:species',
                component: MonListComp,
                props: { specieslist: speciesDictionary, mondata: GetData("large_monsters") }
            },
            {
                name: 'smonlist',
                path: '/smon',
                component: SMonListComp,
                props: { smonsters: GetData("small_monsters") }
            },
            {
                name: 'smon',
                path: '/smon/:name',
                component: SMonComp,
                props: { smonsters: GetData("small_monsters") }
            },
            {
                name: 'endemiclist',
                path: '/endemics',
                component: EndemicListComp,
                props: { endemics: GetData("endemic_lifes") }
            },
            {
                name: 'endemics',
                path: '/endemics/:name',
                component: EndemicComp,
                props: { endemics: GetData("endemic_lifes") }
            },
            {
                name: 'weaponlist',
                path: '/weapon',
                component: WeaponListComp,
                props: { weapons: GetData("weapons") }
            },
            {
                name: 'weapon',
                path: '/weapon/:name',
                component: WeaponComp,
                props: { weapons: GetData("weapons") }
            }
        ]
    });
    return router;
}


function ParseDescriptionText(inputText) {
    let result = "";
    if (IsNullOrEmpty(inputText) === false) {
        const descTexts = inputText.split("\n", -1);
        for (const text of descTexts) {
            let subText = "";
            if (text.startsWith("[img")) {
                const tag = text.substring(0, text.indexOf(']'));
                if (tag.indexOf("text") > -1) {
                    subText = tag.substring(tag.indexOf("text=") + 5);
                }
                result +=
                    "<div class='flex-column description-image-container'><img class='description-image' src='" + text.substring(text.indexOf(']') + 1) + "'><span class='description-image-text'>" + subText + "</span></div>";
            }
            else
                result +=
                    "<p class='description-text'>" +
                    (IsNullOrEmpty(text) ? "<br>" : text) +
                    "</p>";
        }
    }
    return result;
}

function ParseStars(text, symbo = "⭐") {
    const value = parseInt(text, 10);
    let result = "-";
    if (!isNaN(value)) {
        if (value === 0) {
            result = "x";
        } else if (value > 0) {
            result = "";
            for (let i = 0; i < value; i++) {
                result += symbo;
            }
        }
    }
    return result;
}


function ParseCommand(text) {
    let final = "";
    let array = text.split('[');
    for (let part of array) {
        if (part.length === 0)
            continue;
        // console.log("part:" + part + part.length)
        const closeTag = part.indexOf("]");
        if (closeTag > -1) {
            const key = part.substring(0, closeTag);
            final += "<img class='command-icon' src='" + GetInputIcon(key) + "'>";
            // console.log("key:" + key)
        }
        final += "<span class='card-text'>" + part.substring(closeTag + 1) + "</span>";
    }
    return final;
}
function GetInputIcon(key) {
    switch (key) {
        case "X":
            return "images/icons/inputs/x.png"
            break;
        case "Y":
            return "images/icons/inputs/y.png"
            break;
        case "A":
            return "images/icons/inputs/a.png"
            break;
        case "B":
            return "images/icons/inputs/b.png"
            break;
        case "L":
            return "images/icons/inputs/l.png"
            break;
        case "R":
            return "images/icons/inputs/r.png"
            break;
        case "ZL":
            return "images/icons/inputs/zl.png"
            break;
        case "ZR":
            return "images/icons/inputs/zr.png"
            break;
        case "LS":
            return "images/icons/inputs/ls.png"
            break;
        case "RS":
            return "images/icons/inputs/rs.png"
            break;
    }
}

function IsNullOrEmpty(string) {
    return (!string || string.length === 0);
}

function CheckMobile() {
    return (window.innerWidth < 1200);
}

Object.deepExtend = function (destination, source) {
    for (var property in source) {
        if (typeof source[property] === "object" &&
            source[property] !== null) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
};