
var vue;
var i18n;
var data = {};
function GetData(key) {
    return data[key];
}
var speciesDictionary = {};
function SetLocal(key) {
    const langData = GetData("localization")[key];
    if (langData !== undefined) {
        Object.deepExtend(data, langData);
    }
    i18n.locale = key;
    console.log(i18n.locale);
}

function doSomething(ob) {
    console.log(ob);
}

$(document).ready(Initialize);

function Initialize() {
    $("#wrapper").show();
    LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json', 'localization/data/en.json'], onDexLoaded);
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

    speciesDictionary["全部"] = {};
    for (key in dexData) {
        var mon = dexData[key];
        speciesDictionary["全部"][key] = mon;
        if (mon.species !== "") {
            if (speciesDictionary.hasOwnProperty(mon.species) == false) {
                speciesDictionary[mon.species] = {};
            }
            speciesDictionary[mon.species][key] = mon;
        }
    }

    const router = InitRouter();
    i18n = new VueI18n({
        locale: 'tw', // 語系可以先指定或之後指定
        fallbackLocale: 'tw',
        messages: messages
    });
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

    const searchParams = new URLSearchParams(location.search);
    const navMon = searchParams.get('mon');
    if (dexData.hasOwnProperty(navMon)) {
        router.push({
            path: "/mon/" + dexData[navMon].species + "/" + navMon
        });
    }

    if (data.hasOwnProperty('localization')) {
        data["localization"]["tw"] = {};
        for (const key in data) {
            if (key === "localization")
                continue;
            data["localization"]["tw"][key] = JSON.parse(JSON.stringify(data[key]));
        }
    }

    data = Vue.observable(data);

    // console.log(data.dex);
    // let temp = {}
    // for (let id in data.dex) {
    //     let mon = data.dex[id];
    //     let key = mon.name.tw;
    //     // let key = mon.name.en.trim().replace(" ", "_").toLowerCase();
    //     let value = mon.name.jp;
    //     temp[key] = value;
    // }
    // console.log(JSON.stringify(temp));
}

function InitRouter() {
    Vue.use(VueRouter);
    // const Foo = { template: '<div>foo</div>' }
    // const Bar = httpVueLoader("temp.vue");
    const SpeciesListComp = httpVueLoader("components/mon_browse_species.vue");
    const MonListComp = httpVueLoader("components/mon_browse_monsters.vue");
    const MonComp = httpVueLoader("components/mon_main.vue");
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