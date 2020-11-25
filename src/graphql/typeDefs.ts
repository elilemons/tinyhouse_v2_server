import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Booking {
    id: ID!
    listingId: ID!
    title: String
    image: String
    address: String
    timestamp: String!
  }

  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
    favorite: Boolean
  }

  type Query {
    bookings: [Booking!]!
    listings: [Listing!]!
  }

  type Mutation {
    createBooking(listingId: ID!, timestamp: String): Booking!
    deleteBooking(id: ID!): Booking!
    deleteListing(id: ID!): Listing!
    favoriteListing(id: ID!): Listing!
  }
`;
