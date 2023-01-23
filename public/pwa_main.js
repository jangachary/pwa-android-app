console.log("from pwa main");
window.onload = () => {
	"use strict";
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("swbasic.js").then(
			function(registration) {
				console.log("Service worker registration succeeded:", registration);


			},
        /*catch*/ function(error) {
				console.log("Service worker registration failed:", error);
			}
		);


	}
};

