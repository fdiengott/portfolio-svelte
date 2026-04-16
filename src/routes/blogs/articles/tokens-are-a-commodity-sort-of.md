# Tokens Are A Commodity, Sort Of

The other day I was listening to Derek Thompson's Plain English with Paul Kedrosky, a financial writer. Kedrosky made a series of arguments based upon the premise that tokens, the basic unit of information that AI models take in as inputs and produce as outputs, are a new industrial commodity, the first new commodity we've had in nearly 80 years.

Some table setting. A commodity is a good that is non-differentiated. Take gasoline. I don’t care if I get it from Shell, BP, or Exxon. Gasoline is gasoline. Yes, there are different types at different qualities, but the companies don’t differentiate the product. Because they don’t differentiate, the only thing these companies can really compete on is price and scale. So what do they do? They lower the price in relative terms to their competitors, who do the same, in a downward cycle until they hit marginal cost. And in the process they grow to massive scale. Because if you can’t charge high margins, you need high volumes.

So what makes tokens interchangeable in the way a gallon of gas is interchangeable? A token is a token is a token, no matter which model produced it. If they each have the same result then there is no differentiation. Competition collapses to price and price collapses to marginal cost. Open source models and distilled models drive the price to the floor and squeeze the foundation model companies. This will lead to the eventual devastation of the top labs and value will have to move up the value chain. The frontier labs will be the telecom companies of the 2000s that thought they'd win by owning the wires undergirding the internet, but now are simply utilities.

Though I think this argument is, in part, true, I don't buy it in its entirety. The reality I've come to is a little more nuanced. Overall I think there are two classifications of tokens, which I will refer to as Class A and Class B. Class B tokens are more easily producible by open source models and a user isn't likely to care which model supplies those tokens. Class A tokens on the other hand require top of the line models which can't be substituted by open source models. I'll go into a bit more detail below about each, but I'll argue that Class B tokens are a commodity and follow the rules of other historic commodities, whereas Class A tokens do not.

## Commodity Tokens, For Real

Class B tokens are produced for specification-complete tasks, meaning tasks where the solution is knowable and describable before the output is produced. Example: transcription. I could give any model an audio clip and tell it to extract the text. I don't care if it's the highest quality model or the lowest, as long as I get the right text output. Because I'll take any model that gets the right answer, I'll go for the cheapest model. The model that sells tokens at marginal cost. That is currently the open source models, which are good enough for this sort of task (whisper in this case). At marginal cost, it’s basically just the cost of compute on-device or in the cloud.

I believe this argument, that there is a class of AI uses which don't require differentiated models.

Why does this matter? Token costs plummeting to marginal cost is not a way for an AI company to recoup its billions in infrastructure, compute, and R&D spend.

If you are a foundation model company, this is scary. This eats into your bottom line and makes it such that if you don't keep pace well ahead of the open source community AND ahead of distilled models that are cheaper, you lose revenue and you'll miss targets and not be able to continue to raise the unbelievable amount of money that is being raised.

If tokens as a whole are a commodity, as with other commodities, the value will move up the chain from the foundation model companies to those that make the best use of AI and have the best integration. But that actually might not be where the buck stops. Let's say in the future an individual can, with "low quality", Class B tokens, generate moderately simple, or god forbid, complex software! Then we are in a paradigm where value moves further up the chain to whatever company has the best _data_, the best _distribution_, _regulatory posture_, deepest _domain expertise_, or maybe even political connections?

But I don't think we are in that paradigm yet. Now it seems to me that the most value is coming from the models that produce the most differentiated tokens.

## Differentiated tokens

Why do I use Claude 4.6 Opus to write code, but won’t even let Kimi K2 or Llama read it? It’s simply that the current open source models produce tokens that I don’t trust enough to use, rendering their output functionally worthless to me. Now, writing code is not the best use case for this argument. Software is, arguably, specification-complete because software behavior is in principle verifiable and therefore might be able to be written with commodity tokens. However, what about drug discovery? Or R&D for a new technology or new material? This cutting edge work, at the edge of human knowledge is where a vast amount of growth potential lies and where cheap, Class B tokens are functionally useless.

