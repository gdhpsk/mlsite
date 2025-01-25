import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";
import mongoose, { ClientSession } from "mongoose";
import path from "path";
import { Record, Level, Player, Pack, HRRLevel } from "./schema";
import axios from "axios";
import cluster from "cluster";
import os from "os";
import { authentication as admin} from "./firebase-admin";

if (
  process.env.BOT_TOKEN === undefined ||
  process.env.MONGODB_TEST_URI === undefined
)
  env.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.set("query parser", "simple");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//   console.log(
//     `[Worker ${process.pid}] ${req.method} ${req.path} --> (${
//       req.ip as string
//     })`
//   );

//   next();
// });
app.use("/", express.static(path.resolve(__dirname, "../client")));
app.use("/", express.static("public"))

const authed = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.headers.auth ?? "" === (process.env.BOT_TOKEN as string))) {
    return res.sendStatus(403);
  } else {
    next();
  }
};

const firebaseAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = await admin.verifyIdToken(req.body.token);
    const user = await admin.getUser(decodedToken.uid);
    if (!user) return res.sendStatus(401);

    const role = user.customClaims?.role;
    if (role !== 'editor' && role !== 'leader') {
      return res.sendStatus(401);
    }
    req.headers.user_info = JSON.stringify(user)
    next();
  } catch (error) {
    console.error('Firebase auth error:', error);
    return res.sendStatus(401);
  }
};


const transaction = (
  fn: (req: Request, res: Response, session: ClientSession) => Promise<number>
) => { 
  return async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    let result: any;
    try {
      session.startTransaction();
      result = res.sendStatus(await fn(req, res, session));
      await session.commitTransaction();
    } catch (code) {
      await session.abortTransaction();
      result =
        typeof code === "number" ? res.sendStatus(code) : console.log(code);
    } finally {
      await session.endSession();
      return result;
    }
  };
};

app.post("/auth/assign", firebaseAuth, async (req, res) => {
  const { uid, role } = req.body;
  if (!uid || !role) return res.sendStatus(400);
  
  // Verify requesting user is a leader
  try {
    const requestingUser = JSON.parse(req.headers.user_info as string)
    if (!requestingUser.customClaims?.role || requestingUser.customClaims.role !== 'leader') {
      return res.sendStatus(403);
    }

    // Assign role to target user
    if (role !== 'editor' && role !== 'leader') {
      return res.sendStatus(400);
    }

    await admin.setCustomUserClaims(uid, { role });
    return res.sendStatus(200);

  } catch (error) {
    console.error('Error assigning role:', error);
    return res.sendStatus(500);
  }
});



app.get("/levels", async (req, res) => {
  const levels = await Level.find({ position: req.query.position ? parseInt(req.query.position as string) : { $lte: Infinity } })
    .lean({ virtuals: true })
    .sort("position") 
    .select("-_id -__v -records");
  return res.status(200).json(levels);
});

app.get("/levels/hrr", async (req, res) => {
  const levels = await HRRLevel.find({ position: req.query.position ? parseInt(req.query.position as string) : { $lte: Infinity } })
    .lean({ virtuals: true })
    .sort("position") 
    .select("-_id -__v -records");
  return res.status(200).json(levels);
});

app.get("/levels/:name", async (req, res) => {
  const level = await Level.findOne({ name: req.params.name })
    .lean({ virtuals: true })
    .populate("records", "-_id -__v -level -levelID -playerID")
    .select("-_id -__v");
  return level
    ? res.status(200).json(level)
    : res.status(404).send("Level not found.");
});

app.get("/levels/hrr/:name", async (req, res) => {
  const level = await HRRLevel.findOne({ name: req.params.name })
    .lean({ virtuals: true })
    .populate("records", "-_id -__v -level -levelID -playerID")
    .select("-_id -__v");
  return level
    ? res.status(200).json(level)
    : res.status(404).send("Level not found.");
});

app.post(
  "/levels",
  authed,
  transaction(async (req, res, session) => {
    if (await Level.exists({ name: req.body.name as string })) throw 409;
    const level = new Level({
      name: req.body.name as string,
      creator: req.body.creator as string,
      position: req.body.position as number,
    });
    await level.add(session);
    return 201;
  })
);

