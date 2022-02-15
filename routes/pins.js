const { response } = require('express');
const express = require('express');
const pinRoutes  = express.Router();

module.exports = function(db) {

  pinRoutes.get("/", function(req, res) {
    db.query(`SELECT * FROM pins;`)
      .then(data => {
        const selectAllFromPins = data.rows;
        res.json({ selectAllFromPins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  pinRoutes.post("/", function(req, res) {
    /// add a pin with its associated title, description and image to the "pins" database
    console.log(req.body);

    const { title, desc, image } = req.body;

    db.query(`
    INSERT INTO pins (title, description, image)
    VALUES ($1, $2, $3)
    RETURNING *;`, [req.body.title, req.body.desc, req.body.image])
    .then(data => {
      const selectAllFromPins = data.rows;
      res.json({ selectAllFromPins });
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: err.message });
    });

    // INSERT INTO pins (title, description, image) VALUES ('title here', 'desc here', 'img here');


  //   db
  //   .query(`
  //   INSERT INTO pins (title, description, image)
  //   VALUES ($1, $2, $3)
  //   RETURNING *;`, [req.body.title, req.body.desc, req.body.image])

  //   .then((result) => {
  //     console.log("testing 123", result.rows);
  //     res.end();
  //     return result.rows[0];
  //   })
  //   .catch((err) => {
  //     return err.message;
  //   });


  // //   const addPin =  function(newPin) {
  // //     return
  // //   };

  // //   const newPin = req.body;
  // //   addPin(newPin)
  // //   .then(newPin => {
  // //     if (!newPin) {
  // //       res.send({error: "error"});
  // //       return;
  // //     }
  // //   })
  // //   .catch(error => res.send(error));




  });

  return pinRoutes;

};
