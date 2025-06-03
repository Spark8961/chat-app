export const verifyMe = async (req, res) => {
    try {
        return res.status(200).json({ authenticated: true, user: req.user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};
