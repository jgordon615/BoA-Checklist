function initialize() {
	document.onclick = recreateChecks;
	createChecks();
}

function createChecks() {
	//var records = document.getElementsByClassName("tranClass");
	var records = $("#transactionsBodyId tr");

	for(var i=0; i<records.length; i++) {
		var record = records[i];
		
		if (record.id && record.id.match(/^transaction-/)) {
			var check = document.createElement('input');
			check.className = "boa_checklist";
			check.type = "checkbox";
			check.record = record;
            check.onclick = toggle;

            var container = $(record).find(".BODY .xs-overflow");

			if (container) {
				container.prepend(check);
			} else {
				console.log("Could not place checkmark for record", record);
			}
			
			var val = localStorage.getItem(record.id);
			check.checked = val === "true";
		}
	}
}

function recreateChecks() {
	$(".boa_checklist").remove();
	createChecks();
}

function toggle(e) {
	var record = e.srcElement.record;

	var key = record.id;

	if (record) {
		if (!e.srcElement.checked) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, "true");
		}
	}
	
	cancelBubble(e);
}

function cancelBubble(e) {
 var evt = e ? e:window.event;
 if (evt.stopPropagation)    evt.stopPropagation();
 if (evt.cancelBubble!=null) evt.cancelBubble = true;
}

initialize();