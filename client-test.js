const url = "http://localhost:8125/?file=test.txt";

window.onload = () => {
	let data = new Object();
	data.desire = "list-files";
	data.folder = "shared";
	console.log(`trying to send: ${JSON.stringify(data)}`);

	try {
		dataString = JSON.stringify(data);
	} catch (e) {}

	fetch(url, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*"
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer" // no-referrer, *client
		// body: JSON.stringify(data) // body data type must match "Content-Type" header
	})
		.then(response => {
			let responseJSON = response.json();
			return responseJSON;
		})
		.then(json => {
			console.log(JSON.stringify(json));
			let fileList = document.createElement("ul");

			json.forEach(file => {
				//create required DOM nodes
				// let myRow = document.createElement("tr");
				let myItem = document.createElement("li");
				myItem.innerText = file;

				//append created nodes to each other and the list-div
				fileList.append(myItem);
				document.getElementById("BA_file_list").append(fileList);
			});
		});
};
