import merge from 'lodash.merge';
import { bookingResolvers } from './Booking';
import { listingResolvers } from './Listing';

export const resolvers = merge(listingResolvers, bookingResolvers);
