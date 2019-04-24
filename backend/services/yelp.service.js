module.exports=function(app) {
    const yelpService = require('yelp-fusion');

    app.get("/api/yelp", getReviews);

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
    const apiKey = 'q7v0CKEbYT-ygft80DFwblU1ZPFY_nFdoHqZKejbAJPEWrNt-GjAdscowAHzFc10vjnOi4H16w2nW7UOOBA6y-5dVCHHu0kcUETn7OqFrje1aOQ0UaUz5v_N8PO8XHYx';


    function getReviews(req, res) {

        const searchRequest = {
            term: req.query["name"],
            location: req.query["zipcode"]
        };
        console.log(searchRequest.term);
        console.log(searchRequest.location);


        const client = yelpService.client(apiKey);

        client.search(searchRequest).then(response => {
            const firstResult = response.jsonBody.businesses[0];
            console.log(firstResult);
            const id = firstResult.id;
            console.log(id);

            client.reviews(id).then(
                response => {
                    const result = response.jsonBody;
                    console.log(result);
                    res.send(result);
                    // res.send(JSON.stringify(result, null, 4));
                }
            );

        }).catch(e => {
            console.log(e);
            res.sendStatus(400);
        });
    }
};
