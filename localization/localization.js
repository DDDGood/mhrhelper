
var i18n = new VueI18n({
    locale: 'tw', // 語系可以先指定或之後指定
    fallbackLocale: 'tw',
});


InitLocalization();

function InitLocalization() {
    LoadLocaleData(['localization/tw.json', 'localization/en.json', 'localization/jp.json'], OnLocaleLoaded)
}

function LoadLocaleData(paths, callback) {
    localeData = {};
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
                i18n.setLocaleMessage(key, jsonData[key]);
            }
        }
        if (callback != undefined)
            callback();
    })
}
function OnLocaleLoaded() {
}
