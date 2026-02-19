const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));
(async () => {
    await client.connect();
    console.log("Connected to Redis");
})();

let availableSeats = 100;

exports.bookSeat = async (req, res) => {
    const seatId = "seat-lock";

    try {
        const lock = await client.set(seatId, "locked", {
            NX: true,
            EX: 5
        });
        if (!lock) {
            return res.status(400).json({
                success: false,
                message: "Seat is being booked by someone else"
            });
        }
        if (availableSeats <= 0) {
            await client.del(seatId);
            return res.status(400).json({
                success: false,
                message: "No seats available"
            });
        }
        await new Promise(resolve => setTimeout(resolve, 100));

        availableSeats--;
        const bookingId = Date.now();
        await client.del(seatId);

        res.status(200).json({
            success: true,
            bookingId: bookingId,
            remaining: availableSeats
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
