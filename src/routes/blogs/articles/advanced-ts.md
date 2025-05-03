# A Few Advanced TypeScript techniques

After reviewing a few advanced TypeScript features, I thought it would be a good idea to explain a few of them with some examples to better understand how they work and how to use them.

## Conditional Types

```typescript
type PersonLike<T> = T extends { name: string } ? T : never;
```

It looks like a regular ternary from javascript, but acts on the type level. In the above example, I'm creating a type function that checks if an object has some general shape, otherwise show an error. It would be used like this:

```typescript
const Alice = { name: 'Alice' };

type AliceType = PersonLike<typeof Alice>;
// ^= { name: string; }

const Bob = { substrate: 'metal', isSentient: false };

type BobType = PersonLike<typeof Bob>;
// ^= never
```

### But like, where would I actually use this?

Let's say I have a function that manipulates some input, but I'm not quite know what that input looks like.

```typescript
type MaybeString<T> = T extends string ? T : never;

const transform = <T>(str: MaybeString<T>) => {
	return str.toUpperCase() + '!';
};
```

Here I am checking to make sure that if someone uses my `transform` function, the typechecker will throw an error if the arg passed in isn't a string.

```typescript
transform('Alice'); // makes the typechecker happy

enum Names {
	BOB = 'bob',
}
transform(Names.BOB); // happy here too!

transform(undefined); // type error. Argument of type 'undefined' is not assignable to parameter of type 'never'.

transform(0); // type error. Argument of type 'number' is not assignable to parameter of type 'never'.
```

So if what I passed in to the function (which becomes T in the `transform` declaration) passes the `extends string` check, then it's all groovy. But if it fails, it returns the `never` type, meaning typescript will throw an error.

Let's build this into something a little more practical now.

```typescript
type MaybePerson<T> = T extends { name: string } ? T : never;

const transform = <T>(obj: MaybePerson<T>) => {
	return obj.name.toUpperCase() + '!';
};
```

This is almost exactly the same except now I'm checking if `T` is an object with the `name` property which is of type string. Here is where I start to see some useful applications of this syntax.

```typescript
const Charlie = { name: 'Charlie', age: 27 };
const Dali = { isAlive: false, title: 'Dali agent', age: 2 };

transform(Charlie); // typechecker happy
transform(Dali); // error. Argument of type '{...}' is not assignable to parameter of type 'never'.
```

I can make sure each object that is passed into the function will error if the type of the argument doesn't fit. This means I can code with more confidence that if something changes, this function won't error silently.

## satisfies

`satisfies` is a little sneaky and therefore took me a few explanations to understand well.

The `satisfies` keyword applies to variables, not types, and is used to avoid widening of the type. I'll contrast it to an explicit type annotation.

Let's ground ourselves with an example.

```typescript
type User = {
	name: string;
	role: 'admin' | 'default';
	isAlive: boolean;
};
const user = {
	name: 'Devin',
	role: 'admin',
	isAlive: true,
} satisfies User;

user.name;
// ^= name: string
user.role;
// ^= role: "admin"
user.isAlive;
// ^= isAlive: true
```

Here I'm using `satisfies` on the object `user`. It will show errors in the `user` object if the keys/values don't align with the `User` type. But also notice that when the `user` object is keyed into, it hasn't widened our type to the full `User` type. `user.role` is "admin", not `"admin" | "default"`. This is because `satisfies` doesn't widen the type, it keeps the specified values as though the type were inferred.

Let's compare this to using an explicit type annotation:

```typescript
type User = /* same as above */
const user: User = {
	name: 'Devin',
	role: 'admin',
	isAlive: true,
};

user.name;
// ^= name: string
user.role;
// ^= role: "admin" | "default"
user.isAlive;
// ^= isAlive: boolean
```

Instead of `const user = {...} satisfies User` I am setting the type explicitly: `const user: User = {...}`. This widens the type of `user`, setting the `role` and `isAlive` properties back to what was defined in User.

Let's look at one more example.

```typescript
const obj1 = {} satisfies Record<string, string>;
const obj2: Record<string, string> = {};

obj1.name = 'new name'; // error Property 'name' does not exist on type '{}'.
obj2.name = 'new name'; // ts happy
```

