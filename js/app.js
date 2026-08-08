document.addEventListener("DOMContentLoaded", async () => {

    const route = getRoute();

    if (!route) {

        document.getElementById("courier").textContent =
            "Unknown";

        document.getElementById("tracking").textContent =
            "Not found";

        return;
    }

    document.getElementById("courier").textContent =
        route.courier.toUpperCase();

    document.getElementById("tracking").textContent =
        route.trackingNumber;

    try {

        const response = await fetch("data/couriers.json");

        if (!response.ok) {
            throw new Error("Could not load courier configuration.");
        }

        const couriers = await response.json();

        const courier = couriers[route.courier];

        if (!courier) {
            throw new Error(
                "Courier '" + route.courier + "' is not configured."
            );
        }

        /*
         * Small delay so the customer actually sees
         * the loading screen before navigation begins.
         */

        setTimeout(() => {

            redirectToCourier(route, courier);

        }, 700);

    } catch (error) {

        document.getElementById("courier").textContent =
            "Error";

        document.getElementById("tracking").textContent =
            route.trackingNumber;

        console.error(error);
    }

});