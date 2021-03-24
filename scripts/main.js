
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

    LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/small_monster.json", "data/weapons.json", "data/demo-hitdata.json"], onDexLoaded);
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


    // for (let id in data.large_monsters) {
    //     let mon = data.large_monsters[id];
    //     mon["icon_large"] = "images/monsters/icons/large/" + id + ".png";
    //     mon = moveObjectElement("icon_large", "icon", mon);
    //     data.large_monsters[id] = mon;
    // }
    // outputText(JSON.stringify(data.large_monsters));


    // console.log(JSON.stringify(temp));


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

function ParseStars(text) {
    const value = parseInt(text, 10);
    let result = "-";
    if (!isNaN(value)) {
        if (value === 0) {
            result = "x";
        } else if (value > 0) {
            result = "";
            for (let i = 0; i < value; i++) {
                result += "⭐";
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