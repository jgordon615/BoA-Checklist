function initialize() {
	document.onclick = recreateChecks;
	createChecks();
}

function createChecks() {
	var records = document.getElementsByClassName("record");

	for(var i=0; i<records.length; i++) {
		var record = records[i];
		
		var check = document.createElement('input');
		check.className = "boa_checklist";
		check.type = "checkbox";
		check.record = record;
		record.getElementsByTagName("td")[0].appendChild(check);
		
		var val = localStorage.getItem(record.id);
		check.checked = val === "true";
		
		check.onclick = toggle; 
		check.onload = function() { console.log("LOADING"); };
	}
}

function recreateChecks() {
	var checks = document.getElementsByClassName("boa_checklist");
	
	for(var i=checks.length-1; i>=0; i--) {
		checks[i].parentNode.removeChild(checks[i]);
	}
	
	createChecks();
}

function toggle(e) {
	var record = e.srcElement.record;
	if (record) {
		if (!e.srcElement.checked) {
			localStorage.removeItem(record.id);
		} else {
			localStorage.setItem(record.id, "true");
		}
	}
};

initialize();