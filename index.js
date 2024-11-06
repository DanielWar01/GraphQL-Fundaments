const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const {books} = require('./resources/books.json')



const schema = buildSchema(`
    type Query{
        books: [Book]
        book(id:Int!): Book
    }
    type Mutation{
        updateBook(id: Int!, title: String!, author: String!, numPages: Int!, year: Int!): Book
    }
    type Book{
        id: Int,
        title: String,
        author: String,
        numPages: Int,
        year: Int
    }
`);

let updateBook = ({id, title, author, numPages, year}) => {

    books.map(book => {
        if (book.id == id){
            book.title = title
            book.author = author
            book.numPages = numPages
            book.year = year
        }
        return book
    });
    return books.find(book => book.id == id)
}

let bookById = (args) => {
    if (args.id){
        return books.find(book => book.id == args.id)
    }
    return null;
}
const root = {
    books: () => books,
    book: bookById,
    updateBook: updateBook
};

const app = express();

app.use("/", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log(`Server Ready, Listening At Port 3000`));