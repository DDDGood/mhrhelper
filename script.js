
var currentLayer = 0;
var layer0;
var layer1;
var layer2;
var topbarlayer0;
var topbarlayer1;
var topbarlayer2;
var topbarlink01;
var topbarlink12;
var svg;
var moveInfo;

var dexObj;
var movesObj;
var currentMon = {};
var currentMonMoves = {};
var spaciesDictionary = {};

document.addEventListener("DOMContentLoaded", Initialize);
//google.script.run.withSuccessHandler(onDexLoaded).LoadRiseData();

function Initialize() {
    layer0 = document.getElementById('layer0');
    layer1 = document.getElementById('layer1');
    layer2 = document.getElementById('layer2');
    topbarlayer0 = document.getElementById('topbarlayer0');
    topbarlayer1 = document.getElementById('topbarlayer1');
    topbarlayer2 = document.getElementById('topbarlayer2');

    layer0.style.display = "none";
    layer1.style.display = "none";
    layer2.style.display = "none";
    topbarlayer0.style.display = "none";
    topbarlayer1.style.display = "none";
    topbarlayer2.style.display = "none";

    fetch('mhrdex.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(result => {
            dexObj = result;
            if (movesObj !== undefined)
                onDexLoaded("move load then");
        })
        .catch(error => {
            dexObj = JSON.parse("{\"\u96F7\u72FC\u9F8D\":{\"nameTW\":\"\u96F7\u72FC\u9F8D\",\"nameJP\":\"\u30B8\u30F3\u30AA\u30A6\u30AC\",\"nameEN\":\"Zinogre\",\"spacies\":\"\u7259\u9F8D\u7A2E\",\"image\":\"http:\/\/hobbigame.com\/wp-content\/uploads\/2017\/09\/mhxx64.jpg\",\"icon\":\"https:\/\/truth.bahamut.com.tw\/s01\/201809\/54151d0600726f4ad7c4769c6c4804b8.PNG\",\"breakables\":\"\u982D\u3001\u524D\u8173\u3001\u80CC\u3001\u5C3E\",\"trait\":{\"roar\":\"\u5C0F\",\"wind\":\"\u5C0F\",\"tremer\":\"\u7121\"},\"weakness\":{\"weapon\":[{\"part\":\"\u982D\",\"cut\":3,\"blunt\":3,\"ammo\":3},{\"part\":\"\u524D\u8173\",\"cut\":2,\"blunt\":2,\"ammo\":2},{\"part\":\"\u5C3E\",\"cut\":2,\"blunt\":2,\"ammo\":2}],\"element\":[{\"condition\":\"normal\",\"fire\":1,\"water\":2,\"thunder\":0,\"ice\":3,\"dragon\":1}],\"aliment\":[{\"condition\":\"normal\",\"poison\":2,\"sleep\":2,\"paralysis\":1,\"blast\":2,\"stun\":2}],\"item\":[{\"condition\":\"normal\",\"pitfalltrap\":2,\"shocktrap\":1,\"flashpod\":2,\"screamerpod\":0},{\"condition\":\"\u8D85\u5E36\u96FB\",\"pitfalltrap\":2,\"shocktrap\":0,\"flashpod\":2,\"screamerpod\":0}]},\"parts\":[{\"name\":\"\u982D\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u8D64\",\"hitData\":[45,45,50,5,10,0,15,5,100]},{\"name\":\"\u982D\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u8D64\",\"hitData\":[65,65,55,10,20,0,25,10,100]},{\"name\":\"\u9838\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u8D64\",\"hitData\":[40,40,45,5,10,0,15,5,100]},{\"name\":\"\u9838\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u8D64\",\"hitData\":[60,60,50,5,15,0,20,5,100]},{\"name\":\"\u8EAB\u9AD4\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u6A59\",\"hitData\":[30,30,20,0,5,0,5,0,0]},{\"name\":\"\u8EAB\u9AD4\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u6A59\",\"hitData\":[25,25,15,0,5,0,10,0,0]},{\"name\":\"\u80CC\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u8D64\",\"hitData\":[30,30,20,0,5,0,10,0,0]},{\"name\":\"\u80CC\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u8D64\",\"hitData\":[40,40,45,5,10,0,15,5,0]},{\"name\":\"\u524D\u8173\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u8D64\",\"hitData\":[40,40,35,5,10,0,15,5,0]},{\"name\":\"\u524D\u8173\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u8D64\",\"hitData\":[45,45,45,5,15,0,20,5,0]},{\"name\":\"\u5F8C\u8173\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u767D\",\"hitData\":[30,30,20,0,5,0,5,0,0]},{\"name\":\"\u5F8C\u8173\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u767D\",\"hitData\":[25,25,15,0,5,0,10,0,0]},{\"name\":\"\u5C3E\",\"state\":\"\u901A\u5E38\",\"extract\":\"\u6A59\",\"hitData\":[30,30,20,0,5,0,5,0,0]},{\"name\":\"\u5C3E\",\"state\":\"\u8D85\u5E36\u96FB\",\"extract\":\"\u6A59\",\"hitData\":[45,45,45,5,10,0,15,5,0]}]}}");
            if (movesObj !== undefined)
                onDexLoaded("move load then");
        });

    fetch('mhrmoves.json')
        .then(res => {
            if (!res.ok)
                throw new Error(res.statusText);
            return res.json();
        })
        .then(result => {
            movesObj = result;
            if (dexObj !== undefined)
                onDexLoaded("move load then");
        })
        .catch(error => {
            movesObj = JSON.parse("{\"\u96F7\u72FC\u9F8D\":{\"outline\":\"\",\"moves\":[{\"name\":\"\u9F8D\u543C\",\"preaction\":\"\",\"action\":\"\",\"recovery\":\"\",\"note\":\"\",\"image\":\"\",\"onlyincombo\":false},{\"name\":\"\u524D\u9802\",\"preaction\":\"\",\"action\":\"\",\"recovery\":\"\",\"note\":\"\",\"image\":\"\",\"onlyincombo\":false}],\"combos\":[{\"root\":0,\"condition\":\"\",\"nodes\":[{\"move\":\"\u524D\u9802\",\"links\":[{\"node\":1,\"condition\":\"\u8EAB\u5074\"},{\"node\":2,\"condition\":\"\u8EAB\u524D\"},{\"node\":3,\"condition\":\"\u8EAB\u5F8C\"}]},{\"move\":\"\u9435\u5C71\u9760\",\"links\":[]},{\"move\":\"\u5F8C\u8DF3\u64B2\",\"links\":[{\"node\":4,\"condition\":\"\u7121\u5E36\u96FB\"},{\"node\":5,\"condition\":\"\u8EAB\u5074\u4E14\u8D85\u96FB\"},{\"node\":6,\"condition\":\"\u8EAB\u524D\u4E14\u8D85\u96FB\"}]},{\"move\":\"\u5C0F\u7529\u5C3E\",\"links\":[{\"node\":7,\"condition\":\"\u8D85\u96FB\u6012\"}]},{\"move\":\"\u5F37\u84C4\u96FB\",\"links\":[]},{\"move\":\"\u9435\u5C71\u9760\",\"links\":[{\"node\":7,\"condition\":\"\u8D85\u96FB\u6012\"}]},{\"move\":\"\u84C4\u529B\u62F3\",\"links\":[{\"node\":8,\"condition\":\"\u8D85\u96FB\u6012\"}]},{\"move\":\"\u6258\u99AC\u65AF\",\"links\":[]},{\"move\":\"\u80CC\u7838\",\"links\":[]}]},{\"root\":0,\"condition\":\"\",\"nodes\":[{\"move\":\"\u5FEB\u901F\u62F3\",\"links\":[{\"node\":1,\"condition\":\"\u8EAB\u524D\u4E14\u8D85\u96FB\uFF08\u6A5F\u7387\uFF09\uFF0F\u8D85\u96FB\u6012\uFF08\u5FC5\u51FA\uFF09\"},{\"node\":2,\"condition\":\"\u8EAB\u5074\u4E14\u8D85\u96FB\uFF08\u6A5F\u7387\uFF09\"}]},{\"move\":\"\u5FEB\u901F\u62F3\",\"links\":[{\"node\":3,\"condition\":\"\"}]},{\"move\":\"\u5FEB\u901F\u62F3\",\"links\":[{\"node\":5,\"condition\":\"\"}]},{\"move\":\"\u84C4\u529B\u62F3\",\"links\":[{\"node\":4,\"condition\":\"\u8D85\u96FB\u6012\"}]},{\"move\":\"\u80CC\u7838\",\"links\":[]},{\"move\":\"\u5C3E\u7838\",\"links\":[{\"node\":6,\"condition\":\"\"}]},{\"move\":\"\u6258\u99AC\u65AF\",\"links\":[{\"node\":4,\"condition\":\"\u8D85\u96FB\u6012\"}]}]}]}}");
            if (dexObj !== undefined)
                onDexLoaded("move load err");
        });
}


