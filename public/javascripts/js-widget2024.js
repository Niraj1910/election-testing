const TOTAL_SEATS = 81;
    const MAJORITY_MARK = 41;

    async function getData() {
      try {
        const response = await fetch('/api/elections/party-summary');
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        // Mock data for testing
        return {
          parties: [
            { name: 'JMM+', won: 45, leading: 0, partyColor: '#00FF00' },
            { name: 'BJP+', won: 25, leading: 0, partyColor: '#FF9933' },
            { name: 'JLKM', won: 6, leading: 0, partyColor: '#0000FF' },
            { name: 'Others', won: 5, leading: 0, partyColor: '#808080' }
          ],
          declaredSeats: 81
        };
      }
    }

    function getPartyTotal(party) {
      return party.won + party.leading;
    }

    function calculateBarWidths(parties) {
      const totalSeats = TOTAL_SEATS;
    
      // Find alliances and other parties
      const bjpAlliance = parties.find(p => p.name === 'BJP+');
      const jmmAlliance = parties.find(p => p.name === 'JMM+');
      const otherParties = parties.filter(p => p.name !== bjpAlliance.name && p.name !== jmmAlliance.name);
    
      let widths = [];
      let currentPosition = 0;
    
      // Add JMM+ bar at the start
      const jmmWidth = (getPartyTotal(jmmAlliance) / totalSeats) * 100;
      widths.push({
        party: jmmAlliance,
        width: jmmWidth,
        position: currentPosition
      });
      currentPosition += jmmWidth;

      
      if(getPartyTotal(jmmAlliance) > getPartyTotal(bjpAlliance)){
        // Calculate total allocated seats
        const totalAllocatedSeats = parties.reduce((sum, party) => sum + getPartyTotal(party), 0);
        const blankSeats = totalSeats - totalAllocatedSeats;

        // Add blank bar (if any) between "Other Parties" and BJP+
        if (blankSeats > 0) {
          const blankWidth = (blankSeats / totalSeats) * 100;
          widths.push({
            party: { name: 'Blank', partyColor: '#E0E0E0' }, // Gray for blank
            width: blankWidth,
            position: currentPosition
          });
          currentPosition += blankWidth;
        }
        // Add other parties in the middle
        otherParties.forEach(party => {
          const partyWidth = (getPartyTotal(party) / totalSeats) * 100;
          widths.push({
            party: party,
            width: partyWidth,
            position: currentPosition
          });
          currentPosition += partyWidth;
        });
      } else {
        // Calculate total allocated seats
        const totalAllocatedSeats = parties.reduce((sum, party) => sum + getPartyTotal(party), 0);
        const blankSeats = totalSeats - totalAllocatedSeats;
        // Add other parties in the middle
        otherParties.forEach(party => {
          const partyWidth = (getPartyTotal(party) / totalSeats) * 100;
          widths.push({
            party: party,
            width: partyWidth,
            position: currentPosition
          });
          currentPosition += partyWidth;
        });
        // Add blank bar (if any) between "Other Parties" and BJP+
        if (blankSeats > 0) {
          const blankWidth = (blankSeats / totalSeats) * 100;
          widths.push({
            party: { name: 'Blank', partyColor: '#E0E0E0' }, // Gray for blank
            width: blankWidth,
            position: currentPosition
          });
          currentPosition += blankWidth;
        }
      }
  
      // Add BJP+ bar at the end
      const bjpWidth = (getPartyTotal(bjpAlliance) / totalSeats) * 100;
      widths.push({
        party: bjpAlliance,
        width: bjpWidth,
        position: currentPosition
      });
    
      return widths;
    }

    async function updateResults() {
      const data = await getData();
      if (!data) return;

      const bjpAlliance = data.parties.find(p => p.name === 'BJP+');
      const jmmAlliance = data.parties.find(p => p.name === 'JMM+');
      
      // Update party names and scores
      document.getElementById('bjp-name').textContent = bjpAlliance.name;
      document.getElementById('jmm-name').textContent = jmmAlliance.name;

      document.getElementById('bjp-score').textContent = getPartyTotal(bjpAlliance);
      document.getElementById('bjp-score').style.color = bjpAlliance.partyColor;
      
      document.getElementById('jmm-score').textContent = getPartyTotal(jmmAlliance);
      document.getElementById('jmm-score').style.color = jmmAlliance.partyColor;

      // Calculate and update bars
      const barsContainer = document.getElementById('bars-container');
      barsContainer.innerHTML = ''; // Clear existing bars
      
      const barWidths = calculateBarWidths(data.parties);
      
      barWidths.forEach(({ party, width, position }) => {
        console.log(barWidths);
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.backgroundColor = party.partyColor;
        bar.style.width = `${width}%`;
        barsContainer.appendChild(bar);
      });
    }
    
    // Initial update
    updateResults();
    
    // Update every 30 seconds
    setInterval(updateResults, 30000);