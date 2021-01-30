
var data = {};
function GetData(key) {
    return data[key];
}
var speciesDictionary = {};


var time;
time = Date.now();
console.log("startTime:" + time);

$(document).ready(Initialize);

function Initialize() {

    var newtime = Date.now();
    console.log("startInit:" + (newtime - time));
    time = newtime;

    $("#wrapper").show();

    LoadData(['mhrdex.json', 'mhrmoves.json'], onDexLoaded);

}
function InitRouter() {
    Vue.use(VueRouter);
    const Foo = { template: '<div>foo</div>' }
    const Bar = httpVueLoader("temp.vue");
    const SpeciesListComp = httpVueLoader("mon_specieslist.vue");
    const MonListComp = httpVueLoader("mon_monlist.vue");
    const MonComp = httpVueLoader("mon_monster.vue");

    const router = new VueRouter({
        routes: [
            {
                name: 'home',
                path: '/',
                redirect: { path: '/mon' }
            },
            {
                name: 'test',
                path: '/test',
                component: Bar,
                props: { obj: "DDD" }
            },
            {
                name: 'monlist',
                path: '/mon',
                component: SpeciesListComp,
                props: { specieslist: speciesDictionary }
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
            }
        ]
    });
    new Vue({
        el: '#app',
        methods: {
            GetLayerTexts() {
                let decodePath = decodeURI(this.$router.currentRoute.path).substring(1);
                return decodePath.split('/');
            },
            GetCurrentLayer(id) {

                let success = false;
                let text = "";

                let decodePath = decodeURI(this.$router.currentRoute.path).substring(1);
                let tags = decodePath.split('/');

                // if (id <= tags.length) {
                //     success = true;
                //     text = tags[id];
                // }
                return {
                    // success: success,
                    texts: tags
                }
            }
        },
        router
    })
    return router;
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

    var newtime = Date.now();
    console.log("DexLoaded:" + (newtime - time));
    time = newtime;

    // var monlist = document.getElementById('monlist');

    let dexData = GetData("dex");

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

    // let searchParams = new URLSearchParams(location.search);
    // let navMon = searchParams.get('mon');
    // if (dexData.hasOwnProperty(navMon)) {
    //     SetMon(navMon);
    // }

    var newtime = Date.now();
    console.log("Finished:" + (newtime - time));
    time = newtime;

    let router = InitRouter();

    let searchParams = new URLSearchParams(location.search);
    let navMon = searchParams.get('mon');
    if (dexData.hasOwnProperty(navMon)) {
        router.push({
            path: "/mon/" + dexData[navMon].species + "/" + navMon
        });
    }
}


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

function ParseStars(text) {
    var value = parseInt(text, 10);
    var result = "–";
    if (!isNaN(value)) {
        if (value === 0) {
            result = "x";
        } else if (value > 0) {
            result = "";
            for (var i = 0; i < value; i++) {
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

