const db = require('../models/index.js')
const Users = db.users

exports.createOrUpdate = (request, response) => {
  if (!request.body.name) {
    response.status(400).send({ message: "Preencha o nome do Usuario" })
    return
  }
  if (!request.body.doc) {
    response.status(400).send({ message: "Preencha o documento do Usuario" })
    return
  }
  const UserObj = new Users({
    name: request.body.name,
    doc: request.body.doc,
    rented_books: request.body.rented_books
  })
  if (request.body._id) {
    UserObj["_id"] = request.body._id
  }
  Users
    .findOneAndUpdate(
      { _id: UserObj._id },
      UserObj,
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
  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        response.status(404).send({
          message: `Não foi possível remover o Usuario!`,
          error: data
        })
      } else {
        response.send({
          message: "Usuario removido com sucesso!"
        })
      }
    })
    .catch(err => {
      response.status(500).send({
        message: "Erro interno ao remover o Usuario." || err
      })
    })
}

exports.show = (request, response) => {
  // return response.send("teste")
  Users.find({}, async (err, list_data) => {
    if (err) {
      return response.send({
        message:
          err.message || "Erro na busca dos Usuarios cadastrados."
      })
    }
    return response.send(list_data)
  })
}