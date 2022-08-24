const MINUTE: number = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

export function getTimeAgo(date: Date) {
    const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);

    if (secondsAgo < MINUTE) {
        return `${secondsAgo} second${Math.floor(secondsAgo / YEAR) > 1 ? "s" : ""} ago`;
    }

    if (secondsAgo > HOUR) { 
        if (secondsAgo > DAY) {
            if (secondsAgo > WEEK) {
                if (secondsAgo > MONTH) {
                    if (secondsAgo > YEAR) {
                        return `${Math.floor(secondsAgo / YEAR)} year${Math.floor(secondsAgo / YEAR) > 1 ? "s" : ""} ago`;
                    }
                    return `${Math.floor(secondsAgo / MONTH)} month${Math.floor(secondsAgo / MONTH) > 1 ? "s" : ""} ago`;
                }
                return `${Math.floor(secondsAgo / WEEK)} week${Math.floor(secondsAgo / WEEK) > 1 ? "s" : ""} ago`;
            }
            return `${Math.floor(secondsAgo / DAY)} day${Math.floor(secondsAgo / DAY) > 1 ? "s" : ""} ago`;
        }
        return `${Math.floor(secondsAgo / HOUR)} hour${Math.floor(secondsAgo / HOUR) > 1 ? "s" : ""} ago`;
    }
    return `${Math.floor(secondsAgo / MINUTE)} minute${Math.floor(secondsAgo / MINUTE) > 1 ? "s" : ""} ago`;
}
