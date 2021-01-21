
var map;
var mapResources;
var mapData;

var typeBtnDic = {};
var typeContainers = {};

var pinInstances = {};
var idCount = 0;
var currentPin;

var currentPosition;
var currentType;
var currentPositionButton;

var RES_ICON_WIDTH_WINDOWS = 20;
var RES_ICON_WIDTH_MOBILE = 20;

var isEditMode = false;
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

}

function OnClickEditModeButton() {
    if (isEditMode) {
        document.getElementById("edit-mode-button").innerHTML = "開啟編輯模式";
        isEditMode = false;
    }
    else {
        document.getElementById("edit-mode-button").innerHTML = "關閉編輯模式";
        isEditMode = true;
    }
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
        var button = CreateTypeButtonWithIcon(resourseType);
        button.setAttribute("onclick", "OnSelectType('" + resourseType + "')");
        resourseList.appendChild(button);
        typeBtnDic[resourseType] = button;
        var container = CreateClassElement("div", "map-data-container");
        typeContainers[resourseType] = container;
        map.appendChild(container);
    }

    // var mapDataContainer = document.getElementById("map-data");
    for (let resourseType in mapData) {
        if (!mapResources.hasOwnProperty(resourseType)) {
            continue;
        }
        for (var position of mapData[resourseType]) {
            DrawPin(position, resourseType)
        }
    }
}
function CreateTypeButtonWithIcon(type) {
    var button = CreateClassElement("div", "resources-type-button");
    var typeicon = CreateClassElement("img", "resources-type-icon");
    typeicon.setAttribute("src", mapResources[type].icon);
    button.appendChild(typeicon);
    var typeName = CreateClassElement("div", "resources-type-name", type);
    button.appendChild(typeName);
    return button;
}
function ClearMap() {
    let resourseList = document.getElementById("resourse-list");
    resourseList.innerHTML = "";
    typeBtnDic = {};
    let map = document.getElementById("map");
    for (var type in typeContainers) {
        map.removeChild(typeContainers[type]);
    }
    typeContainers = {};
    pinInstances = {};
}


function DrawPin(position, resourseType) {

    if (!typeContainers.hasOwnProperty(resourseType)) {
        var container = CreateClassElement("div", "map-data-container");
        typeContainers[resourseType] = container;
        map.appendChild(container);
    }

    let id = idCount + "-" + resourseType;
    idCount += 1;

    let pinButton = CreateClassElement("div", "resources-button");
    pinButton.id = id;

    var icon = CreateClassElement("img", "resources-icon");
    icon.setAttribute("src", mapResources[resourseType].icon);
    pinButton.appendChild(icon);

    var width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
    pinButton.style.width = pinButton.style.height = width + "px";
    SetPositionCenter(pinButton, position.coords[0], position.coords[1]);
    pinButton.onclick = function (event) {
        currentPositionButton = event.target;
        OnClickPin(id);
    };

    pinInstances[id] = {
        id: id,
        type: resourseType,
        button: pinButton,
        position: position
    }

    typeContainers[resourseType].appendChild(pinButton);
}

