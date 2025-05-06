// --- Game Constants and Data Pools ---
const TOTAL_TURNS = 12;
const NUM_AI_CARDINALS = 5;
const PLAYER_START_PP = 5;
const AI_MIN_START_PP = 4;
const AI_MAX_START_PP = 6;

// Probabilities (as per GDD interpretation)
const PROB_UNDERMINE_TARGET_HIT = 0.85; // Independent chance target loses PP
const PROB_UNDERMINE_PLAYER_GAIN = 0.15; // Independent chance player gains PP
const PROB_UNDERMINE_OTHER_HIT = 0.15;  // Independent chance random other AI loses PP
const PROB_ALLIANCE_SUCCESS = 0.80;
// const PROB_ALLIANCE_BACKFIRE = 0.20; // Implicitly 1 - PROB_ALLIANCE_SUCCESS

// AI Action Probabilities (can be tuned)
const AI_ACTION_WEIGHTS = {
    UndermineRival: 40, // Base weights, influenced by traits
    BuildAlliance: 35,
    GoodDeed: 25
};
const AI_TARGET_PLAYER_CHANCE = 0.3; // Chance AI targets player instead of another AI

const NAMES = ["Pietro", "Fernando", "Louis", "Vinko", "Peter", "Josip", "Philippe", "Stanislaw", "Francisco", "Daniel", "Odilo", "Robert", "Raymond", "Kurt", "Malcolm", "Reinhard", "Thomas", "Wim", "Guiseppe", "Timothy", "Rainer", "Baselios", "Vincent", "Leopoldo", "Jean-Pierre", "Mario", "Manuel", "Arthur", "Carlos", "Jozef", "Anders", "Ignatius", "Matteo", "Antoine", "Augusto", "Jean-Marc", "Anthony", "Paulo", "Giorgio", "Sebastian", "Jaime", "Kevin", "Marcello", "Emil"];
const TAG_LEANINGS = ["Traditionalist", "Pragmatist", "Reformer", "Mystic", "Bureaucrat", "Diplomat", "Scholar", "Populist", "Ascetic"];
const TAG_QUIRKS = ["Art Lover", "Sleeps With Teddy", "Secret Smoker", "Gourmand", "Early Riser", "Compulsive Knitter", "Opera Fanatic", "Owns Too Many Cats", "History Buff", "Terrible Singer", "Chess Master", "Allergic to Incense"];
const TAG_REPUTATIONS = ["Known Gossip", "Respected Theologian", "Master Orator", "Financially Savvy", "Man of the People", "Stern Disciplinarian", "Rumored Saint", "Always Late", "Secret Poet", "Surprisingly Strong", "Never Forgets a Slight"];

const ACTION_TEMPLATES = [
    // UndermineRival actions
    { id: "ur_poverty_vows", label: "Note {TARGET}'s interpretation of poverty vows allows Rolex.", archetype: "UndermineRival" },
    { id: "ur_vineyard", label: "Question if {TARGET}'s Italian vineyard counts as 'church property'.", archetype: "UndermineRival" },
    { id: "ur_dissertation", label: "Mention {TARGET}'s dissertation was suspiciously similar to Aquinas.", archetype: "UndermineRival" },
    { id: "ur_summer_glow", label: "Wonder aloud how {TARGET} maintains such a summer glow year-round.", archetype: "UndermineRival" },
    { id: "ur_celibacy", label: "Hint {TARGET}'s stance on celibacy seems 'surprisingly nuanced'.", archetype: "UndermineRival" },
    { id: "ur_almsgiving", label: "Comment on {TARGET}'s 'generous' definition of appropriate almsgiving.", archetype: "UndermineRival" },
    { id: "ur_private_jet", label: "Ask if {TARGET}'s private jet is strictly for pastoral purposes.", archetype: "UndermineRival" },
    { id: "ur_sermon", label: "Observe {TARGET}'s sermon on humility lasted precisely 75 minutes.", archetype: "UndermineRival" },
    { id: "ur_niece", label: "Inquire about {TARGET}'s niece's Vatican museum curatorial position.", archetype: "UndermineRival" },
    { id: "ur_tax", label: "Suggest {TARGET}'s orthodoxy seems flexible on tax-related matters.", archetype: "UndermineRival" },
    { id: "ur_latin_pronunciation", label: "Casually correct {TARGET}'s Latin pronunciation during Mass.", archetype: "UndermineRival" },
    { id: "ur_art_taste", label: "Mention {TARGET}'s preference for modern art seems rather... pedestrian.", archetype: "UndermineRival" },
    { id: "ur_communion_wine", label: "Observe {TARGET} seems unusually knowledgeable about communion wine vintages.", archetype: "UndermineRival" },
    { id: "ur_confessional_length", label: "Remark on the surprising brevity of {TARGET}'s time in the confessional.", archetype: "UndermineRival" },
    { id: "ur_papal_shoes", label: "Question if {TARGET}'s custom red shoes are perhaps too flamboyant.", archetype: "UndermineRival" },
    { id: "ur_encyclical_sources", label: "Point out that {TARGET}'s latest encyclical heavily 'borrows' from Wikipedia.", archetype: "UndermineRival" },
    { id: "ur_choir_solo", label: "Hint that {TARGET}'s choir solo was... enthusiastic, if not entirely on key.", archetype: "UndermineRival" },
    { id: "ur_library_books", label: "Wonder aloud if {TARGET} ever returns their borrowed Vatican Library books.", archetype: "UndermineRival" },
    { id: "ur_villa_gardeners", label: "Question why {TARGET}'s family villa requires so many Vatican gardeners.", archetype: "UndermineRival" },
    { id: "ur_monaco_retreat", label: "Wonder if {TARGET}'s 'scholarly retreat' to Monaco was truly productive.", archetype: "UndermineRival" },
    { id: "ur_saint_google", label: "Innocently ask if {TARGET}'s sermon borrowed from Saint ChatGPT.", archetype: "UndermineRival" },
    { id: "ur_first_class", label: "Raise an eyebrow at {TARGET}'s 'essential' first-class travel arrangements.", archetype: "UndermineRival" },
    { id: "ur_embassy_visits", label: "Delicately inquire about {TARGET}'s frequent visits to the embassy of a generous donor nation.", archetype: "UndermineRival" },
    { id: "ur_evolution_timing", label: "Note the curious timing of {TARGET}'s theological 'evolution' and career advancement.", archetype: "UndermineRival" },
    { id: "ur_sports_cars", label: "Ask if {TARGET}'s interpretation of scripture allows for their collection of sports cars.", archetype: "UndermineRival" },
    { id: "ur_charity_absence", label: "Casually mention {TARGET}'s conspicuous absence during last month's charity work.", archetype: "UndermineRival" },
    { id: "ur_secular_press", label: "Express concern over {TARGET}'s 'misunderstood' comments to the secular press.", archetype: "UndermineRival" },

    // BuildAlliance actions
    { id: "ba_austerity", label: "Agree with {TARGET} that austerity is best discussed over Bordeaux.", archetype: "BuildAlliance" },
    { id: "ba_humble", label: "Admire {TARGET}'s skill at appearing humble while seeking power.", archetype: "BuildAlliance" },
    { id: "ba_contacts", label: "Remind {TARGET} of your influential contacts in their diocese.", archetype: "BuildAlliance" },
    { id: "ba_manuscript", label: "Praise {TARGET}'s manuscript on the virtue of strategic silence.", archetype: "BuildAlliance" },
    { id: "ba_tradition", label: "Support {TARGET}'s position that tradition has flexible definitions.", archetype: "BuildAlliance" },
    { id: "ba_confide", label: "Confide in {TARGET} about the other cardinals' procedural errors.", archetype: "BuildAlliance" },
    { id: "ba_finances", label: "Assure {TARGET} your views on church finances are equally pragmatic.", archetype: "BuildAlliance" },
    { id: "ba_vestments", label: "Compliment {TARGET}'s impeccable taste in liturgical vestments.", archetype: "BuildAlliance" },
    { id: "ba_shared_enemy", label: "Subtly suggest a shared 'concern' about another influential Cardinal.", archetype: "BuildAlliance" },
    { id: "ba_theological_point", label: "Concede a minor theological point to {TARGET} with magnanimous grace.", archetype: "BuildAlliance" },
    { id: "ba_coffee_preference", label: "Remark on your shared preference for that rare Ethiopian coffee blend.", archetype: "BuildAlliance" },
    { id: "ba_latin_mass", label: "Express solidarity with {TARGET}'s nuanced stance on the Latin Mass.", archetype: "BuildAlliance" },
    { id: "ba_vatican_politics", label: "Share a cynical observation about Vatican politics, testing the waters.", archetype: "BuildAlliance" },
    { id: "ba_seating_plan", label: "Discreetly slip {TARGET} the seating plan for tomorrow's important meeting.", archetype: "BuildAlliance" },
    { id: "ba_rival_vulnerability", label: "Share inside information about a rival Cardinal's vulnerability with {TARGET}.", archetype: "BuildAlliance" },
    { id: "ba_strategic_appointments", label: "Express admiration for {TARGET}'s strategic appointment of familial connections.", archetype: "BuildAlliance" },
    { id: "ba_tradition_serving", label: "Agree with {TARGET} that tradition is whatever best serves the Church's interests.", archetype: "BuildAlliance" },
    { id: "ba_uncomfortable_matter", label: "Whisper to {TARGET} that you've 'taken care of' that uncomfortable matter.", archetype: "BuildAlliance" },
    { id: "ba_exclusive_ticket", label: "Offer {TARGET} your 'extra' ticket to the exclusive Vatican Gardens concert.", archetype: "BuildAlliance" },
    { id: "ba_holy_spirit_favor", label: "Confide in {TARGET} about which Cardinals the Holy Spirit seems to 'favor'.", archetype: "BuildAlliance" },
    { id: "ba_ancient_manuscript", label: "Suggest a mutually beneficial interpretation of an ancient manuscript to {TARGET}.", archetype: "BuildAlliance" },
    { id: "ba_american_donor", label: "Hint to {TARGET} about your influence with a certain wealthy American donor family.", archetype: "BuildAlliance" },
    { id: "ba_papal_secretary", label: "Casually mention your friendship with {TARGET}'s potential papal secretary candidate.", archetype: "BuildAlliance" },

    // GoodDeed actions
    { id: "gd_contemplation", label: "Spend time in quiet contemplation without documenting it.", archetype: "GoodDeed" },
    { id: "gd_tidy", label: "Silently tidy the common area with no witnesses present.", archetype: "GoodDeed" },
    { id: "gd_prayer", label: "Offer a prayer for guidance without specifying which outcome.", archetype: "GoodDeed" },
    { id: "gd_scripture", label: "Read scripture for its own sake rather than for quotable passages.", archetype: "GoodDeed" },
    { id: "gd_reflection", label: "Reflect on your motivations without crafting them into anecdotes.", archetype: "GoodDeed" },
    { id: "gd_listen", label: "Listen patiently to an elderly Cardinal's rambling story.", archetype: "GoodDeed" },
    { id: "gd_charity", label: "Anonymously contribute a small sum to a Vatican charity box.", archetype: "GoodDeed" },
    { id: "gd_offer_seat", label: "Offer your comfortable seat to a more frail Cardinal.", archetype: "GoodDeed" },
    { id: "gd_compliment", label: "Offer a sincere compliment to a junior cleric.", archetype: "GoodDeed" },
    { id: "gd_toilet_paper", label: "Replace the toilet paper in the papal bathroom without mentioning it.", archetype: "GoodDeed" },
    { id: "gd_cat_feeding", label: "Feed the Vatican's stray cats when no one is watching.", archetype: "GoodDeed" },
    { id: "gd_fix_squeaky_pew", label: "Secretly fix a squeaky pew that annoys everyone during Mass.", archetype: "GoodDeed" },
    { id: "gd_dust_relics", label: "Dust the rarely-viewed relics nobody else bothers with.", archetype: "GoodDeed" },
    { id: "gd_water_plants", label: "Water the neglected office plants of cardinals too busy plotting.", archetype: "GoodDeed" },
    { id: "gd_organize_hymnal", label: "Alphabetize the chaotically arranged hymnals in the chapel.", archetype: "GoodDeed" },
    { id: "gd_coffee_refill", label: "Refill the coffee pot after taking the last cup.", archetype: "GoodDeed" },
    { id: "gd_correct_typo", label: "Quietly correct a typo in the liturgy program before anyone notices.", archetype: "GoodDeed" },
    { id: "gd_untangle_cords", label: "Untangle the mess of charger cables in the cardinals' break room.", archetype: "GoodDeed" },
];

