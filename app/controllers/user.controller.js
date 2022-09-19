// /api/test/user untuk pengguna yang masuk User
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
// /api/test/admin For have Role Admin
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
// /api/test/super for have Role Super Admin
exports.superadminBoard = (req, res) => {
    res.status(200).send("Super Admin Content.");
};