app.post(
  "/levels/hrr",
  authed,
  transaction(async (req, res, session) => {
    if (await HRRLevel.exists({ name: req.body.name as string })) throw 409;
    const level = new HRRLevel({
      name: req.body.name as string,
      creator: req.body.creator as string,
      position: req.body.position as number,
    });
    await level.add(session);
    return 201;
  })
);

app.delete(
  "/levels/:name",
  authed,
  transaction(async (req, res, session) => {
    const level = await Level.findOne({ name: req.params.name });
    if (level === null) throw 404;
    await level.del(session);
    return 200;
  })
);

app.patch(
  "/levels/:name",
  authed,
  transaction(async (req, res, session) => {
    if (req.body.newpos !== undefined) {
      const level = await Level.findOne({ name: req.params.name });
      if (level === null) throw 404;
      await level.move(session, req.body.newpos as number);
      return 200;
    }
    if (req.body.newname !== undefined) {
      const level = await Level.findOneAndUpdate(
        { name: req.params.name },
        { $set: { name: req.body.newname as string } }
      ).session(session);
      if (level === null) throw 404;
      await Record.levelNameUpdate(session, level._id, req.body.newname);
      return 200;
    }
    if (req.body.newcreator !== undefined) {
      const level = await Level.findOneAndUpdate(
        { name: req.params.name },
        { $set: { creator: req.body.newcreator as string } }
      ).session(session);
      if (level === null) throw 404;
      return 200;
    }
    throw 400;
  })
);

app.get("/players", async (req, res) => {
  const players = await Player.find({ "points.comb": { $gt: 0 } })
    .lean()
    .sort("-points.comb")
    .select("name points -_id");
  return res.status(200).json(players);
});

app.get("/players", async (req, res) => {
  const players = await Player.find({ "points.comb": { $gt: 0 } })
    .lean()
    .sort("-points.comb")
    .select("name points -_id");
  return res.status(200).json(players);
});

app.get("/players/:name", async (req, res) => {
  Player.findOne({ name: req.params.name })
  .lean({virtuals: true})
  .populate({
    path: 'records',                   // First, populate the 'records' field
    select: '-_id -id -__v -player -playerID',  // Exclude fields from 'records'
    populate: {
      path: 'levelID',                 // Then, populate the 'levelID' field inside each 'record'
      select: 'position',              // Include only the 'position' field from 'Level'
    }
  })
  .select("-_id -id -__v")             // Exclude top-level fields from the Player document
  .exec((err, result) => {
    if (err || !result) {
      return res.status(404).send("Player not found.");
    } else {
      res.status(200).json(result)
    }
  });
});

app.post(
  "/players",
  authed,
  transaction(async (req, res, session) => {
    if (await Player.exists({ name: req.body.name as string })) throw 409;
    const player = new Player({
      name: req.body.name as string,
      discord:
        req.body.discord === null ? undefined : (req.body.discord as string),
    });
    player.$session(session);
    await player.save();
    return 201;
  })
);

app.delete(
  "/players/:name",
  authed,
  transaction(async (req, res, session) => {
    const player = await Player.findOne({ name: req.params.name });
    if (player === null) throw 404;
    await player.ban(session);
    return 200;
  })
);

app.patch(
  "/players/:name",
  authed,
  transaction(async (req, res, session) => {
    if (req.body.newname !== undefined) {
      const player = await Player.findOneAndUpdate(
        { name: req.params.name },
        { $set: { name: req.body.newname as string } }
      ).session(session);
      if (player === null) throw 404;
      await Record.playerNameUpdate(session, player._id, req.body.newname);
      return 200;
    }
    if (req.body.newdiscord !== undefined) {
      const player = await Player.findOneAndUpdate(
        { name: req.params.name },
        { $set: { discord: req.body.newdiscord as string } }
      ).session(session);
      if (player === null) throw 404;
      return 200;
    }
    throw 400;
  })
);

app.post(
  "/records",
  authed,
  transaction(async (req, res, session) => {
    if (
      !(await Player.exists({ name: req.body.player as string })) ||
      !(await Level.exists({ name: req.body.level as string }))
    )
      throw 404;
    if (req.body.hertz === undefined || req.body.link === undefined) throw 400;
    if (
      await Record.exists({
        player: req.body.player as string,
        level: req.body.level as string,
      })
    )
      throw 409;
    const record = new Record({
      player: req.body.player as string,
      level: req.body.level as string,
      hertz: req.body.hertz as number,
      link: req.body.link as string,
    });
    record.$session(session);
    await record.save();
    return 201;
  })
);

