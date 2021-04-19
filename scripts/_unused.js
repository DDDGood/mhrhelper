

function someDataWorks_back() {

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
        for (let j in fromMon.data_tune.enemy_parts_data) {
            const partData = fromMon.data_tune.enemy_parts_data[j];
            let partNames = fromMon.collider_mapping.part_map[j.toString()];
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
            }

            let part = {
                'part': partNames.join(","),
                'part_color': PART_COLOR[j],
                'stagger': partData['vital'],
                'extract': partData['extractive_type'].toLowerCase(),
            };

            for (let k in fromMon.data_tune.enemy_parts_break_data_list) {
                const breakData = fromMon.data_tune.enemy_parts_break_data_list[k];
                if (breakData.parts_group == j) {
                    // console.log("break");
                    part['break'] = [];
                    for (let l in breakData.parts_break_data_list) {
                        part['break'].push({
                            'vital': breakData.parts_break_data_list[l]['vital'],
                            'break_level': breakData.parts_break_data_list[l]['break_level']
                        });
                    }
                }
            }

            for (let k in fromMon.data_tune.enemy_parts_loss_data_list) {
                const lossData = fromMon.data_tune.enemy_parts_loss_data_list[k];
                if (lossData.parts_group == j) {
                    // console.log("loss");
                    damageTypeMap = {
                        'Slash': 'cut',
                        'Strike': 'blunt',
                        'Shell': 'ammo'
                    }
                    part['loss'] = {
                        'vital': lossData.parts_loss_data['vital'],
                        'damage_type': damageTypeMap[lossData.parts_loss_data['permit_damage_attr']]
                    };
                }
            }
            parts.push(part)
            console.log(partNames.join(","));
        }

        result[mID].parts = parts;
        data.large_monsters[mID]['partsdata'] = {};
        data.large_monsters[mID]['partsdata']['parts'] = parts
    }
    outputText(JSON.stringify(data.large_monsters));


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







