document.addEventListener('DOMContentLoaded', function() {
    const expandButton = document.getElementById('expand-box-button');
    const expandableBox = document.getElementById('expandable-box');
    const form = document.getElementById('career-form');
    const recommendationsDiv = document.getElementById('recommendations');

    const careerData = {
        high_performer: [
            { title: "Lawyer", description: "Provide legal advice", skills: ["Critical Thinking", "Communication"], emoji: "⚖", sector: "Legal" },
            { title: "Doctor", description: "Diagnose and treat patients", skills: ["Empathy", "Scientific Knowledge"], emoji: "👩‍⚕", sector: "Healthcare" },
        ],
        average_performer: [
            { title: "Graphic Designer", description: "Create visual concepts", skills: ["Creativity", "Software Skills"], emoji: "🎨", sector: "Creative" },
            { title: "HR Specialist", description: "Recruit and manage employees", skills: ["Communication", "Empathy"], emoji: "👥", sector: "Business" },
        ],
        low_performer: [
            { title: "Customer Service Rep", description: "Assist customers", skills: ["Communication", "Patience"], emoji: "🤝", sector: "Service" },
        ]
    };

    expandButton.addEventListener('click', function() {
        if (expandableBox.classList.contains('expanded')) {
            expandableBox.classList.remove('expanded');
            setTimeout(() => {
                expandableBox.style.display = 'none';
            }, 300);
        } else {
            expandableBox.style.display = 'block';
            setTimeout(() => {
                expandableBox.classList.add('expanded');
            }, 10);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const gpa = parseFloat(document.getElementById('gpa').value);
        const careerInterest = document.getElementById('career-interest').value.toLowerCase();
        let performanceCategory = gpa >= 8.0 ? 'high_performer' : gpa >= 6.0 ? 'average_performer' : 'low_performer';

        const filteredCareers = careerData[performanceCategory].filter(career => 
            career.skills.some(skill => careerInterest.includes(skill.toLowerCase()))
        );

        recommendationsDiv.innerHTML = filteredCareers.length > 0
            ? filteredCareers.map(career => `
                <div class="service-card">
                    <h3>${career.emoji} ${career.title}</h3>
                    <p><strong>Sector:</strong> ${career.sector}</p>
                    <p>${career.description}</p>
                    <strong>Key Skills:</strong>
                    <ul>${career.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
            `).join('')
            : '<p>No matching recommendations found.</p>';
    });
});
