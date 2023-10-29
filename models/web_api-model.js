
module.exports = mongoose => {
    const Web_api_model = mongoose.model(
        "web_api_model",
        mongoose.Schema(
            {
                type: String,
                date: Date.now,
                description: String,
                published: Boolean
            },
            {
                timestamps: true
            }
        )
    );

    return Web_api_model;
};

