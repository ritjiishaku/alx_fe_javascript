// Initialize quotes array
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Load quotes from localStorage if available
const savedQuotes = localStorage.getItem("quotes");
if (savedQuotes) {
    quotes.push(...JSON.parse(savedQuotes));
}

// Select elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const categoryFilter = document.getElementById("categoryFilter");

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `"${quotes[randomIndex].text}" - (${quotes[randomIndex].category})`;
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById("newQuoteText").value.trim();
    const categoryInput = document.getElementById("newQuoteCategory").value.trim();

    if (textInput && categoryInput) {
        quotes.push({ text: textInput, category: categoryInput });

        // Save to localStorage
        localStorage.setItem("quotes", JSON.stringify(quotes));

        // Update category filter
        populateCategories();

        alert("Quote added successfully!");
    }
}

// Populate category filter
function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))]; // Get unique categories
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    quoteDisplay.textContent = filteredQuotes.length
        ? `"${filteredQuotes[0].text}" - (${filteredQuotes[0].category})`
        : "No quotes available in this category.";
}

// Export quotes as JSON
function exportQuotes() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "quotes.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

// Import quotes from JSON file
function importQuotes(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

// Sync data with a server (example: fetch placeholder data)
async function syncWithServer() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    console.log("Fetched data from server:", serverData);
}

// Load initial categories
populateCategories();

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);

// Create and append export button
const exportBtn = document.createElement("button");
exportBtn.textContent = "Export Quotes";
exportBtn.addEventListener("click", exportQuotes);
document.body.appendChild(exportBtn);

// Create and append import file input
const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json";
importInput.addEventListener("change", importQuotes);
document.body.appendChild(importInput);

// Run sync every 5 minutes
setInterval(syncWithServer, 300000);