// Templates for AI Actions (can mirror player ones or be unique)
const AI_ACTION_TEMPLATES = {
    UndermineRival: [
        "plants a poisonous rumor about {TARGET}'s interpretation of canon law.",
        "questions {TARGET}'s intellectual rigor with surgical precision.",
        "references {TARGET}'s family's 'interesting' history with a significant donor.",
        "subtly criticizes {TARGET}'s approach to ecumenical matters as 'naive'.",
        "casually mentions {TARGET}'s curiously frequent meetings with certain diplomats.",
        "raises doubts about the authenticity of {TARGET}'s ancient family relic.",
        "wonders aloud if {TARGET}'s academic credentials are truly as impressive as claimed.",
        "insinuates that {TARGET}'s charismatic preaching lacks theological depth.",
        "questions the propriety of {TARGET}'s recent art acquisition for their chapel.",
        "mentions {TARGET}'s surprisingly luxurious quarters with exaggerated innocence.",
        "spreads doubt about {TARGET}'s piety, citing 'questionable' chapel donations.",
        "questions {TARGET}'s grasp of doctrine, implying it's 'conveniently flexible'.",
        "makes a subtle joke about {TARGET}'s 'humble' origins, clearly meant to sting.",
        "criticizes {TARGET}'s choice of reading material as 'dangerously progressive'.",
        "casually mentions {TARGET}'s 'close relationship' with a wealthy benefactor.",
        "'accidentally' spills coffee near {TARGET}'s pristine white cassock.",
        "loudly praises a rival theologian just as {TARGET} walks past.",
        "questions the source of funding for {TARGET}'s charitable foundation.",
        "starts a rumor about {TARGET} secretly enjoying opera.",
        "remarks that {TARGET}'s accent seems 'less refined' lately."
    ],
    BuildAlliance: [
        "is seen sharing a quiet word and a knowing look with {TARGET}.",
        "publicly praises {TARGET}'s insight, laying it on a bit thick.",
        "offers {TARGET} a small, expensive-looking 'token of esteem'.",
        "defends {TARGET} from a minor slight with suspicious enthusiasm.",
        "agrees pointedly with {TARGET} during a theological debate, forming a bloc.",
        "invites {TARGET} for a private game of chess.",
        "shares a rare biscotti from their private stash with {TARGET}.",
        "offers {TARGET} insightful advice on navigating Vatican bureaucracy.",
        "'accidentally' leaves a favorable document where {TARGET} can find it.",
        "proposes a joint prayer session with {TARGET} (for 'mutual discernment').",
        "offers {TARGET} a peek at their rare Aquinas manuscript.",
        "strategically agrees with {TARGET}'s position on a controversial matter.",
        "discreetly shares confidential information with {TARGET}, forging a bond.",
        "subtly signals to others that {TARGET} has their full support.",
        "invites {TARGET} to an exclusive gathering of influential Cardinals.",
        "whispers something to {TARGET} that causes a knowing smile to spread.",
        "happens to have an 'extra' seat at the head table for {TARGET}.",
        "suggests a mutually beneficial theological position to {TARGET}.",
        "arranges for {TARGET} to receive an unexpected honor at the next gathering.",
        "casually mentions their connection to {TARGET}'s voting bloc."
    ]
};

// Templates for AI Action Feedback (emphasizing observation)
const AI_FEEDBACK_TEMPLATES = {
    UndermineSuccess: [
        "You notice {ACTOR} whispering something about {TARGET}'s 'unfortunate' theological views. {TARGET} looks visibly deflated, dignity chipped away.",
        "As {ACTOR} casually mentions {TARGET}'s 'creative' interpretation of doctrine, several Cardinals suppress knowing smiles. Reputation bleeds.",
        "{ACTOR} delivers a perfectly timed remark about {TARGET}'s recent sermon, wrapped in pious concern. The damage is done, the poison subtle.",
        "A well-placed rumor by {ACTOR} about {TARGET}'s 'questionable past' spreads like wildfire. {TARGET} appears rattled.",
        "{ACTOR}'s subtle mockery of {TARGET}'s mannerisms earns quiet chuckles. Death by a thousand papercuts.",
        "{ACTOR}'s venomous comment about {TARGET}'s charitable foundation hits its mark with surgical precision. The damage is done.",
        "A rumor delicately planted by {ACTOR} raises uncomfortable questions about {TARGET}'s seminary days. Whispers multiply like loaves and fishes.",
        "{ACTOR} performs a masterclass in character assassination, cloaked as 'concern' for {TARGET}'s 'unusual' theological positions.",
        "With a few well-placed words, {ACTOR} transforms {TARGET}'s recent trip to Vienna from diplomacy to scandal. Politics as blood sport.",
        "{ACTOR}'s 'innocent' inquiry about {TARGET}'s family wealth lands like a poisoned communion wafer. The room temperature drops noticeably."
    ],
    UndermineFail: [
        "{ACTOR} attempts to discredit {TARGET}, but the clumsy innuendo falls on diplomatically deaf ears. A pathetic display.",
        "You catch {ACTOR} casting aspersions on {TARGET}, but the effort is as effective as watered-down communion wine. Wasted breath.",
        "{ACTOR}'s barb aimed at {TARGET} misses so badly it practically constitutes a miracle of ineptitude. They've only harmed themselves.",
        "The rumor {ACTOR} started about {TARGET} is quickly debunked, making {ACTOR} look foolish and desperate.",
        "{ACTOR}'s attempt at wit regarding {TARGET} falls completely flat. Crickets could be heard chirping.",
        "{ACTOR}'s attempt to discredit {TARGET} evaporates like incense smoke when others rush to their defense. Amateur hour.",
        "The barb {ACTOR} aimed at {TARGET} rebounds spectacularly, revealing more about the attacker than the target. Divine irony.",
        "{ACTOR}'s subtle critique of {TARGET} falls on deaf ears. The Curia has heard better slander over breakfast.",
        "When {ACTOR} questions {TARGET}'s credentials, they receive only blank stares. Not every knife finds its mark.",
        "{ACTOR}'s calculated insinuation about {TARGET} dissipates in the face of their unassailable reputation. A miscalculation."
    ],
    UnderminePlayerTargetSuccess: [
        "{ACTOR} casually references your 'interesting' stance on ecclesiastical authority. The word 'interesting' hangs in the air like poison gas.",
        "You overhear {ACTOR} questioning your theological credentials with surgical precision. It stings like a hair shirt dipped in acid.",
        "A pointed question from {ACTOR} forces you into an awkward public defense of your past actions. The pressure mounts.",
        "{ACTOR} subtly implies your piety is merely performative. The accusation, though indirect, lingers.",

    ],
    UnderminePlayerTargetFail: [
        "{ACTOR} tries to undermine you with all the subtlety of a cathedral collapse, achieving nothing but self-embarrassment. Amateur.",
        "You easily deflect {ACTOR}'s transparent attempt at character assassination. They clearly underestimated you.",
        "Your calm response to {ACTOR}'s provocation makes them look petty and vindictive. Score one for you.",
        "{ACTOR}'s attempt to dig up dirt on you yields nothing but common knowledge. A swing and a miss."
    ],
    AllianceSuccess: [
        "{ACTOR} and {TARGET} share a meaningful glance over their prayer books. A political alignment forms, cold and calculated.",
        "As {ACTOR} offers {TARGET} a small, seemingly innocent gift, their mutual calculations are practically visible. Souls are cheap currency here.",
        "An unholy alliance forms between {ACTOR} and {TARGET}, disguised as a discussion about liturgical minutiae. Power attracts power.",
        "You observe {ACTOR} and {TARGET} leaving a private meeting, both looking smugly satisfied. A deal has been struck.",
        "The way {ACTOR} defers to {TARGET} on a minor point signals a clear shift in the political landscape. An alliance solidifies.",
        "An unholy covenant forms between {ACTOR} and {TARGET} over espresso. Their shared glance calculates mutual advantage with mathematical precision.",
        "{ACTOR} and {TARGET} exchange seemingly innocuous compliments, but everyone recognizes the political alliance crystallizing before them.",
        "As {ACTOR} offers subtle support to {TARGET}'s position, their self-interest aligns with all the precision of the Sistine Chapel ceiling.",
        "A conspiratorial nod between {ACTOR} and {TARGET} signals a pact forged in ambition, baptized in pragmatism.",
        "The way {ACTOR} defers to {TARGET} on a procedural matter signals their new alliance. Not all marriages are made in heaven."
    ],
    AllianceFail: [
        "{ACTOR}'s attempt to ally with {TARGET} is rebuffed with the cold efficiency of an excommunication. Awkward doesn't begin to cover it.",
        "The awkward silence following {ACTOR}'s overture to {TARGET} speaks volumes. Purgatory might be less uncomfortable than this failed politicking.",
        "An attempted alliance between {ACTOR} and {TARGET} collapses under the weight of mutual distrust and naked ambition. Shocking.",
        "{TARGET} publicly refutes {ACTOR}'s interpretation on a key issue, signaling a clear rejection of the alliance attempt.",
        "You see {ACTOR} trying to engage {TARGET}, only to be met with a polite but firm dismissal. So much for cooperation.",
        "{ACTOR}'s overture to {TARGET} receives a glacial response. The chill of rejection settles over the proceedings.",
        "The alliance {ACTOR} attempts to forge with {TARGET} fractures before it forms. Some bridges cannot bear the weight of mutual suspicion.",
        "{TARGET} rebuffs {ACTOR}'s advances with diplomatic precision. The art of saying no without saying no—a Vatican specialty.",
        "A painfully awkward moment ensues as {TARGET} deliberately misinterprets {ACTOR}'s alliance attempt as idle chatter. Brutal.",
        "When {ACTOR} extends a political olive branch, {TARGET} examines it for concealed thorns and pointedly sets it aside. Trust is scarce currency here."
    ],
    AlliancePlayerTargetSuccess: [
        "{ACTOR} makes a calculated approach to you, draped in excessive piety. Both your positions improve, though your souls may shrivel slightly.",
        "You find yourself reluctantly impressed by {ACTOR}'s political acumen. The devil is indeed in the details, and clearly pulling strings here.",
        "A shared moment of cynical agreement with {ACTOR} forms an unexpected, pragmatic bond. Useful, for now.",
        "{ACTOR}'s timely support on a contentious issue benefits you both. Politics makes strange bedfellows."
    ],
    AlliancePlayerTargetFail: [
        "{ACTOR}'s attempt to forge an alliance with you lands with all the grace of a dropped thurible. The smoke clears, revealing mutual damage and contempt.",
        "You recoil from {ACTOR}'s transparent networking attempt, triggering a minor diplomatic incident. Best to keep enemies closer, perhaps.",
        "Your polite refusal of {ACTOR}'s offer seems to have caused offense. Sometimes, honesty isn't the best policy here.",
        "The alliance proposed by {ACTOR} feels more like a trap. You wisely demur, but create an enemy."
    ]
};

