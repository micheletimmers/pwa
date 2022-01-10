
	//Kijk of browser Service Workers ondersteunt, zo ja, registreer de SW
	if("serviceWorker" in navigator){
	navigator.serviceWorker.register("service-worker.js").then(function(registering){
		// Registratie SW is succesvol
		console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
	}).catch(function(error){
		//Registratie SW is mislukt
		console.log("Browser: Service Worker registration failed with the error",error);
	});
	} else {
	//Registratie van SW is mislukt
	console.log("Browser: I don't support Service Workers :(");
	}