function parseUnpackedHitData() {


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




















var currentLayer = 0;
var layer0;
var layer1;
var layer2;
var topbarlayer0;
var topbarlayer1;
var topbarlayer2;
var topbarlink01;
var topbarlink12;
var svg;
var moveInfo;

var currentMon = {};
var currentMonMoves = {};

function Setspecies(key) {

    var monlist = document.getElementById('monlist');
    var monBtns = monlist.getElementsByTagName('button');
    for (btn of monBtns) {

        if (key === '全部') {
            btn.style.display = "inline";
        } else {
            if (GetData("monster")[btn.children[1].innerHTML].species === key)
                btn.style.display = "inline";
            else
                btn.style.display = "none";
        }

    }

    OnSelectLayer(1, key);
}






function SetMon(key) {

    var monObj = GetData("monster")[key];
    panel.Refresh(monObj);
    currentMon = monObj;

    // panel.monData = obj;
    // panel.text = monObj.nameTW;

    // panel.monData = monObj;

    // var panel = new Vue({
    //     data: {
    //         name1: monObj.nameTW,
    //         name2: monObj.nameJP,
    //         name3: monObj.nameEN,
    //         species: monObj.species,
    //         icon: monObj.icon,
    //         image: monObj.image
    //     }
    // });

    // panel.$mount("#panel-basicinfo")

    // panel.Refresh(monObj);
    // SetElementById('title', monObj.nameTW);
    // SetElementById('namejp', monObj.nameJP);
    // SetElementById('nameen', monObj.nameEN);
    // SetElementById('species', monObj.species);

    // var icon = document.getElementById('monicon');
    // icon.setAttribute("src", IsNullOrEmpty(monObj.icon) ? "images/monsters/icons/icon_unknown.png" : monObj.icon);

    // var image = document.getElementById('monimage');
    // image.setAttribute("src", monObj.image);

    // if (monObj.hasOwnProperty("trait")) {
    // SetElementById('roar', monObj.trait.roar);
    // SetElementById('wind', monObj.trait.wind);
    // SetElementById('tremor', monObj.trait.tremor);
    // SetElementById('element', monObj.trait.element);
    // SetElementById('aliment', monObj.trait.aliment);
    // }

    // var weaponBlock = document.getElementById('weakness-weapon');
    // while (weaponBlock.children.length > 1) {
    //     weaponBlock.removeChild(weaponBlock.children[1]);
    // }
    // if (monObj.hasOwnProperty("weakness")) {
    // if (monObj.weakness.hasOwnProperty("weapon")) {
    //     for (var weakPart of monObj.weakness.weapon) {
    //         var row = CreateClassElement("div", "panel-block-1 panel-row margin");
    //         var name = CreateClassElement("div", "panel-block panel-text", weakPart.part);
    //         var cut = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.cut));
    //         var blunt = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.blunt));
    //         var ammo = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.ammo));
    //         row.appendChild(name);
    //         row.appendChild(cut);
    //         row.appendChild(blunt);
    //         row.appendChild(ammo);
    //         weaponBlock.appendChild(row);
    //     }
    //     // weaponBlock.style.paddingBottom = "2px";
    // }
    // if (monObj.weakness.hasOwnProperty("element")) {
    //     var elementData = {
    //         weakData: monObj.weakness.element,
    //         dataIDs: ["weakness-element-fire", "weakness-element-water", "weakness-element-thunder", "weakness-element-ice", "weakness-element-dragon"],
    //         dataKeys: ["fire", "water", "thunder", "ice", "dragon"],
    //         specialTextID: "weakness-element-special",
    //     };
    //     WriteWeaknessData(elementData);
    // }
    // if (monObj.weakness.hasOwnProperty("aliment")) {
    //     var alimentData = {
    //         weakData: monObj.weakness.aliment,
    //         dataIDs: ["weakness-aliment-poison", "weakness-aliment-sleep", "weakness-aliment-paralysis", "weakness-aliment-blast", "weakness-aliment-stun"],
    //         dataKeys: ["poison", "sleep", "paralysis", "blast", "stun"],
    //         specialTextID: "weakness-aliment-special",
    //     };
    //     WriteWeaknessData(alimentData);
    // }
    // if (monObj.weakness.hasOwnProperty("item")) {
    //     var itemData = {
    //         weakData: monObj.weakness.item,
    //         dataIDs: ["weakness-item-pitfalltrap", "weakness-item-shocktrap", "weakness-item-flashpod", "weakness-item-screamerpod"],
    //         dataKeys: ["pitfalltrap", "shocktrap", "flashpod", "screamerpod"],
    //         specialTextID: "weakness-item-special",
    //     };
    //     WriteWeaknessData(itemData);
    // }
    // }
    //    SetElementById('breakables', "可破壞部位：" + monObj.breakables);

    // description
    // var descSpan = SetElementById("description", "");
    // if (!IsNullOrEmpty(monObj.description)) {
    //     WriteDescriptionTexts(descSpan, monObj.description);
    // }
    // var detailSpan = SetElementById("detail", "");
    // // detail
    // if (!IsNullOrEmpty(monObj.detail)) {
    //     WriteDescriptionTexts(detailSpan, monObj.detail);
    // }

    //hit data
    // var hdTableBody = document.getElementById('tbody_hitdata');
    // while (hdTableBody.children.length > 1) {
    //     hdTableBody.removeChild(hdTableBody.children[1]);
    // }

    // for (var id = 0; id < monObj['parts'].length; id++) {
    //     var part = monObj['parts'][id];

    //     var trPart = CreateClassElement("tr", "panel-text");

    //     var tdPartName = document.createElement("td");
    //     tdPartName.innerHTML = part.name;
    //     trPart.appendChild(tdPartName);

    //     var tdPartState = document.createElement("td");
    //     tdPartState.innerHTML = part.state;
    //     trPart.appendChild(tdPartState);

    //     for (var i = 0; i < 8; i++) {
    //         var tdPartHitData = document.createElement("td");
    //         tdPartHitData.innerHTML = part.hitData[i];
    //         if (i < 3) {
    //             if (part.hitData[i] >= 45)
    //                 tdPartHitData.style.backgroundColor = "#FFCFCF";
    //         } else {
    //             if (part.hitData[i] >= 25)
    //                 tdPartHitData.style.backgroundColor = "#FFCFCF";
    //         }
    //         trPart.appendChild(tdPartHitData);
    //     }

    //     hdTableBody.appendChild(trPart);
    // }

    var referenceDiv = document.getElementById('reference');
    referenceDiv.innerHTML = "";
    //reference
    if (!IsNullOrEmpty(monObj.reference)) {
        for (var key in monObj.reference) {
            var link = CreateClassElement("a", "reference-link", key);
            link.setAttribute("href", monObj.reference[key]);
            referenceDiv.AppendNode(link);
        }
    }

    //moves
    // let movesData = GetData("moves");
    // var divMoves = document.getElementById('divmoves');
    // if (movesData.hasOwnProperty(key)) {
    //     divMoves.style.display = "block";
    //     currentMonMoves = movesData[key];
    //     var outlineSpan = SetElementById("moveoutline", "");
    //     if (!IsNullOrEmpty(currentMonMoves.outline)) {
    //         WriteDescriptionTexts(outlineSpan, currentMonMoves.outline);
    //     }

    //     //combos
    //     SetMonCombos();

    //     //reference
    //     if (!IsNullOrEmpty(currentMonMoves.reference)) {
    //         for (var key in currentMonMoves.reference) {
    //             var link = CreateClassElement("a", "reference-link", key);
    //             link.setAttribute("href", currentMonMoves.reference[key]);
    //             referenceDiv.appendChild(link);
    //         }
    //     }

    // } else {
    //     divMoves.style.display = "none";
    // }



    // OnSelectLayer(2, monObj.nameTW);
}

function WriteDescriptionTexts(root, fullText) {
    var descTexts = fullText.split("\n", -1);
    for (var text of descTexts) {
        if (text.startsWith("[img]")) {
            var img = CreateClassElement("img", "description-image");
            img.setAttribute('src', text.substring(5));
            root.appendChild(img);
        } else {
            var p = CreateClassElement("p", "description-text", IsNullOrEmpty(text) ? "<br>" : text);
            root.appendChild(p);
        }
    }
}

// function WriteWeaknessData(params) {

//     var specialCaseTextHandler = document.getElementById(params.specialTextID);
//     specialCaseTextHandler.innerHTML = "";
//     var specialCase = false;
//     var specialCaseText = "";
//     var specialCaseValues = []

//     var doms = [];
//     for (var id of params.dataIDs) {
//         var dom = document.getElementById(id)
//         doms.push(dom);
//         specialCaseValues.push("");
//     }

//     for (var weakState of params.weakData) {
//         if (weakState.condition === "normal") {
//             for (var i = 0; i < doms.length; i++) {
//                 doms[i].innerHTML = ParseStars(weakState[params.dataKeys[i]]);
//             }
//         } else {
//             if (specialCase === false) {
//                 specialCase = true;
//                 specialCaseText += weakState.condition;
//             } else {
//                 specialCaseText += "、" + weakState.condition;
//             }
//             for (var i = 0; i < specialCaseValues.length; i++) {
//                 specialCaseValues[i] += "<br>(" + ParseStars(weakState[params.dataKeys[i]]) + ")";
//             }
//         }
//     }
//     if (specialCase === true) {
//         specialCaseTextHandler.innerHTML = "(" + specialCaseText + ")";
//         for (var i = 0; i < doms.length; i++) {
//             doms[i].innerHTML += specialCaseValues[i];
//         }
//     }
// }

function SetMonCombos() {
    var divCombos = document.getElementById('combos');
    divCombos.innerHTML = "";

    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    divCombos.appendChild(svg);

    var normalCondition = CreateClassElement("div", "combo-condition-container-normal");
    divCombos.appendChild(normalCondition);

    for (var id = 0; id < currentMonMoves['moves'].length; id++) {
        var move = currentMonMoves['moves'][id];
        if (move.onlyincombo == false) {

            var nodeFlex = CreateClassElement("div", "flexboxrow");
            if (!IsNullOrEmpty(move.condition))
                FindOrAddComboConditionContainer(move.condition).appendChild(nodeFlex);
            else
                normalCondition.appendChild(nodeFlex);

            var rootFlex = CreateMoveNode(move);
            var marginLeftVW = 2;
            var marginLeftPX = Math.ceil((window.innerWidth * marginLeftVW / 100));
            rootFlex.style.marginLeft = marginLeftPX + "px";
            nodeFlex.appendChild(rootFlex);
        }
    }

    for (var id = 0; id < currentMonMoves['combos'].length; id++) {
        var combo = currentMonMoves['combos'][id];
        var root = combo.nodes[combo.root];

        var container = normalCondition;
        if (!IsNullOrEmpty(combo.condition))
            container = FindOrAddComboConditionContainer(combo.condition);

        AppendNode(root, container, combo.nodes, combo.condition);

        if (!IsNullOrEmpty(combo.note)) {

        }
    }
}







function OnSelectLayer(layer, label) {
    OnClickCloseMoveInfo();
    switch (layer) {
        case 0:

            $("#layer0").show();
            $("#layer1").hide();
            $("#layer2").hide();
            $("#topbarlayer0").show();
            $("#topbarlayer1").hide();
            $("#topbarlayer2").hide();

            // layer0.style.display = "block";
            // layer1.style.display = "none";
            // layer2.style.display = "none";
            // topbarlayer0.style.display = "inline";
            // topbarlayer1.style.display = "none";
            // topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "none";
            topbarlayer1.nextElementSibling.style.display = "none";
            break;
        case 1:

            $("#layer0").hide();
            $("#layer1").show();
            $("#layer2").hide();
            $("#topbarlayer0").show();
            $("#topbarlayer1").show();
            $("#topbarlayer2").hide();
            // layer0.style.display = "none";
            // layer1.style.display = "block";
            // layer2.style.display = "none";
            // topbarlayer0.style.display = "inline";
            // topbarlayer1.style.display = "inline";
            // topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#31363D';
            topbarlayer1.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "flex";
            topbarlayer1.nextElementSibling.style.display = "none";
            if (label)
                topbarlayer1.innerHTML = label;
            break;
        case 2:
            $("#layer0").hide();
            $("#layer1").hide();
            $("#layer2").show();
            $("#topbarlayer0").show();
            $("#topbarlayer1").show();
            $("#topbarlayer2").show();
            // layer0.style.display = "none";
            // layer1.style.display = "none";
            // layer2.style.display = "block";
            // topbarlayer0.style.display = "inline";
            // topbarlayer1.style.display = "inline";
            // topbarlayer2.style.display = "inline";
            topbarlayer0.style.background = '#31363D';
            topbarlayer1.style.background = '#31363D';
            topbarlayer2.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "flex";
            topbarlayer1.nextElementSibling.style.display = "flex";
            if (label)
                topbarlayer2.innerHTML = label;
            break;
    }
}

function CreateLine(x1, y1, x2, y2) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    return line;
}
function CreateText(innerHTML, x, y) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.innerHTML = innerHTML;
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('inline-size', '20');
    return text;
}