// Specific outcomes for each player action (keyed by action ID)
const ACTION_OUTCOMES = {
    // UndermineRival outcomes
    "ur_poverty_vows": {
        success: "{TARGET} fumbles to explain how their watch is 'donated Church property'. Others look skeptical.",
        playerBonus: "Your delicate framing of the issue makes you seem principled rather than petty.",
        fail: "{TARGET} smoothly counters that material detachment comes from within. The moment passes.",
        splash: "Cardinal {SPLASH} instinctively adjusts their own gold cufflinks, drawing unwanted attention."
    },
    "ur_vineyard": {
        success: "Several Cardinals exchange glances at the mention of {TARGET}'s 'spiritual retreat center'.",
        playerBonus: "Your earnest concern for proper asset management reflects well on you.",
        fail: "{TARGET} dismisses your comment with practiced ease. A wasted effort.",
        splash: "Cardinal {SPLASH} appears uncomfortable, possibly recalling their own French 'monastery'."
    },
    "ur_dissertation": {
        success: "{TARGET} grows flustered discussing their 'inspired' theological framework.",
        playerBonus: "Your academic rigor earns approving nods from the scholarly Cardinals.",
        fail: "{TARGET} calmly explains the difference between homage and plagiarism. You seem uninformed.",
        splash: "Cardinal {SPLASH} abruptly changes the subject, their own academic work suddenly suspect."
    },
    "ur_summer_glow": {
        success: "{TARGET}'s explanation about 'prayer walks' in January rings hollow to everyone present.",
        playerBonus: "Your innocent observation is taken as witty commentary on excessive luxury.",
        fail: "{TARGET} cheerfully offers skincare tips. You've inadvertently given them an opportunity to shine.",
        splash: "Cardinal {SPLASH} looks suddenly self-conscious about their own suspiciously perfect tan."
    },
    "ur_celibacy": {
        success: "{TARGET} becomes overly defensive, protesting too much about their strict adherence.",
        playerBonus: "Your masterful innuendo is appreciated by those tired of {TARGET}'s moral lectures.",
        fail: "{TARGET} deflects gracefully, turning your insinuation into a thoughtful theological discussion.",
        splash: "Cardinal {SPLASH} excuses themselves rather hastily from the conversation."
    },
    "ur_almsgiving": {
        success: "Your pointed observation leaves {TARGET} struggling to justify their selective charity.",
        playerBonus: "Your concern for the poor seems refreshingly sincere compared to others.",
        fail: "{TARGET} cites obscure doctrine that somehow justifies their approach. No one challenges it.",
        splash: "Cardinal {SPLASH}, who heads a similar foundation, suddenly finds the ceiling fascinating."
    },
    "ur_private_jet": {
        success: "{TARGET}'s explanation about 'reaching the faithful efficiently' convinces nobody.",
        playerBonus: "Your question, asked so innocently, highlights your own humble travel habits.",
        fail: "{TARGET} has clearly rehearsed this defense and delivers it flawlessly. The moment passes.",
        splash: "Cardinal {SPLASH}, who has borrowed said jet, studies their shoes with great interest."
    },
    "ur_sermon": {
        success: "Several Cardinals chuckle at your precise timing observation. {TARGET} appears wounded.",
        playerBonus: "Your deadpan delivery marks you as someone with both wit and spiritual discernment.",
        fail: "{TARGET} praises your attentiveness to their important teachings. Not the reaction you wanted.",
        splash: "Cardinal {SPLASH}, known for even longer sermons, abruptly changes the subject."
    },
    "ur_niece": {
        success: "{TARGET} stammers through an unconvincing explanation of his 'exceptional qualifications'.",
        playerBonus: "Your concern for proper Vatican hiring practices seems commendably principled.",
        fail: "{TARGET} produces a dossier of the niece's impressive credentials. You appear petty.",
        splash: "Cardinal {SPLASH} suddenly remembers an urgent appointment elsewhere."
    },
    "ur_tax": {
        success: "{TARGET} grows visibly uncomfortable as others recall their convenient interpretations.",
        playerBonus: "Your commitment to consistent doctrine impresses several traditional Cardinals.",
        fail: "{TARGET} turns this into a discussion on pastoral flexibility. They seem wise, not hypocritical.",
        splash: "Cardinal {SPLASH} begins nervously discussing the weather, their own tax affairs legendary."
    },
    "ur_latin_pronunciation": {
        success: "{TARGET} flinches visibly at your correction. His carefully crafted facade cracks.",
        playerBonus: "Your command of the Church's sacred language is noted approvingly.",
        fail: "{TARGET} smoothly thanks you for the 'reminder', implying you're merely pedantic.",
        splash: "Cardinal {SPLASH}, whose Latin is worse, avoids eye contact."
    },
    "ur_art_taste": {
        success: "{TARGET} defends their taste defensively, revealing unexpected insecurity.",
        playerBonus: "Your subtle jab positions you as a sophisticated arbiter of culture.",
        fail: "{TARGET} dismisses your opinion with a condescending smile. Clearly, you don't 'get it'.",
        splash: "Cardinal {SPLASH}, the actual Art Lover, looks amused by the exchange."
    },
    "ur_communion_wine": {
        success: "{TARGET} blushes slightly, caught off guard by your observation of their 'refined palate'.",
        playerBonus: "Your comment subtly implies {TARGET} might indulge a bit too much.",
        fail: "{TARGET} uses the comment to launch into a tedious lecture on sacramental wines.",
        splash: "Cardinal {SPLASH}, known Gourmand, nods along with perhaps too much interest."
    },
    "ur_confessional_length": {
        success: "A ripple of quiet murmurs follows your remark. Does {TARGET} have nothing to confess?",
        playerBonus: "Your observation casts you as deeply pious and concerned with spiritual rigor.",
        fail: "{TARGET} piously states that true repentance is swift. You look judgmental.",
        splash: "Cardinal {SPLASH}, who spends hours confessing, shifts uncomfortably."
    },
    "ur_papal_shoes": {
        success: "{TARGET} looks down at their shoes, suddenly self-conscious. Vanity exposed.",
        playerBonus: "Your concern for papal tradition and modesty scores points with conservatives.",
        fail: "{TARGET} proudly explains the shoes were a gift from a 'devout artisan'. You seem jealous.",
        splash: "Cardinal {SPLASH} discreetly hides their own rather ornate pectoral cross."
    },
    "ur_encyclical_sources": {
        success: "{TARGET} sputters denials, but the damage is done. Intellectual laziness implied.",
        playerBonus: "Your sharp eye for detail marks you as a true Scholar.",
        fail: "{TARGET} dismisses it as 'research efficiency'. The other Cardinals seem unconcerned.",
        splash: "Cardinal {SPLASH}, who relies heavily on aides, looks mildly panicked."
    },
    "ur_choir_solo": {
        success: "{TARGET} forces a smile, clearly wounded by the criticism of their 'angelic' voice.",
        playerBonus: "Your subtle critique makes you seem discerning, even in musical matters.",
        fail: "{TARGET} beams, taking your comment as praise for their 'passionate performance'.",
        splash: "Cardinal {SPLASH}, the Opera Fanatic, winces slightly in agreement with you."
    },
    "ur_library_books": {
        success: "{TARGET} looks guilty. Everyone knows about their overdue copy of 'The Name of the Rose'.",
        playerBonus: "Your comment highlights your own respect for rules and shared resources.",
        fail: "{TARGET} claims to be 'still absorbing' the profound wisdom within. A likely story.",
        splash: "Cardinal {SPLASH}, the History Buff, nervously checks their own library due dates."
    },
    // --- Additional ACTION_OUTCOMES entries ---
// UndermineRival outcomes
"ur_villa_gardeners": {
    success: "{TARGET} stumbles through an explanation about 'extensive grounds' requiring 'special care'.",
    playerBonus: "Your innocent inquiry highlights your own modest lifestyle choices.",
    fail: "{TARGET} smoothly mentions the gardeners are actually training for missionary work. Implausible but effective.",
    splash: "Cardinal {SPLASH} suddenly looks concerned about their own estate staffing."
},
"ur_monaco_retreat": {
    success: "{TARGET} becomes defensive about their academic productivity, highlighting their insecurity.",
    playerBonus: "You appear dedicated to genuine theological contemplation rather than leisure.",
    fail: "{TARGET} produces a thick manuscript they allegedly completed during said retreat. Checkmate.",
    splash: "Cardinal {SPLASH} quickly cancels their upcoming French Riviera 'research trip'."
},
"ur_saint_google": {
    success: "Several Cardinals snicker at your comment. {TARGET} flushes with embarrassment.",
    playerBonus: "Your wit marks you as sharp and observant - dangerous qualities here.",
    fail: "{TARGET} invites you to examine their extensive handwritten notes. Your insinuation backfires.",
    splash: "Cardinal {SPLASH} discreetly closes the browser tab on their tablet."
},
"ur_german_philosopher": {
    success: "{TARGET} grows flustered trying to explain 'parallel intellectual development'.",
    playerBonus: "Your command of obscure theological texts impresses the scholarly Cardinals.",
    fail: "{TARGET} delivers an impromptu lecture distinguishing their work from the philosopher in question. You appear uninformed.",
    splash: "Cardinal {SPLASH} nervously adjusts their pectoral cross, their own thesis suddenly suspect."
},
"ur_first_class": {
    success: "{TARGET}'s explanation about 'dignified representation' convinces no one.",
    playerBonus: "Your concern for Church frugality appears refreshingly principled.",
    fail: "{TARGET} reminds everyone they fly economy due to medical necessity. You seem petty.",
    splash: "Cardinal {SPLASH}, known for upgrading with miles, studies the ceiling architecture intently."
},
"ur_embassy_visits": {
    success: "{TARGET} offers conflicting explanations, arousing further suspicion about their loyalties.",
    playerBonus: "Your diplomatic insight elevates you above mere theological squabbling.",
    fail: "{TARGET} reveals the visits were requested by the Secretary of State himself. Your conspiracy theory evaporates.",
    splash: "Cardinal {SPLASH} suddenly remembers an urgent appointment elsewhere."
},
"ur_evolution_timing": {
    success: "Your observation lands perfectly, highlighting {TARGET}'s convenient doctrinal flexibility.",
    playerBonus: "Your consistency of belief appears admirably steadfast by comparison.",
    fail: "{TARGET} cites specific theological texts that influenced their evolution. You seem cynical rather than insightful.",
    splash: "Cardinal {SPLASH}, whose own positions have shifted dramatically, becomes intensely interested in their breviary."
},
"ur_sports_cars": {
    success: "{TARGET} mumbles unconvincingly about 'gifts they couldn't refuse'. No one appears convinced.",
    playerBonus: "Your modest transportation choices now seem like deliberate virtue rather than necessity.",
    fail: "{TARGET} explains the cars belong to their diocese's charity auction. Your attack appears both petty and misinformed.",
    splash: "Cardinal {SPLASH} discreetly pockets their luxury car keys."
},
"ur_charity_absence": {
    success: "Your comment exposes {TARGET}'s pattern of avoiding actual service while claiming credit.",
    playerBonus: "Your own participation in unglamorous charity work is silently acknowledged.",
    fail: "{TARGET} explains they were conducting last rites at a hospice. Your comment appears callous.",
    splash: "Cardinal {SPLASH}, who also skipped the event, suddenly becomes fascinated with their rosary."
},
"ur_secular_press": {
    success: "{TARGET} stammers through contradictory clarifications. The damage to their credibility deepens.",
    playerBonus: "Your careful avoidance of controversial public statements seems wise by comparison.",
    fail: "{TARGET} produces evidence their comments were deliberately misquoted. Your attack rebounds.",
    splash: "Cardinal {SPLASH} nervously recalls their own upcoming interview."
},

// BuildAlliance outcomes
"ba_seating_plan": {
    success: "{TARGET} recognizes the strategic value of this information. A useful connection forms.",
    fail: "{TARGET} seems uncomfortable with your insider approach, questioning its propriety. Opportunity lost."
},
"ba_rival_vulnerability": {
    success: "{TARGET} appreciates both the information and what your sharing it reveals about your allegiances.",
    fail: "{TARGET} appears concerned about your willingness to undermine others. What might you say about them later?"
},
"ba_strategic_appointments": {
    success: "{TARGET} offers a knowing smile. Your recognition of practical politics over piety establishes rapport.",
    fail: "{TARGET} delivers a stern lecture on meritocracy in Church appointments. You miscalculated badly."
},
"ba_tradition_serving": {
    success: "A gleam of recognition passes between you. {TARGET} sees a kindred pragmatist.",
    fail: "{TARGET} delivers a surprisingly passionate defense of tradition. Either genuine or a perfect performance."
},
"ba_uncomfortable_matter": {
    success: "{TARGET} relaxes visibly, understanding your discretion and capability. Useful allies are rare.",
    fail: "{TARGET} appears alarmed at your veiled reference. Privacy breaks trust easier than it builds it."
},
"ba_exclusive_ticket": {
    success: "{TARGET} accepts with precisely calculated gratitude. The social currency exchange is clear to both of you.",
    fail: "{TARGET} declines, citing a previous commitment to prayer. Your worldly currency has no value here."
},
"ba_holy_spirit_favor": {
    success: "{TARGET} leans in eagerly. Your spiritual gossip has worldly value in the right ears.",
    fail: "{TARGET} appears disturbed by your presumption to know divine preferences. A theological overreach."
},
"ba_ancient_manuscript": {
    success: "{TARGET} instantly grasps the interpretive possibilities. Theological flexibility signals potential alliance.",
    fail: "{TARGET}'s strict interpretive approach leaves no room for your suggested reading. Intellectually incompatible."
},
"ba_american_donor": {
    success: "{TARGET} shows immediate interest. Financial connections transcend theological differences.",
    fail: "{TARGET} delivers a pointed comment about the corruption of foreign influence. Your leverage backfires."
},
"ba_papal_secretary": {
    success: "{TARGET} recognizes the potential value of your connection. A chess piece moves into position.",
    fail: "{TARGET} stiffens at your presumption about their future staff. You've overplayed your position."
},

// GoodDeed outcomes
"gd_error_abstain": {
    default: "You note the error but let it pass unchallenged. The moment for easy point-scoring dissolves into something quieter."
},
"gd_redirect_credit": {
    default: "You ensure Cardinal Bianchi receives recognition for your insight. His surprised gratitude feels strangely satisfying."
},
"gd_uncomfortable_chair": {
    default: "The harder wooden chair will leave your back aching, but the gesture goes unnoticed. As it should."
},
"gd_genuine_prayer": {
    default: "For once, your prayer focuses on discernment rather than victory. The silence answers differently."
},
"gd_mentor_priest": {
    default: "The young priest's earnest questions require thoughtful answers. Time consumed but somehow not wasted."
},
"gd_take_blame": {
    default: "You accept responsibility for the incorrect prayer books. The relief on the young deacon's face is payment enough."
},
"gd_anonymous_donation": {
    default: "Your envelope of cash will help restore the forgotten church. No plaque will bear your name."
},
"gd_last_pastry": {
    default: "Your stomach growls in protest as you pass the tray along. Small sacrifices remind you of larger ones."
},
"gd_defend_absent": {
    default: "You speak up for Cardinal Rossi despite your differences. The rumors subside, though your popularity might too."
},
"gd_encouragement_note": {
    default: "Your note to Father Benetti will never advance your ambitions, but some acts have different currencies."
},
"gd_toilet_paper": {
    default: "You replace the empty roll in the papal facilities. Truly, no good deed is beneath the truly pious. Or is it above?"
},
"gd_cat_feeding": {
    default: "You leave treats for the Vatican's semi-feral cats. They're probably more spiritually enlightened than most of the College."
},
"gd_fix_squeaky_pew": {
    default: "The ancient pew no longer betrays late arrivals to morning prayer. Your conscience alone knows of this small mercy."
},
"gd_dust_relics": {
    default: "You carefully dust St. Ambrose's allegedly preserved earlobe. The saint probably appreciates cleanliness, even if no one else notices."
},
"gd_water_plants": {
    default: "The drooping papal ferns receive much-needed hydration. At least something in this place is genuinely thriving under your care."
},
"gd_organize_hymnal": {
    default: "You restore alphabetical order to the hymn books. Organizational clarity may not be next to godliness, but it's in the vicinity."
},
"gd_coffee_refill": {
    default: "Breaking with sacred conclave tradition, you actually refill the coffee pot after taking the last cup. Heresy or heroism?"
},
"gd_correct_typo": {
    default: "You discreetly fix the typo that would have had everyone praying for 'internal damnation' instead of 'eternal salvation'."
},
"gd_untangle_cords": {
    default: "You unravel the Gordian knot of charging cables in the cardinals' break room. Order from chaos, though nobody will know it was you."
},

    // BuildAlliance outcomes
    "ba_austerity": {
        success: "You and {TARGET} share a knowing smile over excellent wine. A mutual understanding forms.",
        fail: "{TARGET} misses your irony and lectures you about actual austerity. How awkward."
    },
    "ba_humble": {
        success: "{TARGET} appreciates that you see the game for what it is. A bond of pragmatism forms.",
        fail: "{TARGET} thinks you're accusing them of hypocrisy. Your attempt at camaraderie backfires."
    },
    "ba_contacts": {
        success: "{TARGET} subtly indicates these connections could be mutually beneficial. An alliance forms.",
        fail: "{TARGET} seems offended by what they perceive as an implied threat. Bridges burned."
    },
    "ba_manuscript": {
        success: "{TARGET} recognizes a fellow master of the unsaid. Your shared understanding deepens.",
        fail: "{TARGET} launches into a tedious explanation of their work. Your flattery has backfired."
    },
    "ba_tradition": {
        success: "You and {TARGET} reach a private understanding about 'interpretative latitude'.",
        fail: "{TARGET} misunderstands and passionately defends rigid tradition. Not what you intended."
    },
    "ba_confide": {
        success: "{TARGET} appreciates your inside information, offering their own observations in return.",
        fail: "{TARGET} seems uncomfortable with your gossip and edges away. A miscalculation."
    },
    "ba_finances": {
        success: "A meaningful glance passes between you. Sometimes the unspoken forms the strongest bonds.",
        fail: "{TARGET} launches into a surprisingly pious lecture on fiscal responsibility. Misjudged."
    },
    "ba_vestments": {
        success: "{TARGET} beams at your compliment. Vanity is a reliable lever. An understanding forms.",
        fail: "{TARGET} barely acknowledges your comment, perhaps deeming you unworthy to judge. An opportunity missed."
    },
    "ba_shared_enemy": {
        success: "{TARGET}'s eyes gleam with shared animosity. The enemy of my enemy... An alliance is forged in mutual dislike.",
        fail: "{TARGET} looks wary, perhaps suspecting a trap or unwilling to engage in open factionalism. You overplayed your hand."
    },
    "ba_theological_point": {
        success: "{TARGET} seems genuinely impressed by your intellectual humility and willingness to concede. A bridge is built.",
        fail: "{TARGET} takes your concession as weakness, pressing their advantage rather than reciprocating. Miscalculated."
    },
    "ba_coffee_preference": {
        success: "{TARGET} brightens at the shared taste. Sometimes, small commonalities forge strong bonds (of convenience).",
        fail: "{TARGET} politely disagrees, preferring a different, clearly inferior blend. No connection made."
    },
    "ba_latin_mass": {
        success: "You and {TARGET} find common ground in navigating the complexities of tradition. A useful connection.",
        fail: "{TARGET} firmly adheres to one extreme, viewing your 'nuance' as compromise. No alliance here."
    },
    "ba_vatican_politics": {
        success: "{TARGET} responds with an equally cynical observation. You recognize a fellow player. An alliance of pragmatists.",
        fail: "{TARGET} offers a pious platitude, refusing to engage on your level. They are either naive or more cunning than you thought."
    },
    "ba_seating_plan": {
    success: "{TARGET} recognizes the strategic value of this information. A useful connection forms.",
    fail: "{TARGET} seems uncomfortable with your insider approach, questioning its propriety. Opportunity lost."
    },
    "ba_rival_vulnerability": {
        success: "{TARGET} appreciates both the information and what your sharing it reveals about your allegiances.",
        fail: "{TARGET} appears concerned about your willingness to undermine others. What might you say about them later?"
    },
    "ba_strategic_appointments": {
        success: "{TARGET} offers a knowing smile. Your recognition of practical politics over piety establishes rapport.",
        fail: "{TARGET} delivers a stern lecture on meritocracy in Church appointments. You miscalculated badly."
    },
    "ba_tradition_serving": {
        success: "A gleam of recognition passes between you. {TARGET} sees a kindred pragmatist.",
        fail: "{TARGET} delivers a surprisingly passionate defense of tradition. Either genuine or a perfect performance."
    },
    "ba_uncomfortable_matter": {
        success: "{TARGET} relaxes visibly, understanding your discretion and capability. Useful allies are rare.",
        fail: "{TARGET} appears alarmed at your veiled reference. Privacy breaks trust easier than it builds it."
    },
    "ba_exclusive_ticket": {
        success: "{TARGET} accepts with precisely calculated gratitude. The social currency exchange is clear to both of you.",
        fail: "{TARGET} declines, citing a previous commitment to prayer. Your worldly currency has no value here."
    },
    "ba_holy_spirit_favor": {
        success: "{TARGET} leans in eagerly. Your spiritual gossip has worldly value in the right ears.",
        fail: "{TARGET} appears disturbed by your presumption to know divine preferences. A theological overreach."
    },
    "ba_ancient_manuscript": {
        success: "{TARGET} instantly grasps the interpretive possibilities. Theological flexibility signals potential alliance.",
        fail: "{TARGET}'s strict interpretive approach leaves no room for your suggested reading. Intellectually incompatible."
    },
    "ba_american_donor": {
        success: "{TARGET} shows immediate interest. Financial connections transcend theological differences.",
        fail: "{TARGET} delivers a pointed comment about the corruption of foreign influence. Your leverage backfires."
    },
    "ba_papal_secretary": {
        success: "{TARGET} recognizes the potential value of your connection. A chess piece moves into position.",
        fail: "{TARGET} stiffens at your presumption about their future staff. You've overplayed your position."
    },

    // GoodDeed outcomes
    "gd_contemplation": {
        default: "The silence brings clarity, though none will know of this moment except perhaps the divine."
    },
    "gd_tidy": {
        default: "You restore order to the shared space, taking care that no one observes your small kindness."
    },
    "gd_prayer": {
        default: "Your prayer focuses on discernment rather than victory, a brief respite from ambition."
    },
    "gd_scripture": {
        default: "The familiar words speak differently when not mined for rhetorical ammunition."
    },
    "gd_reflection": {
        default: "This moment of honest self-examination is uncomfortably revealing, yet somehow cleansing."
    },
    "gd_listen": {
        default: "You lend an ear to Cardinal Maurizio's endless tale of his prize-winning roses. Patience is a virtue, apparently."
    },
    "gd_charity": {
        default: "A few euros clink into the poor box. Anonymity preserves the purity of the act (and avoids notice)."
    },
    "gd_offer_seat": {
        default: "You give up your prime spot near the coffee machine. Small comforts relinquished for... what exactly?"
    },
    "gd_compliment": {
        default: "You tell a nervous young secretary their organizational skills are 'divinely inspired'. They seem genuinely touched."
    },
    "gd_error_abstain": {
    default: "You note the error but let it pass unchallenged. The moment for easy point-scoring dissolves into something quieter."
    },
    "gd_redirect_credit": {
        default: "You ensure Cardinal Bianchi receives recognition for your insight. His surprised gratitude feels strangely satisfying."
    },
    "gd_uncomfortable_chair": {
        default: "The harder wooden chair will leave your back aching, but the gesture goes unnoticed. As it should."
    },
    "gd_genuine_prayer": {
        default: "For once, your prayer focuses on discernment rather than victory. The silence answers differently."
    },
    "gd_mentor_priest": {
        default: "The young priest's earnest questions require thoughtful answers. Time consumed but somehow not wasted."
    },
    "gd_take_blame": {
        default: "You accept responsibility for the incorrect prayer books. The relief on the young deacon's face is payment enough."
    },
    "gd_anonymous_donation": {
        default: "Your envelope of cash will help restore the forgotten church. No plaque will bear your name."
    },
    "gd_last_pastry": {
        default: "Your stomach growls in protest as you pass the tray along. Small sacrifices remind you of larger ones."
    },
    "gd_defend_absent": {
        default: "You speak up for Cardinal Rossi despite your differences. The rumors subside, though your popularity might too."
    },
    "gd_encouragement_note": {
        default: "Your note to Father Benetti will never advance your ambitions, but some acts have different currencies."
    }
};

