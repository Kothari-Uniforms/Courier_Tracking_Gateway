document.addEventListener("DOMContentLoaded", async () => {

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
        "Finding courier...";

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

        document.getElementById("status").textContent =
            "Redirecting to " + courier.name + "...";

        redirectToCourier(route, courier);

    } catch (error) {

        document.getElementById("status").textContent =
            error.message;

        console.error(error);
    }

});