function createSVGtext(caption, x, y) {
    //  This function attempts to create a new svg "text" element, chopping
    //  it up into "tspan" pieces, if the caption is too long
    //
    var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //    var textNode = document.createTextNode(caption);
    //    svgText.appendChild(textNode);
    //    svgText.setAttributeNS(null, 'x', x);
    //    svgText.setAttributeNS(null, 'y', y);
    //    return svgText;

    //  The following two variables should really be passed as parameters
    var MAXIMUM_CHARS_PER_LINE = 9;
    var LINE_HEIGHT = CheckMobile() ? 9 : 16;

    var words = caption.split("");
    var line = "";

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n];
        if (testLine.length > MAXIMUM_CHARS_PER_LINE) {
            //  Add a new <tspan> element
            var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', x);
            svgTSpan.setAttributeNS(null, 'y', y);

            var tSpanTextNode = document.createTextNode(line);
            svgTSpan.appendChild(tSpanTextNode);
            svgText.appendChild(svgTSpan);

            line = words[n];
            y += LINE_HEIGHT;
        } else {
            line = testLine;
        }
    }

    var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTSpan.setAttributeNS(null, 'x', x);
    svgTSpan.setAttributeNS(null, 'y', y);

    var tSpanTextNode = document.createTextNode(line);
    svgTSpan.appendChild(tSpanTextNode);

    svgText.appendChild(svgTSpan);

    return svgText;
}


