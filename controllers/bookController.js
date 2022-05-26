const db = require('../models/index.js')
const Books = db.books

exports.createOrUpdate = (request, response) => {
  if (!request.body.name) {
    response.status(400).send({ message: "Preencha o nome do livro" })
    return
  }
  const bookObj = new Books({
    name: request.body.name,
    is_rented: request.body.is_rented
  })
  if (request.body._id) {
    bookObj["_id"] = request.body._id
  }
  Books
    .findOneAndUpdate(
      { _id: bookObj._id },
      bookObj,
      { upsert: true, new: true, setDefaultsOnInsert: true },
      function async(err, doc) {
        if (err) {
          response.status(500).send({
            message:
              err.message || "Erro durante o processo de inclusão dos dados."
          })
        } else {
          response.send(doc)
        }
      }
    )
}

exports.delete = (request, response) => {
  const id = request.body._id
  Books.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        response.status(404).send({
          message: `Não foi possível remover o livro!`,
          error: data
        })
      } else {
        response.send({
          message: "Livro removido com sucesso!"
        })
      }
    })
    .catch(err => {
      response.status(500).send({
        message: "Erro interno ao remover o livro." || err
      })
    })
}

exports.show = (request, response) => {
  Books.find({}, async (err, list_data) => {
    if (err) {
      return response.send({
        message:
          err.message || "Erro na busca dos livros cadastrados."
      })
    }
    return response.send(list_data)
  })
} 