// --- Game State ---
let gameState = {
    turn: 0,
    playerPP: 0,
    playerInitialPP: PLAYER_START_PP, // Store initial for comparison
    playerName: "", // Store player's cardinal name
    playerTags: [], // Player's random traits
    aiCardinals: [], // Array of { id, name, tags: [], pp, initialPP }
    goodDeedCounter: 0,
    currentActions: [],
    lastPlayerFeedback: "",
    lastAIFeedback: "", // Store AI feedback separately
    lastPpChangeIds: [], // Store IDs of cardinals whose PP changed last
    usedActionIds: [], // Track which action IDs have been presented
    remainingActionsByArchetype: {} // Track count of remaining actions by type
};

// --- DOM Elements ---
const introScreen = document.getElementById('intro-screen');
const nameCaptureScreen = document.getElementById('name-capture-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const beginButton = document.getElementById('begin-button');
const confirmNameButton = document.getElementById('confirm-name-button');
const playerNameInput = document.getElementById('player-name');
const playAgainButton = document.getElementById('play-again-button');
const turnCounterDisplay = document.getElementById('turn-counter');
const playerStatusDisplay = document.getElementById('player-status');
const cardinalListElement = document.getElementById('cardinal-list');
const activityLogSection = document.getElementById('activity-log-section');
const activityLogHeader = document.getElementById('activity-log-header');
const activityLogContent = document.getElementById('activity-log-content');
const outcomeHeaderElement = document.getElementById('outcome-header');
const resultTextElement = document.getElementById('result-text');
const heavenScoreTextElement = document.getElementById('heaven-score-text');
const backgroundMusic = document.getElementById('background-music');

// Select all audio buttons and their icons by shared class (will be done in initializeAudioControls)
let allAudioToggleButtons = []; // Will hold references to buttons and their icons

// Create the header text element so we can update it separately
function initializeLogHeader() {
    // Clear any existing content
    activityLogHeader.innerHTML = '';
    
    // Create and append the header text element
    const headerText = document.createElement('div');
    headerText.id = 'activity-log-header-text';
    headerText.textContent = 'Your Move';
    activityLogHeader.appendChild(headerText);
    
    // Return for potential later use
    return headerText;
}

// Function to clear and animate content within the activity log
function updateActivityLog(newContentElement, headerText) {
    return new Promise(resolve => {
        // Update header text
        const headerTextEl = document.getElementById('activity-log-header-text');
        if (headerTextEl) {
            headerTextEl.textContent = headerText;
        }

        // Set a fixed content size for the transition
        const contentArea = document.getElementById('activity-log-content');
        
        // Prepare the new content but don't add it yet
        const newWrapper = document.createElement('div');
        newWrapper.className = 'log-item-wrapper';
        newWrapper.appendChild(newContentElement);
        
        // Remove any existing content with a fade out
        // and replace with new content after fade completes
        contentArea.innerHTML = '';
        contentArea.appendChild(newWrapper);
        
        // Force reflow before starting animation
        newWrapper.offsetHeight;
        newWrapper.classList.add('active');
        
        // Resolve promise after animation duration
        setTimeout(resolve, 500);
    });
}

// Simplified function to add a Continue button and wait for its click
function addContinueButtonAndWait() { 
    return new Promise(resolve => {
        // Remove any existing continue button
        const existingButton = activityLogHeader.querySelector('.continue-button');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create new button with fixed dimensions
        const button = document.createElement('button');
        button.textContent = "Continue";
        button.className = 'continue-button';
        
        // Add to header
        activityLogHeader.appendChild(button);
        
        // Simple click handler
        button.onclick = () => {
            button.disabled = true;
            setTimeout(() => {
                button.remove();
                resolve();
            }, 50);
        };
    });
}

// --- Utility Functions ---
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

// Fisher-Yates (Knuth) Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTurn(turn) {
    const day = Math.floor(turn / 3) + 1;
    const timeSlotIndex = turn % 3;
    const timeSlots = ["Morning", "Afternoon", "Evening"];
    
    // Add appropriate suffix to day number
    let daySuffix = "th";
    if (day % 10 === 1 && day % 100 !== 11) {
        daySuffix = "st";
    } else if (day % 10 === 2 && day % 100 !== 12) {
        daySuffix = "nd";
    } else if (day % 10 === 3 && day % 100 !== 13) {
        daySuffix = "rd";
    }
    
    return `${timeSlots[timeSlotIndex]} of the ${day}${daySuffix} day`;
}

