import { openDB } from 'idb';

//initialise the database
const initdb = async () =>
  openDB('jate', 1, {
    // create a connection to the database and version of the database
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // if the database doesn't exist, create it
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// this is the update/add method 
export const putDb = async (content) => {

  console.log('PUT to the database');
// open the database
  const jateDb = await openDB('jate', 1);
// Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
// using the object store 'jate'
  const store = tx.objectStore('jate');
// add the content to the store
  const request = store.add({ jate: content });
// if the request is successful, return true
  const result = await request;
// console.log(result)
  console.log('🚀 - data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
// this is the get method
export const getDb = async (content) => {

  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll(content);

  // Get confirmation of the request.
  const result = await request;
  console.log('data retrieved from database!', result);
  

};

initdb();
