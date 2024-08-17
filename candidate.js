// Retrieve job postings from localStorage
let jobListings = JSON.parse(localStorage.getItem('jobListings')) || [];

// Function to display job listings
function displayJobListings() {
    const jobList = document.getElementById('candidateJobList');
    jobList.innerHTML = ''; // Clear previous job listings

    jobListings.forEach((job, index) => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const pDescription = document.createElement('p');
        const pLocation = document.createElement('p');
        const pRequirements = document.createElement('p');
        const applyButton = document.createElement('button');

        h3.textContent = `${job.jobTitle} at ${job.company}`;
        pDescription.textContent = job.jobDescription;
        pLocation.textContent = `Location: ${job.location}`;
        pRequirements.textContent = `Requirements: ${job.requirements}`;
        applyButton.textContent = 'Apply';

        // Event listener for the apply button
        applyButton.addEventListener('click', () => {
            applyToJob(job);
        });

        li.appendChild(h3);
        li.appendChild(pDescription);
        li.appendChild(pLocation);
        li.appendChild(pRequirements);
        li.appendChild(applyButton);

        jobList.appendChild(li);
    });
}

// Function to handle job applications
function applyToJob(job) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const resumeFile = document.getElementById('resume').files[0];

    if (!name || !email || !resumeFile) {
        alert('Please fill out all fields.');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resumeFile);
    formData.append('jobTitle', job.jobTitle);
    formData.append('company', job.company);

    // Send the application data to the server
    fetch('http://localhost:3000/applications', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(() => {
            alert('Application Submitted');
            document.getElementById('applicationForm').reset();
        })
        .catch(error => console.error('Error:', error));
}

// Display job listings on page load
document.addEventListener('DOMContentLoaded', displayJobListings);
