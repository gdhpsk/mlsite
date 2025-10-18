import mongoose, {
  Schema,
  model,
  Types,
  Model,
  Document,
  ClientSession,
} from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

interface IRecord {
  player: string;
  level: string;
  hertz: string;
  link: string;
  playerID?: Types.ObjectId;
  levelID?: Types.ObjectId;
  percent: number
}

interface IRecordMethods {
  cascadingDelete(session: ClientSession, justOne?: number): Promise<void>;
}

interface RecordModel extends Model<IRecord, {}, IRecordMethods> {
  playerNameUpdate(
    session: ClientSession,
    id: Types.ObjectId,
    newname: string
  ): Promise<void>;
  levelNameUpdate(
    session: ClientSession,
    id: Types.ObjectId,
    newname: string
  ): Promise<void>;
}

type RecordDocument = Document<unknown, any, IRecord> &
  IRecord & { _id: Types.ObjectId } & IRecordMethods;

interface ILevel {
  name: string;
  creator: string;
  urlHash?: string;
  position: number;
  listpercent?: number;
  records?: Types.ObjectId[] | RecordDocument[];
  points?: number;
}

interface ILevelMethods {
  add(session: ClientSession): Promise<void>;
  del(session: ClientSession): Promise<void>;
  move(session: ClientSession, pos: number): Promise<void>;
}

type LevelModel = Model<ILevel, {}, ILevelMethods>;

type LevelDocument = Document<unknown, any, ILevel> &
  ILevel & { _id: Types.ObjectId } & ILevelMethods;

interface IPlayer {
  name: string;
  points: {
    lrr: number;
    hrr: number;
    comb: number;
  };
  discord?: string;
  records?: Types.ObjectId[] | RecordDocument[];
  hrr_records?: Types.ObjectId[] | RecordDocument[];
  hertz?: { [rr: number]: number };
  mclass?: {
    lrr: string;
    hrr: string;
    comb: string;
  };
  avatar?: string
}

interface IPlayerMethods {
  getCompletedLevels(): Promise<Comps>;
  updatePoints(session: ClientSession): Promise<void>;
  ban(session: ClientSession): Promise<void>;
}

interface PlayerModel extends Model<IPlayer, {}, IPlayerMethods> {
  updateAllPoints(session: ClientSession): Promise<void>;
}

type PlayerDocument = Document<unknown, any, IPlayer> &
  IPlayer & { _id: Types.ObjectId } & IPlayerMethods;

// interface ILog {
//   date: string;
//   content: string;
//   type: number;
// }

interface LP {
  [levelID: string]: number;
}

interface Comps {
  lrr: LevelDocument[];
  hrr: LevelDocument[];
}

mongoose.plugin(mongooseLeanVirtuals);

const recordSchema = new Schema<IRecord, RecordModel, IRecordMethods>(
  {
    player: { type: String, required: true },
    level: { type: String, required: true },
    hertz: { type: String, required: true },
    link: { type: String, required: true },
    percent: { type: Number, required: true },
    playerID: { type: Schema.Types.ObjectId, ref: "Player" },
    levelID: { type: Schema.Types.ObjectId, ref: "Level" },
  },
  {
    statics: {
      async playerNameUpdate(
        session: ClientSession,
        id: Types.ObjectId,
        newname: string
      ) {
        await this.updateMany(
          { playerID: id },
          { $set: { player: newname } }
        ).session(session);
      },
      async levelNameUpdate(
        session: ClientSession,
        id: Types.ObjectId,
        newname: string
      ) {
        await this.updateMany(
          { levelID: id },
          { $set: { level: newname } }
        ).session(session);
      },
    },
    methods: {
      async cascadingDelete(session: ClientSession, justOne?: number) {
        const level = await Level.findByIdAndUpdate(this.levelID, {
          $pull: { records: this._id },
        }).session(session);
        await Player.findByIdAndUpdate(this.playerID, {
          $pull: { records: this._id },
          $inc: {
            [`points.${this.hertz <= 60 ? "lrr" : "hrr"}`]:
              Math.round(100 * (justOne === 1 ? -level?.points! : 0)) / 100,
            ["points.comb"]: Math.round(100 * (justOne === 1 ? -level?.points! : 0)) / 100,
          },
        }).session(session);

        await this.deleteOne({ session: session });
      },
    },
  }
);

