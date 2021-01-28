<template>
  <div id="layer0">
    <mon_moveinfopanel v-bind:mdata="currentmove" :test="aaa"></mon_moveinfopanel>
    <div id="layer2-grid">
      <div class="grid-area-right">
        <mon_card v-bind:mondata="GetCardData()"></mon_card>
      </div>
      <div class="grid-area-main">
        <details open>
          <summary class="header2">基本介紹</summary>
          <span id="description" v-html="GetDescriptionText('description')"></span>
        </details>
        <details open>
          <summary class="header2">詳細肉質(舊版資訊)</summary>
          <table id="table_hitdata">
            <tbody id="tbody_hitdata">
              <tr class="panel-text-bold">
                <th>部位</th>
                <th>狀態</th>
                <th>斬</th>
                <th>打</th>
                <th>彈</th>
                <th>火</th>
                <th>水</th>
                <th>雷</th>
                <th>冰</th>
                <th>龍</th>
              </tr>
              <tr class="panel-text" v-for="part of mondata.parts" :key="part.name + part.state">
                <td>{{ part.name }}</td>
                <td>{{ part.state }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[0] >= 45 }"
                >{{ part.hitData[0] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[1] >= 45 }"
                >{{ part.hitData[1] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[2] >= 45 }"
                >{{ part.hitData[2] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[3] >= 25 }"
                >{{ part.hitData[3] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[4] >= 25 }"
                >{{ part.hitData[4] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[5] >= 25 }"
                >{{ part.hitData[5] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[6] >= 25 }"
                >{{ part.hitData[6] }}</td>
                <td
                  v-bind:class="{ 'hitdata-highlight': part.hitData[7] >= 25 }"
                >{{ part.hitData[7] }}</td>
              </tr>
            </tbody>
          </table>
        </details>
        <div id="divmoves">
          <details open>
            <summary class="header2">對戰要點</summary>
            <span id="moveoutline" v-html="GetDescriptionText('outline', 'move')"></span>
          </details>
          <details open>
            <summary class="header2">招式派生</summary>
            <div class="description-text">(點擊可查看招式介紹)</div>
            <div id="combos" ref="combos"></div>
          </details>
        </div>
        <details>
          <summary class="header2">設定細節</summary>
          <span id="detail" v-html="GetDescriptionText('detail')"></span>
        </details>
        <details>
          <summary class="header2">參考資料</summary>
          <div id="reference"></div>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {
      currentmove: {
        name: "fromparrent",
        image: "333",
        preaction: "444",
        action: "555",
        recovery: "666",
        note: "777"
      },
      aaa: "watch"
    }
  },
  props: ["dex", "moves", "mondata", "movedata"],
  components: {
    "mon_card": httpVueLoader("mon_card.vue"),
    "mon_moveinfopanel": httpVueLoader("mon_moveinfopanel.vue"),
  },
  created: function () {
    this.mondata = this.dex[this.$route.params.name];
    this.movedata = this.moves[this.$route.params.name];
  },
  mounted: function () {
    this.SetCombo();
  },
  methods: {
    GetCardData: function () {
      this.aaa = this.mondata.nameTW;
      let cardData = {
        name1: "",
        icon: "",
        image: "",
        trait: {},
        weakness: { weapon: {}, element: {}, aliment: {} }
      };
      cardData.name1 = this.mondata.nameTW;
      cardData.name2 = this.mondata.nameJP;
      cardData.name3 = this.mondata.nameEN;
      cardData.species = this.mondata.species;
      if (IsNullOrEmpty(this.mondata.icon)) cardData.icon = "images/icons/monsters/icon_unknown.png";
      else cardData.icon = this.mondata.icon;
      if (IsNullOrEmpty(this.mondata.image)) cardData.images = "images/icons/monsters/icon_unknown.png";
      else cardData.image = this.mondata.image;
      if (!this.mondata.hasOwnProperty("trait"))
        cardData.trait = { roar: "－", wind: "－", tremer: "－", element: "－", aliment: "－" };
      else
        cardData.trait = JSON.parse(JSON.stringify(this.mondata.trait));
      for (let weakType in this.mondata.weakness) {
        if (weakType === "weapon") {
          cardData.weakness.weapon = [];
          for (let weakPart of this.mondata.weakness.weapon) {
            cardData.weakness.weapon.push(
              {
                part: weakPart.part,
                cut: ParseStars(weakPart.cut),
                blunt: ParseStars(weakPart.blunt),
                ammo: ParseStars(weakPart.ammo)
              }
            );
          }
          continue;
        }
        let weakData = this.mondata.weakness[weakType];
        let specialCase = false;
        let conditionText = "";
        let values = {}
        for (let weakState of weakData) {

          console.log("-" + weakState);
          if (weakState.condition === "normal") {
            for (let dataKey in weakState) {
              if (dataKey == "condition")
                continue;
              values[dataKey] = ParseStars(weakState[dataKey]);
            }
          } else {
            if (specialCase === false) {
              specialCase = true;
              conditionText += weakState.condition;
            } else {
              conditionText += "、" + weakState.condition;
            }
            for (let dataKey in weakState) {
              values[dataKey] += "<br>(" + ParseStars(weakState[dataKey]) + ")";
            }
          }
        }
        cardData.weakness[weakType] = {
          condition: specialCase ? "(" + conditionText + ")" : "",
          values: values
        };
      }
      return cardData;
    },
    GetDescriptionText: function (key, from) {
      let data = from === "move" ? this.movedata : this.mondata;
      if (
        data != undefined &&
        data.hasOwnProperty(key) &&
        data[key] != undefined
      ) {
        let result = "";
        var descTexts = data[key].split("\n", -1);
        for (let text of descTexts) {
          if (text.startsWith("[img]"))
            result +=
              "<img class='description-image' src='" + text.substring(5) + "'>";
          else
            result +=
              "<p class='description-text'>" +
              (IsNullOrEmpty(text) ? "<br>" : text) +
              "</p>";
        }
        return result;
      } else return "";
    },
    SetCombo: function () {
      let divCombos = this.$refs.combos;
      divCombos.innerHTML = "";

      if (this.movedata == undefined)
        return;

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
    },
    FindOrAddComboConditionContainer: function (condition) {
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
    },
    AppendNode: function (node, container, nodeList, condition) {
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
    },
    CreateMoveNode: function (move) {
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
      // onclick = this.TestClick;
      // moveFlex.onclick = function () {
      //   this.currentmove = move;
      //   this.aaa = "onclick";
      //   console.log(this.currentmove.name);
      //   this.TestClick();
      // };
      return moveFlex;
    },
    TestClick: function () {
      console.log("CLICK");
      console.log(this.aaa);
      console.log(this.currentmove.name);
    },
    OnClickMoveButton: function (moveName) {
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
    },
    OnClickCloseMoveInfo: function (e) {
      var panel = this.$refs.moveinfopanel();
      panel.style.display = "none";
      panel.removeEventListener("click", OnClickCloseMoveInfo);
    }
  },
};
</script>  