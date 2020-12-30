
var currentLayer = 0;
var layer0;
var layer1;
var layer2;
var topbarlayer0;
var topbarlayer1;
var topbarlayer2;
var svg;
var moveInfo;

var dexObj;
var movesObj;
var currentMonMoves = {};
var spaciesDictionary = {};

document.addEventListener("DOMContentLoaded", Initialize);
//google.script.run.withSuccessHandler(onDexLoaded).LoadRiseData();


alert(window.visualViewport.height + "_" + window.visualViewport.width);

fetch('mhrdex.json')
    .then(res => {
        return res.json();
    }).then(result => {
        dexObj = result;
        if (movesObj !== undefined)
            onDexLoaded();

    });

fetch('mhrmoves.json')
    .then(res => {
        return res.json();
    }).then(result => {
        movesObj = result;
        if (dexObj !== undefined)
            onDexLoaded();
    });

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
}

function onDexLoaded() {

    var div = document.getElementById('title');
    div.innerHTML = "TEMP Title";

    var monlist = document.getElementById('monlist');

    for (key in dexObj) {

        var mon = dexObj[key];
        if (mon.spacies !== "") {
            if (spaciesDictionary.hasOwnProperty(mon.spacies) == false) {
                spaciesDictionary[mon.spacies] = [];
            }
            spaciesDictionary[mon.spacies].push(key);
        }
        var btn = document.createElement("BUTTON");
        btn.innerHTML = key;
        btn.setAttribute("onclick", "SetMon('" + key + "')");
        btn.className = "btnmon";
        monlist.appendChild(btn);
    }

    var spaciesList = document.getElementById('spacieslist');
    var allSpaciesBtn = CreateClassElement("BUTTON", "btnspacies", "全部");
    allSpaciesBtn.setAttribute("onclick", "SetSpacies('全部')");
    spaciesList.appendChild(allSpaciesBtn);
    for (var spacie in spaciesDictionary) {
        var btn = CreateClassElement("BUTTON", "btnspacies", spacie);
        btn.setAttribute("onclick", "SetSpacies('" + spacie + "')");
        spaciesList.appendChild(btn);
    }
    OnSelectLayer(0);
}

function SetSpacies(key) {

    var monlist = document.getElementById('monlist');
    var monBtns = monlist.getElementsByTagName('button');
    for (btn of monBtns) {

        if (key === '全部') {
            btn.style.display = "inline";
        } else {
            if (dexObj[btn.innerHTML].spacies === key)
                btn.style.display = "inline";
            else
                btn.style.display = "none";
        }

    }

    OnSelectLayer(1, key);
}

