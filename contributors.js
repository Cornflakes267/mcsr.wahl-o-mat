const runners = [
    // Add runners here
    "Runner 1",
    "Runner 2",
    // ...
];

const questionContributors = [
    // Add question contributors here
    "Blumi",
    "unsortiertes",
    "Allofme",
    "Finnitzko"
    // ...
];

function populateList(listId, items) {
    const list = document.getElementById(listId);
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateList('runners-list', runners);
    populateList('questions-list', questionContributors);
});