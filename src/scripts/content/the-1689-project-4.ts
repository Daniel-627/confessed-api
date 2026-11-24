// The 1689 Project — batch 4 of 8: chapters 13–16.
// Run: npx tsx src/scripts/seed-articles.ts the-1689-project-4
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
    order: 13,
    title: '1689 Chapter 13: Of Sanctification',
    slug: '1689-chapter-13-sanctification',
    excerpt:
      'Justification declares us righteous. Sanctification makes us righteous in practice, slowly, by the Spirit, through a lifelong fight against sin.',
    tags: ['1689', 'sanctification', 'holiness', 'confession', 'the-1689-project'],
    content: `Justification is what God declares about us once, completely, at the moment we believe. Sanctification is what God does *in* us over a lifetime. Chapter 13 explains the difference, and it explains why the Christian life is a fight.

## What the Confession says

Those who are united to Christ, effectually called and regenerated, having a new heart and a new spirit created in them through the virtue of Christ's death and resurrection, are also further sanctified, really and personally, through the same virtue, by his word and Spirit dwelling in them. The dominion of the whole body of sin is destroyed, and the several lusts thereof are more and more weakened and mortified, and they are more and more quickened and strengthened in all saving graces, to the practice of all true holiness, without which no man shall see the Lord.

> "Strive for peace with everyone, and for the holiness without which no one will see the Lord." — Hebrews 12:14

Notice the word *really*. Sanctification is not a legal fiction. Something actually changes in the believer.

## Sanctification is by grace

Like justification, sanctification is God's work:

> "Now may the God of peace himself sanctify you completely, and may your whole spirit and soul and body be kept blameless at the coming of our Lord Jesus Christ." — 1 Thessalonians 5:23

> "And I am sure of this, that he who began a good work in you will bring it to completion at the day of Jesus Christ." — Philippians 1:6

But that does not make us passive. Paul puts the two together:

> "Therefore, my beloved, as you have always obeyed, so now, not only as in my presence but much more in my absence, work out your own salvation with fear and trembling, for it is God who works in you, both to will and to work for his good pleasure." — Philippians 2:12–13

We work *because* God works. His work is the reason for our effort, not an alternative to it.

## It is not yet complete

The Confession is honest: this sanctification is throughout the whole man, yet imperfect in this life; there abides still some remnants of corruption in every part, whence arises a continual and irreconcilable war, the flesh lusting against the Spirit, and the Spirit against the flesh.

> "For the desires of the flesh are against the Spirit, and the desires of the Spirit are against the flesh, for these are opposed to each other, to keep you from doing the things you want to do." — Galatians 5:17

If you struggle with sin, that is not a sign that you are not a Christian. It is often a sign that you are. A dead person does not fight.

## Who wins

The Confession continues that in which war, although the remaining corruption for a time may much prevail, yet through the continual supply of strength from the sanctifying Spirit of Christ, the regenerate part does overcome; and so the saints grow in grace, perfecting holiness in the fear of God, pressing after an heavenly life, in evangelical obedience to all the commands which Christ as Head and King, in his word has prescribed to them.

> "For sin will have no dominion over you, since you are not under law but under grace." — Romans 6:14

The direction is toward holiness, even if the progress is uneven.

## What sanctification looks like in practice

- **Reading and obeying the word.** The Spirit uses Scripture.
- **Prayer.** We ask for what we need.
- **The church.** We grow with others, and not alone.
- **Putting sin to death.** Specific repentance, specific sins, specific fight.
- **Putting on the new self.** Cultivating love, joy, patience, and the rest.

## Why this matters

Without this chapter, we might think that grace leads to carelessness. The Bible says the opposite: those whom God justifies he also sanctifies. And without the previous chapters, we might think that holiness earns our acceptance. The Bible says the opposite there too: we are accepted first, and then we grow.

## Questions to think about

1. Which sin do you most need to fight, and what means has God given you for the fight?
2. How can you tell the difference between struggling against sin and giving up on holiness?
3. What encouragement does Philippians 1:6 give you today?

**Previous:** [Chapter 12: Of Adoption](${SITE}/1689-chapter-12-adoption)
**Next:** [Chapter 14: Of Saving Faith](${SITE}/1689-chapter-14-saving-faith)
`,
  },
  {
    order: 14,
    title: '1689 Chapter 14: Of Saving Faith',
    slug: '1689-chapter-14-saving-faith',
    excerpt:
      'What is the faith by which we are saved? A gift of God, worked by his Spirit through his word, resting on Christ alone, and growing through the means of grace.',
    tags: ['1689', 'faith', 'saving-faith', 'confession', 'the-1689-project'],
    content: `We have said many times that we are saved by faith. Chapter 14 asks the obvious question: what is it?

## A gift

The Confession says that the grace of faith, whereby the elect are enabled to believe to the saving of their souls, is the work of the Spirit of Christ in their hearts, and is ordinarily wrought by the ministry of the word.

> "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God." — Ephesians 2:8

> "So faith comes from hearing, and hearing through the word of Christ." — Romans 10:17

Faith is not something we manufacture and then offer to God. God gives it, normally through the preaching of the word. That is why preaching matters so much, and why we should listen with expectation.

## Grown by the means of grace

The Confession adds that by it is increased and strengthened by the administration of baptism and the Lord's Supper, prayer, and other means, God's grace increases. Faith is not static. It is meant to grow.

## What faith does

The Confession teaches that by this faith, a Christian believes to be true whatever is revealed in the word for the authority of God himself speaking therein. It acts differently according to what each passage contains:

- **To commands**, it yields obedience.
- **To threatenings**, it trembles.
- **To promises**, it embraces the life that is to come.

But the principal acts of saving faith are **accepting, receiving and resting upon Christ alone** for justification, sanctification and eternal life, by virtue of the covenant of grace.

That is the heart of it. Saving faith is not merely agreeing that certain facts are true. Even demons believe that there is one God. Saving faith has three elements:

1. **Knowledge.** We know who Christ is and what he has done.
2. **Assent.** We agree that it is true.
3. **Trust.** We rely on him personally, and on nothing else.

It is the third that saves. You may know a chair will hold you, and agree that it will, but you are not relying on it until you sit down.

> "looking to Jesus, the founder and perfecter of our faith, who for the joy that was set before him endured the cross, despising the shame, and is seated at the right hand of the throne of God." — Hebrews 12:2

Notice: Christ is both the *founder* and the *perfecter* of faith. He starts it and he finishes it.

## Weak faith is still faith

The Confession is pastorally wise. It says this faith, although it be different in degrees, and may be weak or strong, yet it is in the least degree of it different in the kind or nature of it, as is all other saving grace, from the faith and common grace of temporary believers; and therefore, though it may be many times assailed and weakened, yet it gets the victory, growing up in many to the attainment of a full assurance through Christ, who is both the author and finisher of our faith.

A trembling hand that grasps a strong rope is better than a strong hand that grasps a weak one. What matters is not the size of your faith, but the object of it.

> "Immediately the father of the child cried out and said, 'I believe; help my unbelief!'" — Mark 9:24

That is a prayer of real faith. If you pray it, you are in good company.

## Living faith

The Bible is equally clear that real faith produces works:

> "So also faith by itself, if it does not have works, is dead." — James 2:17

James and Paul do not contradict each other. Paul says that works do not *produce* justification. James says that works *prove* it. A faith that never changes anything was never the real thing.

## Why this matters

- **You do not need to be strong to be saved.** You need to be looking to a strong Saviour.
- **You can ask for more.** If faith is a gift, you can pray for it.
- **You should use the means.** Word, sacraments, prayer and the church are how God strengthens faith.

## Questions to think about

1. Is your faith resting more on your faith, or on Christ?
2. How might you use the means of grace more deliberately to strengthen weak faith?
3. What is the difference between believing facts about Jesus and trusting Jesus?

**Previous:** [Chapter 13: Of Sanctification](${SITE}/1689-chapter-13-sanctification)
**Next:** [Chapter 15: Of Repentance unto Life and Salvation](${SITE}/1689-chapter-15-repentance)
`,
  },
  {
    order: 15,
    title: '1689 Chapter 15: Of Repentance unto Life and Salvation',
    slug: '1689-chapter-15-repentance',
    excerpt:
      'Repentance is a gift and a turning: sorrow for sin, hatred of it, and a return to God. It is not the cause of forgiveness, but no one is forgiven without it.',
    tags: ['1689', 'repentance', 'confession', 'the-1689-project'],
    content: `Jesus began his public ministry with a command:

> "The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel." — Mark 1:15

Repent *and* believe. Chapter 14 dealt with faith. Chapter 15 now deals with its twin.

## A gift from God

The Confession says that such of the elect as are converted at riper years, having sometime lived in the state of nature, and therein served divers lusts and pleasures, God in their effectual calling gives them repentance unto life. So repentance, like faith, is a gift. It is not something we do first to earn God's attention.

## What it is

The Confession teaches that whereas there is none that does good and sins not, and the best of men may through the power and deceitfulness of their corruptions dwelling in them, with the prevalency of temptation, fall into great sins and provocations; God has, in the covenant of grace, mercifully provided that believers so sinning and falling be renewed through repentance unto salvation.

It then describes the nature of this saving repentance: it is an evangelical grace, whereby a person, being by the Holy Spirit made sensible of the manifold evils of his sin, does, by faith in Christ, humble himself for it with godly sorrow, detestation of it, and self-abhorrency, praying for pardon and strength of grace, with a purpose, and endeavour, by supporting grace, to walk before God unto all well-pleasing in all things.

In simple terms, repentance includes:

1. **Seeing sin** for what it is.
2. **Sorrow** over it, especially because it offends God.
3. **Hatred** of it.
4. **Turning** from it, with a real purpose to obey.
5. **Flight to Christ** for pardon and strength.

> "The sacrifices of God are a broken spirit; a broken and contrite heart, O God, you will not despise." — Psalm 51:17

It is not just feeling bad. Many people feel bad because of the consequences of what they have done. True repentance grieves because of what sin is, and turns toward God.

## Not the cause of forgiveness

The Confession is clear that repentance is not to be rested in as any satisfaction for sin or any cause of the pardon thereof, which is the act of God's free grace in Christ. We do not repent *in order to* earn forgiveness. Christ's death earns it. But repentance is the way in which forgiveness is received, and it is so necessary to all sinners that none may expect pardon without it.

> "No, I tell you; but unless you repent, you will all likewise perish." — Luke 13:3

## Specific and daily

The Confession says that as every man is bound to repent of his particular known sins particularly, so it is the duty of everyone to endeavour to repent of all his sins, in private, to God, by confessing them, and forsaking them. Those who sin against others must also make confession to those they have wronged, and when they do this, those who are offended are to be reconciled to them in love.

> "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness." — 1 John 1:9

Notice that this is a lifelong pattern. Christians do not repent once and then stop. We repent daily, as we notice sin, and each time we return to the cross.

## The danger of delay and of despair

There are two ways to get this wrong:

- **Delay:** "I will deal with this later." Every day of hardness makes the next harder.
- **Despair:** "I have sinned too much." That is to forget what the cross accomplished.

> "Whoever conceals his transgressions will not prosper, but he who confesses and forsakes them will obtain mercy." — Proverbs 28:13

## Why this matters

- **It keeps the gospel from becoming cheap grace.** Forgiveness is free, but it is never a licence.
- **It is how we stay close to God.** Unconfessed sin damages our fellowship, though not our standing.
- **It is a sign of life.** A heart that can still be grieved over sin is a heart the Spirit is working in.

## Questions to think about

1. Is there any sin you have been protecting instead of confessing?
2. How is godly sorrow different from worldly regret?
3. Who might you need to ask for forgiveness?

**Previous:** [Chapter 14: Of Saving Faith](${SITE}/1689-chapter-14-saving-faith)
**Next:** [Chapter 16: Of Good Works](${SITE}/1689-chapter-16-good-works)
`,
  },
  {
    order: 16,
    title: '1689 Chapter 16: Of Good Works',
    slug: '1689-chapter-16-good-works',
    excerpt:
      'Good works do not save us, but they are what saved people do. The Confession shows how they flow from faith, depend on the Spirit, and are accepted in Christ.',
    tags: ['1689', 'good-works', 'obedience', 'confession', 'the-1689-project'],
    content: `Chapter 16 comes with a hidden tension. We have just spent five chapters saying that we are saved by grace alone, through faith alone, in Christ alone. So what room is left for works? The Confession answers with a clear and balanced view: no room for works as the *ground* of salvation, but plenty of room for them as the *fruit*.

## Which works?

The Confession begins by saying that good works are only such as God has commanded in his holy word, and not such as, without the warrant thereof, are devised by men out of blind zeal, or upon any pretence of good intention. That is an important guardrail. We do not get to invent our own ways of pleasing God. Scripture defines what is good.

## The fruit and evidence of faith

These good works, done in obedience to God's commandments, are the fruits and evidences of a true and lively faith; and by them believers manifest their thankfulness, strengthen their assurance, edify their brethren, adorn the profession of the gospel, stop the mouths of the adversaries, and glorify God.

> "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them." — Ephesians 2:10

Salvation is not by works, but it is *for* works. We are saved by grace so that we might do good. Notice the order: first we are God's workmanship, then we walk in the works.

> "In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven." — Matthew 5:16

Good works also help others see that the gospel is real, and glorify the Father.

## Not in our own strength

The Confession is realistic: their ability to do good works is not at all of themselves, but wholly from the Spirit of Christ.

> "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing." — John 15:5

We are not to wait for a special push. But neither are we to be careless: believers are not to grow negligent, as if they were not bound to perform any duty unless upon a special motion of the Spirit, but they ought to be diligent in stirring up the grace of God that is in them.

## No merit

The Confession then says plainly that those who in their obedience attain to the greatest height that is possible in this life are so far from being able to supererogate, and to do more than God requires, as that they fall short of much which in duty they are bound to do. We cannot earn anything by our works. We cannot pay back what we owe. Even our best deeds are flawed and incomplete.

> "He saved us, not because of works done by us in righteousness, but according to his own mercy, by the washing of regeneration and renewal of the Holy Spirit." — Titus 3:5

## Accepted in Christ

Here is the comfort in the chapter. Although we cannot merit anything, the persons of believers being accepted through Christ, their good works also are accepted in him; not as though they were in this life wholly unblameable and unreprovable in God's sight, but that he, looking upon them in his Son, is pleased to accept and reward that which is sincere, although accompanied with many weaknesses and imperfections.

God accepts our imperfect works the way a father accepts a child's drawing. It is not perfect, but it is given in love, and he is pleased.

## The works of unbelievers

The Confession also says that works done by unregenerate men, although for the matter of them they may be things which God commands, and of good use both to themselves and others, yet because they proceed not from a heart purified by faith, nor are done in a right manner according to the word, nor to a right end, the glory of God, they are therefore sinful, and cannot please God. That does not mean that unbelievers are incapable of kindness, or that their kindness does not benefit others. It means that without faith, even good deeds do not please God as acts of worship. Yet their neglect of good works is more sinful and displeasing to God.

## Why this matters

- **It protects us from legalism and from licence.** Works are neither the root of salvation nor irrelevant to it.
- **It gives purpose to ordinary life.** Your daily work, your family, your church, your neighbours: all can be offered to God.
- **It frees us from anxiety.** We serve out of gratitude, not to earn acceptance.

## Questions to think about

1. Do you serve God more from fear or from gratitude?
2. What good work has God prepared for you that you have been avoiding?
3. How does it encourage you that God accepts imperfect obedience in Christ?

**Previous:** [Chapter 15: Of Repentance unto Life and Salvation](${SITE}/1689-chapter-15-repentance)
**Next:** Chapter 17: Of the Perseverance of the Saints (coming in the next batch)
`,
  },
]
