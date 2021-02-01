
var data = {};
function GetData(key) {
    return data[key];
}
var speciesDictionary = {};

$(document).ready(Initialize);

function Initialize() {
    $("#wrapper").show();
    LoadData(['data/mhrdex.json', 'data/mhrmoves.json'], onDexLoaded);
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

    const searchParams = new URLSearchParams(location.search);
    const navMon = searchParams.get('mon');
    if (dexData.hasOwnProperty(navMon)) {
        router.push({
            path: "/mon/" + dexData[navMon].species + "/" + navMon
        });
    }
}

function InitRouter() {
    Vue.use(VueRouter);
    // const Foo = { template: '<div>foo</div>' }
    // const Bar = httpVueLoader("temp.vue");
    const SpeciesListComp = httpVueLoader("components/mon_browse_species.vue");
    const MonListComp = httpVueLoader("components/mon_browse_monsters.vue");
    const MonComp = httpVueLoader("components/mon_main.vue");

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
        components: {
            topbar: httpVueLoader("components/topbar.vue")
        },
        router
    })
    return router;
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

