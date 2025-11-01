# Will AI Replace Software Developers?

No. Not for a while (probably).

There are some giant caveats which I will lay out below, however, this is my current conclusion after a lot of thinking over many months.

I should also preface this by saying that I've been in both the "superintelligence is possible and likely" camp (see my AI career planning article [here](./career-planning-in-the-age-of-ai)) and the "new paradigm of reasoning is uneconomical and therefore will collapse under the weight of the hyperscaler's debt" camp. What I mean by this is, although superintelligence is possible, we might not get there until there is a step change in LLM architecture (aka not transformers and not for a while).

## Caveats

To define the caveats more succinctly:

-   I'm referring to developers writing production code. This is not static pages or create-and-forget websites that much of the general public need (I mean basic, rarely updated static sites, like this one!). What I call commodity software.
-   This is not to say the role of developers won't change. It will, potentially drastically. In the same way that I don't write machine code or low level C code like my forefathers did. I might in the future not often look at TypeScript or HTML.
-   I can only say this with confidence for 5ish years and some confidence for 10 years. If/when continuous learning with agents is unlocked, then this article probably no longer applies.

## The thrust of the argument: Requirements change

When I write software, I make progress with the distinct knowledge and recognition that I do not know all the requirements. They will change. It is inevitable.

I can, of course, attempt to write software that is flexible or that is easy to change in the future. AI can do that too. However, if software is written flexibly, features and requirements might change in a way that the flexibility wasn't intended to make space for. Another way to say this: imagine a vector space where each point is one of the infinite possible future states the software could go in. I can write a component with flexibility in mind that accounts for same distinct area of this vector space. But if the requirements change, meaning the component actually needs to live in a different area of that space, then that component will need to be refactored.

Every day this will happen. The software will be written. The product team will look at and interact with the software and realize what they thought they wanted, what was desirable, was wrong.

Similarly, consumers will react to the software and the business will collect data (from interviewing them or seeing their behavior) and they will want different things. The requirements will change. AI might _eventually_ replace the product team, but for most businesses, it won't be replacing consumers.

Not until AI can constantly understand the shifting requirements, which update as the winds of peoples whims change, can it refactor the software to keep it healthy.

## Rot

Something I've learned about as a senior engineer is how easy software can rot. Newton's second law of thermodynamics applies to software. If left untouched, without energy being added, a system will always increase entropy, become more chaotic, less bounded. Software needs to be tended like a garden to be healthy. Of course AI can write code incredibly well in the first iteration and it will only get better in the future, but will it know what parts of the system need to be tended? Will it tell the designers and the product managers that their ideas don't make sense? That they should want something different?

I predict LLM's ability to tend to the garden of software systems will increase as coding agents are honed. However, I don't yet see how it understands and teases out requirements, which inevitably involves interacting with humans and finding out what they want. Or conversely, telling them what they should want if you (the AI or the developer) know better.

## Conclusion

So to answer the original question, oh yea. It's totally possible for AI agents with continuous learning to replace production developers. But that's not a thing they can do now. They will need to know what I want, or what my designer wants, or what my PM wants, before we do. And the things we want as we get experience with a system will change. It'll always change.

Software always needs to be tended. We'll need reactive, software gardeners. And that's a role I think I'll be better at. At least for a while.
