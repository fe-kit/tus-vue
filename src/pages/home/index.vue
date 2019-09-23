<template>
  <div class="box">
    <svg
      class="svg"
      id="svg"
      width="800px"
      height="600px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="dong"
        d="M 10 75 Q 50 10 100 75 T 190 75"
        stroke="black"
        stroke-linecap="round"
        stroke-dasharray="5 5"
        fill="none"
      />
    </svg>
    <canvas class="canvas" id="canvas"></canvas>
  </div>
</template>

<script>
import Snap from "snapsvg-cjs";
import {
  randomRang,
  shuffle,
  random,
  getPoint,
  drawBezier
} from "../../lib/common";
import { evenLines, oddLines, outerCircle } from "./config";
import { addPoint, circleRotate, circleScale, reacTransform } from "./animate";
import "./lodash";

export default {
  name: "home",
  components: {},
  computed: {},
  methods: {},
  mounted: async function() {
    var object = { a: [{ b: { c: 3 } }] };
    _.get(object, "a[0].b.c");

    const ele = document.querySelector("#svg");
    const svg = Snap("#svg");
    const point = [];
    const cx = 400;
    const cy = 300;
    const radius = 100;
    const p = [
      `<circle class="outline" cx="${cx}" cy="${cy}" r="${radius}" fill="none" />`
    ];
    const outerPoint = [];
    let bezierlines = []; //贝塞尔曲线
    let intersectionPoints = []; //贝塞尔曲线交点
    const intersectionPoint = []; //贝塞尔曲线交点去重

    shuffle(outerCircle);
    getPoint(radius, cx, cy, 10, (x, y, i) => {
      outerPoint.push(
        `<circle cx=${x} cy=${y} r=${outerCircle[i].radius} fill=${outerCircle[i].color} />`
      );
      point.unshift({ x, y }); //为保持数据顺时针
    });
    const evenPoints = drawBezier(evenLines, point, "outline");
    const oddPoints = drawBezier(oddLines, point, "outline2");
    bezierlines = bezierlines.concat(evenPoints.L, oddPoints.L);
    ele.innerHTML = p.concat(evenPoints.P, oddPoints.P, outerPoint).join("");
    bezierlines.forEach((item, i) => {
      for (var j = i + 1; j < bezierlines.length; j++) {
        intersectionPoints = intersectionPoints.concat(
          Snap.path.intersection(bezierlines[i], bezierlines[j])
        );
      }
    });

    intersectionPoints.forEach(item => {
      if (
        item.t1 !== 1 &&
        item.t2 !== 1 &&
        Math.floor(item.t1 * 100) !== 99 &&
        Math.floor(item.t2 * 100) !== 99
      ) {
        intersectionPoint.push({ x: item.x, y: item.y });
      }
    });
    const innerCoordinate = randomRang(0, intersectionPoint.length - 1, 10);
    const innerPoint = [];
    innerCoordinate.forEach(i => {
      const item = intersectionPoint[i];
      innerPoint.push(
        `<circle cx="${item.x}" cy="${item.y}" r="4" fill="${
          random(0, 1) === 0 ? "#3F5DD6" : "#448583"
        }" />`
      );
    });
    ele.insertAdjacentHTML("beforeend", innerPoint.join(""));
    shuffle(point);
    await addPoint(cx, cy, point, svg);
    const all = svg.selectAll("circle,path");
    const g = svg.paper.g(all); // 注意这里元素的顺序是不一样的
    await circleRotate(cx, cy, g);
    await circleScale(cx, cy, g);
    reacTransform(svg, 5);

    const str =
      "qwertyuiopasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM0123456789";
    const fontSize = 16;
    const maps = {};
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    const width = 300;
    const height = 200;

    const colunms = Math.floor(width / fontSize);
    const rows = Math.floor(height / fontSize);
    for (let i = 0; i < colunms; i += 1) {
      maps[i] = 1000;
    }
    function draw() {
      context.fillStyle = "rgba(26, 40, 117, 0.05)";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px Consolas`;
      context.fillStyle = "#fff";
      context.textAlign = "center";
      for (let i = 0; i < colunms; i++) {
        const index = Math.floor(Math.random() * 10);
        const x = i * fontSize * 2;
        const y = maps[i] * fontSize;
        if (y >= height && Math.random() > 0.95) {
          maps[i] = rows;
        }
        maps[i] -= 1;
        if (maps[i] < 0) {
          maps[i] = rows;
        }

        context.fillText(str[index], x, y);
      }
    }
    draw();
    //setInterval(draw, 100);
  }
};
</script>

<style>
body {
  background-color: #1b2876;
}
.box {
  position: relative;
  width: 800px;
  height: 600px;
  margin: auto;
}
.canvas {
  position: absolute;
  left: 0;
  top: 150px;
  border: solid 2px #fff;
  border-radius: 5px;
}
.svg {
  background-color: #1b2876;
  margin: auto;
  display: block;
}

.outline {
  stroke: #8c94bd;
  stroke-width: 1px;
  stroke-dasharray: 5 5;
  animation: outline 1s linear infinite;
}

@keyframes outline {
  to {
    stroke-dashoffset: 19;
  }
}

.outline2 {
  stroke: #3e4b91;
  stroke-width: 1px;
  stroke-dasharray: 5 5;
}
</style>
