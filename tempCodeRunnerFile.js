let req = {
    params: {
        id: 1
    },
    body: { name: 'tony' }
}
let { params: { id }, body: { name } } = req
// const id = req.params.id;
// const name = req.body.name;
console.log(id, name);

const query = `${id} person who called ${name} is my favourite`
console.log(query);