var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Ipresearch = new Schema({
    ifIndex: { type: String },
    ifTypeIcon: { type: String },
    ifName: { type: String },
    ifDescr: { type: String },
    ifAlias: { type: String },
    ifAdminIcon: { type: String },
    ifOperIcon: { type: String },
    MAC: { type: String },
    IP: { type: String },
    DNS: { type: String },
    VLANs: { type: String },
    VLANforMAC: { type: String },
    ifSpeed: { type: String },
    ifType: { type: String },
    TrunkPort: { type: String }
});

module.exports = mongoose.model('Ipresearch', Ipresearch);