function onDexLoaded() {

    var monlist = document.getElementById('monlist');

    for (key in dexObj) {

        var mon = dexObj[key];
        if (mon.spacies !== "") {
            if (spaciesDictionary.hasOwnProperty(mon.spacies) == false) {
                spaciesDictionary[mon.spacies] = [];
            }
            spaciesDictionary[mon.spacies].push(key);
        }
        var btn = CreateClassElement("BUTTON", "button-mon");
        // btn.innerHTML = key;
        btn.setAttribute("onclick", "SetMon('" + key + "')");
        var btnicon = new Image();
        btnicon.className = "image-button-mon-icon";
        btnicon.src = IsNullOrEmpty(mon.icon) ? "images/icons/monsters/icon_unknown.png" : mon.icon;
        var btnText = CreateClassElement("div", "text-button-mon-name", key);
        btn.appendChild(btnicon);
        btn.appendChild(btnText);
        monlist.appendChild(btn);
    }

    var spaciesList = document.getElementById('spacieslist');
    var allSpaciesBtn = CreateClassElement("BUTTON", "btnspacies flex-2", "全部");
    allSpaciesBtn.setAttribute("onclick", "SetSpacies('全部')");
    spaciesList.appendChild(allSpaciesBtn);
    for (var spacie in spaciesDictionary) {
        var btn = CreateClassElement("BUTTON", "btnspacies flex-1", spacie);
        btn.setAttribute("onclick", "SetSpacies('" + spacie + "')");
        spaciesList.appendChild(btn);
    }


    let searchParams = new URLSearchParams(location.search);
    let navMon = searchParams.get('mon');
    if (dexObj.hasOwnProperty(navMon)) {
        SetMon(navMon);
    } else {
        OnSelectLayer(0);
    }
}