function GetMoveInfoPanel() {
    if (moveInfo === undefined) {
        moveInfo = document.getElementById("panel-moveinfo");
    }

    return moveInfo;
}


function SetCombo() {
    let divCombos = this.$refs.combos;
    divCombos.innerHTML = "";

    if (this.movedata == undefined) return;

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    divCombos.appendChild(svg);

    var normalCondition = CreateClassElement(
        "div",
        "combo-condition-container-normal"
    );
    divCombos.appendChild(normalCondition);

    for (var id = 0; id < this.movedata["moves"].length; id++) {
        var move = this.movedata["moves"][id];
        if (move.onlyincombo == false) {
            var nodeFlex = CreateClassElement("div", "flexboxrow");
            if (!IsNullOrEmpty(move.condition))
                this.FindOrAddComboConditionContainer(move.condition).appendChild(
                    nodeFlex
                );
            else normalCondition.appendChild(nodeFlex);

            var rootFlex = this.CreateMoveNode(move);
            var marginLeftVW = 2;
            var marginLeftPX = Math.ceil(
                (window.innerWidth * marginLeftVW) / 100
            );
            rootFlex.style.marginLeft = marginLeftPX + "px";
            nodeFlex.appendChild(rootFlex);
        }
    }

    for (var id = 0; id < this.movedata["combos"].length; id++) {
        var combo = this.movedata["combos"][id];
        var root = combo.nodes[combo.root];

        var container = normalCondition;
        if (!IsNullOrEmpty(combo.condition))
            container = this.FindOrAddComboConditionContainer(combo.condition);

        this.AppendNode(root, container, combo.nodes, combo.condition);

        if (!IsNullOrEmpty(combo.note)) {
            //todo
        }
    }
}

