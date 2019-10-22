const admin = {
  initializeApp: () => { },
  credential: {
    cert: () => {}
  },
  firestore: () => {
    const collections = {
      events: [
        { id: 0, title: 'test' }
      ],
      users: [
        { id: 'tariq', name: 'Tariq Porter' }
      ]
    };

    return {
      collection: (collection) => {
        const get = (filteredCollections) => new Promise((resolve) => {
          const docs = filteredCollections.map(doc => {
            return {
              id: doc.id,
              data: () => {
                const { id, ...other } = doc;
                return other;
              }
            };
          });
          resolve({ docs });
        });

        return {
          doc: (id) => ({
            get: () => {
              const docPromise = get(collections[collection].filter(doc => doc.id === id));
              return docPromise.then(({ docs }) => {
                return docs[0] || { id: null, data: () => null };
              })
            }
          }),
          get: () => get(collections[collection])
        }
      }
    };
  }
};

module.exports = admin;