function SetSpacies(key) {

    var monlist = document.getElementById('monlist');
    var monBtns = monlist.getElementsByTagName('button');
    for (btn of monBtns) {

        if (key === '全部') {
            btn.style.display = "inline";
        } else {
            if (dexObj[btn.children[1].innerHTML].spacies === key)
                btn.style.display = "inline";
            else
                btn.style.display = "none";
        }

    }

    OnSelectLayer(1, key);
}

function SetMon(key) {

    var monObj = dexObj[key];
    currentMon = dexObj[key];

    SetElementById('title', monObj.nameTW);
    SetElementById('namejp', monObj.nameJP);
    SetElementById('nameen', monObj.nameEN);
    SetElementById('spacies', monObj.spacies);

    var icon = document.getElementById('monicon');
    icon.setAttribute("src", IsNullOrEmpty(monObj.icon) ? "images/icons/monsters/icon_unknown.png" : monObj.icon);

    var image = document.getElementById('monimage');
    image.setAttribute("src", monObj.image);

    if (monObj.hasOwnProperty("trait")) {
        SetElementById('roar', monObj.trait.roar);
        SetElementById('wind', monObj.trait.wind);
        SetElementById('tremer', monObj.trait.tremer);
        SetElementById('element', monObj.trait.element);
        SetElementById('aliment', monObj.trait.aliment);
    }
    var weaponBlock = document.getElementById('weakness-weapon');
    while (weaponBlock.children.length > 1) {
        weaponBlock.removeChild(weaponBlock.children[1]);
    }
    if (monObj.hasOwnProperty("weakness")) {
        if (monObj.weakness.hasOwnProperty("weapon")) {
            for (var weakPart of monObj.weakness.weapon) {
                var row = CreateClassElement("div", "panel-block-1 panel-row margin");
                var name = CreateClassElement("div", "panel-block panel-text", weakPart.part);
                var cut = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.cut));
                var blunt = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.blunt));
                var ammo = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.ammo));
                row.appendChild(name);
                row.appendChild(cut);
                row.appendChild(blunt);
                row.appendChild(ammo);
                weaponBlock.appendChild(row);
            }
            // weaponBlock.style.paddingBottom = "2px";
        }
        if (monObj.weakness.hasOwnProperty("element")) {
            var elementData = {
                weakData: monObj.weakness.element,
                dataIDs: ["weakness-element-fire", "weakness-element-water", "weakness-element-thunder", "weakness-element-ice", "weakness-element-dragon"],
                dataKeys: ["fire", "water", "thunder", "ice", "dragon"],
                specialTextID: "weakness-element-special",
            };
            WriteWeaknessData(elementData);
        }
        if (monObj.weakness.hasOwnProperty("aliment")) {
            var alimentData = {
                weakData: monObj.weakness.aliment,
                dataIDs: ["weakness-aliment-poison", "weakness-aliment-sleep", "weakness-aliment-paralysis", "weakness-aliment-blast", "weakness-aliment-stun"],
                dataKeys: ["poison", "sleep", "paralysis", "blast", "stun"],
                specialTextID: "weakness-aliment-special",
            };
            WriteWeaknessData(alimentData);
        }
        if (monObj.weakness.hasOwnProperty("item")) {
            var itemData = {
                weakData: monObj.weakness.item,
                dataIDs: ["weakness-item-pitfalltrap", "weakness-item-shocktrap", "weakness-item-flashpod", "weakness-item-screamerpod"],
                dataKeys: ["pitfalltrap", "shocktrap", "flashpod", "screamerpod"],
                specialTextID: "weakness-item-special",
            };
            WriteWeaknessData(itemData);
        }
    }
    //    SetElementById('breakables', "可破壞部位：" + monObj.breakables);

    // description
    var descSpan = SetElementById("description", "");
    if (!IsNullOrEmpty(monObj.description)) {
        WriteDescriptionTexts(descSpan, monObj.description);
    }
    var detailSpan = SetElementById("detail", "");
    // detail
    if (!IsNullOrEmpty(monObj.detail)) {
        WriteDescriptionTexts(detailSpan, monObj.detail);
    }

    //hit data
    var hdTableBody = document.getElementById('tbody_hitdata');
    while (hdTableBody.children.length > 1) {
        hdTableBody.removeChild(hdTableBody.children[1]);
    }

    for (var id = 0; id < monObj['parts'].length; id++) {
        var part = monObj['parts'][id];

        var trPart = CreateClassElement("tr", "panel-text");

        var tdPartName = document.createElement("td");
        tdPartName.innerHTML = part.name;
        trPart.appendChild(tdPartName);

        var tdPartState = document.createElement("td");
        tdPartState.innerHTML = part.state;
        trPart.appendChild(tdPartState);

        for (var i = 0; i < 8; i++) {
            var tdPartHitData = document.createElement("td");
            tdPartHitData.innerHTML = part.hitData[i];
            if (i < 3) {
                if (part.hitData[i] >= 45)
                    tdPartHitData.style.backgroundColor = "#FFCFCF";
            } else {
                if (part.hitData[i] >= 25)
                    tdPartHitData.style.backgroundColor = "#FFCFCF";
            }
            trPart.appendChild(tdPartHitData);
        }

        hdTableBody.appendChild(trPart);
    }

    var referenceDiv = document.getElementById('reference');
    referenceDiv.innerHTML = "";
    //reference
    if (!IsNullOrEmpty(monObj.reference)) {
        for (var key in monObj.reference) {
            var link = CreateClassElement("a", "reference-link", key);
            link.setAttribute("href", monObj.reference[key]);
            referenceDiv.AppendNode(link);
        }
    }

    //moves
    var divMoves = document.getElementById('divmoves');
    if (movesObj.hasOwnProperty(key)) {
        divMoves.style.display = "block";
        currentMonMoves = movesObj[key];
        var outlineSpan = SetElementById("moveoutline", "");
        if (!IsNullOrEmpty(currentMonMoves.outline)) {
            WriteDescriptionTexts(outlineSpan, currentMonMoves.outline);
        }

        //combos
        SetMonCombos();

        //reference
        if (!IsNullOrEmpty(currentMonMoves.reference)) {
            for (var key in currentMonMoves.reference) {
                var link = CreateClassElement("a", "reference-link", key);
                link.setAttribute("href", currentMonMoves.reference[key]);
                referenceDiv.appendChild(link);
            }
        }

    } else {
        divMoves.style.display = "none";
    }



    OnSelectLayer(2, monObj.nameTW);
}

