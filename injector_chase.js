function initialize() {
    document.onclick = recreateChecks;
    createChecks();
}

function createChecks() {
    var records = $(".overview-activity-container .transaction-container tr"); // :has(td.type)

    for (var i = 0; i < records.length; i++) {
        var record = $(records[i]);

        var date = record.find("td:nth-child(1)").text().trim(),
            desc = record.find("td:nth-child(2)").text().trim(),
            type = record.find("td:nth-child(3)").text().trim(),
            amount = record.find("td:nth-child(4)").text().trim();

        if (type && !amount) {
            amount = type;
        }

        if (date && desc && type && amount) {
            record.id = `${date}-${desc}-${amount}`;

            var check = document.createElement('input');
            check.className = "boa_checklist";
            check.type = "checkbox";
            check.record = record;
            check.onclick = toggle;

            var container = record.find("td:nth-child(1)");

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
    var evt = e ? e : window.event;
    if (evt.stopPropagation) evt.stopPropagation();
    if (evt.cancelBubble != null) evt.cancelBubble = true;
}

initialize();