recordSchema.pre("save", async function () {
  const session = this.$session();
  const level = await Level.findOneAndUpdate(
    { name: this.level },
    { $addToSet: { records: this._id } },
    { new: true }
  ).session(session as ClientSession);
  if (level === null) throw new Error("Level not found");
  if(level.listpercent && level.listpercent > this.percent) throw new Error("Not List%")
  const player = await Player.findOneAndUpdate(
    { name: this.player },
    {
      $addToSet: { records: this._id },
      $inc: {
        [`points.${parseInt(this.hertz.split("/").at(-1) as string) <= 60 || this.hertz.split("/").at(-1) as string == "CBF" ? "lrr" : "hrr"}`]: level.points!,
        ["points.comb"]: level.points!,
      },
    },
    { new: true }
  ).session(session as ClientSession);
  if (player === null) throw new Error("Player not found");
  this.playerID = player._id;
  this.levelID = level._id;
});

const HRRrecordSchema = new Schema<IRecord, RecordModel, IRecordMethods>(
  {
    player: { type: String, required: true },
    level: { type: String, required: true },
    hertz: { type: String, required: true },
    link: { type: String, required: true },
    percent: { type: Number, required: true },
    playerID: { type: Schema.Types.ObjectId, ref: "Player" },
    levelID: { type: Schema.Types.ObjectId, ref: "HRR_Level" },
  },
  {
    statics: {
      async playerNameUpdate(
        session: ClientSession,
        id: Types.ObjectId,
        newname: string
      ) {
        await this.updateMany(
          { playerID: id },
          { $set: { player: newname } }
        ).session(session);
      },
      async levelNameUpdate(
        session: ClientSession,
        id: Types.ObjectId,
        newname: string
      ) {
        await this.updateMany(
          { levelID: id },
          { $set: { level: newname } }
        ).session(session);
      },
    },
    methods: {
      async cascadingDelete(session: ClientSession, justOne?: number) {
        const level = await HRRLevel.findByIdAndUpdate(this.levelID, {
          $pull: { records: this._id },
        }).session(session);
        await Player.findByIdAndUpdate(this.playerID, {
          $pull: { hrr_records: this._id },
          // $inc: {
          //   [`points.${this.hertz <= 60 ? "lrr" : "hrr"}`]:
          //     Math.round(100 * (justOne === 1 ? -level?.points! : 0)) / 100,
          //   ["points.comb"]: Math.round(100 * (justOne === 1 ? -level?.points! : 0)) / 100,
          // },
        }).session(session);

        await this.deleteOne({ session: session });
      },
    },
  }
);

HRRrecordSchema.pre("save", async function () {
  const session = this.$session();
  const level = await HRRLevel.findOneAndUpdate(
    { name: this.level },
    { $addToSet: { records: this._id } },
    { new: true }
  ).session(session as ClientSession);
  if (level === null) throw new Error("Level not found");
  if(level.listpercent && level.listpercent > this.percent) throw new Error("Not List%")
  const player = await Player.findOneAndUpdate(
    { name: this.player },
    {
      $addToSet: { hrr_records: this._id },
      // $inc: {
      //   [`points.${this.hertz <= 60 ? "lrr" : "hrr"}`]: level.points!,
      //   ["points.comb"]: level.points!,
      // },
    },
    { new: true }
  ).session(session as ClientSession);
  if (player === null) throw new Error("Player not found");
  this.playerID = player._id;
  this.levelID = level._id;
});

