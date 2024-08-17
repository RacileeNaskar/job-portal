// Display available jobs for candidates
const jobListings = JSON.parse(localStorage.getItem('jobListings')) || [];

function displayCandidateJobListings() {
    const candidateJobList = document.getElementById('candidateJobList');
    candidateJobList.innerHTML = ''; // Clear previous listings

    jobListings.forEach(job => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const pDescription = document.createElement('p');
        const pLocation = document.createElement('p');
        const pRequirements = document.createElement('p');

        h3.textContent = `${job.jobTitle} at ${job.company}`;
        pDescription.textContent = job.jobDescription;
        pLocation.textContent = `Location: ${job.location}`;
        pRequirements.textContent = `Requirements: ${job.requirements}`;

        li.appendChild(h3);
        li.appendChild(pDescription);
        li.appendChild(pLocation);
        li.appendChild(pRequirements);

        candidateJobList.appendChild(li);
    });
}

// Initialize job listings on page load
document.addEventListener('DOMContentLoaded', displayCandidateJobListings);
