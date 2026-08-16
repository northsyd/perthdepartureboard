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

        boardSvg.removeAttribute("width");
        boardSvg.removeAttribute("height");

        document
            .getElementById("board")
            .replaceChildren(boardSvg);

        updateBoard();

    } catch (error) {
        console.error(error);

        document.getElementById("board").innerHTML =
            "<p style='color:red'>Couldn't load board.svg.</p>";
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


function updateStops() {

    const stopsElement =
        boardSvg.querySelector("#stops");

    if (!stopsElement) {
        console.warn("Missing SVG element: stops");
        return;
    }

    const stops = document
        .getElementById("stopsInput")
        .value
        .split("\n")
        .map(stop => stop.trim())
        .filter(stop => stop !== "");

    // Remove existing stop lines
    stopsElement.replaceChildren();

    // Maximum number of lines that fit on the board
    const maxStops = 4;

    stops.slice(0, maxStops).forEach((stop, index) => {

        const tspan =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "tspan"
            );

        tspan.textContent = stop;

        tspan.setAttribute(
            "x",
            "66.17"
        );

        tspan.setAttribute(
            "y",
            index === 0 ? "79.36" : "79.36"
        );

        if (index > 0) {
            tspan.setAttribute(
                "dy",
                "13.2"
            );
        }

        stopsElement.appendChild(tspan);
    });
}


function updateColour() {

    const colour =
        document
            .getElementById("colorInput")
            .value
            .trim();

    // Basic HEX validation
    if (!/^#[0-9A-Fa-f]{6}$/.test(colour)) {
        console.warn("Invalid HEX colour:", colour);
        return;
    }

    const topBar =
        boardSvg.querySelector("#topBar");

    if (!topBar) {
        console.warn("Missing SVG element: topBar");
        return;
    }

    topBar.setAttribute(
        "fill",
        colour
    );
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

    updateStops();
    updateColour();
}


document
    .getElementById("updateButton")
    .addEventListener(
        "click",
        updateBoard
    );


loadBoard();
