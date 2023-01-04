const { Schema, Types, model } = require('mongoose');

// The reactionSchema defines the schema of the subdocument
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new Types.ObjectId(),
      },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: v => `${new Date(v).getMonth() + 1}/${new Date(v).getDate()}/${new Date(v).getFullYear()
        }`,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  });

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: v => `${new Date(v).getMonth() + 1}/${new Date(v).getDate()}/${new Date(v).getFullYear()
      }`,
    },
    username: {
        type: String,
        ref: 'User',
        required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions associated with a thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
