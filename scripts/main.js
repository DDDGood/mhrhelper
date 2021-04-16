
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
        LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/items.json", "data/quests.json", "data/item_source.json", "data/meowcenaries.json"], tryOnDexLoaded);
        // LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/items.json", "data/quests.json", "data/item_source.json", "data/meowcenaries.json", "data/raw/unpackedmon.json", "data/raw/item-cn-jp.json", "data/cntokey.json", "data/cntotw.json", "data/jptotw.json"], tryOnDexLoaded);
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

    // ExportItemSource();
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


    for (let id in data.large_monsters) {
        let mon = data.large_monsters[id];
        if (mon.hitdata['hitzone_image'] == undefined) {
            mon.hitdata['hitzone_image'] = "images/monsters/hitzone/" + id + ".png"
        }
        mon.hitdata['parts_old'] = mon.hitdata['parts'];
        mon.hitdata['parts'] = mon.hitdata['parts_new'];
        delete mon.hitdata['parts_new'];
    }
    outputText(JSON.stringify(data.large_monsters));




    return;

    let result = {};
    let problems = {};


    const PART_COLOR = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6", "#bfef45", "#fabed4", "#469990"];

    for (let i in data.unpackedmon.monsters) {
        const fromMon = data.unpackedmon.monsters[i];
        if (data.unpackedmon.monster_id[fromMon.id] === undefined)
            continue;
        const mID = data.unpackedmon.monster_id[fromMon.id].key;
        console.log(mID + '_' + fromMon.id);

        result[mID] = {};

        let parts = [];
        for (let j in fromMon.meat_data.meat_container) {
            const meatGroup = fromMon.meat_data.meat_container[j];
            let partNames = fromMon.collider_mapping.meat_map[j.toString()];
            if (partNames === undefined)
                continue;
            for (let k in partNames) {
                while (partNames[k].indexOf('：') > -1) {
                    partNames[k] = partNames[k].split('：')[partNames[k].split('：').length - 1];
                }
                while (partNames[k].indexOf('-') > -1) {
                    partNames[k] = partNames[k].split('-')[partNames[k].split('-').length - 1];
                }
                while (partNames[k].indexOf('　') > -1) {
                    partNames[k] = partNames[k].split('　')[partNames[k].split('　').length - 1];
                }
                while (partNames[k].indexOf('_') > -1) {
                    partNames[k] = partNames[k].split('_')[partNames[k].split('_').length - 1];
                }
                partNames[k] = partNames[k].trim();
                if (data.jptotw[partNames[k]] !== undefined) {
                    partNames[k] = data.jptotw[partNames[k]];
                } else {
                    for (let jpKey in data.jptotw) {
                        if (partNames[k].indexOf(jpKey) > -1) {
                            partNames[k] = partNames[k].replace(jpKey, data.jptotw[jpKey]);
                            // console.log(jpKey + ' to ' + data.jptotw[jpKey])
                        }
                    }
                }
                for (let phase in meatGroup.meat_group_info) {
                    let phaseData = meatGroup.meat_group_info[phase];
                    if (phase > 0)
                        problems[mID] = true
                    parts.push({
                        'part': partNames[k],
                        'hitzone_color': PART_COLOR[j],
                        'condition': (phase === 0 ? "通常" : phase),
                        'cut': phaseData['slash'],
                        'blunt': phaseData['strike'],
                        'ammo': phaseData['shell'],
                        'fire': phaseData['fire'],
                        'water': phaseData['water'],
                        'thunder': phaseData['elect'],
                        'ice': phaseData['ice'],
                        'dragon': phaseData['dragon'],
                        'dizzy': phaseData['piyo'],
                    })
                }
            }
            console.log(partNames.join(",") + ' phase:' + meatGroup.meat_group_info.length);
        }

        result[mID].parts = parts;
        data.large_monsters[mID].hitdata['parts_new'] = parts
    }
    // outputText(JSON.stringify(data.large_monsters));


    // outputText(JSON.stringify({
    //     "result": result,
    //     "problems": problems
    // }))
    return;


    // parse mhrise.com
    for (let i in data.parsedmon) {
        const fromMon = data.parsedmon[i];
        const toMon = data.large_monsters[i];
        if (toMon === undefined) {
            console.warn('cant find:' + i)
            continue
        }
        toMon.trait = fromMon.trait;
        toMon.weakness = fromMon.weakness;
        for (let j in toMon.weakness.weapon) {
            for (let k in toMon.weakness.weapon[j]) {
                toMon.weakness.weapon[j][k] = translateJP(toMon.weakness.weapon[j][k]);
            }
        }
    }

    outputText(JSON.stringify(data.large_monsters));


    return;



    //parse meowcenaries
    let destTrans = {}
    let meowcenaries = {}
    for (let i in data.parsedmeow) {
        const link = data.parsedmeow[i];
        const map = data.cntokey[link.map].key;
        const level = data.cntokey[link.level].key;
        let rare = false;
        let item = "";
        for (let j in data.item_cn_id) {
            cnData = data.item_cn_id[j];
            if (cnData.id === link.item) {
                item = data.cntokey[cnData.name].key;
                break;
            }
        }
        let target = "?";
        if (link.target.indexOf('（稀有）') > -1) {
            rare = true;
            link.target = link.target.replace('（稀有）', '');
        }
        if (data.cntokey2[link.target] != undefined)
            target = data.cntokey2[link.target].key;
        else if (data.cntokey[link.target] != undefined)
            target = data.cntokey[link.target].key;
        else
            console.warn("!!!" + link.target);

        targetType = "environment"
        if (data.large_monsters[target] !== undefined)
            targetType = "large_monster"
        else if (data.small_monsters[target] !== undefined)
            targetType = "small_monster"

        if (meowcenaries[map] == undefined)
            meowcenaries[map] = {};
        if (meowcenaries[map][target] == undefined)
            meowcenaries[map][target] = {
                'target_type': targetType, 'low_rank': [], 'high_rank': []
            };

        const mecData = {
            'item': item,
            'num': link.num,
            'rare': rare,
        };
        if (rare === false) {
            meowcenaries[map][target][level].splice(0, 0, mecData)
        } else {
            meowcenaries[map][target][level].push(mecData)
        }
        console.log(target)
    }
    outputText(JSON.stringify(meowcenaries));



    return;

    // parse weapon image
    let output = {}
    for (let enName in data.weapon_image) {
        const img = data.weapon_image[enName];
        const key = enName.toLowerCase().replaceAll(' ', '_').replaceAll("'", "").replaceAll("+", "_plus")
        console.log(key);
        for (let cnKey in data.cntokey) {
            if (data.cntokey[cnKey].key == key) {

                console.log(cnKey);
                output[cnKey] = "大剑/" + img;
            }
        }
    }

    outputText(JSON.stringify(output));

    return;

    for (let mID in data.large_monsters) {
        data.large_monsters[mID].materials = undefined;
    }
    for (let i in data.monster_item) {

        const link = data.monster_item[i];

        const mID = data.cntokey[link.monster.name].key;
        if (mID == undefined)
            console.warn("no mID: " + link.monster.name);
        let monster = data.large_monsters[mID];
        if (monster == undefined)
            monster = data.small_monsters[mID];
        if (monster == undefined) {
            console.warn("no Mon: " + link.monster.name)
            continue;
        }

        const iID = data.cntokey[link.item.name].key;
        if (iID == undefined)
            console.warn("no iID: " + link.item.name);

        let method = data.cntokey[link.method].key;
        let rank = data.cntokey[link.rank].key;
        let num = link.num;
        let rate = link.gailv;

        if (monster.items == undefined)
            monster.items = {};

        if (monster.items[rank] == undefined)
            monster.items[rank] = {}
        if (monster.items[rank][iID] == undefined)
            monster.items[rank][iID] = {}
        monster.items[rank][iID][method] = {
            'num': num,
            'rate': rate,
        }
    }

    // saveTextFile(JSON.stringify(data.small_monsters))

    // saveTextFile(JSON.stringify(data.large_monsters))



    return


    // for (let key in data.quests) {
    //     let quest = data.quests[key];
    //     quest.items = [];
    // }

    // for (let i in data.missionitem) {
    //     const link = data.missionitem[i];
    //     const iKey = GetKeyByCN(link.item.name);
    //     const qKey = GetKeyByCN(link.mission.name);
    //     let quest = data.quests[qKey];
    //     qItem = {
    //         "item": iKey,
    //         "num": link.num,
    //         "rate": link.gailv
    //     }
    //     if (quest.items === undefined)
    //         quest.items = [];
    //     quest.items.push(qItem);
    // }

    // for (let key in data.quests) {
    //     let quest = data.quests[key];
    //     if (quest.items != undefined)
    //         quest.items.sort((a, b) => (a.rate < b.rate) ? 1 : ((b.rate < a.rate) ? -1 : 0));
    // }


    for (let key in data.quests) {
        let quest = data.quests[key];
        quest.monsters = [];
    }

    for (let i in data.missionmon) {
        const link = data.missionmon[i];
        const key = GetKeyByCN(link.mission.name);
        let quest = data.quests[key];
        const monEN = link.monster.name_en;
        const mKey = monEN.toLowerCase().replaceAll(" ", "_");
        const mon = data.large_monsters[mKey];
        if (mon === undefined) {
            console.warn("no mon: " + quest.name + " key: " + mKey);
        } else {
            if (quest.monsters === undefined)
                quest.monsters = [];

            const qMon = {
                "monster": mKey,
                "hp": link.hp,
                "attack": link.attack,
                "parts": link.parts,
                "defense": link.defense,
                "aliment": link.ailment,
                "stun": link.stun,
                "stamina": link.stamina,
                "mount": link.mount
            }
            if (quest.success.indexOf(mon.name.tw) > -1) {
                let insertPos = 0;
                for (let j = 0; j < quest.monsters.length; j++) {
                    qmName = data.large_monsters[quest.monsters[j].monster].name.tw;
                    if (quest.success.indexOf(qmName) > -1) {
                        console.log("already mon " + qmName);
                        insertPos++;
                    }
                }
                console.log("is main target :" + quest.name + "-" + mon.name.tw + "-" + insertPos);
                quest.monsters.splice(insertPos, 0, qMon);
            } else {
                quest.monsters.push(qMon);
            }
        }
    }

    outputText(JSON.stringify(data.quests))

    // let quests = {};
    // for (let i in data.quests) {
    //     const quest = data.quests[i];
    //     qkey = ""
    //     qName = quest.name;
    //     if (data.cntokey[qName] !== undefined) {
    //         qkey = data.cntokey[qName].key;
    //     } else if (data.cntokey2[qName] !== undefined) {
    //         qkey = data.cntokey2[qName].key;
    //     } else {
    //         console.log("no key " + quest.name);
    //         continue;
    //     }
    //     if (data.cntotw[qName] !== undefined) {
    //         qName = data.cntotw[qName].key;
    //     } else if (data.cntotw2[qName] !== undefined) {
    //         qName = data.cntotw2[qName].key;
    //     } else {
    //         console.log("no name " + quest.name);
    //         continue;
    //     }
    //     qClient = quest.client;
    //     if (data.cntotw[qClient] !== undefined) {
    //         qClient = data.cntotw[qClient].key;
    //     } else if (data.cntotw2[qClient] !== undefined) {
    //         qClient = data.cntotw2[qClient].key;
    //     } else {
    //         console.log("no client " + quest.client);
    //         continue;
    //     }
    //     qData = {
    //         "name": qName,
    //         "type": quest.type,
    //         "star": quest.star,
    //         "client": qClient
    //     }
    //     if (quest.hasOwnProperty(qkey)) {
    //         console.log(qkey);
    //     }
    //     quests[qkey] = qData;
    // }

    // console.log(JSON.stringify(temp));

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