// Animation Helper
function triggerAnimation(element, animationClass) {
    if (!element) return;
    element.classList.add(animationClass);
    // Remove class after animation duration (must match CSS transition duration)
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, 400); // Matches the 0.4s transition in CSS
}

// --- Core Game Logic ---

function generateCardinals() {
    const usedNames = new Set();
    const cardinals = [];
    for (let i = 0; i < NUM_AI_CARDINALS; i++) {
        let name;
        do {
            name = getRandomElement(NAMES);
        } while (usedNames.has(name));
        usedNames.add(name);

        const tags = [
            getRandomElement(TAG_LEANINGS),
            getRandomElement(TAG_QUIRKS),
            getRandomElement(TAG_REPUTATIONS)
        ];

        cardinals.push({
            id: i, // Simple ID for targeting
            name: `Cardinal ${name}`,
            tags: tags,
            pp: getRandomInt(AI_MIN_START_PP, AI_MAX_START_PP),
            initialPP: 0, // Will be set after generation
            isPlayer: false // Flag to identify AI cardinals
        });
    }
    // Set initialPP after all generated
    cardinals.forEach(c => c.initialPP = c.pp);
    return cardinals;
}

function generatePlayerTags() {
    return []; // Player no longer has tags
}

function generateActionChoices() {
    // Filter out actions that have already been used
    const availableTemplates = ACTION_TEMPLATES.filter(template => 
        !gameState.usedActionIds.includes(template.id)
    );
    
    // Shuffle the available templates
    shuffleArray(availableTemplates);
    
    const choices = [];
    const chosenArchetypes = new Set();
    
    // Try to ensure at least one of each archetype if possible
    ["UndermineRival", "BuildAlliance", "GoodDeed"].forEach(archetype => {
        const archetypeActions = availableTemplates.filter(t => t.archetype === archetype);
        if (archetypeActions.length > 0) {
            // Get a random action of this archetype
            const template = archetypeActions[Math.floor(Math.random() * archetypeActions.length)];
            
            // Remove from available templates to avoid duplication
            const index = availableTemplates.indexOf(template);
            if (index !== -1) availableTemplates.splice(index, 1);
            
            let targetId = null;
            let targetName = null;
            let label = template.label;
            
            if (template.archetype === "UndermineRival" || template.archetype === "BuildAlliance") {
                const targetCardinal = getRandomElement(gameState.aiCardinals);
                if (!targetCardinal) return; // Should not happen in normal play
                targetId = targetCardinal.id;
                targetName = targetCardinal.name;
                label = label.replace('{TARGET}', targetName);
            }
            
            chosenArchetypes.add(template.archetype);
            choices.push({
                id: template.id,
                label: label,
                archetype: template.archetype,
                targetId: targetId,
                targetName: targetName
            });
            
            // Add this action ID to the used list
            gameState.usedActionIds.push(template.id);
            
            // Update remaining count
            gameState.remainingActionsByArchetype[template.archetype]--;
        }
    });
    
    // Fill remaining slots if needed
    while (choices.length < 3 && availableTemplates.length > 0) {
        const template = availableTemplates.pop();
        let targetId = null;
        let targetName = null;
        let label = template.label;
        
        if (template.archetype === "UndermineRival" || template.archetype === "BuildAlliance") {
            const targetCardinal = getRandomElement(gameState.aiCardinals);
            if (!targetCardinal) continue;
            targetId = targetCardinal.id;
            targetName = targetCardinal.name;
            label = label.replace('{TARGET}', targetName);
        }
        
        choices.push({
            id: template.id,
            label: label,
            archetype: template.archetype,
            targetId: targetId,
            targetName: targetName
        });
        
        // Add this action ID to the used list
        gameState.usedActionIds.push(template.id);
        
        // Update remaining count
        gameState.remainingActionsByArchetype[template.archetype]--;
    }
    
    // --- Fallback logic if we're running out of actions ---
    // If we couldn't get 3 actions or if we're getting low on remaining actions, implement fallback
    if (choices.length < 3 || Object.values(gameState.remainingActionsByArchetype).some(count => count < 3)) {
        // Reset usedActionIds when running low, excluding the ones just selected
        const currentIds = choices.map(c => c.id);
        gameState.usedActionIds = currentIds;
        
        // Reset the remaining counts
        gameState.remainingActionsByArchetype = {
            UndermineRival: ACTION_TEMPLATES.filter(a => a.archetype === "UndermineRival" && !currentIds.includes(a.id)).length,
            BuildAlliance: ACTION_TEMPLATES.filter(a => a.archetype === "BuildAlliance" && !currentIds.includes(a.id)).length,
            GoodDeed: ACTION_TEMPLATES.filter(a => a.archetype === "GoodDeed" && !currentIds.includes(a.id)).length
        };
        
        // If we still don't have 3 choices, fill in from all templates
        while (choices.length < 3) {
            const allTemplates = ACTION_TEMPLATES.filter(t => !currentIds.includes(t.id));
            if (allTemplates.length === 0) break; // Safety check
            
            const template = getRandomElement(allTemplates);
            let targetId = null;
            let targetName = null;
            let label = template.label;
            
            if (template.archetype === "UndermineRival" || template.archetype === "BuildAlliance") {
                const targetCardinal = getRandomElement(gameState.aiCardinals);
                if (!targetCardinal) continue;
                targetId = targetCardinal.id;
                targetName = targetCardinal.name;
                label = label.replace('{TARGET}', targetName);
            }
            
            choices.push({
                id: template.id,
                label: label,
                archetype: template.archetype,
                targetId: targetId,
                targetName: targetName
            });
            
            currentIds.push(template.id);
        }
    }
    
    return shuffleArray(choices);
}

