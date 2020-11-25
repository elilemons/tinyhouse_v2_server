- `npm install` to install package dependencies
- `npm run start` to run Node:Express server

Get a list of bookings
http://localhost:9000/bookings

Book the first listing for January 1st, 2021.
```sh
curl -X POST http://localhost:9000/create-booking \
-H 'Content-type: application/json' \
-d '{"id": "001","timestamp":"01/01/2021, 9:00:00 AM"}'
```

Book the third listing for immediately.
```sh
curl -X POST http://localhost:9000/create-booking \
-H 'Content-type: application/json' \
-d '{"id": "001"}'
```

Favorite the first listing
```sh
curl -X POST http://localhost:9000/favorite-listing -H 'Content-type: application/json' -d '{"id": "001"}'
```

Favorite the third listing
```sh
curl -X POST http://localhost:9000/favorite-listing -H 'Content-type: application/json' -d '{"id": "003"}'
```