function WriteDescriptionTexts(root, fullText) {
    var descTexts = fullText.split("\n", -1);
    for (var text of descTexts) {
        if (text.startsWith("[img]")) {
            var img = CreateClassElement("img", "description-image");
            img.setAttribute('src', text.substring(5));
            root.appendChild(img);
        } else {
            var p = CreateClassElement("p", "description-text", IsNullOrEmpty(text) ? "<br>" : text);
            root.appendChild(p);
        }
    }
}

function WriteWeaknessData(params) {

    var specialCaseTextHandler = document.getElementById(params.specialTextID);
    specialCaseTextHandler.innerHTML = "";
    var specialCase = false;
    var specialCaseText = "";
    var specialCaseValues = []

    var doms = [];
    for (var id of params.dataIDs) {
        var dom = document.getElementById(id)
        doms.push(dom);
        specialCaseValues.push("");
    }

    for (var weakState of params.weakData) {
        if (weakState.condition === "normal") {
            for (var i = 0; i < doms.length; i++) {
                doms[i].innerHTML = ParseStars(weakState[params.dataKeys[i]]);
            }
        } else {
            if (specialCase === false) {
                specialCase = true;
                specialCaseText += weakState.condition;
            } else {
                specialCaseText += "、" + weakState.condition;
            }
            for (var i = 0; i < specialCaseValues.length; i++) {
                specialCaseValues[i] += "<br>(" + ParseStars(weakState[params.dataKeys[i]]) + ")";
            }
        }
    }
    if (specialCase === true) {
        specialCaseTextHandler.innerHTML = "(" + specialCaseText + ")";
        for (var i = 0; i < doms.length; i++) {
            doms[i].innerHTML += specialCaseValues[i];
        }
    }
}

