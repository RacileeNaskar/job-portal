const jobListings = JSON.parse(localStorage.getItem('jobListings')) || [];
const jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const applyModal = document.getElementById('applyModal');
const closeModal = document.querySelector('.close');
const applyForm = document.getElementById('applyForm');
let currentJobIndex = null;

function displayCandidateJobListings() {
    const candidateJobList = document.getElementById('candidateJobList');
    candidateJobList.innerHTML = ''; // Clear previous listings

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

        // Add Apply button
        const applyButton = document.createElement('button');
        applyButton.textContent = 'Apply';
        applyButton.addEventListener('click', () => {
            currentJobIndex = index;
            applyModal.style.display = 'block';
        });

        li.appendChild(h3);
        li.appendChild(pDescription);
        li.appendChild(pLocation);
        li.appendChild(pRequirements);
        li.appendChild(applyButton);

        candidateJobList.appendChild(li);
    });
}

function applyForJob(event) {
    event.preventDefault(); // Prevent form submission

    if (!currentUser) {
        alert('Applied Successfully.');
        return;
    }

    const photo = document.getElementById('photo').files[0];
    const resume = document.getElementById('resume').files[0];

    if (!photo || !resume) {
        alert('Please upload both a photo and a resume.');
        return;
    }

    const readerPhoto = new FileReader();
    const readerResume = new FileReader();

    readerPhoto.onload = function () {
        readerResume.onload = function () {
            const job = jobListings[currentJobIndex];
            const application = {
                jobTitle: job.jobTitle,
                company: job.company,
                appliedBy: currentUser.email,
                photo: readerPhoto.result,
                resume: readerResume.result
            };

            jobApplications.push(application);
            localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
            alert('Application submitted successfully!');
            applyModal.style.display = 'none';
        };

        readerResume.readAsDataURL(resume);
    };

    readerPhoto.readAsDataURL(photo);
}

applyForm.addEventListener('submit', applyForJob);
closeModal.addEventListener('click', () => {
    applyModal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === applyModal) {
        applyModal.style.display = 'none';
    }
});

// Initialize job listings on page load
document.addEventListener('DOMContentLoaded', displayCandidateJobListings);
