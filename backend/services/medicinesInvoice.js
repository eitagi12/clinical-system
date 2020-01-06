const passport = require('passport')

function convertMedicineIdToObject(medicineLists, invoiceId) {
  let medicineInvoicesList = [];
  
  medicineLists.map(medicine => {
    medicineInvoicesList.push( {
      invoiceId,
      medicineId: medicine.id,
      amount: medicine.amount
    });
  });

  return medicineInvoicesList;
}

module.exports = (app, db) => {
  app.post("/createmedicineinvoice",passport.authenticate('jwt', { session: false }), async function(req, res) {
    const invoice = await db.invoices.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      diagnose: req.body.diagnose
    });

    const medicinesInvoiceList = convertMedicineIdToObject(
      req.body.medicinesList,
      invoice.id
    );

    console.log(medicinesInvoiceList);
    
    const result = await db.medicinesInvoice.bulkCreate(medicinesInvoiceList);
    
    res.status(201).send(result);
  });

  app.post("/getinvoicedetail", passport.authenticate('jwt', { session: false }),function(req, res){
console.log(req.body.invoiceId);
console.log("Heloooooooooooooooooooooooooooooooo");

    db.invoices.findAll({ 
      where: { id: req.body.invoiceId},
      include: [{
        model: db.medicines,
        through: {attributes:['amount']}
      }]
    }).then(result=>{
      res.status(200).send(result);
    })
  })

  app.get('/protected-route', passport.authenticate('jwt', { session: false }),
    function (req, res) {
      res.status(200).send(req.user)
    }
  )
};
