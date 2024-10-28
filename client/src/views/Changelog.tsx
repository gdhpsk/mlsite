import React, { useEffect } from 'react'
import ChangelogBox, { ChangelogBoxTypes } from '../components/ChangelogBox'

let changelog: ChangelogBoxTypes[] = [
    {
        title: "The Final Overdue Update",
        date: "8/6/2023",
        ruleChanges: [
            <><i className='contents'>Raws and taps are now required for every completion,</i> and are to be submitted through Google Drive, mediafire or unlisted YT in the record submission</>,
            <>Due to vulnerabilities, <i className='contents'>Everyplay is banned and no longer viable as proof</i>, with the following exceptions: <br></br><ul style={{listStyleType: "lower-alpha", marginLeft: "30px"}}>
                <li>One Everyplay record will be accepted for trusted players that are verified as legitimate</li>
                <li>Everyplay is acceptable as complementary proof to handcam, where the handcam shows the full playing session and showcases the Everyplay from start to end without cuts or losing sight of the device</li>
                <li>A one week grace period shall be granted from this announcement</li>
            </ul></>,
            <>After much deliberation and cooperation with @camila314, <i className='contents'>iCreate records are allowed on the Mobile List</i>, and are subject to the following rules. However, the latest version of iCreate 4.5.2 must be used</>,
            <><i className='contents'>TPS bypass on Megahack Mobile and FPS bypass on iCreate are acceptable, with an upper limit of 180fps</i>. The upper limit will be raised when a record of a native 240Hz phone is added to the list, to a maximum of 240fps. Records using bypass must also state the model of their device, along with their used refresh rate ignoring bypass</>,
            <><i className='contents'>HRR phones bypassed down to 60fps using the above methods</i> are an acceptable alternative to inbuilt fps limiters on your device, and <i className='contents'>are able to add new levels to the Mobile List</i>. However, they must provide the same specifications mentioned in the previous rule</>
        ],
        levelPlacements: [
            <>"Sakupen Hell" was placed at #17, what a conclusion to a legendary level...</>,
            <>"Misfire" was placed at #18, the first Biprex level I genuinely enjoy</>,
            <>"Asmodeus" was placed at #31, I never thought it'd be beaten actually</>,
            <>"IMAPHONE" was placed at #54, Venfy levels hit different</>,
            <>"Molten Mercury" was placed at #76, I definitely thought it would've placed higher for some reason</>
        ],
        placementAdjustments: [
            <>"Dolos" FINALLY got raised after so long (37 {"->"} 30)</>,
            <>"Butiti III" has been slept on tbh (44 {"->"} 38)</>,
            <>"Freedom08" got boosted 10 spots but knocked down 6... (45 {"->"} 41)</>,
            <>"Sigma Interface" was adjusted for inaccurate opinions (48 {"->"} 68)</>,
            <>"Draco Meteor" had its position fine-tuned (67 {"->"} 77)</>,
            <>"Carcano" got punched in the fucking teeth (57 {"->"} 81)</>,
            <>"Night Rider" narrowly avoided falling off, sacrificing Boogie in the process... (95 {"->"} 75)</>
        ],
        knockedOffLevels: [
            <>Artifice (the last old list stronghold), RASH (actually good level), Arctic Arena (wasn't this brought up for raising?), Artificial Ideology and The Hell Factory are gone for good, ending TeamN2's reign on the list. Boogie will join them soon...</>
        ],
        other: [
            <>After 6 long years on the Mobile List, Coffee081 has lost his list points and laid to rest. A salute to a mobile legend :salute: </>,
            <>With the addition of Asmodeus, BiPolarBearr has dethroned Cooper as the second best 60Hz mobile player</>,
            <>After a recent round of record additions, DashY has become the third Overlords player</>,
            <>We will be reviewing list staff applications over the coming days, as well as revamping our current infrastructure. Hopefully this means this update will be the final time we are overdue...</>
        ],
        extra: <div>
            <h1 className='font-extrabold text-base'>
                Word of Thanks
            </h1>
            <div>
            <p>5 months and 3 parts, this update combined has been the largest update the Mobile List has seen in its lifespan. I may have joined the list team only recently, but I'm glad to have played a part in its running for a year now. Given the size of this occasion, I'd like to put a special paragraph to thank list staff and members for their part;</p>
<br></br>
<p>SeaWolfMikes, for keeping records up to date for a large majority of this year.</p>
<br></br>
<p>P8geons, for keeping track of projected placements for months leading up to the update.</p>
<br></br>
<p>BiPolarBearr, for playing most of the new levels and movements to gather a proper placement.</p>
<br></br>
<p>LegendDinamix, for liaising with the Russian community to handle record submissions and gather their opinions.</p>
<br></br>
<p>And mobile players, for continuing to push new limits on what this game considered possible. It's hard to believe even a year past how much has been done, and how much will continue to be done.</p>
<br></br>
<p>The job has been done well, it's time to rest, see y'all for now.</p>
<br></br>
<p>- Cappyt</p>
            </div>
        </div>
    },
    {
        title: "The Overdue Update, Part 2",
        date: "4/17/2023",
        ruleChanges: [],
        levelPlacements: [
            <>"Rage" was placed at #15, so long SuSan in the top 15...</>,
            <>"Singularity" was placed at #34, probably the fastest level addition to date</>
        ],
        extra: <div>
            Thank you to my mother, who said I was addicted to discord when she walked past me working on this update. Now, I think it's time to sleep...
<br></br>
<br></br>
- Cappyt
        </div>,
        other: [
            <>We'll try to update this thing more often, we promise ;-;</>,
            <>We <strong className='contents'>still</strong> need more list staff, please help</>
        ], 
        placementAdjustments: [
            <>"Sigma Interface" got launched to the bloody moon (102 {"->"} 48)</>,
            <>"Shock Therapy" should've been main list if we put it right the first time... (62 {"->"} 52)</>,
            <>"Furious Flames" also got the raise it deserved (45 {"->"} 39)</>,
            <>"Infernal Abyss" got kicked off a cliff by Rusty and Bipolar (20 {"->"} 42)</>,
            <>"Epsilon" was lowered slightly, after GewErbiX was found to be surprisingly stable in position (67 {"->"} 73) </>
        ],
        knockedOffLevels: [
            <>NeRUaL (another whiteem single victor), Tempest Tornado (feels underrated ngl) and Untitled (i wanted to beat it...) have lost their spots, they will be missed</>
        ]
    },
    {
        title: "The Overdue Update, Part 1",
        date: "4/13/2023",
        ruleChanges: [],
        levelPlacements: [
            <>"Cold Sweat" was placed at #2, wish we had more opinions...</>,
            <>"Jesse Pinkman" was placed at #5, another Biprex level nobody will play</>,
            <>"ATOMIC CANNON" was placed at #12, unironically looks pretty cool</>,
            <>"Down Bass" was placed at #27, I swear it could've been lower</>,
            <>"New Record" was placed at #30, I swear it could've been higher</>,
            <>"Bang Gang" was placed at #31, Batle's been popping off lately</>,
            <>"Based Gang" was placed at #34, Batle's really been popping off lately</>,
            <>"Gentlemens Clique" was placed at #43, Batle quadrupled his points wtf</>,
            <>"Shock Therapy" was placed at #62, always knew Ditzy was going to be cracked</>,
            <>"Draco Meteor" was placed at #64, that...does not look very fun</>,
            <>"Faded Dream" was placed at #82, another banger and looking forward to the trilogy </>
        ],
        extra: <div>
          Thank you to the rest of the list staff for their invaluable emotional support, I couldn't have done this update without y'all. Now, if you excuse me, I need to treat myself to some R&R...
<br></br>
<br></br>
- Cappyt
        </div>,
        other: [
            <>Level Adjustments will come later this week, stay tuned...</>,
            <>We need more list staff, please help ;-;</>
        ], 
        placementAdjustments: [        ],
        knockedOffLevels: [
            <>Quaoar (buggy shit), A Bizarre Phantasm (the first teamn2...), ATMarbl (the list is impossible ;-;), Kinetic Bypass (60hz-only victors somehow), Caution (should've been knocked ages ago tbh), Azure Fiesta (did not expect no hrr either wtf), Under Lavaland (thank GOD), Ikaros (actually cool storm addition), Conical Depression (), Sigma Interface (it'll be back...) and Cadrega Mode (THE LIST IS IMPOSSIBLE) have all kicked the bucket, although I suspect that won't be the last we'll see of one of them... </>
        ]
    },
    {
        title: "Doomsday Update",
        date: "10/23/2022",
        ruleChanges: [],
        levelPlacements: [
            <>"Yatagarasu" was placed at #1, above Sonic Wave</>,
            <>"RUST" was placed at #4, above Frozen Cave, and below Sigma</>,
            <>"Digital Descent" was placed at #11, above Sunset Sandstorm, below Plasma Pulse Finale</>,
            <>"The Reaper" was placed at #13, above Artificial Ascent, below Sunset Sandstorm </>,
            <>"Auditory Breaker" was placed at #16, above Infernal Abyss, below Quantum Processing</>,
            <>"Infernal Abyss" was placed at #17, above Bloodbath, below Auditory Breaker</>,
            <>"Missing Benefits" was placed at #32, above Annihilation Nation, below EXPLICIT</>,
            <>"Furious Flames" was placed at #37, above Killbot, below Black Flag</>,
            <>"Polygonal Paradox" was placed at #47, above Black Blizzard, below Audio Expulsion</>,
            <>"Prisma" was placed at #54, above Red World Rebirth, below Silentium Gradas</>,
            <>"Galactic Shift" was placed at #62, above Aftermath, below GewErbiX</>,
            <>"lodin da fish washer" was placed at #65, above Worse Trip, below Lonely Lights</>,
            <>"Apollo 11" was placed at #69, above EnvY, below Ecstasy</>,
            <>"Fabricated Thoughts" was placed at #71, above Prismatic Haze, below EnvY</>,
            <>"OPSM1" was placed at #77, above Betrayal of Fate, below The Hell Zone</>,
            <>"NeRUaL" was placed at #89, above Cadrega Mode, below Tempest Tornado</>,
            <>"Ikaros" was placed at #93, above Under Lavaland, below Conical Depression</>
        ],
        extra: <div>
          would like to thank God, Zoink Doink, Batle, and Cappyt (I am Coopersuper hello), for helping with this list update and making it 10 times better than the last couple updates.
        </div>,
        other: [
            <>Level Adjustments will come later this week, stay tuned...</>,
            <>We need more list staff, please help ;-;</>
        ], 
        placementAdjustments: [
            <>"Endless Dream" got raised above GewErbiX, below The Hell Bird (82 {"->"} 60)</>,
            <>Artifice" got raised above RASH, below Night Rider (90 {"->"} 82)</>,
            <>"Athanatos" was lowered below Celestial Force, above Bausha Vortex (15 {"->"} 20)</>,
            <>"Colorful Corruption" got raised above Silentium Gradas, below Disentombed (58 {"->"} 52)</>,
            <>"xo" got raised above Kowareta, below Aronia (10 {"->"} 8)</>,
            <>"Bausha Vortex" got raised above Anoxysm, below Athanatos (25 {"->"} 21)</>
        ],
        knockedOffLevels: [
            <>Atmosphere - Breakout - The Antimatter - WaveBreaker - moment - Want Me - Freedom19 - Fusion Z - Idols - Glacial Torrent - Inflective - OOPZ - Plasma Pulse III - Digital Disarray - Aurora - Dole Damos - doradura</>
        ]
    },
    {
        title: "The smallest update since the Ice Age",
        date: "8/30/2022",
        ruleChanges: [],
        levelPlacements: [
            <>"Dole Damos" was placed at #99, barely securing it's spot lol (yet another time storm has been added at #99)</>
        ],
        extra: <div>
          This list update was probably the easiest update I've done in 2+ years lmfao - Cooper
        </div>,
        other: [
            <>60hz records are now bolded so that you can easily identify 60hz records in a level dropdown box filled with mixed refresh rates</>
        ], 
        placementAdjustments: [
            <>"Digital Disarray" got raised from being off the list to being at the bottom cuz its like hard or something (~106 {"->"} 97)</>
        ],
        knockedOffLevels: [
            <>Never Beat It - PanaSonic</>
        ]
    }, 
    {
        title: "The new age Mobile List",
        date: "6/24/2022",
        ruleChanges: [],
        levelPlacements: [
            <>"Anoxysm" was placed at #15, i love Bribo</>,
            <>"Carnage Mode" was placed at #16, which took way too long to finally be completed</>,
            <>"Bausha Vortex" was placed at #18, my mind is blown idek how this is possible</>,
            <>"Omicron" was placed at #22, and despite like 200 players trying it yogur7 managed to fluke it somehow</>,
            <>"BuTiTi III" was placed at #27, venfy is so sexy</>,
            <>"Black Flag" was placed at #29, kinda sick level good addition</>,
            <>"Ziroikabi" was placed at #34, zentel finally got his points after 2+ years lmfao</>,
            <>"Carcano" was placed at #37, and i dont know how to feel about this one</>,
            <>"Ecstasy" was placed at #55, pretty unnecessary ngl</>,
            <>"Boogie" was placed at #64, and might change placements because opinions were so extremely varied</>,
            <>"Quaoar" (the one by viprin) was placed at #83, i absolutely adore this level omg</>,
            <>"Never Beat It" was placed at #99, because Storm957 never ceases to place a level at #99 (done before)</>
        ],
        extra: <div>
          This list update was completed entirely by Coopersuper (cooper) (coopersuper8) with about 6 hours of slave work please god give me back my time
        </div>,
        other: [
            <>Cappyt is now a list mod let's gooooo</>
        ], 
        placementAdjustments: [
            <>"Tempest Tornado" got raised due to Hydrus praising it and Hilo slightly agreeing (80 {"->"} 72)</>,
            <>"doradura" was inequivalently tactically nuked lmfao (46 {"->"} 98)</>
        ],
        knockedOffLevels: [
            <>Removed Submission - The Flawless - Armageddon - New Cataclysm (dam bro) - ElectroLux - Digital Disarray - Extinction - Instant Execution - Audio Extraction (dam bro pt.2) - Shatter - Arcane16 - Multition </>
        ]
    },
    {
        title: "I forgot I have to update this, whoops",
        date: "4/6/2022",
        ruleChanges: [],
        levelPlacements: [
            <>Sigma at #2 and Frozen Cave at #3 who would have guessed Biprex beat another hard level... or two</>,
            <>Silentium Gradas at #35 why would anybody want this</>,
            <>doradura was put at #38 even though we know it's not that hard but Gherkin opinion funny</>,
            <>Colorful Corruption at #40 Batle represent let's go</>,
            <>GewErbiX put at #43 the level looks great but like do you really wanna play this</>,
            <>Worse Trip at #46 let's go though massive level by the man</>,
            <>Mystic finally done GG Hilo let's go dude after four years placed that shit at #50 though???? It can't be that easy</>,
            <>Volume at #55 we hate Storm957 (not actually) but please stop adding these levels</>,
            <>Night Rider sick ass level at #56</>,
            <>Untitled got put in at #62 Hilo at it again adding another wave carried level</>,
            <>Tempest Tornado put down at #70 ayo what why is the list so hard now</>,
            <>moment got put down at #78 why do people name their levels in all lowercase fuck you whoever made this (doradura too)</>,
            <>Instant Execution was put at #96 wasn't this shit an insane demon at one point or something</>
        ],
        extra: <div>
          Thank you to Mike (again again), Cooper, and SubZeroV for helping me (Mini) on this update!  Thank you this time for something jesus guys lol
        </div>,
        other: [
            <>We changed the point requirements for each class since it's kinda impossible to get a lot of points now</>,
            <>Level packs are here!!!  That's kinda cool, they don't give points but I thought it would be fun</>,
            <>Not sure if we said this earlier but DreamTide and Thonyell have also made it onto the list team</>
        ], 
        placementAdjustments: [
            <>Freedom08 was moved up after the based god Bejako beat it (33 {"->"} 23)</>,
            <>Belloq went up since Flav kinda destroyed it (34 {"->"} 29)</>,
            <>Audio Expulsion got absolutely fucking nuked after some guys beat it (18 {"->"} 30)</>,
            <>Falcon16 was always underrated glad we finally moved it up (46 {"->"} 32)</>,
            <>People complained about INNARDS last time so there you go we moved it up (44 {"->"} 37)</>,
            <>Betrayal of Fate got pushed down a lot as well (46 {"->"} 54)</>,
            <>Sigma Interface got pushed up so much after somebody else actually got progress so GG to Sword (78 {"->"} 65)</>,
            <>PanaSonic by he who will not be named was raised after people found it to be literally ass what a surprise (94 {"->"} 88)</>
        ],
        knockedOffLevels: [
            <>Karma (nooooo fuck), Alcatraz (yeeeeees), Heartbeat (wait isn't this one impossible), Insaction (forgot this one existed), Myocardia, Niflheim (rip literally everybody's points), Just DANCE (the most overrated level on every other list), Brimtanic Paradise, Concaved Memories, Broken Signal (best level of all time), Novalis (second best level of all time), Triple Six (third best level of all time), Daydream (worst level of all time), and finally Marathon were all knocked off the list.  That's a lot of levels that a lot of people have beaten.  Genuinely feel bad rn I lost like more than half my points (I went from 195 to 90 something)</>
        ]
    },
    {
        title: "I don't have a name for this one",
        date: "12/29/2021",
        ruleChanges: [],
        levelPlacements: [
            <>Dolos was placed at 18, below one of those hell series levels I forget they're all the same dude</>,
            <>EXPLICIT was somehow beaten (actually wtf Flav) and placed at 20, above Annihilation Nation</>,
            <>INNARDS was beaten finally beaten and placed at 37, above Lonely Lights, also placed at 38 after re-verification</>,
            <>Deflective was somehow beaten somehow, placing at 41</>,
            <>Freedom19 was finally placed at 68 (we have no idea if this is a good placement lol)   <small className='contents'>(it's at 67)</small></>,
            <>Broken Signal was beaten three times before being added at 90</>,
            <>Myocardia was placed at 96 even though it'll get pushed off in like two weeks or some shit</>
        ],
        extra: <div>
          Thank you to Mike (again), and literally nobody else for helping me (Mini) on this update!  Every day I inch closer to death
        </div>,
        other: [  ], 
        placementAdjustments: [
            <>Cadrega Mode was finally moved down thank god jesus it's not that hard (43 {"->"} 52)</>,
            <>Azure Fiesta was moved up again I think or maybe it wasn't ever moved up I have dementia idk (59 {"->"} 56)</>,
            <>Fusion Z was moved up a considerable amount (78 {"->"} 69)</>,
            <>Glacial Torrent was sadly moved down so now I feel worse about my skill, putting all four XXL levels in a row (65 {"->"} 70)  (there are more xxl levels than this)  <small className='contents'>(shut up Mike I know it's just those four are close you goblin)</small>  <small className='contents'>(skill issue)</small></>,
            <>Daydream was moved up again after I calculated the opinions wrong but I'm definitely not complaining (94 {"->"} 88)</>
        ],
        knockedOffLevels: [
            <>Fexty (thank god dude) was knocked off, as well as Twisted Tranquility (eh), Maybe Possibly Thing (good one), reverence (wave carried but really good), Omorfia (actually goated level), Fabrication (old) (also a classic that wasn't bad), Skrrah (thank the lord), and The Hell Dignity.  Overall, a lot of good levels got knocked which is unfortunate.</>
        ]
    },
    {
        title: '"my bad" -Biprex',
        date: "12/3/2021",
        ruleChanges: [],
        levelPlacements: [
            <>Sonic Wave, Erebus, and kowareta were all beaten by Biprex and placed into the top five!  Massive GG to this man wtf</>,
            <>Arctic Arena was somehow beaten (placed at #45) but we have no idea if this is accurate granted nobody wants to play it</>,
            <>The Antimatter was finally beaten and placed (at #58)</>,
            <>OOPZ was beaten by two timing level people (placed at #65)</>,
            <>Extinction was sadly beaten and we had to place it (at #76)</>,
            <>Daydream was found to be insanely underrated so now it's back on the list (at #87)</>
        ],
        extra: <div>
          Thank you to Mike, and literally nobody else for helping me (Mini) on this update!  I want to end it all
        </div>,
        other: [        ], 
        placementAdjustments: [
            <>SubSonic was swapped with Blade of Justice and now sits above it (13 and 14)</>,
            <>Annihilation Nation got demolished by list opinions and was moved down (13 {"->"} 19)</>,
            <>Hatred was moved down a little (20 {"->"} 24)</>,
            <>Hateful Reflection was way underrated because Storm was too good so we moved it up (30 {"->"} 18)</>,
            <>Epsilon was swapped with Red World Rebirth and now sits below it (30 and 31)</>,
            <>Endless Dream is literally impossible and got moved up big time (61 {"->"} 44)</>,
            <>Artifice was moved up a few spots (53 {"->"} 48)</>,
            <>Breakout was moved up a good bit (66 {"->"} 57)</>,
            <>SHATTER was moved down soooo much following an update with nerfs and being overrated (55 {"->"} 78)</>
        ],
        knockedOffLevels: [
            <>Penultimate Phase (eh), Cosmorush 21 (will be sorely missed), Allegiance (how is this not top 10), Glide (how is this not top 5), Heat Wave (Lorenzo lean how to make gameplay challenge), Gridlocked (literally I have never heard of this level), Cromulent (Mobile list 1 - 0 Storm957), and Zenith (the level nobody else could beat because it would lag) were all knocked off the list.  Goodbye a batch of mediocre levels (and cr21)</>
        ]
    },
    {
        title: "surrendering to despair",
        date: "9/24/2021",
        ruleChanges: [],
        levelPlacements: [
            <>Aronia was beaten and added at the number one spot!  Massive congratulations to Biprex for the accomplishment!</>,
            <>Plasma Pulse Finale was beaten by... oh yeah (placed at #2)</>,
            <>SPEEDRUN was finally added (we are so sorry Demolishers21) after months and placed at #22, right below Black Blizzard.</>,
            <>Hateful Reflection was added at #26, above Epsilon.</>,
            <>Falcon16 was added at #33, below Betrayal of Fate.</>,
            <>EnvY, the level nobody wanted to have on the list, was placed just below Falcon16 at #34.</>,
            <>Kinetic Bypass was rated recently and beaten, placing at #46 above Artifice.</>,
            <>Azure Fiesta was added right in the middle of the list at #50 with three victors!</>,
            <>Insaction, a contender for the buggiest extreme, was placed at #81, below Niflheim.</>,
            <>Karma, yes the literal layout, was added at #84.  I don't even know what to say</>,
            <>Cromulent was sadly added to the list, but at #99 so we don't have to live with it much longer.  I love Storm, but he needs to stop adding these levels oh my lord</>
        ],
        extra: <div>
          Thank you to Subzero, Mike, and Rusty for helping me (Mini) on this update!
        </div>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [
            <>Evangelion (thank god), HURRICANE (god dammit), Unearthed (literally a medium demon), Deception Dive (good riddance), Our Fountain, Elliptic Curve (I think this one was cool idk), Grill Kill (finally), Galactus, Mandragora, Violently X (the funniest level on the list), and Tech Manifestation (literally worse than contracting AIDS) all fell off the list.  A good amount of these sucked, but we also got levels placed that sucked too so I'm not sure what to think of this.</>
        ]
    },
    {
        title: "it didn't take TOO long, right?",
        date: "7/30/2021",
        ruleChanges: [],
        levelPlacements: [
            <>"Distraught," after many players getting progress on it a while back, was finally beaten and placed above super probably level!  Despite HIlo appearing first, somebody who has requested to not have his levels on the list beat it before him.</>,
            <>"The Hell Bird" was beaten by Mike, fully completing the "entire" Hell series and was placed above Aftermath.</>,
            <>"RASH," a great level by our mobile friend Loltad, was placed above the two TeamN2 levels Artificial Ideology and The Hell Factory.</>,
            <>"Endless Dream" was finally finished and verified by the lad DreamTide, and now sits above Glacial Torrent.</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Want Me" was moved down a considerable amount, now right above Idols (39 {"->"} 49)</>,
            <>"Niflheim" was, since the dawn of mobile players, overrated and has been moved down (67 {"->"} 72)</>,
            <>"reverence," despite being wave carried, was moved down quite a bit too (69 {"->"} 79)</>,
            <>"Heartbeat" was moved up a little bit, now above Alcatraz (73 {"->"} 69)</>,
            <>"Concaved Memories" was moved up a lot, considering it's literally impossible (79 {"->"} 69)</>,
            <>"Deception Dive" was moved down slightly, now just above Unearthed (95 {"->"} 97)</>,
            <>"Violently X," a contender for the funniest level on the list, was moved up above Mandragora (97 {"->"} 91)</>,
            <>In probably the biggest list adjustment yet, "Omorfia" was moved a whole 22 spots up (100 {"->"} 78)</>
        ],
        knockedOffLevels: [
            <>NecropoliX, Daydream, Uprise, and Golden Shade were knocked off.  Three of these four levels kinda sucked so like that's cool or something right?  The levels added were better anyways.</>
        ]
    },
    {
        title: "fuck the mobile list",
        date: "6/24/2021",
        ruleChanges: [],
        levelPlacements: [
            <>"xo" was beaten by pigchefer after an incredible amount of persistence!  It now takes the #1 spot on the list.</>,
            <>"Quantum Processing" was placed at #5 as well, knocking "Bloodbath" out of the top 5.</>,
            <>"Under Lavaland" has been placed at #35, below "Conical Depression"</>,
            <>"Caution" was placed above "Artifice" at #37</>,
            <>"Sigma Interface" was placed above "Idols" at #45</>,
            <>"Inflective" has been placed at #48 above "Plasma Pulse III"</>,
            <>"Removed Submission" (the best level on the list) now takes the #51 spot, above "The Flawless"</>,
            <>"Armageddon" was placed below "The Flawless" and above what it was inspired by, "Cataclysm", at #53</>,
            <>Panasonic" (the worst level on the list) was sadly beaten and placed at #58, above "Audio Extraction"</>,
            <>"Arcane16" is now one of two insane demons on the list, sitting at #60</>,
            <>As well as this, Batle somehow beat "Multition," the other insane demon now on the list, which is now placed at #61, next to the other recent 2-player level addition.  To clarify, you need to beat these levels solo to get your records accepted.</>,
            <>"Brimtanic Paradise" was beaten and added at #67, below "reverence"</>,
            <>"Alcatraz" was beaten on 60hz mobile and is now placed at #69, above "The Hell Dignity"</>,
            <>"Galactus" is now placed at #87, above "Grill Kill" (which I wish got knocked off)</>,
            <>"Our Fountain", though being beaten a while back, was just now placed at #91 above "Violently X", the funniest level on the list.</>,
            <>"Omorfia" was placed at #96, above "Golden Shade"</>,
            <>"Daydream" was placed at #99, above "NecropoliX"</>
        ],
        extra: <div>
        If you want to hear any more comments that I (MiniWheatDuo) have to say about the recent events with the list, refer to this video: 
        <br></br>
        <small>https://media.discordapp.net/attachments/365293479619985418/856923005954949210/The_List_is_Too_Hard.mp4</small>
        </div>,
        other: [
                <>Random Idiot (aonsey), after being with the list since the beginning, has left the team. Go give him a thank you if you can!</>,
                <>There have been a few rule updates that we didn't put in here sorry about that but I forget them now so whoops just read the rules again or something</>,
                <>Each update since the top 100 is now called something so you can see our descent into madness after extending the list</>
        ], 
        placementAdjustments: [
            <>"Blade of Justice" was moved down one spot, now below "Annihilation Nation"</>,
            <>"Subsonic" was moved up a considerable amount, now above "The Hell Inferno"</>,
            <>"Hatred" has been moved up a few spots as well, above "Super Probably Level"</>,
            <>"Black Blizzard" was moved down a bit, now below "Super Probably Level"</>,
            <>"Void Wave" and "Aftermath" have swapped, with "Void Wave" now above</>,
            <>"Evangelion" was swapped with "NecropoliX," now sitting a few spots above it</>
        ],
        knockedOffLevels: [
            <>"AcropoliX," the remake nobody really liked got removed.  "MELTDOWN," a ship carried level got removed.  "Cataclysm (old)" got removed, leaving the list with only one non-rated demon left, "Fabrication (old)".  "ICE Carbon Diablo X" got removed, nobody really liked it but it was a classic.  "Falling Up" got removed, another ship carried level.  "The Ultimate Phase" has been removed, yet again meaning that no level on the original first version of the mobile list is still on it.  "Ultrasans" was removed.  "Esencia" was removed, so mobile players won't be able to farm it for points anymore.  "8o X" got removed, good riddance.  "night party" got removed.  "Mirage," a level that nobody remembered, is gone.  "Doop," another forgettable but stupid level has been removed as well.  "Artificial Dream," the level with the most records on the list, has been removed, leaving the most records on "Niflheim" with 40 something.  "The Lost Existence," a really long one, got removed.  "Frightful Melody" was knocked off.  "Fingerdash v3," a literal insane demon that should never have been on the list because it took me less than a day to beat (cough cough cobra and nintenfox opinions) was thankfully moved off.  And finally, ending with a good note, "Raindance" was knocked off the list as well.  I don't think anybody cared about this one.</>
        ]
    },
    {
        title: "list ruined",
        date: "4/5/2021",
        ruleChanges: [],
        levelPlacements: [
            <>"Blade of Justice" was added at #6, above "Annihilation Nation"</>,
            <>"The Hell Inferno" was added at #8, above "Audio Expulsion"</>,
            <>"Killbot" was added at #12, above "Super Probably Level"</>,
            <>"Phobos" was added at #14, above "SubSonic"</>,
            <>"Freedom08" was added at #16, above "Disentombed"</>,
            <>"Artificial Ideology" was added at #30, above "The Hell Factory"</>,
            <>"SHATTER" was added at #36, above "A Bizarre Phantasm"</>,
            <>"GridLocked" was added at #70, above "Zenith"</>,
            <>"Golden Shade" was added at #81, above "Uprise"</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"FinKor", "Corrosion", "Napalm", "Misty Mountains", "Penombre", "Faith", "Diligence", "Gammaray", and "CholeriX" were knocked off the list.</>
        ]
    },
    {
        title: "swap update",
        date: "2/28/2021",
        ruleChanges: [],
        levelPlacements: [
            
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>"Sunset Sandstorm" was swapped with "Artificial Ascent", bringing it back to the #1 spot!</>,
            <>"Audio Extraction" was swapped with "Digital Disarray", with DiDi now above at #42</>,
            <>"ICE Carbon Diablo X" was swapped with "Cataclysm (old)", with ICDX now above at #88</>
        ],
        knockedOffLevels: []
    },
    {
        title: "the longest wait for an update",
        date: "2/20/2021",
        ruleChanges: [],
        levelPlacements: [
            <>"Hatred" was added at #14, above "Epsilon"</>,
            <>"Fusion Z" was added at #40, above "ElectroLux"</>,
            <>"Just DANCE" was added at #49, above "The Hell Dignity"</>,
            <>"Fexty" was added at #57, above "Penultimate Phase"</>,
            <>"Evangelion" was added at #74, above "Raindance"</>,
            <>"Doop" was added at #80, above "Mirage"</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"AAAAAAAAAAAAAAAAAAAA", "SUBVERSIVE", "Virtual Collapse", "Thunder Alphabet", "Polish Alphabet" and "CYCLONE" were knocked off the list.</>
        ]
    },
    {
        title: "pooper ascent update",
        date: "12/31/2020",
        ruleChanges: [],
        levelPlacements: [
           <>"Artificial Ascent" was added at the #1 spot!  GG Cooper!</>,
           <>"Audio Expulsion" was placed at #7, above "Black Blizzard"</>,
           <>"Want Me" was placed at #26, above "Artifice"</>,
           <>"Frightful Melody" was placed at #72, above "The Lost Existence"</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>Having been deemed overrated, "Arcadelocked" dropped off the list, falling from #85</>
        ],
        knockedOffLevels: [
            <>"Sky Tech", "Frizzantino Vibes" and "Incipient" were also knocked off the list.</>
        ]
    },
    {
        title: "THE update",
        date: "12/25/2020",
        ruleChanges: [],
        levelPlacements: [ ],
        extra: <></>,
        other: [
            <>After a long wait, the list was extended to a top 100!  Thank you all of our users who refer to the mobile list for various things.  We'll continue to try and improve and we thank all of you for sticking with us!</>,
            <>Merry Christmas!</>
        ], 
        placementAdjustments: [],
        knockedOffLevels: []
    },
    {
        title: "",
        date: "12/14/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Athanatos" was added at #2, below "Sunset Sandstorm"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [
            <>"Penultimate Phase" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "12/8/2020",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Reverence" was swapped places with "Novalis", with Novalis above at the #41 spot</>
        ],
        knockedOffLevels: []
    },
    {
        title: "",
        date: "11/28/2020",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Glacial Torrent" was moved down to the #28 spot, above "Idols"</>
        ],
        knockedOffLevels: []
    },
    {
        title: "",
        date: "11/27/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Glacial Torrent" was finally rated and added at #25, below "ATMarbl"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [
            <>"Cosmorush 21" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "11/10/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"The Hell Field" was added at #6, below "Black Blizzard"</>,
            <>"Reverence" was added at #40, above "Novalis"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Cataclysm" was moved down to the #33 spot, below "The Flawless"</>,
            <>"The Hell Dignity" was moved down to the #42 spot, below "Novalis"</>
        ],
        knockedOffLevels: [
            <>"Glide" and "Allegiance" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "9/24/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"SubSonic" was added at #7, below "Super Probably Level"</>,
            <>"Prismatic Haze" was added at #16, below "Cadrega Mode"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Aftermath" was moved down to the #12 spot, below "Red World Rebirth"</>,
            <>"Betrayal of Fate" was moved up to the #14 spot, above "Cadrega Mode"</>
        ],
        knockedOffLevels: [
            <>"Zenith" and "Heat Wave" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "8/26/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Sunset Sandstorm" was added at #1, making a new #1!</>,
            <>"Disentombed" was added at #7, below "Super Probably Level"</>,
            <>"The Hell Origin" was added #16, above "The Hell Zone"</>,
            <>"The Hell Factory" was added at #18, above "Conical Depression"</>,
            <>"Mandragora" was added above "Grill Kill" but then removed because the other levels got added lol rip</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [ ],
        knockedOffLevels: [
            <>"Elliptic Curve", "Deception Dive", "Grill Kill", "Mandragora", and "Tech Manifestation" were all knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "7/7/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Breakout" was added at #23, above "Plasma Pulse III"</>,
            <>"Maybe Possibly Thing" was added at #39, above "Twisted Tranquility"</>,
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"ElectroLux" was moved to the #28 spot, above "Audio Extraction"</>
        ],
        knockedOffLevels: [
            <>"Unearthed" and "Violently X" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "6/17/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Penultimate Phase" was added at #39, above "Cosmorush 21"</>,
            <>"Zenith" was added at #44, below "Heat Wave"</>,
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [
            <>"Uprise" and "HURRICANE" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "6/16/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Black Blizzard" was added at #4, above "Super Probably Level"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Marathon" was moved to the #30 spot, above "Niflheim"</>
        ],
        knockedOffLevels: [
            <>"Raindance" was knocked off of the list.</>
        ]
    },
    {
        title: "",
        date: "6/12/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Red World Rebirth" was added at #8, below "Epsilon"</>,
            <>"Void Wave" was added at #9, below "Red World Rebirth"</>,
            <>"The Hell World" was added at #12, above "The Hell Zone"</>,
            <>"ElectroLux" was added at #18, above "Cataclysm"</>,
            <>"Triple Six" was added at #30, above "Novalis"</>,
            <>"Heartbeat" was added at #35, below "Old Fabrication"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Super Probably Level" was moved to the #4 spot, above "Aftermath"</>,
            <>"The Hell Zone" was moved to #13, above "Conical Depression"</>,
            <>"Unearthed" was moved to #47, below "Violently X"</>,
            <>"Concaved Memories" was moved to #36, below "Heartbeat"</>,
            <>"Artificial Dream" was removed because of being overrated</>,
            <>"Heat Wave" was moved to #41, above "Tech Manifestation"</>,
            <>"The Flawless" was moved to #25, above "The Hell Dignity"</>,
            <>"Epsilon" was moved to #7, above "Void Wave"</>,
            <>"Idols" was moved to #22, above "Plasma Pulse III"</>,
        ],
        knockedOffLevels: [
            <>"Night Party", "Esencia", "Ultrasans", "The Ultimate Phase", and "Falling Up" were all knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "5/15/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Grill Kill" was added at #37, above "Deception Dive"</>,
            <>"HURRICANE" was added at #43, above "Uprise"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"WaveBreaker" was moved to the #17 spot, above "Plasma Pulse III"</>
        ],
        knockedOffLevels: [
            <>"Old Cataclysm" and "ICE Carbon Diablo X" were knocked off the list. They will be missed :(</>
        ]
    },
    {
        title: "",
        date: "4/3/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Betrayal of Fate" was added at #9, above "Conical Depression"</>,
            <>"Artifice" was added at #11, above "The Hell Zone"</>,
            <>"The Flawless" was added at #21, above "Audio Extraction"</>,
            <>"WaveBreaker" was added at #23, above "Digital Disarray"</>,
            <>"Violently X" was added at #40, above "Artificial Dream"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Novalis" was moved to the #26 spot, below "Niflheim"</>,
            <>"Unearthed was moved to the #27 spot, below "Novalis"</>,
            <>"Atmosphere" was moved to the #16 spot, above "Plasma Pulse III"</>
        ],
        knockedOffLevels: [
            <>"AcropoliX", "CholeriX", "Gammaray", "AAAAAAAAAAAAAAAAAAAA", and "CYCLONE" have all been knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "3/1/2020",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Heat Wave" was moved from #45 to #35 above "Artificial Dream"</>
        ],
        knockedOffLevels: [ ]
    },
    {
        title: "",
        date: "2/26/2020",
        ruleChanges: [],
        levelPlacements: [
            <>"Conical Depression" was added at #9.</>,
            <>"The Hell Zone" was added at #10, above "ATMarbl".</>,
            <>"Skrrah" was added at #23, above "Marathon".</>,
            <>"Elliptic Curve" was added at #34, above "Artificial Dream".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Glide" was moved from the #38 spot to #30, below "Allegiance".</>,
            <>"Niflheim" and "Novalis" switched places, with "Niflheim" now above at #22.</>,
            <>"Triple Six" was removed from the list due to being originally beaten on 90hz.</>
        ],
        knockedOffLevels: [ 
            <>"Frizzantino Vibes", "Incipient", and "SUBVERSIVE" have all been knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "12/08/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Digital Disarray" was added at #18 above "Novalis".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Triple Six" was moved to #20 below "Novalis" (Previously above it).</>
        ],
        knockedOffLevels: [ 
            <>"Sky Tech" and "Awakening Horus" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "11/30/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Belloq" was added at #5 above "Cadrega Mode".</>,
            <>"Triple Six" was added at #18 above "Novalis".</>,
            <>"Glide" was added at #36 above "Cataclysm" (old).</>,
            <>"AcropoliX" was added at #40 above "CholeriX".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [ 
            <>"Final Epilogue", "Underground", "Penombre", and "Retention" were all knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "10/30/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Frizzantino Vibes" was added at #43 above "Awakening Horus"</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [ 
            <>"Polish Alphabet" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "10/17/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Epsilon" was added at #6 above "ATMarbl".</>,
            <>"Marathon" was added at #18 above "Niflheim".</>,
            <>"Concaved Memories" was added at #24 above "Tech Manifestation".</>,
            <>"Tech Manifestation" was added at #25 above "Deception Dive".</>,
            <>"Polish Alphabet" was added at #50 above "Zettabyte".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [ 
            <>"Torrential Storm", "Superstrike", "Cosmic Calamity", "Excessive Compliment", and "Zettabyte" were all knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "9/14/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Aftermath" was added at #3 above "Super Probably Level".</>,
            <>"Idols" was added at #13 above "Audio Extraction".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Esencia" was moved down below "Night Party".</>
        ],
        knockedOffLevels: [ 
            <>"Electrosonic" and "Hypersonic" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "8/30/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"A Bizarre Phantasm" was completed and added at the #6 spot, below "ATMarbl".</>,
            <>"Raindance" was beaten and added at the #24 spot, above "Night Party".</>,
            <> "Zettabyte" was beaten and added at the #44 spot.</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [ ]
    },
    {
        title: "",
        date: "8/8/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Unearthed" was beaten and added at the #13 spot, above "Novalis".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [
            <>As a result, "Galaxy Breaker" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "8/7/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Bloodbath" was beaten and added at the #1 spot on the list, dethroning "Celestial Force".</>,
            <>"Ultrasans" was added at #23, below "Night Party".</>,
            <>"Penombre" was completed and added at #38, above "Underground".</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"CYCLONE" was moved down below "AAAAAAAAAAAAAAAAAAAA".</>
        ],
        knockedOffLevels: [ ]
    },
    {
        title: "",
        date: "7/13/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"CYCLONE" was completed and added at the #24 spot, above "ICE Carbon Diablo X".</>,
            <>"Gammaray" was rated and beaten, which got the level added at #28, above "AAAAAAAAAAAAAAAAAAAA".</>,
            <>"Superstrike" was added at #40, above "Torrential Storm" (new).</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [],
        knockedOffLevels: [ ]
    },
    {
        title: "",
        date: "7/1/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"MELTDOWN" was beaten and added to the list at #41, above "Torrential Storm (old)".</>
        ],
        extra: <></>,
        other: [
            <>Zetzal and Gochujang were removed from the list editors list because they quit.  Good luck to them for whatever they're doing in the future!</>,
            <>The points you get for beating a level were added next to its title.  Hopefully this clears up confusion on how the points are managed.</>
        ], 
        placementAdjustments: [
            <>"Achondrite" was moved to the #43 spot, above "Galaxy Breaker".</>
        ],
        knockedOffLevels: [ ]
    },
    {
        title: "",
        date: "6/26/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Cadrega Mode" was beaten and added to the list at #3. This is also the first TCTeam level beaten on mobile.</>,
            <>"Astronomical Alchemy" was added at the #43 spot after a long time of consideration.</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"ICE Carbon Diablo X" was moved up above "Heat Wave" and Below "Cataclysm (old)". </>,
            <>"Artificial Dream" was moved down 2 spaces to #19.</>,
            <>"Intricate" got switched with "Pursuit", and "Pursuit" is now at #44.</>
        ],
        knockedOffLevels: [ 
            <>These changes knocked both "Intricate" and "Photovoltaic" off the list.</>
        ]
    },
    {
        title: "",
        date: "5/25/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"ATMarbl" was finally beaten and added to the list at #3!</>,
            <>"Esencia" was completed and added at the #10 spot!</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>These changes knocked both "Duelo Maestro (solo)" and "Cyber Chaos" off the list.</>
        ]
    },
    {
        title: "",
        date: "5/19/2019",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
            <>"Galaxy Breaker" was moved from the #45 spot to the #39 spot after some reconsideration.</>
        ],
        knockedOffLevels: [ 
        ]
    },
    {
        title: "",
        date: "5/19/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"The Hell Dignity" was beaten (the first hell series level beaten on mobile) and was added at #7.</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This change ended up knocking "Theory of Alchemy" off the list.</>
        ]
    },
    {
        title: "",
        date: "5/5/2019",
        ruleChanges: [],
        levelPlacements: [
            <>The new version of "Cataclysm" was finally beaten and added to the list at #3!</>,
            <> "Achondrite" was also added to the list at #39.</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>These changes knocked both "Creeper Force" and "The JanuS Miracle" off the list.</>
        ]
    },
    {
        title: "",
        date: "3/12/2019",
        ruleChanges: [],
        levelPlacements: [
            <>The new version of "Cataclysm" was finally beaten and added to the list at #3!</>,
            <>"Achondrite" was also added to the list at #39.</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>These changes knocked both "Creeper Force" and "The JanuS Miracle" off the list.</>
        ]
    },
    {
        title: "",
        date: "2/12/2019",
        ruleChanges: [],
        levelPlacements: [
            <>"Super Probably Level" has been placed at #2</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Quest For Perfection" off the list.</>
        ]
    },
    {
        title: "",
        date: "1/28/2019",
        ruleChanges: [],
        levelPlacements: [
            <>After a long time, "AAAAAAAAAAAAAAAAAAAA" was added above "Incipient" at #20</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Catastrophic" off.</>
        ]
    },
    {
        title: "",
        date: "12/22/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Sky Tech" and "Electrosonic" have been placed at #25 and #31</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "X Adventure" and "NecroDynamix" off the list.</>
        ]
    },
    {
        title: "",
        date: "12/9/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Atmosphere" and "Magnetum" have been placed at #4 and #48 respectively</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "TG" and "Future Circles" off the list.</>
        ]
    },
    {
        title: "",
        date: "12/2/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"CholeriX" has been placed at #18</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Temple of Destiny" off the list.</>
        ]
    },
    {
        title: "",
        date: "11/24/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Uprise" (by Blad3M and Menkatjezzz) has been placed at #13</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Fexty" (Nerfed) off the list.</>
        ]
    },
    {
        title: "",
        date: "11/21/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Heat Wave" has been placed at #16</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Kurumi City" off the list.</>
        ]
    },
    {
        title: "",
        date: "11/5/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Celestial Force" has been placed at #1</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Hi" off the list.</>
        ]
    },
    {
        title: "",
        date: "10/26/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Intricate" took its place right above "Spectral Tentation" at #27</>,
            <>"X Adventure" was added back to the list at #44</>
        ],
        extra: <></>,
        other: [
            <>Nelluque left the list staff.  Good luck to him in the future!</>
        ], 
        placementAdjustments: [
            <>"Retention" was moved up above "Underground," just 3 places.</>
        ],
        knockedOffLevels: [ 
            <>This knocks "Rewind" & "Planet Circles" (xSolar) off the list.</>
        ]
    },
    {
        title: "",
        date: "9/26/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"prismatic" was rated and placed at #30, below "Es Dilar Nos"</>
        ],
        extra: <></>,
        other: [ ], 
        placementAdjustments: [ ],
        knockedOffLevels: [ 
            <>This knocks "X Adventure" off the list.</>
        ]
    },
    {
        title: "",
        date: "9/23/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"TG" was placed above "Temple of Destiny"</>
        ],
        extra: <></>,
        other: [ ], 
        placementAdjustments: [
            <>"Torrential Storm" (old) was moved way down, from #18 to #26.</>
        ],
        knockedOffLevels: [ 
            <>This knocks "Down Bass" (old) off the list.</>
        ]
    },
    {
        title: "",
        date: "9/23/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Awakening Horus" has been placed at #19</>
        ],
        extra: <></>,
        other: [
            <>Coffee081 was added as a list mod!</>
        ], 
        placementAdjustments: [],
        knockedOffLevels: [ 
            <>This knocks Flat Major (old) off the list.  Nobody liked that one anyways.</>
        ]
    },
    {
        title: "",
        date: "9/23/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Galaxy Breaker" has been placed at #29, above "Matilda the Machine."</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Asymmetry" off the list.</>
        ]
    },
    {
        title: "",
        date: "8/13/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Fabrication" (old) has been placed at #6</>
        ],
        extra: <></>,
        other: [], 
        placementAdjustments: [
        ],
        knockedOffLevels: [ 
            <>This knocks "Ultraviolet" off the list.</>
        ]
    },
    {
        title: "",
        date: "8/2/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Night Party" has been added to the list one below "Deception Dive" at #11.</>,
            <>"NecroDynamix" was also added at #38 one above "Future Circles."</>
        ],
        extra: <></>,
        other: [
            <>Stilluetto changed to 120hz, and is no longer deciding the difficulties of the levels for this list.  Good luck to him in the future!</>,
            <>vbnfgh 231's name was changed to "venfy" on the list</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"Light Years" and "Elements X" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "7/15/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>"Torrential Storm" (old) was moved down to 16th place, below "SUBVERSIVE."</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "7/13/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Photovoltaic" was added at number 28 between "Matilda the Machine" and "Pursuit"</>,
            <>"Es Dilar Nos" was added at number 26 below "Crimson Clutter"</>,
            <>"Final Epilogue" got a place at number 19 above "Excessive Compliment"</>,
            <>The old version of "Torrential Storm" was placed at number 12 above "cataclysm" (old)</>
        ],
        extra: <></>,
        other: [
            <>Changes were made to fix some bugs in the top players page.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"Plasma Pulse II", "Entwined Room" (old), "9Theory", and "Galatic Fragility" were knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "7/9/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Aurora" was added at #2, below "Plasma Pulse III".</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"Landect" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "7/5/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>The about page was bugged, so we fixed it.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"Landect" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "7/2/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Retina sadly quit GD, as well as stopped being a list mod.  Best wishes to him in the future!</>
        ], 
        placementAdjustments: [
            <>"Retention" was swapped with "Excessive Compliment."</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "6/10/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Underground" was added between "Falling Up" and "Retention" as the new #16 demon.</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>"Plasma Pulse III" was switched with "Audio Extraction," taking the new #1 spot.</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "5/19/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Cosmic Calamity" was put onto the list at number 11, between "Cataclysm" (old) and "The Ultimate Phase."</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"Night Terrors" was knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "5/1/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>"Incipient" was moved all the way from 6th, below "Twisted Tranquility," down to 12th, below "Cataclysm (old)."</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "4/15/2018",
        ruleChanges: [],
        levelPlacements: [
            <>MiniWheatDuo beat "Rewind"</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>This knocks "Ultrasonic" off the list.</>
        ]
    },
    {
        title: "",
        date: "4/14/2018",
        ruleChanges: [],
        levelPlacements: [
            <>vbnfgh 231 beat "Matilda the Machine," placing at #21</>
        ],
        extra: <></>,
        other: [
            <>Nelluque came back to the team, Zoff and Hilo also joined.  HugeDoge left.</>,
            <>Stilluetto finally dethroned Pacosky18 as the mobile player with the most list points.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>This knocks "Lunatic Doom Machine" off the list.</>
        ]
    },
    {
        title: "",
        date: "4/7/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Even though Mini owns the list, he was too bad to beat anything remotely impressive.  Lo and behold, he beat "Incipient" out of nowhere, and it was placed below "Twisted Tranquility."  GG to him!</>
        ],
        extra: <></>,
        other: [
            <>Stilluetto, Nelluque, and Gizbro all left the staff team.</>
        ], 
        placementAdjustments: [
            <>"Niflheim" and "Twisted Tranquility" got switched due to lots thinking that the former was harder.</>,
            <>Gizbro said that he underrated "Artificial Dream," so we moved it above "Allegiance."</>
        ],
        knockedOffLevels: [
            <>This knocked "Ruined Journey" off the list</>
        ]
    },
    {
        title: "",
        date: "3/23/2018",
        ruleChanges: [],
        levelPlacements: [
            <>"Cosmorush 21" was added at #6.</>
        ],
        extra: <></>,
        other: [
            <>Skiller04 wasn't on the list for some reason so we added him on.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "3/21/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Gizbro beat "Artificial Dream" placing #11.</>,
            <>Stilluetto finally beat "Falling Up" placing #13</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "3/8/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Small changes to the "about" page, pacosky sadly left the team.</>,
            <>New rule added, no methods of forcefully slowing down your device (i.e. force smooth fix) will be allowed.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "3/7/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Audio Extraction was added at #1.</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "2/25/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Plasma Pulse III was added at #1.</>,
            <>Deception Dive was added at #6</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "2/8/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>Novalis was moved to #1.</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "2/2/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Stilluetto beat "Allegiance" taking the #4 spot.</>
        ],
        extra: <></>,
        other: [
            <>Points have been corrected from last update.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "2/1/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Hilo beat "Spectral Tentation," and we put it at #10.</>,
            <>We added "Love Baba" by Zobros at #45.</>,
            <>"Ice Cream" was finally added at #48.</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>We overrated it, then underrated it, and now we moved "Temple of Destiny" to #21.</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "1/30/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Quick update, fixed the submission form questions again for foreign people to understand better.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "1/23/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Hilo beat "Novalis!"  Even though this is harder than TT on the official list, we thought #2 would suit it better.</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>Old Hell Factory was removed.</>
        ]
    },
    {
        title: "",
        date: "1/12/2018",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Redid the update log, replaced update names with just dates.  We would eventually run out of numbers.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "1/6/2018",
        ruleChanges: [],
        levelPlacements: [
            <>Skiller04 beat Theory of Alchemy, placing 15th.</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>Temple of Destiny was moved down to place 32, right below Galatic Fragility.</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "12/27/2017",
        ruleChanges: [],
        levelPlacements: [
            <>Stilluetto beat "Twisted Tranquility", taking the #1 spot.</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
            <>"Necropolis" was moved below "Ruined Journey" and "Chaotic Machine"</>
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "12/15/2017",
        ruleChanges: [],
        levelPlacements: [
            <>"Niflheim" by Vismuth was beaten by MaChine17, a new hardest demon for mobile players after nearly 2 years!</>,
            <>GDNick2 beat "Hyperio Technia", placing 46th.</>
        ],
        extra: <></>,
        other: [
            <>From 12/15/2017 onward, only levels that have been rated at one point or another are allowed to make it to the list. All levels on the list before this change that have never been rated will stay. </>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "12/08/2017",
        ruleChanges: [],
        levelPlacements: [
            <>Gizbro beat "Temple of Destiny" and "Fearless", taking the number #10 and #46 spots respectively</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>This knocked "Pyromaniac" and "Sparklic Ocean" off the list and making Random Idiot do extra work.</>
        ]
    },
    {
        title: "",
        date: "11/24/2017",
        ruleChanges: [],
        levelPlacements: [
            <>Gizbro beat "Subversive" and it now takes the number #3 spot</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>This knocked "Endorphin" off the list.</>
        ]
    },
    {
        title: "",
        date: "11/9/2017",
        ruleChanges: [],
        levelPlacements: [
            <>Gizbro beat "Right In," and we put it in at the #42 spot</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"Future Demoness" fell off.</>
        ]
    },
    {
        title: "",
        date: "11/3/2017",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Some typos in the "Top Players" page were fixed.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "10/29/2017",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Made some changes to the update log page.</>,
            <>Made really really really minor changes to the form questions.</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    },
    {
        title: "",
        date: "10/29/2017",
        ruleChanges: [],
        levelPlacements: [
            <>"Demonic Bass" has been placed at #39</>
        ],
        extra: <></>,
        other: [
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
            <>"8o" has been knocked off the list.</>
        ]
    },
    {
        title: "",
        date: "10/27/2017",
        ruleChanges: [],
        levelPlacements: [
        ],
        extra: <></>,
        other: [
            <>Points system finished, new classes and new rules.  Sorry for the wait.</>,
        ], 
        placementAdjustments: [
            <>"Excessive Compliment" moved in.</>
        ],
        knockedOffLevels: [
            <>Knocked "Alphabet X" off the list</>
        ]
    },
    {
        title: "",
        date: "10/19/2017",
        ruleChanges: [],
        levelPlacements: [
            <>Added "Old Hell Factory" and "Flat Major" into the top 30.</>
        ],
        extra: <></>,
        other: [
            <>Added update log.</>,
            <>Expanded demon list from 30 to 50 demons.</>,
            <>Changed the rules for qualifying levels slightly.</>,
            <>New points system coming soon!</>
        ], 
        placementAdjustments: [
        ],
        knockedOffLevels: [
        ]
    }
]

const Changelog: React.FC = () => {
useEffect(() => {
  document.body.style.overflow = "visible"
}, [])
  return (
    <div className="rounded-box max-w-5xl border-4 bg-[#f2fff7] p-8 sm:m-12 sm:mx-auto">
        <div className={`rounded-box flex w-4/5 flex-col overflow-y-auto bg-white p-4 py-12 shadow-inner`}  style={{width: "-webkit-fill-available"}}>
            <h1 className="text-center font-extrabold text-5xl">Changelog</h1>
        </div>
            <br></br>
      {changelog.map(e => <><ChangelogBox
        title={e.title}
        date={e.date}
        ruleChanges={e.ruleChanges}
        levelPlacements={e.levelPlacements}
        placementAdjustments={e.placementAdjustments}
        knockedOffLevels={e.knockedOffLevels}
        other={e.other}
        extra={e.extra}
      /><br></br></>)}
    </div>
  )
}

export default Changelog