Here it is clearer to me the differences between keeping an object wide or narrow. When I try to set a new name to our `satisfies` version of our `obj1`, the typechecker gets mad. It hasn't widened the type to include all things in `Record<string,string>`, which at first is counterintuitive. It has essentially inferred the `{}` object to have no keys or values and so setting anything else is not type safe. It, however, first checked to make sure the initial value passed to `obj1` would align with the `Record<string,string>` type, which it does! No keys or values does pass the check.

`obj2` on the other hand, is explicitly set as a `Record<string,string>` type. So as long as the keys and values assigned to it are both strings, the typechecker is happy.

In short, `obj2` has narrowed its definition to include all things that work in `Record<string,string>`. `obj1` hasn't. To the typechecker, it is still just an empty object.

## infer

`infer` is pretty cool in that it is basically a command to ask typescript to figure out a type for you when that type is a piece of some larger object, for example, an array or a function. It looks something like this:

```typescript
type GetReturnType<T> = 
	T extends (...args: never[]) => infer Return 
		? Return 
		: never;
```

Here I'm are asking typescript to _infer_ the return type. I set a type variable `Return` as our return type and check if our generic `T` does in fact conform to the shape of a function, and if it does, it will return the `Return` variable, otherwise it will return `never`, causing an error.

```typescript
const getUser = () => ({ id: 1, name: 'Evelyn' });
type User = GetReturnType<typeof getUser>;
// ^= { id: number; name: string; }

const Building = { type: 'apartment' };
type Apartment = GetReturnType<typeof Building>;
// ^= never
```

(`Apartment` doesn't quite error out, but it will whenever you try to use it.)

Let's do one more example:

```typescript
type GetArrayItemType<T> = T extends Array<infer Item> ? Item : never;

const users = [{ name: 'Franz', age: 10 }];
type User = GetArrayItemType<typeof users>;
```

Now, I could have gone in and done something like: `type User = (typeof users)[number]`, but this is less dynamic and requires me to know more about the type (which in this case is easy, but might be more difficult for more complex types). Here I check if the generic type `T` is an array, and if so, I return the type `Item`, which I've just _inferred_, otherwise this type function should return `never`, throwing an error.

## Mapped Types

Mapped types are types that I have seen a few times, but continuously forget the syntax and therefore always look it up or have Claude create it for me. Here is the basic syntax and a simple use case:

```typescript
type OptionFlags<T> = {
	[Property in keyof T]: boolean;
};
```

Let's break this down. `Property` is a variable that is defined here that signifies each of the keys of the object type passed into this generic function. Here's how to use it and its outcome:

```typescript
const obj = { a: 1, b: true, c: 'hello' };

type Options = OptionFlags<typeof obj>;
// ^= { a: boolean; b: boolean; c: boolean; }
```

`OptionFlags` goes through each key in `obj` (`keyof T`), each of those keys is assigned to the `Property` keyword, and then in the object, that key is set to the type of `boolean`.

A good thing to keep in mind here is that `Property` is actually a union of all of the keys. This means we can manipulate it just like any union. We do that with the `as` keyword, but in a different way than it normally is.

```typescript
type RemoveA<T> = {
	[Property in keyof T as Exclude<Property, 'a'>]: T[Property];
};

type Options = RemoveA<typeof obj>;
// ^= { b: boolean; c: string; }
```

Let's take this piece by piece. The type function sets `Property` to `'a' | 'b' | 'c'` through `keyof T`. It then uses `as Exclude<Property, 'a'>` to whittle remove `'a'` from our union (a reminder that Exclude is like Omit, but for unions). It then sets these two keys, `'b'` and `'c'` to whatever their type was in the original `obj`.

Here's an example from the ts docs taking it a step further:

```typescript
type Getters<T> = {
	[Property in keyof T as `get${Capitalize<string & Property>}`]: () => T[Property];
};

type Home = { size: number; occupants: User[]; qualities: string[] };
type HomeGetters = Getters<Home>;
// ^= { getSize: () => number; getOccupants: () => User[]; getQualities: () => string[]; }
```

Here the `Getters` function goes through each key in our `Home` object type (`'size' | 'occupants' | 'qualities'`) and pushes them through a template literal. `Capitalize<string & Property>` will convert each of these keys into the camel-cased versions before having "get" prepended (as an aside, `string & Property` are both needed as without `string` ts won't know what `Property` is and without `Property` ts won't know what to put in that function).

## Conclusion

So that's a little whirlwind tour of some advanced typescript functions! I hope you get as much out of it as I did.

Until next time.
