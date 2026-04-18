import { useState, useRef, useEffect } from "react";

// hint1Movie/hint2Movie = index (0-4) of which movie in the array that hint refers to
const ACTORS = [
  { actor: "Tom Hanks", movies: ["Forrest Gump", "Cast Away", "Saving Private Ryan", "The Green Mile", "Philadelphia"], hint1: "One film involves a man stranded alone on a deserted island for years.", hint1Movie: 1, hint2: "Another is set during the D-Day invasion of World War II.", hint2Movie: 2 , filmography: ["Forrest Gump", "Cast Away", "Saving Private Ryan", "The Green Mile", "Philadelphia", "Big", "A League of Their Own", "Sleepless in Seattle", "You've Got Mail", "Apollo 13", "The Da Vinci Code", "Captain Phillips", "Bridge of Spies", "Sully", "A Beautiful Day in the Neighborhood", "Road to Perdition", "Charlie Wilson's War", "Pinocchio"] },
  { actor: "Meryl Streep", movies: ["The Devil Wears Prada", "Kramer vs. Kramer", "Sophie's Choice", "The Iron Lady", "Mamma Mia!"], hint1: "One film is set in the fashion industry with a famously cold boss.", hint1Movie: 0, hint2: "Another is a musical featuring ABBA songs.", hint2Movie: 4 , filmography: ["The Devil Wears Prada", "Kramer vs. Kramer", "Sophie's Choice", "The Iron Lady", "Mamma Mia!", "Out of Africa", "Silkwood", "Adaptation", "The French Lieutenant's Woman", "Doubt", "Julie & Julia", "Florence Foster Jenkins", "The Post", "Heartburn", "Ironweed", "One True Thing", "Falling in Love", "A Cry in the Dark"] },
  { actor: "Leonardo DiCaprio", movies: ["Titanic", "Inception", "The Wolf of Wall Street", "The Revenant", "Catch Me If You Can"], hint1: "One film features a famous sinking ocean liner.", hint1Movie: 0, hint2: "Another involves layered dreams within dreams.", hint2Movie: 1 , filmography: ["Titanic", "Inception", "The Wolf of Wall Street", "The Revenant", "Catch Me If You Can", "Gangs of New York", "The Aviator", "Blood Diamond", "The Departed", "Shutter Island", "Django Unchained", "Once Upon a Time in Hollywood", "Don't Look Up", "The Man in the Iron Mask", "Romeo + Juliet", "What's Eating Gilbert Grape", "J. Edgar", "The Quick and the Dead"] },
  { actor: "Cate Blanchett", movies: ["Blue Jasmine", "The Aviator", "Carol", "Elizabeth", "Tar"], hint1: "One film is a Woody Allen drama about a woman unraveling after financial ruin.", hint1Movie: 0, hint2: "Another has her playing a world-famous orchestral conductor.", hint2Movie: 4 , filmography: ["Blue Jasmine", "The Aviator", "Carol", "Elizabeth", "Tar", "Notes on a Scandal", "I'm Not There", "The Talented Mr. Ripley", "Babel", "Ocean's Eight", "Thor: Ragnarok", "Lord of the Rings: The Fellowship of the Ring", "Elizabeth: The Golden Age", "The Curious Case of Benjamin Button", "Cinderella", "Truth", "Nightmare Alley", "Don't Look Up"] },
  { actor: "Denzel Washington", movies: ["Training Day", "Glory", "Malcolm X", "Man on Fire", "The Hurricane"], hint1: "One film earned him an Oscar for playing a corrupt detective.", hint1Movie: 0, hint2: "Another is about a Black regiment in the Civil War.", hint2Movie: 1 , filmography: ["Training Day", "Glory", "Malcolm X", "Man on Fire", "The Hurricane", "Philadelphia", "Remember the Titans", "The Bone Collector", "Crimson Tide", "Inside Man", "American Gangster", "Flight", "Fences", "The Equalizer", "John Q", "Antwone Fisher", "The Manchurian Candidate", "Courage Under Fire"] },
  { actor: "Scarlett Johansson", movies: ["Lost in Translation", "Marriage Story", "Jojo Rabbit", "Her", "The Avengers"], hint1: "One film is set in Tokyo and stars Bill Murray.", hint1Movie: 0, hint2: "Another is a WWII-era satire told through a boy's eyes.", hint2Movie: 2 , filmography: ["Lost in Translation", "Marriage Story", "Jojo Rabbit", "Her", "The Avengers", "Lucy", "Ghost in the Shell", "Under the Skin", "Girl with a Pearl Earring", "The Other Boleyn Girl", "Black Widow", "In Good Company", "Vicky Cristina Barcelona", "Don Jon", "The Prestige", "Iron Man 2", "A Good Woman", "North Star"] },
  { actor: "Brad Pitt", movies: ["Fight Club", "Se7en", "Inglourious Basterds", "Once Upon a Time in Hollywood", "Troy"], hint1: "One film has a famous and shocking twist involving a box.", hint1Movie: 1, hint2: "Another is a Tarantino film set during WWII.", hint2Movie: 2 , filmography: ["Fight Club", "Se7en", "Inglourious Basterds", "Once Upon a Time in Hollywood", "Troy", "Ocean's Eleven", "Mr. & Mrs. Smith", "Moneyball", "Fury", "The Big Short", "Babel", "Snatch", "12 Years a Slave", "Burn After Reading", "Sleepers", "Interview with the Vampire", "Legends of the Fall", "True Romance"] },
  { actor: "Natalie Portman", movies: ["Black Swan", "Leon: The Professional", "V for Vendetta", "Jackie", "Closer"], hint1: "One film follows a ballerina's psychological descent.", hint1Movie: 0, hint2: "Another portrays Jackie Kennedy in the aftermath of an assassination.", hint2Movie: 3 , filmography: ["Black Swan", "Leon: The Professional", "V for Vendetta", "Jackie", "Closer", "Thor", "Star Wars: Episode I", "Garden State", "Brothers", "Annihilation", "Heat", "Knight of Cups", "My Blueberry Nights", "Where the Heart Is", "The Other Woman", "Planetarium", "Lucy in the Sky", "Vox Lux"] },
  { actor: "Morgan Freeman", movies: ["The Shawshank Redemption", "Se7en", "Driving Miss Daisy", "Million Dollar Baby", "Bruce Almighty"], hint1: "One film is set in a prison and is one of the most beloved movies ever made.", hint1Movie: 0, hint2: "Another features him playing God.", hint2Movie: 4 , filmography: ["The Shawshank Redemption", "Se7en", "Driving Miss Daisy", "Million Dollar Baby", "Bruce Almighty", "Glory", "Robin Hood: Prince of Thieves", "The Dark Knight", "Gone Baby Gone", "Invictus", "The Bucket List", "Lean on Me", "Unforgiven", "Kiss the Girls", "Along Came a Spider", "Evan Almighty", "Now You See Me", "Lucy"] },
  { actor: "Viola Davis", movies: ["Fences", "The Help", "Ma Rainey's Black Bottom", "Doubt", "Widows"], hint1: "One film is based on an August Wilson play about a garbage man.", hint1Movie: 0, hint2: "Another is set in 1920s Chicago centered on a blues singer.", hint2Movie: 2 , filmography: ["Fences", "The Help", "Ma Rainey's Black Bottom", "Doubt", "Widows", "Suicide Squad", "The Dark Knight Rises", "Antwone Fisher", "Nights in Rodanthe", "Get on Up", "Beautiful Creatures", "Traffic", "Solaris", "Prisoners", "Ender's Game", "Disturbia", "World War Z", "White Noise"] },
  { actor: "Robert De Niro", movies: ["Taxi Driver", "Raging Bull", "The Godfather Part II", "Goodfellas", "Cape Fear"], hint1: "One film follows a troubled Vietnam vet driving a cab in New York City.", hint1Movie: 0, hint2: "Another is about a boxer's rise and fall, shot in black and white.", hint2Movie: 1 , filmography: ["Taxi Driver", "Raging Bull", "The Godfather Part II", "Goodfellas", "Cape Fear", "The Deer Hunter", "Heat", "Midnight Run", "Awakenings", "Silver Linings Playbook", "Casino", "Brazil", "Analyze This", "Mean Streets", "Angel Heart", "The Mission", "1900", "King of Comedy"] },
  { actor: "Joaquin Phoenix", movies: ["Joker", "Her", "Walk the Line", "Gladiator", "The Master"], hint1: "One film explores a man falling in love with an AI operating system.", hint1Movie: 1, hint2: "Another is a biopic about Johnny Cash.", hint2Movie: 2 , filmography: ["Joker", "Her", "Walk the Line", "Gladiator", "The Master", "Inherent Vice", "You Were Never Really Here", "Signs", "We Own the Night", "Two Lovers", "I'm Still Here", "Buffalo Soldiers", "8MM", "To Die For", "Parenthood", "Quills", "Return to Paradise", "Space Camp"] },
  { actor: "Audrey Hepburn", movies: ["Breakfast at Tiffany's", "Roman Holiday", "Sabrina", "My Fair Lady", "Charade"], hint1: "One film features a famous little black dress and a cat with no name.", hint1Movie: 0, hint2: "Another is a musical where she plays a Cockney flower girl.", hint2Movie: 3 , filmography: ["Breakfast at Tiffany's", "Roman Holiday", "Sabrina", "My Fair Lady", "Charade", "War and Peace", "Funny Face", "The Nun's Story", "The Children's Hour", "Two for the Road", "Wait Until Dark", "Robin and Marian", "Bloodline", "Always", "Love in the Afternoon", "Paris When It Sizzles", "Green Mansions", "They All Laughed"] },
  { actor: "Will Smith", movies: ["The Pursuit of Happyness", "Men in Black", "Ali", "I Am Legend", "Hitch"], hint1: "One film is about a real-life father and son experiencing homelessness.", hint1Movie: 0, hint2: "Another features him as the last human survivor in a post-apocalyptic New York.", hint2Movie: 3 , filmography: ["The Pursuit of Happyness", "Men in Black", "Ali", "I Am Legend", "Hitch", "Six Degrees of Separation", "Independence Day", "Enemy of the State", "Seven Pounds", "Hancock", "Bad Boys", "Concussion", "Suicide Squad", "Bright", "Aladdin", "King Richard", "Focus", "Bad Boys for Life"] },
  { actor: "Halle Berry", movies: ["Monster's Ball", "X-Men", "Die Another Day", "Catwoman", "Losing Isaiah"], hint1: "One film earned her an Oscar for a role involving grief and unexpected love.", hint1Movie: 0, hint2: "Another is a James Bond film where she emerges from the ocean in an iconic scene.", hint2Movie: 2 , filmography: ["Monster's Ball", "X-Men", "Die Another Day", "Catwoman", "Losing Isaiah", "Boomerang", "Jungle Fever", "The Last Boy Scout", "Executive Decision", "Bulworth", "Gothika", "Perfect Stranger", "Cloud Atlas", "Kidnap", "John Wick: Chapter 3", "Bruised", "X-Men: Days of Future Past", "Their Eyes Were Watching God"] },
  { actor: "Anthony Hopkins", movies: ["The Silence of the Lambs", "Nixon", "The Remains of the Day", "Amistad", "The Father"], hint1: "One film features one of cinema's most chilling cannibalistic villains.", hint1Movie: 0, hint2: "Another earned him a recent Oscar for playing a man with dementia.", hint2Movie: 4 , filmography: ["The Silence of the Lambs", "Nixon", "The Remains of the Day", "Amistad", "The Father", "The Elephant Man", "84 Charing Cross Road", "Legends of the Fall", "The Mask of Zorro", "Hannibal", "Red Dragon", "Thor", "The Two Popes", "Hitchcock", "Fracture", "Proof", "Bobby", "Bram Stoker's Dracula"] },
  { actor: "Charlize Theron", movies: ["Monster", "Mad Max: Fury Road", "North Country", "Bombshell", "Young Adult"], hint1: "One film had her transform physically to play a real-life serial killer.", hint1Movie: 0, hint2: "Another is a post-apocalyptic action film where she leads a war rig.", hint2Movie: 1 , filmography: ["Monster", "Mad Max: Fury Road", "North Country", "Bombshell", "Young Adult", "The Italian Job", "Hancock", "Prometheus", "Snow White and the Huntsman", "The Old Guard", "Atomic Blonde", "Tully", "Long Shot", "The Fate of the Furious", "Dark Places", "A Million Ways to Die in the West", "Sleepwalking", "Head in the Clouds"] },
  { actor: "Al Pacino", movies: ["The Godfather", "Scarface", "Dog Day Afternoon", "Serpico", "Scent of a Woman"], hint1: "One film is about a real bank robbery gone wrong in Brooklyn.", hint1Movie: 2, hint2: "Another features a memorable tango scene and the phrase Hoo-ah!", hint2Movie: 4 , filmography: ["The Godfather", "Scarface", "Dog Day Afternoon", "Serpico", "Scent of a Woman", "The Godfather Part II", "Heat", "Donnie Brasco", "Carlito's Way", "The Insider", "Any Given Sunday", "Insomnia", "Ocean's Thirteen", "Righteous Kill", "The Merchant of Venice", "Looking for Richard", "Dick Tracy", "Angels in America"] },
  { actor: "Julia Roberts", movies: ["Pretty Woman", "Erin Brockovich", "Ocean's Eleven", "My Best Friend's Wedding", "Steel Magnolias"], hint1: "One film is about a real-life legal activist who took on a utility company.", hint1Movie: 1, hint2: "Another is a romantic comedy where she plays a woman in love at someone else's wedding.", hint2Movie: 3 , filmography: ["Pretty Woman", "Erin Brockovich", "Ocean's Eleven", "My Best Friend's Wedding", "Steel Magnolias", "Notting Hill", "Runaway Bride", "The Pelican Brief", "Hook", "Flatliners", "Sleeping with the Enemy", "Conspiracy Theory", "Full Frontal", "America's Sweethearts", "Charlie Wilson's War", "Duplicity", "Eat Pray Love", "My Best Friend's Wedding"] },
  { actor: "Daniel Day-Lewis", movies: ["There Will Be Blood", "Lincoln", "My Left Foot", "Gangs of New York", "The Last of the Mohicans"], hint1: "One film involves an obsessive oil tycoon in early 20th-century America.", hint1Movie: 0, hint2: "Another is a biopic about the 16th U.S. president during the Civil War.", hint2Movie: 1 , filmography: ["There Will Be Blood", "Lincoln", "My Left Foot", "Gangs of New York", "The Last of the Mohicans", "Phantom Thread", "In the Name of the Father", "The Unbearable Lightness of Being", "A Room with a View", "The Bounty", "The Age of Innocence", "The Boxer", "The Crucible", "Nine", "My Beautiful Laundrette", "Stars and Bars", "Eversmile New Jersey", "In the Name of the Father"] },
  { actor: "Kate Winslet", movies: ["Titanic", "Eternal Sunshine of the Spotless Mind", "The Reader", "Revolutionary Road", "Little Children"], hint1: "One film is about a couple who erase all memories of each other.", hint1Movie: 1, hint2: "Another earned her an Oscar for a morally complex relationship.", hint2Movie: 2 , filmography: ["Titanic", "Eternal Sunshine of the Spotless Mind", "The Reader", "Revolutionary Road", "Little Children", "Sense and Sensibility", "Iris", "Finding Neverland", "The Holiday", "Steve Jobs", "Labor Day", "Carnage", "Contagion", "Divergent", "Ammonite", "Quills", "Heavenly Creatures", "Jude"] },
  { actor: "Russell Crowe", movies: ["Gladiator", "A Beautiful Mind", "L.A. Confidential", "Master and Commander", "The Insider"], hint1: "One film is set in Ancient Rome and revolves around arena combat.", hint1Movie: 0, hint2: "Another is a biopic about a mathematician living with schizophrenia.", hint2Movie: 1 , filmography: ["Gladiator", "A Beautiful Mind", "L.A. Confidential", "Master and Commander", "The Insider", "Cinderella Man", "3:10 to Yuma", "American Gangster", "Noah", "Les Miserables", "Man of Steel", "The Nice Guys", "Robin Hood", "Mystery Alaska", "Romper Stomper", "Proof of Life", "Virtual Obsession", "The Man with the Iron Fists"] },
  { actor: "Judi Dench", movies: ["Shakespeare in Love", "Philomena", "Mrs. Brown", "Iris", "Chocolat"], hint1: "One film earned her an Oscar for a very brief but unforgettable performance.", hint1Movie: 0, hint2: "Another follows an older woman searching for her long-lost son.", hint2Movie: 1 , filmography: ["Shakespeare in Love", "Philomena", "Mrs. Brown", "Iris", "Chocolat", "GoldenEye", "Notes on a Scandal", "The Best Exotic Marigold Hotel", "Belfast", "Four Weddings and a Funeral", "Jack and Sarah", "Tomorrow Never Dies", "The World Is Not Enough", "Die Another Day", "Casino Royale", "A Fine Romance", "Cranford", "Into the Woods"] },
  { actor: "Edward Norton", movies: ["Fight Club", "American History X", "Primal Fear", "The Italian Job", "Moonrise Kingdom"], hint1: "One film features a shocking courtroom twist involving a young accused murderer.", hint1Movie: 2, hint2: "Another follows a reformed neo-Nazi trying to protect his brother.", hint2Movie: 1 , filmography: ["Fight Club", "American History X", "Primal Fear", "The Italian Job", "Moonrise Kingdom", "The Incredible Hulk", "25th Hour", "The Score", "Keeping the Faith", "Everyone Says I Love You", "Red Dragon", "Kingdom of Heaven", "The Painted Veil", "Leaves of Grass", "Stone", "Glass Onion", "Collateral Beauty", "Death to Smoochy"] },
  { actor: "Chadwick Boseman", movies: ["Black Panther", "42", "Get on Up", "Da 5 Bloods", "Ma Rainey's Black Bottom"], hint1: "One film is a Marvel superhero movie set in the fictional African nation of Wakanda.", hint1Movie: 0, hint2: "Another is a biopic about baseball legend Jackie Robinson.", hint2Movie: 1 , filmography: ["Black Panther", "42", "Get on Up", "Da 5 Bloods", "Ma Rainey's Black Bottom", "Avengers: Infinity War", "Avengers: Endgame", "Captain America: Civil War", "Marshall", "21 Bridges", "Draft Day", "Gods of Egypt", "Message from the King", "Black Panther: Wakanda Forever", "Avengers: Age of Ultron", "The Kill Hole", "The Express", "Persons Unknown"] },
  { actor: "Nicole Kidman", movies: ["Moulin Rouge!", "The Hours", "Eyes Wide Shut", "Rabbit Hole", "Dogville"], hint1: "One film is a flamboyant musical set in 19th-century Paris.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing Virginia Woolf.", hint2Movie: 1 , filmography: ["Moulin Rouge!", "The Hours", "Eyes Wide Shut", "Rabbit Hole", "Dogville", "The Others", "Practical Magic", "Cold Mountain", "Bewitched", "Nine", "Fur", "The Invasion", "Australia", "Just Go with It", "Hemingway & Gellhorn", "Paddington 2", "Destroyer", "Australia"] },
  { actor: "Johnny Depp", movies: ["Pirates of the Caribbean: The Curse of the Black Pearl", "Edward Scissorhands", "Donnie Brasco", "Fear and Loathing in Las Vegas", "Finding Neverland"], hint1: "One film launched a beloved swashbuckling franchise.", hint1Movie: 0, hint2: "Another is about a gentle isolated man with scissors for hands.", hint2Movie: 1 , filmography: ["Pirates of the Caribbean: The Curse of the Black Pearl", "Edward Scissorhands", "Donnie Brasco", "Fear and Loathing in Las Vegas", "Finding Neverland", "Blow", "What's Eating Gilbert Grape", "Ed Wood", "Sleepy Hollow", "Charlie and the Chocolate Factory", "Sweeney Todd", "The Tourist", "Transcendence", "Black Mass", "Cry-Baby", "Arizona Dream", "Nick of Time", "Benny & Joon"] },
  { actor: "Matt Damon", movies: ["Good Will Hunting", "The Martian", "Saving Private Ryan", "The Departed", "Spotlight"], hint1: "One film is about a self-taught genius who works as a janitor at MIT.", hint1Movie: 0, hint2: "Another is about an astronaut stranded alone on Mars.", hint2Movie: 1 , filmography: ["Good Will Hunting", "The Martian", "Saving Private Ryan", "The Departed", "Spotlight", "Ocean's Eleven", "The Talented Mr. Ripley", "Dogma", "Rounders", "Elysium", "True Grit", "Contagion", "Behind the Candelabra", "Interstellar", "The Great Wall", "Downsizing", "Ford v Ferrari", "Stillwater"] },
  { actor: "Sandra Bullock", movies: ["Gravity", "The Blind Side", "Speed", "Miss Congeniality", "Bird Box"], hint1: "One film is set entirely in outer space.", hint1Movie: 0, hint2: "Another is about a beauty queen going undercover at a pageant.", hint2Movie: 3 , filmography: ["Gravity", "The Blind Side", "Speed", "Miss Congeniality", "Bird Box", "Crash", "The Net", "While You Were Sleeping", "A Time to Kill", "Hope Floats", "Two Weeks Notice", "Premonition", "The Proposal", "The Heat", "Our Brand Is Crisis", "Ocean's Eight", "The Unforgivable", "Bullet Train"] },
  { actor: "Lupita Nyong'o", movies: ["12 Years a Slave", "Us", "Black Panther", "Non-Stop", "Star Wars: The Force Awakens"], hint1: "One film earned her an Oscar for depicting the horrors of American slavery.", hint1Movie: 0, hint2: "Another is a Jordan Peele horror film about a family terrorized by their doppelgangers.", hint2Movie: 1 , filmography: ["12 Years a Slave", "Us", "Black Panther", "Non-Stop", "Star Wars: The Force Awakens", "Jungle Book", "Star Wars: The Last Jedi", "Star Wars: The Rise of Skywalker", "Black Panther: Wakanda Forever", "A Quiet Place: Day One", "Avengers: Infinity War", "Avengers: Endgame", "Little Monsters", "Queen of Katwe", "Selma", "Dandelion"] },
  { actor: "Audrey Tautou", movies: ["Amelie", "The Da Vinci Code", "Coco Before Chanel", "Priceless", "A Very Long Engagement"], hint1: "One film is a whimsical French romantic comedy set in Montmartre Paris.", hint1Movie: 0, hint2: "Another is based on Dan Brown's best-selling thriller novel.", hint2Movie: 1 , filmography: ["Amelie", "The Da Vinci Code", "Coco Before Chanel", "Priceless", "A Very Long Engagement", "Happenstance", "He Loves Me He Loves Me Not", "Dirty Pretty Things", "The Spanish Apartment", "Beautiful Lies", "Therese", "Chinese Puzzle", "Venus Beauty Institute", "I Do", "Russian Dolls", "L'Auberge Espagnole"] },
  // Classic Hollywood
  { actor: "Marlon Brando", movies: ["The Godfather", "A Streetcar Named Desire", "On the Waterfront", "Apocalypse Now", "Last Tango in Paris"], hint1: "One film features a mafia patriarch who makes an unforgettable offer.", hint1Movie: 0, hint2: "Another is set in the jungles of Vietnam and based on Heart of Darkness.", hint2Movie: 3 , filmography: ["The Godfather", "A Streetcar Named Desire", "On the Waterfront", "Apocalypse Now", "Last Tango in Paris", "Julius Caesar", "Viva Zapata!", "The Wild One", "Guys and Dolls", "Mutiny on the Bounty", "Reflections in a Golden Eye", "The Freshman", "Superman", "Missouri Breaks", "The Score", "Don Juan DeMarco", "The Island of Dr. Moreau", "A Dry White Season"] },
  { actor: "Jack Nicholson", movies: ["One Flew Over the Cuckoo's Nest", "The Shining", "As Good as It Gets", "Chinatown", "A Few Good Men"], hint1: "One film is set in a haunted hotel where a writer descends into madness.", hint1Movie: 1, hint2: "Another features the line You can't handle the truth!", hint2Movie: 4 , filmography: ["One Flew Over the Cuckoo's Nest", "The Shining", "As Good as It Gets", "Chinatown", "A Few Good Men", "Easy Rider", "Five Easy Pieces", "The Last Detail", "Terms of Endearment", "Prizzi's Honor", "Batman", "The Witches of Eastwick", "Reds", "Carnal Knowledge", "About Schmidt", "Something's Gotta Give", "The Departed", "Anger Management"] },
  { actor: "Cary Grant", movies: ["North by Northwest", "Notorious", "An Affair to Remember", "Bringing Up Baby", "Arsenic and Old Lace"], hint1: "One Hitchcock film involves mistaken identity and a cross-country chase.", hint1Movie: 0, hint2: "Another is a screwball comedy involving a leopard named Baby.", hint2Movie: 3 , filmography: ["North by Northwest", "Notorious", "An Affair to Remember", "Bringing Up Baby", "Arsenic and Old Lace", "To Catch a Thief", "The Philadelphia Story", "His Girl Friday", "Suspicion", "Charade", "Operation Petticoat", "Father Goose", "Walk Don't Run", "That Touch of Mink", "Monkey Business", "I Was a Male War Bride", "The Bishop's Wife", "Mr. Lucky"] },
  { actor: "Humphrey Bogart", movies: ["Casablanca", "The Maltese Falcon", "The African Queen", "The Treasure of the Sierra Madre", "Key Largo"], hint1: "One film is set during WWII and is one of the most quoted movies ever made.", hint1Movie: 0, hint2: "Another is a classic noir mystery centered on a priceless statuette.", hint2Movie: 1 , filmography: ["Casablanca", "The Maltese Falcon", "The African Queen", "The Treasure of the Sierra Madre", "Key Largo", "The Big Sleep", "In a Lonely Place", "Sabrina", "Beat the Devil", "Dark Passage", "Dead End", "High Sierra", "The Petrified Forest", "To Have and Have Not", "The Caine Mutiny", "Knock on Any Door", "We're No Angels", "The Barefoot Contessa"] },
  { actor: "James Stewart", movies: ["It's a Wonderful Life", "Rear Window", "Vertigo", "Mr. Smith Goes to Washington", "Harvey"], hint1: "One film is a beloved Christmas classic about a guardian angel.", hint1Movie: 0, hint2: "Another is a Hitchcock masterpiece about obsession and mistaken identity.", hint2Movie: 2 , filmography: ["It's a Wonderful Life", "Rear Window", "Vertigo", "Mr. Smith Goes to Washington", "Harvey", "The Philadelphia Story", "Anatomy of a Murder", "Rope", "The Man from Laramie", "Winchester '73", "The Naked Spur", "Destry Rides Again", "Broken Arrow", "The Man Who Shot Liberty Valance", "How the West Was Won", "Bell Book and Candle", "The Shop Around the Corner", "The Glenn Miller Story"] },
  { actor: "Henry Fonda", movies: ["12 Angry Men", "The Grapes of Wrath", "Once Upon a Time in the West", "On Golden Pond", "Young Mr. Lincoln"], hint1: "One film takes place almost entirely in a jury deliberation room.", hint1Movie: 0, hint2: "Another is based on Steinbeck's Depression-era epic about the Joad family.", hint2Movie: 1 , filmography: ["12 Angry Men", "The Grapes of Wrath", "Once Upon a Time in the West", "On Golden Pond", "Young Mr. Lincoln", "My Darling Clementine", "The Lady Eve", "Mister Roberts", "War and Peace", "Fail Safe", "The Longest Day", "How the West Was Won", "The Boston Strangler", "Midway", "Fedora", "Advise & Consent", "The Wrong Man", "Fort Apache"] },
  { actor: "Gregory Peck", movies: ["To Kill a Mockingbird", "Roman Holiday", "Moby Dick", "The Guns of Navarone", "Spellbound"], hint1: "One film earned him an Oscar for playing lawyer Atticus Finch.", hint1Movie: 0, hint2: "Another is a classic Hitchcock psychological thriller.", hint2Movie: 4 , filmography: ["To Kill a Mockingbird", "Roman Holiday", "Moby Dick", "The Guns of Navarone", "Spellbound", "Cape Fear", "Gentlemen's Agreement", "The Omen", "Twelve O'Clock High", "Duel in the Sun", "Designing Woman", "The Big Country", "Captain Horatio Hornblower", "Arabesque", "MacArthur", "The Boys from Brazil", "Other People's Money", "Mirage"] },
  { actor: "Burt Lancaster", movies: ["From Here to Eternity", "Elmer Gantry", "The Birdman of Alcatraz", "Atlantic City", "Local Hero"], hint1: "One film features a famous beach kiss set before Pearl Harbor.", hint1Movie: 0, hint2: "Another earned him an Oscar for playing a charismatic con-man evangelist.", hint2Movie: 1 , filmography: ["From Here to Eternity", "Elmer Gantry", "The Birdman of Alcatraz", "Atlantic City", "Local Hero", "Gunfight at the O.K. Corral", "Judgment at Nuremberg", "Separate Tables", "Sweet Smell of Success", "The Professionals", "Airport", "Ulzana's Raid", "Scorpio", "1900", "Go Tell the Spartans", "The Leopard", "Seven Days in May", "The Train"] },
  { actor: "Kirk Douglas", movies: ["Spartacus", "Paths of Glory", "Champion", "Ace in the Hole", "Lust for Life"], hint1: "One epic film features the famous I am Spartacus scene.", hint1Movie: 0, hint2: "Another is a WWI film about soldiers court-martialed for cowardice.", hint2Movie: 1 , filmography: ["Spartacus", "Paths of Glory", "Champion", "Ace in the Hole", "Lust for Life", "The Bad and the Beautiful", "20000 Leagues Under the Sea", "Gunfight at the O.K. Corral", "Lonely Are the Brave", "The Vikings", "Seven Days in May", "Cast a Giant Shadow", "The Final Countdown", "Tough Guys", "The War Wagon", "Greedy", "Oscar", "Saturn 3"] },
  { actor: "Charlton Heston", movies: ["Ben-Hur", "The Ten Commandments", "Planet of the Apes", "El Cid", "Touch of Evil"], hint1: "One film features a legendary chariot race and won 11 Oscars.", hint1Movie: 0, hint2: "Another features the iconic Statue of Liberty buried on a beach.", hint2Movie: 2 , filmography: ["Ben-Hur", "The Ten Commandments", "Planet of the Apes", "El Cid", "Touch of Evil", "The Greatest Show on Earth", "The Agony and the Ecstasy", "Earthquake", "Airport 1975", "Major Dundee", "Will Penny", "Julius Caesar", "Midway", "The Four Musketeers", "Tombstone", "In the Mouth of Madness", "Bowling for Columbine", "True Lies"] },
  { actor: "Spencer Tracy", movies: ["Guess Who's Coming to Dinner", "Judgment at Nuremberg", "Captains Courageous", "Boys Town", "Bad Day at Black Rock"], hint1: "One film is about a white family confronting their daughter's Black fiance.", hint1Movie: 0, hint2: "Another is a war crimes trial set in post-WWII Germany.", hint2Movie: 1 , filmography: ["Guess Who's Coming to Dinner", "Judgment at Nuremberg", "Captains Courageous", "Boys Town", "Bad Day at Black Rock", "Inherit the Wind", "Fury", "Pat and Mike", "Adam's Rib", "Desk Set", "The Old Man and the Sea", "Woman of the Year", "Father of the Bride", "State of the Union", "Dr. Jekyll and Mr. Hyde", "Stanley and Livingstone", "The Power and the Glory", "Father's Little Dividend"] },
  { actor: "Paul Newman", movies: ["Cool Hand Luke", "The Sting", "Butch Cassidy and the Sundance Kid", "The Hustler", "Nobody's Fool"], hint1: "One film features the line What we have here is a failure to communicate.", hint1Movie: 0, hint2: "Another is a con artist caper set in 1930s Chicago.", hint2Movie: 1 , filmography: ["Cool Hand Luke", "The Sting", "Butch Cassidy and the Sundance Kid", "The Hustler", "Nobody's Fool", "The Verdict", "Hud", "Cat on a Hot Tin Roof", "Exodus", "Slap Shot", "The Color of Money", "Absence of Malice", "Fort Apache the Bronx", "Road to Perdition", "Message in a Bottle", "Empire Falls", "Cars", "The Road to Perdition"] },
  { actor: "Steve McQueen", movies: ["Bullitt", "The Great Escape", "Papillon", "The Thomas Crown Affair", "Le Mans"], hint1: "One film features arguably the greatest car chase ever filmed in San Francisco.", hint1Movie: 0, hint2: "Another is about a WWII POW escape attempt.", hint2Movie: 1 , filmography: ["Bullitt", "The Great Escape", "Papillon", "The Thomas Crown Affair", "Le Mans", "The Cincinnati Kid", "Nevada Smith", "Love with the Proper Stranger", "Baby the Rain Must Fall", "The Sand Pebbles", "An Enemy of the People", "The Getaway", "Junior Bonner", "Soldier in the Rain", "Never So Few", "Hell Is for Heroes", "Magnificent Seven", "The Reivers"] },
  { actor: "Peter O'Toole", movies: ["Lawrence of Arabia", "Becket", "The Lion in Winter", "Goodbye Mr. Chips", "My Favorite Year"], hint1: "One film is a sweeping desert epic about a British officer who united Arab tribes.", hint1Movie: 0, hint2: "Another features a power struggle between a king and his archbishop.", hint2Movie: 1 , filmography: ["Lawrence of Arabia", "Becket", "The Lion in Winter", "Goodbye Mr. Chips", "My Favorite Year", "The Ruling Class", "Man of La Mancha", "What's New Pussycat", "Murphy's War", "The Stunt Man", "Creator", "Club Paradise", "High Spirits", "The Last Emperor", "Phantoms", "Bright Young Things", "Venus", "Ratatouille"] },
  { actor: "Richard Burton", movies: ["Who's Afraid of Virginia Woolf?", "Becket", "The Spy Who Came in from the Cold", "Equus", "The Night of the Iguana"], hint1: "One film has him tearing apart a marriage alongside Elizabeth Taylor.", hint1Movie: 0, hint2: "Another is an espionage drama based on a John le Carre novel.", hint2Movie: 2 , filmography: ["Who's Afraid of Virginia Woolf?", "Becket", "The Spy Who Came in from the Cold", "Equus", "The Night of the Iguana", "Cleopatra", "Anne of the Thousand Days", "Where Eagles Dare", "The Longest Day", "1984", "Exorcist II: The Heretic", "The Robe", "Alexander the Great", "Ice Palace", "Bitter Victory", "Doctor Faustus", "The Taming of the Shrew", "Villain"] },
  { actor: "Orson Welles", movies: ["Citizen Kane", "The Third Man", "Touch of Evil", "Chimes at Midnight", "F for Fake"], hint1: "One film is widely considered the greatest film ever made.", hint1Movie: 0, hint2: "Another is a post-WWII noir thriller set in Vienna.", hint2Movie: 1 , filmography: ["Citizen Kane", "The Third Man", "Touch of Evil", "Chimes at Midnight", "F for Fake", "The Magnificent Ambersons", "Journey into Fear", "Macbeth", "Othello", "Mr. Arkadin", "The Trial", "The Stranger", "Compulsion", "Casino Royale", "The Muppet Movie", "Transformers: The Movie", "Start the Revolution Without Me", "Catch-22"] },
  { actor: "Laurence Olivier", movies: ["Hamlet", "Rebecca", "Wuthering Heights", "Richard III", "The Boys from Brazil"], hint1: "One film earned him an Oscar for playing Shakespeare's most famous prince.", hint1Movie: 0, hint2: "Another is a Hitchcock adaptation of a Daphne du Maurier novel.", hint2Movie: 1 , filmography: ["Hamlet", "Rebecca", "Wuthering Heights", "Richard III", "The Boys from Brazil", "Henry V", "Othello", "The Entertainer", "Sleuth", "Marathon Man", "A Little Romance", "The Jazz Singer", "Clash of the Titans", "Dracula", "Spartacus", "Pride and Prejudice", "Carrie", "Brideshead Revisited"] },
  { actor: "Gene Kelly", movies: ["Singin' in the Rain", "An American in Paris", "On the Town", "Anchors Aweigh", "Brigadoon"], hint1: "One film features an iconic dance sequence performed in a downpour.", hint1Movie: 0, hint2: "Another earned an honorary Oscar and is set in post-war Paris.", hint2Movie: 1 , filmography: ["Singin' in the Rain", "An American in Paris", "On the Town", "Anchors Aweigh", "Brigadoon", "Cover Girl", "For Me and My Gal", "The Pirate", "Words and Music", "Take Me Out to the Ball Game", "Summer Stock", "It's Always Fair Weather", "Inherit the Wind", "Les Girls", "Marjorie Morningstar", "The Young Girls of Rochefort", "Hello Dolly!", "Xanadu"] },
  { actor: "Fred Astaire", movies: ["Top Hat", "Swing Time", "The Band Wagon", "Easter Parade", "Funny Face"], hint1: "One film features the classic song Cheek to Cheek.", hint1Movie: 0, hint2: "Another is a colorful musical comedy set in the fashion world of Paris.", hint2Movie: 4 , filmography: ["Top Hat", "Swing Time", "The Band Wagon", "Easter Parade", "Funny Face", "Flying Down to Rio", "The Gay Divorcee", "Follow the Fleet", "Carefree", "Shall We Dance", "Holiday Inn", "Blue Skies", "Three Little Words", "Daddy Long Legs", "The Towering Inferno", "Finian's Rainbow", "The Purple Rose of Cairo", "The Amazing Dobermans"] },
  { actor: "James Cagney", movies: ["White Heat", "Yankee Doodle Dandy", "The Public Enemy", "Angels with Dirty Faces", "Love Me or Leave Me"], hint1: "One film earned him an Oscar for playing George M. Cohan.", hint1Movie: 1, hint2: "Another features the famous grapefruit scene that helped launch the gangster genre.", hint2Movie: 2 , filmography: ["White Heat", "Yankee Doodle Dandy", "The Public Enemy", "Angels with Dirty Faces", "Love Me or Leave Me", "Footlight Parade", "Hard to Handle", "A Midsummer Night's Dream", "Each Dawn I Die", "City for Conquest", "Blood on the Sun", "Mister Roberts", "Tribute to a Bad Man", "Shake Hands with the Devil", "One Two Three", "Ragtime", "The West Point Story", "Come Fill the Cup"] },
  { actor: "Sidney Poitier", movies: ["In the Heat of the Night", "Guess Who's Coming to Dinner", "Lilies of the Field", "To Sir with Love", "The Defiant Ones"], hint1: "One film earned him an Oscar for a detective drama set in Mississippi.", hint1Movie: 0, hint2: "Another was about a schoolteacher in London's toughest classroom.", hint2Movie: 3 , filmography: ["In the Heat of the Night", "Guess Who's Coming to Dinner", "Lilies of the Field", "To Sir with Love", "The Defiant Ones", "A Raisin in the Sun", "Blackboard Jungle", "The Bedford Incident", "A Patch of Blue", "For Love of Ivy", "Buck and the Preacher", "Uptown Saturday Night", "Let's Do It Again", "A Piece of the Action", "Shoot to Kill", "Little Nikita", "Sneakers", "The Jackal"] },
  { actor: "Katharine Hepburn", movies: ["The African Queen", "Guess Who's Coming to Dinner", "The Lion in Winter", "On Golden Pond", "Bringing Up Baby"], hint1: "One film pairs her with Humphrey Bogart on a river journey through Africa.", hint1Movie: 0, hint2: "Another earned her an Oscar alongside Henry Fonda late in their careers.", hint2Movie: 3 , filmography: ["The African Queen", "Guess Who's Coming to Dinner", "The Lion in Winter", "On Golden Pond", "Bringing Up Baby", "The Philadelphia Story", "Woman of the Year", "Adam's Rib", "Pat and Mike", "Desk Set", "Long Day's Journey into Night", "Suddenly Last Summer", "The Rainmaker", "Summertime", "Mary of Scotland", "Quality Street", "Little Women", "Stage Door Canteen"] },
  { actor: "Bette Davis", movies: ["All About Eve", "What Ever Happened to Baby Jane?", "Jezebel", "Now Voyager", "The Little Foxes"], hint1: "One film features the line Fasten your seatbelts it's going to be a bumpy night.", hint1Movie: 0, hint2: "Another is a psychological thriller she made with former rival Joan Crawford.", hint2Movie: 1 , filmography: ["All About Eve", "What Ever Happened to Baby Jane?", "Jezebel", "Now Voyager", "The Little Foxes", "Dark Victory", "The Letter", "The Man Who Came to Dinner", "Mr. Skeffington", "Dangerous", "The Old Maid", "The Corn Is Green", "Of Human Bondage", "Pocketful of Miracles", "The Whales of August", "Death on the Nile", "Wicked Stepmother", "The Nanny"] },
  { actor: "Ingrid Bergman", movies: ["Casablanca", "Notorious", "Gaslight", "Spellbound", "Anastasia"], hint1: "One film has her playing opposite Humphrey Bogart in wartime Morocco.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing a woman being manipulated into madness.", hint2Movie: 2 , filmography: ["Casablanca", "Notorious", "Gaslight", "Spellbound", "Anastasia", "For Whom the Bell Tolls", "Joan of Arc", "Stromboli", "Voyage to Italy", "Elena and Her Men", "Autumn Sonata", "A Walk in the Spring Rain", "Cactus Flower", "Murder on the Orient Express", "The Inn of the Sixth Happiness", "Intermezzo", "Adam Had Four Sons", "Arch of Triumph"] },
  { actor: "Grace Kelly", movies: ["Rear Window", "To Catch a Thief", "Dial M for Murder", "High Noon", "The Country Girl"], hint1: "One Hitchcock film features a man confined to a wheelchair watching his neighbors.", hint1Movie: 0, hint2: "Another is a Hitchcock thriller set on the French Riviera.", hint2Movie: 1 , filmography: ["Rear Window", "To Catch a Thief", "Dial M for Murder", "High Noon", "The Country Girl", "Mogambo", "Fourteen Hours", "Green Fire", "The Bridges at Toko-Ri", "The Swan", "High Society", "Taxi", "The Princess Grace Story", "Rearranged", "Children of Theatre Street", "Designing Woman"] },
  { actor: "Vivien Leigh", movies: ["Gone with the Wind", "A Streetcar Named Desire", "Waterloo Bridge", "Anna Karenina", "Ship of Fools"], hint1: "One film features Scarlett O'Hara and the plantation Tara.", hint1Movie: 0, hint2: "Another co-stars Marlon Brando as Stanley Kowalski.", hint2Movie: 1 , filmography: ["Gone with the Wind", "A Streetcar Named Desire", "Waterloo Bridge", "Anna Karenina", "Ship of Fools", "That Hamilton Woman", "Caesar and Cleopatra", "The Deep Blue Sea", "Elephant Walk", "The Roman Spring of Mrs. Stone", "A Yank at Oxford", "Dark Journey", "Storm in a Teacup", "St. Martin's Lane", "21 Days", "The Mask of Virtue"] },
  { actor: "Marilyn Monroe", movies: ["Some Like It Hot", "Gentlemen Prefer Blondes", "Bus Stop", "The Misfits", "How to Marry a Millionaire"], hint1: "One film has her in a drag comedy with Tony Curtis and Jack Lemmon.", hint1Movie: 0, hint2: "Another features the showstopping number Diamonds Are a Girl's Best Friend.", hint2Movie: 1 , filmography: ["Some Like It Hot", "Gentlemen Prefer Blondes", "Bus Stop", "The Misfits", "How to Marry a Millionaire", "The Seven Year Itch", "River of No Return", "All About Eve", "Niagara", "Let's Make Love", "There's No Business Like Show Business", "Love Happy", "We're Not Married!", "Monkey Business", "Don't Bother to Knock", "The Prince and the Showgirl", "Clash by Night", "Dangerous Years"] },
  { actor: "Elizabeth Taylor", movies: ["Cleopatra", "Who's Afraid of Virginia Woolf?", "Cat on a Hot Tin Roof", "Giant", "National Velvet"], hint1: "One film was the most expensive ever made at the time of its release.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing Martha opposite Richard Burton.", hint2Movie: 1 , filmography: ["Cleopatra", "Who's Afraid of Virginia Woolf?", "Cat on a Hot Tin Roof", "Giant", "National Velvet", "Butterfield 8", "Suddenly Last Summer", "A Place in the Sun", "The Taming of the Shrew", "Boom!", "Ash Wednesday", "The Mirror Crack'd", "Malice in Wonderland", "Young Toscanini", "The Flintstones", "A Little Night Music", "Hammersmith Is Out", "Father of the Bride"] },
  { actor: "Sophia Loren", movies: ["Two Women", "Marriage Italian Style", "Yesterday Today and Tomorrow", "La Ciociara", "The Millionairess"], hint1: "One film earned her an Oscar for playing a mother protecting her daughter during WWII.", hint1Movie: 0, hint2: "Another is an Italian comedy anthology film with Marcello Mastroianni.", hint2Movie: 1 , filmography: ["Two Women", "Marriage Italian Style", "Yesterday Today and Tomorrow", "La Ciociara", "The Millionairess", "Houseboat", "The Key", "El Cid", "The Fall of the Roman Empire", "Judith", "Arabesque", "More Than a Miracle", "Man of La Mancha", "The Cassandra Crossing", "Brass Target", "Ready to Wear", "Grumpier Old Men", "Between Strangers"] },
  // 1970s-90s
  { actor: "Dustin Hoffman", movies: ["The Graduate", "Kramer vs. Kramer", "Rain Man", "Tootsie", "Midnight Cowboy"], hint1: "One film features the famous Mrs Robinson seduction scene.", hint1Movie: 0, hint2: "Another features him as an autistic savant on a road trip with his brother.", hint2Movie: 2 , filmography: ["The Graduate", "Kramer vs. Kramer", "Rain Man", "Tootsie", "Midnight Cowboy", "The Marathon Man", "All the President's Men", "Lenny", "Papillon", "Straw Dogs", "Straight Time", "Agatha", "Ishtar", "Family Business", "Dick Tracy", "Hook", "Outbreak", "American Buffalo"] },
  { actor: "Gene Hackman", movies: ["The French Connection", "Unforgiven", "The Royal Tenenbaums", "Enemy of the State", "Mississippi Burning"], hint1: "One film earned him an Oscar for an iconic car chase through New York City.", hint1Movie: 0, hint2: "Another is a Wes Anderson ensemble comedy about a dysfunctional family.", hint2Movie: 2 , filmography: ["The French Connection", "Unforgiven", "The Royal Tenenbaums", "Enemy of the State", "Mississippi Burning", "The Conversation", "Superman", "Night Moves", "Reds", "Hoosiers", "The Firm", "Crimson Tide", "Get Shorty", "The Birdcage", "Absolute Power", "Behind Enemy Lines", "Heartbreakers", "The Mexican"] },
  { actor: "Clint Eastwood", movies: ["The Good the Bad and the Ugly", "Unforgiven", "Gran Torino", "Dirty Harry", "Million Dollar Baby"], hint1: "One spaghetti western is considered one of the greatest films ever made.", hint1Movie: 0, hint2: "Another is about a grizzled trainer who reluctantly coaches a female boxer.", hint2Movie: 4 , filmography: ["The Good the Bad and the Ugly", "Unforgiven", "Gran Torino", "Dirty Harry", "Million Dollar Baby", "A Fistful of Dollars", "For a Few Dollars More", "Hang Em High", "Coogan's Bluff", "Two Mules for Sister Sara", "The Outlaw Josey Wales", "Escape from Alcatraz", "Firefox", "Pale Rider", "Heartbreak Ridge", "In the Line of Fire", "The Bridges of Madison County", "Space Cowboys"] },
  { actor: "Warren Beatty", movies: ["Bonnie and Clyde", "Shampoo", "Heaven Can Wait", "Reds", "Bugsy"], hint1: "One film shocked audiences with its glamorized outlaw violence.", hint1Movie: 0, hint2: "Another earned him a Best Director Oscar for an epic about journalist John Reed.", hint2Movie: 3 , filmography: ["Bonnie and Clyde", "Shampoo", "Heaven Can Wait", "Reds", "Bugsy", "McCabe & Mrs. Miller", "The Parallax View", "Dick Tracy", "Bulworth", "Town & Country", "Splendor in the Grass", "All Fall Down", "Kaleidoscope", "The Only Game in Town", "Ishtar", "Love Affair", "The Roman Spring of Mrs. Stone", "Fortune and Men's Eyes"] },
  { actor: "Michael Douglas", movies: ["Wall Street", "Fatal Attraction", "Basic Instinct", "Traffic", "Falling Down"], hint1: "One film introduced the phrase Greed is good.", hint1Movie: 0, hint2: "Another is a psychological thriller involving an ice pick.", hint2Movie: 2 , filmography: ["Wall Street", "Fatal Attraction", "Basic Instinct", "Traffic", "Falling Down", "One Flew Over the Cuckoo's Nest", "Romancing the Stone", "The Jewel of the Nile", "Black Rain", "The War of the Roses", "Disclosure", "The American President", "The Ghost and the Darkness", "A Perfect Murder", "Wonder Boys", "Behind the Candelabra", "Ant-Man", "Flatliners"] },
  { actor: "Kevin Costner", movies: ["Dances with Wolves", "The Bodyguard", "Field of Dreams", "Bull Durham", "JFK"], hint1: "One film earned him Best Director and Best Picture Oscars set among the Sioux.", hint1Movie: 0, hint2: "Another features the memorable line If you build it he will come.", hint2Movie: 2 , filmography: ["Dances with Wolves", "The Bodyguard", "Field of Dreams", "Bull Durham", "JFK", "Robin Hood: Prince of Thieves", "The Untouchables", "No Way Out", "Waterworld", "The Postman", "Message in a Bottle", "For Love of the Game", "13 Days", "Open Range", "The Upside of Anger", "Mr. Brooks", "Hatfields & McCoys", "Man of Steel"] },
  { actor: "Richard Gere", movies: ["Pretty Woman", "An Officer and a Gentleman", "Chicago", "American Gigolo", "Days of Heaven"], hint1: "One film features a fire escape serenade with Julia Roberts.", hint1Movie: 0, hint2: "Another earned him a Golden Globe for playing Billy Flynn in a musical.", hint2Movie: 2 , filmography: ["Pretty Woman", "An Officer and a Gentleman", "Chicago", "American Gigolo", "Days of Heaven", "Breathless", "The Cotton Club", "Internal Affairs", "Sommersby", "Primal Fear", "Red Corner", "Runaway Bride", "The Mothman Prophecies", "Unfaithful", "Hachi", "The Hoax", "Brooklyn's Finest", "Arbitrage"] },
  { actor: "Mel Gibson", movies: ["Braveheart", "Mad Max", "Lethal Weapon", "The Year of Living Dangerously", "Apocalypto"], hint1: "One film earned him Best Director and Best Picture Oscars set in medieval Scotland.", hint1Movie: 0, hint2: "Another launched a post-apocalyptic franchise set in Australia.", hint2Movie: 1 , filmography: ["Braveheart", "Mad Max", "Lethal Weapon", "The Year of Living Dangerously", "Apocalypto", "The Road Warrior", "Gallipoli", "Hamlet", "Forever Young", "The Man Without a Face", "Maverick", "Ransom", "Conspiracy Theory", "What Women Want", "We Were Soldiers", "Signs", "The Beaver", "Expendables 3"] },
  { actor: "Jeff Bridges", movies: ["The Big Lebowski", "Crazy Heart", "True Grit", "The Fabulous Baker Boys", "Starman"], hint1: "One film features a laid-back man called The Dude who just wants his rug back.", hint1Movie: 0, hint2: "Another earned him an Oscar for playing a hard-drinking country singer.", hint2Movie: 1 , filmography: ["The Big Lebowski", "Crazy Heart", "True Grit", "The Fabulous Baker Boys", "Starman", "The Last Picture Show", "Thunderbolt and Lightfoot", "Against All Odds", "Tron", "The Contender", "Seabiscuit", "The Door in the Floor", "The Mirror Has Two Faces", "Fearless", "Blown Away", "King Kong", "Iron Man", "TRON: Legacy"] },
  { actor: "Tom Cruise", movies: ["Top Gun", "Jerry Maguire", "Mission: Impossible", "Rain Man", "Magnolia"], hint1: "One film made him an icon of fighter pilot culture.", hint1Movie: 0, hint2: "Another is a Paul Thomas Anderson drama about coincidence and fate.", hint2Movie: 4 , filmography: ["Top Gun", "Jerry Maguire", "Mission: Impossible", "Rain Man", "Magnolia", "Risky Business", "A Few Good Men", "The Color of Money", "Born on the Fourth of July", "Interview with the Vampire", "Eyes Wide Shut", "Vanilla Sky", "Minority Report", "The Last Samurai", "Collateral", "War of the Worlds", "Lions for Lambs", "Tropic Thunder"] },
  { actor: "Harrison Ford", movies: ["Star Wars: A New Hope", "Raiders of the Lost Ark", "Blade Runner", "The Fugitive", "Witness"], hint1: "One film features a galaxy far far away and a famous space smuggler.", hint1Movie: 0, hint2: "Another is a classic 1980s adventure involving a Nazi-sought religious artifact.", hint2Movie: 1 , filmography: ["Star Wars: A New Hope", "Raiders of the Lost Ark", "Blade Runner", "The Fugitive", "Witness", "The Empire Strikes Back", "Return of the Jedi", "Indiana Jones and the Temple of Doom", "Indiana Jones and the Last Crusade", "Presumed Innocent", "Patriot Games", "The Firm", "Clear and Present Danger", "Air Force One", "What Lies Beneath", "K-19: The Widowmaker", "Hollywood Homicide", "Firewall"] },
  { actor: "Sylvester Stallone", movies: ["Rocky", "First Blood", "Cop Land", "Creed", "Demolition Man"], hint1: "One film is an underdog boxing story that won Best Picture.", hint1Movie: 0, hint2: "Another features him as a troubled Vietnam vet hunted by a small-town sheriff.", hint2Movie: 1 , filmography: ["Rocky", "First Blood", "Cop Land", "Creed", "Demolition Man", "Rocky II", "Rocky III", "Rocky IV", "Rambo: First Blood Part II", "Rambo III", "Tango & Cash", "Oscar", "Cliffhanger", "The Specialist", "Judge Dredd", "Assassins", "Daylight", "Antz"] },
  { actor: "Arnold Schwarzenegger", movies: ["The Terminator", "Predator", "Total Recall", "True Lies", "Kindergarten Cop"], hint1: "One film features the iconic line I'll be back.", hint1Movie: 0, hint2: "Another features him fighting an alien hunter in a jungle.", hint2Movie: 1 , filmography: ["The Terminator", "Predator", "Total Recall", "True Lies", "Kindergarten Cop", "Conan the Barbarian", "Commando", "The Running Man", "Red Heat", "Batman & Robin", "Eraser", "Jingle All the Way", "End of Days", "The 6th Day", "Collateral Damage", "Terminator 3", "The Expendables", "The Last Stand"] },
  { actor: "Bruce Willis", movies: ["Die Hard", "Pulp Fiction", "The Sixth Sense", "The Fifth Element", "Unbreakable"], hint1: "One film launched one of the greatest action franchises.", hint1Movie: 0, hint2: "Another features one of cinema's most famous twist endings.", hint2Movie: 2 , filmography: ["Die Hard", "Pulp Fiction", "The Sixth Sense", "The Fifth Element", "Unbreakable", "Die Hard 2", "Die Hard with a Vengeance", "In Country", "The Bonfire of the Vanities", "Hudson Hawk", "The Last Boy Scout", "Color of Night", "12 Monkeys", "Armageddon", "The Jackal", "Bandits", "Tears of the Sun", "Sin City"] },
  { actor: "Nicolas Cage", movies: ["Leaving Las Vegas", "Adaptation", "Raising Arizona", "Moonstruck", "Mandy"], hint1: "One film earned him an Oscar for playing a suicidal alcoholic.", hint1Movie: 0, hint2: "Another is a Charlie Kaufman meta-film about a screenwriter struggling with adaptation.", hint2Movie: 1 , filmography: ["Leaving Las Vegas", "Adaptation", "Raising Arizona", "Moonstruck", "Mandy", "Vampire's Kiss", "Wild at Heart", "Red Rock West", "It Could Happen to You", "The Rock", "Con Air", "Face/Off", "City of Angels", "Snake Eyes", "8MM", "Gone in 60 Seconds", "The Family Man", "National Treasure"] },
  { actor: "John Travolta", movies: ["Saturday Night Fever", "Grease", "Pulp Fiction", "Get Shorty", "Blow Out"], hint1: "One film made him a disco icon and spawned a soundtrack phenomenon.", hint1Movie: 0, hint2: "Another features a famous dance scene with Uma Thurman.", hint2Movie: 2 , filmography: ["Saturday Night Fever", "Grease", "Pulp Fiction", "Get Shorty", "Blow Out", "Carrie", "Staying Alive", "Two of a Kind", "Perfect", "The Experts", "Look Who's Talking", "Broken Arrow", "Phenomenon", "Michael", "Face/Off", "Primary Colors", "A Civil Action", "The General's Daughter"] },
  { actor: "Robin Williams", movies: ["Good Will Hunting", "Dead Poets Society", "Mrs. Doubtfire", "Good Morning Vietnam", "Aladdin"], hint1: "One film earned him an Oscar for playing a therapist who helps a genius janitor.", hint1Movie: 0, hint2: "Another features him as an inspirational English teacher who tells students to seize the day.", hint2Movie: 1 , filmography: ["Good Will Hunting", "Dead Poets Society", "Mrs. Doubtfire", "Good Morning Vietnam", "Aladdin", "The Fisher King", "Awakenings", "Hook", "Toys", "Being Human", "Nine Months", "Jumanji", "The Birdcage", "Jack", "Father's Day", "Flubber", "Patch Adams", "Jakob the Liar"] },
  { actor: "Eddie Murphy", movies: ["Beverly Hills Cop", "Trading Places", "Coming to America", "48 Hrs.", "Dreamgirls"], hint1: "One film launched his action-comedy franchise as a Detroit detective.", hint1Movie: 0, hint2: "Another features him as an African prince coming to America to find a bride.", hint2Movie: 2 , filmography: ["Beverly Hills Cop", "Trading Places", "Coming to America", "48 Hrs.", "Dreamgirls", "The Nutty Professor", "Doctor Dolittle", "Bowfinger", "Shrek", "Pluto Nash", "I Spy", "Daddy Day Care", "Norbit", "Meet Dave", "Imagine That", "Tower Heist", "A Thousand Words", "Dolemite Is My Name"] },
  { actor: "Bill Murray", movies: ["Groundhog Day", "Lost in Translation", "The Life Aquatic with Steve Zissou", "Rushmore", "Ghostbusters"], hint1: "One film has him reliving the same day in a small Pennsylvania town.", hint1Movie: 0, hint2: "Another is a Sofia Coppola film set in a Tokyo hotel.", hint2Movie: 1 , filmography: ["Groundhog Day", "Lost in Translation", "The Life Aquatic with Steve Zissou", "Rushmore", "Ghostbusters", "Stripes", "Tootsie", "Scrooged", "What About Bob?", "Ghostbusters II", "Ed Wood", "Kingpin", "Space Jam", "Hamlet", "Wild Things", "Cradle Will Rock", "Charlie's Angels", "The Royal Tenenbaums"] },
  { actor: "Gene Wilder", movies: ["Willy Wonka & the Chocolate Factory", "Young Frankenstein", "Blazing Saddles", "The Producers", "Stir Crazy"], hint1: "One film is a beloved children's fantasy set in a candy factory.", hint1Movie: 0, hint2: "Another is a Mel Brooks spoof of classic horror films.", hint2Movie: 1 , filmography: ["Willy Wonka & the Chocolate Factory", "Young Frankenstein", "Blazing Saddles", "The Producers", "Stir Crazy", "The Frisco Kid", "Silver Streak", "See No Evil Hear No Evil", "Rhinoceros", "Everything You Always Wanted to Know About Sex", "Thursday's Game", "The Adventures of Sherlock Holmes' Smarter Brother", "The World's Greatest Lover", "Hanky Panky", "The Woman in Red", "Funny About Love", "Another You"] },
  { actor: "Sigourney Weaver", movies: ["Alien", "Aliens", "Gorillas in the Mist", "Working Girl", "The Ice Storm"], hint1: "One film launched one of cinema's greatest sci-fi horror franchises.", hint1Movie: 0, hint2: "Another features her as primatologist Dian Fossey.", hint2Movie: 2 , filmography: ["Alien", "Aliens", "Gorillas in the Mist", "Working Girl", "The Ice Storm", "Ghostbusters", "Alien 3", "Alien Resurrection", "Dave", "Death and the Maiden", "Copycat", "The Map of the World", "Galaxy Quest", "Heartbreakers", "The Village", "Imagining Argentina", "Infamous", "The TV Set"] },
  { actor: "Jodie Foster", movies: ["The Silence of the Lambs", "Taxi Driver", "Nell", "Contact", "Little Man Tate"], hint1: "One film has her hunting a serial killer with help from another.", hint1Movie: 0, hint2: "Another has her playing a radio astronomer who makes contact with aliens.", hint2Movie: 3 , filmography: ["The Silence of the Lambs", "Taxi Driver", "Nell", "Contact", "Little Man Tate", "Alice Doesn't Live Here Anymore", "Bugsy Malone", "The Accused", "Sommersby", "Maverick", "Anna and the King", "Panic Room", "A Very Long Engagement", "Flightplan", "Inside Man", "The Brave One", "Nim's Island", "Elysium"] },
  { actor: "Susan Sarandon", movies: ["Thelma & Louise", "Dead Man Walking", "The Client", "Lorenzo's Oil", "Atlantic City"], hint1: "One road trip film ends with a famous cliff drive.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing a nun who befriends a death row inmate.", hint2Movie: 1 , filmography: ["Thelma & Louise", "Dead Man Walking", "The Client", "Lorenzo's Oil", "Atlantic City", "The Rocky Horror Picture Show", "Pretty Baby", "Bull Durham", "Witches of Eastwick", "White Palace", "Stepmom", "Anywhere but Here", "Cradle Will Rock", "Igby Goes Down", "Alfie", "Elizabethtown", "Romance & Cigarettes", "Speed Racer"] },
  { actor: "Michelle Pfeiffer", movies: ["Scarface", "Batman Returns", "The Fabulous Baker Boys", "Dangerous Liaisons", "Frankie and Johnny"], hint1: "One film features her as a cat-suited Catwoman.", hint1Movie: 1, hint2: "Another has her draped across a piano in a memorable lounge scene.", hint2Movie: 2 , filmography: ["Scarface", "Batman Returns", "The Fabulous Baker Boys", "Dangerous Liaisons", "Frankie and Johnny", "Grease 2", "Into the Night", "Sweet Liberty", "Tequila Sunrise", "The Witches of Eastwick", "Love Field", "The Age of Innocence", "Wolf", "Up Close & Personal", "One Fine Day", "A Thousand Acres", "The Deep End of the Ocean", "What Lies Beneath"] },
  { actor: "Diane Keaton", movies: ["Annie Hall", "The Godfather", "Reds", "Something's Gotta Give", "Marvin's Room"], hint1: "One film is Woody Allen's Oscar-winning romantic comedy.", hint1Movie: 0, hint2: "Another has her opposite Jack Nicholson in a late-life romance.", hint2Movie: 3 , filmography: ["Annie Hall", "The Godfather", "Reds", "Something's Gotta Give", "Marvin's Room", "Sleeper", "Love and Death", "Interiors", "Manhattan", "Shoot the Moon", "The Little Drummer Girl", "Baby Boom", "The Good Mother", "The Godfather Part III", "Father of the Bride", "Unstrung Heroes", "The First Wives Club", "The Family Stone"] },
  { actor: "Faye Dunaway", movies: ["Bonnie and Clyde", "Chinatown", "Network", "Three Days of the Condor", "Mommie Dearest"], hint1: "One film is about the real-life outlaw couple controversial for its violence.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing a ruthless TV executive.", hint2Movie: 2 , filmography: ["Bonnie and Clyde", "Chinatown", "Network", "Three Days of the Condor", "Mommie Dearest", "The Thomas Crown Affair", "The Towering Inferno", "Voyage of the Damned", "Eyes of Laura Mars", "The First Deadly Sin", "Barfly", "Midnight Crossing", "The Temp", "Arizona Dream", "Albino Alligator", "The Messenger: The Story of Joan of Arc", "Supergirl"] },
  { actor: "Jane Fonda", movies: ["Klute", "Coming Home", "The China Syndrome", "On Golden Pond", "Barbarella"], hint1: "One film earned her an Oscar for playing a call girl.", hint1Movie: 0, hint2: "Another is a Vietnam-era drama that earned her a second Oscar.", hint2Movie: 1 , filmography: ["Klute", "Coming Home", "The China Syndrome", "On Golden Pond", "Barbarella", "Cat Ballou", "Barefoot in the Park", "They Shoot Horses Don't They?", "Tout va bien", "Julia", "Fun with Dick and Jane", "California Suite", "The Electric Horseman", "9 to 5", "Rollover", "Agnes of God", "The Morning After", "Old Gringo"] },
  { actor: "Goldie Hawn", movies: ["Private Benjamin", "Cactus Flower", "The Sugarland Express", "Overboard", "Death Becomes Her"], hint1: "One film earned her an Oscar nomination for playing a pampered woman who joins the Army.", hint1Movie: 0, hint2: "Another has her and Meryl Streep as rivals who discover a youth potion.", hint2Movie: 4 , filmography: ["Private Benjamin", "Cactus Flower", "The Sugarland Express", "Overboard", "Death Becomes Her", "Butterflies Are Free", "The Girl from Petrovka", "Shampoo", "Foul Play", "Best Friends", "Swing Shift", "Wildcats", "Bird on a Wire", "Deceived", "HouseSitter", "CrissCross", "The First Wives Club", "Everyone Says I Love You"] },
  { actor: "Barbra Streisand", movies: ["Funny Girl", "The Way We Were", "A Star Is Born", "Yentl", "What's Up Doc?"], hint1: "One film earned her an Oscar for playing Fanny Brice.", hint1Movie: 0, hint2: "Another is a classic romance between a Jewish activist and a WASP student.", hint2Movie: 1 , filmography: ["Funny Girl", "The Way We Were", "A Star Is Born", "Yentl", "What's Up Doc?", "Hello Dolly!", "On a Clear Day You Can See Forever", "The Owl and the Pussycat", "Up the Sandbox", "For Pete's Sake", "Funny Lady", "All Night Long", "Nuts", "The Prince of Tides", "The Mirror Has Two Faces", "Meet the Fockers", "Little Fockers", "The Guilt Trip"] },
  { actor: "Glenn Close", movies: ["Fatal Attraction", "Dangerous Liaisons", "The World According to Garp", "Hillbilly Elegy", "Albert Nobbs"], hint1: "One film features the iconic boiling bunny scene.", hint1Movie: 0, hint2: "Another is a period drama about aristocratic seduction and betrayal.", hint2Movie: 1 , filmography: ["Fatal Attraction", "Dangerous Liaisons", "The World According to Garp", "Hillbilly Elegy", "Albert Nobbs", "The Big Chill", "The Natural", "Jagged Edge", "Maxie", "Immediate Family", "Reversal of Fortune", "Hamlet", "Hook", "The Paper", "Mary Reilly", "Mars Attacks!", "Air Force One", "101 Dalmatians"] },
  { actor: "Winona Ryder", movies: ["Edward Scissorhands", "Heathers", "Little Women", "Girl Interrupted", "Reality Bites"], hint1: "One film features her as the love interest of a man with scissors for hands.", hint1Movie: 0, hint2: "Another is a dark high school satire about popularity and murder.", hint2Movie: 1 , filmography: ["Edward Scissorhands", "Heathers", "Little Women", "Girl Interrupted", "Reality Bites", "Beetlejuice", "Great Balls of Fire!", "Mermaids", "Bram Stoker's Dracula", "The Age of Innocence", "The House of the Spirits", "How to Make an American Quilt", "The Crucible", "Alien Resurrection", "Celebrity", "Lost Souls", "Autumn in New York", "Black Swan"] },
  { actor: "Sharon Stone", movies: ["Basic Instinct", "Casino", "The Quick and the Dead", "Sphere", "Lovelace"], hint1: "One film features one of the most analyzed interrogation scenes in cinema history.", hint1Movie: 0, hint2: "Another features her as a sharpshooter in a revisionist Western.", hint2Movie: 2 , filmography: ["Basic Instinct", "Casino", "The Quick and the Dead", "Sphere", "Lovelace", "Total Recall", "Above the Law", "He Said She Said", "Year of the Gun", "Sliver", "The Specialist", "Diabolique", "Last Dance", "Gloria", "Simpatico", "Picking Up the Pieces", "Broken Flowers", "Alpha Dog"] },
  { actor: "Meg Ryan", movies: ["When Harry Met Sally", "Sleepless in Seattle", "You've Got Mail", "City of Angels", "Courage Under Fire"], hint1: "One film features the famous fake orgasm scene in a deli.", hint1Movie: 0, hint2: "Another pairs her with Tom Hanks in an email pen-pal romance.", hint2Movie: 2 , filmography: ["When Harry Met Sally", "Sleepless in Seattle", "You've Got Mail", "City of Angels", "Courage Under Fire", "Top Gun", "Innerspace", "D.O.A.", "The Presidio", "Joe Versus the Volcano", "The Doors", "Prelude to a Kiss", "Flesh and Bone", "I.Q.", "Restoration", "Addicted to Love", "Anastasia", "Hurlyburly"] },
  { actor: "Geena Davis", movies: ["Thelma & Louise", "Beetlejuice", "The Accidental Tourist", "A League of Their Own", "The Long Kiss Goodnight"], hint1: "One road trip film ends with a famous cliff drive.", hint1Movie: 0, hint2: "Another is a comedy about the afterlife with Michael Keaton.", hint2Movie: 1 , filmography: ["Thelma & Louise", "Beetlejuice", "The Accidental Tourist", "A League of Their Own", "The Long Kiss Goodnight", "Fletch", "Transylvania 6-5000", "The Fly", "Earth Girls Are Easy", "Quick Change", "Hero", "Angie", "Speechless", "Stuart Little", "Stuart Little 2", "Accidents Happen", "Marley & Me", "The Exorcist: Believer"] },
  { actor: "Demi Moore", movies: ["Ghost", "A Few Good Men", "Indecent Proposal", "G.I. Jane", "About Last Night"], hint1: "One film features a famous pottery wheel scene set to Unchained Melody.", hint1Movie: 0, hint2: "Another features Robert Redford making a million-dollar proposition.", hint2Movie: 2 , filmography: ["Ghost", "A Few Good Men", "Indecent Proposal", "G.I. Jane", "About Last Night", "St. Elmo's Fire", "One Crazy Summer", "Wisdom", "The Seventh Sign", "We're No Angels", "Mortal Thoughts", "The Butcher's Wife", "Striptease", "The Juror", "Deconstructing Harry", "Passion of Mind", "Charlie's Angels: Full Throttle", "Margin Call"] },
  { actor: "Jessica Lange", movies: ["Tootsie", "Frances", "Blue Sky", "Music Box", "Cape Fear"], hint1: "One film features her as an actress opposite Dustin Hoffman in drag.", hint1Movie: 0, hint2: "Another is about a woman fighting to clear her accused war criminal father.", hint2Movie: 3 , filmography: ["Tootsie", "Frances", "Blue Sky", "Music Box", "Cape Fear", "King Kong", "All That Jazz", "Country", "Sweet Dreams", "Crimes of the Heart", "Far North", "Men Don't Leave", "Night and the City", "Rob Roy", "A Thousand Acres", "Hush", "Titus", "Broken Flowers"] },
  { actor: "Shirley MacLaine", movies: ["The Apartment", "Irma la Douce", "Sweet Charity", "Terms of Endearment", "Steel Magnolias"], hint1: "One film is a Billy Wilder comedy about an office worker who lends out his apartment.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing a mother facing loss.", hint2Movie: 3 , filmography: ["The Apartment", "Irma la Douce", "Sweet Charity", "Terms of Endearment", "Steel Magnolias", "Around the World in 80 Days", "The Trouble with Harry", "Some Came Running", "Ask Any Girl", "Career", "The Children's Hour", "Two for the Seesaw", "Gambit", "Two Mules for Sister Sara", "The Turning Point", "Being There", "Loving Couples", "Postcards from the Edge"] },
  { actor: "Kathy Bates", movies: ["Misery", "Fried Green Tomatoes", "About Schmidt", "Primary Colors", "The Waterboy"], hint1: "One film earned her an Oscar for playing an obsessed fan who kidnaps her favorite author.", hint1Movie: 0, hint2: "Another features her iconic car park scene and the word Towanda!", hint2Movie: 1 , filmography: ["Misery", "Fried Green Tomatoes", "About Schmidt", "Primary Colors", "The Waterboy", "Dolores Claiborne", "Titanic", "The Weight of Water", "Dragonfly", "Love Liza", "P.S. Your Cat Is Dead!", "Around the World in 80 Days", "Failure to Launch", "Fred Claus", "The Day the Earth Stood Still", "Valentine's Day", "Midnight in Paris", "Tammy"] },
  { actor: "Frances McDormand", movies: ["Fargo", "Three Billboards Outside Ebbing Missouri", "Nomadland", "Burn After Reading", "Raising Arizona"], hint1: "One film earned her an Oscar for playing a pregnant Minnesota police chief.", hint1Movie: 0, hint2: "Another earned her a second Oscar as a grieving mother taking on a police department.", hint2Movie: 1 , filmography: ["Fargo", "Three Billboards Outside Ebbing Missouri", "Nomadland", "Burn After Reading", "Raising Arizona", "Blood Simple", "Darkman", "The Butcher's Wife", "Short Cuts", "The Good Old Boys", "Lone Star", "Primal Fear", "Hidden Agenda", "Almost Famous", "The Man Who Wasn't There", "Laurel Canyon", "Something's Gotta Give", "North Country"] },
  { actor: "Sissy Spacek", movies: ["Carrie", "Coal Miner's Daughter", "Badlands", "Missing", "In the Bedroom"], hint1: "One film is a Stephen King horror story about a telekinetic teenager.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing country singer Loretta Lynn.", hint2Movie: 1 , filmography: ["Carrie", "Coal Miner's Daughter", "Badlands", "Missing", "In the Bedroom", "Raggedy Man", "The River", "Marie", "Crimes of the Heart", "JFK", "The Grass Harp", "Affliction", "Blast from the Past", "The Straight Story", "Tuck Everlasting", "A Home at the End of the World", "North Country", "Four Christmases"] },
  { actor: "Jamie Lee Curtis", movies: ["Halloween", "A Fish Called Wanda", "True Lies", "Everything Everywhere All at Once", "Trading Places"], hint1: "One film launched the slasher genre and made her a scream queen.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing a fanny-pack-wearing IRS agent.", hint2Movie: 3 , filmography: ["Halloween", "A Fish Called Wanda", "True Lies", "Everything Everywhere All at Once", "Trading Places", "The Fog", "Terror Train", "Prom Night", "Road Games", "Halloween II", "Love Letters", "Grandview USA", "Perfect", "Amazing Grace and Chuck", "Blue Steel", "My Girl", "Forever Young", "Mother's Boys"] },
  { actor: "Drew Barrymore", movies: ["E.T. the Extra-Terrestrial", "Scream", "The Wedding Singer", "Never Been Kissed", "50 First Dates"], hint1: "One film has her playing a little girl who befriends an alien.", hint1Movie: 0, hint2: "Another is an Adam Sandler romantic comedy set in Hawaii.", hint2Movie: 4 , filmography: ["E.T. the Extra-Terrestrial", "Scream", "The Wedding Singer", "Never Been Kissed", "50 First Dates", "Firestarter", "Irreconcilable Differences", "Cat's Eye", "Poison Ivy", "Guncrazy", "Motorama", "Bad Girls", "Batman Forever", "Boys on the Side", "Everyone Says I Love You", "Wishful Thinking", "Best Men", "Ever After"] },
  { actor: "Cameron Diaz", movies: ["The Mask", "There's Something About Mary", "Being John Malkovich", "Charlie's Angels", "Vanilla Sky"], hint1: "One film features her opposite Jim Carrey as a lovestruck woman.", hint1Movie: 0, hint2: "Another is a surreal film about a portal into a famous actor's mind.", hint2Movie: 2 , filmography: ["The Mask", "There's Something About Mary", "Being John Malkovich", "Charlie's Angels", "Vanilla Sky", "My Best Friend's Wedding", "Fear and Loathing in Las Vegas", "Very Bad Things", "Any Given Sunday", "The Invisible Circus", "The Sweetest Thing", "Gangs of New York", "In Her Shoes", "The Holiday", "What Happens in Vegas", "My Sister's Keeper", "Knight and Day", "Bad Teacher"] },
  // 2000s-Present
  { actor: "Robert Downey Jr.", movies: ["Iron Man", "Chaplin", "Tropic Thunder", "Kiss Kiss Bang Bang", "Oppenheimer"], hint1: "One film launched the entire Marvel Cinematic Universe.", hint1Movie: 0, hint2: "Another is a biopic about the silent film legend Charlie Chaplin.", hint2Movie: 1 , filmography: ["Iron Man", "Chaplin", "Tropic Thunder", "Kiss Kiss Bang Bang", "Oppenheimer", "Less Than Zero", "Weird Science", "Back to School", "Johnny Be Good", "Soapdish", "Short Cuts", "Natural Born Killers", "Only You", "Richard III", "Wonder Boys", "The Singing Detective", "A Scanner Darkly", "Zodiac"] },
  { actor: "Cillian Murphy", movies: ["Oppenheimer", "28 Days Later", "Batman Begins", "A Quiet Place Part II", "The Wind That Shakes the Barley"], hint1: "One film is a Christopher Nolan epic about the father of the atomic bomb.", hint1Movie: 0, hint2: "Another is a low-budget British horror film about a rage virus.", hint2Movie: 1 , filmography: ["Oppenheimer", "28 Days Later", "Batman Begins", "A Quiet Place Part II", "The Wind That Shakes the Barley", "Red Eye", "Breakfast on Pluto", "Sunshine", "The Dark Knight", "Inception", "Tron: Legacy", "In Time", "Broken", "Transcendence", "In the Heart of the Sea", "Anthropoid", "Dunkirk", "Free Fire"] },
  { actor: "Timothée Chalamet", movies: ["Call Me by Your Name", "Little Women", "Lady Bird", "Dune", "Beautiful Boy"], hint1: "One film is a sun-drenched Italian romance between two young men.", hint1Movie: 0, hint2: "Another is a sci-fi epic set on a desert planet.", hint2Movie: 3 , filmography: ["Call Me by Your Name", "Little Women", "Lady Bird", "Dune", "Beautiful Boy", "Interstellar", "Men Women & Children", "Miss Stevens", "Hot Summer Nights", "The King", "The French Dispatch", "Dune: Part Two", "Wonka", "A Complete Unknown", "Bones and All", "Don't Look Up", "Hostiles", "The Bones"] },
  { actor: "Ryan Gosling", movies: ["La La Land", "Drive", "The Notebook", "Half Nelson", "Blade Runner 2049"], hint1: "One film is a musical love story set in Los Angeles.", hint1Movie: 0, hint2: "Another is a moody action film where he plays a getaway driver.", hint2Movie: 1 , filmography: ["La La Land", "Drive", "The Notebook", "Half Nelson", "Blade Runner 2049", "Lars and the Real Girl", "Fracture", "Blue Valentine", "Crazy Stupid Love", "The Ides of March", "The Place Beyond the Pines", "Gangster Squad", "Only God Forgives", "The Big Short", "The Nice Guys", "First Man", "Barbie", "The Fall Guy"] },
  { actor: "Keanu Reeves", movies: ["The Matrix", "John Wick", "Speed", "Point Break", "Constantine"], hint1: "One film introduced the concepts of the red pill and blue pill.", hint1Movie: 0, hint2: "Another features a bus that cannot slow below 50 mph.", hint2Movie: 2 , filmography: ["The Matrix", "John Wick", "Speed", "Point Break", "Constantine", "Bill & Ted's Excellent Adventure", "Dangerous Liaisons", "My Own Private Idaho", "Bram Stoker's Dracula", "Much Ado About Nothing", "Little Buddha", "Johnny Mnemonic", "A Walk in the Clouds", "The Devil's Advocate", "The Replacements", "Sweet November", "Something's Gotta Give", "The Lake House"] },
  { actor: "Chris Evans", movies: ["Captain America: The First Avenger", "Knives Out", "Snowpiercer", "Scott Pilgrim vs. the World", "Gifted"], hint1: "One film is a WWII-era superhero origin story.", hint1Movie: 0, hint2: "Another is a Rian Johnson murder mystery at a mansion.", hint2Movie: 1 , filmography: ["Captain America: The First Avenger", "Knives Out", "Snowpiercer", "Scott Pilgrim vs. the World", "Gifted", "Not Another Teen Movie", "Cellular", "Fantastic Four", "London", "The Nanny Diaries", "Sunshine", "Street Kings", "Push", "The Losers", "Captain America: The Winter Soldier", "Avengers: Infinity War", "Avengers: Endgame", "The Gray Man"] },
  { actor: "Ryan Reynolds", movies: ["Deadpool", "Free Guy", "The Proposal", "Buried", "The Adam Project"], hint1: "One film is a fourth-wall-breaking Marvel antihero story.", hint1Movie: 0, hint2: "Another has him playing an NPC who becomes self-aware inside a video game.", hint2Movie: 1 , filmography: ["Deadpool", "Free Guy", "The Proposal", "Buried", "The Adam Project", "Van Wilder", "Blade: Trinity", "Just Friends", "Waiting...", "X-Men Origins: Wolverine", "The Amityville Horror", "Definitely Maybe", "Adventureland", "Paper Man", "Green Lantern", "Safe House", "R.I.P.D.", "Woman in Gold"] },
  { actor: "Hugh Jackman", movies: ["Logan", "The Prestige", "Les Miserables", "The Greatest Showman", "Prisoners"], hint1: "One film is a gritty farewell to the Wolverine character.", hint1Movie: 0, hint2: "Another is based on a beloved Victor Hugo musical.", hint2Movie: 2 , filmography: ["Logan", "The Prestige", "Les Miserables", "The Greatest Showman", "Prisoners", "X-Men", "Kate & Leopold", "Van Helsing", "The Fountain", "The Wolverine", "Australia", "The Front Runner", "Bad Education", "The Son", "The Music Man", "Reminiscence", "The Dark Tower", "Okja"] },
  { actor: "Christian Bale", movies: ["The Dark Knight", "American Psycho", "The Fighter", "Vice", "Ford v Ferrari"], hint1: "One film features one of cinema's greatest villain performances.", hint1Movie: 0, hint2: "Another had him drastically lose weight to play a delusional New York executive.", hint2Movie: 1 , filmography: ["The Dark Knight", "American Psycho", "The Fighter", "Vice", "Ford v Ferrari", "Empire of the Sun", "Newsies", "Swing Kids", "Little Women", "The Machinist", "Batman Begins", "The Prestige", "Rescue Dawn", "I'm Not There", "3:10 to Yuma", "Public Enemies", "The Dark Knight Rises", "Out of the Furnace"] },
  { actor: "Heath Ledger", movies: ["The Dark Knight", "Brokeback Mountain", "10 Things I Hate About You", "A Knight's Tale", "Monster's Ball"], hint1: "One film features his iconic posthumously Oscar-winning villain performance.", hint1Movie: 0, hint2: "Another is a touching romance between two cowboys.", hint2Movie: 1 , filmography: ["The Dark Knight", "Brokeback Mountain", "10 Things I Hate About You", "A Knight's Tale", "Monster's Ball", "Two Hands", "The Patriot", "The Four Feathers", "Lords of Dogtown", "Casanova", "Candy", "I'm Not There", "The Imaginarium of Doctor Parnassus", "Ned Kelly", "Roar", "Paws", "Blackrock", "Batman Begins"] },
  { actor: "Javier Bardem", movies: ["No Country for Old Men", "Biutiful", "The Sea Inside", "Vicky Cristina Barcelona", "Skyfall"], hint1: "One film features one of cinema's scariest villains with a cattle gun.", hint1Movie: 0, hint2: "Another is about a terminally ill man who wants the right to die.", hint2Movie: 2 , filmography: ["No Country for Old Men", "Biutiful", "The Sea Inside", "Vicky Cristina Barcelona", "Skyfall", "Before Night Falls", "The Dancer Upstairs", "Collateral", "Love in the Time of Cholera", "Eat Pray Love", "Pirates of the Caribbean: On Stranger Tides", "To the Wonder", "The Counselor", "Spectre", "Loving Pablo", "Murder on the Orient Express", "Dune", "Being the Ricardos"] },
  { actor: "Philip Seymour Hoffman", movies: ["Capote", "Boogie Nights", "The Master", "Charlie Wilson's War", "Almost Famous"], hint1: "One film earned him an Oscar for playing author Truman Capote.", hint1Movie: 0, hint2: "Another is set in the 1970s adult film industry.", hint2Movie: 1 , filmography: ["Capote", "Boogie Nights", "The Master", "Charlie Wilson's War", "Almost Famous", "Scent of a Woman", "Hard Eight", "Magnolia", "The Talented Mr. Ripley", "Flawless", "State and Main", "Punch-Drunk Love", "Cold Mountain", "Owning Mahowny", "Along Came Polly", "Mission: Impossible III", "Before the Devil Knows You're Dead", "Synecdoche New York"] },
  { actor: "Idris Elba", movies: ["Beasts of No Nation", "Mandela: Long Walk to Freedom", "Thor", "The Suicide Squad", "Zootopia"], hint1: "One film is a devastating portrayal of a child soldier in Africa.", hint1Movie: 0, hint2: "Another is a biopic about South Africa's most famous leader.", hint2Movie: 1 , filmography: ["Beasts of No Nation", "Mandela: Long Walk to Freedom", "Thor", "The Suicide Squad", "Zootopia", "Prometheus", "Pacific Rim", "Jungle Book", "Finding Dory", "Star Trek Beyond", "The Dark Tower", "Avengers: Infinity War", "Cats", "Concrete Cowboy", "The Harder They Fall", "Three Thousand Years of Longing", "Luther: The Fallen Sun", "Hijack"] },
  { actor: "Michael Fassbender", movies: ["12 Years a Slave", "Shame", "Hunger", "Steve Jobs", "X-Men: First Class"], hint1: "One film has him playing a brutally cruel plantation owner.", hint1Movie: 0, hint2: "Another is a nearly silent film about an IRA hunger strike.", hint2Movie: 2 , filmography: ["12 Years a Slave", "Shame", "Hunger", "Steve Jobs", "X-Men: First Class", "Fish Tank", "Jonah Hex", "Jane Eyre", "Prometheus", "A Dangerous Method", "Haywire", "X-Men: Days of Future Past", "Frank", "Slow West", "Macbeth", "Assassin's Creed", "Song to Song", "Alien: Covenant"] },
  { actor: "Andrew Garfield", movies: ["The Social Network", "Hacksaw Ridge", "Silence", "tick tick BOOM!", "99 Homes"], hint1: "One film is about the founding of Facebook.", hint1Movie: 0, hint2: "Another is about a WWII soldier who refuses to carry a weapon.", hint2Movie: 1 , filmography: ["The Social Network", "Hacksaw Ridge", "Silence", "tick tick BOOM!", "99 Homes", "The Amazing Spider-Man", "The Amazing Spider-Man 2", "Never Let Me Go", "Red Riding", "The Imaginarium of Doctor Parnassus", "Lions for Lambs", "Boy A", "Under the Mountain Trolls", "Breathe", "Mainstream", "The Eyes of Tammy Faye", "Spider-Man: No Way Home", "We Live in Time"] },
  { actor: "Benedict Cumberbatch", movies: ["The Imitation Game", "Doctor Strange", "The Power of the Dog", "1917", "Atonement"], hint1: "One film is a biopic about codebreaker Alan Turing.", hint1Movie: 0, hint2: "Another is a slow-burn Western about a menacing rancher.", hint2Movie: 2 , filmography: ["The Imitation Game", "Doctor Strange", "The Power of the Dog", "1917", "Atonement", "Star Trek Into Darkness", "August: Osage County", "The Hobbit", "12 Years a Slave", "Black Mass", "Zoolander 2", "Doctor Strange in the Multiverse of Madness", "Avengers: Infinity War", "Avengers: Endgame", "The Current War", "Hamlet", "Stuart Little", "Godzilla"] },
  { actor: "Jake Gyllenhaal", movies: ["Brokeback Mountain", "Nightcrawler", "Donnie Darko", "Zodiac", "Prisoners"], hint1: "One film is a cult sci-fi drama about a teenager haunted by a man in a rabbit suit.", hint1Movie: 2, hint2: "Another features him as a morally bankrupt freelance crime journalist.", hint2Movie: 1 , filmography: ["Brokeback Mountain", "Nightcrawler", "Donnie Darko", "Zodiac", "Prisoners", "October Sky", "The Good Girl", "The Day After Tomorrow", "Jarhead", "Proof", "Rendition", "Brothers", "Love & Other Drugs", "Source Code", "End of Watch", "Enemy", "Demolition", "Okja"] },
  { actor: "Michael B. Jordan", movies: ["Fruitvale Station", "Creed", "Black Panther", "Just Mercy", "Without Remorse"], hint1: "One film is a true story about the last day in the life of Oscar Grant.", hint1Movie: 0, hint2: "Another is a Rocky continuation about Apollo Creed's son.", hint2Movie: 1 , filmography: ["Fruitvale Station", "Creed", "Black Panther", "Just Mercy", "Without Remorse", "Chronicle", "That Awkward Moment", "Creed II", "Black Panther: Wakanda Forever", "Journal for Jordan", "Raising Dion", "The Wire", "Hardball", "All My Children", "Methuselah", "Parenthood", "The Assistants", "Raising Dion"] },
  { actor: "Mahershala Ali", movies: ["Moonlight", "Green Book", "True Grit", "The Place Beyond the Pines", "Alita: Battle Angel"], hint1: "One film earned him an Oscar for playing a drug dealer who mentors a troubled boy.", hint1Movie: 0, hint2: "Another earned him a second Oscar for playing a jazz musician in a 1960s road trip film.", hint2Movie: 1 , filmography: ["Moonlight", "Green Book", "True Grit", "The Place Beyond the Pines", "Alita: Battle Angel", "Hunger Games: Mockingjay Part 1", "The Hunger Games: Mockingjay Part 2", "Free State of Jones", "Hidden Figures", "House of Cards", "The Curious Case of Benjamin Button", "Predators", "Four Brothers", "Luke Cage", "Kicks", "The Sisterhood of Night", "Static", "Kicks"] },
  { actor: "Daniel Kaluuya", movies: ["Get Out", "Judas and the Black Messiah", "Queen & Slim", "Widows", "Sicario: Day of the Soldado"], hint1: "One film is Jordan Peele's Oscar-winning horror about racism.", hint1Movie: 0, hint2: "Another earned him an Oscar for playing Black Panther leader Fred Hampton.", hint2Movie: 1 , filmography: ["Get Out", "Judas and the Black Messiah", "Queen & Slim", "Widows", "Sicario: Day of the Soldado", "Skins", "Johnny English Reborn", "Kick-Ass 2", "Posh", "Psychoville", "Doctor Who", "Black Mirror: Fifteen Million Merits", "Noughts and Crosses", "Barbie", "Spider-Man: Across the Spider-Verse", "Nope", "Bullet Train"] },
  { actor: "Liam Neeson", movies: ["Schindler's List", "Taken", "Michael Collins", "Rob Roy", "Batman Begins"], hint1: "One Spielberg film is the definitive Holocaust drama.", hint1Movie: 0, hint2: "Another is an action thriller where he searches for his kidnapped daughter.", hint2Movie: 1 , filmography: ["Schindler's List", "Taken", "Michael Collins", "Rob Roy", "Batman Begins", "Excalibur", "The Bounty", "A Prayer for the Dying", "The Mission", "Suspect", "High Spirits", "The Dead Pool", "Next of Kin", "Darkman", "Ethan Frome", "Husbands and Wives", "Leap of Faith", "Nell"] },
  { actor: "Gary Oldman", movies: ["Darkest Hour", "Tinker Tailor Soldier Spy", "Leon: The Professional", "JFK", "True Romance"], hint1: "One film earned him an Oscar for playing Winston Churchill.", hint1Movie: 0, hint2: "Another is a spy thriller based on a John le Carre novel.", hint2Movie: 1 , filmography: ["Darkest Hour", "Tinker Tailor Soldier Spy", "Leon: The Professional", "JFK", "True Romance", "Sid and Nancy", "Prick Up Your Ears", "Track 29", "Criminal Law", "State of Grace", "Rosencrantz and Guildenstern Are Dead", "Bram Stoker's Dracula", "Immortal Beloved", "Murder in the First", "The Fifth Element", "Air Force One", "Lost in Space", "Hannibal"] },
  { actor: "Jeff Goldblum", movies: ["Jurassic Park", "The Fly", "Independence Day", "The Grand Budapest Hotel", "Thor: Ragnarok"], hint1: "One film features him as a scientist who genetically reconstructs dinosaurs.", hint1Movie: 0, hint2: "Another is a 1986 horror film about a scientist who merges with a fly.", hint2Movie: 1 , filmography: ["Jurassic Park", "The Fly", "Independence Day", "The Grand Budapest Hotel", "Thor: Ragnarok", "Annie Hall", "Invasion of the Body Snatchers", "The Big Chill", "The Adventures of Buckaroo Banzai", "Silverado", "Into the Night", "Earth Girls Are Easy", "The Player", "Deep Cover", "Powder", "The Lost World: Jurassic Park", "Holy Man", "One of the Hollywood Ten"] },
  { actor: "Steve Carell", movies: ["The 40-Year-Old Virgin", "Little Miss Sunshine", "Foxcatcher", "The Big Short", "Beautiful Boy"], hint1: "One film launched his film comedy career.", hint1Movie: 0, hint2: "Another earned him an Oscar nomination for playing a creepy wrestling coach.", hint2Movie: 2 , filmography: ["The 40-Year-Old Virgin", "Little Miss Sunshine", "Foxcatcher", "The Big Short", "Beautiful Boy", "Bruce Almighty", "Anchorman", "Evan Almighty", "Dan in Real Life", "Get Smart", "Date Night", "Despicable Me", "Crazy Stupid Love", "The Incredible Burt Wonderstone", "Seeking a Friend for the End of the World", "Alexander and the Terrible Horrible No Good Very Bad Day", "Cafe Society", "Battle of the Sexes"] },
  { actor: "Jim Carrey", movies: ["The Truman Show", "Eternal Sunshine of the Spotless Mind", "Ace Ventura: Pet Detective", "The Mask", "Man on the Moon"], hint1: "One film is a sci-fi drama about a man whose entire life is a TV show.", hint1Movie: 0, hint2: "Another is a Charlie Kaufman love story about erasing memories.", hint2Movie: 1 , filmography: ["The Truman Show", "Eternal Sunshine of the Spotless Mind", "Ace Ventura: Pet Detective", "The Mask", "Man on the Moon", "Dumb and Dumber", "Batman Forever", "The Cable Guy", "Liar Liar", "How the Grinch Stole Christmas", "Me Myself & Irene", "The Majestic", "Bruce Almighty", "Lemony Snicket's A Series of Unfortunate Events", "Fun with Dick and Jane", "Yes Man", "I Love You Phillip Morris", "Mr. Popper's Penguins"] },
  { actor: "Colin Farrell", movies: ["In Bruges", "The Banshees of Inisherin", "The Lobster", "Phone Booth", "Miami Vice"], hint1: "One film is a darkly comic tale about two hitmen hiding out in Belgium.", hint1Movie: 0, hint2: "Another earned him a Golden Globe for playing a man abandoned by his best friend.", hint2Movie: 1 , filmography: ["In Bruges", "The Banshees of Inisherin", "The Lobster", "Phone Booth", "Miami Vice", "Tigerland", "American Outlaws", "Hart's War", "Minority Report", "Daredevil", "S.W.A.T.", "Intermission", "Alexander", "A Home at the End of the World", "Ask the Dust", "Pride & Glory", "Cassandra's Dream", "Ondine"] },
  { actor: "Ethan Hawke", movies: ["Boyhood", "Before Sunrise", "Training Day", "Gattaca", "First Reformed"], hint1: "One film was shot over 12 years to capture a boy growing up.", hint1Movie: 0, hint2: "Another is a romantic drama about two strangers walking through Vienna.", hint2Movie: 1 , filmography: ["Boyhood", "Before Sunrise", "Training Day", "Gattaca", "First Reformed", "Dead Poets Society", "Alive", "Reality Bites", "Before Sunset", "Taking Lives", "Before Midnight", "The Purge", "Sinister", "Predestination", "Born to Be Blue", "Maggie's Plan", "Maudie", "Blaze"] },
  { actor: "Mark Ruffalo", movies: ["Spotlight", "The Kids Are All Right", "Zodiac", "Foxcatcher", "Eternal Sunshine of the Spotless Mind"], hint1: "One film is about journalists who uncovered the Catholic Church abuse scandal.", hint1Movie: 0, hint2: "Another is about a couple whose donor-conceived children track them down.", hint2Movie: 1 , filmography: ["Spotlight", "The Kids Are All Right", "Zodiac", "Foxcatcher", "Eternal Sunshine of the Spotless Mind", "You Can Count on Me", "XX/XY", "In the Cut", "We Don't Live Here Anymore", "Collateral", "All the King's Men", "Blindness", "What Doesn't Kill You", "The Brothers Bloom", "Shutter Island", "The Avengers", "Dark Waters", "I Know This Much Is True"] },
  { actor: "Paul Mescal", movies: ["Aftersun", "All of Us Strangers", "Carmen", "Gladiator II", "Normal People"], hint1: "One film is a devastating portrait of a father-daughter vacation.", hint1Movie: 0, hint2: "Another is a ghost story about a man reconnecting with his childhood self.", hint2Movie: 1 , filmography: ["Aftersun", "All of Us Strangers", "Carmen", "Gladiator II", "Normal People", "The Lost Daughter", "God's Creatures", "Strangers", "Strange Darling", "Hamish & Andy", "Ordinary Love", "Bringing Up Baby", "He Who Dares", "Strangers: Chapter 1", "Pursuit of Happiness"] },
  { actor: "Austin Butler", movies: ["Elvis", "Once Upon a Time in Hollywood", "The Dead Don't Die", "The Bikeriders", "Dune: Part Two"], hint1: "One film earned him an Oscar nomination for an immersive portrayal of the King of Rock.", hint1Movie: 0, hint2: "Another is a Jeff Nichols drama about the history of motorcycle culture.", hint2Movie: 3 , filmography: ["Elvis", "Once Upon a Time in Hollywood", "The Dead Don't Die", "The Bikeriders", "Dune: Part Two", "Switched at Birth", "The Carrie Diaries", "Zoey 101", "Aliens in the Attic", "The Bling Ring", "Lovestruck: The Musical", "Arrow", "Masters of Sex", "The Shannara Chronicles", "Station 19"] },
  { actor: "Brendan Fraser", movies: ["The Whale", "George of the Jungle", "The Mummy", "Gods and Monsters", "Bedazzled"], hint1: "One film earned him an Oscar for playing a reclusive man dealing with obesity.", hint1Movie: 0, hint2: "Another is a blockbuster adventure about an undead Egyptian priest.", hint2Movie: 2 , filmography: ["The Whale", "George of the Jungle", "The Mummy", "Gods and Monsters", "Bedazzled", "Encino Man", "School Ties", "With Honors", "Airheads", "The Scout", "The Mummy Returns", "Journey to the Center of the Earth", "Extraordinary Measures", "Furry Vengeance", "Crash", "Looney Tunes: Back in Action", "Inkheart", "Doom Patrol"] },
  { actor: "Emma Stone", movies: ["La La Land", "The Favourite", "Poor Things", "Easy A", "Birdman"], hint1: "One film earned her an Oscar for playing an aspiring actress in Los Angeles.", hint1Movie: 0, hint2: "Another earned her a second Oscar for a surreal period fantasy.", hint2Movie: 2 , filmography: ["La La Land", "The Favourite", "Poor Things", "Easy A", "Birdman", "Superbad", "The Rocker", "Ghosts of Girlfriends Past", "Zombieland", "The House Bunny", "Crazy Stupid Love", "The Help", "The Amazing Spider-Man", "Magic in the Moonlight", "Irrational Man", "Aloha", "Battle of the Sexes", "Maniac"] },
  { actor: "Jennifer Lawrence", movies: ["Silver Linings Playbook", "Winter's Bone", "American Hustle", "Joy", "The Hunger Games"], hint1: "One film earned her an Oscar for playing a young widow in a dance competition.", hint1Movie: 0, hint2: "Another features her as a teenager searching for her missing father in the Ozarks.", hint2Movie: 1 , filmography: ["Silver Linings Playbook", "Winter's Bone", "American Hustle", "Joy", "The Hunger Games", "X-Men: First Class", "Like Crazy", "The Beaver", "X-Men: Days of Future Past", "Serena", "Passengers", "mother!", "Red Sparrow", "Dark Phoenix", "Don't Look Up", "Causeway", "No Hard Feelings", "Mob Land"] },
  { actor: "Saoirse Ronan", movies: ["Atonement", "Brooklyn", "Lady Bird", "Little Women", "Mary Queen of Scots"], hint1: "One film features her as a teenager who tells a devastating lie.", hint1Movie: 0, hint2: "Another is about an Irish immigrant torn between her homeland and a new life in America.", hint2Movie: 1 , filmography: ["Atonement", "Brooklyn", "Lady Bird", "Little Women", "Mary Queen of Scots", "The Lovely Bones", "Hanna", "The Way Back", "Byzantium", "How I Live Now", "The Grand Budapest Hotel", "Unfinished Song", "Lost River", "Chesil Beach", "The Seagull", "Ammonite", "See How They Run", "The Outrun"] },
  { actor: "Margot Robbie", movies: ["The Wolf of Wall Street", "I Tonya", "Once Upon a Time in Hollywood", "Bombshell", "Babylon"], hint1: "One film is about the disgraced figure skater Tonya Harding.", hint1Movie: 1, hint2: "Another is a Damien Chazelle film about early Hollywood excess.", hint2Movie: 4 , filmography: ["The Wolf of Wall Street", "I Tonya", "Once Upon a Time in Hollywood", "Bombshell", "Babylon", "Focus", "The Legend of Tarzan", "Suicide Squad", "Mary Queen of Scots", "Peter Rabbit", "Birds of Prey", "Dreamland", "The Suicide Squad", "Barbie", "Saltburn", "Asteroid City", "Wicked Little Letters"] },
  { actor: "Carey Mulligan", movies: ["An Education", "Drive", "Promising Young Woman", "Shame", "Never Let Me Go"], hint1: "One film earned her an Oscar nomination for playing a schoolgirl seduced by an older man.", hint1Movie: 0, hint2: "Another is a MeToo revenge thriller where she plays a woman with a secret plan.", hint2Movie: 2 , filmography: ["An Education", "Drive", "Promising Young Woman", "Shame", "Never Let Me Go", "Pride & Prejudice", "Brothers", "Wall Street: Money Never Sleeps", "Extremely Loud and Incredibly Close", "The Great Gatsby", "Inside Llewyn Davis", "Far from the Madding Crowd", "Suffragette", "Mudbound", "Wildlife", "The Dig", "Maestro", "She Said"] },
  { actor: "Florence Pugh", movies: ["Midsommar", "Little Women", "Black Widow", "Oppenheimer", "Lady Macbeth"], hint1: "One film is a disturbing folk horror story set in a Swedish village.", hint1Movie: 0, hint2: "Another is Greta Gerwig's adaptation of the classic Alcott novel.", hint2Movie: 1 , filmography: ["Midsommar", "Little Women", "Black Widow", "Oppenheimer", "Lady Macbeth", "The Falling", "Outlaw King", "Fighting with My Family", "Malevolent", "The Little Drummer Girl", "Avengers: Endgame", "Don't Worry Darling", "The Wonder", "Dolls & Angels", "A Good Person", "Dune: Part Two", "We Live in Time"] },
  { actor: "Zendaya", movies: ["Dune", "The Greatest Showman", "Malcolm & Marie", "Spider-Man: Homecoming", "Challengers"], hint1: "One film is a sci-fi epic based on Frank Herbert's novel.", hint1Movie: 0, hint2: "Another is a black-and-white relationship drama filmed during a single night.", hint2Movie: 2 , filmography: ["Dune", "The Greatest Showman", "Malcolm & Marie", "Spider-Man: Homecoming", "Challengers", "Shake It Up", "Zapped!", "Spider-Man: Far From Home", "The Space Between", "Dune: Part Two", "K.C. Undercover", "Spider-Man: No Way Home", "Transformers: Rise of the Beasts", "A White Lie"] },
  { actor: "Anya Taylor-Joy", movies: ["The Witch", "Split", "Emma", "Last Night in Soho", "The Menu"], hint1: "One film is a disturbing folk horror set in 17th-century New England.", hint1Movie: 0, hint2: "Another is a satirical horror film set in an exclusive restaurant.", hint2Movie: 4 , filmography: ["The Witch", "Split", "Emma", "Last Night in Soho", "The Menu", "Morgan", "Thoroughbreds", "Marrowbone", "Glass", "Radioactive", "New Mutants", "Here Are the Young Men", "Herself", "Furiosa", "Dune: Prophecy", "Peaky Blinders", "The Queen's Gambit"] },
  { actor: "Cynthia Erivo", movies: ["Harriet", "Widows", "Bad Times at the El Royale", "The Color Purple", "Drift"], hint1: "One film earned her Oscar nominations for playing Harriet Tubman.", hint1Movie: 0, hint2: "Another is a Steve McQueen heist film with an ensemble female cast.", hint2Movie: 1 , filmography: ["Harriet", "Widows", "Bad Times at the El Royale", "The Color Purple", "Drift", "Wicked", "Best of Enemies", "Chaos Walking", "Needle in a Timestack", "Hotel Artemis", "Molly's Game", "Four Weddings and a Funeral", "The Outsider"] },
  { actor: "Rachel Weisz", movies: ["The Constant Gardener", "The Favourite", "The Mummy", "Disobedience", "About a Boy"], hint1: "One film earned her an Oscar for playing an activist murdered in Kenya.", hint1Movie: 0, hint2: "Another features her as a scheming servant in an 18th-century royal court.", hint2Movie: 1 , filmography: ["The Constant Gardener", "The Favourite", "The Mummy", "Disobedience", "About a Boy", "Chain Reaction", "Stealing Beauty", "The Mummy Returns", "Enemy at the Gates", "Beautiful Creatures", "The Shape of Things", "Confidence", "Runaway Jury", "Constantine", "The Fountain", "Definitely Maybe", "Youth", "The Lobster"] },
  { actor: "Marion Cotillard", movies: ["La Vie en Rose", "Inception", "Midnight in Paris", "Two Days One Night", "Rust and Bone"], hint1: "One film earned her an Oscar for playing Edith Piaf.", hint1Movie: 0, hint2: "Another is a Christopher Nolan film about layered dreams.", hint2Movie: 1 , filmography: ["La Vie en Rose", "Inception", "Midnight in Paris", "Two Days One Night", "Rust and Bone", "A Very Long Engagement", "Big Fish", "Taxi 2", "The Dark Knight Rises", "Contagion", "Public Enemies", "Nine", "Macbeth", "Allied", "From the Land of the Moon", "Annette", "Brother and Sister", "De son vivant"] },
  { actor: "Penelope Cruz", movies: ["Volver", "Vicky Cristina Barcelona", "All About My Mother", "Blow", "The Counselor"], hint1: "One film earned her an Oscar for playing a passionate woman in a Woody Allen film.", hint1Movie: 1, hint2: "Another is a Pedro Almodovar film about a woman returning to her hometown.", hint2Movie: 0 , filmography: ["Volver", "Vicky Cristina Barcelona", "All About My Mother", "Blow", "The Counselor", "The Hi-Lo Country", "The Girl of Your Dreams", "Woman on Top", "Vanilla Sky", "Captain Corelli's Mandolin", "Gothika", "Non ti muovere", "Nine", "Pirates of the Caribbean: On Stranger Tides", "Twice Born", "The Brothers Sisters", "Competencia oficial", "On the Fringe"] },
  { actor: "Reese Witherspoon", movies: ["Legally Blonde", "Walk the Line", "Wild", "Election", "Cruel Intentions"], hint1: "One film features a pink-clad lawyer who surprises everyone at Harvard.", hint1Movie: 0, hint2: "Another earned her an Oscar for playing June Carter Cash.", hint2Movie: 1 , filmography: ["Legally Blonde", "Walk the Line", "Wild", "Election", "Cruel Intentions", "Man in the Moon", "Jack the Bear", "Fear", "Twilight", "Pleasantville", "Best Laid Plans", "Legally Blonde 2", "Vanity Fair", "Just Like Heaven", "Rendition", "Four Christmases", "How Do You Know", "This Means War"] },
  { actor: "Angelina Jolie", movies: ["Girl Interrupted", "Gia", "Changeling", "Maleficent", "Lara Croft: Tomb Raider"], hint1: "One film earned her an Oscar for playing a manipulative psychiatric patient.", hint1Movie: 0, hint2: "Another is a fairy-tale retelling told from the villain's perspective.", hint2Movie: 3 , filmography: ["Girl Interrupted", "Gia", "Changeling", "Maleficent", "Lara Croft: Tomb Raider", "Hackers", "Foxfire", "Playing God", "True Women", "Pushing Tin", "The Bone Collector", "Gone in 60 Seconds", "Original Sin", "Life or Something Like It", "Beyond Borders", "Taking Lives", "Sky Captain", "Mr. & Mrs. Smith"] },
  { actor: "Hilary Swank", movies: ["Million Dollar Baby", "Boys Don't Cry", "P.S. I Love You", "Freedom Writers", "The Next Karate Kid"], hint1: "One film earned her an Oscar for playing a transgender man in rural Nebraska.", hint1Movie: 1, hint2: "Another earned her a second Oscar for playing an aspiring female boxer.", hint2Movie: 0 , filmography: ["Million Dollar Baby", "Boys Don't Cry", "P.S. I Love You", "Freedom Writers", "The Next Karate Kid", "Buffy the Vampire Slayer", "The Program", "Kounterfeit", "Sometimes They Come Back Again", "The Gift", "Insomnia", "The Core", "Red Dust", "Iron Jawed Angels", "The Reaping", "Amelia", "Conviction", "New Year's Eve"] },
  { actor: "Naomi Watts", movies: ["Mulholland Drive", "21 Grams", "Eastern Promises", "The Impossible", "King Kong"], hint1: "One film is a David Lynch mystery about a woman who arrives in Hollywood.", hint1Movie: 0, hint2: "Another depicts a family torn apart by the 2004 Indian Ocean tsunami.", hint2Movie: 3 , filmography: ["Mulholland Drive", "21 Grams", "Eastern Promises", "The Impossible", "King Kong", "The Ring", "Tank Girl", "Children of the Corn IV", "Gross Misconduct", "Dangerous Beauty", "Strange Planet", "Ellie Parker", "Le Divorce", "We Don't Live Here Anymore", "Stay", "Funny Games", "Adoration", "Fair Game"] },
  { actor: "Tilda Swinton", movies: ["Michael Clayton", "We Need to Talk About Kevin", "I Am Love", "Orlando", "The Grand Budapest Hotel"], hint1: "One film features her as a cold lawyer covering up a corporate crime.", hint1Movie: 0, hint2: "Another is a haunting film about a mother reckoning with her son's violence.", hint2Movie: 1 , filmography: ["Michael Clayton", "We Need to Talk About Kevin", "I Am Love", "Orlando", "The Grand Budapest Hotel", "Edward II", "Caravaggio", "Broken English", "Female Perversions", "The War Zone", "The Beach", "Vanilla Sky", "Adaptation", "Young Adam", "The Chronicles of Narnia", "Burn After Reading", "The Curious Case of Benjamin Button", "Julia"] },
  { actor: "Juliette Binoche", movies: ["The English Patient", "Three Colors: Blue", "Chocolat", "Cache", "Certified Copy"], hint1: "One film earned her an Oscar for playing a nurse in a WWII love story.", hint1Movie: 0, hint2: "Another is a film about a woman processing grief through isolation and music.", hint2Movie: 1 , filmography: ["The English Patient", "Three Colors: Blue", "Chocolat", "Cache", "Certified Copy", "The Unbearable Lightness of Being", "Damage", "Wuthering Heights", "The Lovers on the Bridge", "Horsemen", "Breaking and Entering", "The Flight of the Red Balloon", "Words and Pictures", "Camille Claudel 1915", "Ghost in the Shell", "High Life", "The Truth", "Let the Sunshine In"] },
  { actor: "Isabelle Huppert", movies: ["Elle", "The Piano Teacher", "Amour", "I Heart Huckabees", "La Ceremonie"], hint1: "One film earned her a Cesar Award for playing a rape survivor who doesn't act like a victim.", hint1Movie: 0, hint2: "Another is a Michael Haneke film about a repressed music teacher.", hint2Movie: 1 , filmography: ["Elle", "The Piano Teacher", "Amour", "I Heart Huckabees", "La Ceremonie", "The Lacemaker", "Heaven's Gate", "Coup de Torchon", "Entre Nous", "Story of Women", "The School of Flesh", "8 Women", "The Flower of Evil", "Time of the Wolf", "Gabrielle", "White Material", "Home", "Things to Come"] },
];