function FindOrAddComboConditionContainer(condition) {
    let divCombos = this.$refs.combos;
    var findContainer;
    for (var container of divCombos.children) {
        if (container.id === condition) findContainer = container;
    }
    if (!findContainer) {
        findContainer = CreateClassElement("div", "combo-condition-container");
        findContainer.id = condition;
        var conditionText = CreateClassElement(
            "div",
            "combo-condition-text",
            condition
        );
        findContainer.appendChild(conditionText);
        divCombos.appendChild(findContainer);
    }
    return findContainer;
}
function AppendNode(node, container, nodeList, condition) {
    if (node === undefined) return;

    var nodeFlex = CreateClassElement("div", "flexboxrow");
    container.appendChild(nodeFlex);

    var move = this.movedata["moves"].find((x) => x.name === node.move);
    var rootFlex;
    if (move === undefined)
        rootFlex = CreateClassElement("button", "flexitem", node.move);
    else var rootFlex = this.CreateMoveNode(move);
    nodeFlex.appendChild(rootFlex);

    if (container.parentElement.id !== "combos") {
        var fromNode = nodeFlex.parentElement.previousSibling;
        window.setTimeout(function () {
            var rect = rootFlex.getBoundingClientRect();
            var rectSVG = svg.getBoundingClientRect();
            var rectFrom = fromNode.getBoundingClientRect();

            var fromX = rectFrom.right - rectSVG.left;
            var fromY = (rectFrom.top + rectFrom.bottom) / 2 - rectSVG.top;
            var toX = rect.left - rectSVG.left;
            var toY = (rect.top + rect.bottom) / 2 - rectSVG.top;

            var line = CreateLine(fromX, fromY, toX, toY);
            svg.appendChild(line);

            if (condition !== undefined && condition !== "") {
                var text = createSVGtext(
                    condition,
                    (fromX + toX) / 2,
                    (fromY + toY) / 2
                );
                svg.appendChild(text);
            }
        }, 200);
    }

    var linksFlex = CreateClassElement("div", "flexboxcolumn");
    nodeFlex.appendChild(linksFlex);

    var maxConditionTextLength = 0;
    for (var link of node.links) {
        var linkNodeID = link.node;
        var linkNode = nodeList[linkNodeID];
        if (link.condition && link.condition.length > maxConditionTextLength) {
            maxConditionTextLength = link.condition.length;
        }
        this.AppendNode(linkNode, linksFlex, nodeList, link.condition);
    }

    var marginLeftVW = 2;
    var marginRightVW = 2;
    if (maxConditionTextLength > 0) {
        marginRightVW = Math.min(Math.max(maxConditionTextLength * 2.5, 2), 20);
    }
    var marginLeftPX = Math.ceil((window.innerWidth * marginLeftVW) / 100);
    var marginRightPX = Math.ceil((window.innerWidth * marginRightVW) / 100);
    rootFlex.style.marginLeft = marginLeftPX + "px";
    rootFlex.style.marginRight = marginRightPX + "px";
}
function CreateMoveNode(move) {
    var moveFlex = CreateClassElement("button", "flexitem", "");
    var moveName = CreateClassElement("div", "movebutton-name", move.name);
    moveFlex.appendChild(moveName);
    // 大硬直
    if (move.recovery === "大") {
        var tag = CreateClassElement("div", "movebutton-tag", "硬直大");
        moveFlex.appendChild(tag);
    }
    // moveFlex.setAttribute("v-on:click", "TestClick");
    moveFlex.addEventListener("click", function () {
        this.currentmove = move;
        this.aaa = "onclick";
        console.log(this.currentmove.name);
    });
    moveFlex.addEventListener("click", this.TestClick);
    return moveFlex;
}

