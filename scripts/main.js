
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

    LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', "data/smonster.json"], onDexLoaded);
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

    const dexData = GetData("dex");

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



    // let temp = {};
    // for (let id in data['endemics']) {
    //     let key = i18n.messages.en.endemics.name[id].toLowerCase().replace(' ', "_");
    //     let val = data['endemics'][id].name;
    //     temp[key] = val;
    // }

    // console.log(JSON.stringify(temp));

    // const win = window.open('about:blank', '_blank');
    // win.document.write(JSON.stringify(temp));

    // let temp = {};
    // for (let id in i18n.messages.en.endemics.name) {
    //     let key = i18n.messages.en.endemics.name[id].toLowerCase().replace(' ', "_");
    //     let val = i18n.messages.en.endemics.name[id];
    //     temp[key] = val;
    // }
    // console.log(JSON.stringify(temp));
}

function InitRouter() {
    Vue.use(VueRouter);
    // const Foo = { template: '<div>foo</div>' }
    // const Bar = httpVueLoader("temp.vue");
    const SpeciesListComp = httpVueLoader("components/mon_browse_species.vue");
    const MonListComp = httpVueLoader("components/mon_browse_monsters.vue");
    const newMonList = httpVueLoader("components/mon_browse_all.vue");
    const MonComp = httpVueLoader("components/mon_main.vue");
    const SMonsterListComp = httpVueLoader("components/smonster_browse_all.vue");
    const SMonsterComp = httpVueLoader("components/smonster_main.vue");
    const EndemicListComp = httpVueLoader("components/endemics_browse_all.vue");
    const EndemicComp = httpVueLoader("components/endemics_main.vue");

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
                props: { dex: GetData("dex"), specieslist: speciesDictionary }
            },
            {
                path: '/mon/:species',
                component: MonListComp,
                props: { specieslist: speciesDictionary, mondata: GetData("dex") }
            },
            {
                name: 'mon',
                path: '/mon/:species/:name',
                component: MonComp,
                props: { dex: GetData("dex"), moves: GetData("moves") }
            },
            {
                name: 'smonsterlist',
                path: '/smonster',
                component: SMonsterListComp,
                props: { smonsters: GetData("smonster") }
            },
            {
                name: 'smonster',
                path: '/smonster/:name',
                component: SMonsterComp,
                props: { smonsters: GetData("smonster") }
            },
            {
                name: 'endemiclist',
                path: '/endemics',
                component: EndemicListComp,
                props: { endemics: GetData("endemics") }
            },
            {
                name: 'endemics',
                path: '/endemics/:name',
                component: EndemicComp,
                props: { endemics: GetData("endemics") }
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
    let result = "–";
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