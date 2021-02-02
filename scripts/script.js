
var data = {};
function GetData(key) {
    return data[key];
}
var speciesDictionary = {};

$(document).ready(Initialize);

function Initialize() {
    $("#wrapper").show();
    LoadData(['data/mhrdex.json', 'data/mhrmoves.json', 'data/endemics.json'], onDexLoaded);
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
    new Vue({
        el: '#app',
        components: {
            topbar: httpVueLoader("components/topbar.vue")
        },
        router
    })
    return router;
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

function ParseDescriptionText(inputText) {
    let result = "";
    if (IsNullOrEmpty(inputText) === false) {
        const descTexts = inputText.split("\n", -1);
        for (const text of descTexts) {
            if (text.startsWith("[img]"))
                result +=
                    "<img class='description-image' src='" + text.substring(5) + "'>";
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

