// The 1689 Project — batch 2 of 8: chapters 5–8.
// Run: npx tsx src/scripts/seed-articles.ts the-1689-project-2
// Scripture quotations are ESV. Drafts — doctrinal review before publishing.

export const SERIES_SLUG = 'the-1689-project'
const SITE = 'https://confessed.faith/articles'

export interface SeedArticle {
  order: number
  title: string
  slug: string
  excerpt: string
  tags: string[]
  content: string
}

export const articles: SeedArticle[] = [
  {
    order: 5,
    title: '1689 Chapter 5: Of Divine Providence',
    slug: '1689-chapter-5-divine-providence',
    excerpt:
      'God did not make the world and walk away. He upholds, directs and governs everything, from the smallest event to the greatest, for his glory and his people\'s good.',
    tags: ['1689', 'providence', 'confession', 'the-1689-project'],
    content: `If creation tells us that God made everything, providence tells us that he has not left it. Chapter 5 answers a question every one of us asks sooner or later: *is anyone in charge?*

## What the Confession says

God, the good Creator of all things, in his infinite power and wisdom, upholds, directs, disposes and governs all creatures and things, from the greatest even to the least, by his most wise and holy providence, according to his infallible foreknowledge and the free and immutable counsel of his own will, to the praise of the glory of his wisdom, power, justice, goodness and mercy.

That is a big claim. It means nothing is outside his rule: not the weather, not governments, not your health, not the things that frighten you.

> "He is the radiance of the glory of God and the exact imprint of his nature, and he upholds the universe by the word of his power." — Hebrews 1:3

> "Are not two sparrows sold for a penny? And not one of them will fall to the ground apart from your Father." — Matthew 10:29

## Not a clock-maker

Some people picture God as a clock-maker who wound up the world and left it to run. The Bible does not allow that. Creation continues to exist only because God continues to hold it. If he withdrew his hand, everything would cease. Providence is God's ongoing, personal care.

## Ordinary means, extraordinary rule

The Confession teaches that, although in relation to the foreknowledge and decree of God, the first cause, all things come to pass immutably and infallibly, yet by the same providence he orders them to fall out according to the nature of second causes, either necessarily, freely or contingently.

In plain words: God usually works through ordinary means, such as farming, medicine, decisions and friendships, and not by constant miracles. That is why Christians plant crops, see doctors and make plans. It is also why we pray, since prayer is one of the means God uses. Providence does not make our actions pointless; it makes them meaningful.

## Even sin?

This is where the doctrine is hardest. The Confession says that the almighty power, unsearchable wisdom and infinite goodness of God so far manifest themselves in his providence that his determinate counsel extends even to the first fall, and all other sins of angels and men. But it adds a vital qualification: this is not by a bare permission, but such as has joined with it a most wise and powerful bounding, and otherwise ordering and governing of them, in a manifold dispensation, to his own holy ends. And yet the sinfulness of it proceeds only from the creature, and not from God, who, being most holy and righteous, neither is nor can be the author or approver of sin.

Joseph said to his brothers, who had sold him into slavery:

> "As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive, as they are today." — Genesis 50:20

The brothers were guilty. God was good. Both are true.

## Providence and God's people

The Confession adds that the providence of God toward his own people is special. As the Creator governs all, he takes particular care of the church and disposes all things to its good. Even when he allows his own children to fall into manifold temptations and the corruption of their hearts, it is to chasten them for past sins, or to discover to them the hidden strength of corruption, that they may be humbled, and to raise them to a closer and more constant dependence on himself.

> "And we know that for those who love God all things work together for good, for those who are called according to his purpose." — Romans 8:28

Notice who the promise is for: those who love God, those who are called. It is not a promise that everything will feel good. It is a promise that nothing is wasted.

## Why this matters

- **Comfort in trouble.** Your suffering is not random and your life is not out of control.
- **Humility in success.** Nothing you have is self-made.
- **Peace in uncertainty.** You may not know what tomorrow holds, but you know who does.
- **Courage to act.** You can obey without needing to know the outcome.

## Questions to think about

1. When did you last doubt that God was in control? What helped, or what would have?
2. How do you hold together prayer and planning on the one hand, and God's sovereign rule on the other?
3. Is there a past hardship where you can now see, even dimly, what God was doing?

**Previous:** [Chapter 4: Of Creation](${SITE}/1689-chapter-4-creation)
**Next:** [Chapter 6: Of the Fall of Man, of Sin, and of the Punishment Thereof](${SITE}/1689-chapter-6-the-fall)
`,
  },
  {
    order: 6,
    title: '1689 Chapter 6: Of the Fall of Man, of Sin, and of the Punishment Thereof',
    slug: '1689-chapter-6-the-fall',
    excerpt:
      'How a good creation went wrong. The Confession teaches that Adam\'s first sin brought guilt, corruption and death on all of us, and why that makes the gospel necessary.',
    tags: ['1689', 'fall', 'sin', 'confession', 'the-1689-project'],
    content: `Chapter 4 told us that man was made good. Chapter 6 tells us what went wrong. It is not a pleasant chapter, but it is an honest one, and without it the rest of the Confession would make no sense. We cannot understand why we need a Saviour until we understand what we need saving from.

## The first sin

God gave Adam a command with a warning attached:

> "But of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die." — Genesis 2:17

The Confession teaches that, although God created man upright and perfect, and gave him a righteous law, which was unto life while he kept it, yet he did not long abide in this honour. Satan, using the subtlety of the serpent, seduced Eve, then by her seduced Adam, who without any compulsion wilfully transgressed the law of their creation and the command given to them, in eating the forbidden fruit. God was pleased, according to his wise and holy counsel, to permit this, having purposed to order it to his own glory.

Notice that the Confession says Adam fell "without any compulsion." The responsibility was his.

## The effects

By this sin, our first parents lost their original righteousness and communion with God, and so became dead in sin, and wholly defiled in all the faculties and parts of soul and body. That means sin touched everything: mind, will, affections, body.

## Adam and us

The Confession teaches that they, being the root, and by God's appointment standing in the room and stead of all mankind, the guilt of the sin was imputed, and the same death in sin and corrupted nature conveyed to all their posterity, descending from them by ordinary generation.

> "Therefore, just as sin came into the world through one man, and death through sin, and so death spread to all men because all sinned." — Romans 5:12

> "For as by the one man's disobedience the many were made sinners, so by the one man's obedience the many will be made righteous." — Romans 5:19

This is often called original sin. It means two things: we are counted guilty in Adam, and we inherit a corrupt nature from him. We do not become sinners by sinning; we sin because we are sinners.

> "Behold, I was brought forth in iniquity, and in sin did my mother conceive me." — Psalm 51:5

This is a hard teaching, and it is not meant to be an excuse. It is meant to explain why the problem is so deep. But notice something else in Romans 5: the same pattern by which we fell in Adam is the pattern by which we are saved in Christ. One man represented us in the fall, and one man represents his people in redemption.

## Our corruption

The Confession says that from this original corruption, whereby we are utterly indisposed, disabled and made opposite to all good, and wholly inclined to all evil, do proceed all actual transgressions.

> "The heart is deceitful above all things, and desperately sick; who can understand it?" — Jeremiah 17:9

This does not mean that every person is as bad as they could be, or that unbelievers cannot do kind things. It means that no part of us is untouched by sin, and that we cannot, in our own strength, turn ourselves to God. That is what is often called total depravity: not total badness, but total extent.

## Sin remains

The Confession says that this corruption of nature, during this life, does remain in those that are regenerated; and although it be through Christ pardoned and mortified, yet both itself, and all the motions thereof, are truly and properly sin. This is why Christians still struggle, repent and need grace daily.

## The punishment

Every sin, being a transgression of the righteous law of God, and contrary thereunto, does in its own nature bring guilt upon the sinner, whereby he is bound over to the wrath of God, and curse of the law, and so made subject to death, with all miseries spiritual, temporal and eternal.

We should not soften this. But we should also not stop here. The reason the Bible speaks so plainly about the fall is so that the cross may be seen for what it is.

> "And you were dead in the trespasses and sins." — Ephesians 2:1

Dead people cannot save themselves. They need to be made alive. That is exactly what the next chapters are about.

## The first promise

Even in the garden, God did not leave them without hope:

> "I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel." — Genesis 3:15

The first gospel promise was given in the middle of the first judgement.

## Questions to think about

1. Do you tend to minimise sin, or to despair over it? What does the gospel say to each?
2. How does understanding original sin help you understand the work of Christ?
3. How would you explain Romans 5 to someone who thinks it is unfair that we are counted guilty in Adam?

**Previous:** [Chapter 5: Of Divine Providence](${SITE}/1689-chapter-5-divine-providence)
**Next:** [Chapter 7: Of God's Covenant](${SITE}/1689-chapter-7-gods-covenant)
`,
  },
  {
    order: 7,
    title: "1689 Chapter 7: Of God's Covenant",
    slug: '1689-chapter-7-gods-covenant',
    excerpt:
      'God condescends to relate to us by covenant. How the 1689 understands the covenant of works, the covenant of grace, and the new covenant fulfilled in Christ.',
    tags: ['1689', 'covenant', 'covenant-theology', 'confession', 'the-1689-project'],
    content: `The Bible is built around covenants: solemn commitments by which God binds himself to his people. Chapter 7 gives the Confession's framework for understanding them. It is also one of the places where Baptists and other Reformed Christians have had friendly but important disagreements, so we will try to be careful.

## God's condescension

The Confession begins by saying that the distance between God and the creature is so great that, although reasonable creatures do owe obedience to him as their Creator, yet they could never have attained the reward of life but by some voluntary condescension on God's part, which he has been pleased to express by way of covenant.

That is, God did not owe us anything. Everything we receive from him is a gift. A covenant is his way of graciously stooping to bind himself to us.

## Two covenants: works and grace

**The covenant of works.** The Confession (chapter 19 develops it) holds that God made a covenant with Adam: obey, and live; disobey, and die. Adam failed, and in him we all fell (see chapter 6). The Confession treats this as the background that makes sense of the rest.

**The covenant of grace.** The Confession then says that man having brought himself under the curse of the law by his fall, it pleased the Lord to make a covenant of grace, wherein he freely offers unto sinners life and salvation by Jesus Christ, requiring of them faith in him, that they may be saved, and promising to give unto all those that are ordained unto eternal life, his Holy Spirit, to make them willing and able to believe.

Notice the pattern: God offers freely, he requires faith, and he promises the Spirit to enable the faith he requires. Grace all the way down.

## One way of salvation in every age

The Confession teaches that this covenant is revealed in the gospel; first of all to Adam in the promise of salvation by the seed of the woman, and afterwards by farther steps, until the full discovery thereof was completed in the New Testament.

> "I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel." — Genesis 3:15

The Old Testament saints were not saved by keeping the law, and the New Testament saints are not saved differently. Everyone who has ever been saved was saved by grace through faith, looking forward or looking back to Christ. The Confession says that the covenant of grace is founded in that eternal covenant transaction that was between the Father and the Son about the redemption of the elect, and it is alone by the grace of this covenant that all the posterity of fallen Adam that ever were saved did obtain life and blessed immortality.

## Old and new

The Confession adds that this covenant of grace is administered differently in the time of the law and in the time of the gospel. Under the law it was administered by promises, prophecies, sacrifices and other types and ordinances. Those foresignified Christ to come, and were sufficient for the time to build up the elect in faith in the promised Messiah.

In the time of the gospel, once Christ the substance was exhibited, the ordinances were few, simple, and plain: the preaching of the word, and the administration of baptism and the Lord's Supper.

> "Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel and the house of Judah." — Jeremiah 31:31

> "And likewise the cup after they had eaten, saying, 'This cup that is poured out for you is the new covenant in my blood.'" — Luke 22:20

## What makes the Baptist reading distinctive

Here we should be honest that the 1689 sits within the Reformed tradition and also departs from the Presbyterian Westminster Confession. The 1689 stresses that the **new covenant** is made with those who are actually in Christ: its members are the regenerate, who all know the Lord, from the least to the greatest. This is why Baptists baptise believers, not infants, and why membership in the church is meant to be of those who profess faith. Other Reformed Christians read the covenant of grace as including believers and their children, and so baptise infants. We will come back to this in chapters 26 and 29.

It is a real difference, held by serious Christians on both sides, and it deserves a patient hearing in its own place.

## Why this matters

- **It guards against legalism.** We are saved by a promise, not by performance.
- **It gives unity to the Bible.** The whole story is one story, centred on Christ.
- **It gives assurance.** The covenant is not a contract that depends on our faithfulness, but a promise sealed by the blood of the Mediator.

## Questions to think about

1. How would you explain the difference between a covenant and a contract?
2. Why does it matter that Old Testament believers were saved by grace through faith?
3. What difference does it make to your view of the church that the new covenant has been made with those who know the Lord?

**Previous:** [Chapter 6: Of the Fall of Man, of Sin, and of the Punishment Thereof](${SITE}/1689-chapter-6-the-fall)
**Next:** [Chapter 8: Of Christ the Mediator](${SITE}/1689-chapter-8-christ-the-mediator)
`,
  },
  {
    order: 8,
    title: '1689 Chapter 8: Of Christ the Mediator',
    slug: '1689-chapter-8-christ-the-mediator',
    excerpt:
      'Who Jesus is and what he has done: truly God and truly man, prophet, priest and king, who obeyed and died in the place of sinners and now intercedes for them.',
    tags: ['1689', 'christ', 'mediator', 'atonement', 'confession', 'the-1689-project'],
    content: `Chapter 8 is the heart of the Confession. Everything before it prepares for it, and everything after it flows from it. It is about the person and work of Jesus Christ.

## Why a mediator?

It pleased God, in his eternal purpose, to choose and ordain the Lord Jesus, his only begotten Son, according to the covenant made between them both, to be the Mediator between God and man; the Prophet, Priest and King; Head and Saviour of his church, the heir of all things, and Judge of the world.

> "For there is one God, and there is one mediator between God and men, the man Christ Jesus." — 1 Timothy 2:5

Sinners cannot approach a holy God on their own. We need someone who can stand between us and bring us together. And the mediator has to be fully qualified on both sides.

## Truly God and truly man

The Confession says that the Son of God, the second person in the Holy Trinity, being very and eternal God, the brightness of the Father's glory, of one substance and equal with him, who made the world, took upon him man's nature, with all the essential properties and common infirmities thereof, yet without sin. He was conceived by the Holy Spirit in the womb of the virgin Mary, of her substance.

> "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth." — John 1:14

So the two whole, perfect and distinct natures, the Godhead and the manhood, were inseparably joined together in one person, without conversion, composition or confusion. The Confession is echoing the ancient church here: Jesus is one person with two natures. He is not half God and half man, but fully both.

Why does that matter?

- **If he were not man**, he could not represent us or die in our place.
- **If he were not God**, his sacrifice could not be of infinite worth, and he could not bear the wrath of God and live.

> "For we do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin." — Hebrews 4:15

## Anointed by the Spirit

The Confession teaches that the Lord Jesus, in his human nature thus united to the divine in the person of the Son, was sanctified and anointed with the Holy Spirit above measure, having in him all the treasures of wisdom and knowledge; in whom it pleased the Father that all fullness should dwell. He took this office not on himself, but was called to it by his Father, who put all power and judgement in his hand, and gave him commandment to execute the same.

## Prophet, priest and king

Christ fulfils three offices, corresponding to our three needs.

- **As Prophet**, he reveals the will of God. We need his teaching, because we are ignorant.
- **As Priest**, he offers himself as a sacrifice and intercedes for us. We need his sacrifice, because we are guilty.
- **As King**, he rules and defends us. We need his rule, because we are weak and rebellious.

## What he did

The Confession says that this office the Lord Jesus most willingly undertook, which that he might discharge he was made under the law, and did perfectly fulfil it, and underwent the punishment due to us, which we should have borne and suffered, being made sin and a curse for us; enduring most grievous sorrows in his soul, and most painful sufferings in his body; was crucified, and died, was buried, and remained under the power of death, yet saw no corruption. On the third day he arose from the dead, with the same body in which he suffered, with which also he ascended into heaven, and there sits at the right hand of his Father making intercession.

> "For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God." — 2 Corinthians 5:21

Two parts of his work are in view here. His **active obedience**: he kept the law perfectly in our place. And his **passive obedience**: he suffered the penalty of the law in our place. Together they are the basis of our justification, which we will come to in chapter 11.

## For whom?

The Confession says that the Lord Jesus by his perfect obedience and sacrifice of himself, which he through the eternal Spirit once offered up unto God, has fully satisfied the justice of God, procured reconciliation, and purchased an everlasting inheritance in the kingdom of heaven for all those whom the Father has given unto him.

This is what is meant by particular redemption: Christ's death was intended to actually save those the Father gave him, and it does. It did not make salvation merely possible; it secured it. Christians who agree on nearly everything else have debated the extent of the atonement, and we should be fair to that discussion. But the Confession's position is that Christ did not die in vain for anyone, and that all for whom he died will be saved.

## Applied and continued

The Confession ends the chapter by saying that although the work of redemption was not actually wrought by Christ till after his incarnation, yet the virtue, efficacy and benefit thereof were communicated to the elect in all ages successively from the beginning of the world. And Christ continues to intercede for his people:

> "Therefore he is able to save to the uttermost those who draw near to God through him, since he always lives to make intercession for them." — Hebrews 7:25

## Why this matters

If you are in Christ, you have a Prophet who will not mislead you, a Priest who will not stop praying for you, and a King who will not lose you. He is the only mediator, and he is sufficient.

## Questions to think about

1. Which of Christ's three offices do you most easily forget? What changes when you remember it?
2. Why does it matter that Jesus is both fully God and fully man?
3. What does it mean to you that he "always lives to make intercession" for you?

**Previous:** [Chapter 7: Of God's Covenant](${SITE}/1689-chapter-7-gods-covenant)
**Next:** [Chapter 9: Of Free Will](${SITE}/1689-chapter-9-free-will)
`,
  },
]
