let boardSvg = null;


/* =========================================================
   LOAD SVG BOARD
   ========================================================= */

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

        // Remove fixed dimensions so CSS can control the size
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


/* =========================================================
   CHANGE TEXT IN SVG
   ========================================================= */

function setText(id, value) {

    if (!boardSvg) {
        return;
    }

    const element =
        boardSvg.querySelector("#" + id);

    if (!element) {
        console.warn(
            "Missing SVG element:",
            id
        );

        return;
    }

    element.textContent = value;
}


/* =========================================================
   UPDATE STOP LIST
   ========================================================= */

function updateStops() {

    if (!boardSvg) {
        return;
    }

    const stopsElement =
        boardSvg.querySelector("#stops");

    if (!stopsElement) {
        console.warn(
            "Missing SVG element: stops"
        );

        return;
    }


    const input =
        document.getElementById("stopsInput");


    if (!input) {
        console.warn(
            "Missing HTML element: stopsInput"
        );

        return;
    }


    const stops = input.value
        .split("\n")
        .map(stop => stop.trim())
        .filter(stop => stop !== "");


    // Remove old stops

    stopsElement.replaceChildren();


    // Maximum number of stops that fit
    // in the current board design

    const maxStops = 4;


    stops
        .slice(0, maxStops)
        .forEach((stop, index) => {

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


            if (index === 0) {

                tspan.setAttribute(
                    "y",
                    "79.36"
                );

            } else {

                tspan.setAttribute(
                    "x",
                    "66.17"
                );

                tspan.setAttribute(
                    "dy",
                    "13.2"
                );
            }


            stopsElement.appendChild(tspan);
        });
}


/* =========================================================
   UPDATE TOP BAR COLOUR
   ========================================================= */

function updateColour() {

    if (!boardSvg) {
        return;
    }


    const input =
        document.getElementById("colorInput");


    if (!input) {
        console.warn(
            "Missing HTML element: colorInput"
        );

        return;
    }


    const colour =
        input.value.trim();


    // Accept only 6-digit HEX colours

    if (!/^#[0-9A-Fa-f]{6}$/.test(colour)) {

        console.warn(
            "Invalid HEX colour:",
            colour
        );

        return;
    }


    const topBar =
        boardSvg.querySelector("#topBar");


    if (!topBar) {

        console.warn(
            "Missing SVG element: topBar"
        );

        return;
    }


    topBar.setAttribute(
        "fill",
        colour
    );
}


/* =========================================================
   UPDATE ENTIRE BOARD
   ========================================================= */

function updateBoard() {

    if (!boardSvg) {
        return;
    }


    /* Platform */

    const platformInput =
        document.getElementById("platformInput");

    if (platformInput) {
        setText(
            "platform",
            platformInput.value
        );
    }


    /* Destination */

    const destinationInput =
        document.getElementById(
            "destinationInput"
        );

    if (destinationInput) {
        setText(
            "destination",
            destinationInput.value
        );
    }


    /* Minutes */

    const minsInput =
        document.getElementById(
            "minsInput"
        );

    if (minsInput) {
        setText(
            "mins",
            minsInput.value
        );
    }


    /* Pattern */

    const patternInput =
        document.getElementById(
            "patternInput"
        );

    if (patternInput) {
        setText(
            "pattern",
            patternInput.value
        );
    }


    /* Cars */

    const carsInput =
        document.getElementById(
            "carsInput"
        );

    if (carsInput) {
        setText(
            "cars",
            carsInput.value
        );
    }


    /* Then */

    const thenInput =
        document.getElementById(
            "thenInput"
        );

    if (thenInput) {
        setText(
            "then",
            thenInput.value
        );
    }


    /* Second service minutes */

    const secondMinsInput =
        document.getElementById(
            "secondMinsInput"
        );

    if (secondMinsInput) {
        setText(
            "secondMins",
            secondMinsInput.value
        );
    }


    /* Second service pattern */

    const secondPatternInput =
        document.getElementById(
            "secondPatternInput"
        );

    if (secondPatternInput) {
        setText(
            "secondPattern",
            secondPatternInput.value
        );
    }


    /* Time */

    const timeInput =
        document.getElementById(
            "timeInput"
        );

    if (timeInput) {
        setText(
            "time",
            timeInput.value
        );
    }


    /* Stops */

    updateStops();


    /* Top bar colour */

    updateColour();
}


/* =========================================================
   UPDATE BUTTON
   ========================================================= */

const updateButton =
    document.getElementById(
        "updateButton"
    );


if (updateButton) {

    updateButton.addEventListener(
        "click",
        updateBoard
    );
}


/* =========================================================
   LOAD BOARD
   ========================================================= */

loadBoard();