// Flat list of ALL movies across all actors for autocomplete recognition
const COLORS = {
  bg: "#0a0a0f",
  card: "#12121a",
  border: "#1e1e2e",
  accent: "#f5c518",
  text: "#e8e8f0",
  muted: "#6b6b80",
  strike: "#e05555",
  success: "#4ade80",
  hint: "#60a5fa",
};

// Simple Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\b(the|a|an)\b/g, "").replace(/\s+/g, " ").trim();
}

// Returns true if guess is close enough to a movie title
function isCloseEnough(guess, movie) {
  const g = normalize(guess);
  const m = normalize(movie);
  if (g.length < 2) return false;
  // Exact substring match
  if (m.includes(g) && g.length >= 3) return true;
  // Fuzzy: allow 1 error per 5 chars, minimum threshold
  const threshold = Math.max(1, Math.floor(m.length / 5));
  const dist = levenshtein(g, m);
  if (dist <= threshold) return true;
  // Word-by-word: any significant word matches
  const gWords = g.split(" ").filter(w => w.length > 3);
  const mWords = m.split(" ");
  for (const gw of gWords) {
    for (const mw of mWords) {
      if (mw.length > 3 && levenshtein(gw, mw) <= 1) return true;
    }
  }
  return false;
}

const FilmIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
    <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/>
  </svg>
);