const levelSchema = new Schema<ILevel, LevelModel, ILevelMethods>(
  {
    name: { type: String, required: true },
    creator: { type: String, required: true },
    urlHash: { type: String },
    listpercent: {type: Number},
    position: { type: Number, required: true },
    records: [{ type: Schema.Types.ObjectId, ref: "Record" }],
  },
  {
    minimize: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      points: {
        get() {
          return this.position <= 100
            ? 2160 / (0.35 * this.position + 8.65) - 40
            : 0;
        },
      },
    },
    statics: {
      async levelPoints() {
        const levels: LevelDocument[] = await this.find({
          position: { $lte: 100 },
        });
        return Object.assign(
          {},
          ...levels.map((l) => ({ [l._id.toString()]: l.points }))
        );
      },
    },
    methods: {
      async add(session: ClientSession) {
        await Level.updateMany(
          { position: { $gte: this.position } },
          { $inc: { position: 1 } }
        ).session(session);
        this.$session(session);
        await Player.updateAllPoints(session);
        await this.save();
      },
      async del(session: ClientSession) {
        await Level.updateMany(
          { position: { $gt: this.position } },
          { $inc: { position: -1 } }
        ).session(session);
        await this.populate("records");
        for (const r of this.records) {
          await (r as RecordDocument).cascadingDelete(session);
        }
        await this.deleteOne({ session: session });
        await Player.updateAllPoints(session);
      },
      async move(session: ClientSession, pos: number) {
        if (this.position > pos) {
          await Level.updateMany(
            {
              $and: [
                { position: { $gte: pos } },
                { position: { $lt: this.position } },
              ],
            },
            { $inc: { position: 1 } }
          ).session(session);
        } else if (this.position < pos) {
          await Level.updateMany(
            {
              $and: [
                { position: { $lte: pos } },
                { position: { $gt: this.position } },
              ],
            },
            { $inc: { position: -1 } }
          ).session(session);
        }
        await Level.findByIdAndUpdate(this._id, {
          $set: { position: pos },
        }).session(session);
        await Player.updateAllPoints(session);
      },
    },
  }
);

const HRRlevelSchema = new Schema<ILevel, LevelModel, ILevelMethods>(
  {
    name: { type: String, required: true },
    creator: { type: String, required: true },
    urlHash: { type: String },
    position: { type: Number, required: true },
    records: [{ type: Schema.Types.ObjectId, ref: "HRR_Record" }],
  },
  {
    minimize: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      points: {
        get() {
          return this.position <= 100
            ? 2160 / (0.35 * this.position + 8.65) - 40
            : 0;
        },
      },
    },
    statics: {
      async levelPoints() {
        const levels: LevelDocument[] = await this.find({
          position: { $lte: 100 },
        });
        return Object.assign(
          {},
          ...levels.map((l) => ({ [l._id.toString()]: l.points }))
        );
      },
    },
    methods: {
      async add(session: ClientSession) {
        await HRRLevel.updateMany(
          { position: { $gte: this.position } },
          { $inc: { position: 1 } }
        ).session(session);
        this.$session(session);
        // await Player.updateAllPoints(session);
        await this.save();
      },
      async del(session: ClientSession) {
        await HRRLevel.updateMany(
          { position: { $gt: this.position } },
          { $inc: { position: -1 } }
        ).session(session);
        await this.populate("records");
        for (const r of this.records) {
          await (r as RecordDocument).cascadingDelete(session);
        }
        await this.deleteOne({ session: session });
        await Player.updateAllPoints(session);
      },
      async move(session: ClientSession, pos: number) {
        if (this.position > pos) {
          await HRRLevel.updateMany(
            {
              $and: [
                { position: { $gte: pos } },
                { position: { $lt: this.position } },
              ],
            },
            { $inc: { position: 1 } }
          ).session(session);
        } else if (this.position < pos) {
          await HRRLevel.updateMany(
            {
              $and: [
                { position: { $lte: pos } },
                { position: { $gt: this.position } },
              ],
            },
            { $inc: { position: -1 } }
          ).session(session);
        }
        await HRRLevel.findByIdAndUpdate(this._id, {
          $set: { position: pos },
        }).session(session);
        await Player.updateAllPoints(session);
      },
    },
  }
);

const packSchema = new Schema({
  name: String,
  levels: [mongoose.SchemaTypes.ObjectId],
  position: Number
})

