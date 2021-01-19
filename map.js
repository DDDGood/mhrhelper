
var map;
var mapResources;
var mapData;

var typeBtnDic = {};
var containerDic = {};

var RES_ICON_WIDTH_WINDOWS = 20;
var RES_ICON_WIDTH_MOBILE = 20;

try {
    document.addEventListener("DOMContentLoaded", test);

}
catch (e) {
    alert(e);
}



function test() {
    map = document.getElementById('map');
    // map.innerHTML = "";

    fetch('data/maps/mapresources.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(result => {
            mapResources = result;
            OnSelectMap('shrineruins');
        })
        .catch(error => {

        });



    // svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // map.appendChild(svg);

}

function OnSelectMap(mapName) {


    fetch('data/maps/data_' + mapName + '.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(result => {
            mapData = result;
            SetMapData(mapData);
        })
        .catch(error => {

        });


}

function SetMapData(mapData) {
    var resourseList = document.getElementById("resourse-list");
    resourseList.innerHTML = "";

    var map = document.getElementById("map");

    var mapDataContainer = document.getElementById("map-data");
    for (let resourseType in mapData) {
        if (!mapResources.hasOwnProperty(resourseType)) {
            continue;
        }
        mapResources[resourseType].show = true;
        var button = CreateClassElement("div", "resources-type-button");
        button.setAttribute("onclick", "OnSelectType('" + resourseType + "')");
        var typeicon = CreateClassElement("img", "resources-type-icon");
        typeicon.setAttribute("src", mapResources[resourseType].icon);
        button.appendChild(typeicon);
        var typeName = CreateClassElement("div", "resources-type-name", resourseType);
        button.appendChild(typeName);
        resourseList.appendChild(button);

        typeBtnDic[resourseType] = button;

        var container = CreateClassElement("div", "map-data-container");
        containerDic[resourseType] = container;
        map.appendChild(container);

        for (var position of mapData[resourseType]) {
            let posBtn = CreateClassElement("div", "resources-button");
            var icon = CreateClassElement("img", "resources-icon");
            icon.setAttribute("src", mapResources[resourseType].icon);
            posBtn.appendChild(icon);

            var width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
            posBtn.style.width = posBtn.style.height = width + "px";
            posBtn.style.left = position.coords[0] - width / 2 + 'px';
            posBtn.style.top = position.coords[1] - width / 2 + 'px';

            posBtn.onclick = function () {
                OnClickResource(posBtn, resourseType);
            };

            container.appendChild(posBtn);

        }
    }
}



function OnSelectType(type) {
    var container = containerDic[type];
    if (mapResources[type].show) {
        for (var e of container.children) {
            e.style.display = "none";
        }
        typeBtnDic[type].style.backgroundColor = "rgb(211, 211, 211)";
        mapResources[type].show = false;
    } else {
        for (var e of container.children) {
            e.style.display = "block";
        }
        typeBtnDic[type].style.backgroundColor = "rgb(89, 226, 84)";
        mapResources[type].show = true;
    }
}


function OnClickResource(e, resourseType) {
    // alert();
    var panel = document.getElementById("infopanel");
    panel.style.display = "block";
    panel.style.top = e.offsetTop + "px";
    panel.style.left = e.offsetLeft + "px";

    var description = document.getElementById("infopanel-description");
    description.innerHTML = mapResources[resourseType].description;
    // panel.addEventListener("click", ClosePanel);
}

function ClosePanel() {
    // alert("close");
    var panel = document.getElementById("infopanel");
    panel.style.display = "none";
    // panel.removeEventListener("click", ClosePanel);
}



//map function
function DataToMapCoords(x, y) {

}




// basic functions
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

function CheckMobile() {
    return (window.innerWidth < 1200);
}
