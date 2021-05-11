
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

var startTime = Date.now();
var lastTime = startTime;
// console.log(startTime);



$(document).ready(Initialize);

function Initialize() {
    // LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/items.json", "data/quests.json", "data/item_source.json", "data/meowcenaries.json", "data/equip_weapons.json"], onDexLoaded);
    LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/items.json", "data/quests.json", "data/item_source.json", "data/meowcenaries.json", "data/equip_weapons.json", "data/raw/monsters-0507.json", "data/raw/item-cn-jp.json", "data/cntokey.json", "data/cntotw.json", "data/jptotw.json"], tryOnDexLoaded);
}

function tryInitialize() {
    try {
        LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/items.json", "data/quests.json", "data/item_source.json", "data/meowcenaries.json"], tryOnDexLoaded);
        // LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/items.json", "data/quests.json", "data/item_source.json", "data/meowcenaries.json", "data/raw/trade_market.json", "data/raw/item-cn-jp.json", "data/cntokey.json", "data/cntotw.json", "data/jptotw.json"], tryOnDexLoaded);
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

    console.log('time:' + (Date.now() - lastTime));
    lastTime = Date.now();

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

    console.log('time:' + (Date.now() - lastTime));

    // someDataWorks();

    // ExportItemSource();

    // SaveMonMovesPost('teostra');
}

function ExportItemSource() {
    let itemSource = {};
    for (let qID in data.quests) {
        const quest = data.quests[qID];
        for (let i in quest.items) {
            const link = quest.items[i];
            if (itemSource[link.item] === undefined) {
                itemSource[link.item] = {}
            }
            if (itemSource[link.item].quests === undefined) {
                itemSource[link.item].quests = {}
            }
            itemSource[link.item].quests[qID] = {
                'num': link.num,
                'rate': link.rate
            }
        }
    }
    for (let mID in data.large_monsters) {
        const mon = data.large_monsters[mID]
        for (let rank in mon.items) {
            for (let iID in mon.items[rank]) {
                const link = mon.items[rank][iID];
                if (itemSource[iID] === undefined) {
                    itemSource[iID] = {}
                }
                if (itemSource[iID].large_monsters === undefined) {
                    itemSource[iID].large_monsters = {}
                }
                if (itemSource[iID].large_monsters[mID] === undefined) {
                    itemSource[iID].large_monsters[mID] = []
                }
                for (let method in link) {
                    itemSource[iID].large_monsters[mID].push({
                        'rank': rank,
                        'method': method,
                        'num': link[method].num,
                        'rate': link[method].rate
                    });
                }
            }
        }
    }
    for (let mID in data.small_monsters) {
        const mon = data.small_monsters[mID]
        for (let rank in mon.items) {
            for (let iID in mon.items[rank]) {
                const link = mon.items[rank][iID];
                if (itemSource[iID] === undefined) {
                    itemSource[iID] = {}
                }
                if (itemSource[iID].small_monsters === undefined) {
                    itemSource[iID].small_monsters = {}
                }
                if (itemSource[iID].small_monsters[mID] === undefined) {
                    itemSource[iID].small_monsters[mID] = []
                }
                for (let method in link) {
                    itemSource[iID].small_monsters[mID].push({
                        'rank': rank,
                        'method': method,
                        'num': link[method].num,
                        'rate': link[method].rate
                    })
                }
            }
        }
    }
    for (let mID in data.meowcenaries) {
        const dest = data.meowcenaries[mID];
        for (let targetID in dest) {
            const targetData = dest[targetID];
            const targetType = targetData['target_type']
            const rankList = ['low_rank', 'high_rank']
            for (let i in rankList) {
                const rank = rankList[i];
                for (let i in targetData[rank]) {
                    const itemData = targetData[rank][i];
                    const iID = itemData.item;

                    if (itemSource[iID] === undefined) {
                        itemSource[iID] = {}
                    }
                    if (itemSource[iID].meowcenaries === undefined) {
                        itemSource[iID].meowcenaries = {}
                    }
                    if (itemSource[iID].meowcenaries[mID] === undefined) {
                        itemSource[iID].meowcenaries[mID] = []
                    }
                    console.log(itemData.item)
                    itemSource[iID].meowcenaries[mID].push({
                        'rank': rank,
                        'target': targetID,
                        'target_type': targetType,
                        'num': itemData.num,
                        'rare': itemData.rare
                    })
                }
            }
        }
    }
    let outputData = { 'item_source': itemSource }
    outputText(JSON.stringify(outputData));
}



function someDataWorks() {
    let output = {
        'large_monsters': {},
        'new': {}
    }
    for (let i in data['0507']) {
        let fromData = data['0507'][i];
        let foundID = "";
        for (let mID in data.large_monsters) {
            let mData = data.large_monsters[mID];
            if (mData.name.en == fromData.name_en || mData.name.jp == fromData.name_jp) {
                foundID = mID;
                break;
            }
        }
        if (foundID === "") {
            console.log(fromData.name);
        }
        if (data.large_monsters[foundID] !== undefined) {
            data.large_monsters[foundID].ref_id = fromData.id;
        }
    }
    output.large_monsters = data.large_monsters;

    outputText(JSON.stringify(output));


    // let output = {
    //     'equip_weapons': {}
    // }
    // for (let i in data.parsedweapon) {

    //     let wData = {};
    //     const fromData = data.parsedweapon[i];
    //     const wID = data.cntokey[fromData.name].key;

    //     wData = fromData;
    //     wData.category = data.cntokey[fromData.category].key;
    //     wData.name = data.temp_equip_weapons[wID].name;
    //     wData.description = data.temp_equip_weapons[wID].description;
    //     wData.cn_id = fromData.id;
    //     wData.next = [];

    //     delete wData.name_en;
    //     delete wData.created_at;
    //     delete wData.updated_at;
    //     delete wData.created_by;
    //     delete wData.id;
    //     delete wData._read_perm;
    //     delete wData._write_perm;
    //     delete wData.next;
    //     delete wData.previous;

    //     output.equip_weapons[wID] = wData;
    // }

    // for (let i in data.next) {
    //     const link = data.next[i];
    //     let wData = undefined;
    //     for (let j in output.equip_weapons) {
    //         if (output.equip_weapons[j].cn_id === link.id) {
    //             console.log(output.equip_weapons[j].cn_id)
    //             wData = output.equip_weapons[j];
    //             break;
    //         }
    //     }
    //     if (wData === undefined) {
    //         console.warn(link.name)
    //         continue;
    //     }
    //     if (IsNullOrEmpty(link.next) === false) {
    //         if (wData.next === undefined) {
    //             wData.next = [];
    //         }
    //         let trans = []
    //         let oirs = link.next.split('|')
    //         for (let k in oirs) {
    //             for (let l in output.equip_weapons) {
    //                 const tmp = output.equip_weapons[l];
    //                 if (tmp.cn_id === oirs[k]) {
    //                     trans.push(l)
    //                     break;
    //                 }
    //             }
    //         }
    //         wData.next = trans;
    //     }
    //     if (IsNullOrEmpty(link.previous) === false)
    //         for (let l in output.equip_weapons) {
    //             const tmp = output.equip_weapons[l];
    //             if (tmp.cn_id === link.previous) {
    //                 wData.previous = l
    //                 break;
    //             }
    //         }


    // }

    // outputText(JSON.stringify(output))

    return;
}



function GetKeyByCN(cnText) {
    if (data.cntokey[cnText] !== undefined) {
        return data.cntokey[cnText].key;
    } else if (data.cntokey2[cnText] !== undefined) {
        return data.cntokey2[cnText].key;
    } else {
        console.warn("no key " + cnText);
        return undefined
    }
}

function SaveMonMovesPost(monName) {

    let output = "";
    for (let i in data.moves[monName].moves) {
        let move = data.moves[monName].moves[i];
        output += move.name + "\n";
        if (move.recovery === "大")
            output += "(硬直大)" + "\n";

        output += "\n";

        if (!IsNullOrEmpty(move.condition))
            output += "條件：" + move.condition + "\n"
        if (!IsNullOrEmpty(move.preaction))
            output += "預兆：" + move.preaction + "\n"
        if (!IsNullOrEmpty(move.action))
            output += "動作：" + move.action + "\n"
        if (!IsNullOrEmpty(move.note))
            output += "備註：" + move.note + "\n"

        output += "\n\n";
    }

    saveTextFile(output);

    return
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

function sendGAEvent(eventName, paramsObj) {
    gtag('event', eventName, paramsObj);
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
    const ItemListComp = httpVueLoader("components/item_browse_all.vue");
    const ItemComp = httpVueLoader("components/item_main.vue");
    const WeaponListComp = httpVueLoader("components/weapon_browse_all.vue");
    const WeaponComp = httpVueLoader("components/weapon_main.vue");
    const QuestListComp = httpVueLoader("components/quest_browse_all.vue");
    const QuestComp = httpVueLoader("components/quest_main.vue");
    const MeowcenaryListComp = httpVueLoader("components/meowcenary_browse_all.vue");
    const MeowcenaryComp = httpVueLoader("components/meowcenary_main.vue");
    const EquipWeaponListComp = httpVueLoader("components/equip_weapon_browse_all.vue");
    const EquipWeaponComp = httpVueLoader("components/equip_weapon_main.vue");

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
                name: 'itemlist',
                path: '/item',
                component: ItemListComp,
                props: { items: GetData("items") }
            },
            {
                name: 'item',
                path: '/item/:name',
                component: ItemComp,
                props: { items: GetData("items"), sources: GetData('item_source') }
            },
            {
                name: 'questlist',
                path: '/quest',
                component: QuestListComp,
                props: { quests: GetData("quests") }
            },
            {
                name: 'quest',
                path: '/quest/:name',
                component: QuestComp,
                props: { quests: GetData("quests") }
            },
            {
                name: 'meowcenarylist',
                path: '/meowcenary',
                component: MeowcenaryListComp,
                props: { meowcenaries: GetData("meowcenaries") }
            },
            {
                name: 'meowcenary',
                path: '/meowcenary/:name',
                component: MeowcenaryComp,
                props: { meowcenaries: GetData("meowcenaries") }
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
            },
            {
                name: 'equip_weaponlist',
                path: '/equip_weapon',
                component: EquipWeaponListComp,
                props: { weapons: GetData("equip_weapons") }
            },
            {
                name: 'equip_weapon',
                path: '/equip_weapon/:name',
                component: EquipWeaponComp,
                props: { weapons: GetData("equip_weapons") }
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
