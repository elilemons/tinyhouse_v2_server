import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Booking, Database } from '../../../lib';

export const bookingResolvers: IResolvers = {
  Query: {
    bookings: async (
      _root: undefined,
      // eslint-disable-next-line @typescript-eslint/ban-types
      _args: {},
      { db }: { db: Database }
    ): Promise<Booking[]> => {
      return await db.bookings.find({}).toArray();
    },
  },
  Mutation: {
    createBooking: async (
      _root: undefined,
      { listingId, timestamp }: { listingId: string; timestamp: string },
      { db }: { db: Database }
    ): Promise<Booking> => {
      // Find the listing
      const listing = await db.listings.findOne({
        _id: new ObjectId(listingId),
      });

      if (!listing) {
        throw new Error('Listing not found');
      }

      const createResult = await db.bookings.insertOne({
        _id: new ObjectId(),
        listingId: new ObjectId(listingId),
        title: listing.title,
        image: listing.image,
        address: listing.address,
        timestamp,
      });

      if (!createResult.insertedId) {
        throw new Error('Failed to create');
      }

      const newBooking = await db.bookings.findOne({
        _id: new ObjectId(createResult.insertedId),
      });

      if (!newBooking) {
        throw new Error('Failed to create');
      }

      return newBooking;
    },
    deleteBooking: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Booking> => {
      const deleteResult = await db.bookings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResult) {
        throw new Error('Listing not found');
      }

      if (!deleteResult.ok || !deleteResult.value) {
        throw new Error('Failed to delete');
      }

      return deleteResult.value;
    },
  },
  Booking: {
    id: (booking: Booking): string => booking._id.toString(),
  },
};
