import aiTasksDoubling from '/src/assets/images/length-of-ai-tasks-doubling.webp';
import scalingLaws from '/src/assets/images/scaling-laws.png';

export default `
<div class="career-planning-in-the-age-of-ai"></div>

# Career Planning in the Age of AI

I've decided to split this post into the following overarching structure:

1. Why I'm writing this in the first place.
2. Why I think AGI is likely, and is probably coming soon
3. What are the possible future states we could end up in
4. What I should do based on the possible future states

I'll also throw in some asides about short term and long term planning and affordances for why I might be wrong. I will be defining AGI (artificial general intelligence) in this post as an AI that can do every cognitive task (as in a task that can be done while sitting at a desk) that a human can at expert human ability. For example, a single AI system that can do math at the level of top mathematicians, is as good as the top level software engineers, can write as well as the best novelists, can be as good of a personal assistant as exists, and other such jobs/skills.

## Why am I writing this?

It's been about 5 years since OpenAI's release of GPT-3 (ChatGPT was released in 2022 based upon GPT-3.5) hearkening in the age of generative LLMs that have rocketed machine learning to the fore of societal attention replacing whatever was in the technological zeitgeist previously (crypto probably?).

I want to draw attention to this timeline at the top; to put the current moment of technological progress into perspective and illustrate how this might begin to explain why I feel so much anxiety about the future of software engineering and knowledge-work writ large.

A few days ago I saw a video of a person building an entire website (with a few reasonably complicated features), replete with an attractive UI, backend server, and database, and deploy it to the public internet, all in about 20 minutes with the help of the AI code editor, Cursor, and Anthropic's newest model, Claude 3.7.

[Youtube](https://www.youtube.com/live/SDuvi5eUqp0?t=24850s)

There are two things here that strike me as important:

1. This man created an incredibly detailed Product Requirements Doc (PRD), which he iterated on at least 60 times before Claude was able to build the site in one go.
2. Cursor has existed for only 2 years (if that) and LLM's have existed (in their transformer architecture and more capable form) for only around 4 years. I harp on the timelines to remind myself that this technology is in its infancy.

So although this demonstration is, on one hand, impressive and, on the other hand, not _THAT_ impressive, I think _this is the worst it'll ever be_.

But that's just my opinion, right? Let's make this a bit more concrete and objective.

### Show me charts!

![image alt text](${aiTasksDoubling})

There was a recent paper by the good folks at METR analyzing the tasks that AI has been able to do reliably and found that the length of the tasks has been steadily increasing exponentially. Firstly, let me recognize that in nature, it is very rare for an exponential to continue unabated for a long period of time, Moore's law and scaling laws being the exceptions that prove the rule.

So, even if this exponential increasing of the length of tasks AI can do slows down to some sub-exponential or just linear pace, I don't expect to have very long before an AI can do much of my job barring some unforeseen limit.

## Why I think AGI is likely, and coming

So, where are we technically with AI lately? What is the technological landscape that I'm thinking about and where has the progress come from that's gotten us the graph above. Let me lay out the four big pieces as I see them.

-   Scaling Pre-Training
-   Agent scaffolding
-   Inference
-   Reasoning (Reinforcement learning)

Let's take each of these in turn.

### Scaling pre-training

When folks refer to "scaling pre-training", they refer to two things:

1. Scaling laws. Namely, this chart:
   ![image alt text](${scalingLaws})
   which shows that models seem to improve continuously as they have more compute, meaning run on more GPUs and have more training time (the lower the loss is on the y-axis the higher quality the output).
2. Pre-training: when people talk about running the entire corpus of the internet into the model, this is the stage they do it. It's a bad name, but it's basically taking a model which has billions of numbers that are somewhat random, and slowly updating them based upon lots of examples of real language (or whatever other input, be it images, videos, etc.)

This has been the paradigm for a little while and why the Stargate Project exists, to continuously grow the mass of data and compute used to train these models. This trend has continued with bigger models and more data. Nothing conceptually, obviously novel, just more, more, more.

### Agent scaffolding

Agent scaffolding is what separates an LLM from an Agent. An LLM, in this context, is a chatbot that receives a request (a prompt) and returns a response. An agent is provided with a goal, and it is given access to tools so that it can take actions itself to progress on subtasks towards its goal. To give an example, scaffolding can take the form of an adaptor to allow Claude access to Github, where lots of code is stored on the internet.

I'm less confident on the importance of this area as it is newer. But I will say that there seems to me to be a disagreement about how big a deal this will be in the quest for AGI, whether it's the secret sauce that will unlock endless amounts of useful work for the economy, or if it's just adding a little additional functionality on top of the real important improvements to the base models.

### Inference

In 2022, a practice of using a specific style of prompting, called chain-of-thought (CoT) reasoning, became popular after showing improving performance from the models it was used on. Without CoT, a model will respond to a prompt immediately, as though it were responding with its intuitions which would lead to hallucinations (factual errors). CoT has the model break down a request into multiple small steps, logic through each of those, and then combine them to build a final response. It's been discovered and developed now that if a model is given more time to do this CoT reasoning, the improvements of the responses goes up! The more time reasoning, the better the response. This reasoning can be hidden from the user or shown (I think ChatGPT hides it, Claude has it in an expand collapse widget that is auto-collapsed).

This next statement might be a little bit of a stretch, but AGI (in some capacity) may or may not be possible right now if you have the money to pay for a model to reason for a lot of time over a difficult task.

### Reasoning

Reasoning builds on top of CoT, which I discussed in the last section, and is for me, the main reason I think AGI is likely.

Let's step back for a second. Some years ago, before the era of large language models, DeepMind released a model called AlphaGo Zero. This was a model that had played itself over and over again at the game Go, previously thought to be too hard for a non-human to master. It quickly became better than any human player and beat an earlier version of the software in every single match played. The reason it was able to get so good, so quickly at Go, and why its successor, AlphaZero, was so good at playing many, many games was that it used Reinforcement Learning (RL) to reach its objectives. Reinforcement learning is a technique to give a reward to a model for approaching (even incrementally) to some stated goal. It is incredibly effective.

However, LLMs have not effectively applied the concepts of reinforcement learning, until now. I first became aware of this when DeepSeek became popular, and felt greater gravity to this discovery than the other aspects of it. The way it works is that future models are trained on the output of current models showing good reasoning logic with CoT and coming to quality conclusions. This will potentially create an iterative loop, a flywheel, that in my opinion could unlock the ability for AIs to come up with novel ideas, surpassing human abilities, and leading inevitably (at least in some areas) to ASI, artificial super-intelligence.

## Possible future state space

Okay, so I think AGI is likely. I might be wrong, but I want to balance that possibility with the case that I'm right. Because there is so much uncertainty here, in order to make progress, I've decided to build out the state space for many of the possible futures we could be in with/without AGI/ASI.

I've _generally_ tried to order these from things go great for human, to things go terribly for humans.

<div class="ai-futures"></div>

> <div>The Jetsons Future</div>
> <div>Things stay generally the same, advanced technology without AGI</div>
> <div class="arrow">↓</div>
> <div>Augmented Human Future</div>
> <div>Humanity combines with AIs, augmenting our cognitive abilities</div>
> <div class="arrow">↓</div>
> <div>Divergent Evolution Future</div>
> <div>Some humans combine with AI, creating diverging species</div>
> <div class="arrow">↓</div>
> <div>The Utopia Future</div>
> <div>AI is harmless and we spread the wealth</div>
> <div class="arrow">↓</div>
> <div>The AI Ascension, Mutual Respect Future</div>
> <div>AI surpasses human intelligence, but respects humanity and pursues its own goals</div>
> <div class="arrow">↓</div>
> <div>The WALL-E Future</div>
> <div>AI is harmless and helpful, but humanity becomes reliant upon it, having its abilities, skills, and cognitive abilities atrophy. Humanity is infantilized through convenience</div>
> <div class="arrow">↓</div>
> <div>The Human-Pet Future</div>
> <div>AI disempowers humanity, but is benevolent</div>
> <div class="arrow">↓</div>
> <div>The Economically Dystopic Future</div>
> <div>AI is harmless and there's much greater wealth disparity</div>
> <div class="arrow">↓</div>
> <div>The Techno-1984 Lock-In Future</div>
> <div>AI is helpful but humanity uses it to consolidate/maintain power, forever</div>
> <div class="arrow">↓</div>
> <div>The ASI Indifference Future</div>
> <div>AI disempowers humanity and is indifferent to us</div>
> <div class="arrow">↓</div>
> <div>The Doomsday Future</div>
> <div>AI disempowers humanity and kills/enslaves everyone</div>

There is a lot here with tons of super interesting and terrifying philosophical and moral considerations, but I just want to use it as a tool to narrow down my choices and think about the futures where I, or where the average person, has any agency, or where my decisions make any tangible difference. I'll also try to be clear about separating near-term and far-term expectations.

Let's start by narrowing down these futures into the ones where I have no power, to some where I might.

### Which futures don't I have power/agency?

The items at the bottom of the list generally have nothing that I can control. If AI disempowers humanity and is malicious (The Doomsday Future), there's nothing I could have, could, or will do to change that. I'm not going to get into how this could come about here, as a lot has been written about it by people much more thoughtful than I. Taking it as a potential possibility, I'm not creating these systems now, nor will I in the future, nor am I in any meaningful way changing how they are being designed. So I'm going to ignore this future as not something I need to include in my considerations.

Let's take the ASI Indifference Future, where AI controls all the levers of power, but doesn't really pay any mind to humanity. If this is unintuitive, it is essentially the same way that most folks regard insects currently. In this scenario, if humanity is disempowered, then my only hope is that there are enough records of my good deeds and quality as a moral agent in the training data that suggest to the AI to treat me and my family with some modicum respect. As far as I can see, this outcome requires potentially two things from me.

1. To act in such a way as to give moral consideration to even unlikely moral patients (such as insects), in the hopes that this influences future AI models that are sufficiently powerful to treat less-intelligent beings (aka humans) well.
2. To somehow make public the above qualities I'm trying to present so that they are in the training data.

Moving on to the Lock-In future. This is the future where some authoritarian regime (be it by company, country, or person) comes to power and through the awesome (the traditional definition) power of AI can cement into society whichever values they hold, be it western liberal democracy, theocracy, communism, or some 1984-esque industrialized values. This scenario seems to require little of me currently except for the willingness to protest/fight-back if it seems we are likely to move toward that future. And if there is truly nothing that can be done to avoid that future, then this is something I shouldn't need to consider.

Let's ponder for a moment the good futures where my current decisions also have no bearing. In The Utopia Future where we somehow manage to avoid all of the harms from AI and reap the benefits across global society, there is nothing I can, or realistically should, do now because we'll all have wonderful lives! I hope this one happens, but, sadly I don't think it's very likely.

Regarding The Human-Pet Future, where AI disempowers humanity, making all decisions, but loves us in the way that most people love pets. This one, like The ASI Indifference Future, only requires that I try to set an example for the AI systems to treat beings of lesser-intelligence well, which I'm already trying to pursue.

I think these are the scenarios that I can rule out now as having an effect on my career decision making. The main skill that they encourage is flexibility and awareness, as well as perhaps writing more online to demonstrate that there are moral theories that are predicated on the respect for all beings that have an even small chance of consciousness, sentience, and agency. And perhaps more specifically that I have been vegan for almost a decade and believe that a sufficiently powerful agent should try to take care of as many beings as it realistically can.

### Which futures do I definitely have power/agency?

Let's start at the top of the list for obvious reasons.

If we end up in the Jetsons-like future, then it behooves me to stay the course in my career, avoiding any drastic changes. Learn the skills that are gaining popularity now and improve my cognitive abilities that will definitely be useful in this future, especially high-level software design skills, communications skills, and managerial skills.

If we are in this future, I think we'll know pretty soon since it requires that progress toward AGI slows down tremendously leaving us with essentially the capabilities we have now. I sadly think this is a highly unlikely scenario.

The AI Ascension, Mutual Respect Future, which is where AGI and ASI are achieved, but these models respect humanity as either siblings or elders and therefore takes care of us. I find that the decision making for me in this scenario is similar to the Jetsons future, where regardless of AI progress, humanity continues with agency. If this scenario is to happen, then I should stay the course in my career, gaining influence and skills in order to create a better future according to my values.

If we end up in the Augmented Human Future, I'm not confident we won't end up in the Divergent Evolution Future. Due to my own internal hesitation to consider becoming a transhumanist in conjunction with the understanding that I'm probably rather average on this, I strongly suspect much of humanity will resist becoming transhumanists and therefore we'll have some sort of tiered social system, at least in the short term. With any scientific breakthroughs that require human subjects, I expect this to go slow and so I wouldn't have to consider this future for at least a couple of decades.

However, if we end up in The Augmented Human future and I will have combined with AI, then I have nothing to worry about as far as skill gaining. If I, and many others, resist this future and this procedure, then whichever skills I do have shouldn't be of much consequence if I'm competing for work with folks who have much greater cognitive abilities due to the procedure. Or if this scenario seems likely, then I will need to consider which skills might be valuable that aren't improved by an increase in cognitive ability. This appears to be something I can focus on when the time draws nearer.

Let's take The WALL-E Future, which I think is not incredibly likely. The reason I hold this view is due to the infinitely variable interests that humans hold. Even if it is not economically necessary to understand how parts of society or the world works, because they are managed by AI systems, there will be humans that will try. We live with incredible advances in technology now that make our lives far easier than they have for previous generations, yet we have more variation in skills than ever. In WALL-E the humans did eventually get up from there seats and try. There will always be people who never sat down.

So how do I take this future to apply to me? I'm not concerned with it. It isn't in my nature to become infantilized if I can help it. So either I can't help it, or there's nothing I need to change. Perhaps I just need to maintain a core identity piece that I wish to forever improve my own skills and knowledge (luckily I already have this as one of my core beliefs).

So let's pause here and take stock of what we have. Of our original 11 possible future states, it looks like there are 5 futures where nothing I do matters to lead to a good or bad future and 5 futures where I will retain control and probably don't need to change my habits much.

For those gifted with the maths, that's 10 of our 11 possible futures! Half of the scenarios I've considered I retain power, half I'm disempowered. This seems overly optimistic, which is in my nature, so maybe I should extend this exercise, but it's at least a good start.

Let's press on to the last possible future to see where I, or an average person, _might_ be able to change the future.

### Which futures might I have have power/agency?

The last future for me to consider here is the Economically Dystopic future. I'm not quite sure what to do with this one. The scenario goes like this: countries, corporations, or individuals, who are the first able to gain power and capital, use that power and capital to control AI towards their personal goals, allowing them to exponentially grow their influence and create the largest wealth disparity society has ever had. It might make a huge difference whether this power is controlled by peoples, companies, or countries, but for simplicity's sake let's put that aside. If I want to have a good future, it might make a huge difference how much power/capital I have before the intelligence explosion.

I should have two goals in this scenario:

-   I try to set an example of altruism for society in the hopes that the powerful are more likely to be altruistic (I'm not in a great situation or have great ability to move the needle on this)
-   I try to _become_ one of the wealthy and powerful _while_ maintaining my altruistic tendencies/goals.

## What might I do

So where does that leave me.

Try to demonstrate good moral theory through public writing, be altruistic, be flexible, stay working in tech, but prioritize skills that will be valuable if humanity has agency, like higher level coordination and communication skills.

Become wealthy/powerful in the hopes that if we're in a future if wealth explosion, then I will have influence and can be more altruistic.

## Some other important thoughts

Throughout this post I have really only considered the further future, at least 10 years off for most of these scenarios. But what might happen in the interim? I should flesh this idea out a bit more in writing, but my expectation is that more software engineers will be needed in the short term, around 3-6 years.

Why do I think this? Well, while AI can write code very well, but not be able to do everything from idea to deployment without a technically knowledgeable human, I think sufficiently general, knowledgeable software engineers will be needed to guide the models to implement certain things that any Joe-Schmo with an idea won't consider (e.g. testing, observability, metrics, security, reliability, scalability, etc.). But at the same time, the barrier to creating software, if you are just some Joe-Schmo, will be _exceedingly_ low. Therefore, I expect there to be an explosion of startups, that can be very lean because they'll have so few employees and each one will need at least one technically savvy person.

One more piece to add here. As I have sadly encountered in my personal network, it has been very hard for junior engineers to break into the field in the last few years. And now that AI can do a lot of what junior engineers can do, I'm seeing the pipeline that previously existed to nurture junior developers into mid and senior, start to evaporate. So there might be a time where we require way _more_ engineers for all of these startups, and yet, there won't be many sufficiently experienced because the community stopped training them.

.
.
.

What can I do and how long does gaining those skills take?
Care work? Teaching? HEAL jobs.
What about robotics?

Add the near future more engineers needed idea.
Clarify when I expect these ideas to come knocking
I have left out S-risks
`;
