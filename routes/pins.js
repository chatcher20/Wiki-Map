const { response } = require('express');
const express = require('express');
const pinRoutes  = express.Router();

module.exports = function(db) {

  pinRoutes.get("/", function(req, res) {
    db.query(`SELECT * FROM pins;`)
      .then(data => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  pinRoutes.post("/", function(req, res) {
    /// add a pin with its associated title, description and image to the "pins" database
    console.log("The backend req.body for pinDAta is: ", req.body);

    // const { title, desc, image } = req.body;

    db.query(`
    INSERT INTO pins (title, description, image, latitude, longitude, latLng)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`, [req.body.title, req.body.desc, req.body.image, req.body.latitude, req.body.longitude, req.body.latLng])
    .then(data => {
      const pin = data.rows[0];
      res.json({ pin });
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  return pinRoutes;

};
