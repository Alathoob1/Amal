const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory (where HTML/CSS/JS are located)
app.use(express.static(__dirname));

// Placeholder API endpoint for AI drawing analysis
app.post('/api/upload', (req, res) => {
    // In a real application, this would handle file uploads using a library like 'multer'
    // and pass the image to the Python AI microservice.
    console.log("Received upload request for analysis.");
    
    res.json({
        success: true,
        message: "Drawing uploaded successfully.",
        analysis_status: "PENDING_DOCTOR_REVIEW",
        mock_data: {
            confidence_score: 88,
            detected_features: ["heavy_strokes", "corner_placement"],
            emotional_indicators: {
                anxiety: "moderate",
                aggression: "low"
            }
        }
    });
});

// Fallback route to serve index.html (Express 5 safe)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Aura Backend Server running at: http://localhost:${PORT}`);
    console.log(`🩺 AI Analysis Endpoint ready at: POST http://localhost:${PORT}/api/upload`);
});
