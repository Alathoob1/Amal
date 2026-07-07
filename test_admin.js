
        if (window.location.protocol === 'file:') {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#f8f9fa;font-family:sans-serif;color:#333;text-align:center;">
                        <h1 style="color:#e74c3c;">Server offline / الخادم غير متاح</h1>
                        <p style="font-size:1.2rem;">Please run the Node.js server and open http://localhost:3000</p>
                        <p dir="rtl" style="font-size:1.2rem;">يرجى تشغيل خادم Node.js وفتح الرابط http://localhost:3000</p>
                    </div>
                `;
            });
        }
    
