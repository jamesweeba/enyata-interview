
GET(fetch incidents)

http://localhost:1700/api/v1/incidents


GET (fetch incidents with paginatination)

http://localhost:1700/api/v1/incidents?page=1&limit=2


GET (fetch incidents with search params)

http://localhost:1700/api/v1/incidents?client_id=12&incident_desc=name&city=name&country=name



POST(create incident)

http://localhost:1700/api/v1/incidents

requestPayload={  
    "client_id":123,
    "incident_desc":"name",
    "city":"name",
    "country":"mmmm"
}


