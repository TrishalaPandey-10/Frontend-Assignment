interface Incident {
    id: number;
    title: string;
    description: string;
    severity: string;
    reported_at: string;
  }
  
  let incidents: Incident[] = [
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
  
  const incidentList = document.getElementById('incidentList') as HTMLDivElement;
  const filterSeverity = document.getElementById('filterSeverity') as HTMLSelectElement;
  const sortDate = document.getElementById('sortDate') as HTMLSelectElement;
  const incidentForm = document.getElementById('incidentForm') as HTMLFormElement;
  
  function renderIncidents(list: Incident[]) {
    incidentList.innerHTML = '';
  
    list.forEach(incident => {
      const card = document.createElement('div');
      card.className = 'incident-card';
      card.innerHTML = `
        <h3>${incident.title}</h3>
        <p>Severity: ${incident.severity}</p>
        <p>Reported: ${new Date(incident.reported_at).toLocaleDateString()}</p>
        <button data-id="${incident.id}" class="view-details">View Details</button>
        <div id="desc-${incident.id}" style="display:none;margin-top:10px;">${incident.description}</div>
      `;
      incidentList.appendChild(card);
    });
  
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = (e.target as HTMLElement).getAttribute('data-id');
        const desc = document.getElementById(`desc-${id}`);
        if (desc) {
          desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
  }
  
  function applyFilters() {
    let filtered = [...incidents];
  
    const severity = filterSeverity.value;
    if (severity !== 'All') {
      filtered = filtered.filter(i => i.severity === severity);
    }
  
    if (sortDate.value === 'newest') {
      filtered.sort((a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime());
    }
  
    renderIncidents(filtered);
  }
  
  filterSeverity.addEventListener('change', applyFilters);
  sortDate.addEventListener('change', applyFilters);
  
  incidentForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const descInput = document.getElementById('description') as HTMLTextAreaElement;
    const severityInput = document.getElementById('severity') as HTMLSelectElement;
  
    if (!titleInput.value || !descInput.value || !severityInput.value) {
      alert('Please fill in all fields!');
      return;
    }
  
    const newIncident: Incident = {
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
  