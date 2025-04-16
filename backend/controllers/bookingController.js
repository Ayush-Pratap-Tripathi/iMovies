const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const Movie = require("../models/movieModel");

module.exports.addBooking = async (req, res) => {
  try {
    const { bookingId, showId, ticketsData } = req.body;
    console.log(ticketsData);
    const userEmail = req.user.userDetails.email;
    await Booking.create({
      bookingId,
      userEmail,
      showId,
      ticketsData,
    });

    return res.json({ status: true, msg: "Tickets booked successfully:)" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.getBookings = async (req, res) => {
  try {
    const userEmail = req.user.userDetails.email;
    const getBookings = await Booking.find({ userEmail });
    const bookings = await Promise.all(
      getBookings?.map(async (b) => {
        const show = await Show.findOne({ showId: b.showId });
        const movie = await Movie.findOne({ movieId: show.movieId });

        const data = {
          bookingId: b.bookingId,
          userEmail,
          ticketsData: b.ticketsData,
          theatreName: show.theatreName,
          showdate: show.showdate,
          showtime: show.showtime,
          movieName: movie.movieName,
          media: movie.media,
        };
        return data;
      })
    );

    return res.status(200).json({ status: true, bookings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: "Server issue :(" });
  }
};

module.exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { tickets } = req.body;
    //get show details
    const booking = await Booking.findOne({ bookingId });
    const show = await Show.findOne({ showId: booking.showId });

    const filterBalcony = show.tickets.balcony;

    if (tickets.balcony.length > 0) {
      tickets.balcony.forEach((s) => {
        if (filterBalcony.hasOwnProperty(s)) {
          delete filterBalcony[s];
        }
      });
    }

    const filterMiddle = show.tickets.middle;

    if (tickets.middle.length > 0) {
      tickets.middle.forEach((s) => {
        if (filterMiddle.hasOwnProperty(s)) {
          delete filterMiddle.s;
        }
      });
    }

    const filterLower = show.tickets.lower;
    if (tickets.lower.length > 0) {
      tickets.lower.forEach((s) => {
        if (filterLower.hasOwnProperty(s)) {
          delete filterLower.s;
        }
      });
    }

    const filteredTickets = {
      balcony: filterBalcony,
      middle: filterMiddle,
      lower: filterLower,
    };
    await Booking.deleteOne({ bookingId });
    await Show.updateOne(
      { showId: booking.showId },
      { $set: { tickets: filteredTickets } }
    );

    return res
      .status(200)
      .json({ status: true, msg: "Ticket Cancelled Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: "Server issue :(" });
  }
};
