let boardSvg;

async function loadBoard() {
    const response = await fetch("board.svg");
    const svgText = await response.text();

    const parser = new DOMParser();
    const document = parser.parseFromString(svgText, "image/svg+xml");

    boardSvg = document.documentElement;

    document.getElementById("board").appendChild(boardSvg);

    updateBoard();
}

function setText(id, value) {
    const element = boardSvg.getElementById(id);

    if (!element) {
        console.warn(`Couldn't find SVG element: ${id}`);
        return;
    }

    element.textContent = value;
}

function updateBoard() {

    setText(
        "platform",
        document.getElementById("platformInput").value
    );

    setText(
        "destination",
        document.getElementById("destinationInput").value
    );

    setText(
        "mins",
        document.getElementById("minsInput").value
    );

    setText(
        "pattern",
        document.getElementById("patternInput").value
    );

    setText(
        "cars",
        document.getElementById("carsInput").value
    );

    setText(
        "then",
        document.getElementById("thenInput").value
    );

    setText(
        "secondMins",
        document.getElementById("secondMinsInput").value
    );

    setText(
        "secondPattern",
        document.getElementById("secondPatternInput").value
    );

    setText(
        "time",
        document.getElementById("timeInput").value
    );
}

document
    .getElementById("updateButton")
    .addEventListener("click", updateBoard);

loadBoard();
