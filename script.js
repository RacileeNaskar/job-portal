// Sample job data (In a real project, this would come from a database)
const jobListings = [
    {
        title: "Software Engineer",
        company: "TechCorp",
        description: "Develop and maintain web applications using React.js and Node.js.",
        location: "New York, NY",
        requirements: "2+ years of experience in web development.",
    },
    {
        title: "Product Manager",
        company: "InnovateX",
        description: "Lead the development of new features and manage product lifecycles.",
        location: "San Francisco, CA",
        requirements: "3+ years of experience in product management.",
    }
];

// Function to display job listings
function displayJobListings() {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = ''; // Clear previous listings

    jobListings.forEach(job => {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const pDescription = document.createElement('p');
        const pLocation = document.createElement('p');
        const pRequirements = document.createElement('p');

        h3.textContent = `${job.title} at ${job.company}`;
        pDescription.textContent = job.description;
        pLocation.textContent = `Location: ${job.location}`;
        pRequirements.textContent = `Requirements: ${job.requirements}`;

        li.appendChild(h3);
        li.appendChild(pDescription);
        li.appendChild(pLocation);
        li.appendChild(pRequirements);

        jobList.appendChild(li);
    });
}

// Initialize job listings on page load
document.addEventListener('DOMContentLoaded', displayJobListings);
