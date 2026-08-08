document.addEventListener("DOMContentLoaded", () => {

    const route = getRoute();

    if (!route) {

        document.getElementById("status").textContent =
            "No tracking information found.";

        return;
    }

    document.getElementById("courier").textContent =
        route.courier;

    document.getElementById("tracking").textContent =
        route.trackingNumber;

    document.getElementById("status").textContent =
        "Route loaded successfully.";

});