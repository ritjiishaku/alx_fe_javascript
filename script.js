// Quotes array with categories
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
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;
}

// Function to add a new quote dynamically
function addQuote() {
    const textInput = document.getElementById("newQuoteText").value.trim();
    const categoryInput = document.getElementById("newQuoteCategory").value.trim();

    if (textInput && categoryInput) {
        const newQuote = { text: textInput, category: categoryInput };
        quotes.push(newQuote);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        alert("Quote added successfully!");
    } else {
        alert("Please enter both quote and category.");
    }
}

// Function to populate categories dynamically
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

// Function to filter quotes by category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    quoteDisplay.textContent = filteredQuotes.length
        ? `"${filteredQuotes[0].text}" - (${filteredQuotes[0].category})`
        : "No quotes available in this category.";
}

// Load initial categories
populateCategories();

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);
