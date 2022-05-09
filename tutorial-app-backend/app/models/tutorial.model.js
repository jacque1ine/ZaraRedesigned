module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const Tutorial = mongoose.model(
       "tutorial",
       mongoose.Schema(
          {
             title: String,
             description: String,
             published: Boolean
          },
          { timestamps: true }
       )
    );
    return Tutorial;
 };
 