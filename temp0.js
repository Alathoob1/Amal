
        let doctorData = null;
        const doctorId = localStorage.getItem('auraUserId');
        const role = localStorage.getItem('auraUserRole');
        
        if (!doctorId || role !== 'doctor') {
            window.location.href = 'login.html';
        }

        async function initDoctorApp() {
            try {
                const API_BASE = (window.location.protocol === 'file:' || window.location.port !== '3000') ? 'http://localhost:3000' : '';
                const res = await fetch(API_BASE + `/api/doctors/${doctorId}/data`);
                doctorData = await res.json();
                if(doctorData.error) throw new Error(doctorData.error);
                
                // Set name
                document.getElementById('doc-navbar-name').textContent = doctorData.profile.name;
                document.getElementById('doc-navbar-avatar').textContent = doctorData.profile.name.charAt(0);
                
                renderDoctorDashboard();
            } catch (err) {
                console.error("Failed to load doctor data:", err);
            }
        }

        document.addEventListener('DOMContentLoaded', initDoctorApp);
    