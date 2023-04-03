function callAPI() {
	var el = document.querySelector('#api-results');
	el.innerHTML = "Loading...";
	AP.context.getToken(async function (token) {
		var response = await fetch("/api/example?jwt=" + token);
		el.innerHTML = JSON.stringify(response, null, 2);
	});
}