function getMatIDFromJP(jpName) {
    if (data["jptokey"][jpName] !== undefined) {
        // console.log("find id: " + jpName + " - " + i18n.messages.jp.data.items[jpName].name)
        return data["jptokey"][jpName].key
    }
    else
        console.log("can't find id: ")
    return jpName;
}

function translateJP(jpText) {
    let dic = {
        "ハチミツを食べている": "正在吃蜂蜜時",
        "魚を食べている時": "正在吃魚時",
        "音爆弾、閃光玉、罠にかかった時": "音爆彈、閃光彈、陷阱困住時",
        "炎熱蓄積状態中に頭を攻撃してダウン時": "炎熱蓄積狀態中攻擊頭部擊倒時",
        "炎熱蓄積中に頭攻撃してダウン時": "炎熱蓄積狀態中攻擊頭部擊倒時",
        "左右どちらかの脚を破壊": "破壞左腿或右腿",
        "頭または翼の部位破壊時": "頭或翼破壞時",
        "体力30%以下の時に耐久値を1回0にすると報酬": "體力值30%以下時將耐久值1回降到0的報酬",
        "持っている岩や卵を落とした時": "擊落手中的岩石或卵時",
        "音爆弾でダウンさせた時泥纏いを中断させた時攻撃を当てて泳ぎ状態から地上に出した時泥を剥がした時": "當音爆彈擊倒時，當中斷泥纏時，當將他從游泳狀態打回地面時，當剝去泥漿時",
        "音爆弾でダウンさせた時泥纏中断させた時攻撃を当てて泳ぎから地上に出した時泥を剥がした時": "當音爆彈擊倒時，當中斷泥纏時，當將他從游泳狀態打回地面時，當剝去泥漿時",
        "超帯電状態から通常状態に戻った時": "從超帶電恢復到正常狀態時",
        "超帶電から通常に戻った時": "從超帶電恢復到正常狀態時",
        "左右どちらかの爪を破壊": "破壞左爪或右爪",
        "切断属性": "切斷屬性",
        "泡まとい状態の解除時、爪とぎ時": "泡纏狀態解除時",
        "泡まといの解除時、爪とぎ時": "泡纏狀態解除時",
        "突進で地形にぶつかった時音爆弾で怯ませた時": "衝鋒撞到地形時，用音爆彈嚇它時",
        "疲れ状態で突進後にダウンした時": "疲勞狀態下衝鋒倒地",
        "疲れで突進後にダウンした時": "疲勞狀態下衝鋒倒地",
        "左右どちらかの爪の": "左爪或右爪",
        "を引きずって逃げる時": "瘸腿逃跑時",
        "帯電状態を解除させた時張り付いた壁からダメージを受けて落下時": "帶電狀態解除時，在牆上被打下來",
        "帯電解除させた時張り付いた壁からダメージを受けて落下時": "帶電狀態解除時，在牆上被打下來",
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
        "切断系の攻撃": "切斷系(斬)攻擊",
        "タテガミ破壊時": "鬃毛破壞時",
        "剥ぎ取り": "剝取",
        "本体": "本體",
        "落とし物": "掉落物",
        "ターゲット": "目標",
        "カッコ内は": "",
        "(破壊後)": "破壞後",
        "(泥纏い時)": "泥纏",
        "(怒り時)": "憤怒時",
        "通常時": "通常",
        "(満腹時)": "滿腹時",
        "(闘気硬化時)": "鬥氣硬化",
        "超帯電状態": "超帶電",
        "泥纏い": "泥纏",
        "状態": "",
        "9にする": "降到0",
        "0にする": "降到0",
        "耐久値を": "耐久值",
        "を": "",
        "と報酬": "報酬",
        "胴体": "身體",
        "前脚": "前腳",
        "後脚": "後腳",
        "尻尾": "尾巴",
        "尾先": "尾尖",
        "髪ヒレ": "髮鰭",
        "タテガミ": "鬃毛",
        "氷塊": "冰塊",
        "首・背": "頸・背",
        "尾根元": "尾根",
        "首下": "頸下",
        "回転中": "滾動中",
        "脚(糸)": "腳(絲)",
        "尻先": "尾尖",
        "ヒレ": "鰭",
        "ビレ": "鰭",
        "尻": "屁股",
        "首": "頸",
        "胴": "身",
        "脚": "腳",
        "尻": "屁股",
        "クチバシ": "嘴",
        "トサカ": "冠",
        "両角": "雙角",
        "片腕": "單腕",
        "片爪": "單爪",
        "片刃翼": "單刃翼",
        "片翼": "單翼",
        "片腕刃": "單腕刃"
    }
    let result = jpText;
    for (let key in dic) {
        if (result.includes(key))
            result = result.replace(key, dic[key]);
    };
    // if (result === jpText)
    //     console.log("no translate " + result);
    // else
    // console.log("translate " + jpText + " to " + result);
    return result;
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

function parseItems() {
    let items = {};
    for (let i in data.parseditems) {
        const itemFrom = data.parseditems[i];
        let key = ""
        let itemName = itemFrom.name;
        if (data.cntokey[itemName] !== undefined) {
            key = data.cntokey[itemName].key;
        }
        else {
            console.log("no key " + itemName);
        }
        if (data.cntotw[itemName] !== undefined) {
            itemName = data.cntotw[itemName].key
        } else {
            console.log("no name " + itemName);
        }
        let itemDesc = itemFrom.desc;
        if (data.cntotw[itemDesc] !== undefined) {
            itemDesc = data.cntotw[itemDesc].key;
            // console.log(itemDesc);
        } else {
            console.log("no desc " + itemDesc);
        }
        let itemImage = ""
        if (itemFrom.image !== undefined) {
            itemImage = "images" + itemFrom.image.substring(itemFrom.image.indexOf("/items/"));
            // itemImage = "images/items/" + key + ".png"
        }
        const itemData = {
            "name": itemName,
            "description": itemDesc,
            "image": itemImage
        };
        items[key] = itemData;
    }


    outputText(JSON.stringify(items));

}

function parseHitData() {



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


}

function parseMon() {


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

    for (let id in tempDic) {
        let item = tempDic[id];
        let target = data['large_monsters'][id];
        if (id !== "arzuros" && id !== "mizutsune" && id !== "great_izuchi" && id !== "rathian" && id !== "magnamalo") {
            console.log(target.name.tw + " no hitdata, do write");

            if (target.hitdata === undefined)
                target.hitdata = {}
            target.hitdata.parts = [];
            for (let i in item.meatQuality) {
                let parsedPart = item.meatQuality[i];

                let partName = parsedPart.part
                partName = translateJP(partName)
                // if (partTrans.hasOwnProperty(parsedPart.part)) {
                //     partName = partTrans[parsedPart.part];
                // }
                // else
                //     console.log("cant find part name:" + partName);

                let transCondition = parsedPart.partCondition === parsedPart.part ? "通常" : parsedPart.partCondition;
                transCondition = translateJP(transCondition);
                console.log("partCondition:" + transCondition);



                let partData = {
                    "part": partName,
                    "condition": transCondition,
                    "cut": parsedPart.cut,
                    "blunt": parsedPart.hit,
                    "ammo": parsedPart.shot,
                    "fire": parsedPart.fire,
                    "water": parsedPart.water,
                    "thunder": parsedPart.thunder,
                    "ice": parsedPart.ice,
                    "dragon": parsedPart.dragon
                };
                let inserted = false;
                for (let j in target.hitdata.parts) {
                    if (target.hitdata.parts[j].part === partData.part) {
                        const pos = parseInt(j, 10) + 1;
                        target.hitdata.parts.splice(pos, 0, partData);
                        inserted = true
                        break;
                    }
                }
                if (!inserted)
                    target.hitdata.parts.push(partData)
            }
        } else {
            console.log(target.name.tw + " has hitdata, no write");
        }


        target.materials = [];
        for (let j in item.boqu) {
            let box = item.boqu[j];
            let matData = {
                "source": box.buwei,
                "num": box.num,
            };
            matData.source = translateJP(matData.source);
            if (box.info !== undefined) {
                matData.info = translateJP(box.info);
                console.log(matData.info);
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


    // return;

    // for (let id in tempDic) {
    //     let item = tempDic[id];
    //     let target = data['large_monsters'][id];
    //     target.materials = [];
    //     for (let j in item.boqu) {
    //         let box = item.boqu[j];
    //         let matData = {
    //             "source": box.buwei,
    //             "num": box.num,
    //         };
    //         if (box.info !== undefined) {

    //             matData.info = box.info;
    //             for (let partJP in partTrans) {
    //                 if (matData.info.includes(partJP))
    //                     matData.info = matData.info.replace(partJP, partTrans[partJP]);
    //             }
    //             console.log(matData.info);
    //         }
    //         for (let partJP in partTrans) {
    //             if (matData.source.includes(partJP))
    //                 matData.source = matData.source.replace(partJP, partTrans[partJP]);
    //         }
    //         matData.low_rank = []
    //         for (let i in box.xia) {
    //             let jpName = box.xia[i].sucaiName;
    //             let itemCount = "1";
    //             let trySplitNum = jpName.split("x")
    //             if (trySplitNum.length > 1) {
    //                 jpName = trySplitNum[0];
    //                 itemCount = trySplitNum[1];
    //             }
    //             matData.low_rank.push({
    //                 "item": getMatIDFromJP(jpName),
    //                 "rate": box.xia[i].gailv,
    //                 "num": itemCount
    //             })
    //         }
    //         matData.high_rank = []
    //         for (let i in box.shang) {
    //             let jpName = box.shang[i].sucaiName;
    //             let itemCount = "1";
    //             let trySplitNum = jpName.split("x")
    //             if (trySplitNum.length > 1) {
    //                 jpName = trySplitNum[0];
    //                 itemCount = trySplitNum[1];
    //             }
    //             matData.high_rank.push({
    //                 "item": getMatIDFromJP(jpName),
    //                 "rate": box.shang[i].gailv,
    //                 "num": itemCount
    //             })
    //         }
    //         target.materials.push(matData);
    //     }
    // }


    // for (let id in data.large_monsters) {
    //     let mon = data.large_monsters[id];
    //     mon["icon_large"] = "images/monsters/icons/large/" + id + ".png";
    //     mon = moveObjectElement("icon_large", "icon", mon);
    //     data.large_monsters[id] = mon;
    // }

    saveTextFile(JSON.stringify(data.large_monsters));
}