function OnClickMoveButton(moveName) {
    console.log("CLICK");
    if (this.movedata == undefined || !this.movedata.hasOwnProperty(move))
        return;
    let move = this.movedata[moveName];

    var panel = this.$refs.moveinfopanel();
    panel.style.display = "block";
    panel.style.top = window.pageYOffset + 200 + "px";
    panel.addEventListener("click", this.OnClickCloseMoveInfo);

    SetElementById("moveinfo-title", move.name);

    var video = document.getElementById("moveinfo-video");
    var altText = video.previousElementSibling;
    if (IsNullOrEmpty(move.image)) {
        video.style.display = "none";
        altText.style.display = "block";
    } else {
        video.style.display = "block";
        altText.style.display = "none";
        video.setAttribute("preload", "auto");
        video.setAttribute("autoplay", "autoplay");
        video.setAttribute("loop", "loop");
        video.setAttribute("type", "video/mp4");
        var source = video.children[0];
        source.setAttribute("src", move.image);
        video.load();
        video.play();
    }

    var preaction = document.getElementById("moveinfo-preaction");
    if (!IsNullOrEmpty(move.preaction)) {
        preaction.parentNode.style.display = "flex";
        preaction.innerHTML = move.preaction;
    } else preaction.parentNode.style.display = "none";

    var action = document.getElementById("moveinfo-action");
    if (!IsNullOrEmpty(move.action)) {
        action.parentNode.style.display = "flex";
        action.innerHTML = move.action;
    } else action.parentNode.style.display = "none";

    var recovery = document.getElementById("moveinfo-recovery");
    if (!IsNullOrEmpty(move.recovery)) {
        recovery.parentNode.style.display = "flex";
        recovery.innerHTML = move.recovery;
    } else recovery.parentNode.style.display = "none";

    var note = document.getElementById("moveinfo-note");
    if (!IsNullOrEmpty(move.note)) {
        note.parentNode.style.display = "flex";
        note.innerHTML = move.note;
    } else note.parentNode.style.display = "none";
}
function OnClickCloseMoveInfo(e) {
    var panel = this.$refs.moveinfopanel();
    panel.style.display = "none";
    panel.removeEventListener("click", OnClickCloseMoveInfo);
}

