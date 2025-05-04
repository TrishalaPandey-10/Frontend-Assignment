var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var incidents = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics...",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z"
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "LLM provided incorrect safety procedure information...",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z"
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata...",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z"
    }
];
var incidentList = document.getElementById('incidentList');
var filterSeverity = document.getElementById('filterSeverity');
var sortDate = document.getElementById('sortDate');
var incidentForm = document.getElementById('incidentForm');
function renderIncidents(list) {
    incidentList.innerHTML = '';
    list.forEach(function (incident) {
        var card = document.createElement('div');
        card.className = 'incident-card';
        card.innerHTML = "\n        <h3>".concat(incident.title, "</h3>\n        <p>Severity: ").concat(incident.severity, "</p>\n        <p>Reported: ").concat(new Date(incident.reported_at).toLocaleDateString(), "</p>\n        <button data-id=\"").concat(incident.id, "\" class=\"view-details\">View Details</button>\n        <div id=\"desc-").concat(incident.id, "\" style=\"display:none;margin-top:10px;\">").concat(incident.description, "</div>\n      ");
        incidentList.appendChild(card);
    });
    document.querySelectorAll('.view-details').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            var desc = document.getElementById("desc-".concat(id));
            if (desc) {
                desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
}
function applyFilters() {
    var filtered = __spreadArray([], incidents, true);
    var severity = filterSeverity.value;
    if (severity !== 'All') {
        filtered = filtered.filter(function (i) { return i.severity === severity; });
    }
    if (sortDate.value === 'newest') {
        filtered.sort(function (a, b) { return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime(); });
    }
    else {
        filtered.sort(function (a, b) { return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime(); });
    }
    renderIncidents(filtered);
}
filterSeverity.addEventListener('change', applyFilters);
sortDate.addEventListener('change', applyFilters);
incidentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var titleInput = document.getElementById('title');
    var descInput = document.getElementById('description');
    var severityInput = document.getElementById('severity');
    if (!titleInput.value || !descInput.value || !severityInput.value) {
        alert('Please fill in all fields!');
        return;
    }
    var newIncident = {
        id: incidents.length + 1,
        title: titleInput.value,
        description: descInput.value,
        severity: severityInput.value,
        reported_at: new Date().toISOString()
    };
    incidents.push(newIncident);
    titleInput.value = '';
    descInput.value = '';
    severityInput.value = '';
    applyFilters();
});

applyFilters();
