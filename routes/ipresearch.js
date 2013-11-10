var Ipresearch = require('../models/ipresearch'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('ipresearchId', function(req, res, next, id) {
        Ipresearch.findById(id, function(err, ipresearch) {
            if (err) {
                next(err);
            } else {
                res.locals.ipresearch = ipresearch;
                next();
            }
        });
    });
    
    app.get('/ipresearches', function(req, res) {
        Ipresearch.find({}, function(err, ipresearches) {
            res.render('ipresearch/index', { ipresearches : ipresearches });
        });
    });

    app.get('/ipresearches/create', function(req, res) {
        res.render('ipresearch/create', { ipresearch : new Ipresearch() });
    });

    app.post('/ipresearches/create', function(req, res) { 
        var ipresearch = new Ipresearch(req.body);

        ipresearch.save(function(err) {
            if (err) {
                res.render('ipresearch/create', {
                    ipresearch : ipresearch
                });
            } else {
                res.redirect('/ipresearches');
            }
        });
    });

    app.get('/ipresearches/:ipresearchId/edit', function(req, res) {
        res.render('ipresearch/edit');
    });

    app.post('/ipresearches/:ipresearchId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.ipresearch);

        res.locals.ipresearch.save(function(err) {
            if (err) {
                res.render('ipresearch/edit');
            } else {
                res.redirect('/ipresearches');
            }
        });
    });

    app.get('/ipresearches/:ipresearchId/detail', function(req, res) {
        res.render('ipresearch/detail');
    });

    app.get('/ipresearches/:ipresearchId/delete', function(req, res) {
        res.render('ipresearch/delete');
    });

    app.post('/ipresearches/:ipresearchId/delete', function(req, res) {
        Ipresearch.remove({ _id : req.params.ipresearchId }, function(err) {
            res.redirect('/ipresearches');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Ipresearch',
    route : '/ipresearches'
}
