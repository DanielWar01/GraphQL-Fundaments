const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const {books} = require('./resources/books.json')



const schema = buildSchema(`
    type Query{
        books(): [Book]
        book(id:Int!): Book
    },
    type Book{
        id: Int,
        title: String,
        author: String,
        numPages: Int,
        year: Int
    }
`);


let bookById = (args) => {
    if (args.id){
        return books.find(book => book.id == args.id)
    }
    return null;
}
const root = {
    books: () => books,
    book: bookById
    
};

const app = express();

app.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log(`Server Ready, Listening At Port 3000`));