function applyActionEffects(action) {
    gameState.lastPpChangeIds = []; // Clear previous changes
    const isLastTurn = gameState.turn === TOTAL_TURNS - 1;
    const multiplier = isLastTurn ? 2 : 1;
    let feedback = "";
    const targetCardinal = gameState.aiCardinals.find(c => c.id === action.targetId);
    let playerPPChange = 0;
    let targetPPChange = 0;
    let otherTargetPPChange = 0;
    let otherTarget = null;

    // Direct lookup of outcomes by action ID
    const outcomes = action.id ? ACTION_OUTCOMES[action.id] : null;

    switch (action.archetype) {
        case "UndermineRival":
            if (!targetCardinal) break;
            let targetHit = false;
            let playerGain = false;
            let otherHit = false;

            if (Math.random() < PROB_UNDERMINE_TARGET_HIT) {
                targetPPChange = -1 * multiplier; // Apply multiplier
                targetHit = true;
            }
            if (Math.random() < PROB_UNDERMINE_PLAYER_GAIN) {
                playerPPChange = 1 * multiplier; // Apply multiplier
                playerGain = true;
            }
            if (Math.random() < PROB_UNDERMINE_OTHER_HIT) {
                const otherCardinals = gameState.aiCardinals.filter(c => c.id !== action.targetId);
                if (otherCardinals.length > 0) {
                    otherTarget = getRandomElement(otherCardinals);
                    otherTargetPPChange = -1 * multiplier; // Apply multiplier
                    otherHit = true;
                }
            }
            
            // Apply PP changes and record IDs
            if (targetPPChange !== 0) {
                targetCardinal.pp = Math.max(0, targetCardinal.pp + targetPPChange);
                gameState.lastPpChangeIds.push(targetCardinal.id);
            }
            if (playerPPChange !== 0) {
                gameState.playerPP += playerPPChange;
                gameState.lastPpChangeIds.push('player');
            }
            if(otherTarget && otherTargetPPChange !== 0) {
                otherTarget.pp = Math.max(0, otherTarget.pp + otherTargetPPChange);
                gameState.lastPpChangeIds.push(otherTarget.id);
            }

            // Generate feedback (simplified, original outcome logic remains)
            if (outcomes) {
            if (targetHit && playerGain) {
                    feedback = outcomes.success + " " + outcomes.playerBonus;
            } else if (targetHit) {
                    feedback = outcomes.success;
            } else if (playerGain) {
                    feedback = outcomes.playerBonus;
                } else {
                    feedback = outcomes.fail;
                }
                if (otherHit && outcomes.splash) {
                    feedback += " " + outcomes.splash.replace('{SPLASH}', otherTarget.name);
                }
                feedback = feedback.replace(/{TARGET}/g, targetCardinal.name);
            } else {
                // Fallback feedback generation
                if (targetHit && playerGain) {
                    feedback = `Your subtle barb against ${action.targetName} lands perfectly, improving your standing significantly.`;
                } else if (targetHit) {
                    feedback = `Your words cast a heavy shadow on ${action.targetName}.`;
                } else if (playerGain) {
                    feedback = `Though ${action.targetName} seems unaffected, your cleverness is noted, boosting your influence.`;
                } else {
                    feedback = `Your attempt to undermine ${action.targetName} falls flat.`;
                }
                if (otherHit) {
                     feedback += ` Unexpectedly, ${otherTarget.name} also suffers a blow.`;
                }
            }
            // Add indicator for last turn effect
            if (isLastTurn && (targetHit || playerGain || otherHit)) {
                 feedback += " (x2 Impact!)";
            }
            break;

        case "BuildAlliance":
            if (!targetCardinal) break;
            const success = Math.random() < PROB_ALLIANCE_SUCCESS;
            
            if (success) {
                targetPPChange = 1 * multiplier; // Apply multiplier
                playerPPChange = 1 * multiplier; // Apply multiplier
                feedback = outcomes ? outcomes.success : `Your gesture towards ${action.targetName} strengthens your bond greatly. Both standings improve significantly.`;
            } else {
                targetPPChange = -1 * multiplier; // Apply multiplier
                playerPPChange = -1 * multiplier; // Apply multiplier
                feedback = outcomes ? outcomes.fail : `Your attempt to connect with ${action.targetName} backfires badly, causing significant awkwardness.`;
            }
            
            if (outcomes) {
                feedback = feedback.replace(/{TARGET}/g, targetCardinal.name);
            }
            
            // Apply PP changes and record IDs
            if (targetPPChange !== 0) {
                targetCardinal.pp = Math.max(0, targetCardinal.pp + targetPPChange);
                gameState.lastPpChangeIds.push(targetCardinal.id);
            }
            if (playerPPChange !== 0) {
                gameState.playerPP = Math.max(0, gameState.playerPP + playerPPChange);
                gameState.lastPpChangeIds.push('player');
            }
             // Add indicator for last turn effect
            if (isLastTurn) {
                 feedback += " (x2 Impact!)";
            }
            break;

        case "GoodDeed":
            gameState.goodDeedCounter++; // Good deeds count normally, no multiplier
            feedback = outcomes && outcomes.default ? 
                outcomes.default : 
                "You focus on spiritual matters, seeking inner peace amidst the ambition.";
            if (outcomes && feedback.includes('{TARGET}')) {
                feedback = feedback.replace(/{TARGET}/g, ""); // Remove placeholder if present
            }
            // No PP change, so no IDs recorded and no multiplier indicator
            break;
    }

    // --- Trigger Value Animations --- (separate from list reorder)
    if (playerPPChange > 0) {
        // Find the player in the cardinal list instead
        const playerInListElement = document.querySelector('#cardinal-player .pp-value');
        if (playerInListElement) triggerAnimation(playerInListElement, 'pp-increase');
    }
    if (playerPPChange < 0) {
        // Find the player in the cardinal list instead
        const playerInListElement = document.querySelector('#cardinal-player .pp-value');
        if (playerInListElement) triggerAnimation(playerInListElement, 'pp-decrease');
    }

    if(targetCardinal) {
        const targetElement = document.querySelector(`#cardinal-${targetCardinal.id} .pp-value`);
        if (targetPPChange > 0) triggerAnimation(targetElement, 'pp-increase');
        if (targetPPChange < 0) triggerAnimation(targetElement, 'pp-decrease');
    }
    if(otherTarget) {
        const otherTargetElement = document.querySelector(`#cardinal-${otherTarget.id} .pp-value`);
         if (otherTargetPPChange < 0) triggerAnimation(otherTargetElement, 'pp-decrease');
    }

    return feedback;
}

// --- AI Action Logic ---

function chooseAIActionType(aiCardinal) {
    // Removed GoodDeed, weights only for Undermine and Alliance
    let weights = {
        UndermineRival: AI_ACTION_WEIGHTS.UndermineRival,
        BuildAlliance: AI_ACTION_WEIGHTS.BuildAlliance
    };
    
    // Basic trait influence (example - refined for darker tone)
    if (aiCardinal.tags.includes("Known Gossip") || aiCardinal.tags.includes("Stern Disciplinarian") || aiCardinal.tags.includes("Never Forgets a Slight")) {
        weights.UndermineRival *= 1.7;
        weights.BuildAlliance *= 0.8;
    }
    if (aiCardinal.tags.includes("Diplomat") || aiCardinal.tags.includes("Financially Savvy") || aiCardinal.tags.includes("Pragmatist")) {
        weights.BuildAlliance *= 1.6;
        weights.UndermineRival *= 0.7;
    }
    // Removed trait influences related to GoodDeed

    // Convert weights to probability ranges
    const totalWeight = weights.UndermineRival + weights.BuildAlliance;
    if (totalWeight <= 0) return "UndermineRival"; // Fallback if weights somehow become zero
    
    const rand = Math.random() * totalWeight;

    if (rand < weights.UndermineRival) {
        return "UndermineRival";
    } else {
        return "BuildAlliance";
    }
}