function SetMonCombos() {
    var divCombos = document.getElementById('combos');
    divCombos.innerHTML = "";

    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    divCombos.appendChild(svg);

    var normalCondition = CreateClassElement("div", "combo-condition-container-normal");
    divCombos.appendChild(normalCondition);

    for (var id = 0; id < currentMonMoves['moves'].length; id++) {
        var move = currentMonMoves['moves'][id];
        if (move.onlyincombo == false) {

            var nodeFlex = CreateClassElement("div", "flexboxrow");
            if (!IsNullOrEmpty(move.condition))
                FindOrAddComboConditionContainer(move.condition).appendChild(nodeFlex);
            else
                normalCondition.appendChild(nodeFlex);

            var rootFlex = CreateMoveNode(move);
            var marginLeftVW = 2;
            var marginLeftPX = Math.ceil((window.innerWidth * marginLeftVW / 100));
            rootFlex.style.marginLeft = marginLeftPX + "px";
            nodeFlex.appendChild(rootFlex);
        }
    }

    for (var id = 0; id < currentMonMoves['combos'].length; id++) {
        var combo = currentMonMoves['combos'][id];
        var root = combo.nodes[combo.root];

        var container = normalCondition;
        if (!IsNullOrEmpty(combo.condition))
            container = FindOrAddComboConditionContainer(combo.condition);

        AppendNode(root, container, combo.nodes, combo.condition);

        if (!IsNullOrEmpty(combo.note)) {

        }
    }
}

