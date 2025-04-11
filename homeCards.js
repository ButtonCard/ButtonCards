let cardDataArray = [];
let sortMethod = "easiest";
let availableCardCounts = {}; // To track count of different available cards per rarity

async function initPage() {
  await loadCardData();
  displayCards();
}
await initPage();

async function loadCardData() {
  try {
    const userRef = db.collection('users');
    const allQuery = await userRef.get();
    let allCards = allQuery.docs[0].data().cards.concat(
      allQuery.docs[1].data().cards, 
      allQuery.docs[2].data().cards, 
      allQuery.docs[3].data().cards,
      allQuery.docs[4].data().cards, 
      allQuery.docs[5].data().cards);
    
    cardDataArray = [];
    availableCardCounts = { 'U': 0, 'R': 0, 'E': 0, 'L': 0, 'V': 0, 'S': 0 };
    
    // First pass: count distinct available cards per rarity
    countAvailableCards(U, 'U', Ucount, allCards);
    countAvailableCards(R, 'R', Rcount, allCards);
    countAvailableCards(E, 'E', Ecount, allCards);
    countAvailableCards(L, 'L', Lcount, allCards);
    countAvailableCards(VarSet, 'V', Vcount, allCards);
    countAvailableCards(SpeSet, 'S', Scount, allCards);
    
    // Second pass: process cards with proper formula
    processCardGroup(U, 'U', Urarity, Ucount, allCards);
    processCardGroup(R, 'R', Rrarity, Rcount, allCards);
    processCardGroup(E, 'E', Erarity, Ecount, allCards);
    processCardGroup(L, 'L', Lrarity, Lcount, allCards);
    processCardGroup(VarSet, 'V', Vrarity, Vcount, allCards);
    processCardGroup(SpeSet, 'S', Srarity, Scount, allCards);
    
    console.log("Cards processed:", cardDataArray.length);
    
  } catch (error) {
    console.error("Error loading card data:", error);
  }
}

// Count distinct available cards per rarity
function countAvailableCards(cardGroup, rarityLabel, maxCount, allCards) {
  cardGroup.forEach(card => {
    
    const cardCount = countCards(allCards, card);
    const availability = Math.max(0, maxCount - cardCount);
    
    // If the card is available, increment the counter
    if (availability > 0) {
      availableCardCounts[rarityLabel]++;
    }
  });
}

function processCardGroup(cardGroup, rarityLabel, rarityOdds, maxCount, allCards) {
  cardGroup.forEach(card => {

    const cardCount = countCards(allCards, card);
    const availability = Math.max(0, maxCount - cardCount);
    
    // Apply the corrected formula:
    // 1/(rarity chance) * 1/(# of different types of cards within that rarity available)
    let pullChance = 0;
    /*if (availability > 0 && availableCardCounts[rarityLabel] > 0) {
      pullChance = (1/rarityOdds) * (1/availableCardCounts[rarityLabel]);
    }*/
    
    cardDataArray.push({
      id: card,
      rarity: rarityLabel,
      rarityName: getRarityName(rarityLabel),
      originalOdds: rarityOdds,
      currentCount: cardCount,
      maxCount: maxCount,
      availability: availability,
      pullChance: pullChance,
      isOwned: cardCount > 0
    });
  });
}