//Edit 
function OnClickMap(event) {
    // alert(event.clientX);
    if (!isEditMode || editPanelOpened)
        return;

    let map = document.getElementById("map");

    let mapCoordX = event.pageX - map.offsetLeft;
    let mapCoordY = event.pageY - map.offsetTop;

    // alert("clientX:" + event.clientX + " clientY:" + event.clientY);

    //Show Target
    let target = document.getElementById("edit-position-target");
    target.style.display = "block";
    let width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
    target.style.width = target.style.height = width + "px";
    SetPositionCenter(target, mapCoordX, mapCoordY);

    let button = document.getElementById("edit-add-button");
    button.style.display = "block";
    button.style.left = map.offsetLeft + mapCoordX + width / 2 + "px";
    button.style.top = map.offsetTop + mapCoordY + width / 2 + "px";

    // alert("position changes " + event.clientX + "," + event.clientY);
    currentPosition = {
        coords: [mapCoordX, mapCoordY]
    }
}
function OnClickAddButton() {
    let button = document.getElementById("edit-add-button");
    button.style.display = "none";

    OpenEditPinPanel(true);
}
function OpenEditPinPanel(isAdd) {

    let position = isAdd ? currentPosition : currentPin.position;
    let type = isAdd ? currentType : currentPin.type;
    let button = document.getElementById("edit-add-button");
    button.style.display = "none";

    if (isAdd) {
        document.getElementById("edit-position-confirm-edit").style.display = "none";
        document.getElementById("edit-position-confirm-delete").style.display = "none";
        document.getElementById("edit-position-confirm-add").style.display = "block";
    } else {
        document.getElementById("edit-position-confirm-edit").style.display = "block";
        document.getElementById("edit-position-confirm-delete").style.display = "block";
        document.getElementById("edit-position-confirm-add").style.display = "none";
    }

    let editPanel = document.getElementById("edit-position-panel");
    editPanel.style.display = "block";
    let width = CheckMobile() ? RES_ICON_WIDTH_MOBILE : RES_ICON_WIDTH_WINDOWS;
    editPanel.style.left = map.offsetLeft + position.coords[0] + width / 2 + "px";
    editPanel.style.top = map.offsetTop + position.coords[1] + width / 2 + "px";

    document.getElementById("edit-position-type").innerHTML = type;
    let typeList = document.getElementById("edit-position-type-list");
    while (typeList.children.length > 0) {
        typeList.removeChild(typeList.children[0]);
    }
    for (let existType in mapResources) {
        let typeBtn = CreateClassElement("button", "edit-position-type-button", existType);
        typeList.appendChild(typeBtn);
        typeBtn.onclick = function () {
            ChangeCurrentType(existType);
            if (!isAdd)
                currentPin.button.children[0].setAttribute("src", mapResources[existType].icon);
            document.getElementById("edit-position-type").innerHTML = existType;
        }
    }
    editPanelOpened = true;
}
function CloseEditPinPanel() {
    let editPanel = document.getElementById("edit-position-panel");
    editPanel.style.display = "none";
    let target = document.getElementById("edit-position-target");
    target.style.display = "none";

    currentPin = undefined;
    editPanelOpened = false;
}
function ConfirmAddPin() {
    AddMapData(currentType, currentPosition);
    DrawPin(currentPosition, currentType);
    CloseEditPinPanel();
}
function AddMapData(type, position) {
    if (!mapData.hasOwnProperty(type))
        mapData[type] = [];
    mapData[type].push(position);
}
function DeletePin() {
    if (currentPin === undefined) {
        alert("ERROR on delete pin: no currentPin");
        return;
    } else if (!pinInstances.hasOwnProperty(currentPin.id)) {
        alert("ERROR on delete pin: no ID " + currentPin.id);
        return;
    }
    typeContainers[currentPin.type].removeChild(currentPin.button);

    let index = mapData[currentPin.type].indexOf(currentPin.position);
    if (index > -1) {
        mapData[currentPin.type].splice(index, 1);
    }

    delete pinInstances[currentPin.id];
    CloseEditPinPanel();
}
function ConfirmEditPin() {

    if (currentType != currentPin.type) {
        AddMapData(currentType, currentPin.position);
        DrawPin(currentPin.position, currentType);
        DeletePin();
    }
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
    // window.URL.revokeObjectURL(url);
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
function ChangeCurrentType(type) {
    document.getElementById("edit-position-target").setAttribute("src", mapResources[type].icon);
    currentType = type;
}



function SetPositionCenter(element, x, y) {
    let width = parseInt(element.style.width, 10);
    element.style.left = x - width / 2 + 'px';
    let height = parseInt(element.style.height, 10);
    element.style.top = y - height / 2 + 'px';
}


function OnSelectType(type) {
    var container = typeContainers[type];
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


function OnClickPin(id) {
    if (!pinInstances.hasOwnProperty(id)) {
        alert("ERROR: no pin id " + id);
        return;
    }
    currentPin = pinInstances[id];
    // alert();
    if (!isEditMode)
        ShowInfoPanel();
    else
        OpenEditPinPanel(false);
}

function ShowInfoPanel() {
    var panel = document.getElementById("infopanel");
    panel.style.display = "block";
    panel.style.left = map.offsetLeft + currentPin.position.coords[0] + "px";
    panel.style.top = map.offsetTop + currentPin.position.coords[1] + "px";

    var description = document.getElementById("infopanel-description");
    description.innerHTML = mapResources[currentPin.type].description;
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
