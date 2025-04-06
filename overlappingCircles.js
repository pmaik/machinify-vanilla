const playground = document.querySelector(".playground");
const overlappingMessage = document.querySelector(".overlapping-message");
let count = 0;

const getRandomRadius = () => {
    return Math.floor(Math.random() * 91) + 10;
};

const renderCircle = (x, y, radius, className) => {
    const circle = document.createElement("div");
    circle.classList.add(className);
    circle.style.width = `${2 * radius}px`;
    circle.style.height = `${2 * radius}px`;
    circle.style.position = "absolute";
    circle.style.left = `${x - radius}px`;
    circle.style.top = `${y - radius}px`;

    playground.appendChild(circle);
};

const deleteCircles = () => {
    const circle1 = document.querySelector(".circle-1");
    const circle2 = document.querySelector(".circle-2");

    if (circle1) {
        circle1.remove();
    }
    if (circle2) {
        circle2.remove();
    }
};

const checkOverlapping = () => {
    const circle1 = document.querySelector(".circle-1");
    const circle2 = document.querySelector(".circle-2");

    const rect1 = circle1?.getBoundingClientRect();
    const rect2 = circle2?.getBoundingClientRect();

    const radius1 = rect1.width / 2;
    const radius2 = rect2.width / 2;

    const x1 = rect1.left + radius1;
    const y1 = rect1.top + radius1;

    const x2 = rect2.left + radius2;
    const y2 = rect2.top + radius2;

    const dx = x1 - x2;
    const dy = y1 - y2;

    const centerDistance = Math.sqrt(dx * dx + dy * dy);
    const isOverlapping = centerDistance < radius1 + radius2;

    // console.log(rect1, rect2);
    console.log("Radius", radius1, radius2);
    // console.log([x1, y1], [x2, y2]);
    console.log(centerDistance, radius1 + radius2);
    console.log("isOverlapping", isOverlapping);

    return isOverlapping;
};

playground.addEventListener("click", (e) => {
    count++;
    if (count > 2) {
        count = 1;
        deleteCircles();
    }

    const x = e.clientX;
    const y = e.clientY;
    const radius = getRandomRadius();
    renderCircle(x, y, radius, `circle-${count}`);

    if (count == 2 && checkOverlapping()) {
        overlappingMessage.style.display = "block";
    } else {
        overlappingMessage.style.display = "none";
    }
});