function AppendNode(node, container, nodeList, condition) {

    if (node === undefined)
        return;

    var nodeFlex = CreateClassElement("div", "flexboxrow");
    container.appendChild(nodeFlex);

    var move = currentMonMoves['moves'].find(x => x.name === node.move);
    var rootFlex;
    if (move === undefined)
        rootFlex = CreateClassElement("button", "flexitem", node.move);
    else
        var rootFlex = CreateMoveNode(move);
    nodeFlex.appendChild(rootFlex);

    if (container.parentElement.id !== "combos") {
        var fromNode = nodeFlex.parentElement.previousSibling;
        window.setTimeout(
            function () {
                var rect = rootFlex.getBoundingClientRect();
                var rectSVG = svg.getBoundingClientRect();
                var rectFrom = fromNode.getBoundingClientRect();

                var fromX = rectFrom.right - rectSVG.left;
                var fromY = (rectFrom.top + rectFrom.bottom) / 2 - rectSVG.top;
                var toX = rect.left - rectSVG.left;
                var toY = (rect.top + rect.bottom) / 2 - rectSVG.top;

                var line = CreateLine(fromX, fromY, toX, toY);
                svg.appendChild(line);

                if (condition !== undefined && condition !== "") {
                    var text = createSVGtext(condition, (fromX + toX) / 2, (fromY + toY) / 2);
                    svg.appendChild(text);
                }
            }, 200);
    }

    var linksFlex = CreateClassElement("div", "flexboxcolumn");
    nodeFlex.appendChild(linksFlex);

    var maxConditionTextLength = 0;
    for (var link of node.links) {
        var linkNodeID = link.node;
        var linkNode = nodeList[linkNodeID];
        if (link.condition && link.condition.length > maxConditionTextLength) {
            maxConditionTextLength = link.condition.length;
        }
        AppendNode(linkNode, linksFlex, nodeList, link.condition);
    }

    var marginLeftVW = 2;
    var marginRightVW = 2;
    if (maxConditionTextLength > 0) {
        marginRightVW = Math.min(Math.max(maxConditionTextLength * 2.5, 2), 20);
    }
    var marginLeftPX = Math.ceil((window.innerWidth * marginLeftVW / 100));
    var marginRightPX = Math.ceil((window.innerWidth * marginRightVW / 100));
    rootFlex.style.marginLeft = marginLeftPX + "px";
    rootFlex.style.marginRight = marginRightPX + "px";
}

function CreateMoveNode(move) {
    var moveFlex = CreateClassElement("button", "flexitem", "");
    var moveName = CreateClassElement("div", "movebutton-name", move.name);
    moveFlex.appendChild(moveName);
    // 大硬直
    if (move.recovery === "大") {
        var tag = CreateClassElement("div", "movebutton-tag", "硬直大");
        moveFlex.appendChild(tag);
    }
    moveFlex.onclick = function () {
        OnClickMoveButton(move);
    };
    return moveFlex;
}

function FindOrAddComboConditionContainer(condition) {
    var divCombos = document.getElementById('combos');
    var findContainer;
    for (var container of divCombos.children) {
        if (container.id === condition)
            findContainer = container;
    }
    if (!findContainer) {
        findContainer = CreateClassElement("div", "combo-condition-container");
        findContainer.id = condition;
        var conditionText = CreateClassElement("div", "combo-condition-text", condition);
        findContainer.appendChild(conditionText);
        divCombos.appendChild(findContainer);
    }
    return findContainer;
}

function OnClickMoveButton(move) {

    if (move === undefined)
        return;

    var panel = GetMoveInfoPanel();
    panel.style.display = "block";
    panel.style.top = window.pageYOffset + 200 + "px";
    panel.addEventListener("click", OnClickCloseMoveInfo);

    SetElementById("moveinfo-title", move.name);

    var video = document.getElementById("moveinfo-video");
    var altText = video.previousElementSibling;
    if (IsNullOrEmpty(move.image)) {
        video.style.display = "none";
        altText.style.display = "block";
    } else {
        video.style.display = "block";
        altText.style.display = "none";
        video.setAttribute("preload", "auto");
        video.setAttribute("autoplay", "autoplay");
        video.setAttribute("loop", "loop");
        video.setAttribute("type", "video/mp4");
        var source = video.children[0];
        source.setAttribute("src", move.image);
        video.load();
        video.play();
    }

    var preaction = document.getElementById("moveinfo-preaction");
    if (!IsNullOrEmpty(move.preaction)) {
        preaction.parentNode.style.display = "flex";
        preaction.innerHTML = move.preaction;
    } else
        preaction.parentNode.style.display = "none";

    var action = document.getElementById("moveinfo-action");
    if (!IsNullOrEmpty(move.action)) {
        action.parentNode.style.display = "flex";
        action.innerHTML = move.action;
    } else
        action.parentNode.style.display = "none";

    var recovery = document.getElementById("moveinfo-recovery");
    if (!IsNullOrEmpty(move.recovery)) {
        recovery.parentNode.style.display = "flex";
        recovery.innerHTML = move.recovery;
    } else
        recovery.parentNode.style.display = "none";

    var note = document.getElementById("moveinfo-note");
    if (!IsNullOrEmpty(move.note)) {
        note.parentNode.style.display = "flex";
        note.innerHTML = move.note;
    } else
        note.parentNode.style.display = "none";
}

