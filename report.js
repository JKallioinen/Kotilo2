let finalSelections = {
    Trashbins: [],
    TrashHouse: [],
    TrashArea: []
};

// Function to remove selected class from a specific element without clearing all highlights
function toggleSelectionHighlight(element) {
    element.classList.toggle('selected'); // Toggle the 'selected' class on or off
}

// Function to remove selected class from all options
function removeSelectionHighlight() {
    const allItems = document.querySelectorAll('.report-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
    });
}

// Function to show sub-options based on the main choice
function showSubOptions(option, element) {
    // Remove any previous highlights
    removeSelectionHighlight();
    element.classList.add('selected'); // Highlight the selected main option

    // Hide all sub-option sections initially
    document.getElementById('trashbin-options').classList.add('hidden');
    document.getElementById('trashhouse-options').classList.add('hidden');
    document.getElementById('trasharea-options').classList.add('hidden');

    // Show the appropriate sub-option section based on the main option
    if (option === 'trashbin') {
        document.getElementById('trashbin-options').classList.remove('hidden');
    } else if (option === 'trashhouse') {
        document.getElementById('trashhouse-options').classList.remove('hidden');
    } else if (option === 'trasharea') {
        document.getElementById('trasharea-options').classList.remove('hidden');
    }

    // Show the back button and hide the submit button until options are selected
    document.getElementById('selected-category').classList.remove('hidden');
    document.getElementById('back-btn').classList.remove('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
}

// Function to add/remove a selected issue and update the display
function toggleFinalOption(option, element) {
    toggleSelectionHighlight(element);

    let category = '';

    // Determine the category based on the option section
    if (element.closest('#trashbin-options')) {
        category = 'Trashbins';
    } else if (element.closest('#trashhouse-options')) {
        category = 'TrashHouse';
    } else if (element.closest('#trasharea-options')) {
        category = 'TrashArea';
    }

    // Remove the category prefix from the issue (e.g., "Trashbin - Full" becomes "Full")
    const issue = option.split(' - ')[1] || option;

    // Toggle the selected option within its category
    if (finalSelections[category].includes(issue)) {
        finalSelections[category] = finalSelections[category].filter(item => item !== issue); // Remove if already selected
    } else {
        finalSelections[category].push(issue); // Add to selected options if not already present
    }

    updateFinalSelectionDisplay(); // Update the display with categorized options
}

// Function to update the final selection display
function updateFinalSelectionDisplay() {
    const finalSelectionElement = document.getElementById('final-selection');
    const selectedOptionList = document.getElementById('selected-option');

    // Clear the current list
    selectedOptionList.innerHTML = '';

    // Helper function to render category options
    function renderCategory(categoryName, options) {
        if (options.length > 0) {
            const categoryHeading = document.createElement('h4');
            categoryHeading.textContent = categoryName;
            selectedOptionList.appendChild(categoryHeading);

            options.forEach(option => {
                const li = document.createElement('li');
                li.textContent = option;
                selectedOptionList.appendChild(li);
            });
        }
    }

    // Render selected options by category
    renderCategory('Trashbin:', finalSelections.Trashbins);
    renderCategory('Trash-House:', finalSelections.TrashHouse);
    renderCategory('Trash Area:', finalSelections.TrashArea);

    // Show or hide the final selections and submit button
    if (finalSelections.Trashbins.length > 0 || 
        finalSelections.TrashHouse.length > 0 || 
        finalSelections.TrashArea.length > 0) {
        finalSelectionElement.classList.remove('hidden');
        document.getElementById('submit-btn').classList.remove('hidden');
    } else {
        finalSelectionElement.classList.add('hidden');
        document.getElementById('submit-btn').classList.add('hidden');
    }
}

// Function to show the modal and display the report details
function showThankYouModal(reportDetails) {
    const modal = document.getElementById('thankYouModal');
    const reportDetailsElement = document.getElementById('report-details');
    
    // Populate the report details in the modal
    reportDetailsElement.innerHTML = reportDetails;
    
    // Show the modal
    modal.style.display = 'block';
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('thankYouModal');
    modal.style.display = 'none';
}

// Redirect to homepage
function goToHomepage() {
    window.location.href = 'info.html'; // Replace with your homepage URL
}

// Attach event listeners
document.getElementById('closeModalBtn').addEventListener('click', function() {
    closeModal(); // Close the modal
    location.reload(); // Refresh the page
});

document.getElementById('goHomeBtn').addEventListener('click', goToHomepage);


// Function to handle report submission (mockup for now)
function submitReport() {
    const locationCode = document.getElementById('location-id').value;
    const additionalDetails = document.getElementById('additional-details').value; // Get the additional details text

    
    if (!locationCode) {
        alert('Please enter a Location ID!');
        return;
    }

    // Collect the issues for each category (without category prefix)
    let trashbinIssues = finalSelections.Trashbins.length > 0 ? finalSelections.Trashbins.join(', ') : 'None';
    let trashhouseIssues = finalSelections.TrashHouse.length > 0 ? finalSelections.TrashHouse.join(', ') : 'None';
    let trashareaIssues = finalSelections.TrashArea.length > 0 ? finalSelections.TrashArea.join(', ') : 'None';

    // Prepare the report details
    let reportDetails = `Location: ${locationCode}<br><br> Trashbin issues: ${trashbinIssues}<br> Trash House issues: ${trashhouseIssues}<br> Trash Area issues: ${trashareaIssues}`;
    
    if (additionalDetails.trim() !== '') {
        reportDetails += `<br><br>Additional Information: ${additionalDetails}`;
    }

    // Show the thank you modal with report details
    showThankYouModal(reportDetails);
}

// Function to hide all sections and reset the state when going back
function goBack() {
    document.getElementById('selected-category').classList.add('hidden');
    document.getElementById('trashbin-options').classList.add('hidden');
    document.getElementById('trashhouse-options').classList.add('hidden');
    document.getElementById('trasharea-options').classList.add('hidden');
    document.getElementById('back-btn').classList.add('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    removeSelectionHighlight();
}
