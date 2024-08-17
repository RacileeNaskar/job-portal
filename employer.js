// Retrieve job postings from localStorage or initialize an empty array
let jobListings = JSON.parse(localStorage.getItem('jobListings')) || [];

// Function to post a new job
function postJob(event) {
    event.preventDefault(); // Prevent form submission

    const jobTitle = document.getElementById('jobTitle').value;
    const company = document.getElementById('company').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const location = document.getElementById('location').value;
    const requirements = document.getElementById('requirements').value;

    // Create a new job object
    const newJob = { jobTitle, company, jobDescription, location, requirements };
    
    // Add the job to the job listings array
    jobListings.push(newJob);

    // Store the updated job listings in localStorage
    localStorage.setItem('jobListings', JSON.stringify(jobListings));

    // Reset the form and display the updated job listings
    document.getElementById('jobForm').reset();
    displayJobListings();
}

// Function to display the job listings
function displayJobListings() {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = ''; // Clear previous listings

    jobListings.forEach((job, index) => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const pDescription = document.createElement('p');
        const pLocation = document.createElement('p');
        const pRequirements = document.createElement('p');

        h3.textContent = `${job.jobTitle} at ${job.company}`;
        pDescription.textContent = job.jobDescription;
        pLocation.textContent = `Location: ${job.location}`;
        pRequirements.textContent = `Requirements: ${job.requirements}`;

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Job';
        removeButton.addEventListener('click', () => {
            jobListings.splice(index, 1);
            localStorage.setItem('jobListings', JSON.stringify(jobListings));
            displayJobListings();
        });

        li.appendChild(h3);
        li.appendChild(pDescription);
        li.appendChild(pLocation);
        li.appendChild(pRequirements);
        li.appendChild(removeButton);

        jobList.appendChild(li);
    });
}

// Add event listener to the job form
document.getElementById('jobForm').addEventListener('submit', postJob);

// Initialize job listings on page load
document.addEventListener('DOMContentLoaded', displayJobListings);
