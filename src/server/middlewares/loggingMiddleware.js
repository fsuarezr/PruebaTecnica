const loggingMiddleware = (db) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const header = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        
        // Persist this info on DB
        try {
            if (/hfswapi/.test(originalUrl)) db.logging.create({ action: originalUrl, header, ip })

        } catch (error) {
            console.error(error)
        }

        next();
    }

module.exports = loggingMiddleware;