function OnClickCloseMoveInfo(e) {
    var panel = GetMoveInfoPanel();
    panel.style.display = "none";
    panel.removeEventListener("click", OnClickCloseMoveInfo);
}

function OnSelectLayer(layer, label) {
    OnClickCloseMoveInfo();
    switch (layer) {
        case 0:
            layer0.style.display = "block";
            layer1.style.display = "none";
            layer2.style.display = "none";
            topbarlayer0.style.display = "inline";
            topbarlayer1.style.display = "none";
            topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "none";
            topbarlayer1.nextElementSibling.style.display = "none";
            break;
        case 1:
            layer0.style.display = "none";
            layer1.style.display = "block";
            layer2.style.display = "none";
            topbarlayer0.style.display = "inline";
            topbarlayer1.style.display = "inline";
            topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#31363D';
            topbarlayer1.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "flex";
            topbarlayer1.nextElementSibling.style.display = "none";
            if (label)
                topbarlayer1.innerHTML = label;
            break;
        case 2:
            layer0.style.display = "none";
            layer1.style.display = "none";
            layer2.style.display = "block";
            topbarlayer0.style.display = "inline";
            topbarlayer1.style.display = "inline";
            topbarlayer2.style.display = "inline";
            topbarlayer0.style.background = '#31363D';
            topbarlayer1.style.background = '#31363D';
            topbarlayer2.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "flex";
            topbarlayer1.nextElementSibling.style.display = "flex";
            if (label)
                topbarlayer2.innerHTML = label;
            break;
    }
}

function CreateLine(x1, y1, x2, y2) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    return line;
}
function CreateText(innerHTML, x, y) {
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.innerHTML = innerHTML;
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('inline-size', '20');
    return text;
}

function createSVGtext(caption, x, y) {
    //  This function attempts to create a new svg "text" element, chopping
    //  it up into "tspan" pieces, if the caption is too long
    //
    var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //    var textNode = document.createTextNode(caption);
    //    svgText.appendChild(textNode);
    //    svgText.setAttributeNS(null, 'x', x);
    //    svgText.setAttributeNS(null, 'y', y);
    //    return svgText;

    //  The following two variables should really be passed as parameters
    var MAXIMUM_CHARS_PER_LINE = 9;
    var LINE_HEIGHT = CheckMobile() ? 9 : 16;

    var words = caption.split("");
    var line = "";

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n];
        if (testLine.length > MAXIMUM_CHARS_PER_LINE) {
            //  Add a new <tspan> element
            var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', x);
            svgTSpan.setAttributeNS(null, 'y', y);

            var tSpanTextNode = document.createTextNode(line);
            svgTSpan.appendChild(tSpanTextNode);
            svgText.appendChild(svgTSpan);

            line = words[n];
            y += LINE_HEIGHT;
        } else {
            line = testLine;
        }
    }

    var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTSpan.setAttributeNS(null, 'x', x);
    svgTSpan.setAttributeNS(null, 'y', y);

    var tSpanTextNode = document.createTextNode(line);
    svgTSpan.appendChild(tSpanTextNode);

    svgText.appendChild(svgTSpan);

    return svgText;
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

function GetMoveInfoPanel() {
    if (moveInfo === undefined) {
        moveInfo = document.getElementById("panel-moveinfo");
    }

    return moveInfo;
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

//       const queryString = window.location.search;
//   var title = document.getElementById("title");
//   title.innerHTML = "TEST";


//    document.write("KKK");
//    var btn = document.createElement("Button");
//    btn.innerHTML = "test";
//    btn.setAttribute('onclick', 'google.script.run.ButtonTest()');
//    document.body.appendChild(btn);

