// src/scripts/content/reasoned-grace.ts
//
// Series: Reasoned Grace  (slug: reasoned-grace) — the front door for the honest non-believer.
// `order` is the position in the series. It is kept here so it can be backfilled into a
// `seriesOrder` column later without retyping anything.
// Scripture quotations are ESV. Review every article before publishing.

export const SERIES_SLUG = 'reasoned-grace'
const SITE = 'https://confessed.faith/articles'

export interface SeedArticle {
  order: number
  title: string
  slug: string
  excerpt: string
  tags: string[]
  content: string // markdown
}

export const articles: SeedArticle[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 1,
    title: 'Why Christianity Makes Sense',
    slug: 'why-christianity-makes-sense',
    excerpt:
      'Christianity is not a leap in the dark. It makes public claims about history, morality and meaning, and it invites you to test them. Here is why we think it holds up.',
    tags: ['apologetics', 'worldview', 'reasoned-grace', 'start-here'],
    content: `Most people assume that Christians believe because they were raised to, or because they need comfort, or because they have stopped asking questions. Some do. But the Bible itself does not ask for that kind of faith. It begins with an invitation:

> "Come now, let us reason together, says the LORD." — Isaiah 1:18

Reasoning together means you are allowed to push back. This series is written for people who do exactly that: honest people with real questions who are not interested in being talked down to. We will not pretend the questions are easy. We also will not pretend the answers are weak.

## Everyone starts somewhere

Nobody reasons from nowhere. Every person has a set of starting commitments about what is real, what can be known, and what matters. Some people begin with the idea that only the physical world exists. Others begin with the idea that a personal God made everything. These starting points shape what counts as evidence in the first place.

So the useful question is not "Which side has faith?" because everyone does. The useful question is: **which starting point actually makes sense of the things we cannot help relying on?**

## Five things you already rely on

Think about what you take for granted every day:

1. **Logic.** You assume that contradictions cannot both be true, and that good reasoning leads somewhere reliable.
2. **The order of nature.** You assume that tomorrow the world will behave roughly as it did today. Without that, science and ordinary life would be impossible.
3. **Right and wrong.** You assume that some things, like cruelty to a child, are not just disliked but truly wrong.
4. **Human dignity.** You assume that people matter, and that they matter equally.
5. **Meaning.** You assume that your questions, your relationships, and your work are about something.

Now ask what each worldview can say about where these come from and why they should be trusted.

## What Christianity says

The Christian claim is that a reasonable, good and personal God made the world and made us in his image:

> "So God created man in his own image, in the image of God he created him; male and female he created them." — Genesis 1:27

If that is true, a lot falls into place. The world is orderly because it was made by a mind. Our reasoning can reach truth because we were made to know. Right and wrong are real because they come from a holy God. People have dignity because they bear his image. And life has meaning because it was given a purpose.

Christianity does not ask you to switch off your mind to believe this. It asks you to notice that you are already living as though it were true.

## An honest wrinkle

Christianity also says something less flattering. It says that people are not neutral referees. The Bible teaches that we tend to push away what we know about God:

> "For his invisible attributes, namely, his eternal power and divine nature, have been clearly perceived, ever since the creation of the world, in the things that have been made." — Romans 1:20

That is not an insult to your intelligence. It is a claim about the human heart, and it applies to Christians as much as anyone. It means the real obstacle is often not a lack of evidence but a reluctance to be accountable to someone greater than ourselves. Ask yourself honestly whether that might be true of you.

## Test it

Do not take our word for it. Hold Christianity to the same standard you hold every other view to:

- Does it make sense of logic, morality, dignity and meaning?
- Does it fit the facts of history, including the life, death and resurrection of Jesus?
- Does it explain what is wrong with us, and offer a real answer?

In the articles that follow, we will take the hardest questions one at a time: faith and reason, suffering, morality, science, the reliability of the Bible, the resurrection, and the claim that Jesus is the only way.

## Where this leads

Christianity is not only a set of ideas that fits the world. It is good news about a person. God did not stay distant. He sent his Son to rescue people who had turned away from him, and he invites you to come. If you have been looking for something that is both true and good, read on.

**Next:** [Is Faith Anti-Intellectual?](${SITE}/is-faith-anti-intellectual)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 2,
    title: 'Is Faith Anti-Intellectual?',
    slug: 'is-faith-anti-intellectual',
    excerpt:
      'Many people think faith means believing without evidence. That is not what the Bible means by faith. It is trust, and it is meant to be used with your mind switched on.',
    tags: ['apologetics', 'faith-and-reason', 'reasoned-grace'],
    content: `A common picture of faith goes like this: reason deals with facts, and faith is what you use when you have run out of facts. On that view, believing in God is a kind of mental shortcut for people who do not want to think too hard.

It is worth asking where that picture came from, because it is not the one the Bible gives.

## What the Bible means by faith

> "Now faith is the assurance of things hoped for, the conviction of things not seen." — Hebrews 11:1

Notice the words: *assurance* and *conviction*. These are words of confidence, not wishful thinking. In the Bible, faith means **trust**: relying on someone because you have good reason to think they are reliable. You exercise this kind of faith every time you sit on a chair, take medicine from a pharmacist, or accept that a city you have never visited exists.

Biblical faith is trust in a person, God, who has made himself known. It is not a leap into the dark. It is a step onto solid ground.

## The Bible invites investigation

The writers of Scripture repeatedly appeal to evidence. Luke begins his Gospel by explaining that he has carefully investigated everything from the beginning, drawing on eyewitnesses, so that his reader may know the certainty of what he has been taught. Paul, writing about the resurrection, points to people who saw Jesus alive and who could still be asked. The risen Jesus invited his doubting disciples to look at his hands and feet.

This is not the language of people who want you to stop thinking. It is the language of people who expect their claims to be checked.

## Love God with your mind

When Jesus was asked what the greatest commandment was, he answered:

> "You shall love the Lord your God with all your heart and with all your soul and with all your mind." — Matthew 22:37

The mind is included. Christianity has never been a religion for the lazy. Many of the earliest European universities grew out of church schools, and across the centuries Christians have been among the most serious readers, scientists and philosophers. That is not an accident. If God made the world and made us able to understand it, then careful thinking is a way of honouring him.

## Everyone has faith

Here is the awkward part for the "faith versus reason" picture: no one escapes faith, and no one gets by without reason.

- The person who says "I only believe what can be proven by science" is stating something that cannot be proven by science.
- The person who trusts their own reasoning has to trust, without being able to prove it first, that their reasoning is reliable.
- The person who trusts their memory, their senses, or the testimony of historians is trusting sources they cannot fully verify.

So the real question is not whether you have faith. It is **what your faith rests on, and whether it can carry the weight.** Reason is a wonderful tool, but it cannot be its own foundation. Something has to make sense of why reasoning works at all.

## Where reason runs out

Christianity does not claim to answer every question, and it admits that some things are beyond us. But that is different from being irrational. A good map does not show every blade of grass, and it is still a reliable guide. God has told us enough to know him, to trust him, and to find our way home. The rest we can leave in his hands.

## The invitation

If you have been told that you must choose between thinking and believing, that choice has been made up. You do not need to leave your mind at the door. You need to follow it as far as it will go, and then ask what it is that makes thinking possible at all.

The Bible says the beginning of knowledge is to honour the God who made the mind:

> "The fear of the LORD is the beginning of knowledge." — Proverbs 1:7

And the One we are asked to trust is not an idea. Jesus said, "Come to me, all who labor and are heavy laden, and I will give you rest." He welcomes questions. Bring yours.

**Next:** [Isn't Religion Just a Crutch?](${SITE}/isnt-religion-just-a-crutch)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 3,
    title: "Isn't Religion Just a Crutch?",
    slug: 'isnt-religion-just-a-crutch',
    excerpt:
      'Perhaps people only believe in God because they need comfort. But where a belief comes from does not tell you whether it is true, and Christianity is far more demanding than comforting.',
    tags: ['apologetics', 'objections', 'reasoned-grace'],
    content: `One of the oldest objections to belief in God is that people only believe because they need to. Life is hard, death is frightening, and so we invent a heavenly Father to make ourselves feel better. Sigmund Freud argued something like this, calling religion a wish-fulfilment, and Karl Marx called it the opium of the people.

It is a serious objection, and many people carry it quietly. It deserves a fair answer.

## Where a belief comes from is not whether it is true

Suppose someone showed that you only believe your house is safe because the thought is comforting. That would not prove your house is unsafe. It would only mean you should check. In the same way, even if wishes played a part in why some people believe in God, that tells us nothing about whether God exists. Logicians call this the genetic fallacy: judging a claim by its origin instead of its merits.

And the argument cuts both ways. If belief can be a wish, so can unbelief. Some people may want there to be no God because a God would mean a judge, and a moral law above their own choices. A thoughtful sceptic should be willing to ask honestly what they might want to be true. The only fair move is to set the psychology aside and ask: **is it true?**

## Christianity is a poor crutch

Think about what a comfort-religion would look like. You would design a faith that tells you you are basically fine, that nobody is going to be held to account, that you may live as you please, and that everyone ends up happy. That is the kind of thing a wish would produce.

Christianity says almost the opposite. It says:

- you are not basically fine; you have a problem you cannot fix by yourself
- you will be held to account by a holy God
- following Jesus means giving up your claim to run your own life:

> "If anyone would come after me, let him deny himself and take up his cross daily and follow me." — Luke 9:23

The cross was not a symbol of comfort. It was an instrument of public execution. A religion built on a crucified Saviour, with a call to take up your own cross, is not the sort of thing people dream up to feel better. Down the centuries, many people have faced prison, torture and death rather than deny it. Few would do that for a comforting daydream.

## But isn't it true that Christians do find comfort?

Yes, and they should not deny it. Jesus said:

> "Come to me, all who labor and are heavy laden, and I will give you rest." — Matthew 11:28

There is real peace in knowing that you are forgiven, that God is near, and that death is not the end. But comfort that follows from something true is not a flaw. If there is a physician, then it is not weak to go to him. A person who is ill and who finds relief after being given the right medicine has not shown that the medicine is imaginary.

And the Christian will happily admit the rest of the charge. Yes, we need help. We are needy creatures. The Bible does not flatter us on that point. The question is not whether we need rescuing, but whether there is a rescuer.

## What is actually broken

If Christianity has a crutch to offer, it is for something that really is broken. Most of us know it, even when we do not say it aloud. We know we have not lived as we should. We know we carry guilt, and that we cannot simply argue it away. We know the people we love will die, and so will we.

Those are not weaknesses invented by religion. They are facts about the human condition, and a worldview that has nothing to say about them is not strong; it is silent. The gospel speaks to exactly these things:

> "But God shows his love for us in that while we were still sinners, Christ died for us." — Romans 5:8

## A better question

So instead of asking "Do people believe because they are weak?", ask the question that counts: **Is it true that Jesus died and rose again?** If it is, then it is no crutch at all. It is the most important fact there is, and no amount of psychology can make it go away. If it is not, then Christians are fools, as Paul himself admitted. Either way, the issue is settled by evidence and not by guesses about motives.

We will look at that evidence in the pages ahead. For now, we simply ask you to keep the question open, and to be as honest with yourself about your motives as you would like us to be about ours.

**Next:** [Why Does God Allow Suffering?](${SITE}/why-does-god-allow-suffering)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 4,
    title: 'Why Does God Allow Suffering?',
    slug: 'why-does-god-allow-suffering',
    excerpt:
      'Suffering is the hardest question there is. Christianity does not offer a glib answer, but it does offer a God who has entered our pain and promised to end it.',
    tags: ['apologetics', 'suffering', 'problem-of-evil', 'reasoned-grace'],
    content: `If you are reading this because of something you have lost or suffered, we are sorry. Before anything else, we want to say that this question is not a puzzle to us. It is the one that has caused more honest people to walk away from faith than any other, and it should never be answered cheaply.

## Two different questions

When people ask why God allows suffering, they are often asking two things at once.

**The personal question:** *Where is God when it hurts? Does he care about me?*

**The logical question:** *How can a good and powerful God exist alongside so much evil?*

They need different answers, and it helps to separate them.

## The logical question

The argument is that if God is all-powerful, he could stop evil, and if he is all-good, he would want to. Since evil exists, there is no such God.

Here is a point worth thinking about carefully. The argument only works if evil is real: that is, if some things are truly wrong and ought not to be. But where does that standard come from? If the universe is just matter and chance, then suffering is simply what happens, and "evil" is only a word for what we dislike. The very force of the objection assumes a moral law that is more than opinion, and a moral law points toward a moral lawgiver.

That does not make the pain any smaller. But it does mean the objection cannot be a simple knock-down argument against God, because it borrows from the idea it is trying to defeat.

The Bible also gives us a framework for understanding why a good God might permit evil. It tells us that this world is not as God made it: sin has damaged it, and we are all caught up in that. And it tells us that God is working a purpose even through evil, without ever being its author. Joseph said to the brothers who sold him into slavery:

> "As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive, as they are today." — Genesis 50:20

We should be careful here. We cannot tell you the reason for any particular tragedy, and anyone who claims to is probably wrong. Sometimes we simply do not know. Job asked God for an explanation, and God did not give him one; he gave him himself:

> "Where were you when I laid the foundation of the earth? Tell me, if you have understanding." — Job 38:4

God's answer was not an argument. It was a presence.

## The personal question

This is where Christianity is unlike every other explanation. The Christian answer to suffering is not mainly a theory. It is a person.

Jesus did not watch our pain from a distance. He became one of us. He knew hunger, rejection, betrayal and grief. At the grave of his friend Lazarus, with the power to raise him in a moment, the shortest verse in the Bible says:

> "Jesus wept." — John 11:35

Then he went to the cross. The Bible teaches that this was no accident but the plan of God:

> "This Jesus, delivered up according to the definite plan and foreknowledge of God, you crucified and killed by the hands of lawless men." — Acts 2:23

The worst evil in history, the murder of the only innocent man, is the very means by which God rescues sinners. That does not explain every tragedy. But it shows us that God does not stand outside suffering. In Christ, he has taken it on himself, and he has turned the greatest wrong into the greatest good.

## The promise

Christianity does not tell us suffering is an illusion or that it does not matter. It tells us that it is real, that it will end, and that God will personally deal with it:

> "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away." — Revelation 21:4

And until then:

> "The LORD is near to the brokenhearted and saves the crushed in spirit." — Psalm 34:18

## If you are hurting

You do not have to have all the answers to come to him. You do not have to hide your anger or your doubt. The Psalms are full of both. Come as you are, and talk to him honestly.

If you are not hurting today, remember that someone around you probably is, and that the God of the Bible weeps with those who weep.

Jesus said, "Come to me, all who labor and are heavy laden." Of all the explanations on offer for suffering, only the Christian one comes with a God who has suffered for you and who says, "Come."

**Next:** [Can I Be Good Without God?](${SITE}/can-i-be-good-without-god)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 5,
    title: 'Can I Be Good Without God?',
    slug: 'can-i-be-good-without-god',
    excerpt:
      'Of course atheists can be good people. The real question is what makes anything good in the first place, and whether any of us is as good as we think.',
    tags: ['apologetics', 'morality', 'reasoned-grace'],
    content: `Let us begin by saying something clearly: yes, you can be good without believing in God. Many non-believers are kind, generous, honest and brave, and some put Christians to shame. The Bible expects this. It says that God's moral law is written on every human heart, so even people who do not know the Bible show something of what it requires.

So the question is not whether non-believers can *behave* well. The question is deeper.

## The real question: what makes something good?

When you say that cruelty is wrong, what are you saying? Are you saying "I dislike it", or are you saying "it is wrong, whether anyone likes it or not"?

Most of us mean the second. We do not think that the Holocaust was only unpopular. We think it was evil, and that it would still have been evil if everyone had agreed to it. We think moral reformers who opposed slavery were *right*, not merely early.

That kind of moral conviction needs a foundation. There are a few candidates.

- **Personal feeling.** But if morality is a matter of taste, then "I should not be cruel" has no more authority than "I prefer vanilla ice cream."
- **Social agreement.** But then the abolitionists were simply wrong for disagreeing with their society, and every reformer was just a troublemaker.
- **Evolution.** It can explain why we *feel* moral pressure. It cannot explain why we *ought* to obey it. A feeling that helped our ancestors survive is not the same thing as a moral truth.

Thoughtful secular philosophers have tried hard to ground morality without God, and they deserve to be taken seriously. Our honest view is that none of the proposals fully explains why moral duties exist and why they bind everyone. Christians believe there is a better answer.

## The Christian answer

The Bible says that goodness is not something we invented. It comes from God's own character, and it is built into the world he made:

> "So God created man in his own image, in the image of God he created him; male and female he created them." — Genesis 1:27

Every human being, whatever their belief, carries God's image. That is why people have dignity and rights, and why cruelty is truly wrong: it is a violation of something sacred. Your moral sense is not an accident. It is a sign that you were made by a good God who has written his law on your conscience.

In other words, when a non-believer insists that some things are truly wrong, they are agreeing with the Christian worldview even while denying it. That is not an insult. It is a reason to take the question seriously.

## But how good is good enough?

There is a second, harder question, and the Bible does not let us skip it. Even if we grant that you can be good, the question is how good you are, and who gets to decide.

Most of us compare ourselves to other people and conclude that we are pretty decent. But the standard God sets is not "better than average." It is perfection, and not just in what we do. It includes what we think, what we want, and whether we love God and our neighbour with our whole heart. When we measure ourselves honestly against that, we all fall short:

> "For all have sinned and fall short of the glory of God." — Romans 3:23

That is not a claim that everyone is as bad as they could be. It is a claim that no one is as good as they should be. If you have ever done something you were ashamed of, if you have ever known what was right and not done it, then you know what the Bible is describing.

## So what do we do?

This is the good news in the middle of the hard news. The gospel is not "be good enough." It is that **Christ was good in our place.**

> "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord." — Romans 6:23

Jesus lived the perfect life none of us has lived, died the death we deserved, and rose to give his people a new life. Forgiveness is a gift, not a wage. That means you do not need to become good before you come. The people Jesus received were the ones who knew they were not.

## Where to go from here

Yes, you can be good without God, in the way people are good every day. But you cannot find a firm reason for goodness, or a solution for your failures, without him. We invite you to stop asking whether you are good enough, and start asking who can make you right.

**Next:** [Has Science Disproved God?](${SITE}/has-science-disproved-god)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 6,
    title: 'Has Science Disproved God?',
    slug: 'has-science-disproved-god',
    excerpt:
      'Science is one of the great achievements of the human mind. But it cannot disprove God, and the reasons it works at all point toward him.',
    tags: ['apologetics', 'science', 'reasoned-grace'],
    content: `Many people believe that science and Christianity are enemies, and that as science advances, God gets pushed out. It is worth asking whether that is true. We want to say at the start that we love science. We think that it is one of the finest things human beings have done, and that Christians should be among its strongest supporters.

## What science can and cannot do

Science is a method for studying the natural world: by observing, measuring, testing and repeating. It is brilliant at answering questions like *how does this work?* and *what is this made of?*

But think about what that method cannot do. A thermometer cannot tell you if a poem is beautiful. A microscope cannot tell you whether you ought to be kind. In the same way, a method that studies the natural world cannot, by its own tools, prove or disprove whether the natural world has a Maker. That is a different kind of question, and it is answered by reasoning and evidence of other kinds.

When someone says "science has disproved God", they are usually not reporting a scientific finding. They are stating a philosophical belief, that nothing exists beyond the natural world, and attaching the prestige of science to it. That belief might be right or wrong, but it is not a laboratory result.

## What science takes for granted

Here is the more interesting point. Science itself rests on things it cannot prove:

- that the universe is **orderly** and behaves consistently, so that experiments done today tell us about tomorrow
- that the universe is **understandable**, so that mathematics can describe it
- that our **senses and minds are reliable** enough to learn from it
- that **truth is worth pursuing**

These are not discoveries of science. They are conditions that make science possible. And the Christian worldview supplies them naturally. If a rational God made an ordered world, and made us in his image to understand it, then we would expect nature to be intelligible and our minds to be suited to studying it.

It is no coincidence that modern science took root in a culture shaped by the belief in a lawful creation. Kepler, Boyle and Newton were committed Christians who saw their work as studying the handiwork of God. The Bible itself says:

> "The heavens declare the glory of God, and the sky above proclaims his handiwork." — Psalm 19:1

By contrast, if the universe is a product of mindless chance, it is surprising that our minds should be trustworthy guides to it at all. Why would a brain shaped only for survival be good at finding deep truths about quantum physics or the origin of the cosmos? That is a question every worldview has to answer.

## What about the hard cases?

Christians hold a range of views about some questions, such as how to read the early chapters of Genesis and how old the earth is. That is a conversation worth having, and we will address it elsewhere. But it is a conversation inside the Christian faith about how to interpret a text, and not a proof that God does not exist.

What about miracles? Some people say science has shown they are impossible. It has not. Science describes how nature normally behaves. If God exists and made nature, he is free to act in it. A miracle is not a violation of the laws of nature; it is the Author doing something unusual in his own story. Whether a particular miracle happened is a matter of historical evidence, which is why the resurrection (our subject later) deserves a careful look.

## A bigger picture

The deeper issue is this. Science tells us how things work. It does not tell us why there is something rather than nothing, why we are here, or what we should do. Those questions matter to every one of us, and they are the ones the Bible speaks to. God answered Job's questions by pointing him to the wonders of creation and asking:

> "Where were you when I laid the foundation of the earth? Tell me, if you have understanding." — Job 38:4

The more we learn, the more the question seems to deserve an answer.

## What science cannot give you

Science can tell you how a heart works, but it cannot mend a conscience. It can map the stars, but it cannot forgive sins. The most important problem in your life is not a problem of information. It is that you are a sinner who has to meet your Maker.

The good news is that the God who made the universe also entered it. He came, in the person of Jesus, to deal with that problem for everyone who trusts in him. The same Lord who set the stars in place gave his life for you.

**Next:** [Can We Trust the Bible?](${SITE}/can-we-trust-the-bible)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 7,
    title: 'Can We Trust the Bible?',
    slug: 'can-we-trust-the-bible',
    excerpt:
      'Is the Bible a reliable record, or a collection of legends changed over time? Here is what we know about how it was written, copied and handed down.',
    tags: ['apologetics', 'bible', 'scripture', 'reasoned-grace'],
    content: `If the Christian faith is true, it depends on something that happened in history, and we only know about it through documents. So an honest person has to ask: can those documents be trusted? Were they written by people who knew what they were talking about? And have they come down to us accurately?

Here is a fair summary of the case, without overstating it.

## The Bible is a library, not one book

The Bible is made up of 66 books, written by dozens of authors over more than a thousand years, in three languages. They include history, poetry, law, letters and prophecy. This matters, because it means we cannot judge them all by a single rule. Each has to be read for what it is.

## Written close to the events

For the New Testament, which tells us about Jesus, the key question is *how close to the events were the writings?*

- Paul's letters, the earliest New Testament writings, were written within a few decades of Jesus's death, and in 1 Corinthians he passes on a summary of the gospel that he says he himself received, which points back to the earliest years of the church.
- The four Gospels were written within the first century, while eyewitnesses were still alive. Luke says plainly that he wrote after careful investigation, using the accounts of those who were eyewitnesses from the beginning.

Compared to most ancient history, that is very close. Much of what we accept about the ancient world rests on sources written centuries after the events.

## Copied with extraordinary care

We do not have the original manuscripts of any ancient book, so what matters is how many copies survive and how well they agree.

For the New Testament, there are **thousands** of Greek manuscripts, more than 5,000, plus many thousands more in other languages, and quotations in early Christian writers. That is vastly more than for any other ancient work. When scholars compare them, they do find differences. We should say so plainly, because pretending otherwise would be dishonest. But the great majority are small matters of spelling or word order, and none of the differences changes a central Christian teaching. Textual scholars can, in nearly all cases, tell what the original text said.

For the Old Testament, the discovery of the Dead Sea Scrolls provided copies of the book of Isaiah about a thousand years older than those we had before. They matched the later text remarkably closely, showing how faithfully it had been copied.

## Confirmed where we can check

Archaeology has repeatedly confirmed places, people and customs mentioned in the Bible that critics once doubted. We should not claim that archaeology proves the Bible; it cannot prove, for example, that Jesus rose from the dead. But the writers get ordinary details right, and that is what we would expect from people who were writing about real events.

## The deeper question

For most people, though, the real obstacle is not manuscripts. It is a prior belief: that miracles do not happen, so any document that reports them must be legend. But that is not a historical conclusion. It is a starting assumption. If there is a God who made the world, then miracles are possible, and the evidence has to be allowed to speak.

## What the Bible says about itself

The Bible claims to be more than a record. It says that God is its ultimate author:

> "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness." — 2 Timothy 3:16

Christians believe this not only because of the historical evidence but because of what the Bible does. It diagnoses the human heart, and it offers a rescue that no human would think of: that God himself would die for his enemies. It rings true to what we know about ourselves.

## The point of it all

The Bible is not meant to be an end in itself. Jesus said to people who studied Scripture carefully but missed its message:

> "You search the Scriptures because you think that in them you have eternal life; and it is they that bear witness about me." — John 5:39

Its whole purpose is to introduce you to him. Read it, starting with one of the Gospels, such as the Gospel of John. Read it as you would any serious source, with an open mind. And ask God, if he is there, to show you whether it is true.

**Next:** [Did Jesus Really Rise from the Dead?](${SITE}/did-jesus-really-rise-from-the-dead)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 8,
    title: 'Did Jesus Really Rise from the Dead?',
    slug: 'did-jesus-really-rise-from-the-dead',
    excerpt:
      'Christianity stands or falls on one historical claim: that Jesus rose from the dead. Here is the evidence, and why other explanations struggle to account for it.',
    tags: ['apologetics', 'resurrection', 'jesus', 'reasoned-grace'],
    content: `Christianity makes a claim that you can test: that a man named Jesus was executed, buried, and then rose bodily from the dead. The apostle Paul was clear about how much depends on it:

> "And if Christ has not been raised, then our preaching is in vain and your faith is in vain." — 1 Corinthians 15:14

Christianity does not claim to be merely helpful. It claims to be true, and it stakes everything on the resurrection. So it is fair to ask for evidence. Here is what we have.

## What is widely accepted

Historians who study the first century, whether Christian or not, agree on a number of basic facts.

1. **Jesus was crucified under Pontius Pilate.** Even the Roman historian Tacitus, who had no sympathy for Christians, records that Christ was executed under Pilate.
2. **His followers sincerely believed that he rose and appeared to them.** The question is not whether they believed it, but why.
3. **The church began in Jerusalem, in the same city and within weeks of the crucifixion.** If the body was still in the tomb, it would have been very easy to produce it and end the movement.
4. **Former sceptics were convinced.** Paul was a violent persecutor of the church, and James, the brother of Jesus, did not believe in him during his ministry. Both became leaders of the movement, and both were willing to suffer for it.

## An early report

Paul sets out the core of the message in 1 Corinthians 15, and says it was something he himself had received:

> "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures." — 1 Corinthians 15:3–4

Most scholars think this summary goes back to within a few years of the crucifixion. That is far too early for legend to have grown up. He goes on to list the people who saw Jesus, including more than five hundred at one time:

> "Then he appeared to more than five hundred brothers at one time, most of whom are still alive, though some have fallen asleep." — 1 Corinthians 15:6

That is an unusual thing to write if you are making it up: it invites people to go and ask.

## The accounts themselves

The Gospels report that women were the first witnesses to the empty tomb. In the first-century world, a woman's testimony was not highly regarded, so if the early Christians had been inventing the story, this is not the detail they would have chosen. It reads like a report of what happened, even though it was embarrassing.

And the accounts are not of a vague spiritual experience. They describe a physical, recognisable body:

> "See my hands and my feet, that it is I myself. Touch me, and see. For a spirit does not have flesh and bones as you see that I have." — Luke 24:39

## The alternatives

Some people have suggested other explanations. They deserve a fair hearing, and each runs into problems.

- **The disciples stole the body.** But then they knew the message was a lie, and yet were willing to be beaten, imprisoned and killed for it. People will die for what they believe is true; it is much harder to see them die for what they know is false.
- **Jesus did not really die.** But Roman executioners knew their job, and a man who barely survived a crucifixion could not have convinced his followers that he had conquered death.
- **They hallucinated.** Hallucinations are private experiences, not shared by groups at different times and places, and they do not empty tombs. They also would not convince sceptics like Paul and James.
- **It is a legend that grew later.** But the early date of the reports, and the fact that people who could check them were still alive, count heavily against that.

## The deeper issue

Honesty requires one more point. If you rule out miracles in advance, then no amount of evidence will ever be enough, since you have decided before looking. But that is a choice about what you will accept, not a conclusion of historical research. The better approach is to ask which explanation best accounts for the facts, and be willing to follow the answer where it goes.

The simplest explanation of the empty tomb, the changed disciples and the birth of the church is the one they gave: *he is risen.*

## What it means

If Jesus rose, then everything he said was vindicated. He claimed to be the Son of God, and to forgive sins. His death was not a failure but a rescue, and death itself has been defeated. He is alive, and he now calls everyone to turn from their sins and trust him.

This is not a theory. It is an announcement. And it comes with an invitation: look into it for yourself, and then trust the one who is alive.

**Next:** [Is Jesus the Only Way?](${SITE}/is-jesus-the-only-way)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 9,
    title: 'Is Jesus the Only Way?',
    slug: 'is-jesus-the-only-way',
    excerpt:
      'The claim that Jesus is the only way to God sounds arrogant to many people. But who made the claim, and what does it really say?',
    tags: ['apologetics', 'exclusivity', 'jesus', 'reasoned-grace'],
    content: `Of all the things Christians say, this one is probably the hardest to hear. In a world with many religions and many sincere people, it sounds narrow, even arrogant, to say that Jesus is the only way to God. We want to take that reaction seriously and look at what is actually being claimed.

## Who said it?

First, notice who made the claim. It was not a later church leader. It was Jesus himself:

> "I am the way, and the truth, and the life. No one comes to the Father except through me." — John 14:6

His followers repeated it:

> "And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved." — Acts 4:12

This was not a claim Christians came up with to look superior. It was, and still is, the heart of what Jesus taught about himself. You might decide that he was wrong. But you cannot make Jesus into a teacher of "all roads lead to God", because that is not what he taught.

## Every view is exclusive

Here is something we do not often notice: **every worldview excludes the others.** The person who says "all religions are equally valid" is saying that those who claim only one is true are mistaken. That is itself an exclusive claim.

Religions also disagree with each other on basic matters, and not just on details. Some say God is personal, and others that God is impersonal. Some say that we live once, and others that we are reborn many times. Some say that salvation is earned, and others that it is a gift. They cannot all be right on those points. So the real question is not whether a view is exclusive, but whether it is *true*. And the way to answer that is by looking at the evidence, such as the resurrection, which is what Jesus pointed to.

## Narrow, or wide open?

The gospel is narrow in one respect: there is one Saviour. But in another way it is the widest invitation there could be.

> "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." — John 3:16

*Whoever.* Not those from one nation, or one class, or those who have done enough good, but anyone. The way is narrow, but the door is open to everyone who will come. In other religions, you must earn your place. In Christianity, someone else has done the work, and it is offered freely.

Think of it like this. If a doctor discovers the only cure for a deadly disease, and tells everyone, we do not call him arrogant. We call him kind. Christians are not saying "we are better than you." They are saying something more like one hungry person telling another where the food is.

## What about those who have never heard?

This is an honest question, and many Christians struggle with it. We should not pretend to know more than the Bible says. But three things are clear.

1. God is perfectly just. As Abraham said, "Shall not the Judge of all the earth do what is just?" (Genesis 18:25). We can trust him to do right by every person.
2. No one is condemned for lacking information they could not have had; people are held accountable for the light they have, and the Bible says all of us have turned away from that.
3. This is exactly why the gospel is to be taken to every nation. The message is urgent *because* it matters.

## Why this should not offend us

If Jesus is who he said he is, God in human flesh, who died for sinners and rose again, then it would be strange to expect any other way to be needed. Think about it. If someone has paid the debt for you, why would you look for another payment plan? The cross was the cost of forgiveness, and it was paid in full.

And if there were another way, the cross would be pointless. Jesus prayed in Gethsemane, asking if there was any other way; there was not.

## An invitation

You do not have to take this on trust. Read what Jesus said, look at the evidence for the resurrection, and ask whether the claim is true. If it is, nothing could matter more. And if it is true, then the invitation is for you too, however far you feel from God, and however many questions you still have.

**Next:** [What Is the Gospel, Exactly?](${SITE}/what-is-the-gospel-exactly)
`,
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    order: 10,
    title: 'What Is the Gospel, Exactly?',
    slug: 'what-is-the-gospel-exactly',
    excerpt:
      'The word gospel means good news. Here is the news itself, in plain words: who God is, what is wrong with us, what Christ has done, and how to respond.',
    tags: ['gospel', 'salvation', 'start-here', 'reasoned-grace'],
    content: `Over these articles we have looked at the questions people raise: faith and reason, suffering, morality, science, the Bible, the resurrection, and the claim that Jesus is the only way. Now we come to the thing itself.

The word *gospel* means "good news." It is not advice about how to live. It is not a list of rules, or a programme of self-improvement. It is an announcement about something that has happened. Here it is, as plainly as we can put it.

## 1. God

There is one God, who made everything, including you. He is holy, which means perfectly good, with nothing wrong in him at all. He is also loving, and he made us to know him and to enjoy him. We were made to live in friendship with him.

## 2. Us

But we have turned away. The Bible calls this **sin**: not just the bad things we do, but the fact that we have put ourselves in God's place and live as though we did not owe him anything. It is not that some people have sinned. It is that everyone has:

> "For all have sinned and fall short of the glory of God." — Romans 3:23

The consequence is serious. A holy God cannot overlook evil, and sin brings separation from him, which ends in death:

> "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord." — Romans 6:23

Nothing we do can fix this. We cannot undo the past, or make ourselves clean, by trying harder.

## 3. Christ

This is where the good news begins. God did not leave us in our sin. He sent his Son, Jesus Christ, who is fully God and fully man. He lived the perfect life that we have failed to live. Then he died on a cross, and he did so *in the place of sinners*, taking the punishment that was ours:

> "But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed." — Isaiah 53:5

> "But God shows his love for us in that while we were still sinners, Christ died for us." — Romans 5:8

And on the third day he rose from the dead, proving that his sacrifice was accepted and that death has been beaten:

> "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures." — 1 Corinthians 15:3–4

That is the gospel. Christ lived, died and rose. The work is finished.

## 4. Our response

How do we receive this? Jesus began his preaching with these words:

> "The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel." — Mark 1:15

**Repent** means to turn: to stop running from God and to agree with him about your sin. **Believe** means to trust: to rely on Christ alone, and not on your own goodness, to make you right with God.

> "Because, if you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved." — Romans 10:9

And it is a gift. You cannot earn it and you do not have to:

> "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast." — Ephesians 2:8–9

## What the gospel is not

- It is **not** "be good and God will accept you." That is what everybody else says.
- It is **not** a ritual, or belonging to a particular group.
- It is **not** a way to get a better life now, though it changes everything about how we live.

It is the news that someone has done for you what you could never do for yourself.

## What now?

If these words describe what you believe, or what you want to believe, here are some honest next steps:

- **Talk to God.** You do not need special words. Tell him you have sinned, that you trust Christ, and ask him to forgive and change you.
- **Read the Gospel of John.** It was written so that readers "may believe that Jesus is the Christ, the Son of God."
- **Find a faithful church.** Christians are not meant to live alone. Look for one that teaches the Bible and honours Christ.
- **Tell someone.** Share what you have decided with a Christian friend.

If you are not there yet, that is all right. Keep asking questions, and keep reading. God is patient with honest seekers.

We would be glad to hear from you, whatever you are thinking. You can [contact us](https://confessed.faith/contact) at any time. And when you are ready to go deeper, our *Articles of Faith* series walks through the great doctrines of the faith, one at a time, and the *Daily Office* will help you read the Bible each day.

Jesus said, "Come to me, all who labor and are heavy laden, and I will give you rest." That invitation still stands.
`,
  },
]
