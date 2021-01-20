
var map;
var mapResources;
var mapData;

var typeBtnDic = {};
var containerDic = {};

var mapInstances = {};
var currentPosition;
var currentType;

var RES_ICON_WIDTH_WINDOWS = 20;
var RES_ICON_WIDTH_MOBILE = 20;

var isEditMode = true;
var editPanelOpened = false;

try {
    document.addEventListener("DOMContentLoaded", test);
}
catch (e) {
    alert(e);
}



function test() {

    InitUploadButton();

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
            SetMapData(result);
            let mapImage = document.getElementById("map-image");
            mapImage.onclick = OnClickMap;
        })
        .catch(error => {

        });


}

function SetMapData(data) {

    ClearMap();
    mapData = data;
    // console.log(result);

    let map = document.getElementById("map");
    let resourseList = document.getElementById("resourse-list");

    for (let resourseType in mapResources) {
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
    }

    // var mapDataContainer = document.getElementById("map-data");
    for (let resourseType in mapData) {
        if (!mapResources.hasOwnProperty(resourseType)) {
            continue;
        }
        for (var position of mapData[resourseType]) {
            DrawPosition(position, resourseType)
        }
    }
}
function ClearMap() {
    let resourseList = document.getElementById("resourse-list");
    resourseList.innerHTML = "";
    typeBtnDic = {};
    let map = document.getElementById("map");
    for (var type in containerDic) {
        map.removeChild(containerDic[type]);
    }
    containerDic = {};
}


function DrawPosition(position, resourseType) {
    let posBtn = CreateClassElement("div", "resources-button");
    var icon = CreateClassElement("img", "resources-icon");
    icon.setAttribute("src", mapResources[resourseType].icon);
    posBtn.appendChild(icon);

    var width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
    posBtn.style.width = posBtn.style.height = width + "px";
    SetPositionCenter(posBtn, position.coords[0], position.coords[1]);
    posBtn.onclick = function () {
        OnClickPosition(position, resourseType);
    };

    if (!containerDic.hasOwnProperty(resourseType)) {
        var container = CreateClassElement("div", "map-data-container");
        containerDic[resourseType] = container;
        map.appendChild(container);
    }
    containerDic[resourseType].appendChild(posBtn);
}

//Edit 
function OnClickMap(event) {
    // alert(event.clientX);
    if (editPanelOpened)
        return;

    let map = document.getElementById("map");

    let mapCoordX = event.clientX - map.offsetLeft;
    let mapCoordY = event.clientY - map.offsetTop;

    // alert("clientX:" + event.clientX + " clientY:" + event.clientY);

    let target = document.getElementById("edit-position-target");
    target.style.display = "block";
    let width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
    target.style.width = target.style.height = width + "px";
    SetPositionCenter(target, mapCoordX, mapCoordY);

    let button = document.getElementById("edit-add-button");
    button.style.display = "block";
    button.style.left = event.clientX + width / 2 + "px";
    button.style.top = event.clientY + width / 2 + "px";

    // alert("position changes " + event.clientX + "," + event.clientY);
    currentPosition = {
        coords: [mapCoordX, mapCoordY]
    }
}
function OnClickAddButton() {
    let button = document.getElementById("edit-add-button");
    button.style.display = "none";


    OpenEditPositionPanel(currentPosition, "", true);
}
function OpenEditPositionPanel(position, resourseType, isAdd) {
    let button = document.getElementById("edit-add-button");
    button.style.display = "none";

    if (isAdd) {
        document.getElementById("edit-position-confirm-edit").style.display = "none";
        document.getElementById("edit-position-confirm-add").style.display = "block";
    } else {
        document.getElementById("edit-position-confirm-edit").style.display = "block";
        document.getElementById("edit-position-confirm-add").style.display = "none";
    }

    let editPanel = document.getElementById("edit-position-panel");
    editPanel.style.display = "block";
    let width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
    editPanel.style.left = position.coords[0] + width / 2 + "px";
    editPanel.style.top = position.coords[1] + width / 2 + "px";

    document.getElementById("edit-position-type").innerHTML = currentType;
    let typeList = document.getElementById("edit-position-type-list");
    while (typeList.children.length > 0) {
        typeList.removeChild(typeList.children[0]);
    }
    for (let type in mapResources) {
        let typebtn = CreateClassElement("button", "edit-position-type-button", type);
        typeList.appendChild(typebtn);
        typebtn.onclick = function () { currentType = type; document.getElementById("edit-position-type").innerHTML = currentType; }
    }
    editPanelOpened = true;
}
function CloseEditPositionPanel() {
    let editPanel = document.getElementById("edit-position-panel");
    editPanel.style.display = "none";
    let target = document.getElementById("edit-position-target");
    target.style.display = "none";
    editPanelOpened = false;
}
function ConfirmAddPosition() {
    if (!mapData.hasOwnProperty(currentType))
        mapData[currentType] = [];
    mapData[currentType].push(currentPosition);
    DrawPosition(currentPosition, currentType);
    CloseEditPositionPanel();
}
function ConfirmEditPosition() {
    alert(mapData[currentType].indexOf(currentPosition));
}
function CreateDownloadFile() {

}
function SaveData() {
    let text = JSON.stringify(mapData);
    let file = new Blob([text], { type: 'text/json' });
    let url = window.URL.createObjectURL(file);

    let a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    a.href = url;
    a.download = "map.json";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
}
function InitUploadButton() {
    document.getElementById('contentFile').onchange = function (evt) {
        console.log('FILE chaned');
        try {
            let files = evt.target.files;
            if (!files.length) {
                alert('No file selected!');
                return;
            }
            let file = files[0];
            let reader = new FileReader();
            const self = this;
            reader.onload = (event) => {
                console.log('FILE CONTENT', event.target.result);

                ClearMap();
                SetMapData(JSON.parse(event.target.result));
            };
            reader.readAsText(file);
        } catch (err) {
            console.error(err);
        }
    }
}



function SetPositionCenter(element, x, y) {
    let width = parseInt(element.style.width, 10);
    element.style.left = x - width / 2 + 'px';
    let height = parseInt(element.style.height, 10);
    element.style.top = y - height / 2 + 'px';
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


function OnClickPosition(position, resourseType) {

    currentPosition = position;
    currentType = resourseType;
    // alert();
    if (!isEditMode)
        ShowInfoPanel(position, resourseType);
    else
        OpenEditPositionPanel(position, resourseType, false);
}

function ShowInfoPanel(position, resourseType) {
    var panel = document.getElementById("infopanel");
    panel.style.display = "block";
    panel.style.top = position.coords[0] + "px";
    panel.style.left = position.coords[1] + "px";

    var description = document.getElementById("infopanel-description");
    description.innerHTML = mapResources[resourseType].description;
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
