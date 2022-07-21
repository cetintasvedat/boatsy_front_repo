var globalConfigs = {
    apiURI: process.env.NODE_ENV !== "production" ? "http://localhost:8001" : "",
    loading:false,
};

var globalConfigsRender = () => {
    return globalConfigs;
};

export default globalConfigsRender();