// for (key in dexData) {
//     var mon = dexData[key];
//     if (mon.species !== "") {
//         if (speciesDictionary.hasOwnProperty(mon.species) == false) {
//             speciesDictionary[mon.species] = {};
//         }
//         speciesDictionary[mon.species][key] = dexData[key];
//     }

//     // var btn = CreateClassElement("BUTTON", "button-mon");
//     // btn.setAttribute("onclick", "SetMon('" + key + "')");
//     // var btnicon = new Image();
//     // btnicon.className = "image-button-mon-icon";
//     // btnicon.src = IsNullOrEmpty(mon.icon) ? "images/monsters/icons/icon_unknown.png" : mon.icon;
//     // var btnText = CreateClassElement("div", "text-button-mon-name", key);
//     // btn.appendChild(btnicon);
//     // btn.appendChild(btnText);
//     // monlist.appendChild(btn);
// }

// // var speciesList = document.getElementById('specieslist');
// // var allspeciesBtn = CreateClassElement("BUTTON", "btnspecies flex-2", "all");
// // allspeciesBtn.setAttribute("onclick", "Setspecies('全部')");
// // speciesList.appendChild(allspeciesBtn);
// // for (var specie in speciesDictionary) {
// //     var btn = CreateClassElement("BUTTON", "btnspecies flex-1", specie);
// //     btn.setAttribute("onclick", "Setspecies('" + specie + "')");
// //     speciesList.appendChild(btn);
// // }





function CreateClassElement(type, className, innerHTML) {
    var e = CreateSimpleElement(type, innerHTML);
    e.className = className;
    return e;
}

function CreateSimpleElement(type, innerHTML) {
    var e = document.createElement(type);
    if (innerHTML !== undefined) {
        e.innerHTML = innerHTML;
    }
    return e;
}

function SetElementById(id, innerHTML) {
    var e = document.getElementById(id);
    e.innerHTML = innerHTML;
    return e;
}



let converter;
function convertImageColor(input, hex) {
    if (!converter) {
        converter = {};
        converter.canvas = document.createElement("canvas");
        converter.ctx = converter.canvas.getContext("2d");
    }
    let canvas = converter.canvas;
    let ctx = converter.ctx;


    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    const rgb_float_array = [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255, 1.0];

    canvas.width = input.width;
    canvas.height = input.height;

    // var drawImage_st = new Date();
    ctx.drawImage(input, 0, 0, input.width, input.height);
    // console.log("drawImage time : " + (new Date() - drawImage_st) + " ms");
    // var getImageData_st = new Date();
    let dataArr = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log("getImageData time : " + (new Date() - getImageData_st) + " ms");

    // var foreach_st = new Date();
    dataArr.data.forEach(function (val, index, arr) {
        val *= rgb_float_array[index % 4];
        arr[index] = Math.min(Math.max(val, 0), 255);
    });
    // console.log("data foreach time : " + (new Date() - foreach_st) + " ms");
    // var putImageData_st = new Date();
    ctx.putImageData(dataArr, 0, 0);
    // console.log("putImageData time : " + (new Date() - putImageData_st) + " ms");

    input.src = canvas.toDataURL();
    input.onload = undefined;
}

// let image = new Image(1, 1);
// // because src is a cross region image...
// image.crossOrigin = "Anonymous";
// image.src = "https://images.pexels.com/photos/40997/mona-lisa-leonardo-da-vinci-la-gioconda-oil-painting-40997.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
// image.style.height = "40%";
// image.style.width = "20%";
// image.style.float = "left";
// image.onload = function () {
//     //  r,   g,   b,   a
//     convertImageColor(image, [1.0, 0.0, 0.0, 1.0]);
// };
// document.body.appendChild(image);