const playerSchema = new Schema<IPlayer, PlayerModel, IPlayerMethods>(
  {
    name: { type: String, required: true },
    points: {
      lrr: { type: Number, required: true, default: 0 },
      hrr: { type: Number, required: true, default: 0 },
      comb: { type: Number, required: true, default: 0 },
    },
    discord: { type: String, required: false },
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
    hrr_records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HRR_Record' }],
    avatar: String
  },
  {
    minimize: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      hertz: {
        get() {
          let rrs: { [rr: string]: number } = {};
          for (const r of this.records as RecordDocument[]) {
            rrs[r.hertz.split("/").at(-1) as string] = (rrs[r.hertz.split("/").at(-1) as string] || 0) + 1;
          }
          return rrs;
        },
      },
      mclass: {
        get() {
          const classes = [
            [1, "Legacy"],
            [50, "Class D"],
            [150, "Class C"],
            [300, "Class B"],
            [600, "Class A"],
            [1000, "Class S"],
            [20000, "Overlords"],
          ];
          return {
            lrr: (classes.find((c) => this.points.lrr < c[0]) ?? classes[0])[1],
            hrr: (classes.find((c) => this.points.hrr < c[0]) ?? classes[0])[1],
            comb: (classes.find((c) => this.points.comb < c[0]) ??
              classes[0])[1],
          };
        },
      },
    },
    statics: {
      async updateAllPoints(session: ClientSession) {
        let objs = await this.aggregate([
          {
            '$lookup': {
              'from': 'records',
              'let': {
                'records': '$records'
              },
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$in': [
                        '$_id', '$$records'
                      ]
                    }
                  }
                }, {
                  '$project': {
                    '_id': '$levelID',
                    'id': '$_id',
                    'hertz': '$hertz'
                  }
                }
              ],
              'as': 'temp'
            }
          }, {
            '$lookup': {
              'from': 'levels',
              'let': {
                'records': '$temp'
              },
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$in': [
                        '$_id', {
                          '$map': {
                            'input': '$$records',
                            'in': '$$this._id'
                          }
                        }
                      ]
                    }
                  }
                }, {
                  '$project': {
                    'points': {
                      '$cond': {
                        'if': {
                          '$gt': [
                            '$position', 100
                          ]
                        },
                        'then': 0,
                        'else': {
                          '$subtract': [
                            {
                              '$divide': [
                                2160, {
                                  '$add': [
                                    {
                                      '$multiply': [
                                        0.35, '$position'
                                      ]
                                    }, 8.65
                                  ]
                                }
                              ]
                            }, 40
                          ]
                        }
                      }
                    }
                  }
                }
              ],
              'as': 'temp2'
            }
          }, {
            '$project': {
              'name': 1,
              'discord': 1,
              'records': {
                '$map': {
                  'input': '$temp',
                  'in': {
                    '_id': '$$this.id',
                    'level': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$temp2',
                            'as': 'this2',
                            'cond': {
                              '$eq': [
                                '$$this2._id', '$$this._id'
                              ]
                            }
                          }
                        }, 0
                      ]
                    }
                  }
                }
              },
              'lrr': {
                '$filter': {
                  'input': '$temp2',
                  'cond': {
                    '$in': [
                      '$$this._id', {
                        '$map': {
                          'input': {
                            '$filter': {
                              'input': '$temp',
                              'as': 'this2',
                              'cond': {
                                '$cond': {
                                  'if': {
                                    '$eq': [
                                      {
                                        '$arrayElemAt': [
                                          {
                                            '$split': [
                                              '$$this2.hertz', '/'
                                            ]
                                          }, -1
                                        ]
                                      }, 'CBF'
                                    ]
                                  },
                                  'then': false,
                                  'else': {
                                    '$lte': [
                                      {
                                        '$toInt': {
                                          '$arrayElemAt': [
                                            {
                                              '$split': [
                                                '$$this2.hertz', '/'
                                              ]
                                            }, -1
                                          ]
                                        }
                                      }, 60
                                    ]
                                  }
                                }
                              }
                            }
                          },
                          'as': 'this3',
                          'in': '$$this3._id'
                        }
                      }
                    ]
                  }
                }
              },
              'hrr': {
                '$filter': {
                  'input': '$temp2',
                  'cond': {
                    '$in': [
                      '$$this._id', {
                        '$map': {
                          'input': {
                            '$filter': {
                              'input': '$temp',
                              'as': 'this2',
                              'cond': {
                                '$cond': {
                                  'if': {
                                    '$eq': [
                                      {
                                        '$arrayElemAt': [
                                          {
                                            '$split': [
                                              '$$this2.hertz', '/'
                                            ]
                                          }, -1
                                        ]
                                      }, 'CBF'
                                    ]
                                  },
                                  'then': true,
                                  'else': {
                                    '$gt': [
                                      {
                                        '$toInt': {
                                          '$arrayElemAt': [
                                            {
                                              '$split': [
                                                '$$this2.hertz', '/'
                                              ]
                                            }, -1
                                          ]
                                        }
                                      }, 60
                                    ]
                                  }
                                }
                              }
                            }
                          },
                          'as': 'this3',
                          'in': '$$this3._id'
                        }
                      }
                    ]
                  }
                }
              }
            }
          }, {
            '$project': {
              'name': 1,
              'discord': 1,
              'records': {
                '$sortArray': {
                  'input': '$records',
                  'sortBy': {
                    'level.points': -1
                  }
                }
              },
              'points': {
                'lrr': {
                  '$reduce': {
                    'input': '$lrr',
                    'initialValue': 0,
                    'in': {
                      '$add': [
                        '$$value', '$$this.points'
                      ]
                    }
                  }
                },
                'hrr': {
                  '$reduce': {
                    'input': '$hrr',
                    'initialValue': 0,
                    'in': {
                      '$add': [
                        '$$value', '$$this.points'
                      ]
                    }
                  }
                }
              }
            }
          }, {
            '$project': {
              'name': 1,
              'discord': 1,
              'records': {
                '$map': {
                  'input': '$records',
                  'in': '$$this._id'
                }
              },
              'points': {
                'lrr': {
                  '$round': [
                    '$points.lrr', 2
                  ]
                },
                'hrr': {
                  '$round': [
                    '$points.hrr', 2
                  ]
                },
                'comb': {
                  '$round': [
                    {
                      '$add': [
                        '$points.lrr', '$points.hrr'
                      ]
                    }, 2
                  ]
                }
              }
            }
          }
        ], { session })
        await this.deleteMany({}, { session })
        await this.insertMany(objs, { session })
      },
    },
    methods: {
      async getCompletedLevels() {
        await this.populate("records", "levelID hertz");
        var completions: Comps = {
          lrr: [],
          hrr: [],
        };
        for (const r of this.records) {
          const level = await Level.findById(r.levelID);
          level &&
            (r.hertz <= 60 ? completions.lrr : completions.hrr).push(level);
        }
        return completions;
      },
      async updatePoints(session: ClientSession) {
        let obj = await model("Records").aggregate([
          {
            '$match': {
              '_id': this._id
            }
          },
          {
            '$lookup': {
              'from': 'records',
              'let': {
                'records': '$records'
              },
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$in': [
                        '$_id', '$$records'
                      ]
                    }
                  }
                }, {
                  '$project': {
                    '_id': '$levelID',
                    'id': '$_id',
                    'hertz': '$hertz'
                  }
                }
              ],
              'as': 'temp'
            }
          }, {
            '$lookup': {
              'from': 'levels',
              'let': {
                'records': '$temp'
              },
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$in': [
                        '$_id', {
                          '$map': {
                            'input': '$$records',
                            'in': '$$this._id'
                          }
                        }
                      ]
                    }
                  }
                }, {
                  '$project': {
                    'points': {
                      '$cond': {
                        'if': { '$gt': ['$position', 100] },
                        'then': 0,
                        'else': {
                          '$subtract': [
                            {
                              '$divide': [
                                2160, {
                                  '$add': [
                                    {
                                      '$multiply': [
                                        0.35, '$position'
                                      ]
                                    }, 8.65
                                  ]
                                }
                              ]
                            }, 40
                          ]
                        }
                      }
                    }
                  }
                }
              ],
              'as': 'temp2'
            }
          }, {
            '$project': {
              'name': 1,
              'discord': 1,
              'records': {
                '$map': {
                  'input': '$temp',
                  'in': {
                    '_id': '$$this.id',
                    'level': {
                      '$arrayElemAt': [
                        {
                          '$filter': {
                            'input': '$temp2',
                            'as': 'this2',
                            'cond': {
                              '$eq': [
                                '$$this2._id', '$$this._id'
                              ]
                            }
                          }
                        }, 0
                      ]
                    }
                  }
                }
              },
              'lrr': {
                '$filter': {
                  'input': '$temp2',
                  'cond': {
                    '$in': [
                      '$$this._id', {
                        '$map': {
                          'input': {
                            '$filter': {
                              'input': '$temp',
                              'as': 'this2',
                              'cond': {
                                '$cond': {
                                  'if': {
                                    '$eq': [
                                      {
                                        '$arrayElemAt': [
                                          {
                                            '$split': [
                                              '$$this2.hertz', '/'
                                            ]
                                          }, -1
                                        ]
                                      }, 'CBF'
                                    ]
                                  },
                                  'then': false,
                                  'else': {
                                    '$lte': [
                                      {
                                        '$toInt': {
                                          '$arrayElemAt': [
                                            {
                                              '$split': [
                                                '$$this2.hertz', '/'
                                              ]
                                            }, -1
                                          ]
                                        }
                                      }, 60
                                    ]
                                  }
                                }
                              }
                            }
                          },
                          'as': 'this3',
                          'in': '$$this3._id'
                        }
                      }
                    ]
                  }
                }
              },
              'hrr': {
                '$filter': {
                  'input': '$temp2',
                  'cond': {
                    '$in': [
                      '$$this._id', {
                        '$map': {
                          'input': {
                            '$filter': {
                              'input': '$temp',
                              'as': 'this2',
                              'cond': {
                                '$cond': {
                                  'if': {
                                    '$eq': [
                                      {
                                        '$arrayElemAt': [
                                          {
                                            '$split': [
                                              '$$this2.hertz', '/'
                                            ]
                                          }, -1
                                        ]
                                      }, 'CBF'
                                    ]
                                  },
                                  'then': true,
                                  'else': {
                                    '$gt': [
                                      {
                                        '$toInt': {
                                          '$arrayElemAt': [
                                            {
                                              '$split': [
                                                '$$this2.hertz', '/'
                                              ]
                                            }, -1
                                          ]
                                        }
                                      }, 60
                                    ]
                                  }
                                }
                              }
                            }
                          },
                          'as': 'this3',
                          'in': '$$this3._id'
                        }
                      }
                    ]
                  }
                }
              }
            }
          }, {
            '$project': {
              'name': 1,
              'discord': 1,
              'records': {
                '$sortArray': {
                  'input': '$records',
                  'sortBy': {
                    'level.points': -1
                  }
                }
              },
              'points': {
                'lrr': {
                  '$reduce': {
                    'input': '$lrr',
                    'initialValue': 0,
                    'in': {
                      '$add': [
                        '$$value', '$$this.points'
                      ]
                    }
                  }
                },
                'hrr': {
                  '$reduce': {
                    'input': '$hrr',
                    'initialValue': 0,
                    'in': {
                      '$add': [
                        '$$value', '$$this.points'
                      ]
                    }
                  }
                }
              }
            }
          }, {
            '$project': {
              'name': 1,
              'discord': 1,
              'records': {
                '$map': {
                  'input': '$records',
                  'in': '$$this._id'
                }
              },
              'points': {
                'lrr': {
                  '$round': [
                    '$points.lrr', 2
                  ]
                },
                'hrr': {
                  '$round': [
                    '$points.hrr', 2
                  ]
                },
                'comb': {
                  '$round': [
                    {
                      '$add': [
                        '$points.lrr', '$points.hrr'
                      ]
                    }, 2
                  ]
                }
              }
            }
          }
        ], { session })
        let { lrr, hrr, comb } = obj[0]
        this.points = { lrr, hrr, comb };
        this.$session(session);
        await this.save();
      },
      async ban(session: ClientSession) {
        await this.populate("records");
        for (let r of this.records) {
          await r.cascadingDelete(session);
        }
        await this.deleteOne({ session: session });
      },
    },
  }
);

// const logSchema = new Schema<ILog>({
//   date: { type: String, required: true },
//   content: { type: String, required: true },
//   type: { type: Number, required: true, min: 1, max: 3 },
// });

export const Record = model<IRecord, RecordModel>("Record", recordSchema);
export const Level = model<ILevel, LevelModel>("Level", levelSchema);
export const HRRRecord = model<IRecord, RecordModel>("HRR_Record", HRRrecordSchema);
export const HRRLevel = model<ILevel, LevelModel>("HRR_Level", HRRlevelSchema);
export const Player = model<IPlayer, PlayerModel>("Player", playerSchema);
export const Pack = model("Pack", packSchema)
// export const Log = model<ILog>("Log", logSchema);