async function displayCards() {
  sortCardData();

  const userRef = db.collection('users');
  const allQuery = await userRef.get();
  let allCards = allQuery.docs[0].data().cards.concat(
    allQuery.docs[1].data().cards, 
    allQuery.docs[2].data().cards, 
    allQuery.docs[3].data().cards,
    allQuery.docs[4].data().cards, 
    allQuery.docs[5].data().cards);
  
  const cardGridElement = document.getElementById('cardGrid');
  cardGridElement.innerHTML = '';
  
  // Display message if no cards found
  if (cardDataArray.length === 0) {
    const noCardsRow = document.createElement('tr');
    const noCardsCell = document.createElement('td');
    noCardsCell.colSpan = 3;
    noCardsCell.innerHTML = '<strong>No cards found to display</strong>';
    noCardsCell.style.padding = '20px';
    noCardsRow.appendChild(noCardsCell);
    cardGridElement.appendChild(noCardsRow);
    return;
  }
  
  // Assign proper ranks handling ties
  let currentRank = 1;
  let previousPullChance = null;
  let skipCount = 0;
  
  // First pass to assign ranks
  cardDataArray.forEach((card, index) => {
    card.rank = 0;
  });
  
  // Display all cards
  cardDataArray.forEach(card => {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-grid-item';

    // --- TEXT BELOW IMAGE ---
    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';
  
    let parts = card.id.split('-');
    let PawardCard = parts[0] + '-P';
  
    if (card.isOwned || allCards.includes(PawardCard)) {
      cardInfo.innerHTML = `<strong>${card.id}</strong><br>${card.rarityName}`;
    } else {
      cardInfo.innerHTML = `<strong>Anonymous</strong><br>${card.rarityName}`;
    }
    
    // --- IMAGE ---
    const image = document.createElement('img');
    image.className = 'card-image';
  
    if (card.isOwned || allCards.includes(PawardCard)) {
      image.src = `img/${card.id}.png`;
    } else {
      image.src = "Back.png";
    }
  
    image.onclick = () => {
      if (card.isOwned || allCards.includes(PawardCard)) {
        enlarge(card.id);
      }
    };
  
    if (card.availability === 0) {
      image.style.filter = "grayscale(100%)";
      image.style.opacity = "0.6";
    }
  
    // --- PROGRESS BAR ---
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'card-progress';
  
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
  
    const progress = document.createElement('div');
    progress.className = 'progress';
  
    if (card.availability === 0) {
      progress.style.backgroundColor = "#777";
      progress.style.width = "100%";
      progress.textContent = "Unavailable";
    } else {
      const percentage = (card.availability / card.maxCount) * 100;
      progress.style.width = `${percentage}%`;
      progress.textContent = `${card.availability}/${card.maxCount}`;
      const hue = (percentage / 100) * 120;
      progress.style.backgroundColor = `hsl(${hue}, 80%, 45%)`;
    }
  
    progressBar.appendChild(progress);
    progressBarContainer.appendChild(progressBar);
  
    // --- APPEND EVERYTHING IN ORDER ---
    cardItem.appendChild(image);
    cardItem.appendChild(cardInfo);
    cardItem.appendChild(progressBarContainer);
  
    cardGridElement.appendChild(cardItem);
  });
}

function sortCardData() {
  
  switch(sortMethod) {
    case "easiest":
      // First sort by availability (0 or not)
      cardDataArray.sort((a, b) => {
        // First sort by availability
        if (a.availability === 0 && b.availability > 0) return 1;
        if (b.availability === 0 && a.availability > 0) return -1;
        
        // Then by pull chance (higher is easier)
        return b.pullChance - a.pullChance;
      });
      break;
      
    case "hardest":
      // First sort by availability (0 or not)
      cardDataArray.sort((a, b) => {
        // First sort by availability
        if (a.availability === 0 && b.availability > 0) return 1;
        if (b.availability === 0 && a.availability > 0) return -1;
        
        // Then by pull chance (lower is harder)
        return a.pullChance - b.pullChance;
      });
      break;
  }
}

function sortCards() {
  displayCards();
}

function getRarityName(rarityCode) {
  switch(rarityCode) {
    case 'L': return 'Legendary';
    case 'E': return 'Epic';
    case 'R': return 'Rare';
    case 'U': return 'Uncommon';
    case 'V': return 'Variant';
    case 'S': return 'Special';
    default: return rarityCode;
  }
}

function countCards(cards, cardId) {
  return cards.filter(card => card === cardId).length;
}

function enlarge(cardId) {
  let showEnlarge = document.querySelector(".large");
  showEnlarge.src = `img/${cardId}.png`;
  showEnlarge.style.display = "block";
  window.scrollTo(0, 0);
}

function hide() {
  let hideEnlarge = document.querySelector(".large");
  hideEnlarge.src = "Pack.png";
  hideEnlarge.style.display = "none";
}

