const { ApolloServer, gql } = require("apollo-server-express");

const Applicant = require("../models/Applicant");

const typeDefs = gql`
  scalar Date

  type ApplicantType {
    id: ID
    createdAt: Date
    updatedAt: Date
    name: String
    username: String
    phone: String
    address: String
    lat: String
    lng: String
    email: String
    status: String
    category: String
  }

  # Queries
  type Query {
    getApplicants: [ApplicantType]
    getApplicantById(id: ID): ApplicantType
  }

  # Mutations
  type Mutation {
    ######## CREATE Mutation ########
    createApplicant(
      name: String
      username: String
      phone: String
      email: String
      address: String
      lat: String
      lng: String
      status: String
      category: String
    ): ApplicantType

    ######## UPDATE MUTATION ########
    updateApplicant(
      id: ID
      name: String
      username: String
      phone: String
      email: String
      address: String
      lat: String
      lng: String
      status: String
      category: String
    ): ApplicantType

    saveOrRejectApplicant(id: ID, status: String): ApplicantType

    moveApplicant(id: ID, category: String): ApplicantType

    ######## DELETE MUTATION ########
    deleteApplicant(id: ID): Boolean
  }
`;

// Query Resolvers
const resolvers = {
  //  what are we going to do when the query is executed
  Query: {
    // GET ALL
    getApplicants: () => {
      return Applicant.find({});
    },

    // GET BY ID
    getApplicantById: (_, args) => {
      return Applicant.findById(args.id);
    },
  },

  Mutation: {
    // CREATE MUTATION
    createApplicant: (_, args) => {
      console.log("ARGS", args);
      args.phone;
      let newApplicant = Applicant({
        name: args.name,
        username: args.username,
        phone:
          typeof args.phone === undefined
            ? ""
            : args.phone.slice(0, 4) +
              "-" +
              args.phone.slice(4, 8) +
              "-" +
              args.phone.slice(8, 11),
        email: args.email,
        address: args.address,
        lat: args.lat,
        lng: args.lng,
        status: args.status,
        category: args.category,
      });

      return newApplicant.save();
    },

    // UPDATE MUTATION
    updateApplicant: (_, args) => {
      console.log("ARGS", args);
      let condition = { _id: args.id };

      let updates = {};

      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

      let phoneFormat = "";

      if (format.test(args.phone)) {
        phoneFormat = args.phone;
      } else {
        phoneFormat =
          args.phone.slice(0, 4) +
          "-" +
          args.phone.slice(4, 8) +
          "-" +
          args.phone.slice(8, 11);
      }

      updates = {
        name: args.name,
        username: args.username,
        phone: phoneFormat,
        email: args.email,
        address: args.address,
        lat: args.lat,
        lng: args.lng,
        status: args.status,
        category: args.category,
      };

      return Applicant.findOneAndUpdate(condition, updates);
    },

    saveOrRejectApplicant: (_, args) => {
      let condition = { _id: args.id };
      let update = {
        status: args.status,
      };

      return Applicant.findOneAndUpdate(condition, update);
    },

    moveApplicant: (_, args) => {
      let condition = { _id: args.id };
      let update = {
        category: args.category,
      };

      return Applicant.findOneAndUpdate(condition, update);
    },

    // DELETE MUTATION
    deleteApplicant: (_, args) => {
      console.log("_ + args", _, args);
      // return Applicant.findOneAndDelete({ _id: args.id });

      let condition = args.id;

      return Applicant.findByIdAndDelete(condition).then((err, applicant) => {
        if (!err && !applicant) {
          return false;
        }
        return true;
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = server;