function Strike({ filled }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: "50%",
      border: `2px solid ${filled ? COLORS.strike : COLORS.border}`,
      background: filled ? `${COLORS.strike}22` : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.3s ease",
    }}>
      {filled && <span style={{ color: COLORS.strike, fontWeight: 900, fontSize: 18 }}>✕</span>}
    </div>
  );
}

function MovieRow({ movie, guessed, index }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "11px 14px",
      background: guessed ? `${COLORS.success}12` : COLORS.bg,
      border: `1px solid ${guessed ? COLORS.success + "55" : COLORS.border}`,
      borderRadius: 9, marginBottom: 7,
      transition: "all 0.4s ease",
    }}>
      <span style={{ fontFamily: "monospace", color: COLORS.muted, fontSize: 12, minWidth: 18 }}>#{index + 1}</span>
      {guessed
        ? <span style={{ color: COLORS.success, fontWeight: 600, fontSize: 15 }}>{movie}</span>
        : <span style={{ color: COLORS.muted, letterSpacing: 4, fontSize: 14 }}>{"•".repeat(Math.max(5, Math.floor(movie.length / 2)))}</span>
      }
      {guessed && <span style={{ marginLeft: "auto", color: COLORS.success, fontSize: 16 }}>✓</span>}
    </div>
  );
}

