/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Database, Listing } from '../../../lib';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      // eslint-disable-next-line @typescript-eslint/ban-types
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResult.value) {
        throw new Error('Failed to delete');
      }

      return deleteResult.value;
    },
    favoriteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({
        _id: new ObjectId(id),
      });

      if (!listing) {
        throw new Error('Listing not found');
      }

      const result = await db.listings.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            favorite: !listing.favorite,
          },
        },
        {
          returnOriginal: false,
        }
      );

      if (!result.value) {
        throw new Error('Failed to favorite listing');
      }

      return result.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
