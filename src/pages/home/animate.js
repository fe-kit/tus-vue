import { queue } from '../../lib/common';

export async function addPoint(cx, cy, point, svg) {
    return new Promise((resolve) => {
        point.forEach((item, i) => {
            if (i < 4) {
                const circle = svg.paper.el("circle", {
                    cx,
                    cy,
                    r: 1,
                    fill: "transparent"
                });
                circle.animate(
                    { cx: item.x, cy: item.y, fill: "red", r: 10 },
                    1000,
                    mina.easein,
                    resolve
                );
            }
        });
    });
}



export async function circleRotate(cx, cy, g) {
    return new Promise(resolve => {
        Snap.animate(
            0,
            200,
            function (val) {
                var m = new Snap.Matrix();
                m.rotate((val / 250) * 360, cx, cy); // 注意，后面两位数是旋转中心点，属于绝对坐标，svg里节点的变换中心都是绝对坐标，和CSS的transform-origin取值不太一样
                g.transform(m);
            },
            1000,
            mina.easein,
            resolve
        );
    });
}

export async function circleScale(cx, cy, g) {
    return new Promise(resolve => {
        Snap.animate(
            1,
            0,
            function (val) {
                var m = new Snap.Matrix();
                m.translate(-cx * (val - 1), -cy * (val - 1))
                m.scale(val);
                g.transform(m);
            },
            1000,
            mina.easein,
            resolve
        );
    });
}

export async function reacTransform(svg, length) {
    const margin = 70;
    const maps = {
        x: -120,
        y: 0,
        width: 120,
        height: 90,
        radius: 0,
    };
    const tasks = [];
    const g = svg.paper.g();
    for (let i = 0; i < length; i++) {
        tasks.push(() => new Promise(resolve => {
            const react = svg.paper.rect(maps.x, maps.y, maps.width, maps.height, maps.radius);
            g.add(react);
            react.attr({
                fill: "#fff",
                stroke: "red",
                strokeWidth: 2,     // 驼峰命名...
                "fill-opacity": 0.5 // 或者短横符连接名称
            });
            react.animate(
                {
                    x: maps.width * i + i * margin
                },
                400,
                mina.easein,
                resolve
            );
        }));
    }
    g.drag((a, b, c, d, e) => {
        // console.info(a, b, c, d, e)
    }, (a, b, c, d, e) => {
        // console.info(a, b, c, d, e)
    }, (a, b, c, d, e) => {
        console.info(a, b, c, d, e)
    });
    queue(tasks).then(() => {
        console.info(999)
    })
}