Class B tokens won’t work for tasks that are specification-incomplete, where a user can’t describe the output before putting in the prompt, can only know its quality after seeing it. For example, if I were to try to discover a new material with the intent to replace concrete, I couldn't tell a model what the solution will be; I can only show it answers in the past that didn’t work, but were on the right track. These sorts of use cases are at the cutting edge of human intelligence, there are no correct solutions to train a model on, and the data is sparse.

And this is where unbounded value lies. If an open source model can’t do drug discovery, then it’s possible a foundation model, outputting Class A tokens, can create a drug that has such immense value that it changes the global economy. Technological or scientific improvements that propel humanity into the future, producing goods or services that improve all of society are the most valued good and the thing we _should_ be striving for with AI most.

Another way this situation could go is with specialized models. We live in a world so far where the best AI technologies are general purpose AI models (not to be confused with the unhelpful and overused term AGI). However, we could have found ourselves in a different world, and we might end up in a future where specialized models dethrone general models and they have the most value. For example, imagine a model used for reviewing medical scans that can, with incredible accuracy, predict if a mass is benign or not. This sort of paradigm, depending on the level of competition in the specific sector, would be much harder to commodify. If the world went in this sort of direction, I would update far in the differentiated tokens direction and away from the commodification argument.

## Is Differentiation Durable?

I haven't yet addressed what I see as two elephants in the room. Class A tokens today are Class B tokens tomorrow, which I'll refer to as the commodification ratchet. Should we expect the size of the window between Class A and Class B tokens to shrink, stay the same, or disappear entirely? I'll refer to this as the shrinking window problem.

I'm a little torn on the question of the commodification ratchet. When do Class A tokens become Class B and when has this happened before? Some examples I have are translation, summarization, basic code generation, and image generation. As I have defined Class A and B tokens, as specification-incomplete and specification-complete respectively, I'm not sure if any of these were ever needing Class A tokens. Summarization and translation have always been specification-complete and therefore the tokens to produce these were always Class B tokens. The models just weren't good enough to produce them reliably yet, but once they could it made sense that there was a race to marginal cost. Simple code gen and image gen are a little less clear to me, but I think still follow the same logic. Benchmarks can be built and we can write evaluation criteria for when output matches a prompt. In this way, even though they are complex, both of these tasks should be considered specification-complete and we should expect a commodification of their tokens over time.

So the question is then raised, what domains have specification-incomplete tasks that will _become_ specification-complete tasks? And by this what I really mean is will our scientific understanding advance such that something we cannot properly evaluate today will be scorable tomorrow? I assume this will be the case. Science and AI research will progress and Class A tokens will convert to Class B. It's just anyone's guess what domains they are in.

Okay, so that is the mechanism for conversion, if it ever happens. Let's look at the dynamics of conversion with the shrinking window problem. We have three questions:

-   What's the rate of change?
-   What are the limits of the change?
-   Do we ever converge, close the window?

Based on the commodification ratchet argument, I am disinclined to believe we ever converge. It is surely possible, but it seems to me that any lab that has far more resources than the open source builders and access to orders of magnitude more compute will always have an advantage (of at least a few months), specifically for Class A tokens.

The open questions: how close do they get? What Class B token task is theoretically possible and will become commodified as soon as the models are capable? And how long will the open source models take to catch up to Class A? I don't have a good intuition on these questions or even whether the gap could widen.

## Taking Stock

So let's take stock. It seems to me that there are a lot of tasks that are composed of commodity tokens that will be produced at marginal cost now and into the future. That pool of tasks will grow over time as the models get better. Sadly for me as a software engineer, coding is part of that pool, with some reservations.

Frontier models will stay ahead, likely for a long time on tasks that are explicitly specification-incomplete until those tasks, through scientific progress, can be made specification-complete. Until such time, if it ever happens, it'll be for a smaller set of tasks and therefore the big labs will make enough revenue to pay for their ridiculous capex and infrastructure spending.

I'm still chewing on the relative importance to the economy of the tasks under each classification. If the pecuniary benefits of the lower quality, commodity tokens far outweigh that of the higher class tokens, then the market will be in a very different place than I currently expect.

In the absence of that knowledge, I think the labs are clearly the only players suited for specification-incomplete tasks, generating Class A tokens that will remain the seat of incredible potential value for some time. I agree with the claims that in some respects tokens are the newest industrial commodity in decades, and they'll slowly increase their domain, but I don't expect them to touch the frontier anytime soon. In the meantime I'll enjoy my plentiful, cheap, commodity tokens wherever I can.
