import ms from "ms";
import dotenv from "dotenv";
import packageInfo from "../../package.json";

dotenv.config();

const CONFIGS = {
    PORT: process.env.PORT || 4000,
    APP_VERSION: packageInfo.version,
    APP_NAME: process.env.APP_NAME || "Application",
    NODE_ENV: process.env.NODE_ENV || "development",
    BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || 10,
    JWT_SECRET: process.env.JWT_SECRET || "abcd-1234-efgh-5678",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/application",
    ACCESS_TOKEN_JWT_EXPIRES_MS: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN ? ms(process.env.ACCESS_TOKEN_JWT_EXPIRES_IN) : ms("1h"),
    URL: {
        BASE_URL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`,
    },
    APP_ROLES: {
        ADMIN: ["admin"],
        USER: ["user", "admin"],
    },
};

// Uncomment this line to see the configs
// console.log(CONFIGS);

export { CONFIGS };
