
GET(fetch incidents)

https://enyata-interview.herokuapp.com/api/v1/incidents


GET (fetch incidents with paginatination)

https://enyata-interview.herokuapp.com/api/v1/incidents?page=1&limit=1


GET (fetch incidents with search params)

https://enyata-interview.herokuapp.com/api/v1/incidents?client_id=12&incident_desc=name&city=name&country=name


GET (fetch a single incident with incident id)

https://enyata-interview.herokuapp.com/api/v1/incidents/b0b5b678-31bd-11ed-b1b4-0e76c4be424f



POST(create incident)

https://enyata-interview.herokuapp.com/api/v1/incidents

requestPayload={  
    "client_id":123,
    "incident_desc":"name",
    "city":"name",
    "country":"mmmm"
}

