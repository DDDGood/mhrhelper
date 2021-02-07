
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

var currentMon = {};
var currentMonMoves = {};

function Setspecies(key) {

    var monlist = document.getElementById('monlist');
    var monBtns = monlist.getElementsByTagName('button');
    for (btn of monBtns) {

        if (key === '全部') {
            btn.style.display = "inline";
        } else {
            if (GetData("dex")[btn.children[1].innerHTML].species === key)
                btn.style.display = "inline";
            else
                btn.style.display = "none";
        }

    }

    OnSelectLayer(1, key);
}






function SetMon(key) {

    var monObj = GetData("dex")[key];
    panel.Refresh(monObj);
    currentMon = monObj;

    // panel.monData = obj;
    // panel.text = monObj.nameTW;

    // panel.monData = monObj;

    // var panel = new Vue({
    //     data: {
    //         name1: monObj.nameTW,
    //         name2: monObj.nameJP,
    //         name3: monObj.nameEN,
    //         species: monObj.species,
    //         icon: monObj.icon,
    //         image: monObj.image
    //     }
    // });

    // panel.$mount("#panel-basicinfo")

    // panel.Refresh(monObj);
    // SetElementById('title', monObj.nameTW);
    // SetElementById('namejp', monObj.nameJP);
    // SetElementById('nameen', monObj.nameEN);
    // SetElementById('species', monObj.species);

    // var icon = document.getElementById('monicon');
    // icon.setAttribute("src", IsNullOrEmpty(monObj.icon) ? "images/monsters/icons/icon_unknown.png" : monObj.icon);

    // var image = document.getElementById('monimage');
    // image.setAttribute("src", monObj.image);

    // if (monObj.hasOwnProperty("trait")) {
    // SetElementById('roar', monObj.trait.roar);
    // SetElementById('wind', monObj.trait.wind);
    // SetElementById('tremor', monObj.trait.tremor);
    // SetElementById('element', monObj.trait.element);
    // SetElementById('aliment', monObj.trait.aliment);
    // }

    // var weaponBlock = document.getElementById('weakness-weapon');
    // while (weaponBlock.children.length > 1) {
    //     weaponBlock.removeChild(weaponBlock.children[1]);
    // }
    // if (monObj.hasOwnProperty("weakness")) {
    // if (monObj.weakness.hasOwnProperty("weapon")) {
    //     for (var weakPart of monObj.weakness.weapon) {
    //         var row = CreateClassElement("div", "panel-block-1 panel-row margin");
    //         var name = CreateClassElement("div", "panel-block panel-text", weakPart.part);
    //         var cut = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.cut));
    //         var blunt = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.blunt));
    //         var ammo = CreateClassElement("div", "panel-block panel-text", ParseStars(weakPart.ammo));
    //         row.appendChild(name);
    //         row.appendChild(cut);
    //         row.appendChild(blunt);
    //         row.appendChild(ammo);
    //         weaponBlock.appendChild(row);
    //     }
    //     // weaponBlock.style.paddingBottom = "2px";
    // }
    // if (monObj.weakness.hasOwnProperty("element")) {
    //     var elementData = {
    //         weakData: monObj.weakness.element,
    //         dataIDs: ["weakness-element-fire", "weakness-element-water", "weakness-element-thunder", "weakness-element-ice", "weakness-element-dragon"],
    //         dataKeys: ["fire", "water", "thunder", "ice", "dragon"],
    //         specialTextID: "weakness-element-special",
    //     };
    //     WriteWeaknessData(elementData);
    // }
    // if (monObj.weakness.hasOwnProperty("aliment")) {
    //     var alimentData = {
    //         weakData: monObj.weakness.aliment,
    //         dataIDs: ["weakness-aliment-poison", "weakness-aliment-sleep", "weakness-aliment-paralysis", "weakness-aliment-blast", "weakness-aliment-stun"],
    //         dataKeys: ["poison", "sleep", "paralysis", "blast", "stun"],
    //         specialTextID: "weakness-aliment-special",
    //     };
    //     WriteWeaknessData(alimentData);
    // }
    // if (monObj.weakness.hasOwnProperty("item")) {
    //     var itemData = {
    //         weakData: monObj.weakness.item,
    //         dataIDs: ["weakness-item-pitfalltrap", "weakness-item-shocktrap", "weakness-item-flashpod", "weakness-item-screamerpod"],
    //         dataKeys: ["pitfalltrap", "shocktrap", "flashpod", "screamerpod"],
    //         specialTextID: "weakness-item-special",
    //     };
    //     WriteWeaknessData(itemData);
    // }
    // }
    //    SetElementById('breakables', "可破壞部位：" + monObj.breakables);

    // description
    // var descSpan = SetElementById("description", "");
    // if (!IsNullOrEmpty(monObj.description)) {
    //     WriteDescriptionTexts(descSpan, monObj.description);
    // }
    // var detailSpan = SetElementById("detail", "");
    // // detail
    // if (!IsNullOrEmpty(monObj.detail)) {
    //     WriteDescriptionTexts(detailSpan, monObj.detail);
    // }

    //hit data
    // var hdTableBody = document.getElementById('tbody_hitdata');
    // while (hdTableBody.children.length > 1) {
    //     hdTableBody.removeChild(hdTableBody.children[1]);
    // }

    // for (var id = 0; id < monObj['parts'].length; id++) {
    //     var part = monObj['parts'][id];

    //     var trPart = CreateClassElement("tr", "panel-text");

    //     var tdPartName = document.createElement("td");
    //     tdPartName.innerHTML = part.name;
    //     trPart.appendChild(tdPartName);

    //     var tdPartState = document.createElement("td");
    //     tdPartState.innerHTML = part.state;
    //     trPart.appendChild(tdPartState);

    //     for (var i = 0; i < 8; i++) {
    //         var tdPartHitData = document.createElement("td");
    //         tdPartHitData.innerHTML = part.hitData[i];
    //         if (i < 3) {
    //             if (part.hitData[i] >= 45)
    //                 tdPartHitData.style.backgroundColor = "#FFCFCF";
    //         } else {
    //             if (part.hitData[i] >= 25)
    //                 tdPartHitData.style.backgroundColor = "#FFCFCF";
    //         }
    //         trPart.appendChild(tdPartHitData);
    //     }

    //     hdTableBody.appendChild(trPart);
    // }

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
    // let movesData = GetData("moves");
    // var divMoves = document.getElementById('divmoves');
    // if (movesData.hasOwnProperty(key)) {
    //     divMoves.style.display = "block";
    //     currentMonMoves = movesData[key];
    //     var outlineSpan = SetElementById("moveoutline", "");
    //     if (!IsNullOrEmpty(currentMonMoves.outline)) {
    //         WriteDescriptionTexts(outlineSpan, currentMonMoves.outline);
    //     }

    //     //combos
    //     SetMonCombos();

    //     //reference
    //     if (!IsNullOrEmpty(currentMonMoves.reference)) {
    //         for (var key in currentMonMoves.reference) {
    //             var link = CreateClassElement("a", "reference-link", key);
    //             link.setAttribute("href", currentMonMoves.reference[key]);
    //             referenceDiv.appendChild(link);
    //         }
    //     }

    // } else {
    //     divMoves.style.display = "none";
    // }



    // OnSelectLayer(2, monObj.nameTW);
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

// function WriteWeaknessData(params) {

//     var specialCaseTextHandler = document.getElementById(params.specialTextID);
//     specialCaseTextHandler.innerHTML = "";
//     var specialCase = false;
//     var specialCaseText = "";
//     var specialCaseValues = []

//     var doms = [];
//     for (var id of params.dataIDs) {
//         var dom = document.getElementById(id)
//         doms.push(dom);
//         specialCaseValues.push("");
//     }

//     for (var weakState of params.weakData) {
//         if (weakState.condition === "normal") {
//             for (var i = 0; i < doms.length; i++) {
//                 doms[i].innerHTML = ParseStars(weakState[params.dataKeys[i]]);
//             }
//         } else {
//             if (specialCase === false) {
//                 specialCase = true;
//                 specialCaseText += weakState.condition;
//             } else {
//                 specialCaseText += "、" + weakState.condition;
//             }
//             for (var i = 0; i < specialCaseValues.length; i++) {
//                 specialCaseValues[i] += "<br>(" + ParseStars(weakState[params.dataKeys[i]]) + ")";
//             }
//         }
//     }
//     if (specialCase === true) {
//         specialCaseTextHandler.innerHTML = "(" + specialCaseText + ")";
//         for (var i = 0; i < doms.length; i++) {
//             doms[i].innerHTML += specialCaseValues[i];
//         }
//     }
// }

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







function OnSelectLayer(layer, label) {
    OnClickCloseMoveInfo();
    switch (layer) {
        case 0:

            $("#layer0").show();
            $("#layer1").hide();
            $("#layer2").hide();
            $("#topbarlayer0").show();
            $("#topbarlayer1").hide();
            $("#topbarlayer2").hide();

            // layer0.style.display = "block";
            // layer1.style.display = "none";
            // layer2.style.display = "none";
            // topbarlayer0.style.display = "inline";
            // topbarlayer1.style.display = "none";
            // topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "none";
            topbarlayer1.nextElementSibling.style.display = "none";
            break;
        case 1:

            $("#layer0").hide();
            $("#layer1").show();
            $("#layer2").hide();
            $("#topbarlayer0").show();
            $("#topbarlayer1").show();
            $("#topbarlayer2").hide();
            // layer0.style.display = "none";
            // layer1.style.display = "block";
            // layer2.style.display = "none";
            // topbarlayer0.style.display = "inline";
            // topbarlayer1.style.display = "inline";
            // topbarlayer2.style.display = "none";
            topbarlayer0.style.background = '#31363D';
            topbarlayer1.style.background = '#4CAF50';
            topbarlayer0.nextElementSibling.style.display = "flex";
            topbarlayer1.nextElementSibling.style.display = "none";
            if (label)
                topbarlayer1.innerHTML = label;
            break;
        case 2:
            $("#layer0").hide();
            $("#layer1").hide();
            $("#layer2").show();
            $("#topbarlayer0").show();
            $("#topbarlayer1").show();
            $("#topbarlayer2").show();
            // layer0.style.display = "none";
            // layer1.style.display = "none";
            // layer2.style.display = "block";
            // topbarlayer0.style.display = "inline";
            // topbarlayer1.style.display = "inline";
            // topbarlayer2.style.display = "inline";
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


function GetMoveInfoPanel() {
    if (moveInfo === undefined) {
        moveInfo = document.getElementById("panel-moveinfo");
    }

    return moveInfo;
}


function SetCombo() {
    let divCombos = this.$refs.combos;
    divCombos.innerHTML = "";

    if (this.movedata == undefined) return;

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    divCombos.appendChild(svg);

    var normalCondition = CreateClassElement(
        "div",
        "combo-condition-container-normal"
    );
    divCombos.appendChild(normalCondition);

    for (var id = 0; id < this.movedata["moves"].length; id++) {
        var move = this.movedata["moves"][id];
        if (move.onlyincombo == false) {
            var nodeFlex = CreateClassElement("div", "flexboxrow");
            if (!IsNullOrEmpty(move.condition))
                this.FindOrAddComboConditionContainer(move.condition).appendChild(
                    nodeFlex
                );
            else normalCondition.appendChild(nodeFlex);

            var rootFlex = this.CreateMoveNode(move);
            var marginLeftVW = 2;
            var marginLeftPX = Math.ceil(
                (window.innerWidth * marginLeftVW) / 100
            );
            rootFlex.style.marginLeft = marginLeftPX + "px";
            nodeFlex.appendChild(rootFlex);
        }
    }

    for (var id = 0; id < this.movedata["combos"].length; id++) {
        var combo = this.movedata["combos"][id];
        var root = combo.nodes[combo.root];

        var container = normalCondition;
        if (!IsNullOrEmpty(combo.condition))
            container = this.FindOrAddComboConditionContainer(combo.condition);

        this.AppendNode(root, container, combo.nodes, combo.condition);

        if (!IsNullOrEmpty(combo.note)) {
            //todo
        }
    }
}

function FindOrAddComboConditionContainer(condition) {
    let divCombos = this.$refs.combos;
    var findContainer;
    for (var container of divCombos.children) {
        if (container.id === condition) findContainer = container;
    }
    if (!findContainer) {
        findContainer = CreateClassElement("div", "combo-condition-container");
        findContainer.id = condition;
        var conditionText = CreateClassElement(
            "div",
            "combo-condition-text",
            condition
        );
        findContainer.appendChild(conditionText);
        divCombos.appendChild(findContainer);
    }
    return findContainer;
}
function AppendNode(node, container, nodeList, condition) {
    if (node === undefined) return;

    var nodeFlex = CreateClassElement("div", "flexboxrow");
    container.appendChild(nodeFlex);

    var move = this.movedata["moves"].find((x) => x.name === node.move);
    var rootFlex;
    if (move === undefined)
        rootFlex = CreateClassElement("button", "flexitem", node.move);
    else var rootFlex = this.CreateMoveNode(move);
    nodeFlex.appendChild(rootFlex);

    if (container.parentElement.id !== "combos") {
        var fromNode = nodeFlex.parentElement.previousSibling;
        window.setTimeout(function () {
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
                var text = createSVGtext(
                    condition,
                    (fromX + toX) / 2,
                    (fromY + toY) / 2
                );
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
        this.AppendNode(linkNode, linksFlex, nodeList, link.condition);
    }

    var marginLeftVW = 2;
    var marginRightVW = 2;
    if (maxConditionTextLength > 0) {
        marginRightVW = Math.min(Math.max(maxConditionTextLength * 2.5, 2), 20);
    }
    var marginLeftPX = Math.ceil((window.innerWidth * marginLeftVW) / 100);
    var marginRightPX = Math.ceil((window.innerWidth * marginRightVW) / 100);
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
    // moveFlex.setAttribute("v-on:click", "TestClick");
    moveFlex.addEventListener("click", function () {
        this.currentmove = move;
        this.aaa = "onclick";
        console.log(this.currentmove.name);
    });
    moveFlex.addEventListener("click", this.TestClick);
    return moveFlex;
}

function OnClickMoveButton(moveName) {
    console.log("CLICK");
    if (this.movedata == undefined || !this.movedata.hasOwnProperty(move))
        return;
    let move = this.movedata[moveName];

    var panel = this.$refs.moveinfopanel();
    panel.style.display = "block";
    panel.style.top = window.pageYOffset + 200 + "px";
    panel.addEventListener("click", this.OnClickCloseMoveInfo);

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
    } else preaction.parentNode.style.display = "none";

    var action = document.getElementById("moveinfo-action");
    if (!IsNullOrEmpty(move.action)) {
        action.parentNode.style.display = "flex";
        action.innerHTML = move.action;
    } else action.parentNode.style.display = "none";

    var recovery = document.getElementById("moveinfo-recovery");
    if (!IsNullOrEmpty(move.recovery)) {
        recovery.parentNode.style.display = "flex";
        recovery.innerHTML = move.recovery;
    } else recovery.parentNode.style.display = "none";

    var note = document.getElementById("moveinfo-note");
    if (!IsNullOrEmpty(move.note)) {
        note.parentNode.style.display = "flex";
        note.innerHTML = move.note;
    } else note.parentNode.style.display = "none";
}
function OnClickCloseMoveInfo(e) {
    var panel = this.$refs.moveinfopanel();
    panel.style.display = "none";
    panel.removeEventListener("click", OnClickCloseMoveInfo);
}

// for (key in dexData) {
//     var mon = dexData[key];
//     if (mon.species !== "") {
//         if (speciesDictionary.hasOwnProperty(mon.species) == false) {
//             speciesDictionary[mon.species] = {};
//         }
//         speciesDictionary[mon.species][key] = dexData[key];
//     }

//     // var btn = CreateClassElement("BUTTON", "button-mon");
//     // btn.setAttribute("onclick", "SetMon('" + key + "')");
//     // var btnicon = new Image();
//     // btnicon.className = "image-button-mon-icon";
//     // btnicon.src = IsNullOrEmpty(mon.icon) ? "images/monsters/icons/icon_unknown.png" : mon.icon;
//     // var btnText = CreateClassElement("div", "text-button-mon-name", key);
//     // btn.appendChild(btnicon);
//     // btn.appendChild(btnText);
//     // monlist.appendChild(btn);
// }

// // var speciesList = document.getElementById('specieslist');
// // var allspeciesBtn = CreateClassElement("BUTTON", "btnspecies flex-2", "all");
// // allspeciesBtn.setAttribute("onclick", "Setspecies('全部')");
// // speciesList.appendChild(allspeciesBtn);
// // for (var specie in speciesDictionary) {
// //     var btn = CreateClassElement("BUTTON", "btnspecies flex-1", specie);
// //     btn.setAttribute("onclick", "Setspecies('" + specie + "')");
// //     speciesList.appendChild(btn);
// // }





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