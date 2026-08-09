function redirectToCourier(route, courier) {

    if (courier.method === "GET") {

        const url =
            (courier.front || "") +
            encodeURIComponent(route.trackingNumber) +
            (courier.back || "");

        window.location.href = url;

        return;
    }

    if (courier.method === "POST") {

        const iframe = document.createElement("iframe");

        iframe.name = "trackingFrame";
        iframe.style.display = "none";

        document.body.appendChild(iframe);

        const form = document.createElement("form");

        form.method = "POST";
        form.action = courier.action;
        form.target = "trackingFrame";
        form.style.display = "none";

        const input = document.createElement("input");

        input.type = "hidden";
        input.name = courier.field;
        input.value = route.trackingNumber;

        form.appendChild(input);

        document.body.appendChild(form);

        form.submit();

        return;
    }

    if (courier.method === "SERVER") {

        const url =
            courier.worker +
            "?courier=" +
            encodeURIComponent(route.courier) +
            "&awb=" +
            encodeURIComponent(route.trackingNumber);

        window.location.href = url;

        return;
    }

    throw new Error("Unsupported courier method.");
}