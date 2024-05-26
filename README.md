# test-project

To run this project:
clone the project using the following command:

git clone https://github.com/rsschandu/test-project.git

create a new env file in the project directory. The expected variables are listed in env_example file

then run the following commands:

1 install node dependencies

npm install

2 Run initial migration

npm run migration:run

3 Populate the data from the csv file

npm run seed:run

4 Start in dev mode:

npm run start:dev

Now to access the api endpoint hit the following url(GET request):

get all books:

localhost:3000/book

get a book by name:

localhost:3000/book/name/gracefully anchored phooey

![image](https://github.com/rsschandu/test-project/assets/16938250/5020d30f-eabd-4399-b803-28fe89b6373b)

![image](https://github.com/rsschandu/test-project/assets/16938250/ff57d0b4-3cc1-4966-879f-577b1f6fe669)

![image](https://github.com/rsschandu/test-project/assets/16938250/f85addb2-9284-4778-a8e9-5180b5c85e0f)

