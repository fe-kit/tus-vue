export function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}
export function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function randomRang(lower, upper, length) {
    if (upper < length) length = upper;
    const arr = [];
    while (length > 0) {
        const item = random(lower, upper);
        if (!arr.includes(item)) {
            arr.push(item);
            length--;
        }
    }
    return arr;
}

/*
    * 求圆周上等分点的坐标
    * ox,oy为圆心坐标
    * r为半径
    * count为等分个数
    */
export function getPoint(r, ox, oy, count, callback = () => { }) {
    const radians = (Math.PI / 180) * Math.round(360 / count); //弧度
    const arr = [];
    for (let i = 0; i < count; i++) {
        const x = ox + r * Math.sin(radians * i),
            y = oy + r * Math.cos(radians * i);
        callback(x, y, i);
        arr.unshift({ x: x, y: y }); //为保持数据顺时针
    }
    return arr;
}

export function drawBezier(lines, point, cls) {
    const L = [];
    const P = [];
    lines.forEach(item => {
        const p1 = item[0];
        const p2 = item[1];
        const p3 = item[2];
        const B = `M${point[p1].x} ${point[p1].y} Q ${point[p2].x} ${point[p2].y} ${point[p3].x} ${point[p3].y}`;
        L.push(B);
        P.push(`<path class="${cls}" d="${B}" fill="transparent"  />`);
    });
    return {
        L, P
    }
}

export function queue(arr) {
    let promise = Promise.resolve();
    arr.forEach(item => {
        promise = promise.then(item);
    })
    return promise;
}