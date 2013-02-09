/*jshint node:true, laxcomma:true*/
/*globals define: true*/
"use strict";

define(function(require) {
  var underscoreFunctions  = require('./functions.json'),
      _    = require('lodash'),
      uuid = require('node-uuid');

  // Export the Room module
  return function(io) {
    // Generate a UUID for the room
    var roomID = uuid.v4();
    var users = [];
    var round = 1;
    var currentFn = null;

    // Return the room's public methods
    return {

      initGame: function() {
        console.log('starting game id ' + roomID);
        currentFn = this.generateRandomFunction();
        io.sockets.in(roomID).emit('beginGame', currentFn);
      },

      // Returns a random function from our list of underscore functions. We'll
      // broadcast this function to the room's members on round start
      generateRandomFunction: function() {
        var randomFunction,
            randomIndex,
            keys = [],
            maxDifficulty = 1;

        // Always return _.each during the first round. Helps prevent advanced
        // functions from being presented at first load.
        if (this.getRound() === 1) {
          this.increaseRound();
          return underscoreFunctions.each;
        }

        // Create a list of functions from which we can pull a random function.
        // Creating this list lets us limit our pool by difficulty level.
        _.each(underscoreFunctions, function(val, prop) {
          if (prop.difficulty <= maxDifficulty) {
            keys.push(prop);
          }
        });

        // Find our random function by grabbing a random index limited by the
        // pool size.
        randomIndex = Math.floor(Math.random() * _.size(keys));
        randomFunction = keys[randomIndex];

        return underscoreFunctions[randomFunction];
      },

      // Returns the current round number of the room
      getRound: function() {
        return round;
      },

      // Increases the round number of the room and returns the current round number
      increaseRound: function() {
        return ++round;
      },

      // Checks if the room is full. Returns true if yes, false if no.
      isFull: function() {
        return users.length >= 2;
      },

      // Checks if the room is empty. Returns true if yes, false if no.
      isEmpty: function() {
        return users.length === 0;
      },

      // Adds a user to the room's users array and subscribes them to this
      // room's broadcasts. Returns the population of the room in int form.
      addUser: function(user) {
        if (this.isFull()) {
          throw new Error("Cannot add users to a full room.");
        }

        // Subscribe a user to this room's socket broadcasts
        user.getSocket().join(roomID);
        // Add the user to the current room's users array
        return users.push(user);
      },

      // Removes a user from the current room.
      removeUser: function(user) {
        if (this.isEmpty()) {
          throw new Error("Cannot remove users from an empty room.");
        }

        _.each(users, function(val, i, arr) {
          if (val === user) {
            arr.splice(i, 1);
          }
        });
      },

      // Return an array containing all users in the room.
      getUsers: function() {
        return users;
      },

      // Return the room's ID
      getID: function() {
        return roomID;
      },

      // Broadcast the contents of a user's editor to that user's room.
      updateEditor: function(data, socket) {
        socket.broadcast.to(roomID).emit('updateEditor', data);
      },

      // When a user's tests pass, they send a victory event to the server.
      // Here, we broadcast that event to the other player.
      sweetVictory: function(data, socket) {
        socket.broadcast.to(roomID).emit('sweetVictory', data);

        // Start another game after 2.5 seconds.
        setTimeout(this.initGame(), 2500);
      }

    };
  };
});
