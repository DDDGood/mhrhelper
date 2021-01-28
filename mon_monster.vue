<template>
  <div id="layer0">
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
          <tr class="panel-text" v-for="part of mondata.parts" :key="part.name+part.state">
            <td>{{part.name}}</td>
            <td>{{part.state}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[0]>=45}">{{part.hitData[0]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[1]>=45}">{{part.hitData[1]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[2]>=45}">{{part.hitData[2]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[3]>=25}">{{part.hitData[3]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[4]>=25}">{{part.hitData[4]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[5]>=25}">{{part.hitData[5]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[6]>=25}">{{part.hitData[6]}}</td>
            <td v-bind:class="{'hitdata-highlight':part.hitData[7]>=25}">{{part.hitData[7]}}</td>
          </tr>
        </tbody>
      </table>
    </details>
    <div id="divmoves">
      <details open>
        <summary class="header2">對戰要點</summary>
        <span id="moveoutline" v-html="GetDescriptionText('outline','move')"></span>
      </details>
      <details open>
        <summary class="header2">招式派生</summary>
        <div class="description-text">(點擊可查看招式介紹)</div>
        <div id="combos" ref="combos">g</div>
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
</template>
<script>
module.exports = {
  props: ["dex", "moves", "mondata", "movedata"],
  created: function () {
    this.mondata = this.dex[this.$route.params.name];
    this.movedata = this.moves[this.$route.params.name];
  },
  mounted: function () {
    this.SetCombo();
  },
  methods: {
    GetDescriptionText: function (key, from) {
      let data = from === "move" ? this.movedata : this.mondata;
      if (data.hasOwnProperty(key) && data[key] != undefined) {
        let result = "";
        var descTexts = data[key].split("\n", -1);
        for (let text of descTexts) {
          if (text.startsWith("[img]"))
            result += "<img class='description-image' src='" + text.substring(5) + "'>";
          else
            result += "<p class='description-text'>" + (IsNullOrEmpty(text) ? "<br>" : text) + "</p>";
        }
        return result;
      } else
        return "";
    },
    SetCombo: function () {
      let divCombos = this.$refs.combos;
      divCombos.innerHTML = "";

      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      divCombos.appendChild(svg);

      var normalCondition = CreateClassElement("div", "combo-condition-container-normal");
      divCombos.appendChild(normalCondition);

      for (var id = 0; id < this.movedata['moves'].length; id++) {
        var move = this.movedata['moves'][id];
        if (move.onlyincombo == false) {

          var nodeFlex = CreateClassElement("div", "flexboxrow");
          if (!IsNullOrEmpty(move.condition))
            this.FindOrAddComboConditionContainer(move.condition).appendChild(nodeFlex);
          else
            normalCondition.appendChild(nodeFlex);

          var rootFlex = this.CreateMoveNode(move);
          var marginLeftVW = 2;
          var marginLeftPX = Math.ceil((window.innerWidth * marginLeftVW / 100));
          rootFlex.style.marginLeft = marginLeftPX + "px";
          nodeFlex.appendChild(rootFlex);
        }
      }

      for (var id = 0; id < this.movedata['combos'].length; id++) {
        var combo = this.movedata['combos'][id];
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
    },
    AppendNode: function (node, container, nodeList, condition) {

      if (node === undefined)
        return;

      var nodeFlex = CreateClassElement("div", "flexboxrow");
      container.appendChild(nodeFlex);

      var move = this.movedata['moves'].find(x => x.name === node.move);
      var rootFlex;
      if (move === undefined)
        rootFlex = CreateClassElement("button", "flexitem", node.move);
      else
        var rootFlex = this.CreateMoveNode(move);
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
        this.AppendNode(linkNode, linksFlex, nodeList, link.condition);
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
      moveFlex.onclick = function () {
        OnClickMoveButton(move);
      };
      return moveFlex;
    }
  }
};
</script>  