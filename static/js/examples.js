function callAPI() {
	var el = document.querySelector('#api-results');
	el.innerHTML = "Loading...";
	AP.user.getCurrentUser(function(user) {
		AP.context.getToken(async function (token) {
			var response = await fetch("/api/example/user/" + user.atlassianAccountId + "?jwt=" + token);
			el.innerHTML = JSON.stringify(await response.json(), null, 2);
		});
	});
}

function showContextExample() {
	AP.navigator.go('addonmodule', {
		moduleKey: 'context',
		customData: {
			input: document.querySelector("#form-input").value
		}
	});
}
