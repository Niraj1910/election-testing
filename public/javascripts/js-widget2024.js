// var dataSource = {
//   presidentialSummary: "https://interactive.aljazeera.com/data/mapped/uselection2024/processed/Presidential_Summary.json",
// };

// console.log(dataSource);
$(document).ready(function(){
  jQuery.ajaxSetup({
    async:true,
    timeout: 10000
  });
 refreshData();
 setInterval(refreshData,30000);
});
async function refreshData() {
  openPresident();
}

async function getData() {
  // http://localhost:3001/api/party/parties-summary
  // make this api call and get the data
  try {
    const response = await fetch('/api/elections/party-summary');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function openPresident(){
    // $.getJSON(dataSource.presidentialSummary, async function(races){
      const data = await getData();
      
      // Get the data from the API and update the UI
      const firstParty = data.parties[0];
      const secondParty = data.parties[1];
      
      $('.f-party').text(firstParty.name);
      $('.s-party').text(secondParty.name);
      
      $('.f-party-scorenumber').text(firstParty.won).css("color", firstParty.partyColor);
      $('.s-party-scorenumber').text(secondParty.won).css("color", secondParty.partyColor);
      
      // Calculate bar widths
      const totalSeats = 41;
      const firstPartyWidth = (firstParty.won / totalSeats) * 50; // Cap at 50%
      const secondPartyWidth = (secondParty.won / totalSeats) * 50; // Cap at 50%
      
      $('#hc-dem-bar')
        .css("width", `${firstPartyWidth}%`)
        .css("background", firstParty.partyColor);
      
      $('#dt-rep-bar')
        .css("width", `${secondPartyWidth}%`)
        .css("background", secondParty.partyColor);
      

        

        // let [p1, p2] = races.Candidates;
        // let totalpresident = 538;
        // let engpct = "";
        // let arpct = "";       
        // let langpct = $("html").attr("lang");
        // if(langpct!="ar"){engpct="%"}
        // else{arpct="%"}
        // Function to update the UI for a candidate
        // function updateUI(candidate, partyPrefix) {
        //   console.log(candidate, partyPrefix);
        //     $(`#${partyPrefix}-electwon`).text(candidate.ElectWon);
        //     $(`#${partyPrefix}-popvote`).text(candidate.PopVote.toLocaleString());
        //     $(`#${partyPrefix}-poppct`).text(arpct + candidate.PopPct + engpct);
        //     $(`#${partyPrefix}-dem-bar`).css("width", Math.round(candidate.ElectWon/totalpresident*100,2)+"%");
        //     $(`#${partyPrefix}-rep-bar`).css("width", Math.round(candidate.ElectWon/totalpresident*100,2)+"%");
        // }

        // Update DEM candidate
        // if (p1.Party === "DEM") {
        //     updateUI(p1, 'hc');
        //     updateUI(p2, 'dt');
        // } else {
        //     updateUI(p1, 'dt');
        //     updateUI(p2, 'hc');
        // }
    // }).error(function() {
    //   console.log("error updating presidential data");
    // });
}