function chooseAITarget(actingCardinal, actionType) {
    if (actionType === "GoodDeed") return null;

    // Decide whether to target player or another AI
    const targetPlayer = Math.random() < AI_TARGET_PLAYER_CHANCE;

    if (targetPlayer) {
        return { type: 'player', id: 'player', name: `Cardinal ${gameState.playerName}` }; // Updated player target
    }

    // Target another AI
    const potentialTargets = gameState.aiCardinals.filter(c => c.id !== actingCardinal.id);
    if (potentialTargets.length === 0) return null; // Should not happen with NUM_AI_CARDINALS > 1

    // Simple random targeting for now, could be refined based on PP or traits
    const target = getRandomElement(potentialTargets);
    return { type: 'ai', id: target.id, name: target.name };
}

function resolveAIAction(actingCardinal, actionType, targetInfo) {
    // Note: We don't clear lastPpChangeIds here, player action initiated it.
    const isLastTurn = gameState.turn === TOTAL_TURNS - 1;
    const multiplier = isLastTurn ? 2 : 1;
    let feedback = "";
    let aiPPChange = 0;
    let targetPPChange = 0;
    let targetIsPlayer = targetInfo?.type === 'player';
    let targetAI = targetIsPlayer ? null : gameState.aiCardinals.find(c => c.id === targetInfo?.id);

    const actionTemplate = getRandomElement(AI_ACTION_TEMPLATES[actionType]);
    let actionDesc = actionTemplate ? actionTemplate : "acts mysteriously";
    if (targetInfo?.name && actionDesc.includes("{TARGET}")) {
        actionDesc = actionDesc.replace("{TARGET}", targetInfo.name);
    }

    switch (actionType) {
        case "UndermineRival":
            if (!targetInfo) break;
            // Increased base probability for success slightly for darker tone
            if (Math.random() < 0.75) { 
                 targetPPChange = -1 * multiplier; // Apply multiplier
                 feedback = targetIsPlayer ? getRandomElement(AI_FEEDBACK_TEMPLATES.UnderminePlayerTargetSuccess) : getRandomElement(AI_FEEDBACK_TEMPLATES.UndermineSuccess);
            } else {
                 feedback = targetIsPlayer ? getRandomElement(AI_FEEDBACK_TEMPLATES.UnderminePlayerTargetFail) : getRandomElement(AI_FEEDBACK_TEMPLATES.UndermineFail);
            }
            break;
        case "BuildAlliance":
            if (!targetInfo) break;
             // Increased base probability for success slightly for darker tone
            if (Math.random() < 0.75) { 
                aiPPChange = 1 * multiplier; // Apply multiplier
                targetPPChange = 1 * multiplier; // Apply multiplier
                feedback = targetIsPlayer ? getRandomElement(AI_FEEDBACK_TEMPLATES.AlliancePlayerTargetSuccess) : getRandomElement(AI_FEEDBACK_TEMPLATES.AllianceSuccess);
            } else {
                 feedback = targetIsPlayer ? getRandomElement(AI_FEEDBACK_TEMPLATES.AlliancePlayerTargetFail) : getRandomElement(AI_FEEDBACK_TEMPLATES.AllianceFail);
            }
            break;
        // case "GoodDeed" removed
    }
    
    // Apply PP changes and record IDs
    if (aiPPChange !== 0) {
        actingCardinal.pp += aiPPChange;
        gameState.lastPpChangeIds.push(actingCardinal.id);
    }
    if (targetPPChange !== 0) {
        if(targetIsPlayer) {
            gameState.playerPP = Math.max(0, gameState.playerPP + targetPPChange);
            gameState.lastPpChangeIds.push('player');
        } else if (targetAI) {
            targetAI.pp = Math.max(0, targetAI.pp + targetPPChange);
            gameState.lastPpChangeIds.push(targetAI.id);
        }
    }

    // --- Trigger Value Animations --- (separate from list reorder)
    if (actingCardinal) {
        const actorElement = document.querySelector(`#cardinal-${actingCardinal.id} .pp-value`);
        if (aiPPChange > 0) triggerAnimation(actorElement, 'pp-increase');
        // AI decrease not modeled here
    }
    if (targetIsPlayer) {
        // Remove reference to playerStatusElement and just use the player in the list
        const playerInListElement = document.querySelector('#cardinal-player .pp-value');
        if (playerInListElement) {
            if (targetPPChange > 0) triggerAnimation(playerInListElement, 'pp-increase');
            if (targetPPChange < 0) triggerAnimation(playerInListElement, 'pp-decrease');
        }
    } else if (targetAI) {
        const targetElement = document.querySelector(`#cardinal-${targetAI.id} .pp-value`);
        if (targetPPChange > 0) triggerAnimation(targetElement, 'pp-increase');
        if (targetPPChange < 0) triggerAnimation(targetElement, 'pp-decrease');
    }

    // Replace placeholders in feedback
    let finalFeedback = feedback.replace("{ACTOR}", actingCardinal.name);
    if (targetInfo?.name) {
        finalFeedback = finalFeedback.replace(/\{TARGET\}/g, targetInfo.name);
    }

    // Add indicator for last turn effect to AI feedback
    if (isLastTurn && (aiPPChange !== 0 || targetPPChange !== 0)) {
         finalFeedback += " (x2 Impact!)";
    }

    return finalFeedback;
}

// --- Game Flow ---

async function handlePlayerAction(action) {
    // Disable all action buttons
    const buttons = activityLogContent.querySelectorAll('.action-button');
    buttons.forEach(button => {
        button.disabled = true;
    });
    const isLastTurn = gameState.turn === TOTAL_TURNS - 1;
    const playerActionHeader = isLastTurn ? "Your Final Move - Hail Mary" : "Your Move";

    // Apply action effects & get feedback
    const playerFeedback = applyActionEffects(action);
    
    // Show outcome
    const playerOutcomeElement = createOutcomeElement(playerFeedback);
    // Use the dynamic header based on turn
    await updateActivityLog(playerOutcomeElement, playerActionHeader);

    // Render cardinal list changes
    renderAICardinals();
    
    // Continue button
    await addContinueButtonAndWait();

    // Check for game end BEFORE AI action on the last turn
    if (isLastTurn) {
        setTimeout(endGame, 500);
        return;
    }

    // AI action (only if NOT the last turn)
    const actingAI = getRandomElement(gameState.aiCardinals);
    let aiActionFeedback = "The other Cardinals remain watchful..."; 
    
    if (actingAI) {
        const aiElement = document.getElementById(`cardinal-${actingAI.id}`);
        if(aiElement) {
            aiElement.classList.add('acting-ai-highlight');
            setTimeout(() => aiElement.classList.remove('acting-ai-highlight'), 500);
        }
        
        const aiActionType = chooseAIActionType(actingAI);
        const aiTargetInfo = chooseAITarget(actingAI, aiActionType);
        aiActionFeedback = resolveAIAction(actingAI, aiActionType, aiTargetInfo);
    }
    
    // Show AI outcome
    const aiOutcomeElement = createOutcomeElement(aiActionFeedback);
    await updateActivityLog(aiOutcomeElement, "Meanwhile...");

    // Update cardinals again
    renderAICardinals();

    // Continue button
    await addContinueButtonAndWait();

    // Next turn
    gameState.turn++;
    renderTurnCounter();

    // New action choices
    gameState.currentActions = generateActionChoices();
    const buttonContainer = createActionButtonsContainer();
    // Determine header for the next player action phase
    const nextPlayerActionHeader = gameState.turn === TOTAL_TURNS - 1 ? "Your Final Move - Hail Mary" : "Your Move";
    await updateActivityLog(buttonContainer, nextPlayerActionHeader);
}

function determineWinner() {
    const sortedCardinals = sortCardinalsByPP();
    const highest = sortedCardinals[0];
    
    if (highest.isPlayer) {
        return { winner: "Player", highestPP: highest.pp };
    } else {
        return { winner: highest.name, highestPP: highest.pp };
    }
}

function getHeavenScoreFeedback(count) {
    const worldlyChoices = TOTAL_TURNS - count;
    
    if (count === 0) {
        return "Your focus remained entirely on earthly ambition. Not a single moment was spent on genuine piety or quiet reflection. God weeps for your soul.";
    } else if (count === 1) {
        return "You performed a single act of quiet grace amidst the politics. Perhaps there is hope for your soul yet.";
    } else if (count < 5) {
        return `${count} times you chose virtue over advancement. Brief flickers of genuine faith amid the darkness of ambition. God notices, even when humans don't.`;
    } else if (count < TOTAL_TURNS / 2) {
        return `You balanced ambition with ${count} acts of genuine faith. Neither saint nor sinner, but your place in Heaven lies in the balance.`;
    } else if (count < TOTAL_TURNS - 2) {
        return `Despite the worldly contest, you dedicated ${count} turns to matters of genuine spiritual worth. God approves.`;
    } else {
        return `An astonishing ${count} times you chose the path of true virtue over advancement. You won the true game and, for that, God loves you best.`;
    }
}

function endGame() {
    const { winner, highestPP } = determineWinner();
    let outcomeHeaderText = "The Conclave Concludes";
    let resultText = "";

    if (winner === "Player") {
        outcomeHeaderText = "Habemus Papam!";
        resultText = `White smoke billows! You, Cardinal ${gameState.playerName}, have navigated the treacherous currents of the Conclave and emerged victorious with ${highestPP} Pope Points. You are the new Pope!`;
    } else {
        outcomeHeaderText = "White Smoke Rises...for Someone Else";
        resultText = `The influential ${winner} (with ${highestPP} PP) has been chosen. Your own ambition (${gameState.playerPP} PP) was not enough this time.`;
    }

    // Set main result elements
    outcomeHeaderElement.textContent = outcomeHeaderText;
    resultTextElement.textContent = resultText;
    
    // Set the Heaven Score reveal with a delay for dramatic effect
    setTimeout(() => {
        // The twist: There was another game being played all along
    heavenScoreTextElement.textContent = getHeavenScoreFeedback(gameState.goodDeedCounter);

        // Animate the heaven score section
        const heavenSection = document.getElementById('heaven-score-section');
        if (heavenSection) {
            heavenSection.style.display = 'block';
        }
    }, 1500);
    
    // Hide game screen and show end screen
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
}

// --- Rendering Functions ---

function renderTurnCounter() {
    turnCounterDisplay.textContent = `${formatTurn(gameState.turn)} (Turn ${gameState.turn + 1} of ${TOTAL_TURNS})`;
}

