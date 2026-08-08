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
                "INVALID LINK",
                "अमान्य लिंक"
            );
            return;
        }

        document.getElementById("courier").textContent =
            courier.name;

        if (!route.trackingNumber.trim()) {
            showError(
                "INVALID LINK",
                "अमान्य लिंक"
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


function showError(title, subtitle) {

    document.getElementById("title").textContent =
        title;

    document.getElementById("subtitle").textContent =
        subtitle;

    document.getElementById("message").style.display =
        "none";

    document.getElementById("loader").style.display =
        "none";

    document.querySelector(".details").style.display =
        "none";

}