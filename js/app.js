document.addEventListener("DOMContentLoaded", async () => {

    const route = getRoute();

    if (!route) {
        showError(
            "Invalid Tracking Link",
            "ट्रैकिंग लिंक अमान्य है",
            "This tracking link is incomplete or incorrect."
        );
        return;
    }

    document.getElementById("courier").textContent =
        route.courier.toUpperCase();

    document.getElementById("tracking").textContent =
        route.trackingNumber;

    try {

        const response = await fetch("data/couriers.json");

        if (!response.ok) {
            throw new Error("Configuration unavailable.");
        }

        const couriers = await response.json();

        const courier = couriers[route.courier];

        if (!courier) {
            showError(
                "Courier Not Recognized",
                "कूरियर की पहचान नहीं हो सकी",
                "This tracking link contains an unrecognized courier."
            );
            return;
        }

        if (!route.trackingNumber.trim()) {
            showError(
                "Tracking Number Missing",
                "ट्रैकिंग नंबर उपलब्ध नहीं है",
                "This tracking link does not contain a docket number."
            );
            return;
        }

        setTimeout(() => {
            redirectToCourier(route, courier);
        }, 700);

    } catch (error) {

        console.error(error);

        showError(
            "Something Went Wrong",
            "कुछ समस्या हुई है",
            "We could not process this tracking link. Please try again."
        );

    }

});


function showError(title, subtitle, message) {

    document.getElementById("title").textContent = title;

    document.getElementById("subtitle").textContent = subtitle;

    document.getElementById("message").textContent = message;

    document.getElementById("loader").style.display = "none";

}