app.delete(
  "/records",
  authed,
  transaction(async (req, res, session) => {
    if (req.body.player === undefined || req.body.level === undefined)
      throw 400;
    const record = await Record.findOne({
      player: req.body.player as string,
      level: req.body.level as string,
    });
    if (record === null) throw 404;
    await record.cascadingDelete(session, 1);
    return 200;
  })
);

app.route("/packs")
.get(async (req, res) => {
  let pack = await Pack.find().sort({position: 1}).lean()
  let packs = await Promise.all(pack.map(async e => {
    let levels  = await Promise.all(e.levels.map(async x => await Level.findOne(x).select("name")))
    let players = await Player.aggregate([
      {
        '$lookup': {
          'from': 'records', 
          'let': {
            'ids': {
              '$map': {
                'input': '$records', 
                'in': {
                  '$toString': '$$this'
                }
              }
            }
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$in': [
                    {
                      '$toString': '$_id'
                    }, '$$ids'
                  ]
                }
              }
            }
          ], 
          'as': 'records'
        }
      }, {
        '$match': {
          '$expr': {
            '$eq': [
              e.levels.length, {
                '$size': {
                  '$setIntersection': [
                    {
                      '$map': {
                        'input': '$records', 
                        'in': '$$this.levelID'
                      }
                    }, e.levels
                  ]
                }
              }
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          records: {
            $filter: {
              input: "$records",
              cond: {
                $in: ["$$this.levelID", e.levels]
              }
            }
          }
        }
      }
    ])
    return {
      ...e,
      levels,
      players
    }
  }))
  return res.status(200).json(packs)
})

app.post("/submit", async (req, res) => {
  var isNew = 0;
  if (
    await Record.exists({
      player: req.body.player as string,
      level: req.body.level as string,
    })
  )
    return res.sendStatus(409);
  if (!(await Player.exists({ name: req.body.player as string }))) isNew += 1;
  if (!(await Level.exists({ name: req.body.level as string }))) isNew += 2;
  return axios
    .post(
      `${process.env.BOT_LISTENER_URI}/submit`,
      JSON.stringify({ ...req.body, isNew }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((data) => res.sendStatus(data.status))
    .catch(() => res.sendStatus(503));
});

app.get("/members", async (req, res) => {
  const players = await Player.find({ discord: { $exists: req.query.disc == "false" ? false : true } })
    .lean()
    .sort("-points.comb")
    .select("name discord points.comb -_id");
  return res.status(200).json(players);
});
let usercount = {
  count: 0,
  refresh: 0
}
app.get("/users", async (req, res) => {
  if(usercount.refresh >= Date.now()) {
    return res.json({count: usercount.count, refresh: usercount.refresh})
  }
  let request: any = await fetch("https://discord.com/api/v10/guilds/341748330801659904?with_counts=true", {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
    }
  })
  let json: Record<any, any> = await request.json()
  usercount.count = json.approximate_member_count
  usercount.refresh = Date.now() + 300_000
  return res.json({count: usercount.count})
})

// app.get("/logs", async (req, res) => {
//   const logs = await Log.find().lean().select("-__v -_id");
//   return res.status(200).json(logs);
// });

// app.post("/logs", authed, async (req, res) => {
//   const log = new Log({
//     date: req.body.date as string,
//     content: req.body.content as string,
//     type: req.body.type as number,
//   });
//   await log.save();
//   return res.status(201).json({ id: log.id });
// });

// app.patch("/logs/:id", authed, async (req, res) => {
//   const log = await Log.findByIdAndUpdate(req.params.id, {
//     $set: { content: req.body.content },
//   });
//   return log ? res.sendStatus(200) : res.sendStatus(404);
// });

// app.delete("/logs/:id", authed, async (req, res) => {
//   const log = await Log.findByIdAndDelete(req.params.id);
//   return log ? res.sendStatus(200) : res.sendStatus(404);
// });

if (cluster.isPrimary) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("listening", (worker) => {
    console.log(`Worker ${worker.process.pid as number} is online.`);
  });

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid as number} is dead.`);
    cluster.fork();
  });
} else {
  try {
mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}
