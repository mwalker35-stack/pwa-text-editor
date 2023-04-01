import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('contact', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  console.log('- data saved to the database', result);
} 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1)
  const tx = jateDb.transaction('jate', 'readonly')
  const store = tx.objectStore('jate')
  const request = store.getAll()
  const result = await request
  result ? console.log('recieved data from database', result.value) : console.log('data not found')
  return result?.value
}

initdb();
