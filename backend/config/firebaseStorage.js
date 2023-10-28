const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
// const { initializeApp } = require("firebase-admin/app");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "movieapp-774ea",
    private_key_id: "579d6c41bded586274f8d1b738b4903f96961153",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0GgUvQQLCl8CY\nBtWJZ55CZA8cHKOow/f8k6G+s3pusK08fkeVvQ5TUfJBDdSZRXRaaXhU213XdHT7\nz5jbhzy5SylyjMg16j17Efd7yn7zCXeDlpgh1slUu7V1Gm+/hi1KLPYG5zU5Oaj5\nx69v0kekyazI086U+fKA2frFjVm2Z9vPGXivp1wKu6pGxCNx3GBZtEdCwFf+68YN\nAlqj653rqvXy6igN+vr0riCEQPMJJX+9GnsxijMSmRY5jr/KVSQseYvFSStTqNrY\n+Uwyd2sWaWUWidLNgQa0HXtmC0FMPxJS2AubiHULZuNui0UKQdT4rbSFfb3H5UU/\nq+jLOxQHAgMBAAECggEAA4tUHaXycawwj81XMwR3k7Eur4LwxZDjbZkKKdKUF/GO\ntzKeIpg9SaVU6NiLHfIy0bJizGi0v33YWvDTfmee6bsoW/AqdQ5OdkmPFdJIDmzs\nIAo87ntDB5q1fb/luMxPLZKDy9Af23EDC/4wS/AyTCtStyfmM7Tng6vrEb3m8hCK\n+VMkAiWqGEJrMLBl1QqkoFDZCjNH4kBasVKnJwRjGLs7pSD3WVPTMbtKdgAhVbGP\nDpmnRADlYrA4aB/iudyMJsLe4hK8chwxyzIGLBXQmxLXlqPutb2njNekw/1B9Nm2\nZMaKeGPIy1h1a6de7alLSP8go1TFgAaZoYk4adOHIQKBgQDpoEZA9Eb/13janpw1\nhQyhjg6ltDNjvsoAu6kFHa2eCQhpD/aLJLRuqKQP7ISt0lVjUY0z8qMm/PcFw0wJ\nszUvkuhRp1bz84K/rKOYTqfImPFPjpVKz+U1SVhfHEFppmvA2YTqBYJSohMSGWmS\nrbT7yy6GRvV6gb/y9QrptdtE3QKBgQDFWYG9qHFTbMdmk14ZiOc7xQCrRgIpe6H6\n+aGa1fU3A78PBsk163sv4xTqVsu29SH33aE2BDrRwNARTQeBOlE8a/AQaobevHaL\nIZh3IRAmVyCsF4hlZ3ml0et4HzFadkCyTHMnPiA2xhZNgq9OOrSWB3lpavEhFpnR\n+x6C2HoMMwKBgQDgZ2jT30+LU4bsR0m4RrJZQ8Bh/fMWrh4OEjNJjLZFhFulvwWL\npZgCas4b1Y2kANKv8Zd1/GwmePk1ed/BuXcu2Sd5twjYjmBaiBMjqvmSvwWa61QP\nZh29z1OpF9TlDEuYE9eNifkiMjerPOmhUGT1Lrbjl6kXISYk0qbG0j1pqQKBgA07\nRRGcO4zmXDAqbUK1BRvix3q0ROzXFzMmjYk+EyTPIX42bEMrOKUrSnmzvBDWOqLN\nv0NJ4U+y58BhM8GcUVoFuqC/I6/HXwNRC1Hha53GdbBUG5cA6w0NGAaDwOFZ0Fij\n+4yEA9DoUxJ7UpmiIf11HtTMkMIxK7sCZTdMoFI1AoGAKgwZVKXAsc6sIT7KxKLN\niMZKYQjiRshdxWLyhCiFX+1N8EvPdvnO4MEbe2fxvFm0z6uBbtLsuUMvLWcxsb21\n92rn6TQZKxJLHvBAIZjCMNt/MYHYCtfHy+5gwG3jTKxzEsMxK0ywTJCAC8ZUQZDX\nTNJHhMwHVJTOxix3TV3GXG4=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-z01tl@movieapp-774ea.iam.gserviceaccount.com",
    client_id: "103935702523405909549",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-z01tl%40movieapp-774ea.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
  storageBucket: "gs://movieapp-774ea.appspot.com",
});

exports.storage = getStorage().bucket();
