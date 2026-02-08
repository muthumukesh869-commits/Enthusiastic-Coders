import app from './app';

const PORT = process.env.PORT || 5000;

const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
};

startServer();
