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
      let widths = [];

        const bjpAlliance = parties.find(p => p.name === 'BJP+');
        const jmmAlliance = parties.find(p => p.name === 'JMM+');
        let otheParties = parties.filter(p => p.name!== bjpAlliance.name && p.name!== jmmAlliance.name);
        let partiesList = [jmmAlliance, ...otheParties, bjpAlliance]       
      
      let remainingWidth = 100;
      let currentPosition = 0;

      partiesList.forEach((party, index) => {
        const seats = getPartyTotal(party);
        const percentageWidth = (seats / totalSeats) * 100;
        
        widths.push({
          party: party,
          width: percentageWidth,
          position: currentPosition
        });
        
        currentPosition += percentageWidth;
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