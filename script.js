let boardSvg;

async function loadBoard() {
    try {
        const response = await fetch("./board.svg");

        if (!response.ok) {
            throw new Error("Could not load board.svg");
        }

        const svgText = await response.text();

        const parser = new DOMParser();
        const parsed = parser.parseFromString(
            svgText,
            "image/svg+xml"
        );

        boardSvg = parsed.documentElement;

        // Make sure it renders properly
        boardSvg.removeAttribute("width");
        boardSvg.removeAttribute("height");

        document.getElementById("board").replaceChildren(boardSvg);

        updateBoard();

    } catch (error) {
        console.error(error);

        document.getElementById("board").innerHTML =
            "<p style='color:red'>Couldn't load board.svg. Check that board.svg is in the same folder as index.html.</p>";
    }
}

function setText(id, value) {
    const element = boardSvg.querySelector("#" + id);

    if (!element) {
        console.warn("Missing SVG element:", id);
        return;
    }

    element.textContent = value;
}

function updateBoard() {
    setText("platform", document.getElementById("platformInput").value);
    setText("destination", document.getElementById("destinationInput").value);
    setText("mins", document.getElementById("minsInput").value);
    setText("pattern", document.getElementById("patternInput").value);
    setText("cars", document.getElementById("carsInput").value);
    setText("then", document.getElementById("thenInput").value);
    setText("secondMins", document.getElementById("secondMinsInput").value);
    setText("secondPattern", document.getElementById("secondPatternInput").value);
    setText("time", document.getElementById("timeInput").value);
}

document
    .getElementById("updateButton")
    .addEventListener("click", updateBoard);

loadBoard();
