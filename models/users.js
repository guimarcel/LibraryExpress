module.exports = mongoose => {
  const Users = mongoose.model(
    "users",
    mongoose.Schema(
      {
        name: String,
        doc: String,
        rented_books: [],
      },
      { timestamps: true }
    )
  )
  return Users
} 