import ratelimit  from "../config/upstash.js";

const rateLimit = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key")

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later",
            });
        }

        next();

    } catch (error) {
        console.error("Rate limit Error: ", error);
        next(error);
    }
};

export default rateLimit;