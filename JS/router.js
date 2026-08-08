function getRoute() {
    const hash = window.location.hash;

    if (!hash.startsWith("#/track/")) {
        return null;
    }

    const parts = hash
        .substring(8)
        .split("/")
        .filter(Boolean);

    if (parts.length < 2) {
        return null;
    }

    return {
        courier: parts[0].toLowerCase(),
        trackingNumber: decodeURIComponent(parts[1])
    };
}