export default function IMDbGame() {
  const [screen, setScreen] = useState("search");

  // Actor search
  const [query, setQuery] = useState("");
  const [actorSuggestions, setActorSuggestions] = useState([]);
  const [showActorSuggestions, setShowActorSuggestions] = useState(false);
  const actorWrapperRef = useRef(null);

  // Game state
  const [gameData, setGameData] = useState(null);
  const [guessed, setGuessed] = useState([]);
  const [strikes, setStrikes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Movie guess + autocomplete
  const [guess, setGuess] = useState("");
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [showMovieSuggestions, setShowMovieSuggestions] = useState(false);
  const movieWrapperRef = useRef(null);

  const [lastResult, setLastResult] = useState(null);
  const [shake, setShake] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (actorWrapperRef.current && !actorWrapperRef.current.contains(e.target)) setShowActorSuggestions(false);
      if (movieWrapperRef.current && !movieWrapperRef.current.contains(e.target)) setShowMovieSuggestions(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Actor search autocomplete
  function handleQueryChange(val) {
    setQuery(val);
    if (val.trim().length < 2) { setActorSuggestions([]); setShowActorSuggestions(false); return; }
    const lower = val.toLowerCase();
    const matches = ACTORS.filter(a => a.actor.toLowerCase().includes(lower));
    setActorSuggestions(matches);
    setShowActorSuggestions(matches.length > 0);
  }

  function selectActor(actorData) {
    setQuery(actorData.actor);
    setActorSuggestions([]);
    setShowActorSuggestions(false);
    setGameData(actorData);
    setGuessed([]);
    setStrikes(0);
    setHintsUsed(0);
    setGuess("");
    setLastResult(null);
    setMovieSuggestions([]);
    setShowMovieSuggestions(false);
    setScreen("game");
  }

  function handleSearchSubmit() {
    const lower = query.toLowerCase();
    const exact = ACTORS.find(a => a.actor.toLowerCase() === lower);
    if (exact) { selectActor(exact); return; }
    if (actorSuggestions.length === 1) { selectActor(actorSuggestions[0]); return; }
    if (actorSuggestions.length > 1) setShowActorSuggestions(true);
  }

  // Movie guess autocomplete — uses actor's full filmography (NOT just the 5 answers)
  // so the dropdown helps with spelling without revealing which movies are correct
  function handleGuessChange(val) {
    setGuess(val);
    setLastResult(null);
    if (!gameData || val.trim().length < 2) { setMovieSuggestions([]); setShowMovieSuggestions(false); return; }
    const nVal = normalize(val);
    const filmography = gameData.filmography || gameData.movies;
    const suggestions = filmography
      .filter(m => normalize(m).includes(nVal) || isCloseEnough(val, m))
      .slice(0, 8);
    setMovieSuggestions(suggestions);
    setShowMovieSuggestions(suggestions.length > 0);
  }
  function selectMovieSuggestion(movie) {
    setGuess(movie);
    setMovieSuggestions([]);
    setShowMovieSuggestions(false);
    submitGuessFor(movie);
  }

  function submitGuess() {
    submitGuessFor(guess);
  }

  function submitGuessFor(guessVal) {
    if (!guessVal.trim() || !gameData) return;
    setMovieSuggestions([]);
    setShowMovieSuggestions(false);

    let matched = -1;
    gameData.movies.forEach((m, i) => {
      if (!guessed.includes(i) && isCloseEnough(guessVal, m)) matched = i;
    });

    if (matched !== -1) {
      const next = [...guessed, matched];
      setGuessed(next);
      setLastResult("correct");
      setGuess("");
      if (next.length === 5) setTimeout(() => setScreen("win"), 700);
    } else {
      const s = strikes + 1;
      setStrikes(s);
      setLastResult("wrong");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setGuess("");
      if (s >= 3) setTimeout(() => setScreen("lose"), 700);
    }
  }

  function reset() {
    setScreen("search");
    setQuery("");
    setGameData(null);
    setLastResult(null);
    setActorSuggestions([]);
    setMovieSuggestions([]);
  }

  const availableHints = gameData ? [
    { text: gameData.hint1, movieIdx: gameData.hint1Movie },
    { text: gameData.hint2, movieIdx: gameData.hint2Movie },
  ].filter(h => !guessed.includes(h.movieIdx)) : [];
  const canHint = strikes >= 2 && hintsUsed < availableHints.length;
  const QUICK_PICKS = ["Tom Hanks", "Meryl Streep", "Leonardo DiCaprio", "Marlon Brando", "Denzel Washington", "Audrey Hepburn", "Jack Nicholson", "Marilyn Monroe", "Brad Pitt", "Julia Roberts", "Morgan Freeman", "Cate Blanchett"];

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "24px 16px", fontFamily: "Georgia, serif",
      color: COLORS.text,
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
          <FilmIcon />
          <h1 style={{ margin: 0, fontSize: "clamp(22px, 5vw, 32px)", color: COLORS.accent, fontWeight: 700, letterSpacing: 1 }}>
            IMDb Movie Challenge
          </h1>
          <FilmIcon />
        </div>
        <p style={{ margin: 0, color: COLORS.muted, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
          Name their top 5 films
        </p>
      </div>

      <div style={{
        width: "100%", maxWidth: 500,
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16, padding: "26px 22px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}>

        {/* ── SEARCH SCREEN ── */}
        {screen === "search" && (
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: 18, color: COLORS.accent }}>Choose an Actor</h2>
            <p style={{ margin: "0 0 18px", color: COLORS.muted, fontSize: 13 }}>
              Start typing a name and select from the dropdown to begin.
            </p>
            <div ref={actorWrapperRef} style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={query}
                  onChange={e => handleQueryChange(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearchSubmit()}
                  onFocus={() => actorSuggestions.length > 0 && setShowActorSuggestions(true)}
                  placeholder="e.g. Tom Hanks, Meryl Streep…"
                  style={{
                    flex: 1, padding: "12px 14px",
                    background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                    borderRadius: 10, color: COLORS.text,
                    fontSize: 15, outline: "none", fontFamily: "inherit",
                  }}
                />
                <button onClick={handleSearchSubmit} style={{
                  padding: "12px 18px", background: COLORS.accent,
                  border: "none", borderRadius: 10,
                  color: "#000", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", fontFamily: "inherit",
                }}>Start →</button>
              </div>

              {showActorSuggestions && actorSuggestions.length > 0 && (
                <div style={{
                  position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 10, zIndex: 100,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)", overflow: "hidden",
                }}>
                  {actorSuggestions.slice(0, 8).map((a, i) => (
                    <div key={i} onClick={() => selectActor(a)} style={{
                      padding: "11px 16px", cursor: "pointer",
                      borderBottom: i < Math.min(actorSuggestions.length, 8) - 1 ? `1px solid ${COLORS.border}` : "none",
                      fontSize: 15, color: COLORS.text, transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1a1a28"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      🎬 {a.actor}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: 22 }}>
              <p style={{ margin: "0 0 10px", color: COLORS.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>
                Quick picks
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {QUICK_PICKS.map(name => (
                  <button key={name}
                    onClick={() => selectActor(ACTORS.find(a => a.actor === name))}
                    style={{
                      padding: "7px 13px", background: COLORS.bg,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 20, color: COLORS.muted,
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; }}
                  >{name}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── GAME SCREEN ── */}
        {screen === "game" && gameData && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <p style={{ margin: 0, color: COLORS.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 2 }}>Actor</p>
                <h2 style={{ margin: "3px 0 0", fontSize: 21, color: COLORS.accent }}>{gameData.actor}</h2>
              </div>
              <div style={{ display: "flex", gap: 7 }}>
                {[0,1,2].map(i => <Strike key={i} filled={i < strikes} />)}
              </div>
            </div>

            <p style={{ margin: "0 0 10px", color: COLORS.muted, fontSize: 13 }}>
              {guessed.length} of 5 movies found
            </p>

            <div style={{ marginBottom: 14 }}>
              {gameData.movies.map((m, i) => (
                <MovieRow key={i} movie={m} guessed={guessed.includes(i)} index={i} />
              ))}
            </div>

            {hintsUsed > 0 && gameData && (
              <div style={{ marginBottom: 12 }}>
                {(() => {
                  // Build list of available hints whose referenced movie hasn't been guessed yet
                  const allHints = [
                    { text: gameData.hint1, movieIdx: gameData.hint1Movie },
                    { text: gameData.hint2, movieIdx: gameData.hint2Movie },
                  ];
                  const availableHints = allHints.filter(h => !guessed.includes(h.movieIdx));
                  return availableHints.slice(0, hintsUsed).map((h, i) => (
                    <div key={i} style={{
                      padding: "9px 13px",
                      background: `${COLORS.hint}12`,
                      border: `1px solid ${COLORS.hint}44`,
                      borderRadius: 8, marginBottom: 7,
                      fontSize: 13, color: COLORS.hint,
                    }}>
                      💡 <strong>Hint {i + 1}:</strong> {h.text}
                    </div>
                  ));
                })()}
              </div>
            )}

            {lastResult && (
              <div style={{
                textAlign: "center", padding: "7px",
                color: lastResult === "correct" ? COLORS.success : COLORS.strike,
                fontSize: 14, fontWeight: 700, marginBottom: 10,
              }}>
                {lastResult === "correct" ? "✓ Correct!" : "✕ Not a match…"}
              </div>
            )}

            {/* Movie guess input with autocomplete */}
            <div ref={movieWrapperRef} style={{ position: "relative" }}>
              <div style={{
                display: "flex", gap: 9,
                animation: shake ? "shake 0.4s ease" : "none",
              }}>
                <input
                  value={guess}
                  onChange={e => handleGuessChange(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") submitGuess();
                    if (e.key === "Escape") setShowMovieSuggestions(false);
                  }}
                  onFocus={() => movieSuggestions.length > 0 && setShowMovieSuggestions(true)}
                  placeholder="Start typing a movie title…"
                  style={{
                    flex: 1, padding: "11px 14px",
                    background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                    borderRadius: 10, color: COLORS.text,
                    fontSize: 14, outline: "none", fontFamily: "inherit",
                  }}
                />
                <button onClick={submitGuess} style={{
                  padding: "11px 16px", background: COLORS.accent,
                  border: "none", borderRadius: 10,
                  color: "#000", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: "inherit",
                }}>Guess</button>
              </div>

              {/* Movie autocomplete dropdown */}
              {showMovieSuggestions && movieSuggestions.length > 0 && (
                <div style={{
                  position: "absolute", top: "calc(100% + 5px)", left: 0, right: 0,
                  background: COLORS.card, border: `1px solid ${COLORS.accent}55`,
                  borderRadius: 10, zIndex: 100,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)", overflow: "hidden",
                }}>
                  <div style={{ padding: "7px 14px 5px", fontSize: 11, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 1 }}>
                    Did you mean?
                  </div>
                  {movieSuggestions.map((m, i) => (
                    <div key={i} onClick={() => selectMovieSuggestion(m)} style={{
                      padding: "10px 16px", cursor: "pointer",
                      borderTop: `1px solid ${COLORS.border}`,
                      fontSize: 14, color: COLORS.text, transition: "background 0.15s",
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1a1a28"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      🎥 {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 11 }}>
              <button onClick={() => canHint && setHintsUsed(h => h + 1)} style={{
                background: "none",
                border: `1px solid ${canHint ? COLORS.hint : COLORS.border}`,
                borderRadius: 8, padding: "7px 13px",
                color: canHint ? COLORS.hint : COLORS.muted,
                fontSize: 12, cursor: canHint ? "pointer" : "default",
                fontFamily: "inherit",
              }}>
                {strikes < 2 ? "💡 Hints unlock at 2 strikes" : availableHints.length === 0 ? "💡 No hints available" : hintsUsed >= availableHints.length ? "💡 No hints left" : `💡 Use Hint (${availableHints.length - hintsUsed} left)`}
              </button>
              <button onClick={reset} style={{
                background: "none", border: `1px solid ${COLORS.border}`,
                borderRadius: 8, padding: "7px 13px",
                color: COLORS.muted, fontSize: 12,
                cursor: "pointer", fontFamily: "inherit",
              }}>New Actor</button>
            </div>
          </div>
        )}

        {/* ── WIN SCREEN ── */}
        {screen === "win" && gameData && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🏆</div>
            <h2 style={{ color: COLORS.accent, margin: "0 0 6px", fontSize: 24 }}>You Did It!</h2>
            <p style={{ color: COLORS.muted, margin: "0 0 18px", fontSize: 14 }}>
              All 5 movies for <strong style={{ color: COLORS.text }}>{gameData.actor}</strong>
              {strikes > 0 ? ` — with ${strikes} strike${strikes > 1 ? "s" : ""}` : " — flawless!"}
            </p>
            <div style={{ marginBottom: 18 }}>
              {gameData.movies.map((m, i) => (
                <div key={i} style={{
                  padding: "9px 13px", background: `${COLORS.success}12`,
                  border: `1px solid ${COLORS.success}44`,
                  borderRadius: 8, marginBottom: 6,
                  color: COLORS.success, fontSize: 14,
                  display: "flex", alignItems: "center", gap: 8,
                }}>⭐ {m}</div>
              ))}
            </div>
            <button onClick={reset} style={{
              width: "100%", padding: "13px", background: COLORS.accent,
              border: "none", borderRadius: 10, color: "#000",
              fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
            }}>Play Again</button>
          </div>
        )}

        {/* ── LOSE SCREEN ── */}
        {screen === "lose" && gameData && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🎬</div>
            <h2 style={{ color: COLORS.strike, margin: "0 0 6px", fontSize: 24 }}>Game Over</h2>
            <p style={{ color: COLORS.muted, margin: "0 0 18px", fontSize: 14 }}>
              The top 5 for <strong style={{ color: COLORS.text }}>{gameData.actor}</strong>:
            </p>
            <div style={{ marginBottom: 18 }}>
              {gameData.movies.map((m, i) => (
                <div key={i} style={{
                  padding: "9px 13px",
                  background: guessed.includes(i) ? `${COLORS.success}12` : `${COLORS.strike}10`,
                  border: `1px solid ${guessed.includes(i) ? COLORS.success + "44" : COLORS.strike + "33"}`,
                  borderRadius: 8, marginBottom: 6,
                  color: guessed.includes(i) ? COLORS.success : COLORS.text,
                  fontSize: 14, display: "flex", alignItems: "center", gap: 8,
                }}>
                  {guessed.includes(i) ? "✓" : "✕"} {m}
                </div>
              ))}
            </div>
            <button onClick={reset} style={{
              width: "100%", padding: "13px", background: COLORS.accent,
              border: "none", borderRadius: 10, color: "#000",
              fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
            }}>Try Again</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)}
        }
        input::placeholder { color: #3a3a55; }
      `}</style>
    </div>
  );
}
