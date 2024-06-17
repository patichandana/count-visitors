const CONFIG = {
    PORT: process.env.PORT ?? 3000,
    COUNTER_FILES_DIR: process.env.COUNTER_DATA_DIR ?? "counter_data"
}

// module.exports = {CONFIG: CONFIG}
export { CONFIG }