function SetMon(key) {

    var monObj = dexObj[key];

    SetElementById('title', monObj.nameTW);
    SetElementById('namejp', monObj.nameJP);
    SetElementById('nameen', monObj.nameEN);
    SetElementById('spacies', monObj.spacies);

    var image = document.getElementById('monimage');
    image.setAttribute("src", monObj.image);

    if (monObj.hasOwnProperty("trait")) {
        SetElementById('roar', monObj.trait.roar);
        SetElementById('wind', monObj.trait.wind);
        SetElementById('tremer', monObj.trait.tremer);
    }
    var weaponBlock = document.getElementById('weakness-weapon');
    while (weaponBlock.children.length > 1) {
        weaponBlock.removeChild(weaponBlock.children[1]);
    }
    if (monObj.hasOwnProperty("weakness")) {
        if (monObj.weakness.hasOwnProperty("weapon")) {
            for (var weakPart of monObj.weakness.weapon) {
                var row = CreateClassElement("div", "panel-block-1 panel-row");
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
            weaponBlock.style.paddingBottom = "10px";
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

    //hit data
    var hdTableBody = document.getElementById('tbody_hitdata');
    hdTableBody.innerHTML = "<tr><th width=120>部位</th><th width=120>狀態</th><th width=40>斬</th><th width=40>打</th><th width=40>彈</th><th width=40>火</th><th width=40>水</th><th width=40>雷</th><th width=40>冰</th><th width=40>龍</th></tr>";

    for (var id = 0; id < monObj['parts'].length; id++) {
        var part = monObj['parts'][id];

        var trPart = document.createElement("tr");

        var tdPartName = document.createElement("td");
        tdPartName.innerHTML = part.name;
        trPart.appendChild(tdPartName);

        var tdPartState = document.createElement("td");
        tdPartState.innerHTML = part.state;
        trPart.appendChild(tdPartState);

        for (var i = 0; i < 8; i++) {
            var tdPartHitData = document.createElement("td");
            tdPartHitData.innerHTML = part.hitData[i];
            trPart.appendChild(tdPartHitData);
        }

        hdTableBody.appendChild(trPart);
    }

    //moves
    var divMoves = document.getElementById('divmoves');
    if (movesObj.hasOwnProperty(key)) {
        divMoves.style.display = "block";
        currentMonMoves = movesObj[key];
        var outline = SetElementById('moveoutline', currentMonMoves.outline);

        //combos
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

                var rootFlex = CreateClassElement("button", "flexitem", move.name);
                rootFlex.setAttribute("onclick", "OnClickMoveButton(this)");
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

        //all moves
        var smovesTableBody = document.getElementById('tbody_startermoves');
        smovesTableBody.innerHTML = "";
        for (var id = 0; id < currentMonMoves['moves'].length; id++) {
            var move = currentMonMoves['moves'][id];
            var trMove = CreateSimpleElement("tr", "");
            var tdMoveName = CreateSimpleElement("td", move.name);
            trMove.appendChild(tdMoveName);
            var tdMovePre = CreateSimpleElement("td", move.preaction);
            trMove.appendChild(tdMovePre);
            var tdMoveAction = CreateSimpleElement("td", move.action);
            trMove.appendChild(tdMoveAction);
            var tdMoveRecovery = CreateSimpleElement("td", move.recovery);
            trMove.appendChild(tdMoveRecovery);
            var tdMoveNote = CreateSimpleElement("td", move.note);
            trMove.appendChild(tdMoveNote);
            smovesTableBody.appendChild(trMove);
        }

    } else {
        divMoves.style.display = "none";
    }

    OnSelectLayer(2, monObj.nameTW);
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

function AppendNode(node, container, nodeList, condition) {

    if (node === undefined)
        return;

    var nodeFlex = CreateClassElement("div", "flexboxrow");
    container.appendChild(nodeFlex);

    var rootFlex = CreateClassElement("button", "flexitem", node.move);
    rootFlex.setAttribute("onclick", "OnClickMoveButton(this)");
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
        if (link.condition && link.condition.length > 0) {
            maxConditionTextLength = link.condition.length;
        }

        AppendNode(linkNode, linksFlex, nodeList, link.condition);
    }

    if (maxConditionTextLength > 0) {
        rootFlex.style.marginRight = Math.min(Math.max(maxConditionTextLength * 2, 2), 16) + "vw";
    }
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

function OnClickMoveButton(btn) {

    var move = currentMonMoves['moves'].find(x => x.name === btn.innerHTML);

    if (move === undefined)
        return;

    var panel = GetMoveInfoPanel();
    panel.innerHTML = "";
    panel.style.display = "block";
    panel.style.top = window.pageYOffset + 200 + "px";
    panel.addEventListener("click", OnClickCloseMoveInfo);

    var title = CreateSimpleElement("p", "招式: " + move.name);
    panel.appendChild(title);
    //  var image = CreateClassElement("img","moveimage");
    //  image.setAttribute('src', move.image);

    var video = CreateClassElement("video", "move-video");
    video.setAttribute("preload", "auto");
    video.setAttribute("autoplay", "autoplay");
    video.setAttribute("loop", "loop");
    video.setAttribute("type", "video/mp4");
    var source = CreateSimpleElement("source");
    source.setAttribute("src", move.image);
    video.appendChild(source);
    panel.appendChild(video);

    var preaction = CreateSimpleElement("p", "預兆: " + move.preaction);
    panel.appendChild(preaction);
    var action = CreateSimpleElement("p", "動作: " + move.action);
    panel.appendChild(action);
    var recovery = CreateSimpleElement("p", "硬直: " + move.recovery);
    panel.appendChild(recovery);
    var note = CreateSimpleElement("p", "備註: " + move.note);
    panel.appendChild(note);

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
            break;
        case 1:
            layer0.style.display = "none";
            layer1.style.display = "block";
            layer2.style.display = "none";
            topbarlayer0.style.display = "inline";
            topbarlayer1.style.display = "inline";
            topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#333';
            topbarlayer1.style.background = '#4CAF50';
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
            topbarlayer0.style.background = '#333';
            topbarlayer1.style.background = '#333';
            topbarlayer2.style.background = '#4CAF50';
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
    var LINE_HEIGHT = 16;

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
        moveInfo = CreateClassElement("div", "moveinfo");
        layer2.appendChild(moveInfo);
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

//       const queryString = window.location.search;
//   var title = document.getElementById("title");
//   title.innerHTML = "TEST";


//    document.write("KKK");
//    var btn = document.createElement("Button");
//    btn.innerHTML = "test";
//    btn.setAttribute('onclick', 'google.script.run.ButtonTest()');
//    document.body.appendChild(btn);