function renderAICardinals() {
    // Store current positions for animation
    const oldPositions = {};
    const currentCards = cardinalListElement.querySelectorAll('li');
    currentCards.forEach(card => {
        const cardId = card.getAttribute('data-id');
        if (cardId) {
            oldPositions[cardId] = card.getBoundingClientRect().top;
        }
    });

    // Sort and clear the list
    const sortedCardinals = sortCardinalsByPP();
    cardinalListElement.innerHTML = ''; // Consider using a document fragment for performance if list gets very large
    
    // Render the sorted list
    sortedCardinals.forEach(cardinal => {
        const li = document.createElement('li');
        li.id = `cardinal-${cardinal.id}`;
        li.setAttribute('data-id', cardinal.id);
        
        if (cardinal.isPlayer) {
            li.classList.add('player-cardinal');
        }
        
        // Construct tags string only if tags exist
        let tagsString = '';
        if (cardinal.tags && cardinal.tags.length > 0) {
            tagsString = `(<span class="cardinal-tags-inner">${cardinal.tags.join(', ')}</span>)`;
        }

        // If it's the player and tagsString is empty, don't include the span for tags at all.
        // Otherwise, include the tags span (which might be empty for AI if they somehow had no tags, or populated).
        const tagsDisplay = (cardinal.isPlayer && tagsString === '') ? '' : `<span class="cardinal-tags">${tagsString}</span>`;

        li.innerHTML = `
            <span class="cardinal-name">${cardinal.name}</span>
            ${tagsDisplay}
            <span class="cardinal-pp"><span class="pp-value">${cardinal.pp}</span></span>
        `;
        cardinalListElement.appendChild(li);
    });

    // Apply animations for position changes (FLIP technique)
    requestAnimationFrame(() => { // Use requestAnimationFrame for smoother animation start
        const newCards = cardinalListElement.querySelectorAll('li');
        newCards.forEach(card => {
            const cardId = card.getAttribute('data-id');
            const newPosition = card.getBoundingClientRect().top;
            let diffY = 0;

            if (oldPositions[cardId]) {
                diffY = oldPositions[cardId] - newPosition;
            }
            
            if (Math.abs(diffY) > 1) { // Only animate if position actually changed
                card.style.transform = `translateY(${diffY}px)`;
                card.style.transition = 'transform 0s'; // Move instantly to start pos

                // Force reflow before applying the transition
                card.offsetHeight; 

                // Check if this cardinal's PP changed to add highlight
                const didPpChange = gameState.lastPpChangeIds.includes(cardId);
                if (didPpChange) {
                    card.classList.add('cardinal-highlight-move');
                }

                // Apply the transition
                card.style.transition = 'transform 0.5s ease-in-out';
                card.style.transform = 'translateY(0)';
                
                // Clean up highlight class after animation
                card.addEventListener('transitionend', () => {
                    if (didPpChange) {
                        card.classList.remove('cardinal-highlight-move');
                    }
                    card.style.transition = ''; // Remove transition override
                }, { once: true });

            } else {
                 // Ensure transition is cleared if no movement occurred
                 card.style.transition = '';
                 card.style.transform = '';
            }
        });
        // Clear the changed IDs after applying animations for this render pass
        gameState.lastPpChangeIds = []; 
    });
}

function renderActionButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'action-buttons-container'; // Use new container class
    
    gameState.currentActions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'action-button';
        button.textContent = action.label;
        button.onclick = () => handlePlayerAction(action);
        // Disable button after click is handled in handlePlayerAction
        buttonContainer.appendChild(button);
    });
    
    // Use the update function for animation
    updateActivityLog(buttonContainer, "Your Move");
}

function renderPlayerFeedback(feedback) {
    const feedbackElement = document.createElement('p');
    feedbackElement.className = 'outcome-text';
    feedbackElement.textContent = feedback;
    
    // Use the update function for animation
    updateActivityLog(feedbackElement, "Your Move");
}

function renderAIActionFeedback(feedback) {
    const feedbackElement = document.createElement('p');
    feedbackElement.className = 'outcome-text'; // Reuse style
    feedbackElement.textContent = feedback;

    // Use the update function for animation
    updateActivityLog(feedbackElement, "Your Move");
}

function renderGameScreen() {
    // Initial render only updates static parts and action buttons
    renderTurnCounter();
    renderAICardinals(); // Render initial cardinal list
    renderActionButtons(); // Render initial actions
}

// --- Game Initialization and Flow ---

function handlePlayerNameSubmit() {
    let playerName = playerNameInput.value.trim();
    
    // Default name if empty
    if (!playerName) {
        playerName = getRandomElement(NAMES);
    }
    
    // Remove "Cardinal" prefix if added by player
    playerName = playerName.replace(/^Cardinal\s+/i, '');
    
    gameState.playerName = playerName;
    gameState.playerTags = generatePlayerTags();
    
    // Transition to game screen
    nameCaptureScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initializeGame();
}

function initializeGame() {
    gameState.turn = 0;
    gameState.playerPP = PLAYER_START_PP;
    gameState.playerInitialPP = PLAYER_START_PP;
    gameState.playerTags = []; // Ensure player tags are explicitly empty here too
    gameState.goodDeedCounter = 0;
    gameState.aiCardinals = generateCardinals();
    gameState.currentActions = generateActionChoices();
    gameState.lastPlayerFeedback = ""; // Clear feedback initially
    gameState.lastAIFeedback = "";
    gameState.lastPpChangeIds = [];

    // Initialize the activity log header
    initializeLogHeader();

    renderGameScreen(); // Initial render
    // Clear the used actions list
    gameState.usedActionIds = [];
        
    // Count initial actions by archetype for monitoring
    gameState.remainingActionsByArchetype = {
        UndermineRival: ACTION_TEMPLATES.filter(a => a.archetype === "UndermineRival").length,
        BuildAlliance: ACTION_TEMPLATES.filter(a => a.archetype === "BuildAlliance").length,
        GoodDeed: ACTION_TEMPLATES.filter(a => a.archetype === "GoodDeed").length
    };
}

function startGame() {
    introScreen.classList.add('hidden');
    nameCaptureScreen.classList.remove('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');

    // Clear and focus name input
    playerNameInput.value = '';
    playerNameInput.focus();
}

function restartGame() {
    // Go back to name capture screen
    endScreen.classList.add('hidden');
    nameCaptureScreen.classList.remove('hidden');
    
    // Clear and focus name input
    playerNameInput.value = '';
    playerNameInput.focus();
}

// --- Event Listeners & Initialization ---

document.addEventListener('DOMContentLoaded', () => {
beginButton.addEventListener('click', startGame);
    confirmNameButton.addEventListener('click', handlePlayerNameSubmit);
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handlePlayerNameSubmit();
        }
    });
playAgainButton.addEventListener('click', restartGame);
    initializeAudioControls(); // Initialize audio controls

    // Initial state hides screens
    nameCaptureScreen.classList.add('hidden');
gameScreen.classList.add('hidden');
endScreen.classList.add('hidden');
});

// Add these missing functions right before the renderPlayerFeedback function

// Function to create an outcome element with decorative styling
function createOutcomeElement(feedbackText) {
    const container = document.createElement('div');
    container.className = 'outcome-container';
    
    const decorative = document.createElement('div');
    decorative.className = 'outcome-decorative';
    decorative.textContent = '✝'; // Cross symbol
    
    const text = document.createElement('p');
    text.className = 'outcome-text';
    text.textContent = feedbackText;
    
    container.appendChild(decorative);
    container.appendChild(text);
    
    return container;
}

// Function to create a container for action buttons
function createActionButtonsContainer() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'action-buttons-container';
    const isLastTurn = gameState.turn === TOTAL_TURNS - 1;
    
    gameState.currentActions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'action-button';
        // Append multiplier indicator on the last turn
        button.textContent = isLastTurn ? `${action.label} (x2 Impact)` : action.label;
        button.onclick = () => handlePlayerAction(action);
        buttonContainer.appendChild(button);
    });
    
    return buttonContainer;
}

function renderPlayerFeedback(feedback) {
    const feedbackElement = document.createElement('p');
    feedbackElement.className = 'outcome-text';
    feedbackElement.textContent = feedback;
    
    // Use the update function for animation
    updateActivityLog(feedbackElement, "Your Move");
}

function renderAIActionFeedback(feedback) {
    const feedbackElement = document.createElement('p');
    feedbackElement.className = 'outcome-text'; // Reuse style
    feedbackElement.textContent = feedback;

    // Use the update function for animation
    updateActivityLog(feedbackElement, "Your Move");
}

function renderGameScreen() {
    // Initial render only updates static parts and action buttons
    renderTurnCounter();
    renderAICardinals(); // Render initial cardinal list
    renderActionButtons(); // Render initial actions
}

// Comment out or remove the renderPlayerStatus function
// function renderPlayerStatus() {
//     playerStatusDisplay.innerHTML = `Your Pope Points: <span class="pp-value">${gameState.playerPP}</span>`;
// }

function sortCardinalsByPP() {
    const allCardinals = [...gameState.aiCardinals];
    
    // Add player to the list - without tags
    allCardinals.push({
        id: 'player',
        name: `Cardinal ${gameState.playerName}`,
        tags: [], // Player has no tags
        pp: gameState.playerPP,
        isPlayer: true
    });
    
    // Sort by PP in descending order
    return allCardinals.sort((a, b) => b.pp - a.pp);
}

function initializeAudioControls() {
    if (!backgroundMusic) {
        console.warn("Background music element not found. Music will not be available.");
        return;
    }

    const buttons = document.querySelectorAll('.audio-toggle-button-shared');
    if (buttons.length === 0) {
        console.warn("Audio toggle buttons not found.");
        return;
    }

    allAudioToggleButtons = Array.from(buttons).map(button => ({
        buttonElement: button,
        onIcon: button.querySelector('.music-on-icon-shared'),
        offIcon: button.querySelector('.music-off-icon-shared')
    })); 

    // Function to update all button icons based on audio state
    const updateAllButtonIcons = () => {
        const isPlaying = !backgroundMusic.paused && !backgroundMusic.muted;
        allAudioToggleButtons.forEach(item => {
            if (item.onIcon && item.offIcon) {
                item.onIcon.style.display = isPlaying ? 'inline' : 'none';
                item.offIcon.style.display = isPlaying ? 'none' : 'inline';
            }
        });
    };

    // Set initial icon states for all buttons
    updateAllButtonIcons(); 

    allAudioToggleButtons.forEach(item => {
        if (item.buttonElement) {
            item.buttonElement.addEventListener('click', () => {
                if (backgroundMusic.paused || backgroundMusic.muted) {
                    backgroundMusic.play().catch(error => console.error("Error playing music:", error));
                    backgroundMusic.muted = false;
                } else {
                    backgroundMusic.pause();
                    // backgroundMusic.muted = true; // Not strictly needed as pause stops sound
                }
                updateAllButtonIcons(); // Update all icons after state change
            });
        }
    });

    // Ensure music is explicitly muted on load (HTML attribute should also do this)
    backgroundMusic.muted = true;
    // Call updateAllButtonIcons one more time after explicitly setting muted state if needed
    // This ensures icons are correct if the HTML default `muted` wasn't processed before JS ran.
    updateAllButtonIcons(); 
} 
