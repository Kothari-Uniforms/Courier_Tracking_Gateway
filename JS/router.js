function getRoute() {
    const parts = window.location.pathname
        .split("/")
        .filter(Boolean);

    const trackIndex = parts.indexOf("track");

    if (trackIndex === -1 || parts.length < trackIndex + 3) {
        return null;
    }

    return {
        courier: parts[trackIndex + 1].toLowerCase(),
        trackingNumber: decodeURIComponent(parts[trackIndex + 2])
    };
}