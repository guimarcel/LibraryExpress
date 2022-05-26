// module.exports = mongoose => {
//   mongoose.delete.connection.models["books"];
//   const Books = mongoose.model(
//     "books",
//     mongoose.Schema(
//       {
//         name: String,
//         is_rented: Boolean
//       },
//       { timestamps: true }
//     )
//   );
//   return Books;
// };

module.exports = mongoose => {
  const Books = mongoose.models.Books || mongoose.model(
    "books",
    mongoose.Schema(
      {
        name: String,
        is_rented: Boolean
      },
      { timestamps: true }
    )
  )
  return Books;
};