export const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${JSON.stringify(req.body)} ${req.originalUrl} ${req.ip}`);
    next();
}