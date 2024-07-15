function homeRedirect() {
    window.location.href = './hirePage.html'; 
}

function getLocation() {
    const locationStatus = document.getElementById('location-status');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationStatus.textContent = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const locationStatus = document.getElementById('location-status');
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationStatus.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

    // Here you can add code to fetch and display services near the obtained location
    // For example, you might send the coordinates to a server to get nearby services
}

function showError(error) {
    const locationStatus = document.getElementById('location-status');

    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationStatus.textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationStatus.textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            locationStatus.textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            locationStatus.textContent = "An unknown error occurred.";
            break;
    }
}

function filterProfiles() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const profiles = document.querySelectorAll('.profiles');

    profiles.forEach(profile => {
        const details = profile.querySelector('.details').innerText.toLowerCase();
        if (details.includes(query)) {
            profile.style.display = '';
        } else {
            profile.style.display = 'none';
        }
    });
}