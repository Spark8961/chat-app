export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0 })
            .json({ message: "Logout Success" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};
