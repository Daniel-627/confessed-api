// src/scripts/content/the-1689-project.ts
// Series: The 1689 Project (slug: the-1689-project) — the Second London Baptist Confession, chapter by chapter.
// Batch 1 of 8: chapters 1–4. Chapter numbers follow the 1689 text (28 is split into 29 Baptism and 30 The Lord's Supper).
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
    order: 1,
    title: '1689 Chapter 1: Of the Holy Scripture',
    slug: '1689-chapter-1-holy-scripture',
    excerpt:
      'Why the Confession begins with the Bible: Scripture is God\'s own word, sufficient, clear enough, and the final authority for faith and life.',
    tags: ['1689', 'scripture', 'confession', 'the-1689-project'],
    content: `Every confession of faith has to begin somewhere, and the Second London Baptist Confession of 1689 begins with the Bible. That is not an accident. Before it says anything about God, man or salvation, it answers a prior question: **how do we know any of this?**

The answer of the Confession is that we know because God has spoken, and what he has said is written down.

## Why Scripture, and why first

The Confession teaches that nature and providence show something of God's goodness, wisdom and power, enough to leave people without excuse, but not enough to give the knowledge of God and his will that is needed for salvation. For that, God was pleased to reveal himself and to commit that revelation to writing. That is why the Holy Scripture is "most necessary," and why the older ways of God revealing his will have ceased.

## Breathed out by God

The Confession's central claim is about the origin of Scripture:

> "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work." — 2 Timothy 3:16–17

> "For no prophecy was ever produced by the will of man, but men spoke from God as they were carried along by the Holy Spirit." — 2 Peter 1:21

The human authors were real authors, with their own styles and settings. But God is the ultimate author, and so the Bible is the word of God written. Its authority does not rest on the testimony of any man or church, but wholly on God, its author. We may be moved by the church's witness to esteem it, but the full persuasion that it is God's word comes from the inward work of the Holy Spirit, bearing witness by and with the word in our hearts.

## Which books?

The Confession lists the 66 books of the Old and New Testaments as the rule of faith and life. It states that the books commonly called the Apocrypha are not inspired and are not part of the canon, so they have no authority in the church beyond that of other human writings.

## Sufficient

The Confession teaches that the whole counsel of God concerning everything needful for his glory, our salvation, faith and life is either expressly set down in Scripture or may be deduced from it by good and necessary consequence. Nothing is to be added to it, whether by new revelations or by the traditions of men.

This does not mean the Bible tells you how to fix a car. It means that on everything we need to know to be saved and to serve God, we do not have to look elsewhere.

## Clear enough

The Confession does not claim that everything in Scripture is equally plain. But it holds that those things which must be known, believed and observed for salvation are so clearly set out somewhere in Scripture that not only the learned but the unlearned may gain a sufficient understanding by the ordinary use of the means. This is why Baptists have always insisted that ordinary believers should read the Bible for themselves.

> "Your word is a lamp to my feet and a light to my path." — Psalm 119:105

## The final judge

When we disagree, who decides? The Confession answers that the supreme judge of all religious controversies, of all decrees of councils, opinions of the ancient writers, doctrines of men and private spirits, is nothing other than the Holy Scripture, delivered by the Spirit. This is why the confession itself is not the highest authority. It is a summary, subject to correction by the very word it summarises. The Bereans are praised for that attitude:

> "Now these Jews were more noble than those in Thessalonica; they received the word with all eagerness, examining the Scriptures daily to see if these things were so." — Acts 17:11

## Why this matters for you

If Scripture is God's word, then it is not one voice among many. It is the voice that has the right to govern what you believe and how you live, and the one that will still stand when others fade. It also means you can have confidence: the God who spoke has not left you guessing.

## Questions to think about

1. Do you read the Bible as the word of God, or as a book about God?
2. Where are you most tempted to add something to Scripture, such as a feeling, a tradition or an opinion, and treat it as equally binding?
3. What would change in your week if you believed that Scripture is sufficient?

**Next:** [Chapter 2: Of God and of the Holy Trinity](${SITE}/1689-chapter-2-god-and-the-trinity)
`,
  },
  {
    order: 2,
    title: '1689 Chapter 2: Of God and of the Holy Trinity',
    slug: '1689-chapter-2-god-and-the-trinity',
    excerpt:
      'The Confession\'s doctrine of God: one living and true God, infinite in being and perfection, existing eternally as Father, Son and Holy Spirit.',
    tags: ['1689', 'god', 'trinity', 'confession', 'the-1689-project'],
    content: `Having established that God has spoken, the Confession turns to what he has said about himself. Chapter 2 is one of the richest in the whole document, and it is worth reading slowly.

## One God

> "Hear, O Israel: The LORD our God, the LORD is one." — Deuteronomy 6:4

The Confession begins where Scripture does: there is only one living and true God. He is not one god among many, and he is not a force or an idea. He is a living person who can be known.

## Who is he?

The Confession describes God by what he is. He is infinite in being and perfection, a most pure spirit, invisible, without body, parts or passions, immutable, immense, eternal, incomprehensible, almighty, most wise, most holy, most free, most absolute. Some of these terms can sound strange, so here are the key ideas.

- **Without parts.** God is not made up of pieces or put together from anything. He is simply who he is.
- **Without passions.** This does not mean God is cold. It means he is not moved against his will, or changed by outside forces, the way we are. His love is not an unstable mood.
- **Immutable.** God does not change in his being, character or purposes. This is why his promises can be trusted.
- **Eternal.** He had no beginning, and he depends on nothing.

> "Before the mountains were brought forth, or ever you had formed the earth and the world, from everlasting to everlasting you are God." — Psalm 90:2

When Moses asked for God's name, God answered:

> "God said to Moses, 'I AM WHO I AM.'" — Exodus 3:14

God does not need us. He has all life, glory, goodness and blessedness in and of himself, and is alone in and unto himself all-sufficient. That is why worship is a gift and not a favour we do for him.

## Holy, just, and loving

The Confession adds that God works all things according to the counsel of his own immutable and most righteous will, for his own glory. He is loving, gracious, merciful, long-suffering, abundant in goodness and truth, forgiving iniquity, transgression and sin. He is also just and terrible in his judgments, hating all sin, and will by no means clear the guilty. These are not in competition. The same God is perfectly holy and perfectly loving, and the gospel is where both are displayed.

## Three persons, one God

In the unity of the Godhead there are three persons, of one substance, power and eternity: God the Father, God the Son, and God the Holy Spirit. The Father is of none, neither begotten nor proceeding; the Son is eternally begotten of the Father; the Holy Spirit proceeds from the Father and the Son. All three are distinct, but one God, undivided in nature and being.

The Scriptures do not teach this in one verse, but it runs through the whole of the New Testament:

> "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." — Matthew 28:19

> "The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all." — 2 Corinthians 13:14

> "In the beginning was the Word, and the Word was with God, and the Word was God." — John 1:1

One name, three persons. The Father is God, the Son is God, the Spirit is God, and there is one God.

## Why the Trinity matters

This is not an abstract puzzle. The Trinity is the foundation of the gospel:

- The Father sends the Son.
- The Son accomplishes redemption.
- The Spirit applies it.

Remove any person, and salvation falls apart. It also means that God has never been lonely, and that love is eternal in him. Before creation, the Father loved the Son in the Spirit.

The Confession also says that the doctrine of the Trinity is the foundation of all our communion with God, and our comfortable dependence on him. We do not worship an idea. We are brought into fellowship with the Father, through the Son, by the Spirit.

## Humility before mystery

Notice the word *incomprehensible*. We can know God truly, but never exhaustively. If we could fully understand him, he would not be God. The proper response is not to give up, but to worship.

## Questions to think about

1. Which attribute of God do you find hardest to hold together with the others?
2. How does knowing that God needs nothing change the way you pray?
3. Can you explain, in your own words, why the Trinity matters for salvation?

**Previous:** [Chapter 1: Of the Holy Scripture](${SITE}/1689-chapter-1-holy-scripture)
**Next:** [Chapter 3: Of God's Decree](${SITE}/1689-chapter-3-gods-decree)
`,
  },
  {
    order: 3,
    title: "1689 Chapter 3: Of God's Decree",
    slug: '1689-chapter-3-gods-decree',
    excerpt:
      'God has ordained whatever comes to pass, without being the author of sin. And in Christ, he has chosen a people for himself. A pastoral look at a hard doctrine.',
    tags: ['1689', 'decree', 'election', 'predestination', 'confession', 'the-1689-project'],
    content: `Chapter 3 contains a doctrine many people find difficult, and some find offensive. We want to treat it carefully. The Confession itself says that this doctrine "is to be handled with special prudence and care," so that it leads people to praise and humility, and not to anxiety or arrogance.

## What the Confession says

God decreed in himself, from all eternity, by the most wise and holy counsel of his own will, freely and unchangeably, all things whatsoever comes to pass. Yet he did so in such a way that:

- God is not the author of sin.
- No violence is offered to the will of the creature.
- The liberty or contingency of second causes is not taken away, but rather established.

The Bible teaches both that God rules all things, and that people are responsible for what they do.

> "In him we have obtained an inheritance, having been predestined according to the purpose of him who works all things according to the counsel of his will." — Ephesians 1:11

> "The lot is cast into the lap, but its every decision is from the LORD." — Proverbs 16:33

The clearest example is the cross. Acts says that Jesus was delivered up by the "definite plan and foreknowledge of God," and that wicked men crucified him. Both are true at once. God planned it, and the men who did it were guilty. The Confession does not claim to explain how this works. It insists that Scripture teaches both.

## Chosen in Christ

The Confession goes on to say that, by the decree of God, for the manifestation of his glory, some men and angels are predestinated to everlasting life through Jesus Christ, to the praise of his glorious grace, while others are left to act in their sin to their just condemnation, to the praise of his glorious justice.

Notice the order in which the Confession speaks of it. Election is **in Christ**:

> "Even as he chose us in him before the foundation of the world, that we should be holy and blameless before him." — Ephesians 1:4

Those predestined to life, God chose before the foundation of the world, out of his mere free grace and love. It was not based on foreseen faith or good works, or on anything in the creature moving him to it. The Confession adds that God also ordained the means: the elect are redeemed by Christ, effectually called, justified, adopted, sanctified, and kept by his power through faith unto salvation.

## What this doctrine is for

Election is not meant to be a debating point. It is meant to produce certain fruits, and the Confession names them:

1. **Assurance.** Those who obey the gospel and make their calling and election sure can be certain of it.
2. **Praise, reverence and admiration of God.** Salvation is of the Lord from beginning to end.
3. **Humility and diligence.** Nobody can boast, since grace is the only difference between them and anyone else.
4. **Comfort.** Our salvation does not hang on our grip on God, but his grip on us.

## What it is not

It does not mean:

- that people are puppets,
- that evangelism is pointless (the means are as ordained as the ends),
- that God delights in the death of the wicked,
- or that you should try to look for your name in the secret book of God.

The Confession reminds us that we are not told who is elect, but rather we are told to repent and believe the gospel. If you are calling on Christ, that is the evidence that God is at work in you.

> "The secret things belong to the LORD our God, but the things that are revealed belong to us and to our children forever, that we may do all the words of this law." — Deuteronomy 29:29

## A word to the troubled

If this doctrine troubles you, you are in good company. Read the Confession's own warning against two errors: presumption on the one side, and speculation on the other. Start with what is revealed: the gospel call, "whoever believes in him." Nobody who has come to Christ has been turned away.

## Questions to think about

1. Does it comfort you or trouble you that God is in control of all things? Why?
2. How do you reconcile God's sovereignty and human responsibility in your own mind, and what do you do with what you cannot reconcile?
3. How should this doctrine affect the way you share the gospel?

**Previous:** [Chapter 2: Of God and of the Holy Trinity](${SITE}/1689-chapter-2-god-and-the-trinity)
**Next:** [Chapter 4: Of Creation](${SITE}/1689-chapter-4-creation)
`,
  },
  {
    order: 4,
    title: '1689 Chapter 4: Of Creation',
    slug: '1689-chapter-4-creation',
    excerpt:
      'God made everything from nothing, by his word, and made man in his image, male and female. What the Confession teaches about creation, and why it matters.',
    tags: ['1689', 'creation', 'image-of-god', 'confession', 'the-1689-project'],
    content: `Chapter 4 takes us to the beginning. If chapters 2 and 3 tell us who God is and what he has purposed, chapter 4 tells us what he has done: he made all things.

## From nothing, by his word

> "In the beginning, God created the heavens and the earth." — Genesis 1:1

The Confession says that in the beginning it pleased God the Father, Son and Holy Spirit, for the manifestation of the glory of his eternal power, wisdom and goodness, to create or make the world, and all things therein, whether visible or invisible, in the space of six days, and all very good.

Notice three things.

**1. The whole Trinity created.** The Father, the Son and the Spirit were all involved.

> "For by him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or rulers or authorities—all things were created through him and for him." — Colossians 1:16

**2. By the word.** God did not need materials, or a struggle with chaos. He spoke.

> "By the word of the LORD the heavens were made, and by the breath of his mouth all their host." — Psalm 33:6

> "By faith we understand that the universe was created by the word of God, so that what is seen was not made out of things that are visible." — Hebrews 11:3

This is what Christians mean by creation *ex nihilo*, out of nothing. Nothing existed alongside God. Everything that is, is because he made it.

**3. Very good.**

> "And God saw everything that he had made, and behold, it was very good." — Genesis 1:31

The material world is not evil, and neither is the body. Matter is not a prison to escape. God made it, and called it good. That has consequences for how we think about work, food, marriage, art and the resurrection of the body.

## The days of creation

The Confession speaks of creation "in the space of six days." Faithful Christians, including those who hold to the 1689, have disagreed about how to understand the length and nature of those days, and about how to relate Genesis to the findings of science. We should state plainly that the Confession's wording is what it is, and that anyone who subscribes to it will want to wrestle honestly with the text. What is not in dispute is the central claim: God made everything, by his word, in an orderly way, and it was good.

## Man in the image of God

After God had made all other creatures, the Confession says, he created man, male and female, with reasonable and immortal souls, endued with knowledge, righteousness and true holiness after his own image, having the law of God written in their hearts, and power to fulfil it. Yet they were under a possibility of transgressing, being left to the liberty of their own will, which was subject to change.

> "So God created man in his own image, in the image of God he created him; male and female he created them." — Genesis 1:27

Three truths follow.

- **Human dignity.** Every person, at every stage and in every condition, bears God's image. This is the root of the sanctity of life.
- **Equality and complementarity.** Male and female are both fully in his image. The Confession adds that they were made with the law written on their hearts, and with a command not to eat of the tree of the knowledge of good and evil, which they were happy while they kept it.
- **Created good, but able to fall.** Adam was not made sinful, nor was he made unable to sin. That sets the stage for chapter 6.

## Why this matters

Because God made everything, he owns everything, including you. You are not an accident. You have a Maker, and therefore a purpose. And because he is the Creator, he is also the one who can re-create. The God who spoke light into darkness has shone in hearts to give the light of the knowledge of his glory in the face of Christ.

## Questions to think about

1. How does the doctrine of creation shape the way you think about your body, your work and your rest?
2. Where do you most need to remember that you are a creature and not the Creator?
3. How would you explain the image of God to a friend, and what difference does it make to how we treat people?

**Previous:** [Chapter 3: Of God's Decree](${SITE}/1689-chapter-3-gods-decree)
**Next:** [Chapter 5: Of Divine Providence](${SITE}/1689-chapter-5-divine-providence)
`,
  },
]
